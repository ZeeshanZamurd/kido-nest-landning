import Image from "next/image";
import { BRAND_IMAGE } from "@/constants/branding";

type Props = {
  size?: number;
  shadow?: boolean;
  className?: string;
  priority?: boolean;
};

/** Official KidoNest shield icon — baby in protective nest. */
export default function Logo({
  size = 36,
  shadow = true,
  className = "",
  priority = false,
}: Props) {
  return (
    <Image
      src={BRAND_IMAGE}
      alt="KidoNest"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${shadow ? "drop-shadow-[0_4px_14px_rgba(123,77,255,0.28)]" : ""} ${className}`}
      style={{ width: size, height: size }}
      quality={85}
    />
  );
}
