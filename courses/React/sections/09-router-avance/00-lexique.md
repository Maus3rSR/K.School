---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Route dynamique" definition="Route dont une partie de l'URL est variable, par exemple /posts/:id" />

<TermCard term="Paramètre d'URL" definition="Valeur extraite d'une route dynamique, comme :id ou :slug" />

<TermCard term="useParams" definition="Hook React Router qui retourne les paramètres de l'URL sous forme d'objet" />

::right::

<TermCard term="Outlet" definition="Composant qui indique où afficher le contenu d'une route imbriquée" />

<TermCard term="Route imbriquée" definition="Route déclarée à l'intérieur d'une autre Route, souvent pour partager un layout" />

<TermCard term="useNavigate" definition="Hook React Router qui permet de changer de page depuis le code TypeScript" />

<!--
Termes centraux : route dynamique, paramètre d'URL, useParams, Outlet, useNavigate.
Insister sur le fait que :id n'est pas du code magique, c'est simplement un segment d'URL rempli par React Router.
-->
