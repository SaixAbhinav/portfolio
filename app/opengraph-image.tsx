import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sai Abhinav | Applied AI Builder";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.14), transparent 55%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#34d399",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Applied AI Builder
        </div>
        <div
          style={{
            color: "#fafafa",
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 32,
            letterSpacing: -2,
          }}
        >
          Sai Abhinav
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 32,
            maxWidth: 980,
            lineHeight: 1.4,
          }}
        >
          Reinforcement learning, detection models, and AI automation that ship.
        </div>
      </div>
    ),
    { ...size },
  );
}
