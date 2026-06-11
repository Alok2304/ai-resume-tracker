"use client";

import { useUser } from "@clerk/nextjs";
import { useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { UploadInsightsPreview } from "@/components/ui/upload-insights-preview";
import {
  acceptedResumeTypes,
  maxResumeFileSize,
  resumeReviewChecklist,
} from "@/components/ui/upload-resume-data";
import type { UploadStatus } from "@/components/ui/upload-resume-data";
import { UploadResumeDropzone } from "@/components/ui/upload-resume-dropzone";
import { UploadResumeHero } from "@/components/ui/upload-resume-hero";
import { UploadReviewContext } from "@/components/ui/upload-review-context";
import { UploadReviewProgress } from "@/components/ui/upload-review-progress";
import type { ResumeReviewResult } from "@/types/resume-review";

type ResumeReviewApiResponse = {
  data?: ResumeReviewResult;
  error?: string;
};

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
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { isLoaded, isSignedIn } = useUser();
  const requestIdRef = useRef(0);
  const redirectTimerRef = useRef<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [review, setReview] = useState<ResumeReviewResult | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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
    if (status !== "checking") {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 8, 88));
    }, 450);

    return () => {
      window.clearInterval(timer);
    };
  }, [status]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  function redirectToSignup() {
    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current);
    }

    redirectTimerRef.current = window.setTimeout(() => {
      router.push("/sign-up?redirect_url=/upload-resume");
    }, 900);
  }

  function updateTargetRole(value: string) {
    setTargetRole(value);

    if (review) {
      requestIdRef.current += 1;
      setReview(null);
      setStatus("idle");
      setProgress(0);
    }
  }

  function updateJobDescription(value: string) {
    setJobDescription(value);

    if (review) {
      requestIdRef.current += 1;
      setReview(null);
      setStatus("idle");
      setProgress(0);
    }
  }

  function selectFile(file?: File) {
    if (!file) {
      return;
    }

    const validationError = getValidationError(file);

    if (validationError) {
      setSelectedFile(null);
      setReview(null);
      setStatus("idle");
      setProgress(0);
      setError(validationError);
      return;
    }

    requestIdRef.current += 1;
    setError("");
    setReview(null);
    setStatus("idle");
    setProgress(0);
    setSelectedFile(file);
  }

  async function generateReview() {
    if (!selectedFile) {
      setError("Upload a resume before generating an ATS score.");
      return;
    }

    if (!isLoaded) {
      setReview(null);
      setStatus("idle");
      setProgress(0);
      setError("Checking your sign-in status. Please try again in a moment.");
      return;
    }

    if (!isSignedIn) {
      requestIdRef.current += 1;
      setReview(null);
      setStatus("idle");
      setProgress(0);
      setError("You need to log in before generating a resume review. Redirecting you to sign up...");
      redirectToSignup();
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setError("");
    setReview(null);
    setStatus("checking");
    setProgress(12);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    if (targetRole.trim()) {
      formData.append("targetRole", targetRole.trim());
    }

    if (jobDescription.trim()) {
      formData.append("jobDescription", jobDescription.trim());
    }

    try {
      const response = await fetch("/api/resume-review", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as ResumeReviewApiResponse;

      if (requestIdRef.current !== requestId) {
        return;
      }

      if (!response.ok || !payload.data) {
        throw new Error(payload.error || "Unable to review this resume right now.");
      }

      setReview(payload.data);
      setProgress(100);
      setStatus("complete");
    } catch (requestError) {
      if (requestIdRef.current !== requestId) {
        return;
      }

      setReview(null);
      setStatus("idle");
      setProgress(0);
      setError(requestError instanceof Error ? requestError.message : "Unable to review this resume right now.");
    }
  }

  function resetUpload() {
    requestIdRef.current += 1;
    setSelectedFile(null);
    setReview(null);
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
          <div className="space-y-4">
            <UploadReviewContext
              disabled={status === "checking"}
              jobDescription={jobDescription}
              targetRole={targetRole}
              onJobDescriptionChange={updateJobDescription}
              onTargetRoleChange={updateTargetRole}
            />
            <UploadResumeDropzone
              disabled={status === "checking"}
              error={error}
              isReviewDisabled={!selectedFile || status === "checking"}
              progress={progress}
              selectedFile={selectedFile}
              shouldReduceMotion={shouldReduceMotion}
              status={status}
              onFileSelect={selectFile}
              onReset={resetUpload}
              onReview={generateReview}
            />
          </div>
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
          review={review}
          shouldReduceMotion={shouldReduceMotion}
          status={status}
        />
      </section>
    </main>
  );
}
