"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { acceptedResumeInputTypes } from "@/components/ui/upload-resume-data";
import type { UploadStatus } from "@/components/ui/upload-resume-data";

type UploadResumeDropzoneProps = {
  disabled?: boolean;
  error: string;
  isReviewDisabled: boolean;
  progress: number;
  selectedFile: File | null;
  shouldReduceMotion: boolean | null;
  status: UploadStatus;
  onFileSelect: (file?: File) => void;
  onReset: () => void;
  onReview: () => void;
};

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(size / 1024, 1).toFixed(0)} KB`;
}

export function UploadResumeDropzone({
  disabled = false,
  error,
  isReviewDisabled,
  progress,
  selectedFile,
  shouldReduceMotion,
  status,
  onFileSelect,
  onReset,
  onReview,
}: UploadResumeDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!selectedFile && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [selectedFile]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled) {
      return;
    }

    onFileSelect(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    onFileSelect(event.dataTransfer.files[0]);
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6"
    >
      <label
        htmlFor="resume-file"
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition sm:p-8 ${
          disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
        } ${
          isDragging
            ? "border-slate-950 bg-slate-100"
            : "border-slate-300 bg-slate-50 hover:border-slate-500 hover:bg-white"
        }`}
      >
        <input
          ref={inputRef}
          id="resume-file"
          type="file"
          accept={acceptedResumeInputTypes}
          disabled={disabled}
          className="sr-only"
          onChange={handleInputChange}
        />
        <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-950 text-base font-bold text-white">
          CV
        </span>
        <span className="mt-6 text-2xl font-semibold text-slate-950">Drop your resume here</span>
        <span className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
          PDF, DOC, DOCX, or TXT up to 10 MB. You can also click to browse files.
        </span>
        <span className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white">
          Choose File
        </span>
      </label>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          >
            {error}
          </motion.p>
        ) : null}

        {selectedFile ? (
          <motion.div
            key={`${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            className="mt-4 rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">{selectedFile.name}</p>
                <p className="mt-1 text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <Button type="button" variant="secondary" size="sm" disabled={disabled} onClick={onReset}>
                Replace
              </Button>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              {status === "complete"
                ? "ATS review ready."
                : status === "checking"
                  ? "Uploading and reviewing resume..."
                  : "Ready to review."}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="button"
        size="lg"
        className="mt-4 w-full"
        disabled={isReviewDisabled}
        onClick={onReview}
      >
        {status === "checking" ? "Generating ATS Score..." : status === "complete" ? "Review Again" : "Generate ATS Score"}
      </Button>
    </motion.div>
  );
}
