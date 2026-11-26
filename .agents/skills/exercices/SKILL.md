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
- Le code d'interface hors notion est **fourni**, voir « Niveau d'aide selon le statut de la notion »

### Niveau d'aide selon le statut de la notion

L'apprenant pratique le **framework**, pas l'écriture d'interface. L'aide d'une consigne dépend de la place de la notion dans le cours :

| Statut | Exemples (Laravel) | Ce que donne la consigne |
|---|---|---|
| **Notion centrale** : cœur du chapitre, montrée en démo | `validate()`, `@error` / `old()`, `Route::resource`, Form Request | La spécification ; l'apprenant écrit le code ; indices gradués dans des `<details>` |
| **Notion secondaire ou peu vue** : une ligne de slide, une note orale, un détail de démo | Injection de dépendances, `sync()`, `pluck()`, champ caché d'une case à cocher, `Rule::unique()->ignore()` | Le **code complet** dans un bloc, suivi d'une explication en citation (voir ci-dessous) |
| **Hors cours** : HTML, classes CSS, mise en page | Wrappers, cartes, tableaux, boutons, alertes | Le HTML **complet et déjà designé**, à coller tel quel |

- **Interface fournie, langage du framework écrit** : le HTML est donné avec toutes ses classes ; l'apprenant tape lui-même ce qui relève du framework (directives et expressions Blade, `@csrf`, `old()`, `@error`, boucles, `route()`…), même s'il le répète sur plusieurs champs : c'est cette répétition qui ancre la notion
- **DaisyUI d'abord** : composants et classes DaisyUI (`card`, `fieldset`, `input`, `select`, `btn`, `alert`, `table`…), Tailwind seulement pour ce que DaisyUI ne couvre pas (espacements, grilles, largeurs)
- Dans le HTML fourni, les emplacements à compléter sont des valeurs neutres (`href="#"`, `action="#"`, une seule `<option>` d'exemple) et la liste numérotée qui suit le bloc dit quoi y mettre
- **Signature complète et imports** : dès qu'une méthode change, la consigne donne sa signature complète et les **imports** (`use …;`) à ajouter en haut du fichier
- **Jamais un verbe de jargon seul** (« injectez », « bindez », « pluckez ») : le terme est suivi du code exact qu'il désigne

### Vocabulaire technique

Plus l'apprenant lit les termes, mieux il les intègre :

- Les **termes et notions des slides** (lexique, `<KeyTerm>`, `<Definition>`) sont repris **en gras** dans les consignes, avec le terme exact des slides : **injection de dépendances**, **import**, **assignation de masse**, **route model binding**…
- Un terme technique est nommé précisément à chaque fois : « ajoutez l'**import** `use Illuminate\Http\Request;` », jamais « ajoutez `use …` en haut »
- Une méthode ou une fonction peu vue (ex. `pluck()`, `in_array()`, `Arr::except()`) est expliquée à sa première apparition : ce qu'elle reçoit, ce qu'elle renvoie, sur l'exemple de l'exercice

### Explications : en citation, après la consigne

La consigne dit **quoi faire**, l'explication dit **pourquoi** ; elles ne se mélangent pas :

- Explication d'une notion : citation `> 💡 **Terme** : …` placée juste après l'action qu'elle éclaire
- Piège ou erreur fréquente : citation `> ⚠️ …`
- Vérification : citation `> ✅ **Vérification** : …`
- Une citation = une idée, en deux ou trois lignes au plus ; au-delà, renvoyer à la slide ou à la Partie C

### Mise en forme des consignes

Le README se lit pendant que l'apprenant code, souvent dans une fenêtre étroite : chaque étape doit se lire d'un coup d'œil.

- **Une étape = un titre court** (`#### A1.4 · Enregistrer le jeu`), pas un paragraphe qui commence par plusieurs mots en gras
- **Le fichier touché sur sa propre ligne**, au début de l'étape : 📄 suivi du chemin en code (ex. 📄 `routes/web.php`)
- **Plusieurs actions → liste numérotée**, une action par ligne ; jamais une phrase qui enchaîne les « puis »
- **Code à taper dans un bloc** (` ```php `, ` ```blade `, ` ```bash `) dès qu'il dépasse un appel court ; le code dans la phrase reste réservé aux noms (méthode, route, champ)
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
- [ ] Niveau d'aide adapté : notions secondaires données en code complet + explication en citation, HTML/DaisyUI fourni, Blade et PHP du framework écrits par l'apprenant
- [ ] Termes des slides en gras, signatures complètes et **imports** nommés, aucun verbe de jargon sans son code
- [ ] Ordre des étapes = ordre des chapitres du cours
- [ ] Points de contrôle avec palier de rattrapage (sans tag Git dans ce dépôt)
- [ ] Critères de réussite mesurables
- [ ] Charge indiquée (socle / attendu / bonus), socle faisable par un apprenant lent
- [ ] Testé et fonctionnel
- [ ] Fichiers de code sans consignes intégrées
