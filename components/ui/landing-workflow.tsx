import { AnimatedSection } from "@/components/ui/animated-section";
import { workflow } from "@/components/ui/landing-data";

export function LandingWorkflow() {
  return (
    <section id="how-it-works" className="bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              From resume upload to application momentum.
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            Start with the document, then keep each role moving with clear signals, reminders, and next actions.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {workflow.map((item, index) => (
            <AnimatedSection
              key={item.step}
              delay={index * 0.08}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <span className="text-sm font-semibold text-slate-500">{item.step}</span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
