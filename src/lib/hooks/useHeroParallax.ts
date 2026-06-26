"use client";

import { useCallback, useRef, type RefObject } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useFinePointer } from "./useFinePointer";

type ParallaxMotion = {
  enabled: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
};

const spring = { stiffness: 90, damping: 28, mass: 0.45 };

export function useHeroParallax(
  ref: RefObject<HTMLDivElement | null>,
): ParallaxMotion {
  const enabled = useFinePointer();
  const rafRef = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), spring);
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), spring);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;
      const { clientX, clientY } = e;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((clientX - rect.left) / rect.width - 0.5);
        mouseY.set((clientY - rect.top) / rect.height - 0.5);
      });
    },
    [enabled, mouseX, mouseY, ref],
  );

  const onMouseLeave = useCallback(() => {
    if (!enabled) return;
    mouseX.set(0);
    mouseY.set(0);
  }, [enabled, mouseX, mouseY]);

  return {
    enabled,
    rotateX,
    rotateY,
    translateX,
    translateY,
    onMouseMove,
    onMouseLeave,
  };
}
