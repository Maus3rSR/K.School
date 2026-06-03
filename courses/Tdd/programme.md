# Programme TDD — Test Driven Development — 2 séances de 3h

## Résumé des séances

---

### **Séance 1 — Théorie & Pratique guidée (3h)**

> Budget temps : **180 min de contenu** + 20 min de pause = 3h20 au total

#### Bloc 0 — Contexte & Mindset (25 min)

- Pourquoi le code produit des régressions (le cycle coder → tester manuellement → oublier → casser)
- La différence fondamentale entre **écrire des tests** et **faire du TDD**
- TDD comme outil de **conception** autant que de vérification
- Présentation du mantra : **"Red. Green. Refactor."**

#### Bloc 1 — Le cycle Red-Green-Refactor (15 min)

- `RED` : écrire un test qui **échoue** — et pourquoi il *doit* échouer d'abord
- `GREEN` : écrire le **minimum absolu** de code pour faire passer le test
- `REFACTOR` : améliorer le code **en sécurité** grâce aux tests
- Notion de **baby steps** : avancer par petits pas intentionnels

> Le cycle est expliqué ici **sans démonstration** — les apprenants n'ont pas encore les outils pour lire du code de test.

#### Bloc 2 — Anatomie d'un test (15 min)

- Introduction à l'outillage : **Deno test** — syntaxe de base (`Deno.test`, `assertEquals`)
- Structure **AAA** : Arrange / Act / Assert
- Nommage expressif : `should_return_Fizz_when_divisible_by_3`
- Ce qu'est un **test unitaire** (périmètre, isolation, rapidité)

#### Démo live — FizzBuzz from scratch (20 min)

> Bloc 2 + Démo = **35 min** au total

- Démonstration du cycle RGR en temps réel sur **FizzBuzz** (4 cas complets : nombre, Fizz, Buzz, FizzBuzz)
- Le code produit est **volontairement peu expressif** (nommage pauvre, duplication) — pour alimenter le Bloc 3
- Les apprenants lisent et suivent, ils n'écrivent pas encore

> La démo est placée **après** l'Anatomie pour que les apprenants reconnaissent la structure AAA et la syntaxe Deno test dans le code montré.

#### Bloc 3 — Refactoring guidé par les tests (15 min)

- Le refactoring : **effet de bord positif** et naturel du TDD — pas une étape optionnelle
- Les tests comme **filet de sécurité** : on peut changer le code sans peur
- Techniques appliquées **sur le code FizzBuzz de la démo** :
  - **Renommer** pour exprimer l'intention (`n` → `number`, `r` → `result`)
  - **Extraire une fonction** pour isoler une responsabilité
  - **Éliminer la duplication** — la règle DRY révélée par les tests
- Règle d'or : refactorer uniquement quand les tests sont **verts**
- Ce qu'on évite : les tests couplés à l'implémentation (ils cassent au refactoring)

⏸️ **Pause — 20 min**

#### Bloc 4 — Katas en autonomie progressive (90 min)

Série de katas croissants, faits individuellement, corrigés collectivement après chaque kata :

| # | Kata | Durée | Objectif pédagogique |
|---|------|-------|----------------------|
| 1 | **Pig Latin** | 20 min | Premier kata autonome — 3 règles progressives, fun, cycle RGR ancré |
| 2 | **String Calculator** | 25 min | Baby steps, edge cases (chaîne vide, un seul nombre, séparateurs), tests d'erreur |
| 3 | **Roman Numerals** | 35 min | Décomposition d'un algo par accumulation de règles, refactoring naturel |
| Correction collective | 10 min | Revue du Roman Numerals — comparer les approches, identifier les refactorings |

> Chaque kata est lancé depuis `exercices/tdd/` avec `deno task <kata>`
>
> Les notions de **Stub** et **fixture** (test doubles) ne sont **pas introduites en séance 1** — elles apparaîtront organiquement en séance 2.

---

### **Séance 2 — TP : Micro-projet Le Pendu (3h)**

> Budget temps : **180 min de contenu** + 20 min de pause = 3h20 au total

#### Projet : **"Le Pendu"** — Implémenté en TDD pur

Un jeu du pendu, développé **entièrement guidé par les tests**.  
Pas d'I/O, pas de boucle de jeu : uniquement la **logique métier**, testable en isolation.

#### Progression guidée en 5 étapes (130 min)

| Étape | Durée | Fonctionnalité | Ce qu'on apprend |
|-------|-------|---------------|-----------------|
| **1** | 25 min | Représenter l'état initial | État testable : mot masqué (`_ _ _ _`), vies, lettres jouées. Le mot est injecté via un **Stub** — introduit ici dès le départ comme condition d'isolation |
| **2** | 20 min | Jouer une lettre correcte | Révéler les positions de la lettre dans le mot masqué |
| **3** | 20 min | Jouer une lettre incorrecte | Décrémenter les vies restantes |
| **4** | 25 min | Détecter victoire / défaite | Toutes lettres trouvées → gagné / plus de vies → perdu |
| **5** | 25 min | Lettres déjà jouées | Rejeter sans pénalité — occasion d'introduire une **fixture** pour factoriser le setup des tests |

