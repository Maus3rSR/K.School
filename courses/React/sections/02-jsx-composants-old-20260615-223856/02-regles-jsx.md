---
layout: two-cols-header
---

# Les règles JSX

JSX est plus strict que HTML — voici les règles à retenir

::left::

## ✅ Valide

```tsx
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

::right::

## ❌ Invalide

```tsx
function Card() {
  return (
    // ❌ Deux éléments racine sans wrapper
    <img src="avatar.jpg">
    <p class="text-sm">
      Bonjour
    </p>
  )
}
```

<!--
Les deux erreurs les plus fréquentes des débutants : oublier le fragment et utiliser class au lieu de className.
Astuce : le convertisseur officiel https://transform.tools/html-to-jsx corrige ça automatiquement.
-->

---

# Les 4 règles JSX à retenir

<v-clicks>

- **Un seul élément racine** — utiliser `<>...</>` (Fragment) si besoin de plusieurs éléments

- **`className`** au lieu de `class` — `class` est un mot réservé en JavaScript

- **Balises auto-fermantes obligatoires** — `<img />`, `<br />`, `<input />`

- **Expressions JS dans `{ }`** — `{maVariable}`, `{2 + 2}`, `{user.name}`

</v-clicks>

<!--
Rythme : une règle à la fois avec v-clicks.
Insister sur className — c'est l'erreur numéro 1 des développeurs qui viennent du HTML pur.
-->

---
layout: two-cols-header
---

# JSX vs HTML — les différences clés

::left::

| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| `<img>` | `<img />` |
| `<br>` | `<br />` |

::right::

## Pourquoi ces différences ?

JSX est du **JavaScript** — les noms suivent les conventions JS :

- `class` et `for` sont des **mots réservés** JS
- Les événements sont en **camelCase** (`onClick`, `onChange`)
- Toutes les balises doivent être **fermées**

<div class="text-sm opacity-60 mt-4">

🔗 [Convertisseur HTML → JSX](https://transform.tools/html-to-jsx)

</div>

<!--
Outil pratique à partager : transform.tools/html-to-jsx
Rassurer : après quelques jours, className devient aussi naturel que class.
-->
