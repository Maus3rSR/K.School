---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Pratique : refactoring de nommage

---
layout: center
class: text-center
---

# Pratique : refactoring de nommage
&nbsp;

On refactore un code **volontairement sale** en **3 passes**

<div v-click>

**1. Renommer · 2. Regrouper · 3. Reformuler**

</div>

<!--
Atelier principal de la séance (1h15). Travail en binômes recommandé.
Règle absolue : on ne change JAMAIS le comportement, seulement les noms et la structure du vocabulaire.
-->

---

# Pratique : refactoring de nommage
Le contexte métier

Vous travaillez sur une **application e-commerce**. Le service de validation de panier calcule le montant total à payer.

- Une commande contient plusieurs **lignes** (article + quantité)
- Chaque ligne a un **prix unitaire** et une **quantité**
- Certaines lignes sont **remisées** : elles bénéficient d'une réduction de 20 %

<div v-click>
<br/>

> On vous remet le code existant. C'est parti.

</div>

<!--
Poser le contexte oralement. Le groupe doit retenir : ligne, prix, quantité, remise.
Ce sont exactement les noms qui émergent lors du refactoring.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pratique : refactoring de nommage
Le code de départ

::left::

```ts {all}{maxHeight:'320px'}
function process(data: any[]): number {
  let res = 0
  for (const obj of data) {
    let tmp = obj.p * obj.q
    if (obj.t === 'r') {
      tmp = tmp * 0.8
    }
    res += tmp
  }
  return res
}
```

::right::

<div v-click="1">

**Les symptômes**
- Noms techniques : `data`, `res`, `obj`, `tmp`
- Fonction générique : `process`

</div>

<div v-click="2">

**Aucune trace du métier**
- Impossible de deviner le domaine sans deviner `p`, `q`, `t`, `r`

</div>

<!--
Domaine : validation de panier. p = prix, q = quantité, t = type, 'r' = remisé.
Laisser le groupe formuler des hypothèses sur le métier.
-->

---

# Pratique : refactoring de nommage
Passe 1 — Renommer sans changer la logique

````md magic-move {lines: true}
```ts
function process(data: any[]): number {
  let res = 0
  for (const obj of data) {
    let tmp = obj.p * obj.q
    if (obj.t === 'r') {
      tmp = tmp * 0.8
    }
    res += tmp
  }
  return res
}
```

```ts
function calculerTotalPanier(lignes: LignePanier[]): number {
  let total = 0
  for (const ligne of lignes) {
    let montant = ligne.prix * ligne.quantite
    if (ligne.type === 'remise') {
      montant = montant * 0.8
    }
    total += montant
  }
  return total
}
```
````

<div v-click="1">

**Passe 1 : on nomme, on ne touche pas à la logique**
- `data → lignes`, `res → total`, `obj → ligne`, `tmp → montant`
- `process → calculerTotalPanier`

</div>

<!--
Le comportement est strictement identique. Seuls les noms changent.
Déjà, le métier "panier" devient lisible.
-->

---

# Pratique : refactoring de nommage
Passe 2 — Regrouper les concepts métier

````md magic-move {lines: true}
```ts
function calculerTotalPanier(lignes: LignePanier[]): number {
  let total = 0
  for (const ligne of lignes) {
    let montant = ligne.prix * ligne.quantite
    if (ligne.type === 'remise') {
      montant = montant * 0.8
    }
    total += montant
  }
  return total
}
```

```ts
const TAUX_REMISE = 0.8

function sousTotalLigne(ligne: LignePanier): number {
  const montant = ligne.prix * ligne.quantite
  return ligne.type === 'remise'
    ? montant * TAUX_REMISE
    : montant
}
```
````

<div v-click="1">

**Passe 2 : on isole les concepts**
- Le calcul d'une ligne devient `sousTotalLigne(ligne)`
- Le `0.8` magique devient `TAUX_REMISE` (un concept nommé)

</div>

<!--
On extrait le concept "sous-total d'une ligne" et on nomme la constante métier.
Les nombres magiques sont des concepts métier qui s'ignorent.
-->

---

# Pratique : refactoring de nommage
Passe 3 — Reformuler pour raconter le domaine

```ts {1-3|5-7|all}
const TAUX_REMISE = 0.8

const estRemisee = (ligne: LignePanier): boolean => ligne.type === 'remise'

function calculerTotalPanier(lignes: LignePanier[]): number {
  return lignes.reduce((total, ligne) => total + sousTotalLigne(ligne), 0)
}
```

<div v-click="1">

**Concept métier nommé**
- `estRemisee(ligne)` exprime une **règle du domaine**

</div>

<div v-click="2">

**Le code se lit comme une phrase**
- « Le total du panier, c'est la somme des sous-totaux de lignes »

</div>

<!--
Passe 3 : le code raconte le métier. Un expert métier comprendrait presque ces lignes.
Insister : on n'a jamais changé le résultat, seulement la clarté.
-->