---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Qu'est-ce qu'un framework ?

---

# Qu'est-ce qu'un framework ?
Le problème du code "from scratch"

Sans framework, chaque projet PHP doit réinventer :

- Le **routage** des URLs
- La **gestion des requêtes** et des réponses HTTP
- L'accès à la base de données
- La **sécurité** (CSRF, authentification)
- La **gestion des formulaires**

<v-click>

> 🎯 Résultat : du code redondant, difficile à maintenir et à faire évoluer.

</v-click>

<!--
Analogie : reconstruire une maison en fabriquant ses propres briques, tuyaux et câbles.
Un framework, c'est un kit de construction standardisé.
-->

---

# Qu'est-ce qu'un framework ?
Définition

Un **framework** est un cadre de travail qui impose :

- Une **structure de projet** standardisée
- Un ensemble de **bibliothèques** compatibles entre elles
- Des **conventions** pour organiser le code
- Des **patterns** éprouvés (MVC, injection de dépendances...)

<v-click>

Vous ne partez plus d'une page blanche. Vous remplissez les cases d'un puzzle déjà dessiné.

</v-click>

<!--
Différence clé avec une librairie : un framework vous appelle, vous n'appelez pas seulement le framework.
C'est le principe d'inversion de contrôle.
-->

---

# Qu'est-ce qu'un framework ?
Bibliothèque vs Framework

```
Votre code
    ↓ appelle
Bibliothèque
    ↓ retourne un résultat
Votre code continue

Framework
    ↓ appelle VOTRE code
    ↓ selon SES conventions
Votre code (contrôleur, template, modèle)
```

<v-click>

**En résumé** :

- Une **bibliothèque** répond à vos questions
- Un **framework** pose le cadre de vos réponses

</v-click>

<!--
Analogie bibliothèque = un dictionnaire que vous consultez quand vous voulez.
Framework = un guide de rédaction qui structure votre document.
-->

---

# Qu'est-ce qu'un framework ?
Frameworks populaires côté serveur

| Langage | Frameworks |
|---------|------------|
| PHP | Symfony, **Laravel** |
| JavaScript / TypeScript | NestJS, Express, AdonisJS |
| Python | Django, Flask, FastAPI |
| Ruby | Ruby on Rails |
| Java | Spring Boot |

<!--
Insister sur la transversalité des concepts : routing, contrôleur, ORM, injection de dépendances.
Ceux qui connaissent NestJS reconnaîtront beaucoup d'idées.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Le paysage des frameworks web

Le **Stack Overflow Developer Survey 2025** interroge plus de 49 000 développeurs dans 177 pays sur les technologies qu'ils utilisent.

<v-click>

Dans la catégorie **Web frameworks and technologies**, on observe :

</v-click>

<v-click>

- **Node.js** ~49 % — le runtime JavaScript côté serveur le plus cité
- **React** ~47 % — leader des frameworks frontaux
- **Next.js** ~21 % — framework React full-stack en forte croissance
- **Express** ~20 % — framework Node.js léger et très répandu

</v-click>

<!--
Ces chiffres montrent que JavaScript/TypeScript domine le paysage web mondial.
Mais les frameworks PHP restent très présents, notamment en Europe.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Où se situent PHP et Laravel ?

<v-click>

Dans le même classement :

- **WordPress** ~14 %
- **Laravel** ~9 %
- **Symfony** ~4 %
- **Drupal** ~2 %

</v-click>

<v-click>

> 💡 Laravel apparaît comme le framework PHP le plus cité dans ce sondage mondial, devant Symfony.

</v-click>

<v-click>

⚠️ **Mais attention** : ce classement mélange runtimes, frameworks frontaux, CMS et back-end. Il ne mesure pas directement le marché de l'emploi local.

</v-click>

<!--
Souligner que Laravel est populaire parmi les répondants, mais que Symfony reste très présent en production (Drupal, Magento, Sylius, PrestaShop).
La France est historiquement un marché Symfony-fort.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Pourquoi ce choix pour ce cours ?

<v-click>

- **Laravel** combine une courbe d'apprentissage accessible avec un écosystème mature

</v-click>
<v-click>

- Il est très demandé dans les **startups, agences web et SaaS**

</v-click>
<v-click>

- Il expose les mêmes concepts fondamentaux que Symfony ou NestJS : routing, ORM, injection de dépendances, tests

</v-click>
<v-click>

- Une fois ces bases acquises, passer à un autre framework devient beaucoup plus simple

</v-click>

<!--
Le but n'est pas de dire que Laravel est "le meilleur", mais qu'il est un excellent compromis pédagogique et professionnel pour cette formation.
-->

---

# Qu'est-ce qu'un framework ?
Frameworks côté client

Les navigateurs utilisent aussi des frameworks pour construire l'interface :

- **React**, **Vue**, **Angular**, **Svelte**
- Ils manipulent le DOM et gèrent l'état de l'application

<v-click>

Laravel, lui, travaille **côté serveur** :

- Il reçoit une requête HTTP
- Il prépare une réponse (souvent en HTML avec Blade)
- Il peut servir de **back-end** pour une SPA ou une API

</v-click>

<!--
Le cours se concentre sur Laravel côté serveur.
On pourra évoquer en fin de module les possibilités API.
-->

---

# Qu'est-ce qu'un framework ?
Pourquoi utiliser un framework ?

<v-click>

- **Productivité** : on écrit moins de code répétitif

</v-click>
<v-click>

- **Maintenabilité** : la structure est connue de tous

</v-click>
<v-click>

- **Sécurité** : les failles courantes sont déjà anticipées

</v-click>
<v-click>

- **Recrutement** : un standard industriel reconnu

</v-click>
<v-click>

- **Évolutivité** : on peut remplacer un composant sans tout casser

</v-click>

<!--
Donner un exemple concret : la protection CSRF dans les formulaires est gérée nativement.
-->

---
layout: center
class: text-center
---

# Qu'est-ce qu'un framework ?
&nbsp;

> 💬 D'après le classement Stack Overflow, Laravel est le framework PHP le plus cité. Pourtant, Symfony reste très présent en production. Quels facteurs expliquent cette différence ?

<!--
Réponses possibles : popularité vs présence legacy, types d'entreprises (startups vs enterprise), géographie, écosystème CMS.
Transition vers l'introduction à Laravel.
-->
