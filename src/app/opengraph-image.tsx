import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rishu Rana — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #0f0f14 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), transparent)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 99,
            padding: "8px 20px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#a78bfa",
            }}
          />
          <span style={{ color: "#a78bfa", fontSize: 18 }}>
            Available for Work
          </span>
        </div>
        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f4f4f5",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Rishu Rana
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            background: "linear-gradient(to right, #a78bfa, #38bdf8)",
            backgroundClip: "text",
            color: "transparent",
            marginTop: 8,
          }}
        >
          Fullstack Developer
        </div>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
          }}
        >
          {["React", "Next.js", "Node.js", "TypeScript"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "8px 16px",
                color: "#a1a1aa",
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "#52525b",
            fontSize: 18,
          }}
        >
          rishurana.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
