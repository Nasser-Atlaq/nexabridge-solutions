import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NexaBridge Solutions — Bridging Ideas to Innovation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050510",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            width: 450,
            height: 450,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(to right, #06b6d4, #2563eb, #8b5cf6)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span
            style={{ fontSize: 56, fontWeight: 800, color: "#fafafa" }}
          >
            Nexa
          </span>
          <span
            style={{ fontSize: 56, fontWeight: 800, color: "#06b6d4" }}
          >
            Bridge
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#a1a1aa",
            marginTop: 16,
            letterSpacing: 1,
          }}
        >
          Bridging Ideas to Innovation
        </div>

        {/* Services row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
            color: "#71717a",
            fontSize: 15,
          }}
        >
          <span>Web Development</span>
          <span style={{ color: "#3f3f46" }}>|</span>
          <span>Mobile Apps</span>
          <span style={{ color: "#3f3f46" }}>|</span>
          <span>AI Automation</span>
          <span style={{ color: "#3f3f46" }}>|</span>
          <span>IT Consulting</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
