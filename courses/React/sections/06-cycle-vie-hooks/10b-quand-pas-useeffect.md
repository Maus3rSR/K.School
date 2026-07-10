---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Vous n'avez pas forcément besoin d'un Effet

useEffect synchronise avec l'extérieur — pas avec soi-même

::left::

```tsx
// ❌ useEffect pour calculer depuis le state
const [firstName, setFirstName] = useState('Jean')
const [lastName, setLastName] = useState('Dupont')
const [fullName, setFullName] = useState('')

useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])
// → 2 rendus, code inutilement complexe
```

<div v-click class="mt-4">

```tsx
// ✅ Variable dérivée — calculée pendant le rendu
const [firstName, setFirstName] = useState('Jean')
const [lastName, setLastName] = useState('Dupont')

const fullName = `${firstName} ${lastName}`
// → 1 rendu, simple et lisible
```

</div>

::right::

**useEffect ne sert pas à…**

- Calculer une valeur depuis d'autres states → **variable dérivée**
- Mettre à jour un state quand un autre change → **gestionnaire d'événement**
- Transformer des props pour l'affichage → **calcul dans le rendu**

<div v-click="1">

**useEffect sert à synchroniser avec un système extérieur**

- API du navigateur (`document.title`, `focus()`, `setInterval`…)
- Connexion réseau, WebSocket
- Widget ou bibliothèque non-React

</div>

<!--
Ce slide fait le lien avec S5 : "une valeur qu'on peut calculer depuis le state n'a pas besoin d'être un state".
Le même principe s'applique ici : si le calcul n'implique aucun système extérieur, pas besoin d'un Effet.
Un useEffect + setState inutile crée toujours un rendu supplémentaire — l'apprenant le verra dans React DevTools.
Référence doc : https://fr.react.dev/learn/you-might-not-need-an-effect
-->
