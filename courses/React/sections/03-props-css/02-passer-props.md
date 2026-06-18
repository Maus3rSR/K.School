---
layout: two-cols-header
layoutClass: gap-x-4
---

# Passer des props

Le parent transmet des données à l'enfant

::left::

```tsx {all|3-4|all}
function Profile() {
  return (
    <Card name="Kevin Unfricht"
          role="Formateur" />
  )
}
```

::right::

**Comme des attributs JSX**

`name` et `role` ressemblent à des attributs HTML, mais vous y passez **vos propres données**.

<div v-click="1">

**Une prop = un réglage**

- `name="Kevin Unfricht"` → une chaîne
- `role="Formateur"` → une chaîne

Comme les **arguments** d'une fonction : ce sont les seules entrées d'un composant.

</div>

<!--
Insister : les props se déclarent côté PARENT, à l'endroit où on utilise le composant.
Piège fréquent : confondre le nom de la prop (côté parent) et la variable interne (côté enfant) — c'est le même nom mais deux endroits.
Pour des valeurs non textuelles (nombre, booléen), on utilisera des accolades : size={100} — à voir juste après.
-->
