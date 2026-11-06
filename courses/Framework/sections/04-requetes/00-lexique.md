---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Binding" translation="(Paramètre lié)" definition="Valeur passée à part dans la requête SQL, à l'abri de l'injection" />

<TermCard term="Eager loading" translation="(Chargement anticipé)" definition="Charger les relations à l'avance, en une requête par relation" />

<TermCard term="Lazy loading" translation="(Chargement paresseux)" definition="Requête déclenchée au premier accès à une relation — source du N+1" />

<TermCard term="N+1" definition="Piège : une requête pour la liste, plus une requête par ligne affichée" />

::right::

<TermCard term="Pagination" definition="Découpage d'une longue liste en pages numérotées, côté SQL" />

<TermCard term="Profiler" definition="Outil qui mesure ce que l'application exécute : requêtes, durées" />

<TermCard term="Query Builder" translation="(Constructeur de requêtes)" definition="API en chaîne qui construit le SQL sans passer par un modèle" />

<TermCard term="Query string" translation="(Chaîne de requête)" definition="Partie de l'URL après le « ? » : paramètres de filtre ou de page" />

<!--
Termes centraux : eager loading vs lazy loading — l'opposition qui structure toute la séance.
N+1 est déjà dans le lexique S3 : rappeler que le symptôme est connu, aujourd'hui on le mesure et on le corrige.
Binding : à relier à la protection contre l'injection SQL vue au chapitre 2.
-->
