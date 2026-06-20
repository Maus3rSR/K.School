---
layout: two-cols-header
layoutClass: gap-x-4
---

# Les événements React

Détecter les actions de l'utilisateur

::left::

```tsx
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

<v-click>

**Événements courants**

| JSX | Action |
|-----|--------|
| `onClick` | clic souris |
| `onChange` | saisie dans un champ |
| `onSubmit` | soumission de formulaire |
| `onMouseEnter` | survol |

</v-click>

::right::

**Deux règles essentielles**

<div v-click="2">

✅ On **passe** la fonction (sans l'appeler)

```tsx
<button onClick={handleClick}>  {/* ✅ */}
```

</div>

<div v-click="3">

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
