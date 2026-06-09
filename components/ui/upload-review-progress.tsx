"use client";

import { motion } from "motion/react";
import type { UploadStatus } from "@/components/ui/upload-resume-data";

type UploadReviewProgressProps = {
  activeStep: number;
  items: string[];
  shouldReduceMotion: boolean | null;
  status: UploadStatus;
};

export function UploadReviewProgress({
  activeStep,
  items,
  shouldReduceMotion,
  status,
}: UploadReviewProgressProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">Review progress</h2>
      <div className="mt-6 space-y-4">
        {items.map((item, index) => {
          const isComplete = status === "complete" || index < activeStep;
          const isActive = status === "checking" && index === activeStep;

          return (
            <motion.div
              key={item}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.06 }}
              className="flex items-center gap-3"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isComplete
                    ? "bg-emerald-100 text-emerald-700"
                    : isActive
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {isComplete ? "OK" : index + 1}
              </span>
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
