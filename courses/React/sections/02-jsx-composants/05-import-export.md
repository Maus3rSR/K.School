---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exporter un composant

Pour qu'un composant soit utilisable ailleurs, il faut l'**exporter**

::left::

Cas d'un export unique: export par défaut

```tsx
// Button.tsx
function Button() {
  return <button>Cliquer</button>
}

export default Button
```

Ailleurs dans un autre composant

```tsx
// Import du composant Button
import Button from './Button'
```

::right::

<v-click>

Cas d'un export multiple: les exports nommés

```tsx
// Plusieurs par fichier
export function PrimaryButton() { ... }
export function SecondaryButton() { ... }
```

Ailleurs dans un autre composant

```tsx
// Import avec accolades
import { PrimaryButton } from './Buttons'
```

</v-click>

::bottom::

> 💡 Import/Export sont des fonctionnalités JavaScript ES6 (2015)

<!--
Convention : 1 composant = 1 fichier → préférer export default.
Ne pas s'attarder sur named exports — juste mentionner que ça existe.
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

```tsx {1-2}
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

```tsx {8}
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

<div v-click="3">

**Étape 3** — Le composant s'affiche là où on l'appelle, comme une balise HTML

  <br/>

  <div>
      Bonjour
      <button style="all: revert;">Cliquer Ici</button>
  </div>

</div>

<!--
Montrer l'évolution progressive du fichier App.tsx.
Insister : <Button /> se comporte exactement comme une balise HTML, mais c'est notre code.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Composant vs balise HTML

::left::

## Balise HTML native

```tsx
function App() {
  return (
    <div>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </div>
  )
}
```

Éléments du DOM réels (navigateur)

::right::

## Composant React personnalisé

```tsx
function App() {
  return (
    <div>
      <Header />
      <Card />
    </div>
  )
}
```

Éléments définis par vous (dans d'autres fichiers)

<v-click>

> 💡 **PascalCase** (première lettre majuscule) = composant React<br/>
> **minuscule** = balise HTML standard

</v-click>

<!--
Cette distinction est fondamentale. React utilise la casse pour différencier.
Insister sur cette convention lors des exercices.
-->
