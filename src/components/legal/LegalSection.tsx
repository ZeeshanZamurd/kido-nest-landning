type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalSection({ title, children }: Props) {
  return (
    <section className="border-b border-kidnest-slate-100 py-6 last:border-b-0 last:pb-0 first:pt-0">
      <h2 className="text-lg font-bold text-kidnest-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-kidnest-slate-600">
        {children}
      </div>
    </section>
  );
}
