---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Cleanup" translation="(Nettoyage)" definition="Fonction retournée par un Effet, exécutée avant le prochain Effet ou au démontage" />

<TermCard term="Dependency array" translation="(Tableau de dépendances)" definition="Second argument de useEffect qui contrôle quand l'Effet se relance" />

<TermCard term="Effect" translation="(Effet)" definition="Code qui synchronise un composant avec un système extérieur (DOM, timer, réseau)" />

<TermCard term="Mount" translation="(Montage)" definition="Moment où un composant est ajouté au DOM pour la première fois" />

::right::

<TermCard term="Ref" definition="Objet mutable qui garde une valeur entre les rendus sans provoquer de re-rendu" />

<TermCard term="Side effect" translation="(Effet de bord)" definition="Action qui sort du calcul pur d'un rendu : timer, DOM, requête réseau" />

<TermCard term="StrictMode" definition="Mode de développement React qui exécute deux fois les Effets pour détecter les bugs" />

<TermCard term="Unmount" translation="(Démontage)" definition="Moment où un composant est retiré du DOM" />

<!--
Termes centraux à souligner : Effect et Dependency array (source n°1 de confusion), Cleanup (justifie useRef vs useState plus tard), StrictMode (piège de fin de séance).
Side effect est le concept parapluie qui explique pourquoi useEffect existe — bien le relier au calcul pur du rendu vu implicitement depuis S1.
-->
