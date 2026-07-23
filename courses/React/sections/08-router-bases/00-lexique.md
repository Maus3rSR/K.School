---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="BrowserRouter" definition="Composant React Router qui utilise l'API historique du navigateur pour synchroniser l'URL" />

<TermCard term="Client-side routing" translation="(Routage côté client)" definition="Navigation gérée par JavaScript dans le navigateur, sans recharger la page depuis le serveur" />

<TermCard term="Link" definition="Composant React Router créant une ancre HTML qui navigue sans rechargement complet" />

<TermCard term="NavLink" definition="Variante de Link qui peut indiquer visuellement le lien actif" />

::right::

<TermCard term="Route" definition="Composant qui associe un chemin URL à un composant à afficher" />

<TermCard term="Router" definition="Ensemble des routes et de la logique qui décide quel composant rendre selon l'URL" />

<TermCard term="Routes" definition="Composant qui choisit la première Route correspondant à l'URL actuelle" />

<TermCard term="URL" translation="(Adresse web)" definition="Chemin affiché dans la barre du navigateur et utilisé pour identifier une page" />

<!--
Termes centraux à souligner : BrowserRouter, Routes, Route et NavLink (4 briques de toute navigation React Router).
Client-side routing est le concept clé à faire ressentir : cliquer sur un lien ne doit pas faire clignoter l'écran.
-->
