"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";

export function MobileMenu() {
  const { nav } = content;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition hover:bg-neutral-50"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={close}
          />
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
          >
            <ul className="py-1">
              {nav.links.map((link) => {
                const isAnchor = link.href.includes("#");
                const className =
                  "block px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-950";
                return (
                  <li key={link.label}>
                    {isAnchor ? (
                      <a
                        href={link.href}
                        onClick={close}
                        className={className}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={close}
                        className={className}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
