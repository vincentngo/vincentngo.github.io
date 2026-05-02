import type {
  Course,
  Round,
  GolferProfile,
  ScoringDistribution,
  Statistics,
  RoundHistoryEntry,
} from "./types";

export const golferProfile: GolferProfile = {
  name: "Vincent Ngo",
  handicap: 18.4,
  roundsPlayed: 24,
  bestScore: 84,
  bestScoreToPar: 12,
  avgScore: 92,
  avgScoreToPar: 20,
  coursesPlayed: 8,
};

const courses: Course[] = [
  {
    id: "torrey-south",
    name: "Torrey Pines South",
    location: "La Jolla, CA",
    par: 72,
    holes: [
      { hole: 1, par: 4, yards: 446 },
      { hole: 2, par: 4, yards: 389 },
      { hole: 3, par: 3, yards: 198 },
      { hole: 4, par: 4, yards: 485 },
      { hole: 5, par: 4, yards: 453 },
      { hole: 6, par: 4, yards: 515 },
      { hole: 7, par: 3, yards: 190 },
      { hole: 8, par: 4, yards: 427 },
      { hole: 9, par: 5, yards: 612 },
      { hole: 10, par: 4, yards: 411 },
      { hole: 11, par: 3, yards: 221 },
      { hole: 12, par: 4, yards: 504 },
      { hole: 13, par: 5, yards: 541 },
      { hole: 14, par: 4, yards: 435 },
      { hole: 15, par: 4, yards: 478 },
      { hole: 16, par: 3, yards: 227 },
      { hole: 17, par: 4, yards: 445 },
      { hole: 18, par: 5, yards: 570 },
    ],
  },
  {
    id: "pebble-beach",
    name: "Pebble Beach GL",
    location: "Pebble Beach, CA",
    par: 72,
    holes: [
      { hole: 1, par: 4, yards: 377 },
      { hole: 2, par: 5, yards: 511 },
      { hole: 3, par: 4, yards: 390 },
      { hole: 4, par: 4, yards: 331 },
      { hole: 5, par: 3, yards: 192 },
      { hole: 6, par: 5, yards: 523 },
      { hole: 7, par: 3, yards: 106 },
      { hole: 8, par: 4, yards: 427 },
      { hole: 9, par: 4, yards: 481 },
      { hole: 10, par: 4, yards: 495 },
      { hole: 11, par: 4, yards: 373 },
      { hole: 12, par: 3, yards: 202 },
      { hole: 13, par: 4, yards: 403 },
      { hole: 14, par: 5, yards: 572 },
      { hole: 15, par: 4, yards: 397 },
      { hole: 16, par: 4, yards: 401 },
      { hole: 17, par: 3, yards: 178 },
      { hole: 18, par: 5, yards: 543 },
    ],
  },
  {
    id: "tpc-sawgrass",
    name: "TPC Sawgrass",
    location: "Ponte Vedra, FL",
    par: 72,
    holes: [
      { hole: 1, par: 4, yards: 423 },
      { hole: 2, par: 5, yards: 532 },
      { hole: 3, par: 4, yards: 177 },
      { hole: 4, par: 3, yards: 384 },
      { hole: 5, par: 4, yards: 471 },
      { hole: 6, par: 4, yards: 393 },
      { hole: 7, par: 4, yards: 451 },
      { hole: 8, par: 3, yards: 237 },
      { hole: 9, par: 5, yards: 602 },
      { hole: 10, par: 4, yards: 424 },
      { hole: 11, par: 5, yards: 558 },
      { hole: 12, par: 4, yards: 466 },
      { hole: 13, par: 3, yards: 181 },
      { hole: 14, par: 4, yards: 481 },
      { hole: 15, par: 4, yards: 470 },
      { hole: 16, par: 5, yards: 523 },
      { hole: 17, par: 3, yards: 137 },
      { hole: 18, par: 4, yards: 462 },
    ],
  },
  {
    id: "bay-hill",
    name: "Bay Hill Club",
    location: "Orlando, FL",
    par: 72,
    holes: [
      { hole: 1, par: 4, yards: 461 },
      { hole: 2, par: 3, yards: 207 },
      { hole: 3, par: 5, yards: 554 },
      { hole: 4, par: 4, yards: 438 },
      { hole: 5, par: 4, yards: 382 },
      { hole: 6, par: 4, yards: 408 },
      { hole: 7, par: 5, yards: 591 },
      { hole: 8, par: 3, yards: 163 },
      { hole: 9, par: 4, yards: 452 },
      { hole: 10, par: 4, yards: 402 },
      { hole: 11, par: 5, yards: 563 },
      { hole: 12, par: 4, yards: 416 },
      { hole: 13, par: 3, yards: 199 },
      { hole: 14, par: 4, yards: 431 },
      { hole: 15, par: 4, yards: 393 },
      { hole: 16, par: 3, yards: 220 },
      { hole: 17, par: 4, yards: 383 },
      { hole: 18, par: 4, yards: 458 },
    ],
  },
];

