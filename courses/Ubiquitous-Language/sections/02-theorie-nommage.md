---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Nommer l'intention métier

---
layout: center
class: text-center
---

# Nommer l'intention métier
&nbsp;

Un seul principe — nommer **l'intention métier** — décliné sur trois terrains

<div v-click>

**Variables · Fonctions · Classes**

</div>

<!--
Annoncer la structure : le principe central est l'intention. Variables, fonctions et classes sont les endroits où on l'applique.
Pas 4 piliers indépendants : 1 principe, 3 applications.
-->

---

# Nommer l'intention métier
Le principe : intention, pas implémentation

````md magic-move
```ts
// Que fait ce code ? Il faut lire l'intérieur pour comprendre
function check(d: Date): boolean {
  return d.getTime() > Date.now()
}
```

```ts
// Le nom dit POURQUOI, pas COMMENT
function estDansLeFutur(date: Date): boolean {
  return date.getTime() > Date.now()
}
```
````

<div v-click="1">

**Avant / Après**
- `check(d)` n'exprime aucune intention métier
- `estDansLeFutur(date)` se lit comme une phrase

</div>

<!--
Un bon nom répond à "pourquoi" et "quoi", pas à "comment c'est implémenté".
Si on change l'implémentation, le nom doit rester valable.
-->

---

# Nommer l'intention métier
Application 1 — Variables : des concepts métier

```ts {1-3|5-7|all}
// ❌ Abréviations et généralités
const d: any[] = []
const tmp = u.age

// ✅ Concepts du domaine
const inscriptions: Inscription[] = []
const ageDuCandidat: number = candidat.age
```

**Mots vides à bannir**
- `d`, `tmp`, `data`, `obj`, `val` ne disent rien du métier

<div v-click="1">

**Noms porteurs de sens**
- `inscriptions`, `ageDuCandidat` nomment des **concepts réels**

</div>

<!--
Piège : "ça prend plus de place" → un nom long mais clair vaut mieux qu'un nom court mystérieux.
-->

---

# Nommer l'intention métier
Application 2 — Fonctions : des verbes métier

```ts {1-3|5-7|all}
// ❌ Verbes génériques, vides de sens
function process(x: any): void { /* ... */ }
function handle(data: any): void { /* ... */ }

// ✅ Verbes du domaine
function validerEligibilite(candidat: Candidat): boolean { /* ... */ }
function calculerMontantRestant(panier: Panier): number { /* ... */ }
```

**Le piège du « doSomething »**
- `process`, `handle`, `manage` n'expriment aucune action métier

<div v-click="1">

**Un verbe = une action du métier**
- `validerEligibilite`, `calculerMontantRestant` racontent ce qui se passe

</div>

<!--
Une fonction fait quelque chose : son nom doit être un verbe d'action métier.
Si on n'arrive pas à la nommer, c'est qu'elle fait peut-être trop de choses.
-->

---

# Nommer l'intention métier
Application 3 — Classes : des entités du domaine

```ts {1-3|5-7|all}
// ❌ Noms fourre-tout
class DataManager { /* ... */ }
class Helper { /* ... */ }

// ✅ Entités et concepts métier
class DossierCandidat { /* ... */ }
class PlageHoraire { /* ... */ }
```

**Le signal d'alarme « Manager / Helper / Utils »**
- Ces noms cachent souvent un concept métier non identifié

<div v-click="1">

**Nommer l'entité réelle**
- `DossierCandidat`, `PlageHoraire` existent dans le langage du métier

</div>

<!--
Quand on voit "Manager" ou "Helper", se demander : quel est le vrai concept métier derrière ?
-->

---

# Nommer l'intention métier
La notion de langage ubiquitaire

<v-clicks>

- Un **langage ubiquitaire** = un vocabulaire **partagé** par tous : devs, métier, doc, code
- Les mots du code = les mots qu'emploient les **experts métier**
- Pas de traduction mentale entre « le mot du client » et « le mot du code »

</v-clicks>

<div v-click>

<br/>

> 🧪 **Test simple** : si un expert métier ne reconnaît pas les mots du code, le modèle est probablement mauvais

</div>

<!--
Ce n'est pas un cours DDD complet : on retient juste cette règle d'or.
Le langage ubiquitaire est le fil rouge de toute la séance.
-->

---

# Nommer l'intention métier
Récapitulatif

- **Principe** : nommer <span v-mark.underline.red>l'intention métier</span>, pas l'implémentation
- Sur les **variables** : des <span v-mark.underline.red>concepts</span>
- Sur les **fonctions** : des <span v-mark.underline.red>verbes métier</span>
- Sur les **classes** : des <span v-mark.underline.red>entités du domaine</span>
- **Langage ubiquitaire** : <span v-mark.underline.red>les mots du métier dans le code</span>

<!--
Transition : passons à la pratique avec un premier exercice d'analyse.
-->
