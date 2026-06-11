import { AnimatedSection } from "@/components/ui/animated-section";

const actions = [
  // Representative recommendations demonstrate how analysis turns into next actions.
  "Add quantified ownership to the launch bullet",
  "Mirror 6 missing keywords from the target job description",
  "Move education below experience for senior roles",
];

const columns = [
  // Values are scaled into bars to preview application analytics without chart dependencies.
  { label: "Saved", value: 8, color: "bg-amber-400" },
  { label: "Applied", value: 14, color: "bg-sky-400" },
  { label: "Interview", value: 5, color: "bg-emerald-400" },
  { label: "Offer", value: 1, color: "bg-slate-950" },
];

export function LandingDashboard() {
  return (
    <section id="dashboard" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* This section previews the signed-in dashboard value while staying on the landing page. */}
        <AnimatedSection className="max-w-xl">
          <p className="text-sm font-semibold uppercase text-slate-500">Command center</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            The score is useful because it turns into action.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            CareerFlow pairs every ATS finding with a practical next step, then keeps that improved resume tied to the roles you are pursuing.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">Priority fixes</p>
              <div className="mt-5 space-y-3">
                {actions.map((action) => (
                  <div key={action} className="rounded-lg bg-white/10 p-3 text-sm leading-6">
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#f7f9fc] p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-950">Application flow</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  May
                </span>
              </div>
              <div className="mt-8 flex h-44 items-end gap-4">
                {columns.map((column) => (
                  <div key={column.label} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className={`w-full rounded-t-lg ${column.color}`}
                      style={{ height: `${column.value * 9}px` }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-950">{column.value}</p>
                      <p className="text-xs text-slate-500">{column.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
