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

**Ce qui se passe concrètement**

<v-click>

Quand `setCount(1)` est appelé, React **rappelle la fonction** `Counter()` depuis le début — avec la nouvelle valeur.

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  //             ↑ vaut 1 au prochain rendu
  return <p>{count}</p>
}
```

</v-click>

<v-click>

**React ne met à jour que le strict nécessaire**

Seuls les nœuds du DOM qui ont réellement changé sont mis à jour — pas tout le composant entier.

</v-click>

<v-click>

> ⚠️ Il y a une subtilité sur la valeur de `count` pendant un rendu — on y revient juste après le compteur.

</v-click>

<!--
Rester sur le modèle mental simple : setState → React rappelle la fonction → nouvel affichage.
La mention du Virtual DOM est volontairement absente ici pour ne pas alourdir.
La dernière puce amorce la slide snapshot sans le spoiler.
-->
