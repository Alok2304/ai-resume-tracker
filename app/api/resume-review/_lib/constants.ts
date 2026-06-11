export const MAX_RESUME_SIZE = 10 * 1024 * 1024;
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 6;

export const acceptedResumeMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

export const acceptedResumeExtensions = new Set(["pdf", "doc", "docx", "txt"]);
