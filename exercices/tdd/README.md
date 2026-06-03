# Exercices — TDD (Test Driven Development)

Exercices pratiques du cours **TDD — Test Driven Development**.

## Exercices disponibles

| Script | Dossier | Sujet | Séance |
|--------|---------|-------|--------|
| `deno task 01-pig-latin` | `01-pig-latin/` | Kata warmup — transformation de mots selon règles phoniques | S1 |
| `deno task 02-string-calculator` | `02-string-calculator/` | Kata — additionner des nombres en chaîne, edge cases et erreurs | S1 |
| `deno task 03-roman-numerals` | `03-roman-numerals/` | Kata — convertir un entier en chiffres romains par accumulation de règles | S1 |
| `deno task 04-pendu` | `04-pendu/` | TP — Jeu du pendu complet en TDD, Stub et fixture en situation | S2 |

## Prérequis

- [Deno](https://deno.land/) installé (`deno --version`)
- Avoir suivi le cours TDD

## Lancement

Depuis le dossier `exercices/tdd/` :

```bash
deno task 01-pig-latin
```

Ou directement depuis le dossier de l'exercice :

```bash
cd 01-pig-latin
deno task start
```

> Les exercices utilisent `deno test --watch` — les tests se relancent automatiquement à chaque modification.
