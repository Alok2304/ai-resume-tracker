import { AnimatedSection } from "@/components/ui/animated-section";
import { testimonials } from "@/components/ui/landing-data";

export function LandingTestimonials() {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Testimonials reinforce the product's practical value for different job seekers. */}
        <AnimatedSection className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-slate-500">Proof</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Built for people who want less guessing in the job search.
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Data-backed cards keep social proof copy centralized in landing-data.ts. */}
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.name}
              delay={index * 0.06}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <p className="leading-7 text-slate-700">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-950">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
