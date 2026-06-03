---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Mise en contexte

---
layout: two-cols-header
---

# Mise en contexte
&nbsp;

::left::

Combien de fois lisez-vous un code avant de le **comprendre** ?

<div v-click>

## Et si le problème venait des **noms** ?

</div>

::right::

```ts
class Handler {
  do(obj: any, opts: any): number {
    const r: number[] = []
    obj.items.forEach((i: any) => {
      if (i.ok && opts.run) r.push(i.val * opts.n)
    })
    return r.reduce((s, v) => s + v, 0)
  }
}
```

<!--
Accroche : poser la question au groupe. Faire réagir.
Montrer le code AVANT de poser la question : "Quelqu'un peut me dire ce que fait ce code ?"
Silence gêné garanti. C'est le but.
La plupart du temps de développement est passé à LIRE du code, pas à en écrire.
-->

---

# Mise en contexte
Pourquoi le nommage change tout

<v-clicks>

- 📖 **Lisibilité** : un bon nom évite de relire l'implémentation pour comprendre
- 👀 **Revues de code** : on valide une intention, pas une mécanique
- 🔧 **Évolutivité** : un code clair se modifie sans peur de tout casser
- 🧠 **Charge mentale** : moins de noms à « décoder », plus d'énergie pour le métier

</v-clicks>

<!--
Insister : on passe plus de temps à lire qu'à écrire du code.
Un mauvais nom est une dette qu'on paie à chaque lecture.
-->

---
layout: two-cols-header
---

# Mise en contexte
Nommage technique vs nommage métier

::left::

## Nommage technique
<small>Décrit la machine</small>

<v-click>

- `data`, `list`, `tmp`, `obj`
- `process()`, `handle()`, `doStuff()`
- `Manager`, `Helper`, `Utils`

</v-click>

<v-click>

## On voit <br/><span v-mark.underline.red="2">**comment** le code marche</span>

</v-click>

::right::

## Nommage métier
<small>Décrit le domaine</small>

<v-click>

- `inscription`, `plageHoraire`
- `validerEligibilite()`
- `DossierCandidat`

</v-click>

<v-click>

## On voit <span v-mark.underline.red="4">**ce que le métier raconte**</span>

</v-click>

<!--
Analogie : un plan de cuisine annoté "meuble1, meuble2" vs "plan de travail, four, évier".
Le second se lit sans effort.
-->

---

# Mise en contexte
Introduction au Domain-Driven Design

<v-clicks>

- Le **DDD** (Domain-Driven Design) place le **métier au centre** de la conception
- Idée clé : faire **transpirer le métier** dans le code
- Besoin d'un **langage partagé** entre développeurs et experts métier
- On s'aligne sur un **modèle explicite** du domaine

</v-clicks>

<v-click>

> 🎯 Aujourd'hui : pas les patterns techniques du DDD, mais son **cœur** — le vocabulaire et le modèle du domaine

</v-click>

<!--
Rassurer : le DDD complet est vaste (agrégats, bounded contexts...). 
On ne garde aujourd'hui que l'essence : le langage ubiquitaire.
-->

---
layout: center
class: text-center
---

# Mise en contexte
&nbsp;

> 💬 Si vous deviez **choisir un seul mot** pour décrire ce que le code doit refléter en priorité — lequel serait-il ?

<!--
Question ouverte pour amorcer la transition vers le chapitre 02.
Réponse attendue : "métier", "intention", "domaine"… tout est valide pour enchaîner sur le principe de nommage.
-->
