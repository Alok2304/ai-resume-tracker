import { AnimatedSection } from "@/components/ui/animated-section";
import { features } from "@/components/ui/landing-data";

export function LandingFeatures() {
  return (
    <section id="features" className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Feature copy focuses on connected job-search workflows instead of isolated tools. */}
        <AnimatedSection className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-emerald-300">Platform</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Resume intelligence and job tracking in one workspace.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            CareerFlow keeps the noisy parts of a job search connected, from the resume signals an ATS reads to the next follow-up you should send.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Data-driven cards keep feature messaging easy to update as product scope changes. */}
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 0.06}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
                {feature.eyebrow}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