const roundData: Omit<Round, "scores" | "total" | "toPar">[] = [
  {
    id: "r1",
    courseId: "torrey-south",
    courseName: "Torrey Pines South",
    date: "2025-04-15",
    fairwaysHit: 6,
    fairwaysTotal: 14,
    greensInRegulation: 7,
    putts: 36,
    sandSaves: 1,
    sandAttempts: 3,
    drivingDistances: [
      245, 220, 180, 260, 255, 240, 190, 235, 270, 230, 200, 250, 265, 240, 248, 195, 238, 268,
    ],
  },
  {
    id: "r2",
    courseId: "pebble-beach",
    courseName: "Pebble Beach GL",
    date: "2025-03-22",
    fairwaysHit: 8,
    fairwaysTotal: 14,
    greensInRegulation: 9,
    putts: 33,
    sandSaves: 0,
    sandAttempts: 2,
    drivingDistances: [
      230, 245, 175, 210, 185, 250, 160, 240, 255, 260, 225, 190, 235, 265, 220, 230, 170, 250,
    ],
  },
  {
    id: "r3",
    courseId: "tpc-sawgrass",
    courseName: "TPC Sawgrass",
    date: "2025-02-08",
    fairwaysHit: 5,
    fairwaysTotal: 14,
    greensInRegulation: 6,
    putts: 38,
    sandSaves: 1,
    sandAttempts: 4,
    drivingDistances: [
      240, 255, 160, 220, 250, 230, 245, 200, 260, 235, 265, 240, 175, 250, 248, 255, 155, 245,
    ],
  },
  {
    id: "r4",
    courseId: "bay-hill",
    courseName: "Bay Hill Club",
    date: "2025-01-18",
    fairwaysHit: 7,
    fairwaysTotal: 14,
    greensInRegulation: 8,
    putts: 34,
    sandSaves: 2,
    sandAttempts: 3,
    drivingDistances: [
      250, 195, 245, 240, 225, 235, 255, 165, 248, 230, 260, 238, 190, 242, 228, 205, 220, 245,
    ],
  },
  {
    id: "r5",
    courseId: "torrey-south",
    courseName: "Torrey Pines South",
    date: "2024-12-10",
    fairwaysHit: 9,
    fairwaysTotal: 14,
    greensInRegulation: 10,
    putts: 32,
    sandSaves: 1,
    sandAttempts: 2,
    drivingDistances: [
      255, 235, 185, 265, 260, 250, 195, 240, 275, 245, 210, 258, 270, 248, 252, 200, 242, 272,
    ],
  },
  {
    id: "r6",
    courseId: "pebble-beach",
    courseName: "Pebble Beach GL",
    date: "2024-11-02",
    fairwaysHit: 7,
    fairwaysTotal: 14,
    greensInRegulation: 8,
    putts: 35,
    sandSaves: 0,
    sandAttempts: 1,
    drivingDistances: [
      235, 250, 180, 215, 190, 255, 165, 245, 260, 265, 230, 195, 240, 270, 225, 235, 175, 255,
    ],
  },
];

const rawScores: number[][] = [
  [5, 5, 4, 6, 5, 6, 4, 5, 7, 5, 4, 6, 7, 5, 6, 4, 5, 6], // +16
  [5, 5, 4, 5, 4, 6, 3, 5, 6, 5, 4, 5, 6, 5, 5, 4, 5, 6], // +12
  [6, 6, 5, 6, 6, 6, 4, 6, 7, 6, 5, 6, 7, 6, 6, 5, 6, 7], // +22
  [5, 4, 5, 5, 5, 5, 4, 5, 6, 5, 5, 5, 6, 5, 5, 4, 5, 6], // +14
  [5, 5, 4, 5, 5, 5, 4, 5, 6, 5, 4, 5, 6, 5, 5, 4, 5, 6], // +12
  [5, 5, 4, 5, 4, 6, 4, 5, 6, 5, 4, 5, 7, 5, 6, 4, 5, 7], // +16
];

function buildRound(base: Omit<Round, "scores" | "total" | "toPar">, scores: number[]): Round {
  const course = courses.find((c) => c.id === base.courseId)!;
  const holeScores = course.holes.map((h, i) => ({
    hole: h.hole,
    par: h.par,
    score: scores[i] ?? h.par + 1,
    yards: h.yards,
  }));
  const total = holeScores.reduce((sum, h) => sum + h.score, 0);
  const toPar = total - course.par;
  return { ...base, scores: holeScores, total, toPar };
}

export const rounds: Round[] = roundData.map((r, i) => buildRound(r, rawScores[i]!));

export const latestRound = rounds[0]!;

export const roundHistory: RoundHistoryEntry[] = rounds.map((r) => ({
  id: r.id,
  courseName: r.courseName,
  location: courses.find((c) => c.id === r.courseId)?.location ?? "",
  date: r.date,
  total: r.total,
  toPar: r.toPar,
  scores: r.scores.map((s) => s.score),
}));

