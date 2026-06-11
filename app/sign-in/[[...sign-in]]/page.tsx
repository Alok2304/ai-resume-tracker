import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - CareerFlow",
  description: "Sign in to CareerFlow to review resumes and track your job search.",
};

export default function Page() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center bg-[#f7f9fc] px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase text-slate-500">CareerFlow</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Welcome back</h1>
        </div>
        <div className="flex justify-center">
          <SignIn />
        </div>
      </section>
    </main>
  );
}
