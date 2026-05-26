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

```ts {1-8|10-14|16-20|22-26|all}{maxHeight:'300px'}
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

<div v-click="5">

- Type déclaré : `Animal`
- Types réels : `Chat`, `Chien`, `Vache`
- Méthode appelée selon le type réel
- **Un seul code** pour plusieurs types

</div>

<div v-click="6">

```ts
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

</div>

<!--
Montrer le polymorphisme en action
Même interface, comportements différents
Dispatch dynamique : méthode appelée selon le type réel
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Interfaces et Contrats

::left::

```ts {2-5|7-18|20-31|all}{maxHeight:'300px'}
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

<div v-click="4">

```ts
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

</div>

<div v-click="5" class="mt-4">

## Interface vs Classe

**Interface**
- Définit un **contrat** (méthodes à implémenter)
- Pas d'implémentation
- Une classe peut implémenter plusieurs interfaces

**Classe**
- Définit structure + implémentation
- Héritage simple uniquement

</div>

<!--
Expliquer les interfaces
Contrat sans implémentation
Différence avec l'héritage
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Polymorphisme

Exemple Pratique - Système de Paiement

::left::

```ts {1-6|8-30|32-56|all}{maxHeight:'300px'}
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

<div v-click="4">

```ts {maxHeight:'300px'}
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

</div>

<!--
Exemple complet et réaliste
Polymorphisme avec interfaces
Extensibilité : ajouter de nouveaux moyens de paiement
-->

---

# Polymorphisme

Exercice - Implémenter une Interface

<!--
Objectif : Créer des classes implémentant une interface commune
Durée estimée : 20 minutes
-->

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

# Polymorphisme

Récapitulatif Chapitre 05

<div v-click>

## ✅ Ce qu'on a appris

- **Polymorphisme** : traiter des objets différents de manière uniforme
- **Interface commune** : même méthodes, implémentations différentes
- **`implements`** : implémenter une interface
- **Flexibilité** : code qui fonctionne avec plusieurs types
- **Extensibilité** : ajouter de nouveaux types facilement
- **Dispatch dynamique** : méthode appelée selon le type réel

</div>

<div v-click class="mt-8">

## 🎯 Prochaine étape

**Chapitre 06 - Classes Abstraites et Interfaces** : Approfondir les concepts d'abstraction

</div>

<!--
Synthèse du polymorphisme
Transition vers les classes abstraites
-->
