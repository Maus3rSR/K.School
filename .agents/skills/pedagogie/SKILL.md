---
name: pedagogie
description: Guide d'ingénierie pédagogique K.School pour créer des cours et exercices destinés à des adultes en reconversion professionnelle. Invoquer quand on travaille sur les dossiers courses/ ou exercices/.
---

# Ingénierie Pédagogique - Public Débutant en Reconversion

## Public Cible

Adultes en reconversion professionnelle, débutants, apprentissage intensif avec objectif d'employabilité.

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

Chaque slide reprend le titre du chapitre en H1, suivi du concept spécifique :

```markdown
---
layout: cover
---

# Chapitre XX - Titre

---

# Titre du Chapitre

Concept spécifique
```

### Principes Clés

- **Une idée par slide** (max 3-5 points)
- **Vocabulaire accessible** : Définir chaque terme technique
- **Analogies concrètes** : Relier au quotidien
- **Pas de sauts conceptuels** : Éviter "évidemment", "simplement"
- **Transitions actives** : Tous les 3-5 concepts, terminer par une question ouverte plutôt qu'un récapitulatif verbatim des slides précédentes (voir skill `slides-kschool`)
- **Animations pédagogiques** : Révélation progressive (v-click)
- **Notes du présentateur** : Anecdotes, pièges, questions probables
- **Adresse directe** : Le contenu visible s'adresse au lecteur — pas de méta-référence au formateur ou aux apprenants (réservé aux notes `<!-- -->`)

### Architecture Type

1. Accroche (problème concret) → 2. Contexte → 3. Concept/Exemple/Application → 4. Synthèse → 5. Transition

### Slide de Lexique Technique (OBLIGATOIRE)

Chaque support de cours doit inclure une slide "Lexique" positionnée **immédiatement après la slide "Ressources pour ce cours"**, au début du cours.

> Règles complètes de format, sélection des termes et qualité du contenu : skill `slides-kschool`

## Règles Essentielles pour les Exercices

### Taxonomie de Bloom

Progresser du simple au complexe : Mémorisation → Compréhension → Application → Analyse → Évaluation → Création

### Zone Proximale de Développement

- **Ni trop facile, ni trop difficile**
- **Aide graduée** : 3 niveaux d'indices
- **Validation progressive** : Checkpoints

### Feedback

- Tests automatisés avec messages pédagogiques
- Célébration des réussites
- Expliquer le "pourquoi" des erreurs

## Checklist de Validation

### Slides

- [ ] Termes techniques définis
- [ ] Progression logique
- [ ] Exemples concrets variés
- [ ] Notes présentateur complètes

### Exercices

- [ ] Objectif clair
- [ ] Instructions étape par étape
- [ ] Indices à 3 niveaux
- [ ] Critères de réussite mesurables
- [ ] Temps estimé

## Langage Bienveillant

✅ "Essayons ensemble", "C'est normal", "Vous progressez"
❌ "C'est évident", "Tout le monde sait", "C'est simple"

## Application

**Objectif** : Donner confiance et compétence aux personnes en reconversion.
**Principe** : Privilégier TOUJOURS la simplicité et la clarté sur la sophistication technique.
