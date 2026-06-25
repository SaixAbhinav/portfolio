import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sai Abhinav - Explorer of intelligent systems";

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
          backgroundColor: "#07101a",
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(255,189,129,0.18), transparent 42%), radial-gradient(circle at 82% 26%, rgba(217,200,255,0.14), transparent 44%)",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            color: "#ffbd81",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Explorer of intelligent systems
        </div>
        <div
          style={{
            color: "#f6ddc9",
            fontSize: 132,
            fontWeight: 600,
            lineHeight: 1,
            marginBottom: 32,
            letterSpacing: 0,
          }}
        >
          Sai Abhinav
        </div>
        <div
          style={{
            color: "#c1b7b2",
            fontSize: 32,
            maxWidth: 980,
            lineHeight: 1.4,
          }}
        >
          Build. Observe. Understand.
        </div>
      </div>
    ),
    { ...size },
  );
}
