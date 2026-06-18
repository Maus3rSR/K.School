---
layout: two-cols-header
layoutClass: gap-x-4
---

# Un fichier CSS par composant

Organiser le style à côté du composant

::left::

```tsx
// Card.tsx
import './Card.css'

function Card({ name }: CardProps) {
  return <div className="card">{name}</div>
}
```

```css
/* Card.css */
.card {
  padding: 16px;
  border-radius: 12px;
  background: #f4f4f5;
}
```

::right::

**Importer la feuille de style**

`import './Card.css'` charge le CSS du composant. Pas de variable : l'import suffit.

<div v-click="1">

**Une convention simple**

- `Card.tsx` → le composant
- `Card.css` → son style
- Côte à côte dans le même dossier

</div>

<!--
React n'impose AUCUNE méthode de style : ici on montre la plus simple (fichiers CSS classiques importés).
Mentionner qu'il existe d'autres approches (CSS Modules, styled-components, Tailwind) sans les détailler — hors périmètre débutant.
Insister sur la convention "1 composant = 1 fichier + son CSS" pour garder un projet lisible.
-->
