# Campus Quest — projet de démonstration

Projet Laravel 12 + Sail utilisé par le formateur pour les **live coding** du cours Framework.

## Structure

```
laravel/
├── app/          # le projet Laravel (à lancer avec Sail) — état de départ de la S2
├── seance-02/    # live coding S2 : routing, contrôleurs, Blade
│   ├── LIVECODING.md   # fil à suivre, calé sur les slides 02-routing-blade
│   └── solution/       # fichiers finaux à copier dans app/
└── seance-03/    # live coding S3 : Eloquent, migrations, relations, seeders
    ├── LIVECODING.md   # fil à suivre, calé sur les slides 03-eloquent
    └── solution/       # fichiers finaux à copier dans app/ (prérequis : solution S2 appliquée)
```

## Appliquer une séance

Depuis `laravel/` :

```bash
cp -r seance-02/solution/* app/   # état final de la S2
cp -r seance-03/solution/* app/   # état final de la S3 (après la S2)
```

L'installation et les commandes Sail sont décrites dans [`base/README.md`](base/README.md).
