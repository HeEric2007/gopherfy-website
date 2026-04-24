import { content } from "@/lib/content";

export function SocialProof() {
  const { socialProof } = content;
  const avatars = Array.from({ length: socialProof.avatarCount });
  const [before, highlight] = socialProof.caption;

  return (
    <section className="px-4 pb-16 sm:pb-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        {/* TODO: real avatars */}
        <ul className="flex -space-x-3">
          {avatars.map((_, i) => (
            <li
              key={i}
              aria-hidden="true"
              className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-neutral-200 to-neutral-300 shadow-sm sm:h-11 sm:w-11"
            />
          ))}
        </ul>
        <p className="text-sm text-neutral-700 sm:text-base">
          {before}
          <span className="font-semibold text-neutral-950">{highlight}</span>
        </p>
      </div>
    </section>
  );
}
