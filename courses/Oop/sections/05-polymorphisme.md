---
layout: cover
background: https://cover.sli.dev?7
---

# Chapitre 05 - Polymorphisme

<!--
Durée : 60 minutes
Objectif : Comprendre le polymorphisme et l'utiliser pour écrire du code flexible
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Qu'est-ce que le Polymorphisme ?

::left::

<div v-click>

## Définition

Le **polymorphisme** permet de traiter des objets de types différents de manière **uniforme** via une interface commune.

Du grec *poly* (plusieurs) + *morphe* (forme)

</div>

<div v-click class="mt-4">

## Objectifs

- **Flexibilité** : code qui fonctionne avec plusieurs types
- **Extensibilité** : ajouter de nouveaux types sans modifier le code existant
- **Abstraction** : manipuler des objets par leur interface, pas leur implémentation

</div>

::right::

<div v-click>

## Analogie : La Prise Électrique

- Une **prise** accepte différents appareils
- Tous les appareils ont la **même interface** (fiche)
- Chaque appareil a son **propre comportement** (lampe, ordinateur, téléphone)
- La prise ne connaît pas les détails de chaque appareil

</div>

<!--
Expliquer le concept de polymorphisme
Interface commune, comportements différents
Lien avec l'héritage et la surcharge
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Polymorphisme par Héritage

::left::

```ts {1-11|8-10|13-17|19-23|25-29|all}{maxHeight:'300px'}
class Animal {
  nom: string

  constructor(nom: string) {
    this.nom = nom
  }

  faireDuBruit(): void {
    console.log("...")
  }
}

class Chat extends Animal {
  faireDuBruit(): void {
    console.log(`${this.nom} fait miaou`)
  }
}

class Chien extends Animal {
  faireDuBruit(): void {
    console.log(`${this.nom} fait wouf`)
  }
}

class Vache extends Animal {
  faireDuBruit(): void {
    console.log(`${this.nom} fait meuh`)
  }
}
```

::right::

## Points Clés

<div v-click="1">

- `Animal` : classe parent, `faireDuBruit()` par défaut

</div>

<div v-click="2">

- `Chat` **surcharge** `faireDuBruit()` → miaou

</div>

<div v-click="3">

- `Chien` **surcharge** `faireDuBruit()` → wouf

</div>

<div v-click="4">

- `Vache` **surcharge** `faireDuBruit()` → meuh

</div>

<div v-click="5">

- Type déclaré `Animal`, méthode appelée selon le **type réel**

</div>

::bottom::

<div v-click="6">

**Un seul code** pour plusieurs types

</div>
<!--
Chaque étape révèle une classe et son explication
Dispatch dynamique : méthode appelée selon le type réel
-->

---

# Polymorphisme

Polymorphisme par Héritage - En action

```ts {maxHeight:'320px'}
// Tableau d'animaux de types différents
const animaux: Animal[] = [
  new Chat("Minou"),
  new Chien("Rex"),
  new Vache("Marguerite")
]

// Même code pour tous les types
animaux.forEach(animal => {
  animal.faireDuBruit()
})

// Résultat :
// "Minou fait miaou"
// "Rex fait wouf"
// "Marguerite fait meuh"
```

<div class="mt-2">

**Un seul code** itère sur des types différents — chaque objet exécute **sa** version de `faireDuBruit()` (dispatch dynamique).

</div>

<!--
Le même code fonctionne pour tous les types
Le dispatch dynamique choisit la bonne méthode à l'exécution
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Interfaces et Contrats

::left::

```ts {all|2-5|7-21|23-37|all}{maxHeight:'300px'}
// Interface : contrat à respecter
interface Payable {
  effectuerPaiement(montant: number): void
  obtenirRecu(): string
}

class CarteBancaire implements Payable {
  private numero: string

  constructor(numero: string) {
    this.numero = numero
  }

  effectuerPaiement(montant: number): void {
    console.log(`Paiement de ${montant}€ par carte`)
  }

  obtenirRecu(): string {
    return `Reçu carte ${this.numero}`
  }
}

class PayPal implements Payable {
  private email: string

  constructor(email: string) {
    this.email = email
  }

  effectuerPaiement(montant: number): void {
    console.log(`Paiement de ${montant}€ via PayPal`)
  }

  obtenirRecu(): string {
    return `Reçu PayPal ${this.email}`
  }
}
```

::right::

## Points Clés

<div v-click="1">

- `Payable` : **interface** = contrat (2 méthodes à implémenter)

</div>

<div v-click="2">

- `CarteBancaire` **implements** `Payable`

</div>

<div v-click="3">

- `PayPal` **implements** `Payable` (autre implémentation)

</div>

<div v-click="4">

## Interface vs Classe

**Interface** : contrat sans implémentation, multiple
**Classe** : structure + implémentation, héritage simple

</div>

<!--
Chaque étape révèle l'interface puis ses implémentations
Contrat sans implémentation
Différence avec l'héritage
-->

---

# Polymorphisme

Interfaces - Code Polymorphe

```ts {maxHeight:'320px'}
function traiterPaiement(
  moyenPaiement: Payable,
  montant: number
): void {
  moyenPaiement.effectuerPaiement(montant)
  const recu = moyenPaiement.obtenirRecu()
  console.log(recu)
}

// Fonctionne avec n'importe quel Payable
const carte = new CarteBancaire("1234")
const paypal = new PayPal("user@email.com")

traiterPaiement(carte, 100)
traiterPaiement(paypal, 50)
```

