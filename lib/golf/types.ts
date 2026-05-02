export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  age: number;
  height: string;
  weight: string;
  worldRanking: number;
  bio: string;
  image?: string;
}

export interface HoleScore {
  hole: number;
  par: number;
  score: number;
  yards: number;
}

export interface Round {
  roundNumber: number;
  scores: HoleScore[];
  total: number;
  toPar: number;
}

export interface PlayerScorecard {
  playerId: string;
  rounds: Round[];
}

export interface LeaderboardEntry {
  position: string;
  playerId: string;
  playerName: string;
  countryCode: string;
  total: number;
  toPar: number;
  round1: number | null;
  round2: number | null;
  round3: number | null;
  round4: number | null;
  thru: string;
}

export interface PlayerStat {
  category: string;
  value: string;
  rank: string;
}

export interface PlayerStatistics {
  playerId: string;
  stats: PlayerStat[];
}

export interface TournamentResult {
  year: number;
  position: string;
  score: string;
  toPar: string;
}

export interface PlayerProfile {
  player: Player;
  pastResults: TournamentResult[];
}
