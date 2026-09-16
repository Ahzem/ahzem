"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DevtoolsDetector, checkers } from "devtools-detector";
import { usePortfolioCursorOptional } from "./portfolio-cursor-context";

const FUNNY_DEV_MESSAGES = [
  "Looking for backend secrets? All you will find here is client-side state, unhandled promises, and sheer willpower.",
  "Console sniffing detected. Rumor has it every time you inspect this element, another div gets an unnecessary wrapper.",
  "Checking our source code? The only real vulnerability here is our developer's sleep schedule.",
  "F12 will not fix production either, but nice try. Please close DevTools to resume your session.",
  "Warning: Inspecting this DOM may cause sudden realization that flexbox and grid are doing all the heavy lifting.",
  "Searching for hidden API keys? We keep those where they belong: safely tucked away on the server.",
  "There is no secret sauce here, just 4,000 lines of CSS and an alarming amount of espresso.",
  "Nice inspection skills. Now if you could only find where that phantom 1px margin bug is coming from.",
];

// Explicitly exclude debuggerChecker to NEVER pause the browser with 'debugger;'
const SAFE_CHECKERS = [
  checkers.elementIdChecker,
  checkers.regToStringChecker,
  checkers.functionToStringChecker,
  checkers.depRegToStringChecker,
  checkers.dateToStringChecker,
];

