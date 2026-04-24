import { content } from "@/lib/content";

export function Footer() {
  const { footer } = content;
  const [first, second] = footer.authors;
  return (
    <footer className="border-t border-neutral-200 bg-white px-4 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <p className="text-sm text-neutral-500">
          Built by{" "}
          <span className="font-medium text-neutral-800">{first}</span> &amp;{" "}
          <span className="font-medium text-neutral-800">{second}</span>
        </p>
      </div>
    </footer>
  );
}
