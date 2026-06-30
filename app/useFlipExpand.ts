"use client";

import { useState, useRef, useCallback, useEffect, type RefObject } from "react";

// FLIP-style expand/collapse animation for a card that grows into a centered
// overlay. Captures the card's on-screen rect at open time, then animates the
// overlay from that rect to its final position. Used by ProjectCard.
export function useFlipExpand(cardRef: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cardRectRef = useRef<DOMRect | null>(null);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const open = useCallback(() => {
    clearTimeout(closeTimer.current);
    cardRectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
    setVisible(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  }, [cardRef]);

  const close = useCallback(() => {
    setAnimate(false);
    closeTimer.current = setTimeout(() => setVisible(false), 380);
  }, []);

  const getStartTransform = useCallback(() => {
    const r = cardRectRef.current;
    if (!r) return "translate(0px, 0px) scale(0.9)";
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const expandedW = Math.min(768, vpW - 48);
    const dx = (r.left + r.width / 2) - vpW / 2;
    const dy = (r.top + r.height / 2) - vpH / 2;
    const scale = r.width / expandedW;
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  }, []);

  return { visible, animate, open, close, getStartTransform };
}
