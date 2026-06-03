# Kata — Pig Latin

## Objectif

Convertir un mot en Pig Latin en appliquant les règles dans l'ordre.

## Règles

Implémenter les règles **dans cet ordre** — une règle = un test qui passe.

### Règle 1 — Mot commençant par une voyelle
Ajouter `"ay"` à la fin du mot.
- `"apple"` → `"appleay"`
- `"ear"` → `"earay"`
- `"igloo"` → `"iglooay"`

### Règle 2 — Mot commençant par une consonne
Déplacer la consonne initiale à la fin du mot, puis ajouter `"ay"`.
- `"pig"` → `"igpay"`
- `"latin"` → `"atinlay"`

### Règle 3 — Mot commençant par plusieurs consonnes
Déplacer toutes les consonnes initiales consécutives à la fin, puis ajouter `"ay"`.
- `"school"` → `"oolschay"`
- `"three"` → `"eethray"`
- `"glove"` → `"oveglay"`

## Lancement

```bash
deno task start
```

## Consignes TDD

1. Faire passer **un test à la fois** — dans l'ordre du fichier de test
2. Chaque test doit être **rouge** avant d'écrire le code
3. Écrire le **minimum** de code pour passer le test
4. **Refactorer** dès que le test est vert (renommer, extraire, simplifier)
