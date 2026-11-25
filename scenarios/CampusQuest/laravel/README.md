# Campus Quest — projet de démonstration

Projet Laravel 12 + Sail utilisé par le formateur pour les **live codings** (S1-S2) et les **démos flash** (à partir de la S3) du cours Framework.

## Structure

```
laravel/
├── app/          # le projet Laravel (à lancer avec Sail) — état de départ de la S2
├── seance-02/    # live coding S2 : routing, contrôleurs, Blade
│   ├── LIVECODING.md   # fil à suivre, calé sur les slides 02-routing-blade
│   └── solution/       # fichiers finaux à copier dans app/
├── seance-03/    # démo flash S3 : Eloquent, migrations, relations, seeders
│   ├── LIVECODING.md   # fil à suivre, calé sur les slides 03-eloquent
│   └── solution/       # fichiers finaux à copier dans app/ (prérequis : solution S2 appliquée)
└── seance-04/    # démo flash S4 : requêtes, eager loading, Debugbar, agrégats, pagination
│   ├── LIVECODING.md   # fil à suivre, calé sur les slides 04-request
│   └── solution/       # fichiers finaux à copier dans app/ (prérequis : solution S3 appliquée)
├── seance-05/    # démo flash S5 : formulaires, CSRF, validation, Route::resource, Form Request (+ services en annexe)
│   ├── LIVECODING.md   # fil à suivre, calé sur les slides 05-formulaires
│   └── solution/       # fichiers finaux à copier dans app/ (prérequis : solutions S2 puis S3 puis S4 appliquées — inclut l'état S4 : filtres, pagination, /classement)
└── seance-06/    # démo flash S6 : Breeze, connexion, hash, middleware auth, Gate, quêtes acceptées, XSS, injection SQL
    ├── LIVECODING.md   # fil à suivre, calé sur les slides 06-authentification
    └── solution/       # fichiers écrits ou modifiés par la S6 (prérequis : solution S5 appliquée, puis Breeze installé et trié — voir LIVECODING.md)
└── seance-07/    # démo flash S7 : fetch, réponse JSON, cache applicatif
    ├── LIVECODING.md   # fil à suivre, calé sur les slides 07-interactivite
    └── solution/       # fichiers écrits ou modifiés par la S7 (prérequis : solution S6 appliquée — routes et vite.config inchangés)
```

## Appliquer une séance

Depuis `laravel/` :

```bash
cp -r seance-02/solution/* app/   # état final de la S2
cp -r seance-03/solution/* app/   # état final de la S3 (après la S2)
cp -r seance-04/solution/* app/   # état final de la S4 (après la S3)
cp -r seance-05/solution/* app/   # état final de la S5 (après la S4 — inclut filtres, pagination et /classement)
# S6 : d'abord sail composer require laravel/breeze --dev && sail artisan breeze:install blade, puis le tri du chapitre 01 (LIVECODING.md)
cp -r seance-06/solution/* app/   # état final de la S6 (après la S5 et l'installation de Breeze)
cp -r seance-07/solution/* app/   # état final de la S7 (après la S6 — fetch, JSON, cache ; penser à CACHE_STORE=database dans .env)
```

L'installation et les commandes Sail sont décrites dans [`base/README.md`](base/README.md).
