import { content } from "@/lib/content";

type Tone = "maroon" | "gold" | "blurple";
type IconName = "mail" | "link" | "shield";

const toneClasses: Record<Tone, string> = {
  maroon:
    "bg-gradient-to-br from-[#8a0c26] via-umn-maroon to-[#4a000f] text-white",
  gold: "bg-gradient-to-br from-[#ffd86a] via-umn-gold to-[#b8860b] text-neutral-900",
  blurple:
    "bg-gradient-to-br from-[#7a87ff] via-blurple to-[#3844a8] text-white",
};

export function Features() {
  const { features } = content;

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header
          id="features"
          className="mb-12 max-w-2xl scroll-mt-6 sm:mb-16 sm:scroll-mt-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-umn-maroon">
            {features.eyebrow}
          </p>
          <h2 className="headline-tight mt-3 text-4xl font-extrabold text-neutral-950 sm:text-5xl">
            {features.title}
          </h2>
          <p className="mt-4 text-lg text-neutral-600">{features.subtitle}</p>
          <a
            href={features.sourceLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 transition hover:text-umn-maroon"
          >
            <span>{features.sourceLink.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.cards.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  card,
}: {
  card: (typeof content.features.cards)[number];
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <div
        aria-hidden="true"
        className={`flex aspect-[4/3] items-center justify-center ${toneClasses[card.tone as Tone]}`}
      >
        <FeatureIcon name={card.icon as IconName} />
      </div>
      <div className="flex-1 p-7 sm:p-8">
        <h3 className="text-xl font-bold text-neutral-950 sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-600 sm:text-base">
          {card.body}
        </p>
      </div>
    </article>
  );
}

function FeatureIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-20 w-20 sm:h-24 sm:w-24",
  };
  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
          <path d="m15 17 2 2 4-4" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 4.5 3.3 8.6 8 9 4.7-.4 8-4.5 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
