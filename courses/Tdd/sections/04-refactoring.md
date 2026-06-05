---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Refactoring

<!--
Durée : 15 minutes
S'appuie directement sur le code FizzBuzz produit pendant la démo de la section 02.
Le code de départ est intentionnellement "sale" — nommage pauvre, duplication conceptuelle.
Objectif : montrer que les tests rendent le refactoring sûr et immédiat.
-->

---
layout: default
---

# Refactoring

La troisième étape qui change tout

<div v-click>

- Le refactoring = améliorer la **structure** du code sans changer son **comportement**
- Ce n'est pas une étape optionnelle — c'est le moment où le code devient lisible
- Condition sine qua non : les tests sont **verts** avant de commencer
- Si les tests repassent verts après le refactoring → rien n'a été cassé

</div>

<div v-click>

**Pourquoi c'est un effet de bord positif du TDD**

- Sans tests : refactorer = craindre de casser
- Avec tests : refactorer = modifier librement, les tests valident immédiatement

</div>

<!--
C'est exactement ce qui distingue le TDD du simple "écrire des tests après".
Un test écrit après le code est souvent couplé à l'implémentation — il casserait au moindre refactoring.
Un test TDD vérifie le comportement : il reste stable même quand l'implémentation change complètement.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Refactoring

Notre FizzBuzz — ce qui peut être amélioré

::left::

```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}
```

::right::

<div v-click>

- `n` → que représente ce paramètre ? Intention cachée

</div>

<div v-click>

- `r` dans les tests → même problème

</div>

<div v-click>

- `n % 3 === 0` apparaît 2 fois → duplication conceptuelle

</div>

<div v-click>

- `n % 5 === 0` apparaît 2 fois → même problème

</div>

<!--
Ces problèmes sont mineurs ici, mais à l'échelle d'une vraie codebase, ils s'accumulent.
Un nom ambigu lu 50 fois par jour coûte cher en charge cognitive.
La duplication conceptuelle est plus sournoise que la duplication de code : si la règle "divisible par 3" change, il faut se souvenir de la modifier à deux endroits.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Refactoring

Renommer pour exprimer l'intention

::left::

````md magic-move
```ts
// Avant
export function fizzbuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}

// Dans les tests
const r = fizzbuzz(3)
assertEquals(r, "Fizz")
```

```ts
// Après
export function fizzbuzz(number: number): string {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz"
  if (number % 3 === 0) return "Fizz"
  if (number % 5 === 0) return "Buzz"
  return String(number)
}

// Dans les tests
const result = fizzbuzz(3)
assertEquals(result, "Fizz")
```
````

::right::

<div v-click>

- Règle : le nom d'une variable doit dire **ce qu'elle représente**, pas son type
- `n` → `number` : on sait que c'est le nombre à tester
- `r` → `result` : on sait que c'est le résultat de fizzbuzz
- Les tests **restent verts** — le comportement n'a pas changé

</div>

<!--
Le renommage est le refactoring le plus fréquent et le plus sûr — le faire sans hésiter.
Dans un vrai IDE, c'est un raccourci clavier. En TDD, on relance les tests juste après pour confirmer.
Insister : les tests n'ont pas bougé d'une ligne côté assertions — seule la variable intermédiaire a été renommée.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Refactoring

Éliminer la duplication avec des variables intermédiaires

::left::

````md magic-move
```ts
// Étape 1 — après renommage
export function fizzbuzz(number: number): string {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz"
  if (number % 3 === 0) return "Fizz"
  if (number % 5 === 0) return "Buzz"
  return String(number)
}
```

```ts
// Étape 2 — extraction des variables booléennes
export function fizzbuzz(number: number): string {
  const isFizz = number % 3 === 0
  const isBuzz = number % 5 === 0
  if (isFizz && isBuzz) return "FizzBuzz"
  if (isFizz) return "Fizz"
  if (isBuzz) return "Buzz"
  return String(number)
}
```
````

::right::

<div v-click>

- `number % 3 === 0` apparaissait 2 fois → extrait dans `isFizz`
- `number % 5 === 0` apparaissait 2 fois → extrait dans `isBuzz`
- La logique des conditions est maintenant **lisible en français** : `if (isFizz && isBuzz)`
- Les 4 tests **restent verts** — comportement inchangé

</div>

<!--
C'est la règle DRY (Don't Repeat Yourself) — chaque concept exprimé une seule fois.
L'intérêt ne se limite pas à la lisibilité : si la règle "divisible par 3" évolue, on ne modifie qu'une seule ligne.
Montrer que les 4 tests sont toujours verts après chaque étape — c'est le point clé de cette démonstration.
-->

---
layout: default
---

# Refactoring

Quand et comment refactorer en TDD

<div v-click>

- **Seulement quand les tests sont verts** — jamais en RED ou pendant GREEN
- **Un changement à la fois** — renommer, puis relancer les tests, puis extraire
- **Ne pas changer le comportement** — si un test passe au rouge, annuler le changement
- **S'arrêter quand le code est lisible** — pas de sur-engineering

</div>

<div v-click>

**Ce qu'on évite**

- Tester l'implémentation interne (les tests casseraient à chaque refactoring)
- Les tests vérifient le **comportement** (`fizzbuzz(3) === "Fizz"`) — pas comment c'est implémenté

</div>

<!--
Montrer que les 4 tests de FizzBuzz n'ont pas changé d'une ligne pendant tout le refactoring — c'est la preuve qu'ils testent le comportement, pas l'implémentation.
C'est ce qui les rend durables : ils survivront à tous les futurs refactorings.
Rappeler : un test qui casse à chaque refactoring est un test qui teste l'implémentation, pas le comportement — il a été mal écrit.
-->

---
layout: center
class: text-center
---

# Refactoring
&nbsp;

> 💬 "Dans votre code au quotidien, qu'est-ce qui vous empêche de refactorer librement ?"

<!--
Réponses attendues : peur de casser, manque de tests, pression du temps, code incompréhensible sans auteur disponible.
Toutes ces réponses pointent vers le même manque : un filet de sécurité.
Enchaîner : "C'est exactement ce que les katas vont vous faire pratiquer — refactorer avec confiance parce que les tests sont là."
-->
