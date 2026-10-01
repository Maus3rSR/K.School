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

<TermCard term="Front controller" definition="Point d'entrée unique qui reçoit toutes les requêtes HTTP et les redirige vers le bon code" />

<TermCard term="Dependency injection" translation="(Injection de dépendances)" definition="Mécanisme qui fournit automatiquement les objets nécessaires à une classe" />

<TermCard term="Service container" translation="(Conteneur de services)" definition="Registre interne qui gère la création et l'injection des objets de l'application" />

**HTTP et routing**

<TermCard term="Route" definition="Association entre une URL et le code qui doit la traiter" />

<TermCard term="Controller" translation="(Contrôleur)" definition="Classe PHP qui reçoit une requête, traite la logique et retourne une réponse" />

<TermCard term="Request / Response" translation="(Requête / Réponse)" definition="Objets représentant le message HTTP entrant et le message HTTP retourné" />

</div>

::right::

<div class="h-[420px] overflow-y-auto pr-2">

**Persistance et templates**

<TermCard term="ORM" translation="(Object-Relational Mapping)" definition="Couche qui fait le lien entre les objets PHP et les tables de la base de données" />

<TermCard term="Eloquent" definition="ORM inclus dans Laravel pour manipuler les données en base via des classes PHP" />

<TermCard term="Migration" definition="Fichier de script versionné qui applique des changements de structure à la base de données" />

<TermCard term="Seeder" definition="Classe qui insère des données de test ou initiales dans la base de données" />

<TermCard term="Blade" definition="Moteur de templates inclus dans Laravel pour générer du HTML" />

**Outils Laravel**

<TermCard term="Artisan" definition="Interface en ligne de commande fournie par Laravel pour exécuter des tâches et générer du code" />

<TermCard term="Sail" definition="Environnement Docker officiel de Laravel, basé sur Docker Compose" />

<TermCard term="Composer" definition="Gestionnaire de dépendances PHP utilisé pour installer Laravel et ses packages" />

<TermCard term="Vite" definition="Outil de build utilisé par Laravel pour compiler les assets front-end" />

</div>

<!--
Ce lexique sera réutilisé dans toutes les séances.
Les termes sont volontairement en anglais car c'est le vocabulaire rencontré dans le code et la documentation.
-->
