"use client";

import Link from "next/link";
import { motion } from "motion/react";

type UploadResumeHeroProps = {
  shouldReduceMotion: boolean | null;
};

export function UploadResumeHero({ shouldReduceMotion }: UploadResumeHeroProps) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="max-w-2xl self-center"
    >
      <Link href="/" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
        &lt;- Back to home
      </Link>
      <p className="mt-8 text-sm font-semibold uppercase text-emerald-600">Resume review</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
        Upload your resume for an ATS-ready action plan.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
        Drop in your current resume and CareerFlow will prepare a prioritized review for keywords, formatting risks, and measurable impact.
      </p>
    </motion.div>
  );
}
