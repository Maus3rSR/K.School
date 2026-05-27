---
trigger: model_decision
description: When working on courses slides markdown files
---

# Règles de Mise en Œuvre Technique pour les présentations

## Template de Slide Type

Utiliser `<div v-click>` pour révélation progressive. Ajouter notes HTML `<!-- -->` avec anecdotes et pièges courants.

## Structure du Cours

### Organisation en Fichiers Externes

**Principe de base** : Les chapitres sont **toujours découpés** en fichiers séparés dans `sections/`.

**Sous-découper un chapitre en sous-sections** si **≥ 2 critères** sur 4 :

| Critère | Seuil |
|---------|-------|
| Nombre de slides | ≥ 12 slides |
| Concepts distincts | ≥ 3 concepts majeurs |
| Sections `layout: section` | ≥ 3 sections |
| Exercices pratiques | ≥ 2 exercices |

**Structure avec sous-découpage** :
```
sections/
├── 02-chapitre-nom/
│   ├── index.md              # Imports des sous-sections
│   ├── 01-concept-1.md
│   ├── 02-concept-2.md
│   └── 03-exercice.md
```

**Structure sans sous-découpage** :
```
sections/
├── 02-chapitre-nom.md        # Chapitre complet dans un seul fichier
```

**Nommage** : `[numéro]-[concept-principal].md` (ex: `01-jsx-intro.md`)

**Ne PAS sous-découper un chapitre** : < 10 slides, 1-2 concepts, durée < 30 min

### Positionnement des Ressources

**OBLIGATOIRE** : La slide "Ressources pour ce cours" doit être placée **immédiatement après la slide de couverture** (slide de titre), **avant le premier chapitre**.

**Format standard** :
```md
---
layout: two-cols-header
---

# Ressources pour ce cours

::left::

<div>

## Liens utiles

📚 [Titre](URL) - Description

📖 [Titre](URL) - Description

</div>

::right::

<div>

## Références complémentaires

🔗 [Titre](URL) - Description

🔗 [Titre](URL) - Description

</div>
```

**Pas de `v-click`** sur les ressources : elles doivent être visibles immédiatement, pas révélées progressivement.

**Objectif** : Avoir les ressources directement accessibles au début du cours, pas à la fin. Les apprenants peuvent ainsi les consulter pendant toute la formation.

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

## Slide de Lexique Technique

### Positionnement

**OBLIGATOIRE** : La slide "Lexique" doit être placée **immédiatement après la slide "Ressources pour ce cours"**, au début du cours, avant le premier chapitre.

### Format Standard

Utiliser le composant `<TermCard>` de l'addon `@k.school/slidev-addon-ui` (auto-enregistré, pas d'import nécessaire).

```md
---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="API" translation="(Interface de Programmation)" definition="Interface permettant la communication entre applications" />

<TermCard term="Callback" translation="(Fonction de rappel)" definition="Fonction passée en paramètre et exécutée plus tard" />

<TermCard term="Dependency" translation="(Dépendance)" definition="Bibliothèque externe requise par le projet" />

::right::

<TermCard term="Framework" translation="(Cadre de travail)" definition="Structure logicielle réutilisable pour développer" />

<TermCard term="Payload" translation="(Charge utile)" definition="Données transmises dans une requête" />

<TermCard term="Runtime" translation="(Environnement d'exécution)" definition="Environnement dans lequel le code s'exécute" />
```

### Règles de Contenu

- **`term`** : Terme technique **en anglais** (langue de référence)
- **`translation`** : Traduction française entre parenthèses — **omettre si identique** à l'anglais (ex: `Abstraction`, `Interface`)
- **`definition`** : 1 ligne maximum, claire et accessible
- **Ordre alphabétique** : Strict sur le terme anglais, réparti équitablement entre les deux colonnes
- **Sélection** : Uniquement les termes techniques clés du cours (8-12 termes recommandés)
- **Pas de `v-click`** sur les `<TermCard>` : les termes apparaissent directement

### Objectifs Pédagogiques

- Renforcer la mémorisation du vocabulaire technique
- Fournir une référence rapide pendant et après le cours
- Familiariser avec la terminologie professionnelle anglaise
- Faciliter la transition vers la documentation technique

