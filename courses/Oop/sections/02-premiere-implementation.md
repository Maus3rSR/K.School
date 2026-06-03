---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 02 - Première Implémentation

<!--
Durée : 50 minutes
Objectif : Créer sa première classe en code et instancier des objets
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Première Implémentation

Créer une Classe Point

::left::

## Le Code

```ts {1-7|1|2-3|5|6|all}
class Point {
  public x: number = 0
  public y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

::right::

## Décortiquons

<div v-click="1">

- `class Point` : Déclaration de la classe

</div>

<div v-click="2">

- `x = 0` et `y = 0` : <mark>**Attributs**</mark> avec valeurs par défaut

</div>

<div v-click="3">

- `afficher()` : <mark>**Méthode**</mark> pour afficher le point

</div>

<div v-click="4">

- `this` : Référence à l'objet courant, ici pour accéder aux attributs `x` et `y`

</div>
<!--
Live coding : créer la classe étape par étape
Expliquer this : "moi-même", l'objet qui appelle la méthode
Montrer le surlignage progressif du code
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Première Implémentation

Instancier des Objets

::left::

**Créer des objets `Points` avec `new`**

```ts {1-9|11-13|15-17|19-21|all}{maxHeight:'300px'}
class Point {
  // Par défaut la visibilité est publique
  x: number = 0
  y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}

// Créer deux objets Point
const point1 = new Point()
const point2 = new Point()

// Modifier leurs valeurs
point1.x = 10
point1.y = 10

// Afficher les points
point1.afficher()
point2.afficher()
```

::right::

<div v-click="1">

- `new Point()` crée une **nouvelle instance** en mémoire

</div>

<div v-click="2">

- Modifier les valeurs des attributs publics

</div>

<div v-click="3">

- Afficher les points avec la méthode `afficher()`

</div>

<div v-click="4">

- Chaque objet a ses **propres valeurs** indépendantes
```ts
Point(10, 10) // Valeurs du point 1
Point(0, 0) // Valeurs du point 2
```

</div>

<!--
Montrer que new crée un nouvel objet en mémoire
Insister : même classe, objets différents avec des valeurs différentes
Expliquer que point1 et point2 sont deux entités distinctes
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Première Implémentation

Le Constructeur

::left::

**Initialiser avec des valeurs personnalisées**

````md magic-move
```ts
class Point {
  x: number = 0
  y: number = 0

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

```ts {5-8}
class Point {
  x: number = 0
  y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

```ts {15-17}
class Point {
  x: number = 0
  y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}

const point1 = new Point(10, 20)
//                       ↓   ↓
//                       x   y
```
````

::right::

<div v-click="1">

**Qu'est-ce qu'un constructeur ?**

- Méthode spéciale appelée automatiquement lors de la création d'un objet avec `new`
- Permet d'<mark>**initialiser**</mark> les attributs avec des valeurs personnalisées
- Nom obligatoire : `constructor`

</div>

<div v-click="2">

**Fonctionnement**

- Les arguments `(10, 20)` sont passés au constructeur

</div>

<!--
Expliquer que le constructeur est appelé automatiquement
Montrer le lien entre les paramètres et les attributs
Insister sur this qui fait référence à l'objet en cours de création
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Première Implémentation

Constructeur avec Paramètres Optionnels

::left::

```ts
class Point {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  afficher(): void {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}
```

::right::

```ts
// Avec valeurs
const p1 = new Point(10, 20)
p1.afficher() // Point(10, 20)

// Avec valeurs partielles
const p2 = new Point(5)
p2.afficher() // Point(5, 0)

// Sans valeurs (utilise les défauts)
const p3 = new Point()
p3.afficher() // Point(0, 0)
```

<!--
Expliquer les paramètres par défaut
Montrer la flexibilité d'initialisation
Cas d'usage : valeurs par défaut sensées
-->

---
layout: two-cols-header
---

# Première Implémentation

Exercice Pratique - Créer une Classe Rectangle

::left::

**Créer une classe `Rectangle` avec :**

1. **Attributs** :
   - `largeur` (number)
   - `hauteur` (number)

2. **Constructeur** :
   - Accepte `largeur` et `hauteur` en paramètres
   - Valeurs par défaut : 1 pour les deux

::right::

3. **Méthodes** :
   - `calculerAire()` : retourne largeur × hauteur
   - `calculerPerimetre()` : retourne 2 × (largeur + hauteur)
   - `afficher()` : affiche "Rectangle(largeur x hauteur)"

4. **Test** :
   - Créer un rectangle de 5 × 3
   - Afficher son aire et son périmètre

<!--
Objectif : Appliquer les concepts vus (classe, attributs, constructeur, méthodes)
Durée estimée : 15 minutes

Solution à préparer dans les exercices
Critères de réussite : code compile, tests passent, méthodes correctes
-->

---
layout: center
class: text-center
---

# Première Implémentation
&nbsp;

> 💬 Vous venez de créer votre première classe. Qu'est-ce qui vous **surprend** ou vous **pose question** dans ce que vous avez écrit ?

<!--
Question de transition ouverte. Laisser 1-2 réponses, puis enchaîner vers l'encapsulation.
Prochain chapitre : protéger les données en contrôlant l'accès aux attributs.
-->

<!--
Synthèse des concepts clés
Transition vers l'encapsulation
-->
