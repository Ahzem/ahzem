import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
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
            "linear-gradient(120deg, rgb(12, 12, 12) 10%, rgb(20, 20, 20) 55%, rgb(10, 10, 10) 100%)",
          color: "#f0ece2",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 5, color: "#c9f31d" }}>
          MUHAMMADH AHZEM
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          Software Engineer
          <br />
          Full-Stack Developer
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(240, 236, 226, 0.84)" }}>
          Next.js · NestJS · Flutter · AWS · AI Integrations
        </div>
      </div>
    ),
    size,
  );
}
