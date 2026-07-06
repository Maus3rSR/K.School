---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Pièges fréquents

Les erreurs que tout le monde fait au moins une fois

::left::

```tsx
// ❌ Piège 1 — oublier response.ok
fetch(url).then((res) => res.json()) // une 404 passe comme si de rien n'était

// ❌ Piège 2 — dépendance oubliée : fetch en boucle
useEffect(() => {
  fetch(url).then((data) => setPosts(data))
}) // pas de tableau → un fetch à CHAQUE rendu

// ❌ Piège 3 — fetch dans le corps du composant
function PostList() {
  fetch(url).then(...) // hors de useEffect : boucle infinie garantie
  return <ul>...</ul>
}

// ❌ Piège 4 — race condition (id qui change vite)
useEffect(() => {
  fetch(`/posts/${id}`).then((data) => setPost(data))
}, [id]) // la réponse la plus lente peut écraser la bonne
```

::right::

**Les règles à retenir**

- Toujours vérifier `response.ok` avant `response.json()`
- Un `fetch` dans `useEffect` a **besoin** d'un tableau de dépendances, comme n'importe quel Effet (S6)
- Un `fetch` ne doit **jamais** être appelé directement dans le corps du composant
- Si l'id change rapidement, la dernière réponse reçue n'est pas forcément la bonne — un `AbortController` permet d'annuler l'ancienne requête (sujet avancé, à explorer plus tard)

<!--
Ces 4 pièges couvrent la quasi-totalité des bugs rencontrés chez les apprenants sur cette séance.
Le piège 4 (race condition) : mention rapide seulement, ne pas développer AbortController en détail — juste planter la graine pour plus tard.
Reproduire le piège 1 en live avec l'URL /posts/9999 pour bien ancrer la leçon.
-->
