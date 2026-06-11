import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { MAX_RESUME_SIZE } from "./_lib/constants";
import { buildHeuristicReview } from "./_lib/heuristic-review";
import { jsonResponse, rateLimitResponse } from "./_lib/http";
import { createAiReview } from "./_lib/openai-review";
import { checkResumeReviewRateLimit, getResumeReviewClientKey } from "./_lib/rate-limit";
import { isAcceptedResume, readResumeText } from "./_lib/resume-file";
import { resumeReviewMetadataSchema } from "./_lib/schemas";
import type { AtsReview } from "./_lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

function getValidatedResumeFile(resume: FormDataEntryValue | null) {
  if (!(resume instanceof File)) {
    return {
      error: { message: "Attach a resume file using the resume field.", status: 400 },
      file: null,
    };
  }

  if (!isAcceptedResume(resume)) {
    return {
      error: { message: "Upload a PDF, DOC, DOCX, or TXT resume.", status: 415 },
      file: null,
    };
  }

  if (resume.size > MAX_RESUME_SIZE) {
    return {
      error: { message: "Keep your resume under 10 MB.", status: 413 },
      file: null,
    };
  }

  return { error: null, file: resume };
}

async function reviewResume({
  jobDescription,
  resume,
  resumeText,
  targetRole,
}: {
  jobDescription: string;
  resume: File;
  resumeText: string;
  targetRole: string;
}) {
  let review: AtsReview;
  let provider: "openai" | "heuristic" = "heuristic";

  try {
    const aiReview = await createAiReview({
      file: resume,
      jobDescription,
      resumeText,
      targetRole,
    });

    if (aiReview) {
      review = aiReview;
      provider = "openai";
    } else {
      review = buildHeuristicReview({
        jobDescription,
        resumeFile: {
          name: resume.name,
          size: resume.size,
          type: resume.type,
        },
        resumeText,
        targetRole,
      });
    }
  } catch (error) {
    console.error("AI resume review failed; using local fallback review.", error);
    review = buildHeuristicReview({
      jobDescription,
      resumeFile: {
        name: resume.name,
        size: resume.size,
        type: resume.type,
      },
      resumeText,
      targetRole,
    });
  }

  return { provider, review };
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return jsonResponse({ error: "You must be signed in to review a resume." }, 401);
    }

    const retryAfter = checkResumeReviewRateLimit(getResumeReviewClientKey(request, userId));

    if (retryAfter) {
      return rateLimitResponse(retryAfter);
    }

    const formData = await request.formData();
    const { error: fileError, file: resume } = getValidatedResumeFile(formData.get("resume"));

    if (fileError) {
      return jsonResponse({ error: fileError.message }, fileError.status);
    }

    const metadata = resumeReviewMetadataSchema.parse({
      targetRole: formData.get("targetRole")?.toString(),
      jobDescription: formData.get("jobDescription")?.toString(),
      resumeText: formData.get("resumeText")?.toString(),
    });

    const resumeText = await readResumeText(resume, metadata.resumeText);

    const { provider, review } = await reviewResume({
      jobDescription: metadata.jobDescription,
      resume,
      resumeText,
      targetRole: metadata.targetRole,
    });

    return jsonResponse(
      {
        data: {
          ...review,
          provider,
          reviewedAt: new Date().toISOString(),
          file: {
            name: resume.name,
            size: resume.size,
            type: resume.type || "unknown",
          },
        },
      },
      200,
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: "Invalid resume review request.", issues: error.issues }, 400);
    }

    console.error("Resume review route failed", error);
    return jsonResponse({ error: "Unable to review resume right now." }, 500);
  }
}
