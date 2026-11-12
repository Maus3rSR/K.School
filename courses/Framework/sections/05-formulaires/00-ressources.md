---
layout: two-cols-header
transition: slide-left | slide-right
---

# Ressources pour ce cours

::left::

## Documentation Laravel 12

📖 [Validation](https://laravel.com/docs/12.x/validation) - Valider les données entrantes : `validate()`, règles disponibles et affichage des erreurs

📖 [CSRF Protection](https://laravel.com/docs/12.x/csrf) - Le jeton `_token`, la directive `@csrf` et le middleware qui vérifie chaque requête

📖 [Controllers — Resource Controllers](https://laravel.com/docs/12.x/controllers#resource-controllers) - `Route::resource` et les sept actions conventionnelles

::right::

## Pour aller plus loin

📖 [Form Request Validation](https://laravel.com/docs/12.x/validation#form-request-validation) - Centraliser les règles dans une classe dédiée, injectée dans le contrôleur

📖 [Route Model Binding](https://laravel.com/docs/12.x/routing#route-model-binding) - Injecter automatiquement le modèle correspondant au paramètre de route

📖 [Service Container](https://laravel.com/docs/12.x/container) - L'outil qui construit et injecte vos dépendances, dont vos services

📖 [Session — Flash Data](https://laravel.com/docs/12.x/session#flash-data) - Les données de session qui ne vivent que le temps d'une requête

<!--
La page Validation reste ouverte pendant toute la séance : la liste des règles disponibles y est exhaustive.
CSRF : la section « Preventing CSRF Requests » explique le jeton et l'exemple du formulaire malveillant utilisé en cours.
Le Service Container a été effleuré en S1 (inversion de contrôle) — l'annexe services y revient en situation.
-->
