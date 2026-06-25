---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Conditional Rendering" translation="(Rendu conditionnel)" definition="Afficher ou masquer du JSX selon une condition booléenne" />

<TermCard term="Expression JSX" definition="Valeur calculable entre accolades `{}` dans du JSX — ni `if`, ni `for` directs" />

<TermCard term="Falsy" definition="Valeur évaluée à `false` en JS : `0`, `''`, `null`, `undefined`, `false`" />

<TermCard term="filter()" definition="Méthode tableau qui retourne un nouveau tableau contenant uniquement les éléments passant un test" />

::right::

<TermCard term="key" definition="Prop obligatoire sur chaque élément d'une liste JSX — aide React à identifier et reconcilier les nœuds" />

<TermCard term="map()" definition="Méthode tableau qui transforme chaque élément en une nouvelle valeur, ici en JSX" />

<TermCard term="Reconciliation" translation="(Réconciliation)" definition="Algorithme React comparant l'ancien et le nouvel arbre de composants pour mettre à jour le DOM minimal" />

<TermCard term="Short-circuit" translation="(Court-circuit)" definition="Évaluation `A && B` : si A est falsy, B n'est pas évalué ni rendu" />

<!--
Termes centraux à souligner : key (pièges fréquents), Falsy (le bug du 0 avec &&), map() et filter().
Reconciliation peut sembler abstrait ici — le concrétiser dans la slide sur key.
Expression JSX est le fondement conceptuel de tout le rendu conditionnel : insister.
-->
