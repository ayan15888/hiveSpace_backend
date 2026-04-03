const marqueeItems = [
  "Create an organization for your company",
  "Spin up workspaces for product, design & growth",
  "Nest multiple projects under each workspace",
  "Give every project its own teams",
  "Track tasks with To do, Pending, Done, Error & Bug tags",
] as const

const OrgMarquee = () => {
  return (
    <section className="relative overflow-hidden py-4">

      {/* LEFT BLUR */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />

      {/* RIGHT BLUR */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      {/* MARQUEE */}
      <div className="marquee-track flex w-max">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="mx-3 inline-flex items-center gap-2 rounded-full border border-black px-4 py-1.5 text-lg font-medium text-black shadow-sm"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-black" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrgMarquee
