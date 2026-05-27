---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 03 - Encapsulation

<!--
Durée : 60 minutes
Objectif : Comprendre l'encapsulation et protéger les données
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Encapsulation

Qu'est-ce que l'Encapsulation ?

::left::

<div v-click>

## Définition

L'**encapsulation** est le principe de **cacher les détails d'implémentation** et de **contrôler l'accès** aux données d'un objet.

</div>

<div v-click class="mt-4">

## Objectifs

- **Protéger** les données contre les modifications non contrôlées
- **Garantir** la cohérence des données
- **Simplifier** l'interface publique
- **Faciliter** la maintenance

</div>

::right::

<div v-click>

## Analogie : Le Distributeur de Billets

- Vous ne pouvez pas **accéder directement** à l'argent
- Vous passez par une **interface contrôlée** (clavier, écran)
- Le distributeur **valide** vos actions
- Les mécanismes internes sont **cachés**

</div>

<!--
Expliquer le concept de boîte noire
Interface publique vs implémentation privée
Lien avec la cohérence des données vue au Chapitre 01
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Encapsulation

Modificateurs d'Accès

::left::

```ts {1-16|3-4|6-7|9-10|all}
class CompteBancaire {
  // Public : accessible partout
  public titulaire: string

  // Private : accessible uniquement dans la classe
  private solde: number

  // Protected : accessible dans la classe et ses enfants
  protected historique: string[]

  constructor(titulaire: string, soldeInitial: number) {
    this.titulaire = titulaire
    this.solde = soldeInitial
    this.historique = []
  }
}
```

::right::


<div v-click="1">

**`public`** _(par défaut)_
- Accessible de partout
- Utilisé pour l'interface publique

</div>

<div v-click="2">

**`private`**
- Accessible uniquement dans la classe
- Protège les données sensibles

</div>

<div v-click="3">

**`protected`**
- Accessible dans la classe et ses classes enfants
- Pour l'héritage (vu plus tard)

</div>

<!--
Expliquer les trois niveaux de visibilité
Insister sur private pour protéger les données
Protected sera détaillé au chapitre héritage
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Encapsulation

Getters et Setters

::left::

```ts {1-7|8-11|13-25|all}
class CompteBancaire {
  private solde: number

  constructor(soldeInitial: number) {
    this.solde = soldeInitial
  }

  // Getter : lire le solde
  getSolde(): number {
    return this.solde
  }

  // Setters : modifier le solde avec validation
  deposer(montant: number): void {
    if (montant <= 0) {
      throw new Error("Montant invalide")
    }
    this.solde += montant
  }

  retirer(montant: number): void {
    if (montant > this.solde) {
      throw new Error("Solde insuffisant")
    }
    this.solde -= montant
  }
}
```

::right::

## Pourquoi des Getters/Setters ?

<div v-click="1">

**Getter pour lire**
- Accès contrôlé aux données privées
- Lecture sans modification possible

</div>

<div v-click="2">

**Setters contrôlés**
- Pas de setter direct `setSolde()`
- Méthodes métier spécifiques (`deposer`, `retirer`)
- Validation et règles métier appliquées

</div>

<div v-click="3" class="mt-4">

```ts
const compte = new CompteBancaire(100)
console.log(compte.getSolde()) // 100
compte.deposer(50) // ✅
compte.retirer(200) // ❌ Erreur
```

</div>

<!--
Expliquer le pattern getter/setter
Montrer la validation dans les setters
Avantage : contrôle total sur l'accès aux données
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Encapsulation

Exemple Pratique - Classe CompteBancaire Complète

::left::

```ts {2-4|16-18|38-41|all}{maxHeight:'300px'}
class CompteBancaire {
  private solde: number
  private historique: string[]
  public readonly titulaire: string

  constructor(titulaire: string, soldeInitial: number) {
    this.titulaire = titulaire
    this.solde = soldeInitial
    this.historique = []
    this.ajouterHistorique(`Création compte: ${soldeInitial}€`)
  }

  getSolde(): number {
    return this.solde
  }

  deposer(montant: number): void {
    if (montant <= 0) {
      throw new Error("Montant doit être positif")
    }
    this.solde += montant
    this.ajouterHistorique(`Dépôt: +${montant}€`)
  }

  retirer(montant: number): void {
    if (montant <= 0) {
      throw new Error("Montant doit être positif")
    }
    if (montant > this.solde) {
      throw new Error("Solde insuffisant")
    }
    this.solde -= montant
    this.ajouterHistorique(`Retrait: -${montant}€`)
  }

  private ajouterHistorique(operation: string): void {
    const date = new Date().toISOString()
    this.historique.push(`[${date}] ${operation}`)
  }

  afficherHistorique(): void {
    console.log(`Historique de ${this.titulaire}:`)
    this.historique.forEach(op => console.log(op))
  }
}
```

::right::

## Points Clés

<div v-click="1">

- `solde` et `historique` : **privés**

</div>

<div v-click="2">

- `titulaire` : **public readonly** (lecture seule)

</div>

<div v-click="3">

- Méthodes publiques : interface contrôlée
- Méthode privée : `ajouterHistorique()`

</div>

<div v-click="4">

```ts
const compte = new CompteBancaire("Alice", 1000)

compte.deposer(500)
compte.retirer(200)

console.log(compte.getSolde()) // 1300

compte.afficherHistorique()
// [2026-05-18...] Création compte: 1000€
// [2026-05-18...] Dépôt: +500€
// [2026-05-18...] Retrait: -200€
```

</div>

<!--
Exemple complet et réaliste
Montrer l'encapsulation en action
Validation, historique, cohérence garantie
-->

---

# Encapsulation

Exercice - Encapsuler une Classe Existante

<!--
Objectif : Appliquer l'encapsulation sur une classe
Durée estimée : 20 minutes
-->

**Transformer cette classe en appliquant l'encapsulation :**

```ts
class Personne {
  nom: string
  age: number
  email: string

  constructor(nom: string, age: number, email: string) {
    this.nom = nom
    this.age = age
    this.email = email
  }
}
```

**Consignes :**
1. Rendre `age` et `email` **privés**
2. Créer un getter pour `age`
3. Créer un setter `setEmail(email)` qui valide le format (contient @)
4. Créer une méthode `anniversaire()` qui incrémente l'âge
5. Le `nom` reste public mais en **readonly**

<!--
Solution à préparer dans les exercices
Validation email : regex simple ou includes('@')
-->

---

# Encapsulation

Récapitulatif Chapitre 03

<div v-click>

## ✅ Ce qu'on a appris

- **Encapsulation** : cacher les détails, contrôler l'accès
- **Modificateurs d'accès** : `public`, `private`, `protected`
- **Getters** : lire des données protégées
- **Setters** : modifier avec validation
- **`readonly`** : attribut en lecture seule
- **Méthodes privées** : logique interne cachée

</div>

<div v-click class="mt-8">

## 🎯 Prochaine étape

**Chapitre 04 - Héritage** : Réutiliser et étendre des classes existantes

</div>

<!--
Synthèse de l'encapsulation
Transition vers l'héritage
-->
