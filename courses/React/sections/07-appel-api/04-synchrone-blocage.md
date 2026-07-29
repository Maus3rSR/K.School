---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le problème des tâches longues

JavaScript exécute tout sur un seul fil, ligne par ligne

::left::

```ts {monaco-run} {autorun:false}
console.log('1. Début du script')

console.log('2. Calcul synchrone en cours...')
const start = Date.now()
while (Date.now() - start < 2000) {
  // boucle bloquante : simule un calcul long
}

console.log('3. Calcul terminé')
```

::right::

<div v-click="1">

Le code **synchrone** s'exécute ligne par ligne : chaque instruction attend la précédente

Cliquez sur **Run** : rien ne peut s'afficher ni réagir pendant les 2 secondes de la boucle — la page est **figée**

Une requête réseau **prend du temps** elle aussi (dizaines à centaines de millisecondes) : si elle bloquait de la même façon, toute l'application serait gelée en attendant la réponse

</div>

<!--
Ce calcul est volontairement absurde (boucle vide) pour isoler le problème : le thread JS est unique, toute opération longue bloque tout le reste (rendu, clics, etc.).
Transition vers la slide suivante : et si, au lieu d'un calcul, c'était une requête réseau qui prenait du temps ?
-->
