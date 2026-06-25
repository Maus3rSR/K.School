---
layout: two-cols-header
layoutClass: gap-x-4
---

# Les événements React

Détecter les actions de l'utilisateur

::left::

```tsx {none|7|2-4|all}
function Button() {
  function handleClick() {
    console.log("Cliqué !")
  }

  return (
    <button onClick={handleClick}>
      Cliquer ici
    </button>
  )
}
```

<div v-click="1">

`onClick` — prop JSX qui écoute le clic sur l'élément

</div>

<div v-click="2">

`handleClick` — la fonction exécutée lors du clic

</div>

<div v-click="3">

📎 [Liste complète des événements DOM sur MDN](https://developer.mozilla.org/fr/docs/Web/Events)

</div>

::right::

<div v-click="4">

**Deux règles essentielles**

✅ On **passe** la fonction (sans l'appeler)

```tsx
<button onClick={handleClick}>  {/* ✅ */}
```

</div>

<div v-click="5">

❌ On n'**appelle pas** la fonction immédiatement

```tsx
<button onClick={handleClick()}>  {/* ❌ */}
```

> `handleClick()` s'exécute au rendu, pas au clic.  
> Le composant peut boucler indéfiniment.

</div>

<!--
La confusion onClick={fn} vs onClick={fn()} est LE piège classique des débutants.
Analogie : on donne le numéro de téléphone à appeler (la fonction), on ne passe pas l'appel maintenant.
Vérifier que tout le monde voit la différence avant de passer à la suite.
-->
