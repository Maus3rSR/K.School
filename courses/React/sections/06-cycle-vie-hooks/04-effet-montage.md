---
layout: two-cols-header
layoutClass: gap-x-4
---

# L'Effet au montage

Exécuter du code une seule fois, à l'apparition du composant

::left::

```tsx {all|2|4-9|5-7|all}
function WelcomeBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('Le composant vient d\'apparaître')
    setVisible(true)
  }, [])

  return visible ? <p>Bienvenue !</p> : null
}
```

::right::

<div v-click="1">

`useState(false)` — rien de nouveau, un booléen d'affichage

</div>

<div v-click="2">

`useEffect(() => {...}, [])` — le tableau vide signifie "au montage uniquement"

</div>

<div v-click="3">

Le `console.log` et `setVisible(true)` s'exécutent **une fois**, juste après le premier rendu

</div>

<div v-click="4">

Résultat : le composant se rend d'abord sans le message, puis l'Effet met à jour le state → **second rendu** avec le message

</div>

::bottom::

<Alert v-click type="error" class="mt-2">
  <strong>Attention !</strong> Cet exemple illustre le <strong>timing</strong> de <code>useEffect</code>, pas un modèle à reproduire. <code>setVisible(true)</code> dans un Effet provoque un second rendu inutile — <code>useState(true)</code> suffit. Réserver <code>useEffect</code> aux interactions avec un système <strong>extérieur</strong> (DOM, timer, réseau).
</Alert>

<!--
Faire tourner ce code en live et montrer dans la console : le composant se rend AVANT que l'Effet ne s'exécute.
Bien insister : useEffect s'exécute APRÈS le rendu, jamais pendant. C'est la clé pour comprendre pourquoi on ne peut pas mettre document.title directement dans le corps du composant.
Le warning visible dans la slide évite que les apprenants copient ce pattern. Insister : useState(true) suffit ici, useEffect est en trop.
-->
