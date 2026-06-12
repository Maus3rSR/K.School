---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Rappels JavaScript Moderne

---

# Rappels JavaScript Moderne
ES6+ — Pourquoi en parler ?

- JavaScript moderne (ES6+) est devenu le **standard incontournable** pour écrire du code React (et en dehors de React)
- Le code React que vous lirez/écrirez utilise **ces syntaxes en permanence**
- ES6 = ECMAScript 2015 — grosse mise à jour du langage
- Ce n'est pas du "nouveau" JS — c'est le JS **standard aujourd'hui**

<!--
ES = ECMAScript, le standard sur lequel JavaScript est basé.
Rassurer : pas besoin de tout mémoriser maintenant, vous allez les voir des centaines de fois.
-->

---
layout: two-cols-header
layoutClass: 'gap-5'
---

# Rappels JavaScript Moderne
`const` et `let` — Finies les `var`

## Avant (à éviter)
```js
var nom = "Alice"
var nom = "Bob"   // ré-déclaration OK 😬
```

<br/>

## Aujourd'hui (préférable)

::left::

## `let` — variable modifiable
```js
let score = 0
score = 10        // ✅ on peut changer la valeur
```

::right::

## `const` — valeur constante
```js
const PI = 3.14
PI = 3            // ❌ Erreur ! const ne change pas
```

::bottom::

<v-click>

> 💡 **Règle pratique** : utilisez toujours `const` par défaut, `let` si vous avez besoin de modifier.

</v-click>

<!--
var a des comportements étranges liés au "hoisting" (remontée de déclaration).
En React on utilise quasi exclusivement const.
Piège classique : confondre "const objet ne peut pas être réassigné" avec "ses propriétés ne peuvent pas changer" (elles peuvent).
-->

---

# Rappels JavaScript Moderne
Arrow functions — Fonctions fléchées

```js
// Syntaxe classique
function direBonjour(prenom) {
  return "Bonjour " + prenom
}

// Arrow function équivalente
const direBonjour = (prenom) => {
  return "Bonjour " + prenom
}

// Version ultra-courte (retour implicite)
const direBonjour = (prenom) => "Bonjour " + prenom
```

<div v-click class="mt-5">

> En React, **tous les composants** sont des fonctions. Les arrow functions sont omniprésentes.

</div>

<!--
Ne pas aborder `this` pour l'instant, c'est hors sujet pour la séance 1.
Insister sur la version courte : on la verra constamment dans les composants React.
-->

---

# Rappels JavaScript Moderne
Template literals — Chaînes de caractères modernes

```js
const prenom = "Alice"
const age = 30

// Avant (concaténation)
const message = "Bonjour " + prenom + ", tu as " + age + " ans."

// Avec template literals (backticks `)
const message = `Bonjour ${prenom}, tu as ${age} ans.`

// Multi-ligne facilement
const html = `
  <div>
    <h1>${prenom}</h1>
  </div>
`
```

<!--
Les backticks sont sur la touche 7 ou AltGr+7 selon les claviers.
Très utilisés dans React pour les classes CSS dynamiques, les URLs, les messages.
-->

---
layout: two-cols-header
---

# Rappels JavaScript Moderne
Destructuring — Déstructuration

::left::

## Déstructurer un objet
```js
const utilisateur = {
  nom: "Alice",
  age: 30,
  ville: "Paris"
}

// Avant
const nom = utilisateur.nom
const age = utilisateur.age

// Avec destructuring
const { nom, age } = utilisateur
```

::right::

## Déstructurer un tableau
```js
const couleurs = ["rouge", "vert", "bleu"]

// Avant
const premiere = couleurs[0]

// Avec destructuring
const [premiere, deuxieme] = couleurs

// Ignorer des éléments
const [, , troisieme] = couleurs
```

<!--
Le destructuring est PARTOUT en React :
- Destructurer les props d'un composant
- Déstructurer le retour de useState
- Piège : le destructuring crée une copie, pas une référence.
-->

---

# Rappels JavaScript Moderne
Spread operator — L'opérateur `...`

```js
const fruits = ["pomme", "poire"]
const legumes = ["carotte", "courgette"]

// Fusionner des tableaux
const aliments = [...fruits, ...legumes]
// → ["pomme", "poire", "carotte", "courgette"]

// Copier et modifier un objet
const utilisateur = { nom: "Alice", age: 30 }
const utilisateurMisAJour = { ...utilisateur, age: 31 }
// → { nom: "Alice", age: 31 }
```

<v-click>

> En React, le spread est **essentiel** pour mettre à jour l'état sans muter l'original.

</v-click>

<!--
Muter l'état directement = bug silencieux en React. Le spread permet de créer une nouvelle copie.
On verra ça en détail à la séance 4 avec useState.
-->

---

# Rappels JavaScript Moderne
Modules — `import` / `export`

```js
// fichier utils.js — on EXPORTE une fonction
export const addition = (a, b) => a + b

export const PI = 3.14159

// Export par défaut (un seul par fichier)
export default function App() { ... }
```

```js
// fichier main.js — on IMPORTE
import { addition, PI } from './utils.js'
import App from './App.js'   // import par défaut

console.log(addition(2, 3)) // 5
```

<!--
En React : chaque composant est dans son propre fichier.
On importe React, les composants enfants, les librairies — c'est constant.
Différence named export vs default export : important pour l'organisation du projet.
-->

---

# Rappels JavaScript Moderne
Méthodes de tableaux essentielles

```js
const nombres = [1, 2, 3, 4, 5]

// map() — transformer chaque élément → nouveau tableau
const doubles = nombres.map(n => n * 2)
// → [2, 4, 6, 8, 10]

// filter() — garder certains éléments
const pairs = nombres.filter(n => n % 2 === 0)
// → [2, 4]

// find() — trouver le premier qui correspond
const premierGrand = nombres.find(n => n > 3)
// → 4
```

<v-click>

> En React, `map()` est utilisé pour **afficher des listes** d'éléments UI. C'est fondamental.

</v-click>

<!--
Ces méthodes ne modifient JAMAIS le tableau original — elles retournent un nouveau tableau.
C'est exactement ce qu'on veut en React (immutabilité).
On utilisera map() dès la séance 5 pour afficher des listes.
-->

---
layout: center
class: text-center
---

# Rappels JavaScript Moderne
&nbsp;

> 💬 Vous écrivez une fonction `calculateTotal(items)` — comment savez-vous que `items` est bien un tableau et pas une chaîne, **sans l'exécuter** ?

<!--
Réponses attendues : on ne sait pas, il faut lire le code, c'est dans la documentation (s'il y en a une), on découvre l'erreur au runtime.
Toutes ces réponses montrent le manque : aucune information de type explicite dans le code lui-même.
Transition : "C'est exactement ce que TypeScript apporte — la sécurité des types directement dans l'éditeur. Voyons comment."
-->
