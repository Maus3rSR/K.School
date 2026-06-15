---
layout: two-cols-header
layoutClass: gap-x-4
---

# Anatomie d'un composant React

Un composant = une **fonction JavaScript** qui retourne du JSX

::left::

```tsx {none|1|3|4-8|10|all}
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

📤 **`export default`** — rend le composant importable

</div>

<!--
Insister sur PascalCase : React différencie <button> (balise HTML) de <Button> (composant) grâce à la casse.
Référence officielle : https://react.dev/learn/your-first-component
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Export : default vs named

::left::

## `export default`

```tsx
// Un seul par fichier
function Button() {
  return <button>Cliquer</button>
}

export default Button
```

```tsx
// Import sans accolades
import Button from './Button'
```

::right::

## Named export

```tsx
// Plusieurs par fichier possible
export function PrimaryButton() {
  return <button className="primary">...</button>
}

export function SecondaryButton() {
  return <button className="secondary">...</button>
}
```

```tsx
// Import avec accolades
import { PrimaryButton, SecondaryButton }
  from './Buttons'
```

<!--
Convention K.School : 1 composant = 1 fichier → préférer export default.
Named exports utiles pour des collections de petits composants liés (ex: icônes, variantes).
Référence : https://react.dev/learn/importing-and-exporting-components
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Importer et utiliser un composant

::left::

````md magic-move
```tsx
// App.tsx — point de départ
function App() {
  return (
    <div>
      Bonjour
    </div>
  )
}

export default App
```

```tsx
// App.tsx — après import
import Button from './Button'

function App() {
  return (
    <div>
      Bonjour
    </div>
  )
}

export default App
```

```tsx
// App.tsx — après utilisation
import Button from './Button'

function App() {
  return (
    <div>
      Bonjour
      <Button />
    </div>
  )
}

export default App
```
````

::right::

<div v-click="1">

**Étape 1** — Importer le composant depuis son fichier

</div>

<div v-click="2">

**Étape 2** — L'utiliser comme une balise JSX en PascalCase

</div>

<!--
Magic Move : montrer l'évolution progressive du fichier App.tsx.
Insister : <Button /> se comporte exactement comme une balise HTML, mais c'est notre code.
-->
