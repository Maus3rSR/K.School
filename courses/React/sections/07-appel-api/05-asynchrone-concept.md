---
layout: two-cols-header
layoutClass: gap-x-4
---

# Une requête réseau ne bloque pas (elle aussi)

Contrairement au calcul précédent, `fetch` laisse la main immédiatement

::left::

```ts {monaco-run} {autorun:false}
console.log('1. Début du script')

// La requête est envoyée tout de suite...
fetch(
    'https://jsonplaceholder.typicode.com/posts/1'
)
  .then(() => 
    console.log('2. Requête terminée, réponse reçue !')
  )

// ...pendant que ce calcul synchrone bloque tout le reste pendant 2 secondes
console.log('3. Calcul synchrone en cours...')
const start = Date.now()
while (Date.now() - start < 2000) {
  // boucle bloquante
}
console.log('4. Calcul terminé')
```

::right::

<div v-click="1">

`fetch` **envoie la requête** puis rend immédiatement la main, sans attendre la réponse

</div>

<div v-click="2">

Elle est envoyée **avant** la boucle bloquante, et voyage sur le réseau pendant que celle-ci tourne encore

</div>

<div v-click="3">

Cliquez sur **Run** : l'ordre des logs est **1 → 3 → 4 → 2**, jamais 1 → 2 → 3 → 4, même si le `fetch` a été lancé en premier

</div>

<div v-click="4">

Le `.then(...)` ne peut s'exécuter **qu'une fois le calcul synchrone terminé** : JavaScript ne traite la réponse que lorsque le fil d'exécution se libère

</div>

<!--
Cliquer sur le bouton Run pour exécuter le code en direct : les apprenants voient que "2. Requête terminée" arrive après "4. Calcul terminé", même si le fetch a été lancé avant la boucle bloquante.
Analogie utile : commander un plat au restaurant. Vous passez commande (vous ne restez pas figé devant le serveur), vous continuez à discuter, et le plat arrive plus tard. JavaScript fonctionne pareil avec le réseau.
Le .then() est introduit ici volontairement pour observer QUAND la réponse arrive, sans encore l'expliquer en détail (syntaxe détaillée des Promises vue à la slide suivante).
Insister : le thread JS reste unique, même pour une opération asynchrone — la réponse déjà arrivée doit attendre que le thread se libère pour être traitée.
-->
