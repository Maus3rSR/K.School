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
- Le code hors notion (interface, configuration, données…) est **fourni**, voir « Niveau d'aide selon le statut de la notion »

### Niveau d'aide selon le statut de la notion

L'apprenant pratique **la notion du cours** (un framework, une librairie, un outil, un langage, une méthode), pas ce qui l'entoure. L'aide d'une consigne dépend de la place de la notion dans le cours.

Ces règles valent pour tous les cours. Les règles marquées « quand… » ne s'appliquent que si l'exercice a l'élément concerné (une interface, des maquettes, une démo). Les choix propres à un cours (librairie de composants, maquettes à réutiliser, unité de factorisation) vont dans son `exercices/<cours>/AGENTS.md`, pas dans ce skill.

| Statut | Ce que donne la consigne |
|---|---|
| **Notion centrale** : cœur du chapitre, montrée en démo ou en slide détaillée | La spécification ; l'apprenant écrit le code ; indices gradués dans des `<details>` |
| **Notion secondaire ou peu vue** : une ligne de slide, une note orale, un détail de démo, un prérequis d'un autre cours | Le **code complet** dans un bloc, suivi d'une explication en citation (voir ci-dessous) |
| **Hors cours** : le code d'à-côté, d'une autre techno que celle enseignée (HTML et CSS dans un cours back-end, config d'outillage, données de test…) | Le code **complet et prêt à l'emploi**, à coller tel quel |

Exemples selon le cours :

| Cours | Centrale | Secondaire | Hors cours |
|---|---|---|---|
| Framework back (Laravel) | `validate()`, `Route::resource` | Injection de dépendances, `pluck()`, `sync()` | HTML et classes CSS des vues |
| Librairie front (React) | `useState`, props | `useEffect` avec dépendances, `key` d'une liste | Styles, données JSON de départ |
| Langage (TypeScript) | Génériques, types union | Option du `tsconfig.json`, méthode de la lib standard | Tests fournis, données de départ |
| Pratique (TDD) | Cycle rouge / vert / refactor | Assertion ou option du runner de tests | Squelette du kata, configuration du runner |
| Outil (Git, Docker, VS Code) | `rebase`, `Dockerfile`, raccourci étudié | Option rarement vue, syntaxe d'un fichier de config | Script qui prépare le dépôt ou l'environnement |
| Méthode sans code (User stories, Ubiquitous language) | Rédiger une user story, nommer un concept | Format d'un critère d'acceptation | Contexte métier, gabarit de document |

Pour un exercice sans code, « écrire le code » devient « produire le livrable » (texte, glossaire, schéma) : la notion centrale se rédige, le gabarit est fourni.

- **Code d'à-côté fourni, code de la notion écrit** : l'apprenant tape lui-même tout ce qui relève de la techno enseignée, même s'il le répète plusieurs fois (c'est cette répétition qui ancre la notion) ; le reste est donné, même s'il est dans un autre langage
- **Quand l'exercice a une interface** et que l'UI n'est pas la notion : le HTML est fourni complet et déjà mis en forme avec la librairie de composants du cours (nommée dans l'`AGENTS.md` du cours)
- **Quand le projet a déjà des maquettes, un template ou des composants** : réutiliser l'existant avant de fournir du neuf. La consigne désigne le bloc à reprendre (fichier, et classe ou nom du composant) et ne fournit que ce qui manque. Exemple : une maquette HTML statique n'a ni `<form>`, ni `name`, ni bouton d'envoi ; la consigne ajoute seulement ces éléments au bloc existant
- **Suggérer la factorisation, sans l'imposer** : quand un même bloc revient (deux listes qui affichent la même carte, deux tests qui préparent les mêmes données, deux fonctions qui partagent un calcul), une citation `> 💡 **Suggestion** :` propose de l'extraire dans l'unité réutilisable du cours (partial de template, composant, fonction, *helper* de test…), avec le code d'appel. C'est facultatif : la vérification de l'étape ne dépend pas de la suggestion
- Dans le code fourni, les emplacements à compléter sont des valeurs neutres (`href="#"`, `TODO`, une chaîne vide, un seul élément d'exemple dans une liste) et la liste numérotée qui suit le bloc dit quoi y mettre
- **Signature complète et imports** : dès qu'une fonction ou une méthode change, la consigne donne sa signature complète et les **imports** à ajouter, dans la syntaxe du langage (`import { … } from '…';` en JS/TS, `use …;` en PHP…)
- **Jamais un verbe de jargon seul** (« injectez », « mémoïsez », « rebasez ») : le terme est suivi du code ou de la commande exacte qu'il désigne
- **Quand le cours a une démo** : la spécification d'une notion centrale ne recopie pas le code de la démo transposé à l'exercice ; si le cours définit un pacte démo / pratique, il prime

### Vocabulaire technique

Plus l'apprenant lit les termes, mieux il les intègre :

- Les **termes et notions des slides** (lexique, `<KeyTerm>`, `<Definition>`) sont repris **en gras** dans les consignes, avec le terme exact des slides
- Un terme technique est nommé précisément à chaque fois : « ajoutez l'**import** `import { assertEquals } from "jsr:@std/assert"` », jamais « ajoutez la ligne en haut »
- Une fonction, une méthode ou une option peu vue est expliquée à sa première apparition : ce qu'elle reçoit, ce qu'elle renvoie, sur l'exemple de l'exercice

### Explications : en citation, après la consigne

La consigne dit **quoi faire**, l'explication dit **pourquoi** ; elles ne se mélangent pas :

- Explication d'une notion : citation `> 💡 **Terme** : …` placée juste après l'action qu'elle éclaire
- Piège ou erreur fréquente : citation `> ⚠️ …`
- Vérification : citation `> ✅ **Vérification** : …`
- Une citation = une idée, en deux ou trois lignes au plus ; au-delà, renvoyer à la slide ou à une partie d'approfondissement

### Mise en forme des consignes

Le README se lit pendant que l'apprenant code, souvent dans une fenêtre étroite : chaque étape doit se lire d'un coup d'œil.

- **Une étape = un titre court** (`#### A1.4 · Enregistrer le jeu`, `#### 2.3 · Faire passer le test`), pas un paragraphe qui commence par plusieurs mots en gras
- **Le fichier touché sur sa propre ligne**, au début de l'étape : 📄 suivi du chemin en code (ex. 📄 `src/converter.ts`)
- **Plusieurs actions → liste numérotée**, une action par ligne ; jamais une phrase qui enchaîne les « puis »
- **Code à taper dans un bloc** avec son langage (` ```ts `, ` ```php `, ` ```bash `…) dès qu'il dépasse un appel court ; le code dans la phrase reste réservé aux noms (méthode, route, champ)
- **Spécification avant aide** : le tableau des champs ou des règles vient avant le squelette ou l'indice
- **Vérification en encadré** : `> ✅ **Vérification** : …`, pour qu'elle se distingue des actions
- **Lignes courtes** : une ligne qui dépasse ≈ 200 caractères est à découper en liste

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
- [ ] Mise en forme des consignes respectée (titre par étape, fichier en tête, actions numérotées, code en bloc, vérification encadrée)
- [ ] Niveau d'aide adapté : notions secondaires données en code complet + explication en citation, code d'à-côté (UI, config…) fourni, code de la notion écrit par l'apprenant
- [ ] Termes des slides en gras, signatures complètes et **imports** nommés, aucun verbe de jargon sans son code
- [ ] Ordre des étapes = ordre des chapitres du cours
- [ ] Points de contrôle avec palier de rattrapage (sans tag Git dans ce dépôt)
- [ ] Critères de réussite mesurables
- [ ] Charge indiquée (socle / attendu / bonus), socle faisable par un apprenant lent
- [ ] Testé et fonctionnel
- [ ] Fichiers de code sans consignes intégrées
