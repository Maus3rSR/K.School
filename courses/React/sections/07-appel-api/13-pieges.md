---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Pièges fréquents

Les erreurs que tout le monde fait au moins une fois

::left::

```tsx
// ❌ Piège 1 — useEffect async directement : erreur TypeScript
useEffect(async () => {
  const res = await fetch(url) // interdit : useEffect n'attend pas de Promise
}, [])

// ❌ Piège 2 — oublier response.ok
const res = await fetch(url)
const data = await res.json() // une 404 passe comme si de rien n'était

// ❌ Piège 3 — dépendance oubliée : fetch en boucle
useEffect(() => {
  loadPosts()
}) // pas de tableau → un fetch à CHAQUE rendu

// ❌ Piège 4 — fetch dans le corps du composant
function PostList() {
  loadPosts() // hors de useEffect : boucle infinie garantie
  return <ul>...</ul>
}

// ❌ Piège 5 — race condition (id qui change vite)
useEffect(() => {
  loadPost(id)
}, [id]) // la réponse la plus lente peut écraser la bonne
```

::right::

**Les règles à retenir**

- Le callback de `useEffect` ne peut jamais être `async` — toujours une fonction `async` interne, appelée juste après
- Toujours vérifier `response.ok` avant `response.json()`
- Un `fetch` dans `useEffect` a **besoin** d'un tableau de dépendances, comme n'importe quel Effet (S6)
- Un `fetch` ne doit **jamais** être appelé directement dans le corps du composant
- Si l'id change rapidement, la dernière réponse reçue n'est pas forcément la bonne — un `AbortController` permet d'annuler l'ancienne requête (sujet avancé, à explorer plus tard)

<!--
Ces 5 pièges couvrent la quasi-totalité des bugs rencontrés chez les apprenants sur cette séance.
Le piège 1 est nouveau avec l'écriture async/await : bien montrer le message d'erreur TypeScript exact ("Type 'Promise<void>' is not assignable to type 'void | Destructor'") pour qu'ils le reconnaissent en autonomie.
Le piège 5 (race condition) : mention rapide seulement, ne pas développer AbortController en détail — juste planter la graine pour plus tard.
Reproduire le piège 2 en live avec l'URL /posts/9999 pour bien ancrer la leçon.
-->
