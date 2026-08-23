# Exercice 01 — La fiche de monstre dépliable

> Réf. officielle : [Reusing Logic with Custom Hooks](https://fr.react.dev/learn/reusing-logic-with-custom-hooks)

## Objectif

Extraire la logique d'un boolean "ouvert / fermé" dans un hook personnalisé
`useToggle`, puis l'utiliser pour afficher ou masquer la fiche d'un monstre.

**Durée estimée** : 15 min

---

## Prérequis

- Savoir utiliser `useState`.
- Avoir vu en cours la convention de nommage `useXxx`.

---

## Fichier à éditer

```
BasculeMonstre.tsx
```

---

## Instructions

1. Crée une fonction `useToggle(initial = false)` dans le même fichier.
2. À l'intérieur, initialise un `useState<boolean>(initial)`.
3. Crée une fonction `toggle` qui inverse la valeur.
4. Retourne un **tuple** typé `[boolean, () => void]`.
5. Remplace le `useState` et la fonction `toggle` du composant par un appel à
   `useToggle()`.

---

## Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Tuple ou objet ?</strong></summary>

`useState` retourne un tuple `[value, setter]`. Pour rester proche des
conventions React, `useToggle` peut faire de même : `[isOpen, toggle]`.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  function toggle() {
    setValue((v) => !v);
  }
  return [value, toggle];
}
```
</details>

---

## Critères de réussite

- [ ] Le bouton affiche "Afficher" quand la fiche est fermée et "Masquer" quand
      elle est ouverte.
- [ ] La fiche du monstre s'affiche et se masque au clic.
- [ ] Aucune erreur TypeScript.
