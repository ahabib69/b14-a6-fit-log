export default function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 md:flex-row md:py-24">
      <div className="flex-1 text-center md:text-left">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">
          WORKOUT LIBRARY
        </p>

        <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-white/70 md:mx-0">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition hover:opacity-90"
        >
          BROWSE WORKOUTS
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className="flex-1">
        <img
          src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740"
          alt="Fitness training"
          className="mx-auto aspect-square w-full max-w-sm rounded-2xl object-cover md:max-w-full"
        />
      </div>
    </section>
  )
}
