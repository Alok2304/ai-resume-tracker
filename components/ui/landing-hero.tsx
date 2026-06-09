"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";

const scoreItems = [
  // Demo scores mirror the review categories shown in the hero product preview.
  { label: "Keywords", value: 92 },
  { label: "Formatting", value: 88 },
  { label: "Impact", value: 81 },
];

const jobs = [
  // Sample roles make the pipeline preview feel product-like without requiring live data.
  { role: "Growth Product Manager", stage: "Interview", tone: "bg-emerald-100 text-emerald-700" },
  { role: "Senior UX Researcher", stage: "Applied", tone: "bg-sky-100 text-sky-700" },
  { role: "AI Program Lead", stage: "Saved", tone: "bg-amber-100 text-amber-700" },
];

export function LandingHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc]">
      {/* Subtle grid and top fade add depth while keeping the first viewport readable. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
            AI resume review and job tracking
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl">
            CareerFlow
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Upload your resume, get an ATS score with practical fixes, and track every job opportunity from first save to final offer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/upload-resume" size="lg">
              Upload Resume
              <span aria-hidden="true">-&gt;</span>
            </ButtonLink>
            <ButtonLink href="#features" variant="secondary" size="lg">
              Explore Features
            </ButtonLink>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-slate-600">
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <strong className="block text-xl text-slate-950">92</strong>
              ATS score
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <strong className="block text-xl text-slate-950">14</strong>
              fixes found
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <strong className="block text-xl text-slate-950">5</strong>
              live roles
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
          aria-label="CareerFlow product dashboard preview"
        >
          <div className="rounded-[2rem] border border-white/80 bg-slate-950 p-3 shadow-2xl shadow-slate-900/25">
            <div className="overflow-hidden rounded-[1.4rem] bg-white">
              {/* Product mockup ties the marketing message to concrete resume and pipeline workflows. */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Resume Review</p>
                  <p className="text-lg font-semibold text-slate-950">Product Manager Resume.pdf</p>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  ATS 92
                </div>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[0.85fr_1.15fr]">
                <div id="upload" className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                    CV
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-slate-950">Drop your resume</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    PDF, DOCX, or TXT. CareerFlow extracts structure, skills, and role signals automatically.
                  </p>
                  <div className="mt-5 rounded-xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span>Parsing document</span>
                      <span className="font-semibold text-slate-950">Done</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className="h-full rounded-full bg-emerald-500"
                        initial={{ width: "20%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">ATS readiness</p>
                        <p className="text-5xl font-semibold text-slate-950">92</p>
                      </div>
                      <p className="text-sm font-semibold text-emerald-600">+18 after edits</p>
                    </div>
                    <div className="mt-5 space-y-3">
                      {scoreItems.map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm font-medium text-slate-600">
                            <span>{item.label}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-slate-950"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-950">Job pipeline</p>
                      <p className="text-sm text-slate-500">This week</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {jobs.map((job) => (
                        <div key={job.role} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3">
                          <span className="text-sm font-medium text-slate-700">{job.role}</span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${job.tone}`}>
                            {job.stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
