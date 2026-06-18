---
layout: two-cols-header
layoutClass: gap-x-4
---

# La prop spéciale `children`

Passer du contenu entre les balises

::left::

```tsx {all|1-3|6|10-13|all}
interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}

// Le contenu placé entre les balises :
<Card>
  <h2>Profil</h2>
  <p>Contenu libre…</p>
</Card>
```

::right::

<div v-click="1">

**`children` est une prop** comme les autres, mais **fournie automatiquement** par React : pas besoin de l'écrire côté parent.

</div>

<div v-click="2">

Son type : **`React.ReactNode`** — tout ce que React sait afficher (texte, JSX, liste…).

</div>

<div v-click="3">

Tout ce qui est placé **entre** `<Card>` et `</Card>` arrive dans `children`. Le composant l'**enveloppe** sans savoir ce que c'est.

</div>

<!--
Insister sur la différence avec une prop classique : ici on ne passe pas une valeur nommée, mais un CONTENU placé entre les balises.
React.ReactNode : ne pas trop détailler, juste "le type de tout contenu affichable".
La slide suivante traite les cas d'usage et le choix children vs props.
-->
