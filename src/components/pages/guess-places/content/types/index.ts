// Game type definitions
export type Place = {
  id: number;
  name: string;
  image: string;
  hints: string[];
};

export type GameMode = "Normal" | "time_attack" | "endless";
export type Difficulty = "easy" | "medium" | "hard";
export type GuessResult = "correct" | "incorrect" | null;