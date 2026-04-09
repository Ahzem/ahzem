"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL } from "../portfolio-data";

type Step = "name" | "email" | "message" | "confirm" | "done";

type Line =
  | { kind: "system"; text: string }
  | { kind: "prompt"; text: string }
  | { kind: "answer"; text: string }
  | { kind: "success"; text: string }
  | { kind: "warn"; text: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_LINES: Line[] = [
  { kind: "system", text: "── contact terminal ─────────────────────────────" },
  { kind: "system", text: "" },
  { kind: "prompt", text: "Hey there! What's your name?" },
];

export default function TerminalContactForm() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<Line[]>(INITIAL_LINES);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (...lines: Line[]) => setHistory((h) => [...h, ...lines]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (step !== "done") inputRef.current?.focus();
  }, [step]);

  function onEnter() {
    const val = draft.trim();

    if (step === "confirm") {
      if (val.toLowerCase() === "reset") {
        reset();
        return;
      }
      send();
      return;
    }

    if (!val) return;
    setDraft("");

    if (step === "name") {
      setName(val);
      push(
        { kind: "answer", text: `> ${val}` },
        { kind: "system", text: "" },
        { kind: "prompt", text: `Nice to meet you, ${val}! What's your email?` },
      );
      setStep("email");
    } else if (step === "email") {
      if (!EMAIL_RE.test(val)) {
        push(
          { kind: "answer", text: `> ${val}` },
          { kind: "warn", text: "⚠  That doesn't look like a valid email. Try again." },
        );
        return;
      }
      setEmail(val);
      push(
        { kind: "answer", text: `> ${val}` },
        { kind: "system", text: "" },
        { kind: "prompt", text: "Perfect! What would you like to say?" },
      );
      setStep("message");
    } else if (step === "message") {
      setMessage(val);
      push(
        { kind: "answer", text: `> ${val}` },
        { kind: "system", text: "" },
        { kind: "system", text: "── summary ───────────────────────────────────────" },
        { kind: "system", text: `  name     →  ${name}` },
        { kind: "system", text: `  email    →  ${email}` },
        { kind: "system", text: `  message  →  ${val}` },
        { kind: "system", text: "" },
        { kind: "prompt", text: 'Press ↵ to send  ·  type "reset" to start over' },
      );
      setStep("confirm");
    }
  }

  function send() {
    const addr = CONTACT_EMAIL.href.replace("mailto:", "");
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.open(`mailto:${addr}?subject=${subject}&body=${body}`);
    setDraft("");
    push(
      { kind: "system", text: "" },
      {
        kind: "success",
        text: `✓  Opening mail client… Talk soon, ${name}!`,
      },
      { kind: "system", text: "" },
      { kind: "system", text: "── session ended ─────────────────────────────────" },
    );
    setStep("done");
  }

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setDraft("");
    setHistory([
      { kind: "system", text: "── restarting ────────────────────────────────────" },
      { kind: "system", text: "" },
      { kind: "prompt", text: "Hey there! What's your name?" },
    ]);
    setStep("name");
  }

  const currentPromptLabel =
    step === "email" ? "email" : step === "confirm" ? "send? [↵/reset]" : step;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border-subtle)] font-mono shadow-2xl backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 bg-black/55 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto text-[11px] tracking-wide text-neutral-500 select-none">
              contact — zsh
            </span>
            {step === "done" && (
              <button
                onClick={reset}
                className="text-[11px] text-neutral-500 transition-colors hover:text-neutral-300"
              >
                restart
              </button>
            )}
          </div>

          {/* Output area */}
          <div
            ref={scrollRef}
            className="hide-scrollbar h-[300px] overflow-y-auto bg-black/45 px-5 pt-4 pb-2 text-sm leading-7 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => {
              if (line.kind === "prompt")
                return (
                  <div key={i} className="flex gap-2.5">
                    <span className="shrink-0 text-[#c9f31d] select-none">➜</span>
                    <span className="text-neutral-200">{line.text}</span>
                  </div>
                );
              if (line.kind === "answer")
                return (
                  <div key={i} className="text-neutral-500 pl-[22px]">
                    {line.text}
                  </div>
                );
              if (line.kind === "success")
                return (
                  <div key={i} className="text-[#28c840] pl-[22px]">
                    {line.text}
                  </div>
                );
              if (line.kind === "warn")
                return (
                  <div key={i} className="text-[#febc2e] pl-[22px]">
                    {line.text}
                  </div>
                );
              return (
                <div key={i} className="text-neutral-600 pl-[22px]">
                  {line.text || "\u00a0"}
                </div>
              );
            })}

            {/* Active input row */}
            {step !== "done" && (
              <div className="mt-0.5 flex items-center gap-2">
                <span className="shrink-0 text-[#c9f31d] select-none">~</span>
                <span className="text-neutral-600 text-xs select-none">
                  [{currentPromptLabel}]
                </span>
                <input
                  ref={inputRef}
                  type={step === "email" ? "email" : "text"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onEnter();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-neutral-200 outline-none caret-[#c9f31d]"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <span className="animate-pulse select-none text-[#c9f31d]">▋</span>
              </div>
            )}
          </div>
        </div>
  );
}
