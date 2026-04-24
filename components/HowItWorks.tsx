import { content } from "@/lib/content";

export function HowItWorks() {
  const { howItWorks } = content;
  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          id="how-it-works"
          className="mb-12 scroll-mt-6 text-center sm:mb-16 sm:scroll-mt-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-umn-maroon">
            {howItWorks.eyebrow}
          </p>
          <h2 className="headline-tight mt-3 text-4xl font-extrabold text-neutral-950 sm:text-5xl">
            {howItWorks.title}
          </h2>
        </div>

        <ol className="grid gap-5 sm:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-7"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-umn-maroon text-sm font-bold text-white">
                {step.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
