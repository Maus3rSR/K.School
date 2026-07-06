---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le cleanup — nettoyer un Effet

Ce qui continue à tourner ne devrait pas continuer

::left::

````md magic-move
```tsx
// ❌ L'intervalle continue même après démontage
function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  return <p>{time.toLocaleTimeString()}</p>
}
```

```tsx
// ✅ Le cleanup arrête l'intervalle au démontage
function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(id)
  }, [])

  return <p>{time.toLocaleTimeString()}</p>
}
```
````

::right::

<v-click>

**Quand le cleanup s'exécute**

- Juste avant que l'Effet se relance
- Au démontage du composant

</v-click>

<v-click>

**Pourquoi c'est nécessaire**

- Sans cleanup, l'intervalle tourne dans le vide même quand `<Clock />` a disparu de l'écran
- Fuite mémoire, warnings React, bugs difficiles à reproduire

</v-click>

<!--
Reproduire le bug en live : afficher/masquer <Clock /> avec un state booléen, montrer dans la console que setInterval continue à tourner sans cleanup.
Le retour d'une fonction dans useEffect est LE mécanisme de cleanup — pas une convention parmi d'autres, la seule façon de faire.
Lien direct avec l'exercice précédent : le setTimeout du message temporisé avait le même problème potentiel.
-->
