export const acceptedResumeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const acceptedResumeInputTypes =
  ".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

export const maxResumeFileSize = 10 * 1024 * 1024;

export const resumeReviewChecklist = [
  "Parsing resume structure",
  "Checking ATS formatting",
  "Matching role keywords",
  "Prioritizing impact fixes",
];

export const resumeInsights = [
  { label: "ATS readiness", value: "86", detail: "+14 possible after edits", tone: "text-emerald-600" },
  { label: "Missing keywords", value: "9", detail: "Product analytics, GTM, SQL", tone: "text-amber-600" },
  { label: "Formatting risks", value: "3", detail: "Tables, dense bullets, header text", tone: "text-rose-600" },
];

export const resumeRecommendations = [
  "Add measurable outcomes to the two most recent roles.",
  "Mirror 5-7 target-job keywords in the summary and skills sections.",
  "Move contact details out of the header for stronger ATS extraction.",
];

export type UploadStatus = "idle" | "checking" | "complete";
