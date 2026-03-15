import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span
        className="text-[8rem] font-bold leading-none tracking-tighter text-white/[0.06] sm:text-[10rem]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        404
      </span>
      <h1 className="-mt-4 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-[0.97]"
      >
        Back to Home
      </Link>
    </div>
  );
}
