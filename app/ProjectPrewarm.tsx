"use client";

import { useEffect } from "react";

type Props = { urls: string[] };

// Render's free tier spins down idle services, so the embedded SmartSignal
// iframe can take ~30s to wake on first load. Firing an opaque no-cors ping
// the moment the page mounts wakes the dyno well before the visitor scrolls
// down to Projects and clicks "Expand".
export function ProjectPrewarm({ urls }: Props) {
  useEffect(() => {
    urls.forEach((url) => {
      fetch(url, { mode: "no-cors", cache: "no-store" }).catch(() => {});
    });
  }, [urls]);

  return null;
}
