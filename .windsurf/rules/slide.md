---
trigger: model_decision
description: When working on courses slides markdown files
---

# Règles de Mise en Œuvre Technique pour les présentations

## Template de Slide Type

Utiliser `<div v-click>` pour révélation progressive. Ajouter notes HTML `<!-- -->` avec anecdotes et pièges courants.

## Composants Pédagogiques

> Référence : `skills/slidev/references/`

`<VClick>`, `<Transform>`, `<mark>`, `<Toc>`, `<Arrow>`, `<AutoFitText>`, `magic-move`

## Layout des Slides

- Syntaxe abrégée : `skills/slidev/references/layout-slots.md`
- Deux colonnes : `two-cols-header`
- **Contenu trop long** : Changer de layout ou diviser en plusieurs slides
- Référence : `skills/slidev/references/core-layouts.md`

## Code : Shiki Magic Move & Line Highlighting

### Shiki Magic Move

Évolution progressive du code. Syntaxe : 4 backticks `````md magic-move`.

**Bonnes pratiques** : Une étape = un concept | Line highlighting `{5-8}` pour changements | Commentaires guidants

### Line Highlighting

Décortiquer un code ligne par ligne. Syntaxe : `{lignes|lignes|all}` avec `|` pour séparer les clicks.

**Valeurs** : `hide`, `none`, `all` | **Pratique** : Contexte global → Détails → Vue d'ensemble

### Quand utiliser quoi ?

| Situation | Outil |
|-----------|-------|
| Montrer l'évolution du code (ajout, refactoring) | **Magic Move** |
| Expliquer un code existant ligne par ligne | **Line Highlighting** |
| Combiner les deux | Magic Move avec Line Highlighting dans chaque étape |

