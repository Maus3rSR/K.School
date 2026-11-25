---
layout: two-cols-header
transition: slide-left | slide-right
---

# Ressources pour ce cours

::left::

## Documentation Laravel 12

📖 [HTTP Requests](https://laravel.com/docs/12.x/requests) - Lire la requête entrante : `$request->expectsJson()`, `$request->user()` et les en-têtes

📖 [Responses](https://laravel.com/docs/12.x/responses) - `response()->json()`, les statuts HTTP et le contenu négocié

📖 [Cache](https://laravel.com/docs/12.x/cache) - `Cache::remember()`, les stores disponibles et la durée de vie (TTL)

::right::

## Pour aller plus loin

📖 [MDN — Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) - `fetch()`, l'objet `Response`, `FormData` et `async/await` (en français)

📖 [MDN — JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON) - Le format JSON et ses méthodes `parse()` / `stringify()`

📖 [Chrome DevTools — Network panel](https://developer.chrome.com/docs/devtools/network/) - L'onglet Réseau : filtrer les documents, lire les en-têtes et les temps de réponse

<!--
La page Requests est celle qui documente expectsJson() et wantsJson() : elle reste ouverte pendant le chapitre 03.
Cache documente tous les stores (file, database, redis…) et flexible() — le bonus de l'exercice s'y réfère.
Les deux pages MDN sont en français et couvrent exactement le JavaScript du chapitre 02 : les étudiants BUT les ont probablement déjà croisées.
-->