export default function DevtoolsGuard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const cursorApi = usePortfolioCursorOptional();
  const isBypassedRef = useRef(false);
  isBypassedRef.current = isBypassed;

  // Check bypass query param or existing session
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mac =
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setIsMac(mac);

    const savedBypass = sessionStorage.getItem("ahzem_devtools_bypassed");
    const urlParams = new URLSearchParams(window.location.search);
    if (savedBypass === "true" || urlParams.get("dev") === "bypass") {
      setIsBypassed(true);
      isBypassedRef.current = true;
    } else if (
      urlParams.get("test_devtools") === "1" ||
      urlParams.get("devtools") === "true"
    ) {
      setIsOpen(true);
    }
  }, []);

  // Real-time non-blocking detection (NO debugger pauses)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Instant check for docked DevTools (docked right, left, bottom, top)
    const checkDocked = () => {
      if (isBypassedRef.current) return false;
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      return widthDiff > threshold || heightDiff > threshold;
    };

    let detectorOpen = false;

    const evaluateState = () => {
      if (isBypassedRef.current) {
        setIsOpen(false);
        return;
      }
      const docked = checkDocked();
      const detected = docked || detectorOpen;
      setIsOpen(detected);
    };

    // Run immediate check synchronously on mount
    evaluateState();

    // 2. Safe checkers detector for undocked/detached DevTools (NO debuggerChecker)
    let detector: DevtoolsDetector | null = null;
    try {
      detector = new DevtoolsDetector({ checkers: SAFE_CHECKERS });
      detector.addListener((open: boolean) => {
        detectorOpen = open;
        evaluateState();
      });
      detector.setDetectDelay(400);
      detector.launch();
    } catch (err) {
      console.warn("Devtools safe detector init:", err);
    }

    // 3. Window resize listener
    const onResize = () => {
      evaluateState();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // 4. Polling heartbeat for immediate reaction
    const pollInterval = window.setInterval(evaluateState, 350);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(pollInterval);
      if (detector) {
        detector.stop();
      }
    };
  }, []);

  // Restore cursor on body when DevTools notice is displayed
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen && !isBypassed) {
      const prevCursor = document.body.style.cursor;
      document.body.style.cursor = "auto";
      return () => {
        document.body.style.cursor = prevCursor;
      };
    }
  }, [isOpen, isBypassed]);

  // Hidden keyboard shortcut for owner bypass (Cmd+Opt+Shift+D or Ctrl+Alt+Shift+D)
  const handleBypassUnlock = useCallback(() => {
    setIsBypassed(true);
    isBypassedRef.current = true;
    setIsOpen(false);
    sessionStorage.setItem("ahzem_devtools_bypassed", "true");
    cursorApi?.resetCursor();
  }, [cursorApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifierActive = isMac
        ? e.metaKey && e.altKey && e.shiftKey
        : e.ctrlKey && e.altKey && e.shiftKey;

      if (isModifierActive && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        handleBypassUnlock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac, handleBypassUnlock]);

  const cycleMessage = () => {
    setMessageIndex((prev) => (prev + 1) % FUNNY_DEV_MESSAGES.length);
  };

  const shouldShow = isOpen && !isBypassed;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.aside
          aria-label="Developer inspection notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
          style={{
            backgroundColor: "color-mix(in oklab, var(--background) 94%, black)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Subtle noise grain texture matching site grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Ambient neon radial glow matching --accent */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] pointer-events-none rounded-full blur-[160px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-[540px] border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))] p-6 sm:p-9 text-center shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
            style={{
              borderTop: "3px solid var(--accent)",
            }}
          >
            {/* Caution Mini Tape Header */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-[var(--accent)]" />

            {/* Top Label & Pill Badge */}
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="font-portfolio-mono text-[10px] font-medium uppercase tracking-[4px] text-[var(--accent)]">
                Access Protocol
              </span>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-portfolio-mono text-[11px] font-bold uppercase tracking-[2.5px] shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_25%,transparent)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                </span>
                <span>DevTools Detected</span>
              </div>
            </div>

            {/* Headline matching site section titles */}
            <h2 className="font-portfolio text-[clamp(28px,4.5vw,40px)] font-bold tracking-[-2px] leading-[1.05] text-[var(--foreground)] mb-3">
              Restricted Environment<span className="text-[var(--accent)]">.</span>
            </h2>

            {/* Sub-description */}
            <p className="font-portfolio text-sm sm:text-[15px] leading-relaxed text-[var(--muted)] mb-5 max-w-[440px] mx-auto">
              Developer inspection tools are currently open. Close DevTools to
              continue exploring the portfolio.
            </p>

            {/* Terminal Window Box (Styled like Ahzem's Terminal Contact Form) */}
            <div
              onClick={cycleMessage}
              onMouseEnter={() => cursorApi?.setCursor("RE-ROLL")}
              onMouseLeave={() => cursorApi?.resetCursor()}
              title="Click to cycle quote"
              className="group cursor-pointer mb-5 border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--background)_88%,var(--foreground))] text-left transition-all hover:border-[var(--accent)]/60"
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-2 bg-[color-mix(in_oklab,var(--background)_80%,var(--foreground))]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-portfolio-mono text-[11px] text-[var(--muted)] select-none">
                  inspection@ahzem: ~
                </span>
                <span className="font-portfolio-mono text-[10px] uppercase tracking-wider text-[var(--accent)] group-hover:underline select-none">
                  [Click to Cycle]
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-3.5 sm:p-4 font-portfolio-mono text-xs sm:text-[13px] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 text-[var(--accent)] select-none font-bold">
                    ➜
                  </span>
                  <div className="text-[var(--foreground)]">
                    &ldquo;{FUNNY_DEV_MESSAGES[messageIndex]}&rdquo;
                    <span className="animate-pulse inline-block ml-1 text-[var(--accent)] select-none">
                      ▋
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Spec Box matching site card style */}
            <div className="mb-6 border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--background)_92%,var(--foreground))] p-4 text-left font-portfolio-mono text-xs">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)] text-[10px] uppercase tracking-[3px]">
                <span className="text-[var(--muted)] font-semibold">Security Spec</span>
                <span className="text-[var(--accent)] font-semibold tracking-[2px] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Restricted
                </span>
              </div>

              <div className="space-y-2 text-[var(--foreground)] text-[11px] sm:text-[12px]">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Inspector Status:</span>
                  <span className="font-medium text-[var(--foreground)]">Active Window</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Source Protection:</span>
                  <span className="font-medium text-[var(--accent)]">Enforced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Hidden Secrets:</span>
                  <span className="text-[var(--foreground)]">0 (Zero)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Coffee Protocol:</span>
                  <span className="text-[var(--accent)]">Bribe Accepted</span>
                </div>
              </div>
            </div>

            {/* Lower Auto-Unlock Notice */}
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <p className="font-portfolio-mono text-xs text-[var(--muted)] tracking-wide">
                The screen will unlock automatically once Developer Tools are closed.
              </p>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
