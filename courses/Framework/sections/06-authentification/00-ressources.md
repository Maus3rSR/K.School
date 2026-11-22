---
layout: two-cols-header
transition: slide-left | slide-right
---

# Ressources pour ce cours

::left::

## Documentation Laravel 12

📖 [Authentication](https://laravel.com/docs/12.x/authentication) - Connecter un utilisateur, `Auth::attempt()`, `Auth::user()` et le middleware `auth`

📖 [Authorization](https://laravel.com/docs/12.x/authorization) - Déclarer des Gates et des Policies, puis les vérifier dans les routes, les contrôleurs et Blade

📖 [Hashing](https://laravel.com/docs/12.x/hashing) - `Hash::make()`, `Hash::check()` et le réglage de bcrypt

📖 [Laravel Breeze (dépôt GitHub)](https://github.com/laravel/breeze) - Le code source du starter kit : contrôleurs, routes et vues générés

::right::

## Pour aller plus loin

📖 [OWASP Top 10](https://owasp.org/Top10/) - Les dix familles de failles web les plus courantes, dont l'injection

📖 [OWASP — Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) - Où et comment échapper une donnée selon l'endroit où elle s'affiche

📖 [OWASP — SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) - Requêtes préparées, valeurs liées et listes blanches

📖 [Blade — Displaying Data](https://laravel.com/docs/12.x/blade#displaying-data) - La différence entre <code v-pre>{{ }}</code> et `{!! !!}`

<!--
La page Authorization reste ouverte pendant le chapitre 05 : Gates et Policies y sont expliquées avec les mêmes mots que le cours.
Breeze n'a plus de page dans la doc 12.x (les nouveaux starter kits l'ont remplacée) mais reste compatible Laravel 12 : son dépôt GitHub sert de référence.
Les deux fiches OWASP sont la référence professionnelle des chapitres 07 et 08 : à citer en soutenance.
-->
