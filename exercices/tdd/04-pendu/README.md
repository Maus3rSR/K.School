# TP — Le Pendu

## Objectif

Implémenter la **logique métier** d'un jeu du pendu, guidée entièrement par les tests.

Pas d'affichage, pas de boucle de jeu — uniquement les fonctions qui décrivent le comportement du jeu.

## Structure du projet

Le jeu est modélisé autour d'un type `GameState` :

```ts
type GameState = {
  word: string           // Le mot à deviner (en majuscules)
  maskedWord: string[]   // Le mot masqué : ["_", "_", "_", "_"]
  guessedLetters: string[] // Lettres déjà jouées
  remainingLives: number   // Vies restantes (défaut : 6)
  status: "playing" | "won" | "lost"
}
```

## Les 5 étapes

### Étape 1 — État initial (30 min)
Créer l'état initial d'une partie.

Le mot est fourni par un **Stub** — une fonction qui retourne toujours le même mot.
C'est ce qui rend les tests indépendants d'un vrai dictionnaire.

```ts
// Stub : fournit toujours "CHEVAL" pour les tests
const wordStub = () => "CHEVAL"

const game = createGame(wordStub)
// game.word === "CHEVAL"
// game.maskedWord === ["_", "_", "_", "_", "_", "_"]
// game.remainingLives === 6
// game.guessedLetters === []
// game.status === "playing"
```

### Étape 2 — Jouer une lettre correcte (20 min)
Révéler les positions de la lettre dans le mot masqué.

```ts
const game = createGame(() => "CHEVAL")
const updated = playLetter(game, "C")
// updated.maskedWord === ["C", "_", "_", "_", "_", "_"]
// updated.guessedLetters === ["C"]
// updated.remainingLives === 6 (inchangé)
```

### Étape 3 — Jouer une lettre incorrecte (20 min)
Décrémenter les vies restantes.

```ts
const game = createGame(() => "CHEVAL")
const updated = playLetter(game, "Z")
// updated.remainingLives === 5
// updated.maskedWord === ["_", "_", "_", "_", "_", "_"] (inchangé)
```

### Étape 4 — Victoire et défaite (25 min)
- Victoire : toutes les lettres révélées → `status: "won"`
- Défaite : plus de vies → `status: "lost"`

### Étape 5 — Lettre déjà jouée (25 min)
Rejeter une lettre déjà tentée sans pénalité (vies et masque inchangés).

```ts
// Fixture : partie avec "C" déjà joué
const gameWithC = playLetter(createGame(() => "CHEVAL"), "C")
const updated = playLetter(gameWithC, "C")
// updated.remainingLives === 6     (pas de pénalité)
// updated.guessedLetters === ["C"] (pas de doublon)
```

## Lancement

```bash
deno task start
```

## Consignes TDD

1. Implémenter **une étape à la fois** — ne pas lire l'étape suivante avant que les tests de l'étape actuelle passent
2. À l'étape 1, nommer le concept : *"cette fonction `wordStub`, c'est un Stub"*
3. À l'étape 5, factoriser le setup répété dans une fixture
4. Refactorer après chaque étape verte
