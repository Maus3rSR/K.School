---
name: slides-kschool
description: Règles de mise en oeuvre technique des slides K.School avec Slidev — structure, layouts, code, animations, anti-patterns, slide lexique et slide ressources. Invoquer quand on travaille sur des fichiers markdown de slides dans courses/.
---

# Règles de Mise en Œuvre Technique pour les Présentations K.School

## Structure du Cours

### Organisation en Fichiers Externes

**Principe de base** : Les chapitres sont **toujours découpés** en fichiers séparés dans `sections/`.

**Sous-découper un chapitre en sous-sections** si **≥ 2 critères** sur 4 :

| Critère                    | Seuil                |
| -------------------------- | -------------------- |
| Nombre de slides           | ≥ 12 slides          |
| Concepts distincts         | ≥ 3 concepts majeurs |
| Sections `layout: section` | ≥ 3 sections         |
| Exercices pratiques        | ≥ 2 exercices        |

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

**Numérotation des chapitres** : Les chapitres **doivent commencer à 01**, jamais à 00. Un fichier `00-` est réservé aux éléments hors chapitre (lexique, ressources).

**Ne PAS sous-découper un chapitre** : < 10 slides, 1-2 concepts, durée < 30 min

### Positionnement des Slides Spéciales (OBLIGATOIRE)

1. Slide de couverture
2. **Slide "Ressources pour ce cours"** (immédiatement après la couverture)
3. **Slide "Lexique"** (immédiatement après les ressources)
4. Premier chapitre (01-)

---

## Composants Pédagogiques

> Référence technique Slidev : `.agents/skills/slidev/references/`

`<VClick>`, `<Transform>`, `<mark>`, `<Toc>`, `<Arrow>`, `<AutoFitText>`, `magic-move`

---

## Layout des Slides

- Syntaxe abrégée : `.agents/skills/slidev/references/layout-slots.md`
- Deux colonnes : `two-cols-header`
- **Contenu trop long** : Changer de layout ou diviser en plusieurs slides
- Référence : `.agents/skills/slidev/references/core-layouts.md`

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

---

## Anti-patterns à Éviter

### Slides de récapitulatif verbatim (INTERDIT)

**INTERDIT** : Créer une slide « Récapitulatif » qui recopie mot pour mot les bullets des slides précédentes.

> ❌ Mauvais : une slide finale de chapitre qui liste à nouveau les 4 points déjà présentés un par un.

**Alternative obligatoire** : Terminer un chapitre par une **question de transition ouverte** (`layout: center`) qui invite les apprenants à reformuler, ou par une note de speaker sans slide dédiée.

**Format standard de transition** :

```md
---
layout: center
class: text-center
---

# Titre du Chapitre

&nbsp;

> 💬 [Question ouverte qui connecte ce chapitre au suivant]

<!--
Notes de transition pour le présentateur.
-->
```

**Exception** : Une synthèse est acceptable **uniquement** si elle croise ou reformule des points de chapitres **différents** (ex : synthèse finale de cours).

### Question de transition référençant un concept non encore vu (INTERDIT)

**INTERDIT** : Poser une question de transition qui demande aux apprenants de comparer ou d'utiliser un concept qui sera introduit **dans le chapitre suivant**.

> ❌ Mauvais : fin du chapitre "Polymorphisme" → « Quelle différence entre une **interface** et une **classe abstraite** ? » alors que les classes abstraites sont introduites au chapitre suivant.

**Règle** : La question de transition doit pouvoir être répondue **uniquement avec les acquis du chapitre en cours et des chapitres précédents**. Elle ouvre une curiosité, elle ne présuppose pas une connaissance future.

**Diagnostic** : Avant d'écrire une question de transition, vérifier que chaque concept mentionné dans la question a déjà été couvert. Si un concept appartient au chapitre suivant → reformuler en partant du problème que ce concept résout.

> ✅ Bon : « On a vu que le polymorphisme repose sur un contrat commun. Comment forcer plusieurs classes à **respecter ce contrat** sans dupliquer de code ? » — les apprenants peuvent raisonner sur la question sans connaître la réponse.

---

### Slide de contexte métier isolée (INTERDIT)

**INTERDIT** : Créer une slide dédiée uniquement à poser le contexte métier d'un exercice, suivie immédiatement d'une slide avec le code.

