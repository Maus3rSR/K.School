---
layout: image-left
image: /children-composition.webp
backgroundSize: cover
---

# La prop spéciale `children`

Passer du contenu entre les balises

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

<div v-click="1">**`children`** est fournie **automatiquement** par React.</div>

<div v-click="2">Type : **`React.ReactNode`** — tout ce que React sait afficher.</div>

<div v-click="3">Tout ce qui est entre `<Card>…</Card>` arrive dans `children`.</div>

<div class="absolute bottom-2 right-3 text-xs opacity-50">📷 yourhustler.com</div>

<!--
Insister sur la différence avec une prop classique : ici on ne passe pas une valeur nommée, mais un CONTENU placé entre les balises.
React.ReactNode : ne pas trop détailler, juste "le type de tout contenu affichable".
La slide suivante traite les cas d'usage et le choix children vs props.
-->
