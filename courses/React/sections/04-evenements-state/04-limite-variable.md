---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pourquoi pas une variable normale ?

Le problème de la mémoire locale

::left::

```tsx {monaco}
function Counter() {
  let count = 0  // réinitialisé à chaque rendu !

  function handleClick() {
    count = count + 1
    console.log("count =", count)  // ✅ change en mémoire
  }

  return (
    <div>
      <p>Compteur : {count}</p>  {/* ❌ affiche toujours 0 */}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

::right::

**Deux problèmes**

<v-click>

**1. React ne sait pas qu'il faut re-rendre**

Modifier `count` ne déclenche aucune mise à jour de l'affichage.

</v-click>

<v-click>

**2. La variable est réinitialisée à chaque rendu**

À chaque appel de la fonction `Counter()`, `let count = 0` repart de zéro.

</v-click>

<v-click>

**La solution : useState**

Un hook qui :
- 🧠 **Mémorise** la valeur entre les rendus
- 🔄 **Déclenche** un re-rendu quand la valeur change

</v-click>

<!--
Laisser les apprenants cliquer dans l'éditeur Monaco pour constater que le console.log affiche la bonne valeur, mais l'affichage ne bouge pas.
C'est le "aha moment" qui justifie useState.
-->
