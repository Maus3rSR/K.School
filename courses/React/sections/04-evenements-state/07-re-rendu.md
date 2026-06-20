---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le cycle de re-rendu

Ce qui se passe quand le state change

::left::

```mermaid {scale: 0.82}
flowchart TD
    A["🖱️ Action utilisateur\n(clic, saisie...)"] --> B["⚡ Event handler\nexécuté"]
    B --> C["setState appelé\nnouvelle valeur"]
    C --> D["🔄 React re-rend\nle composant"]
    D --> E["🖥️ DOM mis à jour\n(seulement ce qui change)"]
    E -.->|"attente de\nla prochaine action"| A

    style A fill:#3b82f6,color:#fff
    style C fill:#8b5cf6,color:#fff
    style E fill:#10b981,color:#fff
```

::right::

**Points clés**

<v-click>

**React ne met à jour que le strict nécessaire**

Le Virtual DOM compare l'ancien et le nouveau JSX — seuls les nœuds différents sont mis à jour dans le vrai DOM.

</v-click>

<v-click>

**Le state est un snapshot**

Pendant un rendu, la valeur de `count` est figée. Plusieurs `setCount` dans le même handler ne s'accumulent pas immédiatement.

```tsx
function handleClick() {
  setCount(count + 1)  // count = 0
  setCount(count + 1)  // count = 0 encore !
  // résultat : count = 1, pas 2
}
```

</v-click>

<!--
Le diagramme Mermaid représente la boucle événement → setter → rendu → affichage.
Le concept de snapshot est contre-intuitif : insister dessus avec un exemple live.
Pour incrémenter plusieurs fois dans le même handler, il faut la forme fonctionnelle : setCount(prev => prev + 1).
-->
