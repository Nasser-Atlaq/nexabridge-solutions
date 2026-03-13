export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050510]" />

      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-cyan-500/[0.14] blur-[140px]" />
      <div className="absolute top-[35%] right-[-8%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.14] blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.12] blur-[100px]" />
      <div className="absolute top-[55%] left-[35%] h-[350px] w-[350px] rounded-full bg-amber-500/[0.06] blur-[120px]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
