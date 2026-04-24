import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DiscordIcon } from "@/components/DiscordIcon";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Setup — Gopherfy",
  description:
    "Set up Gopherfy in your Discord server: invite the bot, configure the verified role, and post the verification panel.",
};

export default function SetupPage() {
  const { setup } = content;
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="px-5 pb-24 pt-4 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="border-b border-neutral-200 pb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-umn-maroon">
              Setup
            </p>
            <h1 className="headline-tight mt-3 text-4xl font-extrabold text-neutral-950 sm:text-5xl">
              {setup.title}
            </h1>
            <p className="mt-5 text-lg text-neutral-600">{setup.subtitle}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={setup.inviteCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blurple px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(88,101,242,0.6)] transition hover:bg-blurple-hover"
              >
                <DiscordIcon className="h-4 w-4" />
                <span>{setup.inviteCta.label}</span>
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-1 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                <span>Read the docs</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </header>

          <ol className="mt-12 space-y-10">
            {setup.steps.map((step) => (
              <li key={step.n} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-umn-maroon text-sm font-bold text-white">
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-neutral-950 sm:text-2xl">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-[1rem] leading-relaxed text-neutral-700">
                      {step.body}
                    </p>
                    {"code" in step && step.code ? (
                      <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100">
                        <code className="font-mono">{step.code}</code>
                      </pre>
                    ) : null}
                    <Screenshot
                      src={step.image}
                      label={step.screenshot}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <section className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-950 sm:text-2xl">
              {setup.troubleshooting.heading}
            </h2>
            <dl className="mt-5 space-y-5">
              {setup.troubleshooting.items.map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold text-neutral-950">
                    {item.title}
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-neutral-700">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <footer className="mt-16 flex flex-col gap-3 border-t border-neutral-200 pt-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Curious how it works under the hood?{" "}
              <Link
                href="/docs"
                className="font-semibold text-umn-maroon underline-offset-4 hover:underline"
              >
                Read the docs →
              </Link>
            </p>
            <Link
              href="/"
              className="text-neutral-500 transition hover:text-neutral-900"
            >
              ← Back home
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function resolveImage(basePath: string): string | null {
  for (const ext of IMAGE_EXTS) {
    const candidate = path.join(process.cwd(), "public", basePath + ext);
    if (fs.existsSync(candidate)) {
      return basePath + ext;
    }
  }
  return null;
}

function Screenshot({ src, label }: { src: string; label: string }) {
  const resolved = resolveImage(src);
  if (!resolved) {
    return <ScreenshotPlaceholder label={label} />;
  }
  return (
    <figure className="mt-5 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
      <Image
        src={resolved}
        alt={label}
        width={1600}
        height={900}
        sizes="(max-width: 640px) 100vw, 768px"
        className="h-auto w-full"
      />
    </figure>
  );
}

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <figure className="mt-5">
      <div
        role="img"
        aria-label={`Placeholder: ${label}`}
        className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-gradient-to-br from-neutral-50 to-neutral-100"
      >
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="1.5" />
              <path d="m21 17-5-5L5 19" />
            </svg>
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Screenshot coming soon
          </p>
          <p className="max-w-xs text-sm text-neutral-600">{label}</p>
        </div>
      </div>
    </figure>
  );
}
