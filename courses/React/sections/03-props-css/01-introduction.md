---
layout: image-right
image: /intro-houses.jpg
backgroundSize: cover
---

# Pourquoi les props ?

Le même composant, des données différentes

```tsx
function Card() {
  return (
    <div className="card">
      <h2>Ada Lovelace</h2>
      <p>Pionnière du code</p>
    </div>
  )
}

// Trois cartes... toujours identiques
<Card />
<Card />
<Card />
```

**Le problème** — Vos composants sont **figés** : `Card` affiche toujours la même personne.

<v-click>

**La solution : les props** — Passer des **données** pour rendre le composant **réutilisable**

> 💬 Souvenez-vous : **UI = f(data)**

</v-click>

<div class="absolute bottom-2 right-3 text-xs opacity-50">📷 Spencer Everett · Unsplash</div>

<!--
Faire le lien explicite avec le teaser de la séance 2 (UI = f(data)).
Demander aux apprenants : "Comment afficheriez-vous trois personnes différentes sans copier-coller le composant ?" → amener la notion de paramètre.
Analogie : une prop est comme un argument de fonction.
-->
