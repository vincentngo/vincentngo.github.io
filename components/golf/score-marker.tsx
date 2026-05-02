"use client";

interface ScoreMarkerProps {
  score: number;
  par: number;
  size?: "sm" | "md";
}

type ScoreShape = "circle" | "square" | "none";

function getScoreShape(score: number, par: number): ScoreShape {
  const diff = score - par;
  if (diff < 0) return "circle";
  if (diff > 0) return "square";
  return "none";
}

function getScoreRingCount(score: number, par: number): number {
  const diff = score - par;
  if (diff <= -2 || diff >= 2) return 2;
  if (diff === -1 || diff === 1) return 1;
  return 0;
}

export function ScoreMarker({ score, par, size = "md" }: ScoreMarkerProps) {
  const shape = getScoreShape(score, par);
  const ringCount = getScoreRingCount(score, par);
  const isCircle = shape === "circle";
  const diff = score - par;
  const borderColor =
    diff <= -2
      ? "border-[#1a3c27]"
      : diff === -1
        ? "border-[#2d7a3e]"
        : diff === 1
          ? "border-[#b0b0b0]"
          : "border-[#5c5c5c]";
  const sizeClass = size === "sm" ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm";

  if (ringCount === 0) {
    return (
      <span className={`inline-flex ${sizeClass} items-center justify-center font-bold`}>
        {score}
      </span>
    );
  }

  if (ringCount === 1) {
    return (
      <span
        className={`inline-flex ${sizeClass} items-center justify-center border-2 ${borderColor} ${
          isCircle ? "rounded-full" : "rounded-none"
        } font-bold`}
      >
        {score}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex ${sizeClass} items-center justify-center border-2 ${borderColor} p-0.5 ${
        isCircle ? "rounded-full" : "rounded-none"
      }`}
    >
      <span
        className={`flex h-full w-full items-center justify-center border-2 ${borderColor} ${
          isCircle ? "rounded-full" : "rounded-none"
        } font-bold leading-none`}
      >
        {score}
      </span>
    </span>
  );
}
