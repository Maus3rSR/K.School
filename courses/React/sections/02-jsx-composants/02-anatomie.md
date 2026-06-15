---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un composant React

Un composant = une **fonction JavaScript** qui retourne du markup

::left::

```tsx {all|1|3|4-8|11|all}
// Button.tsx

function Button() {
  return (
    <button>
      Cliquer ici
    </button>
  )
}

export default Button
```

Lors du rendu par React, cela affichera :
<br/><br/>
<button style="all: revert;">Cliquer Ici</button>

::right::

<div v-click="1">

📄 **Fichier `.tsx`** — TypeScript + JSX

</div>

<div v-click="2">

🐪 **Nom en PascalCase** — obligatoire, distingue les composants des balises HTML

</div>

<div v-click="3">

↩️ **`return` du JSX** — décrit ce qui sera affiché

</div>

<div v-click="4">

📤 **`export default`** — rend le composant utilisable dans d'autres composants React

</div>

<!--
Insister sur PascalCase : React différencie <button> (balise HTML) de <Button> (composant) grâce à la casse.
Référence officielle : https://react.dev/learn/your-first-component
-->
