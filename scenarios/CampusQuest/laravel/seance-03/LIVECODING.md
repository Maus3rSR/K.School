# Fil à suivre — Séance 3 : Eloquent — modèles, relations, migrations

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/03-eloquent/`.
Le projet Laravel est dans `../app/` ; les fichiers finaux à coller sont dans `solution/` (à copier avec `cp -r solution/* ../app/`).

## Avant la séance

- [ ] **Prérequis : la solution S2 est appliquée** (`cp -r ../seance-02/solution/* .` depuis `app/`) — routes, contrôleur tableau PHP, layout, vues.
- [ ] `cd ../app && ./vendor/bin/sail up -d` puis `sail npm install && sail npm run dev` (second terminal)
- [ ] `http://localhost/quests` affiche les 3 quêtes du tableau PHP
- [ ] Éditeur ouvert, terminal prêt (`sail artisan ...`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final
- [ ] Le projet démo tourne en **SQLite** (`DB_CONNECTION=sqlite` dans `.env`) : créer `database/database.sqlite` si absent (`touch database/database.sqlite` — `migrate` propose aussi de le créer). En cours, les slides montrent la config **MariaDB/Sail** : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb`, `DB_DATABASE=laravel`, `DB_USERNAME=sail`, `DB_PASSWORD=password` — les commandes `sail artisan` sont identiques dans les deux cas.

---

## a. `.env` + Tinker — `01-orm.md` (« Connecter l'application à la base », « Tinker »)

1. Ouvrir `.env` : montrer `DB_CONNECTION=sqlite` — ou chez vous MariaDB : dérouler `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` (slide `.env`).
2. Vérifier que `database/database.sqlite` existe (le créer sinon).
3. Lancer la console :

```bash
sail artisan tinker
```

```php
Quest::count();   // = 0 — la classe n'existe pas encore ? Non : le modèle non plus !
```

En fait, avant `make:model`, `Quest::count()` lève une erreur « class not found » — c'est la transition parfaite vers l'étape b. Rappeler : Tinker = REPL qui exécute du PHP dans le contexte de l'appli, rien n'est sauvegardé dans le code.

## b. Modèles Category et Location — `01-orm.md` (« make:model ») + `02-migrations.md`

```bash
sail artisan make:model Category -m
sail artisan make:model Location -m
```

**Montrer les squelettes générés** : le modèle est *vide* (`class Category extends Model {}`), la migration ne contient que `id()` et `timestamps()`. Les champs ne sont **pas** déduits du modèle — on les écrit à la main.

Coller dans les migrations (cf. `solution/database/migrations/`) :

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});
```

Idem pour `locations`. Dire pourquoi `-m` : une seule commande, nom `create_categories_table` conforme à la convention. Alternatives à citer : `make:migration` seul, `make:model Quest -mfs` (factory + seeder), `--all`.

## c. Le modèle Quest — `02-migrations.md` (« Anatomie d'une migration »)

```bash
sail artisan make:model Quest -m
```

Montrer le squelette vide **puis** coller le schéma complet (`solution/database/migrations/2026_01_01_000003_create_quests_table.php`) :

```php
Schema::create('quests', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description');
    $table->unsignedInteger('xp')->default(0);
    $table->string('difficulty');
    $table->boolean('featured')->default(false);
    $table->foreignId('category_id')->constrained();   // écrit à la main : rien ne le génère
    $table->timestamps();
});
```

Insister : `foreignId('category_id')->constrained()` est tapé à la main — Artisan ne génère **aucune** clé étrangère. La table `categories` doit être jouée **avant** `quests` (ordre des timestamps = ordre des migrations).

## d. La table pivot — `06-relations-plusieurs-a-plusieurs.md` (« La migration de la table pivot »)

```bash
sail artisan make:migration create_location_quest_table
```

Coller (`solution/database/migrations/2026_01_01_000004_create_location_quest_table.php`) :

```php
Schema::create('location_quest', function (Blueprint $table) {
    $table->foreignId('location_id')->constrained();
    $table->foreignId('quest_id')->constrained();

    $table->primary(['location_id', 'quest_id']);
});
```

Convention : singulier + ordre alphabétique (`location` < `quest`). Pas d'`id()` ni de `timestamps()`.

## e. Jouer les migrations — `02-migrations.md` (« Jouer, vérifier, annuler »)

```bash
sail artisan migrate
sail artisan migrate:status
```

## f. `$fillable` et `casts()` — `03-eloquent-crud.md` (« Un modèle qui accepte la donnée »)

Coller dans `app/Models/Quest.php` (cf. `solution/app/Models/Quest.php`) :

```php
use HasFactory;   // + use Illuminate\Database\Eloquent\Factories\HasFactory;

protected $fillable = [
    'title', 'description', 'xp',
    'difficulty', 'featured', 'category_id',
];

protected function casts(): array
{
    return [
        'featured' => 'boolean',
    ];
}
```

`$fillable` s'écrit à la main lui aussi : Eloquent lit les colonnes **en base**, le modèle ne les déclare pas. Provoquer la `MassAssignmentException` en Tinker : `Quest::create(['nope' => 1])`.

## g. Relations dans les modèles — `04-…` et `06-relations-…` (« Déclarer la relation », « belongsToMany »)

Coller dans les modèles (cf. `solution/app/Models/`) :

```php
// Quest.php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

public function locations(): BelongsToMany
{
    return $this->belongsToMany(Location::class);
}

// Category.php
public function quests(): HasMany
{
    return $this->hasMany(Quest::class);
}

// Location.php
public function quests(): BelongsToMany
{
    return $this->belongsToMany(Quest::class);
}
```

## h. Le piège N+1 en direct — `05-piege-n-plus-un.md`

Dans Tinker :

```php
DB::enableQueryLog();
$quests = Quest::all();
$quests->each(fn ($q) => $q->category->name);
count(DB::getQueryLog());   // = 11 pour 10 quêtes… ou 31 pour 30
```

Faire deviner le chiffre avant de l'afficher. Teaser : `Quest::with('category')->get()` = 2 requêtes — déroulé en S4, **ne pas expliquer**.

## i. La factory — `07-factories.md`

```bash
sail artisan make:factory QuestFactory
```

Coller `solution/database/factories/QuestFactory.php` : un commentaire `//` au-dessus de chaque ligne de `definition()` ; rappeler que `fake()` est une **fonction helper** (pas une facade) qui renvoie `Faker\Generator` — `APP_FAKER_LOCALE=fr_FR` dans `.env` pour des données françaises. Ajouter `use HasFactory;` au modèle si pas déjà fait.

```php
Quest::factory()->count(5)->create();
Quest::factory()->featured()->create();
```

## j. Les seeders — `08-seeders.md`

```bash
sail artisan make:seeder CategorySeeder
sail artisan make:seeder LocationSeeder
sail artisan make:seeder QuestSeeder
```

Coller `solution/database/seeders/` : `CategorySeeder` (`['Quiz', 'Mission', 'Culture G']`), `LocationSeeder` (`['BU', 'Cafét', 'Amphi']`), `QuestSeeder` (factory ×30 + `recycle(Category::all())` + `attach` de 1 à 3 lieux), `DatabaseSeeder` (`$this->call([...])` dans l'ordre catégories → lieux → quêtes).

```bash
sail artisan migrate:fresh --seed
```

## k. Le catalogue lit la base — `03-eloquent-crud.md` (« Brancher le contrôleur »)

Remplacer le tableau PHP par Eloquent (coller `solution/app/Http/Controllers/QuestController.php`) :

```php
public function index()
{
    return view('quests.index', ['quests' => Quest::all()]);
}

public function show(int $id)
{
    return view('quests.show', ['quest' => Quest::findOrFail($id)]);
}
```

- `findOrFail` = la 404 gratuite : tester `/quests/999`.
- Le filtre `?difficulty=` de la S2 disparaît (`where` = S4) — retirer les liens de filtre (cf. `solution/resources/views/quests/index.blade.php`).
- Vues adaptées : `$quest->title` (objet, plus de `['title']`), `{{ $quest->category->name }}` dans la carte — **chaque carte = 1 requête de plus**, c'est le N+1 de l'étape h qui revient à l'écran ; `@forelse ($quest->locations …)` dans la fiche.

Revenir sur `/quests` : la page affiche désormais les 30 quêtes seedées.

---

## Rejouer la démo

```bash
sail artisan migrate:fresh    # repartir d'une base vide (données perdues)
```

Pour sauter à la solution : `cp -r solution/* ../app/` depuis `seance-03/`.
