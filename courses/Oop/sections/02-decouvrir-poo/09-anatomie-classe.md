---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

Anatomie d'une Classe

::left::

<div v-click>

```mermaid
classDiagram
    class Voiture {
        -String marque
        -String modele
        -String couleur
        -int vitesse
        +demarrer()
        +accelerer(int valeur)
        +freiner()
        +arreter()
    }
```

</div>

::right::

<div v-click>

## Composants

**Attribut** (données) <small><i>ou propriété, membre, champ</i></small>
- `marque`, `modele`, `couleur`, `vitesse`
- Préfixe `-` : attribut <mark>**privé**</mark> (protégé de l'extérieur)

**Méthode** (actions)
- `demarrer()`, `accelerer()`, `freiner()`, `arreter()`
- Préfixe `+` : méthode <mark>**publique**</mark> (accessible de l'extérieur)

</div>

<!--
Diagramme UML pour visualiser la structure
Expliquer la notation : - pour privé, + pour public
Lien avec les concepts vus précédemment
-->

