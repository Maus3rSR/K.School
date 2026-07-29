---
layout: two-cols-header
layoutClass: gap-x-4
---

# Rappel — les méthodes HTTP

Chaque requête porte une intention précise

::left::

<img src="/http-request-methods.png" alt="Tableau des méthodes HTTP : GET, POST, PUT, DELETE, PATCH, HEAD" class="w-full object-contain max-h-100 rounded" />

::right::

<v-click>

**Dans ce cours**

- `GET` — récupérer des données (par défaut avec `fetch()`)
- `POST` — envoyer de nouvelles données

</v-click>

<div v-click="2">

**Bon à savoir**

- `PUT` / `PATCH` / `DELETE` existent, on les verra pour les formulaires
- `fetch()` peut envoyer n'importe laquelle via un objet d'option : 
`{ method: 'POST' }`

</div>

<!--
Cette slide sert de repère avant la fin du chapitre — on n'utilise que GET dans cette séance (lecture de données), POST/PUT/DELETE reviendront avec les formulaires (mutation de données).
Ne pas s'attarder sur CONNECT/OPTIONS/TRACE, ce sont des méthodes techniques rarement manipulées directement par un développeur front.
-->
