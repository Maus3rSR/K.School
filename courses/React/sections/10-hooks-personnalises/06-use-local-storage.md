---
layout: two-cols-header
layoutClass: gap-x-4
---

# useLocalStorage — un hook générique

Synchroniser un state avec le stockage du navigateur

::left::

```tsx {all|1|2-5|7-12|14|all}{maxHeight:'350px'}
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

const [theme, setTheme] = useLocalStorage<string>('theme', 'light')
```

::right::

<div v-click="1">

`<T>` est un **generic** : le hook accepte n'importe quel type de valeur (string, number, objet...).

</div>

<div v-click="2">

L'état initial se lit dans `localStorage` **une seule fois**, via la forme fonction de `useState`.

</div>

<div v-click="3">

`useEffect` réécrit `localStorage` à chaque changement de `value` — combinaison de deux hooks déjà connus (S4 et S6).

</div>

<div v-click="4">

`as const` fige le type de retour en tuple, comme `useState` le fait nativement.

</div>

<!--
Ce hook combine tout ce qui a été vu depuis S4 : useState, useEffect (S6), et maintenant un generic <T>.
Bien montrer que ce n'est "que" la combinaison de deux hooks déjà connus, encapsulée derrière un nom parlant.
Piège potentiel : oublier `key` dans le tableau de dépendances si la clé peut changer dynamiquement.
-->
