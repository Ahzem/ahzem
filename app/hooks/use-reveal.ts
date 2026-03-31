"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useReveal<T extends HTMLElement>(
  thresh = 0.12,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: thresh },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [thresh]);

  return [ref, visible];
}
