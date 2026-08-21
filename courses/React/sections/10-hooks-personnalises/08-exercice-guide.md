---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — useCounter

À faire ensemble

::left::

Vous partez de ce composant, avec la logique en dur :

```tsx
function Cart() {
  const [count, setCount] = useState(0)

  function increment() { setCount((c) => c + 1) }
  function decrement() { setCount((c) => c - 1) }
  function reset() { setCount(0) }

  return <p>{count} article(s)</p>
}
```

::right::

**Consignes**

<v-click>

1. Créer un hook `useCounter(initial: number = 0)`
2. Retourner un **objet** `{ count, increment, decrement, reset }`
3. Typer le paramètre et la valeur de retour
4. Utiliser `useCounter` dans `Cart` et dans un second composant `StockCounter`

</v-click>

::bottom::

<v-click>

**Critère de réussite**

- `Cart` et `StockCounter` utilisent chacun `useCounter` avec un état indépendant
- `reset()` remet toujours le compteur à sa valeur initiale, même différente de 0

</v-click>

<!--
Exercice collectif de 15-20 minutes. Domaine volontairement différent des exemples (compteur), pour vérifier la transposition du raisonnement plutôt que la copie.
Aide graduée : indice 1 "quel type de retour, tuple ou objet, et pourquoi ?", indice 2 "où placer la valeur initiale dans le useState ?", indice 3 montrer la fonction reset qui capture initial via une closure.
-->
