import type { Metadata } from "next";
import { UploadResumePage } from "@/components/ui/upload-resume-page";

export const metadata: Metadata = {
  title: "Upload Resume - CareerFlow",
  description:
    "Upload your resume to CareerFlow for ATS readiness checks, keyword insights, and prioritized improvement recommendations.",
};

export default function Page() {
  return <UploadResumePage />;
}