export const coursesPlayed = courses.map((c) => {
  const courseRounds = rounds.filter((r) => r.courseId === c.id);
  const best = Math.min(...courseRounds.map((r) => r.total));
  const avg = Math.round(courseRounds.reduce((s, r) => s + r.total, 0) / courseRounds.length);
  return {
    ...c,
    timesPlayed: courseRounds.length,
    bestScore: best,
    avgScore: avg,
  };
});

export function getScoreColorClass(score: number, par: number): string {
  const diff = score - par;
  if (diff <= -2) return "bg-[#1a3c27] text-white"; // Eagle or better
  if (diff === -1) return "bg-[#2d7a3e] text-white"; // Birdie
  if (diff === 0) return "bg-white text-[#1a1a1a]"; // Par
  if (diff === 1) return "bg-[#e8e8e8] text-[#1a1a1a]"; // Bogey
  return "bg-[#c8c8c8] text-[#1a1a1a]"; // Double bogey+
}

export function getScoreLabel(score: number, par: number): string {
  const diff = score - par;
  if (diff <= -2) return "Eagle";
  if (diff === -1) return "Birdie";
  if (diff === 0) return "Par";
  if (diff === 1) return "Bogey";
  return "Double+";
}

export function computeScoringDistribution(allRounds: Round[]): ScoringDistribution {
  let eagles = 0;
  let birdies = 0;
  let pars = 0;
  let bogeys = 0;
  let doubleBogeys = 0;

  for (const round of allRounds) {
    for (const hole of round.scores) {
      const diff = hole.score - hole.par;
      if (diff <= -2) eagles++;
      else if (diff === -1) birdies++;
      else if (diff === 0) pars++;
      else if (diff === 1) bogeys++;
      else doubleBogeys++;
    }
  }

  return {
    eagles,
    birdies,
    pars,
    bogeys,
    doubleBogeys,
    total: eagles + birdies + pars + bogeys + doubleBogeys,
  };
}

export function computeStatistics(allRounds: Round[]): Statistics {
  const scoringDistribution = computeScoringDistribution(allRounds);

  const totalFairwaysHit = allRounds.reduce((s, r) => s + r.fairwaysHit, 0);
  const totalFairways = allRounds.reduce((s, r) => s + r.fairwaysTotal, 0);
  const fairwayPercentage =
    totalFairways > 0 ? Math.round((totalFairwaysHit / totalFairways) * 100) : 0;

  const totalGir = allRounds.reduce((s, r) => s + r.greensInRegulation, 0);
  const girPercentage = Math.round((totalGir / (allRounds.length * 18)) * 100);

  const allDrives = allRounds.flatMap((r) => r.drivingDistances);
  const avgDrivingDistance = Math.round(allDrives.reduce((s, d) => s + d, 0) / allDrives.length);
  const longestDrive = Math.max(...allDrives);

  const totalSandSaves = allRounds.reduce((s, r) => s + r.sandSaves, 0);
  const totalSandAttempts = allRounds.reduce((s, r) => s + r.sandAttempts, 0);
  const sandSavePercentage =
    totalSandAttempts > 0 ? Math.round((totalSandSaves / totalSandAttempts) * 100) : 0;

  const totalPutts = allRounds.reduce((s, r) => s + r.putts, 0);
  const puttsPerRound = Math.round((totalPutts / allRounds.length) * 10) / 10;
  const puttsPerGir = totalGir > 0 ? Math.round((totalPutts / totalGir) * 10) / 10 : 0;

  // Avg score by par type
  let par3Count = 0;
  let par3Sum = 0;
  let par4Count = 0;
  let par4Sum = 0;
  let par5Count = 0;
  let par5Sum = 0;

  for (const round of allRounds) {
    for (const hole of round.scores) {
      if (hole.par === 3) {
        par3Count++;
        par3Sum += hole.score;
      } else if (hole.par === 4) {
        par4Count++;
        par4Sum += hole.score;
      } else if (hole.par === 5) {
        par5Count++;
        par5Sum += hole.score;
      }
    }
  }

  return {
    scoringDistribution,
    girPercentage,
    fairwayPercentage,
    avgDrivingDistance,
    sandSavePercentage,
    puttsPerGir,
    puttsPerRound,
    avgScoreByPar3: par3Count > 0 ? Math.round((par3Sum / par3Count) * 10) / 10 : 0,
    avgScoreByPar4: par4Count > 0 ? Math.round((par4Sum / par4Count) * 10) / 10 : 0,
    avgScoreByPar5: par5Count > 0 ? Math.round((par5Sum / par5Count) * 10) / 10 : 0,
    longestDrive,
  };
}

export const statistics = computeStatistics(rounds);

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getRoundById(id: string): Round | undefined {
  return rounds.find((r) => r.id === id);
}
