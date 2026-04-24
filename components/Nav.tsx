import Link from "next/link";
import { content } from "@/lib/content";
import { DiscordIcon } from "./DiscordIcon";
import { GitHubIcon } from "./GitHubIcon";

export function Nav() {
  const { nav } = content;
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-neutral-900"
        >
          {nav.brand}
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5">
          <ul className="hidden items-center gap-5 text-sm font-medium text-neutral-700 sm:flex">
            {nav.links.map((link) => {
              const isInternal = link.href.startsWith("/");
              return (
                <li key={link.label}>
                  {isInternal ? (
                    <Link
                      href={link.href}
                      className="transition hover:text-neutral-950"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="transition hover:text-neutral-950"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <a
            href={nav.github.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.github.label}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 p-2 text-sm font-medium text-white transition hover:bg-neutral-800 sm:px-5 sm:py-2.5"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{nav.github.label}</span>
          </a>
          <a
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 sm:px-5 sm:py-2.5"
          >
            <DiscordIcon className="h-4 w-4" />
            <span>{nav.cta.label}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
