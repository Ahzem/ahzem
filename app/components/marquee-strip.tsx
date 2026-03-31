const MARQUEE_ITEMS = [
  "React",
  "Flutter",
  "Node.js",
  "AWS",
  "Azure",
  "Next.js",
  "AI Agents",
  "Docker",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "NestJS",
  "CrewAI",
];

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/[0.06] py-7">
      <div className="inline-flex animate-marquee hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, j) => (
          <span
            key={`marquee-${j}`}
            className="inline-flex items-center gap-10 px-10 text-[15px] font-normal uppercase tracking-[3px] text-[#444]"
          >
            {MARQUEE_ITEMS.map((skill, i) => (
              <span key={`${skill}-${i}`} className="inline-flex items-center gap-10">
                {skill}
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9f31d]" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
