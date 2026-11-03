---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-left | slide-right
---

# Lexique

::left::

<TermCard term="CSRF" translation="(Cross-Site Request Forgery)" definition="Attaque qui fait exécuter une action à un utilisateur connecté à son insu" />

<TermCard term="Dependency injection" translation="(Injection de dépendances)" definition="Recevoir ses dépendances de l'extérieur au lieu de les instancier soi-même" />

<TermCard term="Flash data" translation="(Donnée flash)" definition="Donnée de session qui ne survit qu'à la requête suivante" />

<TermCard term="Form Request" definition="Classe dédiée qui centralise les règles de validation d'un formulaire" />

<TermCard term="Method spoofing" translation="(Usurpation de méthode)" definition="Champ caché _method qui simule PUT, PATCH ou DELETE dans un formulaire" />

::right::

<TermCard term="Post/Redirect/Get" definition="Pattern qui répond à un POST par une redirection vers une page en GET" />

<TermCard term="Resource controller" translation="(Contrôleur ressource)" definition="Contrôleur qui expose les sept actions CRUD conventionnelles d'une ressource" />

<TermCard term="Route model binding" translation="(Liaison route-modèle)" definition="Injection automatique du modèle correspondant au paramètre de route" />

<TermCard term="Service" definition="Classe qui concentre la logique métier, hors du contrôleur" />

<TermCard term="Validation rule" translation="(Règle de validation)" definition="Contrainte déclarée qu'une donnée doit satisfaire pour être acceptée" />

<!--
Termes centraux : CSRF et validation rule — les deux réflexes sécurité de la séance.
Post/Redirect/Get et route model binding : survolés ici, définis en situation dans leurs chapitres.
Faire le lien : service et injection de dépendances prolongent le conteneur de services vu en S1.
-->
