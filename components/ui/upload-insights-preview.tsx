"use client";

import { motion } from "motion/react";
import type { UploadStatus } from "@/components/ui/upload-resume-data";

type Insight = {
  detail: string;
  label: string;
  tone: string;
  value: string;
};

type UploadInsightsPreviewProps = {
  insights: Insight[];
  recommendations: string[];
  shouldReduceMotion: boolean | null;
  status: UploadStatus;
};

export function UploadInsightsPreview({
  insights,
  recommendations,
  shouldReduceMotion,
  status,
}: UploadInsightsPreviewProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Preview insights</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">What CareerFlow will surface</h2>
        </div>
        <span className="text-sm font-semibold text-emerald-600">
          {status === "complete" ? "Ready" : "Waiting for resume"}
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + index * 0.08 }}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-sm font-medium text-slate-500">{insight.label}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{insight.value}</p>
            <p className={`mt-2 text-sm font-semibold ${insight.tone}`}>{insight.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
        <h3 className="text-lg font-semibold">Priority fixes</h3>
        <div className="mt-4 space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={recommendation} className="flex gap-3 text-sm leading-6 text-slate-200">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                {index + 1}
              </span>
              <p>{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
