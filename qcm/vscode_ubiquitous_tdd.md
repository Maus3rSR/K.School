# QCM — VS Code · Ubiquitous Language · TDD

**Durée : 60 minutes · 30 questions · 4 options chacune · Seuil : 21/30**

---

## NIVEAU 1 — FONDAMENTAUX (Questions 1-9) — Réponse unique

---

**Q1 [VS Code]** — Quelle est la différence entre `Ctrl+P` et `Ctrl+Shift+P` ?

- [ ] `Ctrl+P` ouvre les paramètres, `Ctrl+Shift+P` ouvre un fichier
- [x] `Ctrl+P` ouvre Quick Open (fichiers), `Ctrl+Shift+P` ouvre la Palette de Commandes
- [ ] `Ctrl+P` ouvre la Palette de Commandes, `Ctrl+Shift+P` ouvre Quick Open (fichiers)
- [ ] Ils ouvrent la même chose avec des filtres différents

---

**Q2 [VS Code]** — Pourquoi `F2` (Rename Symbol) est-il préférable à Find & Replace pour renommer une variable ?

- [ ] F2 est plus rapide à exécuter car il utilise le cache
- [ ] F2 fonctionne dans un seul fichier, Find & Replace dans tout le projet
- [x] F2 comprend le contexte et ne renomme que le symbole, pas le texte (ex: `user` sans toucher à `username`)
- [ ] F2 permet de renommer plusieurs variables à la fois

---

**Q3 [VS Code]** — Quel raccourci ouvre un aperçu inline de la définition d'une fonction SANS quitter le fichier courant ?

- [ ] `F12`
- [ ] `Ctrl+Clic`
- [x] `Alt+F12`
- [ ] `Ctrl+Shift+O`

---

**Q4 [Ubiquitous Language]** — Selon le cours, qu'est-ce que le DDD place au centre de la conception ?

- [ ] Les patterns techniques (agrégats, bounded contexts)
- [ ] La performance du code
- [x] Le métier
- [ ] L'architecture logicielle

---

**Q5 [Ubiquitous Language]** — Le code suivant est montré comme anti-pattern. Quel est le problème principal identifié dans le cours ?
```ts
function process(data: any[]): number {
  let res = 0
  for (const obj of data) { ... }
  return res
}
```

- [ ] Le code est trop long et devrait être découpé
- [ ] Le type `any` n'est pas typé
- [x] Les noms (`process`, `data`, `res`, `obj`) ne portent aucune intention métier
- [ ] La boucle `for...of` est inefficace

---

**Q6 [Ubiquitous Language]** — Quel "test simple" du langage ubiquitaire est mentionné explicitement dans le cours ?

- [ ] Si le code compile sans erreur, le modèle est bon
- [ ] Si les tests unitaires passent, les noms sont corrects
- [x] Si un expert métier ne reconnaît pas les mots du code, le modèle est probablement mauvais
- [ ] Si le code fait moins de 50 lignes, le nommage est acceptable

---

**Q7 [TDD]** — Selon Kent Beck (cité dans le cours), le TDD est :

- [ ] Une technique de test automatisé
- [ ] Une technique de debugging avancée
- [x] Une technique de conception
- [ ] Une technique d'optimisation de performance

---

**Q8 [TDD]** — Quelle est la différence fondamentale entre "écrire des tests APRÈS le code" et le TDD ?

- [ ] Le TDD utilise des frameworks de test, l'autre approche non
- [x] Les tests écrits après sont couplés à l'implémentation et fragiles ; le TDD teste le comportement
- [ ] Le TDD ne nécessite pas de refactoring
- [ ] Les tests écrits après couvrent plus de cas que le TDD

---

**Q9 [TDD]** — Dans la structure Arrange-Act-Assert, que doit contenir la partie "Act" ?

- [ ] La préparation des données d'entrée
- [ ] La vérification du résultat attendu
- [x] Un seul appel au code testé
- [ ] Plusieurs appels pour tester différents scénarios

