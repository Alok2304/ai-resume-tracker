import { atsReviewSchema } from "./schemas";

type CreateAiReviewParams = {
  file: File;
  jobDescription: string;
  resumeText: string;
  targetRole: string;
};

function extractJsonObject(value: string) {
  const firstBrace = value.indexOf("{");
  const lastBrace = value.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI response did not include a JSON object.");
  }

  return JSON.parse(value.slice(firstBrace, lastBrace + 1));
}

function getOutputText(data: {
  output_text?: unknown;
  output?: Array<{ content?: Array<{ text?: string }> }>;
}) {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  return data.output
    ?.flatMap((item) => item.content ?? [])
    .map((contentItem) => contentItem.text ?? "")
    .join("");
}

function buildPrompt({ jobDescription, resumeText, targetRole }: Omit<CreateAiReviewParams, "file">) {
  return [
    "You are CareerFlow's senior ATS resume reviewer.",
    "Review the resume for ATS compatibility, recruiter readability, keyword alignment, measurable impact, and missing sections.",
    "Return only valid JSON with this exact shape:",
    '{"atsScore": number, "summary": string, "strengths": string[], "suggestions": string[], "keywordMatches": string[], "missingKeywords": string[], "sections": {"contact": boolean, "summary": boolean, "experience": boolean, "education": boolean, "skills": boolean, "projects": boolean, "certifications": boolean}}',
    targetRole ? `Target role: ${targetRole}` : "",
    jobDescription ? `Job description: ${jobDescription}` : "",
    resumeText ? `Resume text: ${resumeText}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function createAiReview({
  file,
  jobDescription,
  resumeText,
  targetRole,
}: CreateAiReviewParams) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const content: Array<Record<string, string>> = [
    {
      type: "input_text",
      text: buildPrompt({ jobDescription, resumeText, targetRole }),
    },
  ];

  if (!resumeText) {
    const buffer = Buffer.from(await file.arrayBuffer());
    content.unshift({
      type: "input_file",
      filename: file.name,
      file_data: `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`,
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        {
          role: "user",
          content,
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI resume review failed: ${errorText}`);
  }

  const data = await response.json();

  return atsReviewSchema.parse(extractJsonObject(getOutputText(data) || ""));
}
