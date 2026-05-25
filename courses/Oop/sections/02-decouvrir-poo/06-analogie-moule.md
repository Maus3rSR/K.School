---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

L'Analogie du Moule à Gâteau

::left::

<div v-click>

## La Classe = Le Moule

- **Recette** : définit la forme, les ingrédients
- **Réutilisable** : on peut faire plusieurs gâteaux
- **Modèle** : décrit ce que sera chaque gâteau

</div>

::right::

<div v-click>

## L'Objet = Le Gâteau

- **Réalisation concrète** : un gâteau spécifique
- **Unique** : chaque gâteau est différent (chocolat, vanille...)
- **Instance** : créé à partir du moule

```mermaid
graph TD
    A[Classe<br/>Moule] -->|Crée| B[Objet 1<br/>Gâteau chocolat]
    A -->|Crée| C[Objet 2<br/>Gâteau vanille]
    A -->|Crée| D[Objet 3<br/>Gâteau fraise]
```

</div>

<!--
Analogie forte pour ancrer le concept
Insister : Une classe = un plan, un objet = une réalisation
-->

