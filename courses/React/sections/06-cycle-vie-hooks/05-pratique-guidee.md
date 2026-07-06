---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Message temporisé

À vous de jouer

::left::

```tsx
function FlashMessage() {
  const [show, setShow] = useState(false)

  // 1. Ajouter un useEffect qui s'exécute au montage
  //    (tableau de dépendances vide)

  // 2. À l'intérieur, utiliser setTimeout pour passer
  //    show à true après 2000ms

  return show ? <p>✅ Chargement terminé</p> : null
}
```

::right::

**À faire ensemble**

<v-click>

1. `useEffect(() => { ... }, [])`
2. `setTimeout(() => setShow(true), 2000)` à l'intérieur

</v-click>

<v-click>

**Solution**

```tsx
useEffect(() => {
  setTimeout(() => setShow(true), 2000)
}, [])
```

</v-click>

<!--
Laisser 5-7 minutes de pratique avant de révéler la solution.
Ne pas encore parler de cleanup ici, même si un apprenant attentif demandera "et si le composant disparaît avant les 2 secondes ?" — rebondir en disant que c'est exactement le sujet du prochain concept.
-->
