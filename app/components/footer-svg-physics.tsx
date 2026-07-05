"use client";

import { useEffect, useRef } from "react";

const SVG_PATHS = [
  "/svg/react-svgrepo-com.svg",
  "/svg/node-js-svgrepo-com.svg",
  "/svg/python-svgrepo-com.svg",
  "/svg/docker-svgrepo-com.svg",
  "/svg/github-svgrepo-com.svg",
  "/svg/js-svgrepo-com.svg",
  "/svg/html-5-svgrepo-com.svg",
  "/svg/css-3-svgrepo-com.svg",
  "/svg/amazon-svgrepo-com.svg",
  "/svg/git-svgrepo-com.svg",
  "/svg/figma-svgrepo-com.svg",
  "/svg/npm-svgrepo-com.svg",
  "/svg/angular-svgrepo-com.svg",
  "/svg/swift-svgrepo-com.svg",
  "/svg/java-svgrepo-com.svg",
  "/svg/go-svgrepo-com.svg",
  "/svg/google-svgrepo-com.svg",
  "/svg/microsoft-svgrepo-com.svg",
  "/svg/vs-code-svgrepo-com.svg",
  "/svg/stack-overflow-svgrepo-com.svg",
  "/svg/android-svgrepo-com.svg",
  "/svg/ios-svgrepo-com.svg",
  "/svg/fedora-svgrepo-com.svg",
  "/svg/finder-svgrepo-com.svg",
  "/svg/jb-intellij-idea-svgrepo-com.svg",
  "/svg/cpp-svgrepo-com.svg",
  "/svg/csharp-svgrepo-com.svg",
  "/svg/php-logo_svgstack_com_29001775191405.svg",
  "/svg/laravel-logo_svgstack_com_28681775191388.svg",
  "/svg/flutter-logo_svgstack_com_28331775191419.svg",
  "/svg/nestjs-logo_svgstack_com_28861775191469.svg",
  "/svg/nextjs-logo_svgstack_com_28891775191458.svg",
  "/svg/postgre-sql-logo_svgstack_com_29021775191446.svg",
  "/svg/nextjs-logo-icon_svgstack_com_28901775191433.svg",
];

const COLORS = ["#c9f31d", "#818cf8", "#06b6d4", "#f472b6", "#fb923c"];
const TEX_PX = 256;

/** Desktop — matches current look */
const SIZES_DESKTOP = {
  small: [70, 95],
  medium: [100, 130],
  large: [140, 180],
} as const;

/** Mobile — smaller so the pile doesn’t overwhelm the viewport */
const SIZES_MOBILE = {
  small: [36, 48],
  medium: [52, 68],
  large: [72, 92],
} as const;

const MD_BREAKPOINT = 768;

async function rasterizeSvg(url: string, px: number): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return "";
    let svgText = await res.text();

    svgText = svgText.replace(
      /<svg([^>]*)>/i,
      (_, attrs: string) => {
        let patched = attrs;
        if (!/\bwidth\s*=/i.test(patched)) patched += ` width="${px}"`;
        if (!/\bheight\s*=/i.test(patched)) patched += ` height="${px}"`;
        return `<svg${patched}>`;
      },
    );

    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);

    const dataUrl = await new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = px;
        c.height = px;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0, px, px);
        URL.revokeObjectURL(blobUrl);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = () => {
        URL.revokeObjectURL(blobUrl);
        resolve("");
      };
      img.src = blobUrl;
    });

    return dataUrl;
  } catch {
    return "";
  }
}

