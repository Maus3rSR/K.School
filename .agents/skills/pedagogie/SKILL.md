---
name: pedagogie
description: Guide d'ingénierie pédagogique K.School pour créer des cours et exercices destinés à un public débutant sur le sujet (reconversion professionnelle, étudiants BUT…). Invoquer quand on travaille sur les dossiers courses/ ou exercices/.
---

# Ingénierie Pédagogique - Public Débutant sur le Sujet

## Public Cible

Débutants **sur le sujet du cours** : adultes en reconversion, étudiants de BUT, etc. Le niveau, les prérequis et le format de séance sont **déclarés par chaque cours** dans son `programme.md` (section « Format de séance »).

**Avant de créer ou modifier du contenu** : lire le `programme.md` du cours (et son `AGENTS.md` s'il existe). Les règles de ce skill sont communes à tous les cours ; les durées et les spécificités vivent dans le cours.

## Séquencement et Rythme (OBLIGATOIRE)

- **Une notion se traite complète** : accroche → démo (livecoding) → micro-pratique « à vous ». La séance est une suite de ces cycles, pas un bloc théorie suivi d'un bloc pratique.
- **Un seul ordre** : ordre des slides = ordre de construction du livecoding = ordre des étapes du TP. Aucune slide ni étape de TP ne dépend d'une notion qui arrive plus tard.
- **La douleur avant la solution** : chaque abstraction arrive **après** le problème qu'elle résout (ex. écrire 7 routes à la main avant `Route::resource`, provoquer l'erreur avant d'introduire la protection).
- **Budget de densité** : peu de notions nouvelles par séance (3-4), et **un seul « aperçu »** (notion montrée sans être pratiquée) au maximum.
  - Une slide `<Panorama>` est une référence : elle ne compte ni comme « aperçu » ni comme nouvelle notion (voir skill `slides`).
- **Schéma animé obligatoire** pour tout concept de flux ou de relation (requête, cycle de vie, clé étrangère, table pivot…) : Mermaid, `v-click`, `magic-move`.
- **Un moment léger par chapitre** dans les notes du présentateur : erreur volontaire, running gag du fil rouge, anecdote.
- **Pas de durée fixe dans les skills** : le rythme se décrit en cycles. Les durées vivent dans le cours (`duration` des chapitres, `programme.md`).

### Marge

- Le contenu planifié **ne remplit jamais toute la séance** : garder **au moins 10 %** de marge (démarrage en retard, libération anticipée, souci technique, explication plus longue).
- Les aléas de pratique se gèrent par des **paliers de rattrapage** (état de référence à récupérer à chaque point de contrôle), pas par du temps supplémentaire.
- Les apprenants vont **2 à 3 fois moins vite** que la démo : dimensionner la pratique en séance sur cette hypothèse.

## Règles Essentielles pour les Slides

### Terminologie — Qui parle dans les slides ?

Les slides sont lus à la fois par le formateur (support de présentation) ET par les apprenants (support de cours).

**Règle stricte :**

- **Dans le contenu visible des slides** → s'adresser directement aux apprenants à la 2e personne : "vous", "observez", "demandez de l'aide"
- **Dans les notes du présentateur** (`<!-- -->`) → "formateur" et "apprenants" sont autorisés
- **Dans les documents internes** (planning, programme.md…) → pas de restriction

❌ Références au formateur ou aux apprenants en tant que tiers dans le contenu visible
✅ Texte qui a du sens lu seul, sans savoir qui est en train de présenter

### Organisation par Chapitres (OBLIGATOIRE)

Chaque chapitre s'ouvre par une slide `layout: chapter` (addon `@k.school/slidev-addon-ui`). Le rappel « Chapitre XX · Titre » est ensuite **affiché automatiquement en pied de page** de toutes les slides du chapitre : le H1 de chaque slide est donc **directement le concept**, sans répéter le titre du chapitre.

```markdown
---
layout: chapter
number: 3
duration: 30 min
transition: slide-up
---

# Titre du chapitre

- Objectif 1
- Objectif 2

---

# Concept spécifique
```

❌ Ancienne convention (ne plus l'utiliser) : H1 = titre du chapitre + sous-titre = concept.

### Principes Clés

- **Une idée par slide** (max 3-5 points)
- **Vocabulaire accessible** : Définir chaque terme technique
- **Analogies concrètes** : Relier au quotidien
- **Pas de sauts conceptuels** : Éviter "évidemment", "simplement"
- **Pas de question de transition** entre chapitres : la transition se fait à l'oral (notes du présentateur), pas via une slide dédiée
- **Quiz = pré-test** : un `<Quiz>` s'utilise pour faire réfléchir à un concept **avant** de l'introduire (prédiction, intuition), pas pour vérifier ce qui vient d'être vu en fin de chapitre. Règles détaillées : skill `slides` (`references/composants.md`)
- **Animations pédagogiques** : Révélation progressive (v-click)
- **Notes du présentateur** : Anecdotes, pièges, questions probables
- **Adresse directe** : Le contenu visible s'adresse au lecteur — pas de méta-référence au formateur ou aux apprenants (réservé aux notes `<!-- -->`)

### Architecture Type

1. Accroche (problème concret) → 2. Contexte → 3. Concept/Exemple/Application → 4. Synthèse → 5. Transition

### Slide de Lexique Technique (OBLIGATOIRE)

Chaque support de cours doit inclure une slide "Lexique" positionnée **immédiatement après la slide "Ressources pour ce cours"**, au début du cours.

> Règles complètes de format, sélection des termes et qualité du contenu : skill `slides`

## Règles Essentielles pour les Exercices

### Taxonomie de Bloom

Progresser du simple au complexe : Mémorisation → Compréhension → Application → Analyse → Évaluation → Création

### Zone Proximale de Développement

- **Ni trop facile, ni trop difficile**
- **Aide graduée** : 3 niveaux d'indices
- **Validation progressive** : Checkpoints

### Diversité des Sujets Pratiques (OBLIGATOIRE)

**Interdit** : Réutiliser à l'identique (même domaine métier, mêmes noms de variables/entités, même endpoint) le sujet d'un exemple déjà démontré dans les slides précédentes pour un exercice (guidé ou autonome).

> ❌ Mauvais : les slides démontrent le pattern complet sur `PostList` / `/posts`, puis l'exercice guidé qui suit fait recopier EXACTEMENT le même code sur le même sujet `PostList` / `/posts` — l'apprenant recopie sans réappliquer le raisonnement.

**Raison** : Un exercice doit vérifier que l'apprenant sait **transposer** un pattern à une situation nouvelle (Application dans la taxonomie de Bloom), pas simplement le recopier. Réutiliser le même sujet transforme l'exercice en copie passive.

**Règle** : Chaque exercice (guidé ou autonome) d'un même chapitre doit porter sur une **entité/un domaine différent** de ceux déjà utilisés dans les slides de démonstration et dans les exercices précédents du même chapitre (ex : si les slides démontrent avec `posts`, l'exercice guidé peut utiliser `todos`, l'exercice autonome `users` — jamais deux fois le même).

**Diagnostic** : Avant de finaliser un exercice, vérifier que son sujet (nom d'entité, endpoint, domaine métier) n'apparaît dans aucune slide de démonstration ni exercice précédent du même chapitre. Le **pattern technique** peut être identique (structure du code), mais le **sujet** doit changer.

### Feedback

- Tests automatisés avec messages pédagogiques
- Célébration des réussites
- Expliquer le "pourquoi" des erreurs

## Checklist de Validation

### Slides

- [ ] Termes techniques définis
- [ ] Progression logique
- [ ] Ordre slides = ordre du livecoding = ordre du TP, aucune dépendance vers une notion future
- [ ] Chaque abstraction suit le problème qu'elle résout
- [ ] Schéma animé pour chaque flux ou relation, un moment léger par chapitre (notes)
- [ ] Marge ≥ 10 % sur la séance
- [ ] Exemples concrets variés
- [ ] Notes présentateur complètes

### Exercices

- [ ] Objectif clair
- [ ] Instructions étape par étape
- [ ] Indices à 3 niveaux
- [ ] Critères de réussite mesurables
- [ ] Charge indiquée (socle / attendu / bonus), socle faisable par un apprenant lent
- [ ] Sujet différent des slides de démonstration et des exercices précédents du même chapitre

## Langage Bienveillant

✅ "Essayons ensemble", "C'est normal", "Vous progressez"
❌ "C'est évident", "Tout le monde sait", "C'est simple"

## Application

**Objectif** : Donner confiance et compétence à des personnes qui débutent sur le sujet.
**Principe** : Privilégier TOUJOURS la simplicité et la clarté sur la sophistication technique.
