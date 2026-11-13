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
└── seance-05/    # démo flash S5 : formulaires, CSRF, validation, Route::resource, Form Request (+ services en annexe)
    ├── LIVECODING.md   # fil à suivre, calé sur les slides 05-formulaires
    └── solution/       # fichiers finaux à copier dans app/ (prérequis : solutions S2 puis S3 puis S4 appliquées — inclut l'état S4 : filtres, pagination, /classement)
```

## Appliquer une séance

Depuis `laravel/` :

```bash
cp -r seance-02/solution/* app/   # état final de la S2
cp -r seance-03/solution/* app/   # état final de la S3 (après la S2)
cp -r seance-04/solution/* app/   # état final de la S4 (après la S3)
cp -r seance-05/solution/* app/   # état final de la S5 (après la S4 — inclut filtres, pagination et /classement)
```

L'installation et les commandes Sail sont décrites dans [`base/README.md`](base/README.md).
