---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 30 min
---

# Découvrir Laravel

- Comprendre ce qu'est Laravel et sa philosophie
- Identifier les briques principales du framework
- Situer Laravel par rapport à Symfony et NestJS

---
transition: slide-up | slide-down
---

# Qu'est-ce que Laravel ?

<Definition term="Laravel">

Laravel est un **framework PHP** complet, moderne et open-source.

- Créé en **2011** par Taylor Otwell
- Conçu autour de la **productivité** et de l'**élégance du code**
- Version actuelle du cours : **Laravel 12** (PHP 8.3+)

</Definition>

<Analogy title="La boîte à outils du développeur PHP" icon="🧰">

Laravel fournit les outils essentiels (routing, ORM, templating, console...) déjà calibrés pour travailler ensemble. Le développeur n'a plus qu'à se concentrer sur la logique métier de son application.

</Analogy>

<v-click>

> 📌 La philosophie de Laravel : écrire du code expressif, avec des conventions qui font gagner du temps dès le premier jour.

</v-click>

<!--
Laravel est souvent présenté comme le framework PHP le plus agréable à utiliser.
Son slogan historique est "The PHP Framework for Web Artisans".
-->

---
transition: slide-up | slide-down
---

# Les briques principales

<ImageGrid :cols="4" size="sm" :images="[
  { src: 'https://placeholdit.com/200x200/4f8ef7/f1f5f9?text=Eloquent', caption: 'Eloquent' },
  { src: 'https://placeholdit.com/200x200/00a96e/f1f5f9?text=Blade', caption: 'Blade' },
  { src: 'https://placeholdit.com/200x200/ff5861/f1f5f9?text=Artisan', caption: 'Artisan' },
  { src: 'https://placeholdit.com/200x200/ffbe00/f1f5f9?text=Routing', caption: 'Routing' },
  { src: 'https://placeholdit.com/200x200/a855f7/f1f5f9?text=Validation', caption: 'Validation' },
  { src: 'https://placeholdit.com/200x200/00b5ff/f1f5f9?text=Migration', caption: 'Migration' },
  { src: 'https://placeholdit.com/200x200/94a3b8/f1f5f9?text=Sanctum+%2F+Breeze', caption: 'Sanctum / Breeze' },
  { src: 'https://placeholdit.com/200x200/ff8c42/f1f5f9?text=Vite', caption: 'Vite' }
]" />

<!--
Pas besoin de retenir tous les noms maintenant. On les reverra pratiquement dans les prochaines séances.
-->

---
transition: slide-up | slide-down
---

# Comparaison avec Symfony et NestJS

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
