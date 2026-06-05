---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Anatomie d'un test

<!--
Durée : 35 min — 15 min anatomie + 20 min démo FizzBuzz live
Partie 1 (slides 2-4) : les apprenants lisent et suivent — pas de code à écrire
Partie 2 (slides 5-10) : démo formateur en direct — les apprenants observent uniquement
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Deno.test — la syntaxe de base

::left::

```ts {1|3|4|5|all}
import { assertEquals } from "jsr:@std/assert"

Deno.test("should return 1 when given 1", () => {
  const result = fizzbuzz(1)
  assertEquals(result, "1")
})
```

::right::

<div v-click>

`import { assertEquals }` — l'assertion qui compare résultat et attendu

</div>

<div v-click class="mt-4">

`Deno.test("nom du test", () => {...})` — déclarer un test nommé

</div>

<div v-click class="mt-4">

`fizzbuzz(1)` — appeler le code à tester (Act)

</div>

<div v-click class="mt-4">

`assertEquals(result, "1")` — vérifier le résultat (Assert)

</div>

<!--
Montrer la commande `deno test` dans le terminal pour lancer les tests.
Insister sur le fait que chaque ligne a un rôle précis — ce n'est pas du code "ordinaire".
Le highlighting progressif suit la lecture naturelle du test de haut en bas.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Arrange — Act — Assert

::left::

```ts {1-3|5-6|8-9|all}
Deno.test("should return Fizz when divisible by 3", () => {
  // Arrange — préparer les données
  const input = 3

  // Act — appeler le code testé
  const result = fizzbuzz(input)

  // Assert — vérifier le résultat
  assertEquals(result, "Fizz")
})
```

::right::

<div v-click>

**Arrange** : Préparer l'état initial et les données d'entrée

</div>

<div v-click class="mt-4">

**Act** : Appeler une seule fois le code testé

</div>

<div v-click class="mt-4">

**Assert** : Vérifier une seule chose — le résultat attendu

</div>

<div v-click class="mt-6">

Règle d'or : **un test = une assertion principale**

</div>

<!--
AAA est une convention universelle, pas spécifique à Deno — on la retrouve dans tous les langages et frameworks de test.
Le highlighting suit les trois blocs AAA pour les relier visuellement aux définitions à droite.
Insister : "Act" ne doit être appelé qu'une seule fois par test.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Le nom d'un test est sa documentation

::left::

**Mauvais nommage**

```ts
Deno.test("test1", ...)
Deno.test("fizzbuzz test", ...)
Deno.test("works", ...)
```

<div v-click class="mt-6">

**Bon nommage**

```ts
Deno.test("should return Fizz when divisible by 3", ...)
Deno.test("should return Buzz when divisible by 5", ...)
Deno.test("should return FizzBuzz when divisible by 15", ...)
```

</div>

::right::

<div v-click>

Un bon nom de test répond à :

- **Quoi** : quel comportement est testé
- **Quand** : dans quelle condition
- **Attendu** : quel résultat

</div>

<div v-click class="mt-6">

Quand un test échoue, le nom dit exactement ce qui est cassé — sans lire le code.

</div>

<!--
Le nommage est la documentation vivante de l'intention — un test qui échoue avec un bon nom est un message clair pour toute l'équipe.
Poser la question : "Si vous voyez 'test1 FAILED' dans le terminal, que faites-vous ?" — contre-exemple immédiat.
La convention "should ... when ..." (ou "given/when/then") est une bonne habitude à ancrer dès le départ.
-->

---
layout: default
---

# Anatomie d'un test

Démo live — FizzBuzz en TDD

<div class="mt-4">

**Règles FizzBuzz**

</div>

<v-clicks>

- Nombre quelconque → retourner le nombre en string
- Divisible par 3 → retourner `"Fizz"`
- Divisible par 5 → retourner `"Buzz"`
- Divisible par 15 → retourner `"FizzBuzz"`

</v-clicks>

<div v-click class="mt-6">

Le formateur va coder les 4 cas en TDD, un par un.

Les apprenants **observent** — ils ne codent pas encore.

</div>

<!--
Ouvrir l'éditeur, créer fizzbuzz.ts et fizzbuzz.test.ts vides côte à côte.
Mentionner explicitement : "Je vais volontairement nommer les variables de façon minimaliste — `n` pour le paramètre, `r` pour le résultat. Ce n'est pas un oubli : le refactoring sera le sujet du prochain bloc."
Lancer `deno test --watch` dans le terminal pour que les apprenants voient le rouge/vert en temps réel.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Démo — Cas 1 : nombre normal

::left::

**Test (RED)**

````md magic-move
```ts
import { assertEquals } from "jsr:@std/assert"

Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})
```
````

::right::

**Implémentation (GREEN)**

````md magic-move
```ts
// fizzbuzz.ts — vide
```

```ts
export function fizzbuzz(n: number): string {
  return String(n)
}
```
````

