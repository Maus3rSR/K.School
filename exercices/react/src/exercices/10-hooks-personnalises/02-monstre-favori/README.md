# Exercice 02 — Le monstre favori

> Réf. officielle : [Synchronizing with Effects](https://fr.react.dev/learn/synchronizing-with-effects)

## Objectif

Créer un hook `useLocalStorage` qui garde une valeur synchronisée avec le
stockage du navigateur, puis l'utiliser pour mémoriser le monstre favori du
dresseur.

**Durée estimée** : 20 min

---

## Prérequis

- Exercice 01 terminé.
- Connaître `useState` et `useEffect`.
- Savoir lire et écrire dans `localStorage`.

---

## Fichier à éditer

```
MonstreFavori.tsx
```

---

## Instructions

1. Crée `useLocalStorage<T>(key: string, initialValue: T)` qui retourne un tuple
   `[T, (value: T) => void]`.
2. Initialise le state avec la **forme fonction** de `useState` : lis
   `localStorage.getItem(key)` ; si une valeur existe, retourne `JSON.parse`,
   sinon `initialValue`.
3. Ajoute un `useEffect` qui écrit `JSON.stringify(value)` dans
   `localStorage.setItem(key, ...)` à chaque changement de `value` ou de `key`.
4. Remplace le `useState(1)` du composant par
   `useLocalStorage<number>("monstreFavori", 1)`.

---

## Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi la forme fonction ?</strong></summary>

La lecture de `localStorage` ne doit se faire qu'au tout premier rendu. La
forme fonction de `useState` garantit que la fonction n'est exécutée qu'une
fois, au montage.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```
</details>

---

## Critères de réussite

- [ ] Choisir un monstre dans le `<select>` affiche sa carte.
- [ ] Recharger la page : le dernier monstre sélectionné est toujours affiché.
- [ ] Ouvrir l'onglet Application des DevTools montre une clé `monstreFavori`
      dans Local Storage.
