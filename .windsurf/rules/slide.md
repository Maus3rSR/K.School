---
trigger: model_decision
description: When working on courses slides markdown files
---

# Règles de Mise en Œuvre Technique pour les présentations

## Template de Slide Type

Les commentaires HTML (`<!-- -->`) doivent accompagner chaque slide pour guider le présentateur avec des indications orales, des points clés à souligner et des précisions pédagogiques à apporter.

``````markdown
---
layout: default
---

# Titre Clair et Concis

<div v-click>

## Concept Principal

Définition simple et accessible

</div>

<div v-click>

## Exemple Concret

`````ts
// Code commenté ligne par ligne
const exemple = "facile à comprendre"
\```

</div>

<div v-click>

## 💡 À Retenir
- Point clé 1
- Point clé 2
- Point clé 3

</div>

<!--
Notes du présentateur:
- Anecdote: ...
- Piège courant: ...
-->
````
`````
``````

## Composants Pédagogiques Recommandés

Toujours se référer à `skills/slidev/references/` pour l'implémentation technique. Invoquer ce skill dès qu'une création de slides est nécessaire.

- `<VClick>`: Révélation progressive des concepts
- `<Transform>`, `<mark>`: Mise en évidence des points importants
- `<Toc>`: Navigation claire dans la présentation
- `<Arrow>`: Pointer les éléments clés dans les diagrammes
- `<AutoFitText>`: Adapter le texte à l'espace disponible
- `magic-move`: Animer l'évolution du code entre plusieurs étapes (voir section dédiée)

## Layout des slides

Toujours utiliser la syntaxe abrégée (Shorthand Syntax) de `skills/slidev/references/layout-slots.md` lors de l'utilisation des layouts.

Pour deux colonnes, préférer l'utilisation du layout `two-cols-header`.

Si le contenu d'une slide est trop long ou dépasse l'espace visible, tu DOIS automatiquement changer de layout (par exemple `two-cols-header`) ou diviser le contenu sur plusieurs slides pour respecter le principe "une idée par slide".

Choisir le le bon layout par rapport à ce que l'on souhaite présenter, voir `skills/slidev/references/core-layouts.md`

## Code : Shiki Magic Move & Line Highlighting

### Shiki Magic Move

Utiliser Magic Move pour montrer l'**évolution progressive** du code (ajout de fonctionnalités, refactoring, etc.).

**Syntaxe** : Utiliser 4 backticks pour le wrapper `magic-move`.

`````markdown
````md magic-move
```ts
// Étape 1 : Code initial
class Point {
  x: number = 0
  y: number = 0
}
```

```ts {5-8}
// Étape 2 : Ajout du constructeur (lignes 5-8 surlignées)
class Point {
  x: number = 0
  y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
```
````
`````

**Bonnes pratiques** :
- Chaque bloc de code = une étape de l'évolution
- Utiliser le line highlighting `{5-8}` pour mettre en évidence les changements
- Garder les étapes simples : un seul concept ajouté par transition
- Ajouter des commentaires dans le code si nécessaire pour guider l'apprenant

### Line Highlighting (Click-based)

Utiliser le line highlighting dynamique pour **décortiquer** un code existant ligne par ligne.

**Syntaxe** : `{lignes|lignes|all}` avec `|` pour séparer les étapes de click.

```markdown
```ts {1-7|1|2-3|5-7|all}
class Point {
  x: number = 0
  y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```
```

**Valeurs spéciales** :
- `hide` : Masquer le bloc de code
- `none` : Afficher sans surlignage
- `all` : Surligner toutes les lignes

**Bonnes pratiques** :
- Commencer par montrer tout le code `{1-7|...}` pour donner le contexte
- Puis décortiquer partie par partie
- Terminer par `all` pour revoir l'ensemble
- Synchroniser avec des `v-click="N"` dans la colonne d'explication si layout `two-cols-header`

### Quand utiliser quoi ?

| Situation | Outil |
|-----------|-------|
| Montrer l'évolution du code (ajout, refactoring) | **Magic Move** |
| Expliquer un code existant ligne par ligne | **Line Highlighting** |
| Combiner les deux | Magic Move avec Line Highlighting dans chaque étape |

## Pour les Exercices

### Structure de Fichier

```markdown
# Exercice: [Titre Descriptif]

## 🎯 Objectif

Ce que vous allez apprendre en faisant cet exercice.

## 📚 Prérequis

- Concept 1 (lien vers la leçon)
- Concept 2 (lien vers la leçon)

## 📝 Contexte

Mise en situation professionnelle réaliste.

## ✅ Critères de Réussite

- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3

## 🛠️ Instructions

### Étape 1: [Titre]

Description claire de ce qu'il faut faire.

<details>
<summary>💡 Indice 1</summary>
Premier niveau d'aide
</details>

<details>
<summary>💡 Indice 2</summary>
Deuxième niveau d'aide
</details>

<details>
```
