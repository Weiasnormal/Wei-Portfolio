import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One shared card for every page. Pages differ by their title and description in the OG tags.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0B0D11",
          color: "#E9ECF1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#9AA2B0" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#7AA2FF" }} />
          {site.statusLong}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 36, color: "#9AA2B0", maxWidth: 900, lineHeight: 1.35 }}>
            I lead small teams that build web and mobile apps.
          </div>
        </div>
        <div style={{ height: 4, width: 220, background: "#7AA2FF" }} />
      </div>
    ),
    size,
  );
}
