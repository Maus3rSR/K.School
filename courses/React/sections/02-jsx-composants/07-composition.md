---
layout: two-cols-header
layoutClass: gap-x-4
---

# Composer des composants

Un composant peut en **contenir** d'autres

::left::

```tsx {none|1-5|7-11|13-20|all}
function Avatar() {
  return (
    <img src="photo.jpg" alt="Avatar" />
  )
}

function Label({ text }: { text: string }) {
  return (
    <p>{text}</p>
  )
}

function Card() {
  return (
    <div className="card">
      <Avatar />
      <Label text="Kevin Unfricht" />
    </div>
  )
}
```

::right::

<div v-click="1">

**`Avatar`** — composant feuille, affiche une image

</div>

<div v-click="2">

**`Label`** — composant feuille, affiche du texte

</div>

<div v-click="3">

**`Card`** — composant parent qui **compose** les deux

</div>

<div v-click="4">

> C'est la puissance de React : assembler des briques simples pour créer des interfaces complexes.

</div>

<!--
Introduire { text } dans Label très brièvement — juste montrer que ça existe.
Les props seront approfondies en séance 3.
-->

---
layout: image-right
image: /component-decomposition.jpg
backgroundSize: contain
---

# Décomposer une UI en composants

Casser l'UI en une hiérarchie de composants

<div class="space-y-1">

**App**

<div class="pl-6">

→ **HomePage**

</div>

<div class="pl-12">

→ **Header**

</div>

<div class="pl-12">

→ **SearchBar**

</div>

<div class="pl-12">

→ **EmployeeList**

</div>

<div class="pl-16">

→ **EmployeeListItem**

</div>

</div>

<v-click>

<br/>

**Règle du principe de responsabilité unique** :

Un composant = une seule chose.<br/>S'il grossit → le découper.

</v-click>

<!--
Image : Employee Directory avec les composants annotés (rectangles colorés).
Chaque couleur = un niveau de la hiérarchie.
Principe de responsabilité unique = concept clé à ancrer ici.
La question qui suit naturellement : "OK mais comment je décide où couper ?" → Atomic Design.
-->
