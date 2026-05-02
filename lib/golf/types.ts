export interface Course {
  id: string;
  name: string;
  location: string;
  par: number;
  holes: HoleInfo[];
  image?: string;
}

export interface HoleInfo {
  hole: number;
  par: number;
  yards: number;
}

export interface HoleScore {
  hole: number;
  par: number;
  score: number;
  yards: number;
}

export interface Round {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  scores: HoleScore[];
  total: number;
  toPar: number;
  fairwaysHit: number;
  fairwaysTotal: number;
  greensInRegulation: number;
  putts: number;
  sandSaves: number;
  sandAttempts: number;
  drivingDistances: number[];
}

export interface GolferProfile {
  name: string;
  handicap: number;
  roundsPlayed: number;
  bestScore: number;
  bestScoreToPar: number;
  avgScore: number;
  avgScoreToPar: number;
  coursesPlayed: number;
  avatarUrl?: string;
}

export interface ScoringDistribution {
  eagles: number;
  birdies: number;
  pars: number;
  bogeys: number;
  doubleBogeys: number;
  total: number;
}

export interface Statistics {
  scoringDistribution: ScoringDistribution;
  girPercentage: number;
  fairwayPercentage: number;
  avgDrivingDistance: number;
  sandSavePercentage: number;
  puttsPerGir: number;
  puttsPerRound: number;
  avgScoreByPar3: number;
  avgScoreByPar4: number;
  avgScoreByPar5: number;
  longestDrive: number;
}

export interface RoundHistoryEntry {
  id: string;
  courseName: string;
  location: string;
  date: string;
  total: number;
  toPar: number;
  scores: number[];
}