---

## NIVEAU 2 — APPLICATION (Questions 10-21) — Mix unique/multiple

---

**Q10 [VS Code]** — Vous voulez dupliquer une ligne vers le bas. Quel raccourci utilisez-vous ?

- [ ] `Alt+↓`
- [x] `Shift+Alt+↓`
- [ ] `Ctrl+D`
- [ ] `Ctrl+Shift+D`

---

**Q11 [VS Code]** — Vous avez sélectionné 3 occurrences du mot `item` avec `Ctrl+D`. Que se passe-t-il ensuite quand vous tapez `product` ? (Plusieurs réponses)

- [x] Les 3 occurrences sélectionnées sont remplacées par `product`
- [x] Chaque sélection a son propre curseur qui tape simultanément
- [ ] Seule la dernière occurrence sélectionnée est modifiée
- [ ] VS Code ouvre un dialogue de confirmation

---

**Q12 [VS Code]** — Quelles actions sont accessibles via Quick Fix (`Ctrl+.`) ? (Plusieurs réponses)

- [x] Importer automatiquement un module manquant
- [x] Convertir en arrow function
- [ ] Ouvrir Quick Open pour chercher un fichier
- [x] Ajouter les types manquants

---

**Q13 [VS Code]** — Dans un snippet personnalisé, que représentent `$1` et `$2` ?

- [ ] Des variables d'environnement système
- [ ] Les numéros de ligne où insérer le code
- [x] Les positions successives du curseur (navigation avec Tab)
- [ ] Les paramètres passés au snippet lors de son appel

---

**Q14 [Ubiquitous Language]** — Quels noms de classes sont identifiés comme "signal d'alarme" dans le cours ? (Plusieurs réponses)

- [x] `DataManager`
- [x] `Helper`
- [ ] `DossierCandidat`
- [ ] `PlageHoraire`

---

**Q15 [Ubiquitous Language]** — Dans l'exercice de refactoring du panier, que représentait le nombre magique `0.8` dans le code original ?

- [ ] Un taux de TVA
- [ ] Un coefficient de marge
- [x] Le multiplicateur après une remise de 20% (`TAUX_REMISE`)
- [ ] Un seuil de prix minimum

---

**Q16 [Ubiquitous Language]** — Quelles transformations appartiennent à la "Passe 2" du refactoring (Regrouper) ? (Plusieurs réponses)

- [ ] Renommer `data` en `lignes`
- [x] Extraire `sousTotalLigne(ligne)` comme fonction
- [x] Transformer `0.8` en constante nommée `TAUX_REMISE`
- [ ] Remplacer la boucle `for` par `reduce`

---

**Q17 [TDD]** — Pourquoi le code de la démo FizzBuzz utilise-t-il volontairement des variables `r` et `n` peu expressives ?

- [ ] Par souci de performance
- [ ] Parce que les conventions TypeScript le recommandent
- [x] C'est intentionnel — ce "code sale" est le matériau de l'étape Refactor suivante
- [ ] C'est une erreur corrigée dans les slides suivantes

---

**Q18 [TDD]** — Lors du refactoring de FizzBuzz, `number % 3 === 0` est extrait dans une variable. Quel nom lui est donné et pourquoi ?

- [ ] `divisibleByThree` — parce qu'il décrit l'opération mathématique
- [x] `isFizz` — parce que la logique des conditions devient lisible ("if isFizz && isBuzz")
- [ ] `modulo3` — parce qu'il décrit l'implémentation technique
- [ ] `isMultipleOf3` — parce qu'il décrit le concept mathématique

---

**Q19 [TDD]** — Quand est-il autorisé de refactorer dans le cycle TDD ? (Plusieurs réponses)

- [x] Seulement quand les tests sont verts
- [ ] Pendant l'étape RED, pour préparer le code
- [ ] Pendant l'étape GREEN, en même temps que l'implémentation
- [x] Un changement à la fois, en relançant les tests après chaque modification

