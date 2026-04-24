import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Docs — Gopherfy",
  description:
    "How Gopherfy verifies UMN students with their @umn.edu email and remembers them across every server it runs in.",
};

type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; text: string; lang?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export default function DocsPage() {
  const { docs } = content;
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="px-5 pb-24 pt-4 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-neutral-200 pb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-umn-maroon">
              Docs
            </p>
            <h1 className="headline-tight mt-3 text-4xl font-extrabold text-neutral-950 sm:text-5xl">
              {docs.title}
            </h1>
            <p className="mt-5 text-lg text-neutral-600">{docs.subtitle}</p>
            <p className="mt-2 text-sm text-neutral-500">{docs.byline}</p>
          </header>

          <nav
            aria-label="On this page"
            className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm"
          >
            <p className="mb-3 font-semibold text-neutral-900">On this page</p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {docs.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-neutral-700 transition hover:text-umn-maroon"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`#${docs.commands.id}`}
                  className="text-neutral-700 transition hover:text-umn-maroon"
                >
                  {docs.commands.heading}
                </a>
              </li>
            </ul>
          </nav>

          {docs.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mt-14 scroll-mt-24"
            >
              <h2 className="headline-tight text-2xl font-bold text-neutral-950 sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5">
                {(section.blocks as Block[]).map((block, i) => (
                  <DocBlock key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          <section
            id={docs.commands.id}
            className="mt-14 scroll-mt-24"
          >
            <h2 className="headline-tight text-2xl font-bold text-neutral-950 sm:text-3xl">
              {docs.commands.heading}
            </h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-700">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Command</th>
                    <th className="px-5 py-3 font-semibold">Who</th>
                    <th className="px-5 py-3 font-semibold">What</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {docs.commands.rows.map((row) => (
                    <tr key={row.command} className="align-top">
                      <td className="px-5 py-3 font-mono text-[0.8125rem] text-umn-maroon">
                        {row.command}
                      </td>
                      <td className="px-5 py-3 text-neutral-700">{row.who}</td>
                      <td className="px-5 py-3 text-neutral-700">{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              {docs.commands.footnote}
            </p>
          </section>

          <footer className="mt-16 flex flex-col gap-3 border-t border-neutral-200 pt-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Ready to run it?{" "}
              <Link
                href="/setup"
                className="font-semibold text-umn-maroon underline-offset-4 hover:underline"
              >
                See the setup guide →
              </Link>
            </p>
            <Link
              href="/"
              className="text-neutral-500 transition hover:text-neutral-900"
            >
              ← Back home
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}

function DocBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[1rem] leading-relaxed text-neutral-700">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-4 text-lg font-semibold text-neutral-950">
          {block.text}
        </h3>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-sm leading-relaxed text-neutral-100">
          <code className="font-mono">{block.text}</code>
        </pre>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-[1rem] leading-relaxed text-neutral-700 marker:text-umn-maroon">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-[1rem] leading-relaxed text-neutral-700 marker:font-semibold marker:text-umn-maroon">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
  }
}