export default function FooterSvgPhysics() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    const init = async () => {
      const textures = await Promise.all(
        SVG_PATHS.map((p) => rasterizeSvg(p, TEX_PX)),
      );
      const valid = textures.filter(Boolean);

      if (!mounted || !containerRef.current || !valid.length) return;

      const Matter = await import("matter-js");
      const {
        Engine, Render, Runner, Common, Composite,
        MouseConstraint, Mouse, Bodies, Body, Events,
      } = Matter;

      const host = containerRef.current;
      const parent = host.parentElement!;
      const engine = Engine.create({ gravity: { x: 0, y: 0.8, scale: 0.001 } });
      const { world } = engine;

      const cw = parent.clientWidth;
      const ch = parent.clientHeight;

      const render = Render.create({
        element: host,
        engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "transparent",
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        },
      });

      const canvas = render.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "none";
      canvas.style.touchAction = "auto";

      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Walls: floor + left + right (no ceiling so logos rain in)
      type WallBody = ReturnType<typeof Bodies.rectangle>;
      let walls: WallBody[] = [];

      const makeWalls = (w: number, h: number) => {
        walls.forEach((b) => Composite.remove(world, b));
        const t = 60;
        walls = [
          Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, {
            isStatic: true, render: { visible: false },
          }),
          Bodies.rectangle(-t / 2, h / 2, t, h * 2, {
            isStatic: true, render: { visible: false },
          }),
          Bodies.rectangle(w + t / 2, h / 2, t, h * 2, {
            isStatic: true, render: { visible: false },
          }),
        ];
        Composite.add(world, walls);
      };
      makeWalls(cw, ch);

      const narrow = cw < MD_BREAKPOINT;
      const sizeTable = narrow ? SIZES_MOBILE : SIZES_DESKTOP;
      const edgePad = Math.max(32, Math.min(80, cw * 0.12));

      // Spawn one body per valid texture — varied sizes
      const tiers: (keyof typeof SIZES_DESKTOP)[] = ["small", "medium", "large"];
      for (let i = 0; i < valid.length; i++) {
        const tex = valid[i];
        const tier = tiers[i % 3];
        const [lo, hi] = sizeTable[tier];
        const size = Common.random(lo, hi);
        const scale = size / TEX_PX;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        const body = Bodies.circle(
          Common.random(edgePad, Math.max(edgePad + 1, cw - edgePad)),
          Common.random(narrow ? -900 : -1200, -40),
          size / 2,
          {
            restitution: 0.45,
            friction: 0.1,
            frictionAir: 0.018,
            density: 0.001,
            render: {
              fillStyle: color,
              strokeStyle: color,
              lineWidth: 0,
              sprite: { texture: tex, xScale: scale, yScale: scale },
            },
          },
        );

        Body.setAngularVelocity(body, Common.random(-0.05, 0.05));
        Composite.add(world, body);
      }

      // Mouse drag — use a dummy element for Mouse.create so Matter.js doesn't
      // attach scroll-blocking listeners to the real section. We manually forward
      // pointer events from the section instead.
      const dummy = document.createElement("div");
      const mouse = Mouse.create(dummy);

      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Composite.add(world, mc);
      render.mouse = mouse;

      // Forward pointer events from window — no listeners on the section so
      // scrolling is never blocked. Coordinates are relative to the section.
      const getPos = (e: MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };

      const isInside = (e: MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      };

      const onMouseMove = (e: MouseEvent) => {
        const pos = getPos(e);
        mouse.position.x = pos.x;
        mouse.position.y = pos.y;
      };
      const onMouseDown = (e: MouseEvent) => {
        if (!isInside(e)) return;
        const pos = getPos(e);
        mouse.position.x = pos.x;
        mouse.position.y = pos.y;
        mouse.button = 0;
      };
      const onMouseUp = () => {
        mouse.button = -1;
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mousedown", onMouseDown, { passive: true });
      window.addEventListener("mouseup", onMouseUp, { passive: true });

      // Responsive — use Matter's own resize API. Setting canvas.width/height
      // directly (as a manual approach would) resets the 2D context and wipes
      // out the pixelRatio scale transform Matter applied in Render.create,
      // which squashes all sprites into a corner of the canvas (making them
      // appear to vanish). Render.setSize handles this correctly.
      const ro = new ResizeObserver(() => {
        const nw = parent.clientWidth;
        const nh = parent.clientHeight;
        Render.setSize(render, nw, nh);
        makeWalls(nw, nh);
      });
      ro.observe(parent);

      // ─── Dynamic gravity: water-like sloshing ────────────────────
      // Mobile / touch devices only — real DeviceOrientation (gyroscope)
      // drives gravity. The cursor no longer auto-tilts gravity on desktop
      // (it used to, but any upward tilt near the top of the section could
      // fling icons out through the missing ceiling, so it was removed —
      // desktop now only supports the direct drag-to-throw interaction).

      const LERP_FACTOR = 0.06;     // smoothing — lower = more fluid/sluggish
      // Engine uses gravity.scale = 0.001, so effective gravity = value × 0.001.
      // MAX_G=800 → effective max = 0.8 (strong but not insane).
      const MAX_G = 800;
      // There is no ceiling wall (icons rain in from the top), so vertical
      // gravity must NEVER go negative/upward or bodies get flung off the top
      // of the canvas permanently. Floor it at a small positive pull instead.
      const MIN_GY = 60;

      let targetGx = 0;
      let targetGy = 0.8; // matches engine init gravity.y
      let gravityActive = false;

      const clampVal = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

      // ── DeviceOrientation (mobile gyroscope) ────────────────────
      let orientationListenerAttached = false;

      const onDeviceOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        gravityActive = true;

        // gamma: -90 (tilt left) … +90 (tilt right) → gravity.x
        targetGx = clampVal((e.gamma / 45) * MAX_G, -MAX_G, MAX_G);
        // beta: 0 (flat) … 90 (upright). Treat ~30° as neutral downward.
        // Add a baseline downward pull so SVGs don't float away
        targetGy = clampVal(100 + ((e.beta - 30) / 40) * MAX_G, MIN_GY, MAX_G);
      };

      const attachOrientationListener = () => {
        if (orientationListenerAttached) return;
        orientationListenerAttached = true;
        // Use only the standard event — deviceorientationabsolute can have
        // different value ranges on some Android devices and causes conflicts.
        window.addEventListener("deviceorientation", onDeviceOrientation, {
          passive: true,
        });
      };

      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };

      let detachIosPermissionTrigger: (() => void) | null = null;

      if (typeof DOE.requestPermission === "function") {
        // iOS 13+: needs a user gesture to request permission.
        // Listen on both touchend and click on the DOCUMENT (not just the
        // section parent) so any interaction on the page unlocks sensors.
        const requestAndAttach = () => {
          DOE.requestPermission!()
            .then((state) => {
              if (state === "granted") {
                attachOrientationListener();
              }
            })
            .catch(() => {});
        };
        const onFirstGesture = () => {
          requestAndAttach();
          if (detachIosPermissionTrigger) detachIosPermissionTrigger();
        };
        // Use document-level listeners — the footer section may have
        // pointer-events:none, so it won't receive touch events directly.
        document.addEventListener("touchend", onFirstGesture, { passive: true, once: true });
        document.addEventListener("click", onFirstGesture, { once: true });
        detachIosPermissionTrigger = () => {
          document.removeEventListener("touchend", onFirstGesture);
          document.removeEventListener("click", onFirstGesture);
        };
      } else {
        // Android / desktop: no permission required, just attach.
        // On desktop without sensors the event simply never fires, so
        // gravity just stays at its static default.
        attachOrientationListener();
      }

      // ── Smooth gravity interpolation (shared) ───────────────────
      const onBeforeUpdate = () => {
        if (!gravityActive) return;
        const g = engine.gravity;
        g.x += (targetGx - g.x) * LERP_FACTOR;
        g.y += (targetGy - g.y) * LERP_FACTOR;
        // scale stays at 0.001 (set at engine init) — our target values
        // are already scaled to compensate (e.g. 800 × 0.001 = 0.8).
      };
      Events.on(engine, "beforeUpdate", onBeforeUpdate);

      cleanup = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        if (detachIosPermissionTrigger) detachIosPermissionTrigger();
        window.removeEventListener("deviceorientation", onDeviceOrientation);
        Events.off(engine, "beforeUpdate", onBeforeUpdate);
        ro.disconnect();
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(world, false);
        Engine.clear(engine);
        canvas.remove();
        render.textures = {};
      };
    };

    void init();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
