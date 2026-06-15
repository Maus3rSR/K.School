---
layout: image-right
image: /preserving-state-dom-tree.png
backgroundSize: contain
---

# Du composant au DOM
*Les composants forment une arborescence*

**Vos composants React** → **Component Tree** → **React DOM** → **Navigateur**

<v-click>

<br/>

## Comment ça s'organise

- `App` est le **point d'entrée** — il contient tout le reste
- Un composant peut en **contenir d'autres** (ex: `Page` contient `Header` + `Content`)
- Les composants **les plus petits** ne contiennent pas de composants enfants

</v-click>

<!--
Cette image montre le pipeline : composants React (déclaration) → React (le moteur) → DOM (le résultat visuel).
Important : React est un intermédiaire entre votre code et le navigateur.
-->

---
layout: image-left
image: https://cover.sli.dev?3
backgroundSize: cover
---

# Pourquoi cette arborescence ?

- **Flux de données** : du parent vers l'enfant (one-way data flow)
- **Rendu optimisé** : React sait quels nœuds modifier sans tout recalculer
- **Debug** : hiérarchie visible dans React DevTools

<v-click>

<br/>

> 💡 **Chaque composant retourne du JSX** → **ce JSX contient d'autres composants** → **arbre de rendu**

</v-click>

<!--
Préparer mentalement pour le state : quand un composant change d'état, React réévalue l'arbre à partir de ce point.
-->
