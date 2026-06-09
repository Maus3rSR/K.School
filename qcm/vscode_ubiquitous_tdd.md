# QCM — VS Code · Ubiquitous Language · TDD

## Quelle est la différence entre `Ctrl+P` et `Ctrl+Shift+P` ?
-[ ] `Ctrl+P` ouvre les paramètres, `Ctrl+Shift+P` ouvre un fichier
-[x] `Ctrl+P` ouvre Quick Open (fichiers), `Ctrl+Shift+P` ouvre la Palette de Commandes
-[ ] `Ctrl+P` ouvre la Palette de Commandes, `Ctrl+Shift+P` ouvre Quick Open (fichiers)
-[ ] Ils ouvrent la même chose avec des filtres différents
### Commentaire de correction
Ctrl+P = Quick Open (navigation fichiers), Ctrl+Shift+P = Palette de Commandes (accès universel aux fonctionnalités)

## Pourquoi `F2` (Rename Symbol) est-il préférable à Find & Replace pour renommer une variable ?
-[ ] F2 est plus rapide à exécuter car il utilise le cache
-[ ] F2 fonctionne dans un seul fichier, Find & Replace dans tout le projet
-[x] F2 comprend le contexte et ne renomme que le symbole, pas le texte (ex: `user` sans toucher à `username`)
-[ ] F2 permet de renommer plusieurs variables à la fois
### Commentaire de correction
F2 (Rename Symbol) est intelligent : il comprend le scope et ne renomme que la variable, pas les occurrences textuelles dans d'autres mots comme username

## Quel raccourci ouvre un aperçu inline de la définition d'une fonction SANS quitter le fichier courant ?
-[ ] `F12`
-[ ] `Ctrl+Clic`
-[x] `Alt+F12`
-[ ] `Ctrl+Shift+O`
### Commentaire de correction
Alt+F12 = Peek Definition (aperçu inline), F12 = aller à la définition (change de fichier)

## Selon le cours, qu'est-ce que le DDD place au centre de la conception ?
-[ ] Les patterns techniques (agrégats, bounded contexts)
-[ ] La performance du code
-[x] Le métier
-[ ] L'architecture logicielle
### Commentaire de correction
Domain-Driven Design = placer le métier au centre de la conception du logiciel

## Le code suivant est montré comme anti-pattern. Quel est le problème principal ?
```ts
function process(data: any[]): number {
  let res = 0
  for (const obj of data) { ... }
  return res
}
```
-[ ] Le code est trop long et devrait être découpé
-[ ] Le type `any` n'est pas typé
-[x] Les noms (`process`, `data`, `res`, `obj`) ne portent aucune intention métier
-[ ] La boucle `for...of` est inefficace
### Commentaire de correction
Les noms génériques (process, data, res, obj) cachent l'intention métier. Un expert métier ne comprendrait pas ce que fait ce code.

## Quel "test simple" du langage ubiquitaire est mentionné explicitement dans le cours ?
-[ ] Si le code compile sans erreur, le modèle est bon
-[ ] Si les tests unitaires passent, les noms sont corrects
-[x] Si un expert métier ne reconnaît pas les mots du code, le modèle est probablement mauvais
-[ ] Si le code fait moins de 50 lignes, le nommage est acceptable
### Commentaire de correction
Le test ubiquitaire : un expert métier doit reconnaître le vocabulaire utilisé dans le code.

## Selon Kent Beck (cité dans le cours), le TDD est :
-[ ] Une technique de test automatisé
-[ ] Une technique de debugging avancée
-[x] Une technique de conception
-[ ] Une technique d'optimisation de performance
### Commentaire de correction
Kent Beck : "TDD n'est pas une technique de test. C'est une technique de conception."

