---
layout: two-cols-header
layoutClass: gap-x-4
---

# La prop spéciale `children`

Passer du contenu entre les balises

::left::

```tsx {all|1-3|6|10-12|all}
interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}

// Le contenu placé entre les balises :
<Card>
  <h2>Kevin Unfricht</h2>
  <p>Formateur</p>
</Card>
```

::right::

<div v-click="1">

**`children` est une prop** comme les autres, fournie automatiquement par React.

</div>

<div v-click="2">

Son type : **`React.ReactNode`** — tout ce que React sait afficher (texte, JSX...).

</div>

<div v-click="3">

Tout ce qui est **entre** `<Card>` et `</Card>` arrive dans `children`.

</div>

<div v-click="4">

> 💡 C'est la composition de la séance 2, rendue **flexible** : `Card` devient un emballage réutilisable.

</div>

<!--
Relier explicitement à la composition vue en séance 2 : ici l'enfant n'est plus fixé dans le composant, il est fourni par le parent.
React.ReactNode : ne pas trop détailler, juste "le type de tout contenu affichable".
Exemple parlant : un composant Card, Modal ou Layout qui enveloppe n'importe quel contenu.
-->
