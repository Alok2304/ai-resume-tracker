"use client";

type UploadReviewContextProps = {
  disabled: boolean;
  jobDescription: string;
  targetRole: string;
  onJobDescriptionChange: (value: string) => void;
  onTargetRoleChange: (value: string) => void;
};

export function UploadReviewContext({
  disabled,
  jobDescription,
  targetRole,
  onJobDescriptionChange,
  onTargetRoleChange,
}: UploadReviewContextProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4">
        <div>
          <label htmlFor="target-role" className="text-sm font-semibold text-slate-800">
            Target role
          </label>
          <input
            id="target-role"
            type="text"
            value={targetRole}
            disabled={disabled}
            maxLength={120}
            placeholder="Frontend Developer"
            onChange={(event) => onTargetRoleChange(event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>

        <div>
          <label htmlFor="job-description" className="text-sm font-semibold text-slate-800">
            Job description
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            disabled={disabled}
            maxLength={12000}
            rows={5}
            placeholder="Paste the job description for stronger keyword matching."
            onChange={(event) => onJobDescriptionChange(event.target.value)}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
