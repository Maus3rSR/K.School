---
layout: two-cols-header
---

# Ressources pour ce cours

::left::

## Documentation Laravel 12

📖 [Query Builder](https://laravel.com/framework/docs/12.x/queries) - `DB::table()`, `where`, `orderBy`, agrégats et le SQL généré

📖 [Eloquent Relationships — Eager Loading](https://laravel.com/framework/docs/12.x/eloquent-relationships#eager-loading) - `with()`, `load()`, `withCount` et la prévention du N+1

📖 [Pagination](https://laravel.com/framework/docs/12.x/pagination) - `paginate()`, `simplePaginate()`, `links()` et `withQueryString()`

::right::

## Pour aller plus loin

📖 [Laravel Debugbar](https://laraveldebugbar.com/docs/installation) - La barre de profiling : requêtes exécutées, durées, doublons

📖 [Eloquent — Preventing Lazy Loading](https://laravel.com/framework/docs/12.x/eloquent-relationships#preventing-lazy-loading) - `Model::preventLazyLoading()` pour faire échouer le N+1 en dev

📖 [Laravel Telescope](https://laravel.com/framework/docs/12.x/telescope) - L'outil d'inspection complet : requêtes, exceptions, jobs — plus lourd que la Debugbar

<!--
Les pages Query Builder et Pagination restent ouvertes pendant l'atelier WishFlix.
Debugbar : la doc du projet (laraveldebugbar.com) est la référence d'installation — package fruitcake/laravel-debugbar.
Telescope : mentionné en fin de chapitre 4, aucune installation prévue aujourd'hui.
-->
