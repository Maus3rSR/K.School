---
layout: cover
background: https://cover.sli.dev?10
---

# Conclusion

<!--
Durée : 20 minutes
Objectif : relier les 10 séances entre elles et ouvrir sur la suite, sans recopier verbatim chaque slide déjà vue.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Conclusion

Le chemin parcouru en 4 grandes étapes

::left::

<div v-click>

**1. Construire une interface** *(S1-S3)*

Environnement TypeScript, JSX, composants, props typées, CSS

</div>

<div v-click class="mt-4">

**2. La rendre vivante** *(S4-S6)*

Événements, state, rendu conditionnel, listes, cycle de vie

</div>

::right::

<div v-click>

**3. La connecter au monde** *(S7-S9)*

Appels API, gestion loading/error, navigation multi-pages, routes dynamiques

</div>

<div v-click class="mt-4">

**4. La rendre réutilisable** *(S10)*

Hooks personnalisés : la même logique, partout où vous en avez besoin

</div>

<!--
Ne pas relister chaque concept individuellement — l'objectif est de montrer que ces 10 séances forment une progression cohérente, pas 10 blocs isolés.
Faire le lien explicite : chaque étape s'appuie sur la précédente (les hooks personnalisés de S10 combinent littéralement useState de S4 et useEffect de S6).
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Conclusion

Ce que vous savez faire maintenant

::left::

<div v-click>

- Créer une **SPA React + TypeScript** de bout en bout
- Structurer une application en **composants réutilisables et typés**
- Gérer l'**état local** et réagir aux **événements utilisateur**

</div>

::right::

<div v-click>

- **Consommer une API** avec gestion propre des états de chargement
- Mettre en place une **navigation multi-pages** avec des routes dynamiques
- **Factoriser** une logique répétée dans vos propres hooks

</div>

<!--
Cette slide croise des acquis de séances différentes (S1 à S10) plutôt que de recopier une séance à la fois — c'est la synthèse finale de tout le cours.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Conclusion

Pour continuer après la formation

::left::

<div v-click>

**Aller plus loin avec React**

- `useContext` — partager un état sans tout faire remonter par les props
- `useReducer` — gérer un state complexe avec des actions
- `useMemo` / `useCallback` — optimiser les re-rendus

</div>

::right::

<div v-click>

**Élargir l'écosystème**

- **Next.js** — framework React pour le rendu serveur et les routes de fichiers
- **Zustand** ou **Redux Toolkit** — state management global
- **Vitest** + **Testing Library** — tester vos composants

</div>

<!--
Donner un aperçu réaliste des étapes suivantes sans les développer — ce sont des sujets pour après la formation.
useContext et useReducer sont les suites naturelles : ils répondent à des limites que les apprenants ont pu ressentir en pratiquant les hooks personnalisés (état encore local à chaque composant).
-->

---
layout: center
class: text-center
---

# Conclusion

&nbsp;

> 💬 Vous êtes parti d'un simple `npm create vite` — vous repartez avec une application interactive, connectée et testable.

<div v-click>

<br/>

**Continuez à pratiquer, un projet à la fois.**

</div>

<!--
Mot de clôture. Remercier le groupe, prendre les questions finales, rappeler les ressources listées dans les slides "Ressources" de chaque séance.
-->
