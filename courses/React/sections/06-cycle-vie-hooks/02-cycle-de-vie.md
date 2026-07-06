---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le cycle de vie d'un composant

Trois moments dans la vie d'un composant

::left::

```mermaid {scale: 0.65}
flowchart TD
    A["🟢 Montage\nLe composant apparaît"] --> B["🔄 Mise à jour\nstate ou props changent"]
    B --> B
    B --> C["🔴 Démontage\nLe composant disparaît"]

    style A fill:#10b981,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#ef4444,color:#fff
```

::right::

<v-clicks>

1. **Montage** — le composant est créé et inséré dans le DOM pour la première fois
2. **Mise à jour** — le composant se re-rend après un changement de state ou de props
3. **Démontage** — le composant est retiré du DOM

</v-clicks>

<!--
Analogie possible : ouverture d'une page (montage), rafraîchissement du contenu (mise à jour), fermeture de l'onglet (démontage).
Insister : jusqu'ici tout le code s'exécute PENDANT le rendu (calcul du JSX). Le cycle de vie permet d'exécuter du code À CES MOMENTS PRÉCIS, en dehors du rendu.
Pas encore de code ici — le schéma doit rester gravé avant d'attaquer useEffect.
-->
