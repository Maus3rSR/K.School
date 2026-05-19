---
trigger: model_decision
description: When working into exercices folder
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
├── git/                      # Package exercices Git
│   ├── init_multiverse.sh
│   └── package.json
└── typescript/               # Package exercices TypeScript
    └── ...
```

**Important** : Le `package.json` est au niveau du cours (`exercices/<cours>/package.json`), pas dans `exercices/`.

### Convention de nommage

- **Dossier cours** : Nom du cours en lowercase kebab-case (ex: `vscode`, `git`, `typescript`)
- **Dossier exercice** : Préfixe numéroté `XX-` suivi du nom en kebab-case (ex: `01-navigation`, `02-refactoring`)
- **README.md** : Obligatoire dans chaque exercice

## Contenu des Fichiers d'Exercice

**OBLIGATOIRE** : Les fichiers de code des exercices ne doivent **jamais** contenir :
- Les consignes ou instructions de l'exercice (déjà dans le README.md)
- Les commentaires mentionnant le nom de l'exercice
- Les blocs d'instructions étape par étape

**Autorisé** : Les commentaires de documentation du code (JSDoc, descriptions de fonctions/classes) qui seraient présents dans du code de production.

**Raison** : L'apprenant doit consulter le README.md pour les instructions. Les fichiers de code doivent ressembler à du code réel de production.

## Structure d'un Exercice

Chaque exercice doit contenir un `README.md` avec : Objectif, Prérequis, Instructions étape par étape, Critères de réussite, Temps estimé.

## Scripts dans package.json

Chaque package de cours a ses propres scripts dans `exercices/<cours>/package.json` :

```json
{
  "name": "@k.school/exercices-<cours>",
  "scripts": {
    "XX-<nom-exercice>": "commande pour lancer l'exercice"
  }
}
```

**Convention** : Le nom du script correspond au nom du dossier de l'exercice (ex: `01-navigation`, `02-refactoring`).

**Exemples** :
- `exercices/vscode/package.json` → `"01-navigation"`, `"02-refactoring"`
- `exercices/git/package.json` → `"01-multiverse"`
- `exercices/typescript/package.json` → `"01-types"`

## Types d'Exercices

**IDE** : Manipulation directe | **Script** : Génération d'environnement | **Code** : Complétion avec tests automatisés

## Lien avec les Slides

**Ne pas inclure les exercices dans les slides**. Utiliser une slide de transition avec la commande `pnpm <exercice>` et référence au README.md.

## Checklist de Validation

Avant de publier un exercice :

- [ ] Placé dans `exercices/<cours>/<XX-nom>/`
- [ ] README.md avec structure complète
- [ ] Script ajouté dans `exercices/<cours>/package.json`
- [ ] Instructions claires et étape par étape
- [ ] Critères de réussite mesurables
- [ ] Temps estimé indiqué
- [ ] Testé et fonctionnel

