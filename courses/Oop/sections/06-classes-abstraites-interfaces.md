---
layout: cover
background: https://cover.sli.dev?8
---

# Chapitre 06 - Classes Abstraites et Interfaces

<!--
Durée : 40 minutes
Objectif : Comprendre la différence entre classes abstraites et interfaces, et savoir quand utiliser chacune
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Classes Abstraites et Interfaces

Classes Abstraites vs Interfaces

::left::

## Classe Abstraite

<div v-click="1">

```ts {*}{maxHeight:'300px'}
abstract class Forme {
  protected couleur: string

  constructor(couleur: string) {
    this.couleur = couleur
  }

  // Méthode concrète (avec implémentation)
  afficherCouleur(): void {
    console.log(`Couleur: ${this.couleur}`)
  }

  // Méthode abstraite (sans implémentation)
  abstract calculerAire(): number
  abstract calculerPerimetre(): number
}

class Rectangle extends Forme {
  private largeur: number
  private hauteur: number

  constructor(
    couleur: string,
    largeur: number,
    hauteur: number
  ) {
    super(couleur)
    this.largeur = largeur
    this.hauteur = hauteur
  }

  calculerAire(): number {
    return this.largeur * this.hauteur
  }

  calculerPerimetre(): number {
    return 2 * (this.largeur + this.hauteur)
  }
}
```

</div>

::right::

## Interface

<div v-click="2">

```ts {*}{maxHeight:'300px'}
interface Dessinable {
  dessiner(): void
  effacer(): void
}

interface Redimensionnable {
  redimensionner(facteur: number): void
}

class Cercle implements Dessinable, Redimensionnable {
  private rayon: number

  constructor(rayon: number) {
    this.rayon = rayon
  }

  dessiner(): void {
    console.log(`Dessiner cercle de rayon ${this.rayon}`)
  }

  effacer(): void {
    console.log("Effacer cercle")
  }

  redimensionner(facteur: number): void {
    this.rayon *= facteur
  }
}
```

</div>

<!--
Montrer les deux concepts côte à côte
Classe abstraite : peut avoir implémentation
Interface : contrat pur
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Classes Abstraites et Interfaces

Quand Utiliser Quoi ?

::left::

<div v-click>

## Classe Abstraite

**Quand :** les classes partagent une **origine commune** et du code

**Caractéristiques :**
- Méthodes concrètes + attributs + constructeur
- Héritage simple
- Mot-clé `abstract`

</div>

::right::

<div v-click>

## Interface

**Quand :** des classes **sans lien** doivent garantir le même comportement

**Caractéristiques :**
- Aucune implémentation, aucun attribut
- Multi-implémentation possible
- Mot-clé `interface`

</div>

<!--
Expliquer les cas d'usage
Classe abstraite : hiérarchie forte
Interface : capacité, contrat
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Classes Abstraites et Interfaces

Exemple Pratique - Combinaison des Deux

::left::

```ts {all|2-5|7-22|24-62|all}{maxHeight:'300px'}
// Interface : capacité
interface Volant {
  voler(): void
  atterrir(): void
}

// Classe abstraite : base commune
abstract class Animal {
  protected nom: string
  protected age: number

  constructor(nom: string, age: number) {
    this.nom = nom
    this.age = age
  }

  manger(): void {
    console.log(`${this.nom} mange`)
  }

  abstract faireDuBruit(): void
}

// Classe concrète héritant et implémentant
class Oiseau extends Animal implements Volant {
  private envergure: number

  constructor(nom: string, age: number, envergure: number) {
    super(nom, age)
    this.envergure = envergure
  }

  faireDuBruit(): void {
    console.log(`${this.nom} fait cui-cui`)
  }

  voler(): void {
    console.log(`${this.nom} vole avec ${this.envergure}cm d'envergure`)
  }

  atterrir(): void {
    console.log(`${this.nom} atterrit`)
  }
}

class Chauve_Souris extends Animal implements Volant {
  constructor(nom: string, age: number) {
    super(nom, age)
  }

  faireDuBruit(): void {
    console.log(`${this.nom} fait des ultrasons`)
  }

  voler(): void {
    console.log(`${this.nom} vole la nuit`)
  }

  atterrir(): void {
    console.log(`${this.nom} se suspend`)
  }
}
```

::right::

## Points Clés

<div v-click="1">

- `Volant` : interface (capacité)

</div>

<div v-click="2">

- `Animal` : classe abstraite (base commune)

</div>

<div v-click="3">

- `Oiseau` et `Chauve_Souris` : héritent + implémentent

</div>

<div v-click="4">

```ts {*}{maxHeight:'400px'}
// Utilisation polymorphe
const volants: Volant[] = [
  new Oiseau("Piou", 2, 30),
  new Chauve_Souris("Batman", 3)
]
```

</div>

::bottom::

<div v-click="5">

````md magic-move
```ts
volants.forEach(v => {

})
```

```ts
volants.forEach(v => {
  v.manger()       // Implémentation Parent
})
```

```ts
volants.forEach(v => {
  v.manger()       // Implémentation Parent
  v.faireDuBruit() // Implémentation Enfant
})
```

```ts
volants.forEach(v => {
  v.manger()       // Implémentation Parent
  v.faireDuBruit() // Implémentation Enfant
  v.voler()        // Implémentation contrat d'un Volant
})
```
````

</div>

<!--
Montrer la combinaison classe abstraite + interface
Héritage pour la base, interface pour la capacité
Polymorphisme sur l'interface
-->

---
layout: center
class: text-center
---

# Classes Abstraites et Interfaces
&nbsp;

> 💬 Demain, vous reprenez un code existant mal structuré. Parmi les 4 piliers, lequel vous servira **en premier** pour améliorer la qualité sans tout réécrire ?

<!--
Question de clôture orientée action. Les réponses varient selon le contexte (encapsulation pour sécuriser, abstraction pour clarifier).
Transition : "Peu importe votre choix — l'essentiel est de reconnaître ces patterns dans votre code quotidien. Voyons comment les identifier."
-->