## Quelle est la différence fondamentale entre "écrire des tests APRÈS le code" et le TDD ?
-[ ] Le TDD utilise des frameworks de test, l'autre approche non
-[x] Les tests écrits après sont couplés à l'implémentation et fragiles ; le TDD teste le comportement
-[ ] Le TDD ne nécessite pas de refactoring
-[ ] Les tests écrits après couvrent plus de cas que le TDD
### Commentaire de correction
Test-after : tests couplés à l'implémentation. TDD : tests écrits avant = tests de comportement, plus durables.

## Dans la structure Arrange-Act-Assert, que doit contenir la partie "Act" ?
-[ ] La préparation des données d'entrée
-[ ] La vérification du résultat attendu
-[x] Un seul appel au code testé
-[ ] Plusieurs appels pour tester différents scénarios
### Commentaire de correction
Règle d'or : un test = une assertion principale. Act doit contenir un seul appel au code testé.

## Vous voulez dupliquer une ligne vers le bas. Quel raccourci utilisez-vous ?
-[ ] `Alt+↓`
-[x] `Shift+Alt+↓`
-[ ] `Ctrl+D`
-[ ] `Ctrl+Shift+D`
### Commentaire de correction
Shift+Alt+↓ = dupliquer vers le bas. Alt+↓ = déplacer la ligne.

## Vous avez sélectionné 3 occurrences du mot `item` avec `Ctrl+D`. Que se passe-t-il ensuite quand vous tapez `product` ? (choix multiples)
-[x] Les 3 occurrences sélectionnées sont remplacées par `product`
-[x] Chaque sélection a son propre curseur qui tape simultanément
-[ ] Seule la dernière occurrence sélectionnée est modifiée
-[ ] VS Code ouvre un dialogue de confirmation
### Commentaire de correction
Ctrl+D crée un curseur sur chaque occurrence sélectionnée. Taper 'product' modifie toutes les sélections simultanément.

## Quelles actions sont accessibles via Quick Fix (`Ctrl+.`)? (choix multiples)
-[x] Importer automatiquement un module manquant
-[x] Convertir en arrow function
-[ ] Ouvrir Quick Open pour chercher un fichier
-[x] Ajouter les types manquants
### Commentaire de correction
Quick Fix (Ctrl+.) propose des actions contextuelles : imports, conversions, ajout de types, etc.

## Dans un snippet personnalisé, que représentent `$1` et `$2` ?
-[ ] Des variables d'environnement système
-[ ] Les numéros de ligne où insérer le code
-[x] Les positions successives du curseur (navigation avec Tab)
-[ ] Les paramètres passés au snippet lors de son appel
### Commentaire de correction
$1, $2... = positions du curseur. Tab permet de naviguer entre ces positions dans le snippet.

## Quels noms de classes sont identifiés comme "signal d'alarme" dans le cours ? (choix multiples)
-[x] `DataManager`
-[x] `Helper`
-[ ] `DossierCandidat`
-[ ] `PlageHoraire`
### Commentaire de correction
Manager, Helper, Utils = noms fourre-tout qui cachent souvent un concept métier non identifié.

## Dans l'exercice de refactoring du panier, que représentait le nombre magique `0.8` dans le code original ?
-[ ] Un taux de TVA
-[ ] Un coefficient de marge
-[x] Le multiplicateur après une remise de 20% (`TAUX_REMISE`)
-[ ] Un seuil de prix minimum
### Commentaire de correction
0.8 = taux après remise de 20%. Nombre magique transformé en constante nommée TAUX_REMISE.

## Quelles transformations appartiennent à la "Passe 2" du refactoring (Regrouper) ? (choix multiples)
-[ ] Renommer `data` en `lignes`
-[x] Extraire `sousTotalLigne(ligne)` comme fonction
-[x] Transformer `0.8` en constante nommée `TAUX_REMISE`
-[ ] Remplacer la boucle `for` par `reduce`
### Commentaire de correction
Passe 2 = regrouper les concepts : extraire des fonctions, nommer les constantes. Passe 1 = renommer.

