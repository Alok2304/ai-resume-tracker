export type ResumeReviewSections = {
  contact: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
};

export type ResumeReviewResult = {
  atsScore: number;
  summary: string;
  strengths: string[];
  suggestions: string[];
  keywordMatches: string[];
  missingKeywords: string[];
  sections: ResumeReviewSections;
  provider: "openai" | "heuristic";
  reviewedAt: string;
  file: {
    name: string;
    size: number;
    type: string;
  };
};
