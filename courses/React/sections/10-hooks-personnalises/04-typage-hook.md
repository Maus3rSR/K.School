---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer un hook personnalisé

Paramètres, valeur de retour et generics

::left::

```tsx {all|1|3|4-5|all}
function useToggle(
  initialValue: boolean = false
): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(initialValue)
  function toggle() { setIsOpen((v) => !v) }

  return [isOpen, toggle]
}
```

::right::

<div v-click="1">

Un paramètre typé (`boolean`), avec une **valeur par défaut** — comme n'importe quelle fonction TypeScript.

</div>

<div v-click="2">

Le type de retour `[boolean, () => void]` est un **tuple** : la première position est toujours l'état, la seconde toujours la fonction.

</div>

<div v-click="3">

Sans cette annotation, TypeScript déduirait un tableau générique `(boolean | (() => void))[]` — impossible à déstructurer proprement en `[isOpen, toggle]`.

</div>

<!--
Faire le lien explicite avec useState : useState<T>() retourne déjà un tuple typé [T, Dispatch<SetStateAction<T>>]. Un hook personnalisé qui suit la même convention se sent "natif" pour qui l'utilise.
Annoncer que la prochaine slide montre un hook avec un generic <T> pour accepter n'importe quel type de donnée (useLocalStorage).
-->
