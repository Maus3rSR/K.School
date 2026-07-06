---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Pièges fréquents

Les erreurs que tout le monde fait au moins une fois

::left::

```tsx
// ❌ Piège 1 — dépendance oubliée : boucle infinie
useEffect(() => {
  setCount(count + 1)
}) // pas de tableau → se relance à chaque rendu

// ❌ Piège 2 — cleanup oublié
useEffect(() => {
  const id = setInterval(tick, 1000)
  // pas de return → l'intervalle continue après démontage
}, [])

// ❌ Piège 3 — useRef pour afficher une valeur
const countRef = useRef(0)
return <p>{countRef.current}</p>
// ne se met jamais à jour visuellement

// ❌ Piège 4 — utiliser inputRef avant le rendu
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current.focus() // 💥 null au premier rendu
```

::right::

**Les règles à retenir**

- Sans tableau de dépendances, un `useEffect` qui modifie le state **relance le rendu à l'infini**
- Tout `setInterval`/`setTimeout`/listener créé dans un Effet **doit** avoir un cleanup
- `useRef` ne re-rend jamais l'UI : pour afficher une valeur qui change, utiliser `useState`
- Un ref DOM n'existe qu'**après** le rendu — l'utiliser dans `useEffect`, jamais directement dans le corps du composant

<!--
Ces 4 pièges couvrent la quasi-totalité des bugs rencontrés chez les apprenants sur cette séance.
Bonus si le temps le permet : en StrictMode (dev uniquement), React exécute exprès l'Effet + son cleanup deux fois au montage pour révéler les cleanup manquants — un console.log qui s'affiche "deux fois" n'est pas un bug, c'est une vérification de robustesse.
Reproduire volontairement le piège 1 en live (regarder les warnings de la console) avant de le corriger.
-->
