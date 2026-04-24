import Image from "next/image";

export function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <Image
      src="/discord-white-icon.webp"
      alt=""
      width={64}
      height={64}
      aria-hidden="true"
      className={className}
      priority
    />
  );
}