---

**Q20 [TDD]** — Quelle est la différence entre un Stub et un Fake selon le lexique du cours ?

- [ ] Le Stub est une implémentation complète, le Fake est simplifié
- [x] Le Stub retourne une valeur fixe prédéfinie ; le Fake est une implémentation simplifiée mais fonctionnelle
- [ ] Ils sont synonymes, les deux termes sont interchangeables
- [ ] Le Fake ne fonctionne qu'en production, le Stub en test

---

**Q21 [TDD]** — Que signifie qu'un test TDD vérifie le "comportement" plutôt que l'"implémentation" ?

- [ ] Le test vérifie la vitesse d'exécution du code
- [ ] Le test accède aux variables internes de la fonction
- [x] Le test vérifie le résultat (`fizzbuzz(3) === "Fizz"`) et survit aux refactorings internes
- [ ] Le test ne peut être écrit qu'après l'implémentation

---

## NIVEAU 3 — ANALYSE (Questions 22-30) — Réponses multiples

---

**Q22 [VS Code]** — Vous devez renommer la variable `user` dans un projet. Elle apparaît 30 fois, et le mot `username` apparaît 15 fois. Quelles approches sont SÛRES ? (Plusieurs réponses)

- [x] `F2` sur la variable `user` — ne touche pas à `username`
- [ ] `Ctrl+Shift+L` sur `user` — sélectionne toutes les occurrences du texte
- [ ] Find & Replace `user` → `customer` dans tout le projet
- [x] `Ctrl+D` répété pour sélectionner manuellement chaque occurrence voulue

---

**Q23 [VS Code]** — Quelles affirmations sur `Ctrl+Shift+O` sont correctes ? (Plusieurs réponses)

- [x] Il liste toutes les fonctions, classes et variables du fichier actuel
- [ ] Il ouvre un fichier par son nom
- [x] Le "O" correspond à "Outline" (structure du fichier)
- [ ] Il remplace `Ctrl+P` pour la recherche de fichiers

---

**Q24 [VS Code]** — Pour extraire un bloc de 6 lignes en une fonction nommée, quelles étapes sont correctes ? (Plusieurs réponses)

- [x] Sélectionner le bloc puis `Ctrl+Shift+R`
- [x] VS Code détecte automatiquement les paramètres nécessaires
- [ ] Il faut d'abord créer la fonction manuellement puis couper-coller
- [x] Donner un nom explicite à la fonction extraite

---

**Q25 [Ubiquitous Language]** — Dans le code d'accroche du cours, quels éléments empêchent la compréhension ?
```ts
class Handler {
  do(obj: any, opts: any): number {
    const r: number[] = []
    obj.items.forEach((i: any) => {
      if (i.ok && opts.run) r.push(i.val * opts.n)
    })
    return r.reduce((s, v) => s + v, 0)
  }
}
```
(Plusieurs réponses)

- [x] `Handler` est un nom fourre-tout qui ne révèle rien du métier
- [x] `do`, `obj`, `opts`, `r`, `i`, `s`, `v` sont des noms sans intention
- [ ] Le `reduce` est un anti-pattern à remplacer par une boucle `for`
- [x] Aucun concept métier n'est identifiable sans lire l'implémentation

---

**Q26 [Ubiquitous Language]** — Quels principes du cours s'appliquent au renommage de fonctions ? (Plusieurs réponses)

- [x] Une fonction fait une action → son nom doit être un verbe du domaine métier
- [x] Si on n'arrive pas à nommer une fonction, c'est qu'elle fait peut-être trop de choses
- [ ] Un nom court est toujours préférable à un nom long
- [x] Si on change l'implémentation, le nom doit rester valable

---

