import Link from "next/link";
import { content } from "@/lib/content";

export function FloatingHelper() {
  const { floatingHelper } = content;
  return (
    <Link
      href={floatingHelper.pill.href}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/95 px-4 py-2 text-xs font-medium text-neutral-800 shadow-lg backdrop-blur-sm transition hover:bg-white sm:bottom-6 sm:left-6 sm:text-sm"
    >
      <span>{floatingHelper.pill.label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
