---
layout: two-cols-header
layoutClass: gap-x-4
---

# `children` ou prop nommée ?

Deux façons de passer du contenu, deux usages

::left::

**Une prop nommée**

Pour une **donnée** simple et connue : texte, nombre, booléen, variante.

```tsx
<Avatar name="Ada" size={48} />
```

Le composant **sait** quoi en faire et où l'afficher.

::right::

**`children`**

Pour un **contenu libre** dont le composant ignore la forme : il sert d'**emballage**.

```tsx
<Card>
  <h2>Profil</h2>
  <button>Suivre</button>
</Card>
```

Le composant **enveloppe** sans connaître le détail.

::bottom::

<v-click>

**Règle simple** — Une **valeur** à afficher → **prop nommée**. Un **bloc de contenu** à envelopper → **`children`**. Cas typiques de `children` : `Card`, `Modal`, `Layout`, `Section`.

</v-click>

<!--
Donner le réflexe de décision : "est-ce une donnée ou un contenu à envelopper ?".
Cas d'usage children = composants conteneurs/structurels (Card, Modal, Layout, Section, PageHeader) qui doivent rester génériques.
On peut combiner les deux : <Modal title="..."> ...children... </Modal> — title est une prop nommée, le corps est children.
-->
