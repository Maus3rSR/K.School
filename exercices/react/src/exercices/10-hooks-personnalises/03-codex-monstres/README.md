# Exercice 03 — Le codex des monstres légendaires

> Réf. officielle : [Reusing Logic with Custom Hooks](https://fr.react.dev/learn/reusing-logic-with-custom-hooks)

## Objectif

Extraire la logique d'appel réseau dans un hook générique `useFetch<T>`, puis
l'utiliser pour charger un codex de monstres légendaires depuis
`/data/codex-monstres.json`.

**Durée estimée** : 25 min

---

## Prérequis

- Exercices 01 et 02 terminés.
- Savoir faire un `fetch` dans `useEffect` avec `async`/`await`.
- Connaître le pattern `data / isLoading / error`.

---

## Fichier à éditer

```
CodexMonstres.tsx
```

---

## Instructions

1. Crée `useFetch<T>(url: string)` qui retourne un objet
   `{ data: T | null, isLoading: boolean, error: string | null }`.
2. À l'intérieur, gère les trois states `data`, `isLoading`, `error`.
3. Dans un `useEffect` qui dépend de `[url]`, déclare une fonction `async`
   interne qui fetch, convertit le JSON, et met à jour les states.
4. Pense à `setIsLoading(true)` et `setError(null)` au début de chaque appel,
   et à `setIsLoading(false)` dans `finally`.
5. Remplace la logique du composant par
   `useFetch<MonstreLegendaire[]>("/data/codex-monstres.json")`.

---

## Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Où placer le generic ?</strong></summary>

Le generic `T` sert au type de `data`. Il est passé lors de l'appel :
`useFetch<MonstreLegendaire[]>(url)`. À l'intérieur du hook,
`useState<T | null>(null)`.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        const json: T = await res.json();
        setData(json);
      } catch {
        setError("Impossible de charger les données.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [url]);

  return { data, isLoading, error };
}
```
</details>

---

## Critères de réussite

- [ ] Le codex affiche "Chargement du codex..." brièvement, puis la liste des
      monstres légendaires.
- [ ] Chaque monstre montre son nom, son habitat et sa dangerosité.
- [ ] Le hook `useFetch` est réutilisable : on pourrait l'appeler avec un autre
      URL et un autre type.