**Q27 [Ubiquitous Language]** — Dans la Passe 3 du refactoring du panier, la fonction `estRemisee(ligne)` est créée. Quelles affirmations sont correctes ? (Plusieurs réponses)

- [x] Elle exprime une règle du domaine métier
- [x] Le code se lit ensuite comme une phrase : "le total du panier = somme des sous-totaux"
- [ ] Elle change le comportement du programme (la remise passe de 20% à 30%)
- [x] Le comportement est strictement inchangé — seule la clarté est améliorée

---

**Q28 [TDD]** — Pendant la démo FizzBuzz, l'implémentation évolue en 4 étapes GREEN. Quelles affirmations sont vraies ? (Plusieurs réponses)

- [x] Le cas FizzBuzz (divisible par 15) doit être testé AVANT les cas Fizz et Buzz dans l'implémentation
- [x] Chaque étape GREEN n'ajoute que la condition exigée par le nouveau test
- [ ] L'implémentation finale est écrite dès le premier test pour gagner du temps
- [x] La condition `n % 3 === 0 && n % 5 === 0` n'apparaît qu'au 4ème test (cas 15)

---

**Q29 [TDD]** — Un test qui casse systématiquement après chaque refactoring indique que : (Plusieurs réponses)

- [x] Le test est couplé à l'implémentation, pas au comportement
- [ ] Le refactoring a introduit un bug
- [x] Le test a probablement été écrit après le code (test-after, pas TDD)
- [ ] Le test est trop simple et manque d'assertions

---

**Q30 [TDD]** — Quelles conditions doivent être réunies pour que le refactoring soit "sûr" selon le cours ? (Plusieurs réponses)

- [x] Les tests sont tous verts AVANT de commencer
- [x] On ne change jamais le comportement externe du code
- [x] Si un test repasse au rouge, on annule immédiatement le changement
- [ ] On doit écrire de nouveaux tests spécifiques au refactoring prévu

---

## BARÈME

| Score | Note /20 | Appréciation |
|-------|----------|--------------|
| 27-30 | 18-20 | Maîtrise complète |
| 24-26 | 16-17.5 | Maîtrise satisfaisante |
| 21-23 | 14-15.5 | Seuil atteint |
| <21 | <14 | Révision nécessaire |

**Calcul** : `Note = (Points / 30) × 20`, arrondi au demi-point supérieur.

---

## CORRIGÉ (pour le formateur)

| Q | Type | Réponses | Thème |
|---|------|----------|-------|
| 1 | Unique | B | VS Code |
| 2 | Unique | C | VS Code |
| 3 | Unique | C | VS Code |
| 4 | Unique | C | Ubiquitous Language |
| 5 | Unique | C | Ubiquitous Language |
| 6 | Unique | C | Ubiquitous Language |
| 7 | Unique | C | TDD |
| 8 | Unique | B | TDD |
| 9 | Unique | C | TDD |
| 10 | Unique | B | VS Code |
| 11 | Multiple | A, B | VS Code |
| 12 | Multiple | A, B, D | VS Code |
| 13 | Unique | C | VS Code |
| 14 | Multiple | A, B | Ubiquitous Language |
| 15 | Unique | C | Ubiquitous Language |
| 16 | Multiple | B, C | Ubiquitous Language |
| 17 | Unique | C | TDD |
| 18 | Unique | B | TDD |
| 19 | Multiple | A, D | TDD |
| 20 | Unique | B | TDD |
| 21 | Unique | C | TDD |
| 22 | Multiple | A, D | VS Code |
| 23 | Multiple | A, C | VS Code |
| 24 | Multiple | A, B, D | VS Code |
| 25 | Multiple | A, B, D | Ubiquitous Language |
| 26 | Multiple | A, B, D | Ubiquitous Language |
| 27 | Multiple | A, B, D | Ubiquitous Language |
| 28 | Multiple | A, B, D | TDD |
| 29 | Multiple | A, C | TDD |
| 30 | Multiple | A, B, C | TDD |