**À faire à la place** : Intégrer le contexte dans la **colonne droite** du layout `two-cols-header` de la slide qui affiche le code, avec les `v-click` pour les analyses symptomatiques.

````md
---
layout: two-cols-header
layoutClass: gap-x-4
---

# Titre

Contexte résumé en sous-titre (5-8 mots max)

::left::

```ts
// code ici
```
````

::right::

**Le contexte métier**

- Concept A : **terme clé**
- Concept B : **terme clé**

<div v-click="1">

**Analyse**

- ...

</div>
```

---

## Code

### Shiki Magic Move

Évolution progressive du code. Syntaxe : 4 backticks `````md magic-move`.

**Bonnes pratiques** :

- Une étape = un concept clairement identifié
- Line highlighting `{5-8}` pour mettre en évidence les changements
- Commentaires guidants dans le code
- **OBLIGATOIRE** : Chaque étape du Magic Move doit avoir un `<div v-click="N">` correspondant avec explication

### Line Highlighting

Décortiquer un code ligne par ligne. Syntaxe : `{état_initial|lignes|lignes|all}` avec `|` pour séparer les clicks.

#### États initiaux (click 0 — sans clic utilisateur)

`all` et `none` placés en **premier segment** sont des **états initiaux** : ils s'affichent dès l'arrivée sur la slide, sans consommer de click utilisateur.

| Premier segment                   | Affichage initial            | Usage pédagogique                                        |
| --------------------------------- | ---------------------------- | -------------------------------------------------------- |
| `all`                             | Tout le code highlighté      | Montrer le bloc complet avant de le décortiquer          |
| `none`                            | Code visible sans highlight  | Laisser le code "neutre" avant la découverte progressive |
| `{1-3\|...}` (aucun état initial) | Lignes 1-3 déjà highlightées | À éviter — crée un décalage avec les v-click             |

**RÈGLE** : Toujours commencer par `all` ou `none` pour avoir un état initial propre.

#### Synchronisation avec v-click

Les `v-click` **doivent être numérotés explicitement** (`v-click="N"`) pour garantir la synchronisation.

- État initial (`all` ou `none`) = click 0 → **aucun v-click**
- Premier segment après l'état initial = click 1 → `v-click="1"`
- Deuxième segment = click 2 → `v-click="2"`, etc.

**Exemple correct** (`all` initial + décorticage) :

````md
::left::

```ts {all|1|3|4|5}
import { assertEquals } from "jsr:@std/assert";

Deno.test("nom", () => {
  const result = fn(1);
  assertEquals(result, "1");
});
```
````

::right::

<div v-click="1">

`import { assertEquals }` — l'assertion

</div>

<div v-click="2">

`Deno.test(...)` — déclarer un test nommé

</div>
```

**Exemple correct** (`none` initial + découverte progressive) :

````md
```ts {none|1-3|5-6|8-9|all}

```
````

→ click 1 = lignes 1-3 + `v-click="1"`, click 2 = lignes 5-6 + `v-click="2"`, etc.

#### Pattern all final (OBLIGATOIRE avant slide suivante)

Quand la dernière étape est un **texte de synthèse ou une règle**, ajouter `all` en dernier segment pour récapituler visuellement le code entier.

````md
```ts {none|1-3|5-6|8-9|all}

```
````

→ Le `all` final se synchronise avec le v-click de la règle/synthèse.

#### RÈGLE CRITIQUE : Synchronisation obligatoire

