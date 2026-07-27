---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pourquoi le code doit parfois "attendre"

Une requête réseau ne répond pas instantanément

::left::

```ts {none|1-3|5-8|all}
// Synchrone : chaque ligne bloque la suivante
const total = 2 + 2
console.log(total) // s'exécute immédiatement

// Une requête réseau prend du temps
// (dizaines à centaines de millisecondes)
fetch('https://jsonplaceholder.typicode.com/posts')
// Le reste du code ne peut pas "attendre" ici
```

::right::

<div v-click="1">

Le code **synchrone** s'exécute ligne par ligne, chaque instruction attend la précédente

</div>

<div v-click="2">

Une requête réseau est **asynchrone** : le navigateur l'envoie, puis continue à exécuter la suite pendant que la réponse voyage sur le réseau

</div>

<div v-click="3">

Sans un mécanisme dédié, impossible de dire "récupère cette valeur **quand elle sera prête**, sans bloquer tout le reste"

</div>

<!--
Analogie utile : commander un plat au restaurant. Vous passez commande (vous ne restez pas figé devant le serveur), vous continuez à discuter, et le plat arrive plus tard. JavaScript fonctionne pareil avec le réseau.
Ne pas encore mentionner Promise ou async/await ici — cette slide isole uniquement le problème (pourquoi on a besoin d'un mécanisme), la solution arrive ensuite.
Insister : c'est un problème de JavaScript en général, pas spécifique à React.
-->
