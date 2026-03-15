"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/[0.08]">
        <span className="text-3xl font-bold text-red-400">!</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        An unexpected error occurred. Please try again, or contact us if the
        problem persists.
      </p>
      <button
        onClick={reset}
        className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-[0.97]"
      >
        Try Again
      </button>
    </div>
  );
}
