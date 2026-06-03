import { assertEquals } from "jsr:@std/assert"
import { createGame, playLetter, type GameState } from "./pendu.ts"

// Stub : fournit toujours le même mot pour l'isolation des tests
const wordStub = (word: string) => () => word

// ─────────────────────────────────────────────
// Étape 1 — État initial
// ─────────────────────────────────────────────

Deno.test("should mask all letters at start", () => {
  const game = createGame(wordStub("CHEVAL"))
  assertEquals(game.maskedWord, ["_", "_", "_", "_", "_", "_"])
})

Deno.test("should store the word", () => {
  const game = createGame(wordStub("CHEVAL"))
  assertEquals(game.word, "CHEVAL")
})

Deno.test("should start with 6 remaining lives", () => {
  const game = createGame(wordStub("CHEVAL"))
  assertEquals(game.remainingLives, 6)
})

Deno.test("should start with no guessed letters", () => {
  const game = createGame(wordStub("CHEVAL"))
  assertEquals(game.guessedLetters, [])
})

Deno.test("should start with status playing", () => {
  const game = createGame(wordStub("CHEVAL"))
  assertEquals(game.status, "playing")
})

// ─────────────────────────────────────────────
// Étape 2 — Lettre correcte
// ─────────────────────────────────────────────

Deno.test("should reveal letter position when correct letter is played", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "C")
  assertEquals(updated.maskedWord, ["C", "_", "_", "_", "_", "_"])
})

Deno.test("should reveal all occurrences of a letter", () => {
  const game = createGame(wordStub("ANNA"))
  const updated = playLetter(game, "A")
  assertEquals(updated.maskedWord, ["A", "_", "_", "A"])
})

Deno.test("should add correct letter to guessed letters", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "C")
  assertEquals(updated.guessedLetters, ["C"])
})

Deno.test("should not change remaining lives when letter is correct", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "C")
  assertEquals(updated.remainingLives, 6)
})

// ─────────────────────────────────────────────
// Étape 3 — Lettre incorrecte
// ─────────────────────────────────────────────

Deno.test("should decrement remaining lives when letter is wrong", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "Z")
  assertEquals(updated.remainingLives, 5)
})

Deno.test("should not reveal any letter when letter is wrong", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "Z")
  assertEquals(updated.maskedWord, ["_", "_", "_", "_", "_", "_"])
})

Deno.test("should add wrong letter to guessed letters", () => {
  const game = createGame(wordStub("CHEVAL"))
  const updated = playLetter(game, "Z")
  assertEquals(updated.guessedLetters, ["Z"])
})

// ─────────────────────────────────────────────
// Étape 4 — Victoire et défaite
// ─────────────────────────────────────────────

Deno.test("should set status to won when all letters are revealed", () => {
  // Mot court pour simplifier
  let game = createGame(wordStub("AS"))
  game = playLetter(game, "A")
  game = playLetter(game, "S")
  assertEquals(game.status, "won")
})

Deno.test("should set status to lost when no lives remain", () => {
  let game = createGame(wordStub("AS"))
  // 6 mauvaises lettres pour épuiser les vies
  for (const letter of ["Z", "Q", "W", "X", "B", "F"]) {
    game = playLetter(game, letter)
  }
  assertEquals(game.status, "lost")
})

Deno.test("should not allow playing after game is won", () => {
  let game = createGame(wordStub("AS"))
  game = playLetter(game, "A")
  game = playLetter(game, "S")
  // Tenter de jouer après victoire — lives et masque restent inchangés
  const afterWon = playLetter(game, "Z")
  assertEquals(afterWon.status, "won")
  assertEquals(afterWon.remainingLives, 6)
})

// ─────────────────────────────────────────────
// Étape 5 — Lettre déjà jouée
// ─────────────────────────────────────────────

// Fixture : construit une partie avec des lettres déjà jouées
function buildGameWithLettersPlayed(word: string, letters: string[]): GameState {
  return letters.reduce(
    (game, letter) => playLetter(game, letter),
    createGame(wordStub(word))
  )
}

Deno.test("should not penalize when replaying an already guessed letter", () => {
  const game = buildGameWithLettersPlayed("CHEVAL", ["C"])
  const updated = playLetter(game, "C")
  assertEquals(updated.remainingLives, 6)
})

Deno.test("should not duplicate letter in guessed letters", () => {
  const game = buildGameWithLettersPlayed("CHEVAL", ["C"])
  const updated = playLetter(game, "C")
  assertEquals(updated.guessedLetters, ["C"])
})

Deno.test("should not change masked word when replaying a letter", () => {
  const game = buildGameWithLettersPlayed("CHEVAL", ["C"])
  const updated = playLetter(game, "C")
  assertEquals(updated.maskedWord, ["C", "_", "_", "_", "_", "_"])
})
