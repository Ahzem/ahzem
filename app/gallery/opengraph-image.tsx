import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function GalleryOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(130deg, rgb(12, 12, 12) 5%, rgb(18, 18, 18) 50%, rgb(8, 8, 8) 100%)",
          color: "#f0ece2",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#c9f31d" }}>GALLERY</div>
        <div
          style={{
            marginTop: 18,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.08,
            display: "flex",
            flexDirection: "column",
          }}
        >
          Moments, Events,
          <br />
          and Milestones
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(240, 236, 226, 0.84)" }}>
          Conferences · Awards · Community Highlights
        </div>
      </div>
    ),
    size,
  );
}
