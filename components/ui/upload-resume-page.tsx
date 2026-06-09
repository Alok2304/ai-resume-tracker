"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { UploadInsightsPreview } from "@/components/ui/upload-insights-preview";
import {
  acceptedResumeTypes,
  maxResumeFileSize,
  resumeInsights,
  resumeRecommendations,
  resumeReviewChecklist,
} from "@/components/ui/upload-resume-data";
import type { UploadStatus } from "@/components/ui/upload-resume-data";
import { UploadResumeDropzone } from "@/components/ui/upload-resume-dropzone";
import { UploadResumeHero } from "@/components/ui/upload-resume-hero";
import { UploadReviewProgress } from "@/components/ui/upload-review-progress";

function getValidationError(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const hasAcceptedExtension = extension ? ["pdf", "doc", "docx", "txt"].includes(extension) : false;

  if (!acceptedResumeTypes.includes(file.type) && !hasAcceptedExtension) {
    return "Upload a PDF, DOC, DOCX, or TXT resume.";
  }

  if (file.size > maxResumeFileSize) {
    return "Keep your resume under 10 MB.";
  }

  return "";
}

export function UploadResumePage() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);

  const activeStep = useMemo(() => {
    if (status === "complete") {
      return resumeReviewChecklist.length;
    }

    return Math.min(Math.floor(progress / 26), resumeReviewChecklist.length - 1);
  }, [progress, status]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const timers = [
      window.setTimeout(() => setProgress(38), 350),
      window.setTimeout(() => setProgress(64), 850),
      window.setTimeout(() => setProgress(88), 1300),
      window.setTimeout(() => {
        setProgress(100);
        setStatus("complete");
      }, 1750),
    ];

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [selectedFile]);

  function selectFile(file?: File) {
    if (!file) {
      return;
    }

    const validationError = getValidationError(file);

    if (validationError) {
      setSelectedFile(null);
      setStatus("idle");
      setProgress(0);
      setError(validationError);
      return;
    }

    setError("");
    setStatus("checking");
    setProgress(12);
    setSelectedFile(file);
  }

  function resetUpload() {
    setSelectedFile(null);
    setError("");
    setStatus("idle");
    setProgress(0);
  }

  return (
    <main className="flex-1 bg-[#f7f9fc]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[42px_42px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <UploadResumeHero shouldReduceMotion={shouldReduceMotion} />
          <UploadResumeDropzone
            error={error}
            progress={progress}
            selectedFile={selectedFile}
            shouldReduceMotion={shouldReduceMotion}
            status={status}
            onFileSelect={selectFile}
            onReset={resetUpload}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-16">
        <UploadReviewProgress
          activeStep={activeStep}
          items={resumeReviewChecklist}
          shouldReduceMotion={shouldReduceMotion}
          status={status}
        />
        <UploadInsightsPreview
          insights={resumeInsights}
          recommendations={resumeRecommendations}
          shouldReduceMotion={shouldReduceMotion}
          status={status}
        />
      </section>
    </main>
  );
}
