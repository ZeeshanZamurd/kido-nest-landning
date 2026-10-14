"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Clapperboard,
  Heart,
  Home,
  Maximize,
  Menu,
  Pause,
  Play,
  Search,
  Shield,
  SkipBack,
  SkipForward,
  Tv,
  X,
} from "lucide-react";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { PLAY_STORE_URL } from "@/constants/branding";
import {
  fetchCategories,
  fetchChannelPlaylists,
  fetchChannels,
  fetchLanguages,
  fetchVideo,
  fetchVideos,
  formatDuration,
  type CatalogChannel,
  type CatalogPlaylist,
  type CatalogVideo,
  type Category,
  type Language,
} from "@/lib/api/catalog";

type Rail = "home" | "shorts" | "channels" | "favorites" | "history";

const PAGE_SIZE = 24;

function categoryName(video: CatalogVideo) {
  return video.primaryCategory?.name ?? video.categories[0]?.name ?? "Kids";
}

function languageName(video: CatalogVideo) {
  return video.primaryLanguage?.name ?? video.languages[0]?.name ?? "";
}

export default function WatchHome() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [rail, setRail] = useState<Rail>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [videos, setVideos] = useState<CatalogVideo[]>([]);
  const [shorts, setShorts] = useState<CatalogVideo[]>([]);
  const [channels, setChannels] = useState<CatalogChannel[]>([]);
  const [channelTotal, setChannelTotal] = useState(0);
  const [videoPage, setVideoPage] = useState(1);
  const [channelPage, setChannelPage] = useState(1);
  const [hasMoreVideos, setHasMoreVideos] = useState(false);
  const [hasMoreChannels, setHasMoreChannels] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<CatalogVideo | null>(null);
  const [activeChannel, setActiveChannel] = useState<CatalogChannel | null>(null);
  const [playlists, setPlaylists] = useState<CatalogPlaylist[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [known, setKnown] = useState<Record<string, CatalogVideo>>({});

  function remember(items: CatalogVideo[]) {
    setKnown((current) => {
      const next = { ...current };
      for (const item of items) next[item.id] = item;
      return next;
    });
  }

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("kidnest-favorites");
      const savedHistory = localStorage.getItem("kidnest-history");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites) as string[]);
      if (savedHistory) setHistory(JSON.parse(savedHistory) as string[]);
    } catch {
      /* ignore private-mode storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kidnest-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("kidnest-history", JSON.stringify(history));
  }, [history]);

  const loadTaxonomy = useCallback(async () => {
    const [categoryPage, languagePage] = await Promise.all([
      fetchCategories(),
      fetchLanguages(),
    ]);
    setCategories(categoryPage.data);
    setLanguages(languagePage.data);
  }, []);

  const loadCatalog = useCallback(
    async (nextVideoPage: number, nextChannelPage: number, append: boolean) => {
      setLoading(true);
      setError("");
      try {
        const contentType = rail === "shorts" ? "SHORT" : undefined;
        const [videoPageData, channelPageData, shortPage] = await Promise.all([
          fetchVideos({
            search: submitted || undefined,
            categoryId: categoryId || undefined,
            languageId: languageId || undefined,
            channelId: activeChannel?.id,
            playlistId: playlistId || undefined,
            contentType,
            page: nextVideoPage,
            limit: PAGE_SIZE,
          }),
          fetchChannels({
            search: rail === "channels" ? submitted || undefined : undefined,
            categoryId: categoryId || undefined,
            languageId: languageId || undefined,
            page: nextChannelPage,
            limit: PAGE_SIZE,
          }),
          rail === "home" && !submitted && !activeChannel
            ? fetchVideos({
                categoryId: categoryId || undefined,
                languageId: languageId || undefined,
                contentType: "SHORT",
                page: 1,
                limit: 12,
              })
            : Promise.resolve(null),
        ]);
        setVideos((current) =>
          append && nextVideoPage > 1 ? [...current, ...videoPageData.data] : videoPageData.data,
        );
        setChannels((current) =>
          append && nextChannelPage > 1
            ? [...current, ...channelPageData.data]
            : channelPageData.data,
        );
        setChannelTotal(channelPageData.meta.total);
        setHasMoreVideos(
          videoPageData.meta.hasNextPage ??
            videoPageData.meta.page < videoPageData.meta.totalPages,
        );
        setHasMoreChannels(
          channelPageData.meta.hasNextPage ??
            channelPageData.meta.page < channelPageData.meta.totalPages,
        );
        setVideoPage(nextVideoPage);
        setChannelPage(nextChannelPage);
        remember(videoPageData.data);
        if (shortPage) {
          setShorts(shortPage.data);
          remember(shortPage.data);
        }
      } catch {
        setError("The library could not be loaded. Check that the KidoNest API is running.");
      } finally {
        setLoading(false);
      }
    },
    [activeChannel?.id, categoryId, languageId, playlistId, rail, submitted],
  );

  useEffect(() => {
    void loadTaxonomy().catch(() => {
      setError("The library could not be loaded. Check that the KidoNest API is running.");
    });
  }, [loadTaxonomy]);

  useEffect(() => {
    void loadCatalog(1, 1, false);
  }, [loadCatalog]);

  useEffect(() => {
    if (!activeChannel) {
      setPlaylists([]);
      return;
    }
    void fetchChannelPlaylists(activeChannel.id)
      .then(setPlaylists)
      .catch(() => setPlaylists([]));
  }, [activeChannel]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    setSubmitted(query.trim());
    setPlaylistId("");
    setActiveChannel(null);
    setSelected(null);
    setRail("home");
  }

  function openRail(next: Rail) {
    setRail(next);
    setSelected(null);
    setActiveChannel(null);
    setPlaylistId("");
    setSidebarOpen(false);
  }

  async function openVideo(video: CatalogVideo) {
    setHistory((current) => [video.id, ...current.filter((id) => id !== video.id)].slice(0, 40));
    remember([video]);
    setSelected(video);
    try {
      const detail = await fetchVideo(video.id);
      setSelected(detail);
    } catch {
      setSelected(video);
    }
  }

  function openChannel(channel: CatalogChannel) {
    setRail("home");
    setSelected(null);
    setPlaylistId("");
    setActiveChannel(channel);
    setSidebarOpen(false);
    setParentsOpen(false);
  }

  const favoriteVideos = favorites
    .map((id) => known[id])
    .filter((video): video is CatalogVideo => Boolean(video));
  const historyVideos = history
    .map((id) => known[id])
    .filter((video): video is CatalogVideo => Boolean(video));

  const showingChannels = rail === "channels" && !activeChannel;
  const showingSaved = rail === "favorites" || rail === "history";
  const gridVideos = rail === "favorites" ? favoriteVideos : rail === "history" ? historyVideos : videos;

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f12]/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => openRail("home")} className="shrink-0">
            <BrandWordmark size={32} priority />
          </button>
          <form onSubmit={onSearch} className="order-last flex min-w-0 w-full flex-1 sm:order-none sm:w-auto">
            <label className="sr-only" htmlFor="catalog-search">
              Search videos and channels
            </label>
            <input
              id="catalog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search videos and channels"
              className="min-w-0 flex-1 rounded-l-full border border-white/15 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:border-kidnest-violet"
            />
            <button
              type="submit"
              className="rounded-r-full border border-l-0 border-white/15 bg-white/10 px-4 hover:bg-white/15"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm font-semibold xl:hidden"
            onClick={() => setParentsOpen(true)}
          >
            <Shield className="h-4 w-4 text-kidnest-child-accent" />
            Parents
          </button>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-kidnest-violet px-3 py-2 text-sm font-bold text-white sm:px-4"
          >
            Get the App
          </a>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar
          rail={rail}
          categories={categories}
          categoryId={categoryId}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onRail={openRail}
          onCategory={(id) => {
            setCategoryId(id);
            setActiveChannel(null);
            setPlaylistId("");
            setSidebarOpen(false);
          }}
        />

        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-kidnest-violet/20 px-3 py-1 text-xs font-bold text-kidnest-child-accent">
              Parent library
            </span>
            <span className="text-sm text-white/60">
              {channelTotal > 0 ? `${channelTotal} channels` : "All channels"} open
            </span>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            <Chip active={!languageId} onClick={() => setLanguageId("")}>
              All languages
            </Chip>
            {languages.map((language) => (
              <Chip
                key={language.id}
                active={languageId === language.id}
                onClick={() => setLanguageId(language.id)}
              >
                {language.name}
              </Chip>
            ))}
          </div>

          {activeChannel ? (
            <ChannelHeading
              channel={activeChannel}
              playlists={playlists}
              playlistId={playlistId}
              onBack={() => {
                setActiveChannel(null);
                setPlaylistId("");
              }}
              onPlaylist={setPlaylistId}
            />
          ) : null}

          {error ? (
            <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          ) : null}

          {selected ? (
            <WatchPane
              video={selected}
              saved={favorites.includes(selected.id)}
              queue={videos.some((item) => item.id === selected.id) ? videos : shorts}
              onClose={() => setSelected(null)}
              onSave={() =>
                setFavorites((current) =>
                  current.includes(selected.id)
                    ? current.filter((id) => id !== selected.id)
                    : [selected.id, ...current],
                )
              }
              onOpen={openVideo}
              onChannel={() => {
                const match = channels.find((channel) => channel.id === selected.channelId);
                if (match) openChannel(match);
                else {
                  setActiveChannel({
                    id: selected.channelId,
                    title: selected.channelName,
                    description: null,
                    thumbnailUrl: selected.channelThumbnailUrl ?? null,
                    videoCount: 0,
                    categories: selected.categories,
                    languages: selected.languages,
                    primaryCategory: selected.primaryCategory,
                    primaryLanguage: selected.primaryLanguage,
                  });
                  setSelected(null);
                }
              }}
            />
          ) : null}

          {showingChannels ? (
            <ChannelGrid
              channels={channels}
              loading={loading}
              hasMore={hasMoreChannels}
              onOpen={openChannel}
              onMore={() => void loadCatalog(videoPage, channelPage + 1, true)}
            />
          ) : showingSaved ? (
            <VideoGrid
              title={rail === "favorites" ? "Favorites" : "History"}
              videos={gridVideos}
              loading={loading}
              empty={
                rail === "favorites"
                  ? "Save a video and it stays on this device."
                  : "Videos you open show up here."
              }
            />
          ) : (
            <>
              {rail === "home" && !submitted && !activeChannel && shorts.length > 0 ? (
                <ShortRow shorts={shorts} onOpen={openVideo} />
              ) : null}
              <VideoGrid
                title={
                  activeChannel
                    ? playlistId
                      ? "Playlist"
                      : activeChannel.title
                    : submitted
                      ? `Results for “${submitted}”`
                      : rail === "shorts"
                        ? "Shorts"
                        : "For your kids"
                }
                videos={videos}
                loading={loading && videos.length === 0}
                empty="Nothing matches this filter yet."
                hasMore={hasMoreVideos}
                onOpen={openVideo}
                onMore={() => void loadCatalog(videoPage + 1, channelPage, true)}
              />
              {rail === "home" && !activeChannel && !submitted ? (
                <ChannelGrid
                  channels={channels.slice(0, 12)}
                  loading={loading && channels.length === 0}
                  hasMore={channelTotal > 12}
                  onOpen={openChannel}
                  onMore={() => openRail("channels")}
                  moreLabel="All channels"
                />
              ) : null}
            </>
          )}
        </main>

        <ParentRail
          open={parentsOpen}
          channels={channels}
          channelTotal={channelTotal}
          onClose={() => setParentsOpen(false)}
          onOpenChannel={openChannel}
          onShowChannels={() => openRail("channels")}
        />
      </div>
    </div>
  );
}

function Sidebar({
  rail,
  categories,
  categoryId,
  open,
  onClose,
  onRail,
  onCategory,
}: {
  rail: Rail;
  categories: Category[];
  categoryId: string;
  open: boolean;
  onClose: () => void;
  onRail: (rail: Rail) => void;
  onCategory: (id: string) => void;
}) {
  const links: { id: Rail; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "shorts", label: "Shorts", icon: Clapperboard },
    { id: "channels", label: "Channels", icon: Tv },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "history", label: "History", icon: Play },
  ];
  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`${
          open ? "fixed inset-y-0 left-0 z-50 flex" : "hidden"
        } w-64 flex-col overflow-y-auto border-r border-white/10 bg-[#16161a] p-4 lg:static lg:z-0 lg:flex lg:w-56 lg:bg-transparent`}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-bold">Browse</span>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onRail(link.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold ${
                rail === link.id ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          ))}
        </nav>
        <p className="mt-6 mb-2 px-3 text-xs font-bold uppercase tracking-wide text-white/40">
          Categories
        </p>
        <button
          type="button"
          onClick={() => onCategory("")}
          className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${
            !categoryId ? "bg-white/10 font-semibold" : "text-white/70 hover:bg-white/5"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategory(category.id)}
            className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${
              categoryId === category.id
                ? "bg-white/10 font-semibold"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            {category.name}
          </button>
        ))}
        <div className="mt-8 space-y-2 px-3 text-xs text-white/40">
          <a href="/privacy" className="block hover:text-white">
            Privacy
          </a>
          <a href="/account-deletion" className="block hover:text-white">
            Account deletion
          </a>
        </div>
      </aside>
    </>
  );
}

function ParentRail({
  open,
  channels,
  channelTotal,
  onClose,
  onOpenChannel,
  onShowChannels,
}: {
  open: boolean;
  channels: CatalogChannel[];
  channelTotal: number;
  onClose: () => void;
  onOpenChannel: (channel: CatalogChannel) => void;
  onShowChannels: () => void;
}) {
  const body = (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-kidnest-child-accent">
            Parents
          </p>
          <h2 className="text-lg font-extrabold">Every channel is open</h2>
        </div>
        <button type="button" className="xl:hidden" onClick={onClose} aria-label="Close parents">
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className="text-sm text-white/70">
        This page uses the parent library from the app. Channels, playlists, shorts, and videos
        are all available. Child profiles, screen time, and approvals stay in the app.
      </p>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl bg-kidnest-violet px-4 py-3 text-center text-sm font-bold"
      >
        Get these controls in the app
      </a>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Channels ({channelTotal || channels.length})</h3>
        <button type="button" className="text-xs font-semibold text-kidnest-child-accent" onClick={onShowChannels}>
          See all
        </button>
      </div>
      <ul className="max-h-[50vh] space-y-2 overflow-y-auto pr-1 xl:max-h-[calc(100vh-280px)]">
        {channels.map((channel) => (
          <li key={channel.id}>
            <button
              type="button"
              onClick={() => onOpenChannel(channel)}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/5"
            >
              <Thumb src={channel.thumbnailUrl} alt="" rounded />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{channel.title}</span>
                <span className="block text-xs text-white/50">
                  {(channel.totalCount ?? channel.videoCount) || 0} videos
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close parents panel"
          className="fixed inset-0 z-40 bg-black/60 xl:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`${
          open ? "fixed inset-y-0 right-0 z-50 flex" : "hidden"
        } w-[min(100%,20rem)] flex-col overflow-y-auto border-l border-white/10 bg-[#16161a] p-4 xl:static xl:z-0 xl:flex xl:w-80 xl:bg-transparent`}
      >
        {body}
      </aside>
    </>
  );
}

function ChannelHeading({
  channel,
  playlists,
  playlistId,
  onBack,
  onPlaylist,
}: {
  channel: CatalogChannel;
  playlists: CatalogPlaylist[];
  playlistId: string;
  onBack: () => void;
  onPlaylist: (id: string) => void;
}) {
  return (
    <section className="mb-5">
      <button type="button" onClick={onBack} className="mb-3 text-sm text-white/60 hover:text-white">
        All channels
      </button>
      <div className="flex items-center gap-3">
        <Thumb src={channel.thumbnailUrl} alt="" rounded large />
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold sm:text-2xl">{channel.title}</h1>
          <p className="text-sm text-white/60">
            {channel.primaryCategory?.name ?? "Kids"} · {channel.totalCount ?? channel.videoCount} videos
          </p>
        </div>
      </div>
      {playlists.length > 0 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Chip active={!playlistId} onClick={() => onPlaylist("")}>
            All videos
          </Chip>
          {playlists.map((playlist) => (
            <Chip
              key={playlist.id}
              active={playlistId === playlist.id}
              onClick={() => onPlaylist(playlist.id)}
            >
              {playlist.title}
            </Chip>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function VideoGrid({
  title,
  videos,
  loading,
  empty,
  hasMore,
  onOpen,
  onMore,
}: {
  title: string;
  videos: CatalogVideo[];
  loading: boolean;
  empty: string;
  hasMore?: boolean;
  onOpen?: (video: CatalogVideo) => void;
  onMore?: () => void;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-extrabold sm:text-xl">{title}</h2>
      {loading ? <p className="text-sm text-white/50">Loading the library…</p> : null}
      {!loading && videos.length === 0 ? <p className="text-sm text-white/50">{empty}</p> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => onOpen?.(video)}
            className="text-left"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-white/5">
              <Thumb src={video.thumbnailUrl} alt="" fill />
              <span className="absolute right-2 bottom-2 rounded bg-black/75 px-1.5 py-0.5 text-xs">
                {video.contentType === "SHORT" ? "Short" : formatDuration(video.durationSecs)}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm font-bold">{video.title}</p>
            <p className="truncate text-xs text-white/55">
              {video.channelName}
              {categoryName(video) ? ` · ${categoryName(video)}` : ""}
              {languageName(video) ? ` · ${languageName(video)}` : ""}
            </p>
          </button>
        ))}
      </div>
      {hasMore && onMore ? (
        <button
          type="button"
          onClick={onMore}
          className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/5"
        >
          Load more
        </button>
      ) : null}
    </section>
  );
}

function ChannelGrid({
  channels,
  loading,
  hasMore,
  onOpen,
  onMore,
  moreLabel = "Load more",
}: {
  channels: CatalogChannel[];
  loading: boolean;
  hasMore: boolean;
  onOpen: (channel: CatalogChannel) => void;
  onMore: () => void;
  moreLabel?: string;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-extrabold sm:text-xl">Channels</h2>
      {loading ? <p className="text-sm text-white/50">Loading channels…</p> : null}
      {!loading && channels.length === 0 ? (
        <p className="text-sm text-white/50">No channels match this filter.</p>
      ) : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {channels.map((channel) => (
          <button
            key={channel.id}
            type="button"
            onClick={() => onOpen(channel)}
            className="rounded-2xl bg-white/5 p-3 text-left hover:bg-white/10"
          >
            <Thumb src={channel.thumbnailUrl} alt="" rounded />
            <p className="mt-2 line-clamp-2 text-sm font-bold">{channel.title}</p>
            <p className="text-xs text-white/50">
              {channel.totalCount ?? channel.videoCount} videos
            </p>
          </button>
        ))}
      </div>
      {hasMore ? (
        <button
          type="button"
          onClick={onMore}
          className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/5"
        >
          {moreLabel}
        </button>
      ) : null}
    </section>
  );
}

function ShortRow({
  shorts,
  onOpen,
}: {
  shorts: CatalogVideo[];
  onOpen: (video: CatalogVideo) => void;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-extrabold">Shorts</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {shorts.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => onOpen(video)}
            className="w-36 shrink-0 text-left sm:w-40"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-white/5">
              <Thumb src={video.thumbnailUrl} alt="" fill />
            </div>
            <p className="mt-2 line-clamp-2 text-xs font-semibold">{video.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function WatchPane({
  video,
  saved,
  queue,
  onClose,
  onSave,
  onOpen,
  onChannel,
}: {
  video: CatalogVideo;
  saved: boolean;
  queue: CatalogVideo[];
  onClose: () => void;
  onSave: () => void;
  onOpen: (video: CatalogVideo) => void;
  onChannel: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const isShort = video.contentType === "SHORT";
  const duration = Math.max(video.durationSecs || 0, 1);
  const index = queue.findIndex((item) => item.id === video.id);
  const previous = index > 0 ? queue[index - 1] : null;
  const next = index >= 0 && index < queue.length - 1 ? queue[index + 1] : null;
  const suggested = queue.filter((item) => item.id !== video.id).slice(0, 12);
  const progress = Math.min(1, elapsed / duration);

  useEffect(() => {
    setPlaying(true);
    setElapsed(0);
  }, [video.id]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => Math.min(duration, current + 0.25));
    }, 250);
    return () => window.clearInterval(timer);
  }, [playing, duration, video.id]);

  function command(func: string, args: unknown[] = []) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  }

  function togglePlay() {
    command(playing ? "pauseVideo" : "playVideo");
    setPlaying((current) => !current);
  }

  function seekTo(ratio: number) {
    const time = Math.min(duration, Math.max(0, ratio * duration));
    setElapsed(time);
    command("seekTo", [time, true]);
    if (!playing) {
      command("playVideo");
      setPlaying(true);
    }
  }

  function fullscreen() {
    const node = frameRef.current;
    if (!node) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void node.requestFullscreen();
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const embed = video.youtubeVideoId
    ? `https://www.youtube.com/embed/${video.youtubeVideoId}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=0&fs=0${
        origin ? `&origin=${encodeURIComponent(origin)}` : ""
      }`
    : null;

  return (
    <section className="mb-6 overflow-hidden rounded-[28px] bg-[#12081f] shadow-[0_12px_40px_rgba(123,77,255,0.18)]">
      <div className="flex items-center px-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className={isShort ? "mx-auto w-full max-w-[380px] px-3" : "px-3 sm:px-4"}>
        <div
          ref={frameRef}
          className={`relative overflow-hidden bg-black ${isShort ? "aspect-[9/16] rounded-2xl" : "aspect-video"}`}
        >
          {embed ? (
            <iframe
              key={video.id}
              ref={iframeRef}
              title={video.title}
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <Thumb src={video.thumbnailUrl} alt="" fill />
          )}

          {!playing ? (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 m-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#7B4DFF] to-[#FF4DB8] shadow-[0_8px_24px_rgba(123,77,255,0.55)]"
            >
              <Play className="ml-1 h-8 w-8 fill-white text-white" />
            </button>
          ) : null}

          {isShort ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm font-bold">{video.channelName}</p>
              <p className="line-clamp-2 text-sm text-white/90">{video.title}</p>
            </div>
          ) : null}
        </div>

        {!isShort ? (
          <div className="relative -mt-px overflow-hidden border-t border-white/10 bg-[rgba(22,12,48,0.92)] px-3 pt-2.5 pb-3 sm:px-4">
            <button
              type="button"
              aria-label="Seek"
              className="relative mb-2 block h-2 w-full overflow-hidden rounded-full bg-white/25"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                seekTo((event.clientX - rect.left) / rect.width);
              }}
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#5FE9FF] via-[#7B4DFF] to-[#FF4DB8]"
                style={{ width: `${progress * 100}%` }}
              />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                disabled={!previous}
                onClick={() => previous && onOpen(previous)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 disabled:opacity-30"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7B4DFF] to-[#FF4DB8]"
              >
                {playing ? <Pause className="h-5 w-5 fill-white" /> : <Play className="ml-0.5 h-5 w-5 fill-white" />}
              </button>
              <button
                type="button"
                aria-label="Next"
                disabled={!next}
                onClick={() => next && onOpen(next)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 disabled:opacity-30"
              >
                <SkipForward className="h-4 w-4" />
              </button>
              <p className="min-w-0 rounded-full bg-black/25 px-2.5 py-1 text-xs font-semibold tabular-nums">
                {formatDuration(elapsed)}
                <span className="text-white/50"> / {formatDuration(duration)}</span>
              </p>
              <button
                type="button"
                aria-label="Fullscreen"
                onClick={fullscreen}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {!isShort ? (
        <div className="space-y-2 px-3 pt-3 pb-4 sm:px-4">
          <div className="relative rounded-[18px] bg-white/10 px-4 py-3.5">
            <h2 className="pr-8 text-lg font-extrabold leading-6 tracking-tight sm:text-xl">{video.title}</h2>
            <p className="mt-1.5 text-sm font-semibold text-white/65">{video.channelName}</p>
            <span className="absolute top-2 right-3 text-xl" aria-hidden>
              ⭐
            </span>
          </div>

          <div className="rounded-[14px] border border-[#7B4DFF]/25 bg-[#1e293b]/80 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onSave}
                className={`flex h-9 items-center justify-center gap-1.5 rounded-[10px] border text-xs font-bold ${
                  saved
                    ? "border-[#FF4DB8]/50 bg-[#FF4DB8]/15 text-[#FF8FB1]"
                    : "border-white/10 bg-black/20 text-white/70"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${saved ? "fill-[#FF8FB1]" : ""}`} />
                Favorite
              </button>
              <button
                type="button"
                onClick={onChannel}
                className="flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-white/10 bg-black/20 text-xs font-bold text-white/70"
              >
                Channel
              </button>
            </div>
            <div className="mx-1 my-2 h-px bg-[#7B4DFF]/20" />
            <button type="button" onClick={onChannel} className="flex w-full items-center gap-2.5 px-1 py-1 text-left">
              <Thumb src={video.channelThumbnailUrl ?? null} alt="" rounded />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{video.channelName}</span>
                <span className="block text-[11px] font-semibold text-[#9B8CFF]">Visit channel</span>
              </span>
              <ChevronLeft className="h-4 w-4 rotate-180 text-[#9B8CFF]" />
            </button>
          </div>

          {next ? (
            <button type="button" onClick={() => onOpen(next)} className="block w-full rounded-[14px] bg-gradient-to-r from-[#7B4DFF] via-[#FF4DB8] to-[#7B4DFF] p-[1.5px] text-left">
              <span className="flex h-14 items-center gap-2 rounded-[13px] bg-[#0f172a] px-2">
                <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#EDE8FF]">
                  <Thumb src={next.thumbnailUrl} alt="" fill />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold tracking-wide text-[#9B8CFF] uppercase">
                    Up next
                  </span>
                  <span className="block truncate text-sm font-semibold">{next.title}</span>
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7B4DFF]">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
                </span>
              </span>
            </button>
          ) : null}

          {suggested.length > 0 ? (
            <div className="pt-1">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-[15px] font-extrabold">Suggested for you</h3>
                <span className="rounded-full bg-[#7B4DFF]/20 px-2 py-0.5 text-xs font-bold text-[#C4B5FD]">
                  {suggested.length}
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {suggested.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpen(item)}
                    className="w-40 shrink-0 text-left"
                  >
                    <span className="relative block h-[90px] overflow-hidden rounded-2xl bg-white/10">
                      <Thumb src={item.thumbnailUrl} alt="" fill />
                      <span className="absolute right-1.5 bottom-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold">
                        {item.contentType === "SHORT" ? "Short" : formatDuration(item.durationSecs)}
                      </span>
                      <span className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/45">
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
                      </span>
                    </span>
                    <span className="mt-1.5 line-clamp-2 block text-xs font-bold">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
        active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

function Thumb({
  src,
  alt,
  rounded,
  large,
  fill,
}: {
  src: string | null;
  alt: string;
  rounded?: boolean;
  large?: boolean;
  fill?: boolean;
}) {
  if (!src) {
    return (
      <span
        className={`block bg-white/10 ${rounded ? (large ? "h-14 w-14 rounded-full" : "h-10 w-10 rounded-full") : "h-full w-full"}`}
      />
    );
  }
  return (
    // External catalog thumbnails come from YouTube and S3.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={
        fill
          ? "absolute inset-0 h-full w-full object-cover"
          : rounded
            ? large
              ? "h-14 w-14 rounded-full object-cover"
              : "h-10 w-10 rounded-full object-cover"
            : "h-full w-full object-cover"
      }
    />
  );
}
