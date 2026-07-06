---
layout: two-cols-header
layoutClass: gap-x-4
---

# Gestion des erreurs réseau

fetch() ne réagit pas comme on l'imagine

::left::

````md magic-move
```tsx
// ❌ Une erreur HTTP passe inaperçue
fetch('https://jsonplaceholder.typicode.com/posts/9999')
  .then((res) => res.json())
  .then((data) => setPosts(data))
  .catch((err) => setError(err.message))
// .catch() ne se déclenche PAS sur une 404 !
```

```tsx
// ✅ Vérifier response.ok avant de continuer
fetch('https://jsonplaceholder.typicode.com/posts/9999')
  .then((res) => {
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    return res.json()
  })
  .then((data) => setPosts(data))
  .catch((err) => setError(err.message))
```
````

::right::

<v-click>

**Ce que `catch()` attrape vraiment**

- Panne réseau (pas de connexion, DNS...)
- Une erreur `throw`ée manuellement dans un `.then()`
- **Pas** un statut HTTP en erreur (404, 500...)

</v-click>

<v-click>

**La règle**

- Toujours vérifier `response.ok` avant `response.json()`
- Sinon `throw new Error(...)` pour forcer le passage dans `.catch()`

</v-click>

<!--
Faire l'expérience en live : appeler l'URL /posts/9999 (qui n'existe pas) sans la vérification res.ok, montrer que ça n'affiche PAS l'erreur mais un objet vide {} — bug silencieux typique.
C'est LE piège n°1 identifié dans le lexique (Response.ok) — bien prendre le temps ici.
-->
