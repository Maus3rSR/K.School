---
layout: two-cols-header
layoutClass: gap-x-4
---

# Asynchrone : deux façons de l'écrire

Utilisation des promesses, deux syntaxes

::left::

```ts
// Style .then() / .catch() / .finally()
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log('Terminé'))
```

```ts
// Style async/await
async function loadPosts() {
  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    )
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('Terminé')
  }
}
```

::right::

<div v-click="1">

`fetch()` renvoie toujours une **Promise**, quelle que soit la syntaxe utilisée

</div>

<div v-click="2">

`await` met en pause **cette fonction précise** jusqu'à ce que la Promise se résolve — le reste de l'application continue de tourner

</div>

<div v-click="3">

`try` / `catch` / `finally` remplacent `.then()` / `.catch()` / `.finally()` — mêmes rôles, écriture séquentielle

</div>

<div v-click="4">

**Dans ce cours** : on utilise `async/await`, la syntaxe la plus proche du code "normal" et la plus courante en entreprise aujourd'hui

</div>

<!--
Bien insister : ce n'est PAS deux concepts différents, c'est du sucre syntaxique — async/await est construit au-dessus des Promises.
await ne peut être utilisé qu'à l'intérieur d'une fonction async — piège classique qui sera reformulé au moment de useEffect (S7 suite).
Certains apprenants auront vu du .then() dans des tutoriels/Stack Overflow — les rassurer : ils sauront lire les deux, on écrit juste en async/await.
-->
