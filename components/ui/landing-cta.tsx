import { ButtonLink } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

export function LandingCta() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="overflow-hidden rounded-lg bg-slate-950 px-6 py-14 text-center text-white sm:px-10">
          <p className="text-sm font-semibold uppercase text-emerald-300">Start sharper</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Know how your resume reads before the ATS does.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Bring your resume, target roles, and job search pipeline into one place built for steady progress.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#upload" variant="light" size="lg">
              Upload Resume
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              See Workflow
            </ButtonLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
