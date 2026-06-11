import { acceptedResumeExtensions, acceptedResumeMimeTypes } from "./constants";

export function getResumeExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function isAcceptedResume(file: File) {
  const extension = getResumeExtension(file.name);

  return acceptedResumeMimeTypes.has(file.type) || acceptedResumeExtensions.has(extension);
}

export async function readResumeText(file: File, providedResumeText: string) {
  if (providedResumeText) {
    return providedResumeText;
  }

  if (file.type === "text/plain" || getResumeExtension(file.name) === "txt") {
    return file.text();
  }

  return "";
}
