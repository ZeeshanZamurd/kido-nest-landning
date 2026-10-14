export type TaxonomyItem = {
  id: string;
  name: string;
  slug?: string;
  code?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Language = {
  id: string;
  name: string;
  code: string;
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
};

export type Paged<T> = {
  data: T[];
  meta: PageMeta;
};

export type CatalogVideo = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  durationSecs: number;
  contentType: "VIDEO" | "SHORT";
  channelName: string;
  channelId: string;
  channelThumbnailUrl?: string | null;
  isPremium?: boolean;
  youtubeVideoId?: string | null;
  youtubeUrl?: string | null;
  primaryCategory: TaxonomyItem | null;
  primaryLanguage: TaxonomyItem | null;
  categories: TaxonomyItem[];
  languages: TaxonomyItem[];
};

export type CatalogChannel = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  isPremium?: boolean;
  videoCount: number;
  shortCount?: number;
  playlistCount?: number;
  totalCount?: number;
  primaryCategory: TaxonomyItem | null;
  primaryLanguage: TaxonomyItem | null;
  categories: TaxonomyItem[];
  languages: TaxonomyItem[];
};

export type CatalogPlaylist = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  videoCount: number;
  channelId: string;
  channelTitle: string;
};

function buildUrl(path: string, params?: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") search.set(key, String(value));
    }
  }
  const query = search.toString();
  return `/api/catalog${path}${query ? `?${query}` : ""}`;
}

async function getJson<T>(path: string, params?: Record<string, string | number | undefined>) {
  const response = await fetch(buildUrl(path, params), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Catalog request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function formatDuration(secs: number) {
  const safe = Number.isFinite(secs) ? Math.max(0, Math.floor(secs)) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function fetchCategories() {
  return getJson<Paged<Category>>("/categories", { limit: 100 });
}

export function fetchLanguages() {
  return getJson<Paged<Language>>("/languages", { limit: 100 });
}

export function fetchVideos(params: {
  search?: string;
  categoryId?: string;
  languageId?: string;
  channelId?: string;
  playlistId?: string;
  contentType?: "VIDEO" | "SHORT";
  page?: number;
  limit?: number;
}) {
  return getJson<Paged<CatalogVideo>>("/videos", params);
}

export function fetchChannels(params: {
  search?: string;
  categoryId?: string;
  languageId?: string;
  page?: number;
  limit?: number;
}) {
  return getJson<Paged<CatalogChannel>>("/channels", params);
}

export function fetchChannelPlaylists(channelId: string) {
  return getJson<CatalogPlaylist[]>(`/channels/${channelId}/playlists`);
}

export function fetchVideo(id: string) {
  return getJson<CatalogVideo>(`/videos/${id}`);
}
