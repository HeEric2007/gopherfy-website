import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Not at UMN? — Gopherfy",
  description:
    "Want to bring Gopherfy to your school? Contact the team.",
};

export default function NotAtUmnPage() {
  const { notAtUmn } = content;
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="px-5 pb-24 pt-4 sm:px-8">
        <article className="mx-auto max-w-2xl">
          <header className="border-b border-neutral-200 pb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-umn-maroon">
              For other schools
            </p>
            <h1 className="headline-tight mt-3 text-4xl font-extrabold text-neutral-950 sm:text-5xl">
              {notAtUmn.title}
            </h1>
            <p className="mt-5 text-lg text-neutral-600">{notAtUmn.subtitle}</p>
          </header>

          <section className="mt-10">
            <p className="text-[1rem] leading-relaxed text-neutral-700">
              {notAtUmn.body}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-neutral-950 sm:text-2xl">
              Contact us
            </h2>
            <ul className="mt-5 space-y-3">
              {notAtUmn.contacts.map((c) => (
                <li
                  key={c.email}
                  className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-semibold text-neutral-950">
                    {c.name}
                  </span>
                  <a
                    href={`mailto:${c.email}`}
                    className="font-mono text-sm text-umn-maroon underline-offset-4 hover:underline"
                  >
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm">
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
