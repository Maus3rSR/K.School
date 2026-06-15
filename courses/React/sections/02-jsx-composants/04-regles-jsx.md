---
layout: two-cols-header
layoutClass: gap-x-4
---

# Les règles JSX

JSX est plus strict que HTML — 4 règles à retenir

::left::

````md magic-move
```tsx
// ❌ Code HTML — invalide en JSX
function Card() {
  return (
    <img src="avatar.jpg">
    <p class="text-sm">
      Bonjour
    </p>
  )
}
```

```tsx {4-9|6}
// ✅ Règle 1 — un seul élément racine
function Card() {
  return (
    <>
      <img src="avatar.jpg">
      <p class="text-sm">
        Bonjour
      </p>
    </>
  )
}
```

```tsx {6|5}
// ✅ Règle 2 — className au lieu de class
function Card() {
  return (
    <>
      <img src="avatar.jpg">
      <p className="text-sm">
        Bonjour
      </p>
    </>
  )
}
```

```tsx {5}
// ✅ Règle 3 — balises auto-fermantes
function Card() {
  return (
    <>
      <img src="avatar.jpg" />
      <p className="text-sm">
        Bonjour
      </p>
    </>
  )
}
```

```tsx
// ✅ Règle 4 — expressions JS dans { }
function Card({ title }: { title: string }) {
  return (
    <>
      <img src="avatar.jpg" />
      <p className="text-sm">
        {title}
      </p>
    </>
  )
}
```
````

::right::

<div v-click="1">

**Règle 1** — Un seul élément racine<br/>
Utiliser `<>...</>` (Fragment) si besoin

</div>

<div v-click="2">

**Règle 2** — `className` au lieu de `class`<br/>
`class` est un mot réservé en JavaScript

</div>

<div v-click="4">

**Règle 3** — Balises auto-fermantes<br/>
`<img />`, `<br />`, `<input />`

</div>

<div v-click="6">

**Règle 4** — Expressions JS dans `{ }`<br/>
`{maVariable}`, `{2 + 2}`, `{user.name}`

</div>

<!--
Magic Move : partir du code HTML invalide et corriger une règle à la fois.
Insister sur className — c'est l'erreur numéro 1 des développeurs qui viennent du HTML pur.
Outil utile à partager : https://transform.tools/html-to-jsx
-->