## Pourquoi le code de la démo FizzBuzz utilise-t-il volontairement des variables `r` et `n` peu expressives ?
-[ ] Par souci de performance
-[ ] Parce que les conventions TypeScript le recommandent
-[x] C'est intentionnel — ce "code sale" est le matériau de l'étape Refactor suivante
-[ ] C'est une erreur corrigée dans les slides suivantes
### Commentaire de correction
Le code 'sale' (n, r, duplication conceptuelle) est volontaire pour montrer le refactoring dans la section suivante.

## Lors du refactoring de FizzBuzz, `number % 3 === 0` est extrait dans une variable. Quel nom lui est donné et pourquoi ?
-[ ] `divisibleByThree` — parce qu'il décrit l'opération mathématique
-[x] `isFizz` — parce que la logique des conditions devient lisible ("if isFizz && isBuzz")
-[ ] `modulo3` — parce qu'il décrit l'implémentation technique
-[ ] `isMultipleOf3` — parce qu'il décrit le concept mathématique
### Commentaire de correction
isFizz nomme l'intention métier (condition Fizz) et rend la logique lisible : 'if isFizz && isBuzz'

## Quand est-il autorisé de refactorer dans le cycle TDD ? (choix multiples)
-[x] Seulement quand les tests sont verts
-[ ] Pendant l'étape RED, pour préparer le code
-[ ] Pendant l'étape GREEN, en même temps que l'implémentation
-[x] Un changement à la fois, en relançant les tests après chaque modification
### Commentaire de correction
Refactoring uniquement quand les tests sont verts, un changement à la fois. Jamais en RED ou pendant GREEN.

## Quelle est la différence entre un Stub et un Fake selon le lexique du cours ?
-[ ] Le Stub est une implémentation complète, le Fake est simplifié
-[x] Le Stub retourne une valeur fixe prédéfinie ; le Fake est une implémentation simplifiée mais fonctionnelle
-[ ] Ils sont synonymes, les deux termes sont interchangeables
-[ ] Le Fake ne fonctionne qu'en production, le Stub en test
### Commentaire de correction
Stub = valeur fixe. Fake = implémentation simplifiée mais fonctionnelle (ex: base de données en mémoire).

## Que signifie qu'un test TDD vérifie le "comportement" plutôt que l'"implémentation" ?
-[ ] Le test vérifie la vitesse d'exécution du code
-[ ] Le test accède aux variables internes de la fonction
-[x] Le test vérifie le résultat (`fizzbuzz(3) === "Fizz"`) et survit aux refactorings internes
-[ ] Le test ne peut être écrit qu'après l'implémentation
### Commentaire de correction
Test de comportement = vérifie le résultat, pas le 'comment'. Survit aux refactorings car l'assertion reste valide.

## Vous devez renommer la variable `user` dans un projet. Elle apparaît 30 fois, et le mot `username` apparaît 15 fois. Quelles approches sont SÛRES ? (choix multiples)
-[x] `F2` sur la variable `user` — ne touche pas à `username`
-[ ] `Ctrl+Shift+L` sur `user` — sélectionne toutes les occurrences du texte
-[ ] Find & Replace `user` → `customer` dans tout le projet
-[x] `Ctrl+D` répété pour sélectionner manuellement chaque occurrence voulue
### Commentaire de correction
F2 = intelligent, contexte sémantique. Ctrl+D = sélection manuelle progressive. Ctrl+Shift+L et Find & Replace = dangereux (toucherait username).

## Quelles affirmations sur `Ctrl+Shift+O` sont correctes ? (choix multiples)
-[x] Il liste toutes les fonctions, classes et variables du fichier actuel
-[ ] Il ouvre un fichier par son nom
-[x] Le "O" correspond à "Outline" (structure du fichier)
-[ ] Il remplace `Ctrl+P` pour la recherche de fichiers
### Commentaire de correction
Ctrl+Shift+O = Outline (structure du fichier courant). O = Outline. Ne remplace pas Ctrl+P (Quick Open).

