---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Hook personnalisé" translation="(Custom hook)" definition="Fonction TypeScript dont le nom commence par use et qui appelle d'autres hooks" />

<TermCard term="Règles des Hooks" definition="Toujours appeler un hook au niveau racine d'un composant, jamais dans une condition ou une boucle" />

<TermCard term="Générique" translation="(Generic)" definition="Paramètre de type qui rend une fonction ou un hook réutilisable avec plusieurs types de données" />

<TermCard term="Extraction" definition="Action de déplacer une logique dupliquée dans plusieurs composants vers une fonction commune" />

::right::

<TermCard term="Tuple" definition="Tableau de taille fixe où chaque position a un type précis, souvent utilisé pour la valeur de retour d'un hook" />

<TermCard term="Context" definition="Mécanisme React permettant de partager une valeur à toute l'arborescence sans passer par les props" />

<TermCard term="Provider" definition="Composant fourni par un Context qui rend une valeur accessible à tous ses descendants" />

<TermCard term="Prop drilling" definition="Passage répétitif de props à travers plusieurs composants intermédiaires qui n'en ont pas besoin" />

<!--
Termes centraux : Hook personnalisé et Règles des Hooks sont LE socle de la séance.
Context, Provider et Prop drilling préparent les slides de partage d'état et justifient l'introduction de useContext.
Générique et Tuple restent des termes de typage à mentionner rapidement, sans s'attarder.
-->
