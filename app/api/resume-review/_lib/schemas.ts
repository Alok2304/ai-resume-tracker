import { z } from "zod";

export const resumeReviewMetadataSchema = z.object({
  targetRole: z.string().trim().max(120).optional().default(""),
  jobDescription: z.string().trim().max(12000).optional().default(""),
  resumeText: z.string().trim().max(50000).optional().default(""),
});

export const atsReviewSchema = z.object({
  atsScore: z.number().int().min(0).max(100),
  summary: z.string().min(1),
  strengths: z.array(z.string().min(1)).min(1).max(8),
  suggestions: z.array(z.string().min(1)).min(1).max(10),
  keywordMatches: z.array(z.string()).max(30).default([]),
  missingKeywords: z.array(z.string()).max(30).default([]),
  sections: z.object({
    contact: z.boolean(),
    summary: z.boolean(),
    experience: z.boolean(),
    education: z.boolean(),
    skills: z.boolean(),
    projects: z.boolean(),
    certifications: z.boolean(),
  }),
});

export type AtsReview = z.infer<typeof atsReviewSchema>;
export type ResumeReviewMetadata = z.infer<typeof resumeReviewMetadataSchema>;
