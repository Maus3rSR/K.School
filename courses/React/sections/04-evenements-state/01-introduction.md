---
layout: two-cols-header
layoutClass: gap-x-4
---

# Vos composants sont figés

Il est temps de les rendre vivants

::left::

```tsx
function LikeButton() {
  return (
    <button>
      ❤️ 0 likes
    </button>
  )
}
```

<button style="all: revert;">❤️ 0 likes</button>

**Problème**

Peu importe le nombre de clics, le compteur reste à `0`.

<v-click>

Le composant affiche toujours la même chose car il n'a **aucune mémoire**.

</v-click>

::right::

<div v-click="2">

**Ce qu'on veut**

Un composant qui **réagit** à l'utilisateur :

- Clic → le compteur monte
- Saisie → le texte s'affiche
- Soumission → le formulaire s'envoie

</div>

<div v-click="3">

**Ce qu'on va apprendre**

1. 🖱️ **Événements** — détecter les actions
2. 🧠 **useState** — mémoriser et mettre à jour

</div>

<!--
Partir du teaser de S3 : "rien ne bouge quand on clique".
Demander aux apprenants : "Pourquoi le 0 ne change pas ?" → amener la notion de mémoire.
L'image placeholder représente un bouton like figé vs animé — illustrer le "avant/après" de la séance.
-->
