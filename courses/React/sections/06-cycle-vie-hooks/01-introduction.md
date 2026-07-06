---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le focus automatique — un problème nouveau

Ce que vous savez déjà faire, et ce qui manque

::left::

```tsx
function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // ❓ Comment donner le focus à cet input
      // dès que le composant apparaît à l'écran,
      // sans que l'utilisateur clique dessus ?
    />
  )
}
```

::right::

**Ce que vous maîtrisez**

- `useState` pour mémoriser une valeur
- Rendu conditionnel et listes
- Réagir à un événement (`onClick`, `onChange`)

::bottom::

<v-click>

**Ce qui manque**

- Exécuter du code **au moment précis** où le composant apparaît
- Accéder **directement** à l'élément DOM `<input>`
- Nettoyer une action si le composant disparaît

</v-click>

<!--
Reprendre le teaser de S5 : "que se passe-t-il quand un composant apparaît / disparaît ?"
Demander : "Avec ce qu'on sait, comment feriez-vous pour mettre le focus au chargement ?" → aucune réponse satisfaisante avec state/props seuls.
Ce problème du focus automatique sera résolu concrètement en fin de séance avec useEffect + useRef combinés.
-->
