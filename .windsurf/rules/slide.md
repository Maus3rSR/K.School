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

### Longueur de Texte par Layout

**Layout normal (default)** :
- **Titre** : 1 ligne courte (max 60 caractères)
- **Contenu principal** : 3-6 points de liste OU 2-3 paragraphes courts (max 4-5 lignes chacun)
- **Texte total** : ~150-300 mots maximum
- **Règle d'or** : Si plus de 6 points ou 300 mots → diviser en plusieurs slides

**Layout `two-cols-header`** :
- **Header** : Titre + sous-titre optionnel (1-2 lignes)
- **Chaque colonne** : 3-4 points de liste OU 1-2 paragraphes courts (max 3-4 lignes)
- **Texte par colonne** : ~80-150 mots maximum
- **Règle d'or** : Équilibrer les colonnes, éviter qu'une colonne soit 2× plus longue que l'autre

**Layout `two-cols` (sans header)** :
- **Chaque colonne** : 4-5 points de liste OU 2-3 paragraphes courts
- **Texte par colonne** : ~100-180 mots maximum
- **Règle d'or** : Utiliser pour comparaisons (avant/après, avantages/inconvénients)

**Layouts spéciaux** :
- **`center`** : Texte minimal, 1-3 lignes centrées, impact visuel
- **`image-right/left`** : Texte réduit (3-4 points), laisser l'image respirer
- **`quote`** : Citation courte (max 2-3 lignes) + attribution

**Indicateurs de contenu trop long** :
- Besoin de scroll sur la slide
- Texte qui déborde visuellement
- Police < 16px pour tout faire rentrer
- Plus de 8 points de liste sur une slide
- Paragraphes de plus de 6 lignes

## Code

### Shiki Magic Move

Évolution progressive du code. Syntaxe : 4 backticks `````md magic-move`.

**Bonnes pratiques** : 
- Une étape = un concept clairement identifié
- Line highlighting `{5-8}` pour mettre en évidence les changements
- Commentaires guidants dans le code
- **OBLIGATOIRE** : Chaque étape du Magic Move doit avoir un `<div v-click="N">` correspondant avec explication

**Exemple correct** :
````md
````md magic-move
```ts
class Point {
  x: number = 0
  y: number = 0
}
```

```ts {5-8}
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

::right::

<div v-click="1">

**Ajout du constructeur**
- Initialise les attributs avec des valeurs personnalisées

</div>
````

### Line Highlighting

Décortiquer un code ligne par ligne. Syntaxe : `{lignes|lignes|all}` avec `|` pour séparer les clicks.

**Valeurs** : `hide`, `none`, `all` | **Pratique** : Contexte global → Détails → Vue d'ensemble

**RÈGLE CRITIQUE** : **Synchronisation obligatoire entre highlighting et v-click**
- Chaque étape de highlighting (`|`) doit correspondre à un `<div v-click>` ou `<div v-click="N">`
- Le contenu du v-click doit expliquer **exactement** les lignes surlignées
- **INTERDIT** : Avoir un v-click qui parle de lignes non surlignées à cette étape

**Exemple correct** :
```ts
::left::

```ts {1-7|1|2-3|5|6|all}
class Point {
  public x: number = 0
  public y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

::right::

<div v-click="1">

- `class Point` : Déclaration de la classe

</div>

<div v-click="2">

- `x = 0` et `y = 0` : **Attributs** avec valeurs par défaut

</div>

<div v-click="3">

- `afficher()` : **Méthode** pour afficher le point

</div>

<div v-click="4">

- `this` : Référence à l'objet courant

</div>
```

**Exemple INCORRECT** :
```ts
// ❌ MAUVAIS : v-click parle de méthodes alors que seuls les attributs sont surlignés
```ts {2-3}
class Point {
  x: number = 0
  y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

<div v-click>

- La méthode `afficher()` permet d'afficher le point  ❌ INCOHÉRENT

</div>
```

### Quand utiliser quoi ?

| Situation | Outil | Synchronisation v-click |
|-----------|-------|------------------------|
| Montrer l'évolution du code (ajout, refactoring) | **Magic Move** | 1 v-click par étape du Magic Move |
| Expliquer un code existant ligne par ligne | **Line Highlighting** | 1 v-click par segment de highlighting (`\|`) |
| Combiner les deux | Magic Move avec Line Highlighting dans chaque étape | v-click pour Magic Move + highlighting dans chaque étape |

### Limitation de Hauteur des Codeblocks

**Appliquer `maxHeight`** quand le code dépasse **~20 lignes** pour éviter le débordement visuel.

**Syntaxe** : `{maxHeight:'300px'}`

**Règles** :
- **> 20 lignes** → `maxHeight:'300px'`
- **< 20 lignes** → Pas de maxHeight (laisser naturel)

**Combinaison** : `{1-5|7-10|all}{maxHeight:'300px'}` (line highlighting + maxHeight) ou `{*}{maxHeight:'300px'}`

