---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Ce qu'on retient

Le pattern fetch + useEffect + états typés

::left::

```mermaid {scale: 0.52}
flowchart TD
    A["🟢 Montage"] --> B["useEffect(() => {...}, [])"]
    B --> C["fetch(url)"]
    C --> D{"response.ok ?"}
    D -->|non| E["throw new Error"]
    D -->|oui| F["setData(json)"]
    E --> G["catch → setError"]
    F --> H["finally → setLoading(false)"]
    G --> H
    H --> I["Rendu : loading → error → data"]

    style A fill:#10b981,color:#fff
    style C fill:#3b82f6,color:#fff
    style G fill:#ef4444,color:#fff
    style I fill:#f59e0b,color:#fff
```

::right::

**À retenir**

- Le fetch part dans un `useEffect(..., [])`, jamais dans le corps du composant
- Toujours vérifier `response.ok` avant `response.json()`
- 3 états typés : `data`, `isLoading`, `error` — un seul s'affiche à la fois
- `.then()` / `.catch()` / `.finally()` couvrent respectivement succès, échec, "dans tous les cas"
- Le rendu conditionnel (S5) et le montage (S6) s'assemblent ici en un seul pattern réutilisable

<!--
Rappeler la progression : S5 Rendu conditionnel/listes → S6 Cycle de vie/Hooks → S7 Appel d'API.
Le diagramme représente le pattern complet qui sera réutilisé tel quel en S8-S9 avec React Router (charger les données d'un post selon son id dans l'URL).
Insister : ce pattern (fetch + 3 états + useEffect) est LE pattern le plus copié-collé de tout React avant l'arrivée de librairies comme React Query.
-->
