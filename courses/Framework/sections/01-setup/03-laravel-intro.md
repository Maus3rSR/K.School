---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Découvrir Laravel

---

# Découvrir Laravel
Qu'est-ce que Laravel ?

Laravel est un **framework PHP** complet, moderne et open-source.

<v-click>

- Créé en **2011** par Taylor Otwell
- Conçu autour de la **productivité** et de l'**élégance du code**
- Version actuelle du cours : **Laravel 12** (PHP 8.3+)

</v-click>

<v-click>

> 📌 La philosophie de Laravel : écrire du code expressif, avec des conventions qui font gagner du temps dès le premier jour.

</v-click>

<!--
Laravel est souvent présenté comme le framework PHP le plus agréable à utiliser.
Son slogan historique est "The PHP Framework for Web Artisans".
-->

---

# Découvrir Laravel
Les briques principales

| Composant | Rôle |
|-----------|------|
| Eloquent | ORM pour manipuler la base de données avec des objets PHP |
| Blade | Moteur de templates simple et puissant |
| Artisan | Console en ligne de commande avec générateurs de code |
| Routing | Définition des routes web et API |
| Validation | Validation des formulaires et des requêtes |
| Migration | Versionnement du schéma de base de données |
| Sanctum / Breeze | Authentification et gestion des sessions/API tokens |
| Vite | Compilation des assets CSS/JS |

<!--
Pas besoin de retenir tous les noms maintenant. On les reverra pratiquement dans les prochaines séances.
-->

---

# Découvrir Laravel
Ce que Laravel peut faire

<v-clicks>

1. **Applications web server-rendered** : générer du HTML côté serveur avec Blade
2. **APIs REST** : exposer des endpoints JSON pour React, Vue ou mobile
3. **Applications full-stack** : avec Inertia.js, le front React/Vue reste dans le même projet
4. **Commandes console** : automatiser des tâches avec Artisan
5. **Prototypes rapides** : grâce aux starter kits Breeze et Jetstream

</v-clicks>

<!--
WishFlix sera d'abord server-rendered avec Blade.
On pourra évoquer une API en fin de module.
-->

---

# Découvrir Laravel
L'écosystème

Outre le framework lui-même, vous utiliserez :

- **Laravel Sail** : environnement Docker officiel
- **Laravel Herd** : serveur local rapide (plan B sans Docker)
- **Laravel Nova** : administration back-office (optionnel, payant)
- **Laravel Forge / Vapor** : déploiement serveur et serverless
- **Packagist / Composer** : gestion des packages PHP

<v-click>

> 💡 Laravel est un écosystème, pas seulement un framework. Vous pouvez commencer simple et ajouter des outils au besoin.

</v-click>

<!--
Insister sur le fait que l'écosystème Laravel est très complet, même si on n'utilisera pas tout dans ce module.
-->

---

# Découvrir Laravel
Cycle de versions

<v-click>

- Une version majeure tous les **6 mois** environ (Laravel 11, 12, etc.)
- Une version **LTS** tous les 2 ans : support de sécurité prolongé
- Laravel 12 n'est pas une LTS, mais elle est moderne et largement utilisée

</v-click>

<v-click>

> 💡 Ce cours utilise Laravel 12 avec PHP 8.3+. Les concepts restent valables sur les versions récentes.

</v-click>

<!--
Préciser que Laravel est maintenu activement et que les mises à jour majeures sont documentées.
-->

---

# Découvrir Laravel
Comparaison rapide avec Symfony et NestJS

| Aspect | Laravel | Symfony | NestJS |
|--------|---------|---------|--------|
| Langage | PHP | PHP | TypeScript / Node.js |
| Paradigme | MVC, conventions | OOP, composants | Modules, décorateurs |
| ORM | Eloquent | Doctrine | TypeORM / Prisma |
| Templates | Blade | Twig | Aucun par défaut |
| Philosophie | Productivité, DX | Architecture explicite | API-first, modulaire |
| Courbe | Modérée | Plus élevée | Modérée si TypeScript connu |

<v-click>

> Les trois partagent les mêmes fondamentaux : routing, ORM, injection de dépendances, validation, tests.

</v-click>

<!--
Cette comparaison aide les apprenants à situer Laravel par rapport à d'autres frameworks.
On pourra revenir sur NestJS si la promotion a déjà de l'expérience TypeScript.
-->

---
layout: center
class: text-center
---

# Découvrir Laravel
&nbsp;

> 💬 Pensez à vos projets précédents : quelles tâches répétitives aimeriez-vous voir un framework gérer automatiquement ?

<!--
Réponses possibles : authentification, validation, base de données, formulaires, envoi d'emails.
Ces points seront explicitement montrés dans les prochaines séances.
-->