## Pour extraire un bloc de 6 lignes en une fonction nommée, quelles étapes sont correctes ? (choix multiples)
-[x] Sélectionner le bloc puis `Ctrl+Shift+R`
-[x] VS Code détecte automatiquement les paramètres nécessaires
-[ ] Il faut d'abord créer la fonction manuellement puis couper-coller
-[x] Donner un nom explicite à la fonction extraite
### Commentaire de correction
Ctrl+Shift+R = menu refactoring. VS Code détecte les paramètres. Nom explicite obligatoire.

## Dans le code d'accroche du cours, quels éléments empêchent la compréhension ? (choix multiples)
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
-[x] `Handler` est un nom fourre-tout qui ne révèle rien du métier
-[x] `do`, `obj`, `opts`, `r`, `i`, `s`, `v` sont des noms sans intention
-[ ] Le `reduce` est un anti-pattern à remplacer par une boucle `for`
-[x] Aucun concept métier n'est identifiable sans lire l'implémentation
### Commentaire de correction
Handler, do, obj, opts, r, i, s, v = noms sans intention. Aucun concept métier visible. reduce n'est pas le problème.

## Quels principes du cours s'appliquent au renommage de fonctions ? (choix multiples)
-[x] Une fonction fait une action → son nom doit être un verbe du domaine métier
-[x] Si on n'arrive pas à nommer une fonction, c'est qu'elle fait peut-être trop de choses
-[ ] Un nom court est toujours préférable à un nom long
-[x] Si on change l'implémentation, le nom doit rester valable
### Commentaire de correction
Verbe métier, nom = intention (pourquoi), pas implémentation (comment). Nom court ≠ mieux.

## Dans la Passe 3 du refactoring du panier, la fonction `estRemisee(ligne)` est créée. Quelles affirmations sont correctes ? (choix multiples)
-[x] Elle exprime une règle du domaine métier
-[x] Le code se lit ensuite comme une phrase : "le total du panier = somme des sous-totaux"
-[ ] Elle change le comportement du programme (la remise passe de 20% à 30%)
-[x] Le comportement est strictement inchangé — seule la clarté est améliorée
### Commentaire de correction
estRemisee() = règle métier nommée. Le code raconte le métier. Comportement inchangé (refactoring).

## Pendant la démo FizzBuzz, l'implémentation évolue en 4 étapes GREEN. Quelles affirmations sont vraies ? (choix multiples)
-[x] Le cas FizzBuzz (divisible par 15) doit être testé AVANT les cas Fizz et Buzz dans l'implémentation
-[x] Chaque étape GREEN n'ajoute que la condition exigée par le nouveau test
-[ ] L'implémentation finale est écrite dès le premier test pour gagner du temps
-[x] La condition `n % 3 === 0 && n % 5 === 0` n'apparaît qu'au 4ème test (cas 15)
### Commentaire de correction
FizzBuzz (cas 15) avant les autres dans l'ordre des conditions. Chaque GREEN = code minimal. Condition 15 au 4ème test.

## Un test qui casse systématiquement après chaque refactoring indique que : (choix multiples)
-[x] Le test est couplé à l'implémentation, pas au comportement
-[ ] Le refactoring a introduit un bug
-[x] Le test a probablement été écrit après le code (test-after, pas TDD)
-[ ] Le test est trop simple et manque d'assertions
### Commentaire de correction
Test fragile = couplé à l'implémentation. Signe d'un test-after (écrit après le code) plutôt que TDD.

## Quelles conditions doivent être réunies pour que le refactoring soit "sûr" selon le cours ? (choix multiples)
-[x] Les tests sont tous verts AVANT de commencer
-[x] On ne change jamais le comportement externe du code
-[x] Si un test repasse au rouge, on annule immédiatement le changement
-[ ] On doit écrire de nouveaux tests spécifiques au refactoring prévu
### Commentaire de correction
Refactoring sûr : tests verts avant, comportement inchangé, annulation si rouge. Pas de nouveaux tests pour le refactoring.