> **À l'étape 1**, on nomme ce qu'on fait dès la mise en place :
> *"pour que nos tests ne dépendent pas d'un vrai dictionnaire, on injecte une fonction qui retourne toujours le même mot — c'est un **Stub**."*
>
> **À l'étape 5**, on nomme la seconde notion :
> *"ce jeu de données de test réutilisé dans plusieurs tests, c'est une **fixture**."*

⏸️ **Pause — 20 min**

#### Marge libre (45 min)

Au choix selon l'avancement du groupe :

- Gérer la **casse** (majuscules/minuscules) — nouveaux tests, puis refactoring guidé
- Refactoring collectif : identifier les **tests qui dupliquent** la logique métier et les nettoyer
- Ajouter une **catégorie de mots** injectable (animaux, villes…) — deuxième Stub, occasion de nommer le pattern
- Mini-démo : présenter son code à un autre apprenant et expliquer ses choix de tests

---

## Compétences acquises

À l'issue des 2 séances, l'apprenant sera capable de :

- ✅ Appliquer le cycle **Red → Green → Refactor** de manière autonome
- ✅ Écrire des tests **expressifs** avec la structure AAA
- ✅ Décomposer un problème en **baby steps** testables
- ✅ Utiliser les tests comme **filet de sécurité pour refactorer** en confiance
- ✅ Distinguer un test qui teste un **comportement** d'un test couplé à l'implémentation
- ✅ Utiliser **Deno test** pour exécuter une suite de tests TypeScript
- ✅ Écrire un **Stub** et une **fixture** à la main pour isoler une dépendance
- ✅ Développer un mini-projet complet guidé par les tests

---

## Structure des fichiers

```
courses/Tdd/
├── package.json
├── slides.md
├── programme.md
└── sections/
    ├── 00-ressources.md
    ├── 00-lexique.md
    ├── 00-introduction.md        ← Contexte & Mindset
    ├── 01-red-green-refactor.md  ← Le cycle RGR (concept)
    ├── 02-anatomie-test.md       ← AAA, nommage, Deno test + démo FizzBuzz
    ├── 03-refactoring.md         ← Refactoring sur le code FizzBuzz de la démo
    ├── 04-katas.md               ← Présentation des katas + instructions
    └── 05-conclusion.md

exercices/tdd/
├── deno.json
├── README.md
├── 01-pig-latin/          ← Kata 1 — warmup, 3 règles progressives
├── 02-string-calculator/  ← Kata 2 — edge cases, baby steps
├── 03-roman-numerals/     ← Kata 3 — décomposition par accumulation
└── 04-pendu/              ← TP — micro-projet, Stub & fixture en situation
```

---

## Notions clés par bloc

| Bloc | Notion introduite |
|------|-----------------|
| 0 — Mindset | TDD ≠ Testing, conception guidée par les tests |
| 1 — RGR | Red → Green → Refactor, baby steps (concept sans outil) |
| 2 — Anatomie + Démo | AAA, nommage expressif, Deno test — puis démo FizzBuzz live |
| 3 — Refactoring | Filet de sécurité, rename / extract / DRY, appliqué sur le FizzBuzz de la démo |
| 4 — Katas | Pig Latin → String Calculator → Roman Numerals, correction collective |
| TP étape 1 | **Stub** introduit dès le setup initial du Pendu |
| TP étape 5 | **Fixture** introduite pour factoriser le setup des tests |

---

## Budget temps récapitulatif

### Séance 1 (180 min contenu + 20 min pause = 3h20)

| Bloc | Durée |
|------|-------|
| 0 — Mindset | 25 min |
| 1 — RGR (concept) | 15 min |
| 2 — Anatomie + Démo FizzBuzz | 35 min |
| 3 — Refactoring | 15 min |
| 4 — Katas (Pig Latin / String Calc / Roman Numerals + correction) | 90 min |
| **Contenu total** | **180 min ✅** |
| ⏸️ Pause (hors contenu) | 20 min |
| **Total séance** | **200 min (3h20)** |

### Séance 2 (180 min contenu + 20 min pause = 3h20)

| Étape | Durée |
|-------|-------|
| 1 — État initial + Stub | 25 min |
| 2 — Lettre correcte | 20 min |
| 3 — Lettre incorrecte | 20 min |
| 4 — Victoire / Défaite | 25 min |
| 5 — Lettres déjà jouées + Fixture | 25 min |
| Marge libre | 45 min |
| **Contenu total** | **180 min ✅** |
| ⏸️ Pause (hors contenu) | 20 min |
| **Total séance** | **200 min (3h20)** |

---

## Prérequis apprenants

- Notions de base en TypeScript (types, fonctions, interfaces)
- Avoir un éditeur configuré (VS Code recommandé)
- [Deno](https://deno.land/) installé (`deno --version`)
