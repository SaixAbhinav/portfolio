"use client";

import { CSSProperties, useEffect, useState } from "react";
import { GitBranch, FileDown } from "lucide-react";

const PHASES = [
  "init",
  "hi",
  "fading",
  "name",
  "eyebrow",
  "bio",
  "done",
] as const;
type Phase = (typeof PHASES)[number];

const TEXTS = {
  eyebrow: "Aspiring AI Engineer",
  name: "I’m Sai Abhinav",
  bio: "I enjoy building stuff.",
};

const SPEEDS = {
  eyebrow: 70,
  name: 180,
  bio: 50,
};

const typingStyle = (text: string, speed: number): CSSProperties => ({
  animation: `typing ${text.length * speed}ms steps(${text.length}, end) forwards`,
});

export function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("init");

  // Drive intro: blank → Hi pops → Hi fades & rest fades in → typing starts
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hi"), 250);
    const t2 = setTimeout(() => setPhase("fading"), 1400);
    const t3 = setTimeout(() => setPhase("name"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const phaseIndex = PHASES.indexOf(phase);
  const past = (target: Phase) => phaseIndex > PHASES.indexOf(target);
  const atOrPast = (target: Phase) => phaseIndex >= PHASES.indexOf(target);

  return (
    <div className="relative w-full">
      {/* Underlying hero content — centered, invisible until Hi starts fading out */}
      <div
        className={`flex flex-col items-center text-center transition-opacity duration-700 ${
          atOrPast("fading") ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Name — centered headline, types first */}
        <div className="mb-8 min-h-[1.1em] mx-auto w-max max-w-full">
          {atOrPast("name") && (
            <h1
              className={`overflow-hidden whitespace-nowrap pr-2 text-[2.5rem] font-bold tracking-tighter sm:text-8xl lg:text-9xl ${
                phase === "name" ? "border-r-[6px] border-emerald-400" : ""
              }`}
              style={
                phase === "name"
                  ? typingStyle(TEXTS.name, SPEEDS.name)
                  : { width: "100%" }
              }
              onAnimationEnd={() => phase === "name" && setPhase("eyebrow")}
            >
              <span className="bg-gradient-to-br from-white via-zinc-200 to-emerald-300 bg-clip-text text-transparent">
                {TEXTS.name}
              </span>
              {past("name") && (
                <span
                  aria-hidden="true"
                  className="blink-bar ml-3 inline-block h-10 w-[6px] bg-emerald-400 align-middle sm:h-24 lg:h-28"
                />
              )}
            </h1>
          )}
        </div>

        {/* Eyebrow — appears below as a role tag, types after the name */}
        <div className="mb-8 min-h-[1.6em] mx-auto w-max max-w-full">
          {atOrPast("eyebrow") && (
            <p
              className={`overflow-hidden whitespace-nowrap pr-1 text-base font-medium uppercase tracking-[0.3em] sm:text-lg ${
                phase === "eyebrow"
                  ? "border-r-2 border-emerald-400 text-emerald-400"
                  : "text-emerald-400"
              }`}
              style={
                phase === "eyebrow"
                  ? typingStyle(TEXTS.eyebrow, SPEEDS.eyebrow)
                  : { width: "100%" }
              }
              onAnimationEnd={() => phase === "eyebrow" && setPhase("bio")}
            >
              {TEXTS.eyebrow}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="mb-12 min-h-[2em] mx-auto w-max max-w-full">
          {atOrPast("bio") && (
            <p
              className={`overflow-hidden whitespace-nowrap pr-1 text-2xl leading-relaxed text-zinc-300 sm:text-4xl lg:text-5xl ${
                phase === "bio" ? "border-r-[3px] border-emerald-400" : ""
              }`}
              style={
                phase === "bio"
                  ? typingStyle(TEXTS.bio, SPEEDS.bio)
                  : { width: "100%" }
              }
              onAnimationEnd={() => phase === "bio" && setPhase("done")}
            >
              {TEXTS.bio}
            </p>
          )}
        </div>

        {/* CTAs + social/resume row — fade in after typing finishes */}
        <div
          className={`flex flex-col items-center gap-5 transition-opacity duration-500 ${
            past("bio") ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="inline-block rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-zinc-950 transition-colors duration-300 hover:bg-emerald-400"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-block rounded-full border border-zinc-700 px-8 py-4 text-base font-semibold text-zinc-300 transition-colors duration-300 hover:border-zinc-500 hover:text-zinc-100"
            >
              Get in Touch
            </a>
          </div>

          {/* Social + resume */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/SaixAbhinav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-zinc-100"
            >
              <GitBranch size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/saixabhinav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-zinc-100"
            >
              <FileDown size={16} />
              Résumé
            </a>
          </div>
        </div>
      </div>

      {/* Hi — big centered overlay, pops in then fades out */}
      <div
        aria-hidden={atOrPast("fading") ? "true" : undefined}
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          phase === "init"
            ? "scale-75 opacity-0"
            : phase === "hi"
              ? "scale-100 opacity-100"
              : "scale-110 opacity-0"
        }`}
      >
        <span className="bg-gradient-to-br from-white via-zinc-200 to-emerald-300 bg-clip-text text-9xl font-bold tracking-tighter text-transparent sm:text-[12rem] lg:text-[14rem]">
          Hi!
        </span>
      </div>
    </div>
  );
}
