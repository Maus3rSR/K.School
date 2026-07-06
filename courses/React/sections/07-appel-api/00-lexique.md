---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="Endpoint" translation="(Point d'accès)" definition="URL précise d'une API qui retourne une ressource donnée" />

<TermCard term="fetch()" definition="Fonction native du navigateur pour envoyer une requête HTTP et récupérer une réponse" />

<TermCard term="JSON" definition="Format texte standard pour échanger des données structurées entre client et serveur" />

<TermCard term="Loading state" translation="(État de chargement)" definition="Booléen indiquant qu'une requête est en cours, avant d'avoir la réponse" />

::right::

<TermCard term="Promise" translation="(Promesse)" definition="Objet représentant le résultat futur d'une opération asynchrone" />

<TermCard term="Race condition" translation="(Situation de compétition)" definition="Bug où deux requêtes se terminent dans un ordre imprévu et écrasent la mauvaise réponse" />

<TermCard term="Response.ok" definition="Booléen indiquant si le statut HTTP de la réponse est un succès (2xx)" />

<TermCard term="Status code" translation="(Code de statut)" definition="Nombre HTTP indiquant le résultat d'une requête (200, 404, 500...)" />

<!--
Termes centraux à souligner : fetch(), Promise et Response.ok (piège n°1 de la séance).
Loading state prépare directement le pattern loading/error/data qui structure toute la séance.
Race condition peut sembler abstrait — le garder pour la fin, mention rapide sans entrer dans AbortController.
-->
