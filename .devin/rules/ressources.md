---
trigger: model_decision
description: When creating or editing the resources slide (00-ressources.md) in any course
---

# Règles de Qualité — Slide de Ressources

## Format Obligatoire

La slide de ressources utilise **toujours** le layout `two-cols-header` avec deux colonnes équilibrées.

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

**Pas de `v-click`** : les ressources doivent être toutes visibles immédiatement.

**Positionnement** : immédiatement après la slide de couverture, avant le lexique.

---

## Règles de Pertinence du Contenu

### 1. Le titre doit refléter la source, pas la catégorie

| ❌ INTERDIT — titre générique | ✅ CORRECT — titre = nom de la source |
|-------------------------------|---------------------------------------|
| `[Documentation](https://...)` | `[MDN Web Docs](https://...)` |
| `[Tutoriel](https://...)` | `[React Tutorial officiel](https://...)` |
| `[Cheat Sheet](https://...)` | `[Git Reference Card (git-scm.com)](https://...)` |
| `[Lien utile](https://...)` | `[Refactoring Guru — Design Patterns](https://...)` |

**Règle** : Le titre du lien doit permettre à l'apprenant d'identifier la source **sans cliquer**.

### 2. La description doit correspondre exactement au contenu de la page

- Vérifier que la description décrit ce qu'on trouve **sur cette page précise**, pas ce que le site fait en général
- Si un lien pointe vers une page générale alors qu'une page spécifique existe, utiliser la page spécifique

| ❌ INTERDIT — description vague ou inexacte | ✅ CORRECT — description précise |
|---------------------------------------------|----------------------------------|
| `- Guide Atlassian` | `- Comment écrire et prioriser des User Stories` |
| `- Patterns de conception orientée objet` si le lien est `/design-patterns` | `- Catalogue illustré des 23 patterns du GoF` |
| `- Documentation complète` | `- Référence officielle des commandes et configuration` |

### 3. Chaque ressource doit être pertinente pour le niveau débutant

- **Éviter** les ressources trop avancées, trop générales, ou hors-sujet direct du cours
- **Éviter** les liens vers des landscapes ou écosystèmes complets si le cours couvre un outil précis
- **Préférer** des ressources que l'apprenant peut consulter **pendant ou juste après** la formation

| ❌ Hors niveau / hors sujet | ✅ Pertinent |
|-----------------------------|-------------|
| CNCF Landscape pour un cours Docker débutant | Docker Desktop — installation et premiers pas |
| Livre avancé GoF Wikipedia pour un cours intro patterns | Refactoring Guru — explication illustrée de chaque pattern |

### 4. Équilibre entre les colonnes

- **Colonne gauche** : ressources de référence directe (documentation officielle, guide principal du sujet)
- **Colonne droite** : ressources complémentaires (outils pratiques, tutoriels, lectures approfondies)
- Nombre de liens : **2-4 par colonne**, max 8 au total

---

## Anti-patterns Fréquents (INTERDIT)

### Titres génériques
```md
❌ 📚 [Documentation](https://git-scm.com/book/fr/v2)
✅ 📚 [Pro Git — livre officiel](https://git-scm.com/book/fr/v2) - Référence complète de Git, en français
```

### URL sans rapport avec le titre affiché
```md
❌ 🔗 [Refactoring Guru - OOP](https://refactoring.guru/fr/design-patterns)
   → Le lien pointe sur les Design Patterns, pas sur la POO
✅ 🔗 [Refactoring Guru — Intro POO](https://refactoring.guru/fr/design-patterns/what-is-a-pattern)
   → Ou trouver une URL qui correspond vraiment à la POO
```

### Ressource inaccessible ou trop avancée
```md
❌ 📘 [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/...)
   → Vérifier que l'URL est valide et que le contenu est accessible sans compte
```

### Layout incorrect
```md
❌ layout: center  (ne permet pas deux colonnes, perd la structure)
✅ layout: two-cols-header
```

---

## Checklist avant de valider une slide de ressources

- [ ] Layout `two-cols-header` utilisé
- [ ] Chaque titre de lien identifie clairement la source (nom du site ou de la ressource)
- [ ] Chaque description correspond au contenu réel de la page liée
- [ ] Aucune ressource hors-sujet ou trop avancée pour un débutant
- [ ] 2 à 4 ressources par colonne (max 8 au total)
- [ ] Colonne gauche = références directes / Colonne droite = complémentaires
- [ ] Notes présentateur présentes si besoin d'orienter l'usage des ressources