<!--
Écrire d'abord le test — observer l'erreur de compilation (fizzbuzz n'existe pas).
Créer ensuite l'implémentation minimale.
Insister : "L'implémentation est triviale — c'est voulu. On ne code que ce que le test demande."
Faire voir le terminal passer au vert.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Démo — Cas 2 : Fizz

::left::

**Test ajouté (RED)**

````md magic-move
```ts
import { assertEquals } from "jsr:@std/assert"

Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})
```

```ts
import { assertEquals } from "jsr:@std/assert"

Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})

Deno.test("should return Fizz when given 3", () => {
  const r = fizzbuzz(3)
  assertEquals(r, "Fizz")
})
```
````

::right::

**Implémentation mise à jour (GREEN)**

````md magic-move
```ts
export function fizzbuzz(n: number): string {
  return String(n)
}
```

```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0) return "Fizz"
  return String(n)
}
```
````

<!--
Écrire le nouveau test — le terminal repasse au rouge.
Ajouter uniquement la condition manquante dans l'implémentation.
Rappeler : "On ne touche qu'à ce que le test exige — pas d'anticipation."
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Démo — Cas 3 : Buzz

::left::

**Test ajouté (RED)**

````md magic-move
```ts
Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})

Deno.test("should return Fizz when given 3", () => {
  const r = fizzbuzz(3)
  assertEquals(r, "Fizz")
})
```

```ts
Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})

Deno.test("should return Fizz when given 3", () => {
  const r = fizzbuzz(3)
  assertEquals(r, "Fizz")
})

Deno.test("should return Buzz when given 5", () => {
  const r = fizzbuzz(5)
  assertEquals(r, "Buzz")
})
```
````

::right::

**Implémentation mise à jour (GREEN)**

````md magic-move
```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0) return "Fizz"
  return String(n)
}
```

```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}
```
````

<!--
Même rythme : test rouge → implémentation minimale → vert.
Faire remarquer que le pattern se répète — c'est la cadence TDD.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un test

Démo — Cas 4 : FizzBuzz

::left::

**Test ajouté (RED)**

````md magic-move
```ts
Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})

Deno.test("should return Fizz when given 3", () => {
  const r = fizzbuzz(3)
  assertEquals(r, "Fizz")
})

Deno.test("should return Buzz when given 5", () => {
  const r = fizzbuzz(5)
  assertEquals(r, "Buzz")
})
```

```ts
Deno.test("should return 1 when given 1", () => {
  const r = fizzbuzz(1)
  assertEquals(r, "1")
})

Deno.test("should return Fizz when given 3", () => {
  const r = fizzbuzz(3)
  assertEquals(r, "Fizz")
})

Deno.test("should return Buzz when given 5", () => {
  const r = fizzbuzz(5)
  assertEquals(r, "Buzz")
})

Deno.test("should return FizzBuzz when given 15", () => {
  const r = fizzbuzz(15)
  assertEquals(r, "FizzBuzz")
})
```
````

::right::

**Implémentation finale (GREEN)**

````md magic-move
```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}
```

```ts
export function fizzbuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}
```
````

<!--
IMPORTANT — Code intentionnellement peu expressif :
- La variable `r` dans les tests est peu expressive (que veut-elle dire ?)
- Le paramètre `n` est minimaliste
- La condition `n % 3 === 0` apparaît deux fois conceptuellement (dans le test 15 et dans la branche Fizz)
- Ce "code sale" est VOLONTAIRE — c'est le matériau du prochain bloc sur le refactoring
Tous les tests passent : montrer le terminal entièrement vert.
Dire explicitement : "Ce code fonctionne. Mais regardez les noms..."
-->

---
layout: default
---

# Anatomie d'un test

Ce qu'on vient de faire

<v-clicks>

- 4 tests, 4 comportements, 4 fois le cycle RED → GREEN
- Le code a grandi guidé par les tests — pas l'inverse
- Chaque test a un nom qui dit exactement ce qu'il vérifie
- Le code fonctionne — mais il peut être amélioré

</v-clicks>

<div v-click class="mt-8">

**Observation :**

</div>

<v-clicks>

- Variable `r` → que veut-elle dire ?
- `n % 3 === 0` apparaît deux fois conceptuellement
- C'est l'étape **REFACTOR** qui va corriger ça — sans toucher au comportement

</v-clicks>

<!--
Ce bilan sert de transition vers le prochain bloc.
Pointer visuellement dans l'éditeur les variables `r` et `n` — laisser les apprenants ressentir le problème avant de le nommer.
Annoncer : "Le code est vert. Les tests passent. On peut maintenant améliorer le code en toute sécurité — c'est l'étape Refactor."
-->

---
layout: center
class: text-center
---

# Anatomie d'un test

&nbsp;

> 💬 "Dans la démo, pourquoi a-t-on écrit `String(n)` et pas directement la logique complète dès le premier test ?"

<!--
Réponse attendue : on ne code que ce que le test demande — pas d'anticipation, pas de surcodage.
Laisser 2-3 réponses s'exprimer, valoriser celles qui mentionnent "baby steps" ou "minimum pour faire passer le test".
Enchaîner directement vers le bloc refactoring — le code de la démo est le point de départ.
-->
