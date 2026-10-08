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

# Découvrir Laravel
Qu'est-ce que Laravel ?

<Definition term="Laravel">

Laravel est un **<KeyTerm>framework</KeyTerm> PHP** complet, moderne et open-source.

- Créé en **2011** par Taylor Otwell
- Conçu autour de la **productivité** et de l'**élégance du code**
- Version actuelle du cours : **Laravel 12** (PHP 8.3+)

</Definition>

<Analogy title="La boîte à outils du développeur PHP" icon="🧰">

Laravel fournit les outils essentiels (<KeyTerm>routing</KeyTerm>, <KeyTerm>ORM</KeyTerm>, templating, console...) déjà calibrés pour travailler ensemble. Le développeur n'a plus qu'à se concentrer sur la logique métier de son application.

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

# Découvrir Laravel
Les briques principales

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Eloquent</KeyTerm>
    <div class="text-sm opacity-80 mt-1">L'ORM : chaque table devient une classe PHP.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Blade</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Le moteur de templates qui génère le HTML.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Artisan</KeyTerm>
    <div class="text-sm opacity-80 mt-1">La console qui génère du code et lance les tâches.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Routing</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Associe chaque URL au code qui la traite.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Validation</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Vérifie les données des formulaires avant traitement.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Migration</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Versionne la structure de la base de données.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Sanctum / Breeze</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Authentification prête : tokens d'API ou pages de connexion.</div>
  </div>
  <div class="rounded-lg border-2 border-gray-400/30 bg-gray-400/5 px-4 py-2">
    <KeyTerm>Vite</KeyTerm>
    <div class="text-sm opacity-80 mt-1">Compile les assets front-end (CSS, JavaScript).</div>
  </div>
</div>

<!--
Pas besoin de retenir tous les noms maintenant. On les reverra pratiquement dans les prochaines séances.
-->

---
transition: slide-up | slide-down
---

# Découvrir Laravel
Comparaison avec Symfony et NestJS

| Aspect | Laravel | Symfony | NestJS |
|--------|---------|---------|--------|
| Langage | PHP | PHP | TypeScript / Node.js |
| Paradigme | MVC, conventions | OOP, composants | Modules, décorateurs |
| ORM | Eloquent | Doctrine | TypeORM / Prisma |
| Templates | Blade | Twig | Aucun par défaut |
| Philosophie | Productivité, DX | Architecture explicite | API-first, modulaire |
| Courbe | Modérée | Plus élevée | Modérée si TypeScript connu |

<v-click>

> Les trois partagent les mêmes fondamentaux : <KeyTerm>routing</KeyTerm>, <KeyTerm>ORM</KeyTerm>, <KeyTerm>injection de dépendances</KeyTerm>, validation, tests.

</v-click>

<!--
Cette comparaison aide les apprenants à situer Laravel par rapport à d'autres frameworks.
On pourra revenir sur NestJS si la promotion a déjà de l'expérience TypeScript.
-->
