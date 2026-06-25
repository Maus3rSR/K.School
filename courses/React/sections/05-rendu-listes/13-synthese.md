---
layout: two-cols-header
layoutClass: gap-x-4
---

# Ce qu'on retient

Rendu conditionnel et listes dynamiques

::left::

```mermaid {scale: 0.72}
flowchart TD
    A["🧠 State\ntasks: Task[]\nshowDone: boolean"] --> B{"Condition ?"}
    B -->|"showDone = false"| C["filter()\nSous-liste active"]
    B -->|"showDone = true"| D["Liste complète"]
    C --> E["map()\nJSX par élément"]
    D --> E
    E --> F["🖥️ UI mise à jour"]
    A --> G{"Liste vide ?"}
    G -->|"&&"| H["Message vide"]

    style A fill:#f59e0b,color:#fff
    style E fill:#3b82f6,color:#fff
    style F fill:#10b981,color:#fff
```

::right::

**À retenir**

<v-clicks>

- JSX n'accepte que des **expressions** entre `{ }`
- `if` → avant le `return`&nbsp;&nbsp;·&nbsp;&nbsp;`? :` → deux branches&nbsp;&nbsp;·&nbsp;&nbsp;`&&` → une branche
- `&&` + nombre : toujours forcer un **booléen**
- `map()` transforme un tableau de données en tableau de JSX
- `key` doit être **stable et unique** — éviter l'index si la liste change
- `filter()` + `map()` se chaînent sans modifier le tableau original
- Une valeur qu'on peut **calculer** depuis le state n'a pas besoin d'être un state

</v-clicks>

<!--
Rappeler la progression : S1 Setup → S2 Composants → S3 Props → S4 State → S5 Rendu conditionnel & Listes.
Le diagramme montre que filter/map sont une transformation du state vers l'UI — concept de données dérivées.
La règle "ne pas mettre en state ce qu'on peut calculer" est un principe fondamental — y revenir en S10 avec Redux.
-->
