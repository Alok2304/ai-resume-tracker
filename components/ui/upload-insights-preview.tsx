"use client";

import { motion } from "motion/react";
import type { ResumeReviewResult } from "@/types/resume-review";
import type { UploadStatus } from "@/components/ui/upload-resume-data";

type UploadInsightsPreviewProps = {
  review: ResumeReviewResult | null;
  shouldReduceMotion: boolean | null;
  status: UploadStatus;
};

function getScoreTone(score: number) {
  if (score >= 80) {
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-600",
      label: "Strong",
    };
  }

  if (score >= 60) {
    return {
      bar: "bg-amber-500",
      text: "text-amber-600",
      label: "Needs tuning",
    };
  }

  return {
    bar: "bg-rose-500",
    text: "text-rose-600",
    label: "High priority",
  };
}

function formatSectionLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function UploadInsightsPreview({ review, shouldReduceMotion, status }: UploadInsightsPreviewProps) {
  const scoreTone = review ? getScoreTone(review.atsScore) : null;
  const ready = status === "complete" && review;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">ATS review</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {ready ? "Resume score and fixes" : "Upload a resume to generate insights"}
          </h2>
        </div>
        <span className={`text-sm font-semibold ${ready ? "text-emerald-600" : "text-slate-500"}`}>
          {ready ? `Reviewed by ${review.provider === "openai" ? "AI" : "CareerFlow"}` : "Waiting for resume"}
        </span>
      </div>

      {ready && scoreTone ? (
        <>
          <div className="mt-6 grid gap-3 md:grid-cols-[0.8fr_1fr]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-500">ATS score</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-semibold tracking-normal text-slate-950">{review.atsScore}</span>
                <span className="pb-2 text-lg font-semibold text-slate-500">/100</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className={`h-full rounded-full ${scoreTone.bar}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${review.atsScore}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
                />
              </div>
              <p className={`mt-3 text-sm font-semibold ${scoreTone.text}`}>{scoreTone.label}</p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-500">Summary</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{review.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(review.sections).map(([section, detected]) => (
                  <span
                    key={section}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      detected ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {formatSectionLabel(section)}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
            <h3 className="text-lg font-semibold">Priority fixes</h3>
            <div className="mt-4 space-y-3">
              {review.suggestions.map((suggestion, index) => (
                <div key={suggestion} className="flex gap-3 text-sm leading-6 text-slate-200">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                    {index + 1}
                  </span>
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-950">Matched keywords</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {review.keywordMatches.length ? review.keywordMatches.slice(0, 12).join(", ") : "No target keywords supplied."}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-950">Missing keywords</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {review.missingKeywords.length ? review.missingKeywords.slice(0, 12).join(", ") : "No major keyword gaps found."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">Strengths</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {review.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
          {status === "checking"
            ? "CareerFlow is reading the resume, checking ATS sections, matching keywords, and preparing prioritized improvements."
            : "Your ATS score, missing keywords, section checks, strengths, and improvement suggestions will appear here after upload."}
        </div>
      )}
    </div>
  );
}
