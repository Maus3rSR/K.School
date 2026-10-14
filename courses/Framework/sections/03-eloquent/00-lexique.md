---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Active Record" definition="Pattern où chaque objet porte ses données et sait les sauvegarder en base" />

<TermCard term="Factory" translation="(Fabrique)" definition="Classe qui fabrique des modèles remplis de fausses données plausibles" />

<TermCard term="Foreign key" translation="(Clé étrangère)" definition="Colonne qui relie une ligne à la clé primaire d'une autre table" />

<TermCard term="Mass assignment" translation="(Assignation de masse)" definition="Remplissage d'un modèle en une fois via un tableau d'attributs" />

<TermCard term="Migration" definition="Fichier PHP versionné qui décrit la création ou l'évolution d'une table" />

::right::

<TermCard term="Model" translation="(Modèle)" definition="Classe PHP qui représente une table et donne accès à ses lignes" />

<TermCard term="N+1" definition="Piège : une requête pour la liste, plus une requête par ligne affichée" />

<TermCard term="ORM" translation="(Mapping objet-relationnel)" definition="Couche qui traduit les objets PHP en lignes de base, et inversement" />

<TermCard term="Pivot table" translation="(Table pivot)" definition="Table intermédiaire qui relie deux tables en plusieurs-à-plusieurs" />

<TermCard term="Seeder" definition="Classe qui insère un jeu de données de départ dans la base" />

<TermCard term="Tinker" definition="Console interactive (REPL) qui exécute du PHP dans le contexte Laravel" />

<!--
Termes centraux : modèle et migration — tout le cours tourne autour d'eux.
Pivot table et mass assignment : survolés ici, ils seront définis en situation dans leurs chapitres.
-->
