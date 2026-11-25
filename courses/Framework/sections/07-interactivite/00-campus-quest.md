---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-left | slide-right
---

# Campus Quest
Accepter une quête ne devrait pas recharger la page

Depuis la S6, un joueur connecté **accepte** des quêtes. Le clic fonctionne… au prix d'un rechargement complet, et le classement recalcule tout à chaque visite.

::left::

**Le problème**

- « Accepter la quête » envoie la page **entière** : le navigateur recharge, perd le scroll, rejoue **toutes** les requêtes SQL de la fiche
- Le compteur « Mes quêtes » de la barre n'est à jour qu'après ce rechargement
- `/classement` recalcule ses agrégats (`withSum`, `withCount` de la S4) à **chaque** visite, pour un résultat qui change rarement

::right::

**Objectifs de la séance**

- Accepter une quête **sans rechargement**, en ne modifiant qu'un morceau de page
- Le compteur « Mes quêtes » **mis à jour en direct**
- Le classement **mis en cache**, avec le gain **mesuré**

<v-click>

Même route, même contrôleur : la réponse devient **HTML ou JSON** selon ce que demande le navigateur.

</v-click>

::bottom::

> 🎯 Objectif : envoyer une requête **en arrière-plan** avec `fetch`, négocier une réponse **JSON**, puis mettre en **cache** une requête coûteuse — trois compétences qui se revoient en entretien et en soutenance.

<!--
Plan des chapitres : ch. 01 le cycle requête/réponse (le problème mesuré dans les DevTools),
ch. 02 fetch en arrière-plan, ch. 03 la réponse JSON (une même action, deux réponses),
ch. 04 le cache applicatif sur le classement.
Le point de départ est l'état de fin de S6 : tag s6-ch8-injection-sql.
Rappel : le CSRF (S5) et la session (S6) ne changent pas — c'est justement tout l'intérêt de l'approche : les routes web existantes suffisent.
-->
