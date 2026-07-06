---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
---

# Ce qu'on retient

Cycle de vie, useEffect et useRef

::left::

```mermaid {scale: 0.5}
flowchart TD
    A["🟢 Montage"] --> B["useEffect(fn, [])\ns'exécute"]
    B --> C{"Dépendance\nchange ?"}
    C -->|oui| D["Cleanup précédent\npuis fn relancée"]
    D --> C
    C -->|non| E["🔄 Composant vit"]
    E --> F["🔴 Démontage"]
    F --> G["Cleanup final"]

    style A fill:#10b981,color:#fff
    style B fill:#3b82f6,color:#fff
    style F fill:#ef4444,color:#fff
    style G fill:#f59e0b,color:#fff
```

::right::

**À retenir**

- `useEffect` exécute du code **après** le rendu, jamais pendant
- Le tableau de dépendances a 3 formes : `[]`, absent, `[dep]`
- Le `return` d'un Effet est son **cleanup** : avant le prochain Effet, ou au démontage
- `useRef` garde une valeur **sans** provoquer de re-rendu
- Un ref DOM (`ref={...}`) n'existe qu'après le rendu → à utiliser dans `useEffect`
- Deux besoins différents, deux Effets séparés plutôt qu'un seul Effet qui fait tout

<!--
Rappeler la progression : S4 State/événements → S5 Rendu conditionnel/listes → S6 Cycle de vie/Hooks.
Le diagramme montre le cycle complet : montage → (dépendance change → cleanup + relance) → démontage → cleanup final.
Ce schéma sera directement réutilisé en S7 quand l'Effet chargera des données au lieu d'un simple minuteur.
-->
