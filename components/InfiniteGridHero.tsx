import type { ReactNode } from "react";

export function InfiniteGridHero({ children }: { children: ReactNode }) {
  return (
    <div className="hero-backdrop relative overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
