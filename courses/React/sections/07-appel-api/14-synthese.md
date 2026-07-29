---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Ce qu'on retient

Le pattern fetch + useEffect + états typés

::left::

```mermaid {scale: 0.52}
flowchart TD
    A["🟢 Montage"] --> B["useEffect(() => { loadData() }, [])"]
    B --> C["async function loadData()"]
    C --> D["try : await fetch(url)"]
    D --> E{"response.ok ?"}
    E -->|non| F["throw new Error"]
    E -->|oui| G["await res.json() → setData"]
    F --> H["catch → setError"]
    G --> I["finally → setLoading(false)"]
    H --> I
    I --> J["Rendu : loading → error → data"]

    style A fill:#10b981,color:#fff
    style C fill:#3b82f6,color:#fff
    style H fill:#ef4444,color:#fff
    style J fill:#f59e0b,color:#fff
```

::right::

**À retenir**

- Le fetch part dans une fonction `async` interne à `useEffect(..., [])`, jamais dans le corps du composant
- Toujours vérifier `response.ok` avant `response.json()`
- 3 états typés : `data`, `isLoading`, `error` — un seul s'affiche à la fois
- `try` / `catch` / `finally` couvrent respectivement succès, échec, "dans tous les cas"
- Le rendu conditionnel (S5) et le montage (S6) s'assemblent ici en un seul pattern réutilisable

<!--
Rappeler la progression : S5 Rendu conditionnel/listes → S6 Cycle de vie/Hooks → S7 Appel d'API.
Le diagramme représente le pattern complet qui sera réutilisé tel quel en S8-S9 avec React Router (charger les données d'un post selon son id dans l'URL).
Insister : ce pattern (fetch + 3 états + useEffect + async/await) est LE pattern le plus copié-collé de tout React avant l'arrivée de librairies comme React Query.
-->
