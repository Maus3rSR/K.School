---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<div class="h-[420px] overflow-y-auto pr-2">

**Concepts généraux**

<TermCard term="Framework" translation="(Cadre de travail)" definition="Ensemble cohérent de bibliothèques et de conventions qui structurent une application" />

<TermCard term="Library" translation="(Bibliothèque)" definition="Code réutilisable que vous appelez depuis votre application, sans imposer d'architecture" />

<TermCard term="Front controller" definition="Point d'entrée unique qui reçoit toutes les requêtes HTTP et les redirige vers le bon contrôleur" />

<TermCard term="Dependency injection" translation="(Injection de dépendances)" definition="Mécanisme qui fournit automatiquement les objets nécessaires à une classe" />

<TermCard term="Service container" translation="(Conteneur de services)" definition="Registre interne de Symfony qui gère la création et l'injection des objets" />

**HTTP et routing**

<TermCard term="Route" definition="Association entre une URL et le code qui doit la traiter" />

<TermCard term="Controller" translation="(Contrôleur)" definition="Classe PHP qui reçoit une requête, traite la logique et retourne une réponse" />

<TermCard term="Request / Response" translation="(Requête / Réponse)" definition="Objets représentant le message HTTP entrant et le message HTTP retourné" />

</div>

::right::

<div class="h-[420px] overflow-y-auto pr-2">

**Persistance et templates**

<TermCard term="ORM" translation="(Object-Relational Mapping)" definition="Couche qui fait le lien entre les objets PHP et les tables de la base de données" />

<TermCard term="Entity" translation="(Entité)" definition="Classe PHP qui représente une table de base de données via l'ORM" />

<TermCard term="Migration" definition="Fichier de script versionné qui applique des changements de structure à la base de données" />

<TermCard term="Fixture" definition="Jeu de données de test chargé automatiquement en base de données" />

<TermCard term="Twig" definition="Moteur de templates PHP utilisé par défaut dans Symfony pour générer du HTML" />

**Outils Symfony**

<TermCard term="Console" definition="Interface en ligne de commande fournie par Symfony pour exécuter des scripts et des tâches" />

<TermCard term="Flex" definition="Plugin Composer qui automatise l'installation et la configuration des packages Symfony" />

<TermCard term="Recipe" definition="Script de configuration livré avec un package Symfony pour l'intégrer rapidement" />

<TermCard term="AssetMapper" definition="Outil Symfony pour gérer les assets front-end (CSS, JS) sans build complexe" />

</div>

<!--
Ce lexique sera réutilisé dans toutes les séances.
Les termes sont volontairement en anglais car c'est le vocabulaire rencontré dans le code et la documentation.
-->
