---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="useState" definition="Hook React qui ajoute une mémoire locale à un composant. Retourne la valeur et une fonction pour la modifier." />

<TermCard term="State" translation="(État)" definition="Donnée interne d'un composant qui peut changer au fil du temps et déclenche un re-rendu" />

<TermCard term="Setter" definition="Fonction retournée par useState (ex: setCount) — le seul moyen autorisé de modifier le state" />

<TermCard term="Immutabilité" definition="Principe : on ne modifie jamais directement le state, on en crée toujours une nouvelle valeur" />

::right::

<TermCard term="Event Handler" translation="(Gestionnaire d'événement)" definition="Fonction exécutée en réponse à une action utilisateur (clic, saisie, soumission...)" />

<TermCard term="Re-rendu" definition="Quand le state change, React rappelle la fonction composant et met à jour l'affichage" />

<TermCard term="React.MouseEvent" definition="Type TypeScript décrivant un événement de clic ou de survol sur un élément HTML" />

<TermCard term="React.ChangeEvent" definition="Type TypeScript décrivant la modification d'un champ de formulaire (input, select...)" />

<TermCard term="Formulaire contrôlé" definition="Input dont la valeur est pilotée par le state React, et non par le DOM" />

<!--
Présenter rapidement : les apprenants reverront chaque terme dans les slides suivantes.
Insister sur useState, State et Setter qui sont les 3 briques centrales de la séance.
Immutabilité peut sembler abstrait ici — le concrétiser dans la slide sur les pièges.
-->
