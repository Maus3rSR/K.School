---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Présentation du module

---

# Présentation du module
Bienvenue en R5.Real.05

- Ce module est consacré à la **programmation avancée** avec un framework PHP
- Vous allez concevoir, coder, tester et intégrer une application complète
- Le fil rouge : **WishFlix**, un catalogue de jeux vidéo avec wishlist personnelle

<!--
Tour de table rapide : expérience PHP, POO, Docker, JavaScript, etc.
Rassurer : Symfony impose une structure qui aide, même si elle sembe verbeuse au début.
-->

---

# Présentation du module
Ce que vous serez capable de faire

<v-click>

- Installer et configurer un projet **Symfony 7.4** avec Docker

</v-click>
<v-click>

- Créer des **routes, contrôleurs et templates** pour afficher des pages web

</v-click>
<v-click>

- Modéliser un domaine avec **Doctrine** et gérer la persistance

</v-click>
<v-click>

- Sécuriser l'application avec **authentification et autorisations**

</v-click>
<v-click>

- **Tester et optimiser** les performances : requêtes, cache, profiling

</v-click>

<!--
Insister sur le mot "intégrer" : on ne fait pas juste du code, on livre une solution.
-->

---

# Présentation du module
WishFlix, le fil rouge

WishFlix est un catalogue de jeux vidéo avec wishlist personnelle.

<v-click>

**Les pages existantes (statiques)** :

- Accueil avec catalogue
- Fiche détaillée d'un jeu
- Liste de souhaits
- Connexion / 404

</v-click>

<v-click>

**L'objectif** : recréer ce site avec Symfony, en y ajoutant une base de données, des comptes utilisateurs et de l'optimisation.

</v-click>

<!--
Montrer les fichiers statiques scenarios/WishFlix/src/home.html.
Demander aux apprenants ce qui manque côté dynamique : recherche, filtres, comptes, persistance.
-->

---

# Présentation du module
Déroulé des 9 séances

| Séance | Thème |
|--------|-------|
| 1 | Introduction, Docker et architecture |
| 2 | Routing, contrôleurs et Twig |
| 3 | Doctrine : entités, relations, migrations |
| 4 | Repositories, requêtes et formulaires |
| 5 | Authentification, sécurité et wishlist |
| 6 | Tests et qualité de code |
| 7 | Performance, profiling et optimisation |
| 8 | Avancement projet et intégration |
| 9 | Soutenance et évaluation (2h) |

<!--
Le projet avance à chaque séance. Pas de gros projet final séparé.
La séance 9 est volontairement plus courte pour laisser le temps aux évaluations.
-->

---
layout: center
class: text-center
---

# Présentation du module
&nbsp;

> 💬 Quelle fonctionnalité de WishFlix vous semble la plus difficile à réaliser en PHP "classique" sans framework ?

<!--
Question ouverte pour amorcer le besoin d'un framework.
On verra en séance 2 comment Symfony répond concrètement.
-->
