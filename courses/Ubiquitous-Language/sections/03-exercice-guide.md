---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Exercice guidé : analyse de nommage

---
layout: center
class: text-center
---

# Exercice guidé
&nbsp;

Avant de refactorer, on **observe**.

On passe de « qu'est-ce que le code fait ? » à « qu'est-ce que le métier raconte ? »

<!--
Cet exercice se fait à l'oral, ensemble. Pas de code à écrire encore.
Objectif : muscler le regard avant de toucher au clavier.
-->

---

# Exercice guidé
La méthode en 4 étapes

<v-clicks>

1. 🔍 **Repérer les mots vides** : `data`, `tmp`, `process`, `obj`...
2. 🧩 **Lister les concepts métier cachés** derrière le code
3. 🗣️ **Reformuler le domaine** avec le vocabulaire du métier
4. ✍️ **Proposer 2-3 noms candidats** pour chaque variable / fonction / classe

</v-clicks>

<!--
Insister sur l'étape 4 : proposer PLUSIEURS noms force à comparer et à choisir le plus parlant.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé
Étude de cas — plateforme de réservation de créneaux de formation

::left::

```ts {all}{maxHeight:'260px'}
class Manager {
  process(d: any[]): any[] {
    const tmp: any[] = []
    for (const x of d) {
      if (x.s === 1 && x.dt > Date.now()) {
        tmp.push(x)
      }
    }
    return tmp
  }
}
```

::right::

**Le contexte métier**
- Un formateur propose des **créneaux** (date, heure, durée)
- Un candidat peut **réserver** un créneau disponible et à venir
- Objectif : **lister les créneaux réservables**

<div v-click="1">

**À vous de jouer**
- Quels sont les **mots vides** ?

</div>

<div v-click="2">

- Quels **concepts métier** se cachent derrière `d`, `s`, `dt` ?

</div>

<div v-click="3">

- Comment **reformuleriez-vous** la classe et la méthode ?

</div>

<!--
Poser le contexte oralement avant d'afficher la slide.
Le groupe doit garder ce vocabulaire en tête : créneau, disponible, à venir, réservable.
Domaine sous-jacent : s === 1 = statut "disponible", dt = date du créneau.
Laisser le groupe deviner sans donner la réponse tout de suite.
-->

---

# Exercice guidé
Verbaliser le métier caché

<v-clicks>

- `d` → une liste de **créneaux**
- `x.s === 1` → un créneau **disponible**
- `x.dt > Date.now()` → un créneau **à venir**
- `process()` → on **filtre les créneaux réservables**
- `Manager` → en réalité, un **catalogue de créneaux**

</v-clicks>

<div v-click>
<br/>

> 💡 En nommant le métier, la **structure du code** apparaît déjà

</div>

<!--
Montrer que la simple analyse du vocabulaire révèle déjà le vrai rôle du code.
On a fait émerger : Creneau, disponible, à venir, réservable, CatalogueDeCreneaux.
-->

---

# Exercice guidé
Noms candidats

<v-clicks>

- `Manager` → `CatalogueDeCreneaux`, `PlanningReservation`
- `process(d)` → `creneauxReservables(creneaux)`, `filtrerDisponibles(creneaux)`
- `tmp` → `creneauxReservables`, `disponibilites`
- `x.s === 1` → `creneau.estDisponible`
- `x.dt` → `creneau.dateDebut`

</v-clicks>

<!--
Pas de "bonne" réponse unique : l'important est la justification.
Transition : maintenant on refactore vraiment le code, en 3 passes.
-->