<div v-click class="mt-2">

La fonction `traiterPaiement()` accepte **n'importe quel** `Payable` sans connaître l'implémentation concrète.

</div>

<!--
Le code client dépend de l'interface, pas des classes concrètes
Extensibilité : ajouter un nouveau Payable sans rien changer
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Exemple Pratique - Système de Paiement

::left::

```ts {all|1-4|6-28|30-53|all}{maxHeight:'300px'}
interface MoyenPaiement {
  payer(montant: number): boolean
  obtenirNom(): string
}

class CarteBancaire implements MoyenPaiement {
  private numero: string
  private solde: number

  constructor(numero: string, solde: number) {
    this.numero = numero
    this.solde = solde
  }

  payer(montant: number): boolean {
    if (montant > this.solde) {
      console.log("Solde insuffisant")
      return false
    }
    this.solde -= montant
    console.log(`Paiement de ${montant}€ par carte`)
    return true
  }

  obtenirNom(): string {
    return `Carte **** ${this.numero.slice(-4)}`
  }
}

class Crypto implements MoyenPaiement {
  private wallet: string
  private montantBTC: number

  constructor(wallet: string, montantBTC: number) {
    this.wallet = wallet
    this.montantBTC = montantBTC
  }

  payer(montant: number): boolean {
    const btcNeeded = montant / 50000 // Taux fictif
    if (btcNeeded > this.montantBTC) {
      console.log("BTC insuffisant")
      return false
    }
    this.montantBTC -= btcNeeded
    console.log(`Paiement de ${btcNeeded} BTC`)
    return true
  }

  obtenirNom(): string {
    return `Wallet ${this.wallet.slice(0, 8)}...`
  }
}
```

::right::

## Points Clés

<div v-click="1">

- `MoyenPaiement` : interface commune (`payer`, `obtenirNom`)

</div>

<div v-click="2">

- `CarteBancaire` : vérifie le **solde** avant de payer

</div>

<div v-click="3">

- `Crypto` : convertit en **BTC**, même interface

</div>

<div v-click="4">

- Deux implémentations **interchangeables** via `MoyenPaiement`
- **Extensible** : nouveau moyen sans modifier le code client

</div>

<!--
Chaque étape révèle l'interface puis une implémentation
Polymorphisme avec interfaces
Extensibilité : ajouter de nouveaux moyens de paiement
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Exemple Pratique - Système de Paiement - La Caisse

::left::

```ts {*}{maxHeight:'400px'}
class Caisse {
  private moyensPaiement: MoyenPaiement[]

  constructor() {
    this.moyensPaiement = []
  }

  ajouterMoyenPaiement(moyen: MoyenPaiement): void {
    this.moyensPaiement.push(moyen)
  }

  effectuerAchat(montant: number): void {
    console.log(`Achat de ${montant}€`)
    
    for (const moyen of this.moyensPaiement) {
      console.log(`Tentative avec ${moyen.obtenirNom()}`)
      if (moyen.payer(montant)) {
        console.log("Paiement réussi !")
        return
      }
    }
    
    console.log("Aucun moyen de paiement valide")
  }
}

const caisse = new Caisse()
caisse.ajouterMoyenPaiement(
  new CarteBancaire("1234567890", 50)
)
caisse.ajouterMoyenPaiement(
  new Crypto("abc123xyz", 0.002)
)

caisse.effectuerAchat(100)
```

::right::

<div v-click>

## Polymorphisme en action

- `Caisse` manipule des `MoyenPaiement[]`
- Elle **ignore** s'il s'agit de carte ou crypto
- `moyen.payer()` appelle la **bonne** implémentation
- Ajouter un moyen = **zéro** modification de `Caisse`

</div>

<!--
La Caisse dépend de l'interface, pas des classes concrètes
Polymorphisme : extensibilité maximale
-->

---
layout: two-cols-header
---

# Polymorphisme

Exercice - Implémenter une Interface

<!--
Objectif : Créer des classes implémentant une interface commune
Durée estimée : 20 minutes
-->

::left::

**Créer un système de notification polymorphe :**

1. **Interface `Notifiable`** :
   - Méthode `envoyerNotification(message: string): void`
   - Méthode `obtenirDestination(): string`

2. **Classe `NotificationEmail`** :
   - Attribut `email` (private)
   - Implémente `envoyerNotification()` : affiche "Email envoyé à [email]: [message]"
   - Implémente `obtenirDestination()` : retourne l'email

3. **Classe `NotificationSMS`** :
   - Attribut `telephone` (private)
   - Implémente `envoyerNotification()` : affiche "SMS envoyé au [telephone]: [message]"
   - Implémente `obtenirDestination()` : retourne le téléphone

::right::

4. **Fonction `envoyerAlertes()`** :
   - Accepte un tableau de `Notifiable[]`
   - Envoie le même message à tous

5. **Test** :
   - Créer un email et un SMS
   - Envoyer une alerte aux deux

<!--
Solution à préparer dans les exercices
Montrer le polymorphisme en action
-->

---
layout: center
class: text-center
---

# Polymorphisme
&nbsp;

> 💬 Quelle différence voyez-vous entre une **interface** et une **classe abstraite** ? Intuitivement, quand choisiriez-vous l'une plutôt que l'autre ?

<!--
Question de transition qui amorce la réflexion du chapitre 06.
Toutes les réponses sont valides — l'objectif est d'activer la curiosité avant d'apporter la distinction.
-->

<!--
Synthèse du polymorphisme
Transition vers les classes abstraites
-->
