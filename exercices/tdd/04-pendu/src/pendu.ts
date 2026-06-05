export type GameState = {
  word: string;
  maskedWord: string[];
  guessedLetters: string[];
  remainingLives: number;
  status: "playing" | "won" | "lost";
};

export function createGame(wordProvider: () => string): GameState {
  throw new Error("Not implemented");
}

export function playLetter(game: GameState, letter: string): GameState {
  throw new Error("Not implemented");
}
