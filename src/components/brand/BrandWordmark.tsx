import Logo from "@/components/brand/Logo";

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandWordmark({
  size = 40,
  className = "",
  priority = false,
}: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={size} priority={priority} />
      <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
        <span className="text-kidnest-violet">Kido</span>
        <span className="text-kidnest-child-accent">Nest</span>
      </span>
    </div>
  );
}
