import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const scale = 180 / 32;

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050510",
          borderRadius: 28,
        }}
      >
        <svg
          width={180}
          height={180}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="g"
              x1="0"
              y1="0"
              x2="32"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#06b6d4" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M8 6h4v20H8Z M20 6h4v20h-4Z M12 6c2 5 5 13 8 20h4C21 19 18 11 16 6h-4Z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
