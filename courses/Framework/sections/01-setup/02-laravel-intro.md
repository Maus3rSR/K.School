---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Découvrir Laravel

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

- **Applications web server-rendered** : générer du HTML côté serveur avec Blade
- **APIs REST** : exposer des endpoints JSON pour React, Vue ou mobile
- **Applications full-stack** : avec Inertia.js, le front React/Vue reste dans le même projet
- **Commandes console** : automatiser des tâches avec Artisan
- **Prototypes rapides** : grâce aux starter kits Breeze et Jetstream

<!--
WishFlix sera d'abord server-rendered avec Blade.
On pourra évoquer une API en fin de module.
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
