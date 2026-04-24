import { content } from "@/lib/content";
import { DiscordIcon } from "./DiscordIcon";

export function Hero() {
  const { hero } = content;
  return (
    <section className="px-4 pb-10 pt-6 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-black/5 bg-white/95 px-6 py-14 text-center shadow-[0_30px_80px_-25px_rgba(15,15,35,0.25)] backdrop-blur-sm sm:px-12 sm:py-20">
        <h1 className="headline-tight text-5xl font-extrabold text-neutral-950 sm:text-7xl md:text-8xl">
          {hero.headline.map((word, i) => (
            <span
              key={word}
              className={i === 1 ? "text-umn-maroon" : undefined}
            >
              {word}
              {i < hero.headline.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blurple px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(88,101,242,0.6)] transition hover:bg-blurple-hover sm:w-auto"
          >
            <DiscordIcon className="h-5 w-5" />
            <span>{hero.primaryCta.label}</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-base font-medium text-neutral-900 transition hover:bg-neutral-50 sm:w-auto"
          >
            <span>{hero.secondaryCta.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="mt-6 text-sm text-neutral-500">{hero.microcopy}</p>
        <p className="mt-1.5 text-xs text-neutral-400">{hero.tertiary}</p>
      </div>
    </section>
  );
}
