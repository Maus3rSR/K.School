---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-left | slide-right
---

# Lexique

::left::

<TermCard term="Authentication" translation="(Authentification)" definition="Vérifier qui vous êtes : identifiant et mot de passe" />

<TermCard term="Authorization" translation="(Autorisation)" definition="Décider ce qu'un utilisateur identifié a le droit de faire" />

<TermCard term="Binding" translation="(Valeur liée)" definition="Valeur envoyée à la base à part de la requête SQL, jamais concaténée" />

<TermCard term="Gate" definition="Règle d'autorisation nommée, déclarée une fois et vérifiée partout" />

<TermCard term="Hash" translation="(Empreinte)" definition="Résultat d'un calcul à sens unique : impossible de retrouver la valeur d'origine" />

<TermCard term="Middleware" definition="Filtre traversé par la requête avant d'atteindre le contrôleur" />

::right::

<TermCard term="Policy" definition="Classe qui regroupe les règles d'autorisation d'un modèle" />

<TermCard term="Session" definition="Données gardées côté serveur entre deux requêtes, retrouvées grâce à un cookie" />

<TermCard term="SQL injection" translation="(Injection SQL)" definition="Saisie qui modifie le sens d'une requête SQL construite par concaténation" />

<TermCard term="Starter kit" translation="(Kit de démarrage)" definition="Code généré dans votre projet : routes, contrôleurs et vues prêts à adapter" />

<TermCard term="XSS" translation="(Cross-Site Scripting)" definition="Script injecté dans une page, exécuté dans le navigateur de la victime" />

<!--
Termes centraux : authentication vs authorization — la confusion la plus fréquente, elle structure toute la séance (ch. 01-04 puis ch. 05).
Hash et binding sont les deux réflexes de sécurité de la séance : on ne stocke jamais un mot de passe en clair, on ne concatène jamais une saisie dans du SQL.
Middleware : déjà croisé en S5 (ValidateCsrfToken) — il est défini ici parce qu'on va en poser un nous-mêmes au chapitre 04.
-->
