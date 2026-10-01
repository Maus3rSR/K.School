---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Découvrir Symfony

---

# Découvrir Symfony
Qu'est-ce que Symfony ?

Symfony est un **framework PHP** complet, mature et open-source.

<v-click>

- Créé en **2005** par Fabien Potencier et SensioLabs
- Utilisé par des millions de sites web, dont des outils internes de grands groupes
- Version actuelle du cours : **Symfony 7.4** (LTS)

</v-click>

<v-click>

> 📌 Symfony est composé de **bibliothèques indépendantes** appelées **composants Symfony**. Vous pouvez les utiliser seuls ou ensemble.

</v-click>

<!--
Mentionner que Symfony est un écosystème, pas seulement un framework.
Les composants sont réutilisables dans d'autres projets PHP.
-->

---

# Découvrir Symfony
Les composants clés

| Composant | Rôle |
|-----------|------|
| HttpFoundation | Gère les objets `Request` et `Response` |
| Routing | Associe les URLs aux contrôleurs |
| HttpKernel | Cœur du cycle requête / réponse |
| DependencyInjection | Configure et injecte les services |
| Console | Fournit `bin/console` |
| Form | Création et validation des formulaires |
| Validator | Règles de validation des données |
| Security | Authentification et autorisations |
| Doctrine ORM | Mapping objet-relationnel (bundle tiers) |

<!--
Pas besoin de retenir tous les noms maintenant. On les croisera dans les prochaines séances.
Insister : Symfony = une boîte à outils modulaire.
-->

---

# Découvrir Symfony
Ce que Symfony peut faire

<v-clicks>

1. **Applications web server-rendered** : générer du HTML côté serveur avec Twig
2. **APIs** : exposer des endpoints JSON pour des frontaux React, Vue ou mobiles
3. **Commandes console** : automatiser des tâches (imports, cron, maintenance)
4. **Microservices** : utiliser uniquement les composants nécessaires
5. **Applications complexes** : e-commerce, SaaS, intranets...

</v-clicks>

<!--
WishFlix sera server-rendered au début, puis on pourra ajouter des endpoints API plus tard.
-->

---

# Découvrir Symfony
Symfony et son écosystème

Outre le framework lui-même, vous utiliserez :

- **Twig** : moteur de templates
- **Doctrine ORM** : gestion de la base de données
- **Symfony CLI** : outil en ligne de commande pour créer et tester des projets
- **Flex** : plugin Composer qui automatise la configuration
- **Recipes** : scripts d'installation pour intégrer un bundle
- **Symfony UX / Stimulus** : interactivité front légère

<!--
Encore une fois : on reverra chaque outil en pratique.
L'important est de savoir qu'ils existent et qu'ils s'intègrent bien ensemble.
-->

---

# Découvrir Symfony
Le cycle de versions

<v-click>

- Une **version majeure** tous les 6 mois (6.x, 7.x, 8.x)
- Une version **LTS** tous les 2 ans : support de sécurité prolongé
- Symfony **7.4** est une **LTS** : support jusqu'en novembre 2029

</v-click>

<v-click>

> 💡 Pourquoi ne pas prendre Symfony 8.x ?
> La 7.4 est stable, longuement supportée et largement déployée en entreprise.

</v-click>

<!--
Point important : la 7.4 est une LTS, idéale pour une formation orientée employabilité.
La 8.1 existe mais n'est pas une LTS.
-->

---

# Découvrir Symfony
Comparaison rapide avec NestJS

| Aspect | Symfony | NestJS |
|--------|---------|--------|
| Langage | PHP | TypeScript / Node.js |
| Paradigme | OOP, composants | OOP, modules, décorateurs |
| Injection de dépendances | Native | Native |
| ORM | Doctrine ORM | TypeORM / Prisma |
| Templates | Twig | Aucun par défaut |
| Philosophie | Full-stack server-rendered | API-first, modulaire |

<v-click>

> Les concepts sont proches : si vous connaissez NestJS, beaucoup de mécanismes vous sembleront familiers.

</v-click>

<!--
Cette comparaison rassure les apprenants qui viennent de NestJS.
On peut mentionner que Symfony est plus ancien et a une approche très conventionnée.
-->

---
layout: center
class: text-center
---

# Découvrir Symfony
&nbsp;

> 💬 Pensez à NestJS : quels concepts aimeriez-vous retrouver dans Symfony ?

<!--
Réponses possibles : routing par attributs/décorateurs, injection de dépendances, ORM, middleware/intercepteur.
Ces points seront explicitement montrés dans les prochaines séances.
-->
