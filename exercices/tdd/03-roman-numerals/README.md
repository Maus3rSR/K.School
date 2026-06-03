# Kata — Roman Numerals

## Objectif

Convertir un entier positif en chiffres romains.

## Table de référence

| Valeur | Symbole |
|--------|---------|
| 1      | I       |
| 4      | IV      |
| 5      | V       |
| 9      | IX      |
| 10     | X       |
| 40     | XL      |
| 50     | L       |
| 90     | XC      |
| 100    | C       |
| 400    | CD      |
| 500    | D       |
| 900    | CM      |
| 1000   | M       |

## Exemples

- `1` → `"I"`
- `4` → `"IV"`
- `9` → `"IX"`
- `14` → `"XIV"`
- `42` → `"XLII"`
- `1994` → `"MCMXCIV"`

## Lancement

```bash
deno task start
```

## Consignes TDD

1. Commencer par les cas simples (1, 2, 3) **avant** les cas soustractifs (4, 9...)
2. Laisser les tests guider la découverte de la structure de l'algorithme
3. Après les 5 premiers tests, un pattern devrait émerger — le refactoring le rendra visible
4. Ne pas chercher la "solution générale" dès le départ — les baby steps y mènent naturellement
