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
Votre code (contrôleur, template, entité)
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
| PHP | **Symfony**, Laravel |
| JavaScript / TypeScript | NestJS, Express, AdonisJS |
| Python | Django, Flask, FastAPI |
| Ruby | Ruby on Rails |
| Java | Spring Boot |

<!--
Insister sur la transversalité des concepts : routing, contrôleur, ORM, injection de dépendances.
Ceux qui connaissent NestJS reconnaîtront beaucoup d'idées.
-->

---

# Qu'est-ce qu'un framework ?
Frameworks côté client

Les navigateurs utilisent aussi des frameworks pour construire l'interface :

- **React**, **Vue**, **Angular**, **Svelte**
- Ils manipulent le DOM et gèrent l'état de l'application

<v-click>

Symfony, lui, travaille **côté serveur** :

- Il reçoit une requête HTTP
- Il prépare une réponse (souvent en HTML)
- Il peut servir de **back-end** pour une SPA

</v-click>

<!--
Le cours se concentre sur Symfony côté serveur.
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

> 💬 Quelle différence faites-vous entre utiliser une bibliothèque et adopter un framework sur un projet d'équipe ?

<!--
Réponse attendue : conventions partagées, onboarding plus rapide, inversion de contrôle.
Transition vers Symfony : c'est un framework côté serveur très complet.
-->
