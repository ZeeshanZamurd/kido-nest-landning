import Link from "next/link";
import BrandWordmark from "@/components/brand/BrandWordmark";

type Props = {
  title: string;
  description?: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export default function LegalPageShell({
  title,
  description,
  lastUpdated = "July 4, 2026",
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-kidnest-slate-50">
      <header className="border-b border-kidnest-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" aria-label="Back to KidoNest home">
            <BrandWordmark size={34} />
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-kidnest-violet hover:text-kidnest-pink"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-kidnest-slate-900 sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-kidnest-slate-600">
              {description}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-kidnest-slate-500">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="rounded-2xl border border-kidnest-slate-200 bg-white p-6 shadow-card sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
