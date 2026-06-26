import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-kidnest-violet/20 bg-kidnest-violet/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-kidnest-violet",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-kidnest-violet animate-pulse" />
      {children}
    </span>
  );
}