- Chaque segment de highlighting (sauf l'état initial) = **un `v-click="N"` exactement**
- Le contenu du v-click doit expliquer **exactement** les lignes surlignées
- **INTERDIT** : `v-click` sans numéro explicite quand du line highlighting est présent
- **INTERDIT** : Avoir un v-click qui parle de lignes non surlignées à cette étape

### Quand utiliser quoi ?

| Situation                                        | Outil                                       | Pattern                                                  |
| ------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------- |
| Montrer l'évolution du code (ajout, refactoring) | **Magic Move**                              | 1 `v-click="N"` par étape                                |
| Expliquer un code existant ligne par ligne       | **Line Highlighting**                       | `{all\|lignes\|...\|all}` ou `{none\|lignes\|...\|all}`  |
| Combiner les deux                                | Magic Move + highlighting dans chaque étape | `v-click` pour Magic Move + `{lignes}` dans chaque étape |

---

## Slide Ressources — Format et Qualité

### Format Obligatoire

```md
---
layout: two-cols-header
---

# Ressources pour ce cours

::left::

<div>

## [Titre de la colonne gauche]

[emoji] [Titre du lien](URL) - [Description de ce qu'on y trouve réellement]

</div>

::right::

<div>

## [Titre de la colonne droite]

[emoji] [Titre du lien](URL) - [Description de ce qu'on y trouve réellement]

</div>

<!--
Notes pour le présentateur sur comment utiliser ces ressources en cours.
-->
```

**Pas de `v-click`** — toutes les ressources visibles immédiatement.
**Positionnement** : immédiatement après la slide de couverture, avant le lexique.

### Règles de Pertinence

**Le titre doit refléter la source, pas la catégorie** :

| ❌ INTERDIT                    | ✅ CORRECT                               |
| ------------------------------ | ---------------------------------------- |
| `[Documentation](https://...)` | `[MDN Web Docs](https://...)`            |
| `[Tutoriel](https://...)`      | `[React Tutorial officiel](https://...)` |

**La description doit correspondre exactement au contenu de la page** :

| ❌ INTERDIT                | ✅ CORRECT                                              |
| -------------------------- | ------------------------------------------------------- |
| `- Guide Atlassian`        | `- Comment écrire et prioriser des User Stories`        |
| `- Documentation complète` | `- Référence officielle des commandes et configuration` |

**Équilibre** : 2-4 ressources par colonne (max 8 au total). Colonne gauche = références directes, droite = complémentaires.

### Checklist Ressources

- [ ] Layout `two-cols-header` utilisé
- [ ] Chaque titre de lien identifie clairement la source
- [ ] Chaque description correspond au contenu réel de la page liée
- [ ] Aucune ressource hors-sujet ou trop avancée pour un débutant
- [ ] 2 à 4 ressources par colonne (max 8 au total)
- [ ] Notes présentateur présentes si besoin

---

## Slide Lexique — Format et Qualité

### Format Obligatoire

```md
---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="TermeA" translation="(Traduction)" definition="Définition concise en une ligne" />

<TermCard term="TermeB" definition="Définition concise en une ligne" />

::right::

<TermCard term="TermeC" translation="(Traduction)" definition="Définition concise en une ligne" />

<!--
Notes présentateur : termes centraux à souligner, ordre de présentation recommandé.
-->
```

**Positionnement** : immédiatement après la slide de ressources, avant le premier chapitre.
**Pas de `v-click`** : tous les termes doivent être visibles dès l'ouverture.

### Règles sur les Termes

**Ordre alphabétique strict** (par terme anglais) — chaque colonne triée indépendamment, ensemble global alphabétique.

**Terme en anglais, traduction uniquement si pertinente** :

- `term` = toujours le terme **anglais**
- `translation` = uniquement si la traduction française apporte de la clarté et est différente du terme anglais

```md
✅ <TermCard term="Inheritance" translation="(Héritage)" definition="..." />
✅ <TermCard term="Abstraction" definition="..." /> ← même mot, pas de traduction
❌ <TermCard term="Module" translation="(Module)" definition="..." /> ← identique, inutile
```

**Définition : une ligne, 10-15 mots maximum** — répondre à "Qu'est-ce que c'est dans le contexte de ce cours ?"

**Équilibre des colonnes** : ±1 terme d'écart. Si > 14 termes, utiliser un scroll :

```md
<div class="h-[420px] overflow-y-auto pr-2">
  <TermCard ... />
</div>
```

Nombre idéal : **6 à 12 termes** au total (3-6 par colonne).

### Checklist Lexique

- [ ] Termes triés alphabétiquement (par terme anglais)
- [ ] `translation` présente uniquement si elle apporte de la clarté
- [ ] Chaque définition tient en une ligne (max 15 mots)
- [ ] Tous les termes sont utilisés dans le cours
- [ ] Aucun terme trop basique ou hors-sujet
- [ ] Colonnes équilibrées (±1 terme)
- [ ] Scroll activé si plus de 14 termes au total
- [ ] Notes présentateur indiquant les termes centraux à souligner
