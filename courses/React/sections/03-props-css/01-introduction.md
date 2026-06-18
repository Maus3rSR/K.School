---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pourquoi les props ?

Le même composant, des données différentes

::left::

```tsx
function Card() {
  return (
    <div className="card">
      <h2>Kevin Unfricht</h2>
      <p>Formateur</p>
    </div>
  )
}

// Trois cartes... toujours identiques
<Card />
<Card />
<Card />
```

::right::

**Le problème**

Vos composants de la séance 2 sont **figés** : `Card` affiche toujours la même personne.

<v-click>

**La solution : les props**

- Passer des **données** au composant
- Le rendre **réutilisable** avec des valeurs différentes

> 💬 Souvenez-vous : **UI = f(data)**

</v-click>

<!--
Faire le lien explicite avec le teaser de la séance 2 (UI = f(data)).
Demander aux apprenants : "Comment afficheriez-vous trois personnes différentes sans copier-coller le composant ?" → amener la notion de paramètre.
Analogie : une prop est comme un argument de fonction.
-->
