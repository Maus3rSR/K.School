---
layout: two-cols-header
layoutClass: gap-x-4
---

# fetch() et le typage de la réponse

Récupérer des données, mais typées

::left::

```tsx {none|1-4|6|7|8|9|all}
interface Post {
  id: number
  title: string
}

async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data: Post[] = await response.json()
  console.log(data)
}
```

::right::

<div v-click="1">

Une `interface` décrit **la forme exacte** de ce que l'API renvoie

</div>

<div v-click="2">

`fetch(url)` retourne une **Promise** — `await` attend sa résolution avant de continuer

</div>

<div v-click="3">

`response.json()` transforme le corps de la réponse en objet JS — c'est aussi une Promise, donc aussi un `await`

</div>

<div v-click="4">

`data: Post[]` — TypeScript ne devine pas le type tout seul, on l'annonce explicitement

</div>

<!--
Insister : TypeScript ne peut PAS vérifier que l'API renvoie vraiment des Post — c'est une promesse (au sens figuré) qu'on fait au compilateur. Si l'API change, TypeScript ne le détectera pas.
Ouvrir l'URL JSONPlaceholder dans le navigateur avant ce slide pour montrer la vraie forme JSON brute.
Ne pas encore parler de useEffect ici — cette slide isole uniquement fetch + typage, indépendamment de React.
Rappeler que loadPosts() est une fonction async "libre", pas encore branchée à React — le lien avec useEffect arrive dans la slide suivante.
-->
