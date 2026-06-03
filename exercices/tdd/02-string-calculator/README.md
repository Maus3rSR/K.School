# Kata — String Calculator

## Objectif

Implémenter une fonction `add` qui additionne des nombres passés sous forme de chaîne de caractères.

## Règles

Implémenter les règles **dans l'ordre** — une règle à la fois.

### Étape 1 — Chaîne vide
`add("")` → `0`

### Étape 2 — Un seul nombre
`add("5")` → `5`

### Étape 3 — Deux nombres séparés par une virgule
`add("1,2")` → `3`

### Étape 4 — N nombres
`add("1,2,3,4")` → `10`

### Étape 5 — Nombres négatifs interdits
`add("1,-2,3")` → lance une `Error("negatives not allowed: -2")`
Si plusieurs négatifs : `add("1,-2,-5")` → `Error("negatives not allowed: -2, -5")`

## Lancement

```bash
deno task start
```

## Consignes TDD

1. Faire passer **un test à la fois** dans l'ordre
2. Chaque test doit être **rouge** avant d'écrire le code
3. Écrire le **minimum** de code pour passer le test
4. **Refactorer** après chaque test vert
