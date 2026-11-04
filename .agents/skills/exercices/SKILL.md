---
name: exercices
description: Règles de structure et de contenu pour créer des exercices K.School dans le dossier exercices/. Invoquer quand on travaille sur le dossier exercices/ ou qu'on crée/modifie un exercice de cours.
---

# Règles pour les Exercices K.School

## Emplacement des Exercices

**OBLIGATOIRE** : Tous les exercices doivent être placés dans le dossier `exercices/` à la racine du projet, **jamais** dans les dossiers de cours (`courses/`).

### Structure Monorepo

Chaque cours a son propre package dans `exercices/<cours>/` :

```
exercices/
├── vscode/                   # Package exercices VS Code
│   ├── 01-navigation/        # Exercice numéroté
│   │   ├── README.md         # Instructions de l'exercice
│   │   └── ...               # Fichiers de l'exercice
│   ├── 02-refactoring/
│   ├── package.json          # Package du cours
│   ├── tsconfig.json         # Config TypeScript (si applicable)
│   └── README.md             # Documentation du package
├── git/
│   ├── init_multiverse.sh
│   └── package.json
└── typescript/
    └── ...
```

**Important** : Le `package.json` est au niveau du cours (`exercices/<cours>/package.json`), pas dans `exercices/`.

### Convention de nommage

- **Dossier cours** : Nom du cours en lowercase kebab-case (ex: `vscode`, `git`, `typescript`)
- **Dossier exercice** : Préfixe numéroté `XX-` suivi du nom en kebab-case (ex: `01-navigation`, `02-refactoring`)
- **README.md** : Obligatoire dans chaque exercice

---

## Contenu des Fichiers d'Exercice

**OBLIGATOIRE** : Les fichiers de code des exercices ne doivent **jamais** contenir :

- Les consignes ou instructions de l'exercice (déjà dans le README.md)
- Les commentaires mentionnant le nom de l'exercice
- Les blocs d'instructions étape par étape

**Autorisé** : Les commentaires de documentation du code (JSDoc, descriptions de fonctions/classes) qui seraient présents dans du code de production.

**Raison** : L'apprenant doit consulter le README.md pour les instructions. Les fichiers de code doivent ressembler à du code réel de production.

---

## Structure d'un Exercice

Chaque exercice doit contenir un `README.md` avec :

- Objectif
- Prérequis (chapitres du cours nécessaires)
- Charge (voir ci-dessous)
- Instructions étape par étape
- Critères de réussite

> Avant d'écrire un exercice, lire le `programme.md` du cours (section « Format de séance ») et son `AGENTS.md` s'il existe : structure des parties, budget de travail personnel et mode de rattrapage y sont définis.

### Charge plutôt que « temps estimé »

Une durée affichée devient une promesse que l'apprenant lent ne tient pas. Indiquer à la place :

- La **charge en trois niveaux** : **socle** (en séance, obligatoire), **attendu** (travail personnel), **bonus** (facultatif)
- Un **socle faisable par un apprenant lent** : les estimations du concepteur supposent un rythme rapide ; compter 2 à 3 fois plus pour un apprenant
- Si un ordre de grandeur est donné, il est **indicatif** et le README le dit explicitement

### Règles de rédaction des étapes

- **Étape 0 — contrôle d'environnement** : une commande ou une page à ouvrir qui prouve que l'environnement fonctionne avant de commencer
- **Une action vérifiable par étape** : consigne courte, résultat observable (page, commande, sortie attendue)
- **Partie en séance découpée en micro-étapes** alignées sur les chapitres du cours, dans le même ordre ; chaque étape indique le chapitre qui l'enseigne (dépendance explicite, jamais vers un chapitre futur)
- **Point de contrôle** à la fin de chaque groupe d'étapes, avec son **palier de rattrapage** : l'état de référence défini par le cours (ex. tag d'un dépôt de démonstration). Ne jamais créer de tag Git dans ce dépôt pour un rattrapage
- **Jamais de première installation lourde en séance** (téléchargement d'images, d'outils) : elle se fait avant, ou se lance tôt en arrière-plan
- Une copie manuelle répétitive (fichiers à recopier un par un) se remplace par un script fourni (voir « Scripts dans package.json »)

---

## Scripts dans package.json

**Uniquement quand le script fait un vrai travail** : génération de fichiers, démarrage d'un environnement, tests automatisés. Un script qui ne fait qu'afficher le chemin du README (echo) n'apporte rien — la slide renvoie directement au fichier README.

Quand ils existent, chaque package de cours a ses propres scripts dans `exercices/<cours>/package.json` :

```json
{
  "name": "@k.school/exercices-<cours>",
  "scripts": {
    "XX-<nom-exercice>": "commande pour lancer l'exercice"
  }
}
```

**Convention** : Le nom du script correspond au nom du dossier de l'exercice.

**Exemples** :

- `exercices/vscode/package.json` → `"01-navigation"`, `"02-refactoring"`
- `exercices/git/package.json` → `"01-multiverse"`
- `exercices/typescript/package.json` → `"01-types"`

---

## Types d'Exercices

| Type       | Description                                 |
| ---------- | ------------------------------------------- |
| **IDE**    | Manipulation directe dans l'éditeur         |
| **Script** | Génération d'environnement via script shell |
| **Code**   | Complétion de code avec tests automatisés   |

---

## Lien avec les Slides

**Ne pas inclure les exercices dans les slides**. Utiliser une slide d'exercice (`<Exercise>`) qui indique **comment l'exercice est distribué**, selon le contexte :

- README dans le dépôt : `exercices/<cours>/<XX-nom>/README.md`
- un dépôt à cloner
- une archive ou un lien LMS (Moodle) fourni par le formateur
- `pnpm <exercice>` **uniquement** quand le script fait réellement quelque chose (génère des fichiers, démarre un environnement) — jamais pour un script qui ne fait qu'afficher le chemin du README

---

## Checklist de Validation

Avant de publier un exercice :

- [ ] Placé dans `exercices/<cours>/<XX-nom>/`
- [ ] README.md avec structure complète (objectif, prérequis, charge, instructions, critères)
- [ ] Script ajouté dans `exercices/<cours>/package.json` (uniquement s'il fait un vrai travail : génération, environnement, tests)
- [ ] Étape 0 de contrôle d'environnement
- [ ] Instructions claires, une action vérifiable par étape, chapitre source indiqué
- [ ] Ordre des étapes = ordre des chapitres du cours
- [ ] Points de contrôle avec palier de rattrapage (sans tag Git dans ce dépôt)
- [ ] Critères de réussite mesurables
- [ ] Charge indiquée (socle / attendu / bonus), socle faisable par un apprenant lent
- [ ] Testé et fonctionnel
- [ ] Fichiers de code sans consignes intégrées
