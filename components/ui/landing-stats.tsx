import { AnimatedSection } from "@/components/ui/animated-section";
import { stats } from "@/components/ui/landing-data";

export function LandingStats() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* High-level metrics provide a quick credibility band immediately after the hero. */}
        {stats.map((stat, index) => (
          <AnimatedSection
            key={stat.label}
            delay={index * 0.05}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
