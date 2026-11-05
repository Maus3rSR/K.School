# Fil à suivre — Séance 3 : Eloquent — modèles, relations, migrations

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/03-eloquent/` (5 chapitres, un cycle « théorie → livecoding → micro-pratique WishFlix » chacun).
Le projet Laravel est dans `../base/` ; l'état final est dans `solution/` (à copier avec `cp -r solution/* ../base/` **uniquement** sur un projet où vous n'avez pas déjà généré vos propres migrations : les timestamps générés en direct différeraient de ceux de `solution/`).

## Étape ↔ chapitre ↔ tag

Les tags sont **déclarés** ici ; ils sont créés dans le dépôt `School_Framework_CampusQuest` (un commit par étape, un tag à la fin de chaque chapitre).

| Étape | Contenu | Chapitre | Tag Campus Quest |
|---|---|---|---|
| 1.1 | `.env` + Tinker (modèle absent) | 1 — Une table, un objet | `s3-ch1-table-objet` |
| 1.2 | `make:model Location -m` (squelettes vides) | 1 | `s3-ch1-table-objet` |
| 1.3 | Colonne `name` dans la migration | 1 | `s3-ch1-table-objet` |
| 1.4 | `migrate`, `migrate:status`, `rollback` | 1 | `s3-ch1-table-objet` |
| 1.5 | Tinker : `new Location`, `save()`, `find()` | 1 | `s3-ch1-table-objet` |
| 1.6 | (facultatif, jetable) migration `add_address_to_locations_table` | 1 | `s3-ch1-table-objet` |
| 2.1 | `make:model Category -m` + colonne `name` | 2 — Relation un-à-plusieurs | `s3-ch2-relation-1n` |
| 2.2 | `make:model Quest -m` avec `foreignId('category_id')->constrained()` | 2 | `s3-ch2-relation-1n` |
| 2.3 | `migrate` | 2 | `s3-ch2-relation-1n` |
| 2.4 | `Quest::create()` → `MassAssignmentException` | 2 | `s3-ch2-relation-1n` |
| 2.5 | `$fillable` + `casts()` (Quest, Category, Location) | 2 | `s3-ch2-relation-1n` |
| 2.6 | FK violée (`category_id` = 999) | 2 | `s3-ch2-relation-1n` |
| 2.7 | `belongsTo` / `hasMany` | 2 | `s3-ch2-relation-1n` |
| 2.8 | Tinker : naviguer entre les objets | 2 | `s3-ch2-relation-1n` |
| 3.1 | Migration de la pivot `location_quest` + `migrate` | 3 — Relation plusieurs-à-plusieurs | `s3-ch3-relation-nn` |
| 3.2 | `belongsToMany` des deux côtés | 3 | `s3-ch3-relation-nn` |
| 3.3 | Tinker : `attach` / `detach` / `sync` | 3 | `s3-ch3-relation-nn` |
| 4.1 | `migrate:fresh` : les données de Tinker disparaissent | 4 — Seeders et factory | `s3-ch4-seeders-factory` |
| 4.2 | `CategorySeeder` et `LocationSeeder` | 4 | `s3-ch4-seeders-factory` |
| 4.3 | `make:factory QuestFactory` + `HasFactory` | 4 | `s3-ch4-seeders-factory` |
| 4.4 | État `featured()` + `make()` / `create()` en Tinker | 4 | `s3-ch4-seeders-factory` |
| 4.5 | `QuestSeeder` (factory ×30 + `recycle` + `attach`) | 4 | `s3-ch4-seeders-factory` |
| 4.6 | `DatabaseSeeder` + `migrate:fresh --seed` | 4 | `s3-ch4-seeders-factory` |
| 5.1 | Contrôleur : `Quest::all()` / `findOrFail` | 5 — Brancher le catalogue sur la base | `s3-ch5-catalogue-n1` |
| 5.2 | Vues : objets, `$quest->category->name`, `locations` | 5 | `s3-ch5-catalogue-n1` |
| 5.3 | N+1 constaté : `DB::enableQueryLog()` puis `/quests` | 5 | `s3-ch5-catalogue-n1` |

## Avant la séance

- [ ] **Prérequis : la solution S2 est appliquée** (`cp -r ../seance-02/solution/* .` depuis `base/`) — routes, contrôleur tableau PHP, layout, vues.
- [ ] `cd ../base && ./vendor/bin/sail up -d` puis `sail npm install && sail npm run dev` (second terminal)
- [ ] `http://localhost/quests` affiche les 3 quêtes du tableau PHP
- [ ] Éditeur ouvert, terminal prêt (`sail artisan ...`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final
- [ ] Le projet démo tourne en **SQLite** (`DB_CONNECTION=sqlite` dans `.env`) : créer `database/database.sqlite` si absent (`touch database/database.sqlite` — `migrate` propose aussi de le créer). En cours, les slides montrent la config **MariaDB/Sail** : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb`, `DB_DATABASE=laravel`, `DB_USERNAME=sail`, `DB_PASSWORD=password` — les commandes `sail artisan` sont identiques dans les deux cas.
- [ ] Ne pas lancer `migrate` avant la séance : le chapitre 1 démarre sur une base sans nos tables (les tables par défaut Laravel — users, cache, jobs — sont jouées au premier `migrate`, c'est normal).

---

## Chapitre 1 — Une table, un objet (`01-table-et-objet.md`) — tag `s3-ch1-table-objet`

### 1.1 `.env` + Tinker

1. Ouvrir `.env` : montrer `DB_CONNECTION=sqlite` — ou chez vous MariaDB : `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.
2. Vérifier que `database/database.sqlite` existe (le créer sinon).
3. Lancer la console, constater que la classe n'existe pas encore :

```bash
sail artisan tinker
```

```php
Location::count();   // Error: Class "Location" not found — pas de modèle, pas d'ORM
```

### 1.2 Le modèle et sa migration

```bash
sail artisan make:model Location -m
```

**Montrer les squelettes générés** : le modèle est *vide* (`class Location extends Model {}`), la migration ne contient que `id()` et `timestamps()`. Les colonnes ne sont **pas** déduites : on les écrit à la main. Dire pourquoi `-m`. Alternatives : `make:migration`, `-mfs`, `--all`.

### 1.3 La colonne

Coller dans la migration (cf. `solution/database/migrations/2026_01_01_000001_create_locations_table.php`) :

```php
Schema::create('locations', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});
```

### 1.4 Jouer, vérifier, annuler (timeline des migrations)

```bash
sail artisan migrate
sail artisan migrate:status
sail artisan migrate:rollback
sail artisan migrate
```

Expliquer le batch : `rollback` annule le dernier lot. Dire en une phrase que `migrate:fresh` existe mais qu'on ne le tape jamais en production.

### 1.5 Tinker : une ligne = un objet

```php
$l = new Location();
$l->name = 'BU';
$l->save();                 // INSERT
Location::find(1)->name;    // "BU"
Location::count();          // 1
```

Faute volontaire possible : `$l->nmae = 'Amphi'; $l->save();` → erreur « Unknown column ». **Ne pas utiliser `Location::create([...])`** : il demande `$fillable`, découvert au chapitre 2.

### 1.6 (facultatif, jetable) Modifier une table jouée

```bash
sail artisan make:migration add_address_to_locations_table --table=locations
```

Écrire `$table->string('address')->nullable();` dans `up()` et `dropColumn('address')` dans `down()`, jouer `migrate`, puis `migrate:rollback` et **supprimer le fichier** : la solution ne contient pas cette colonne.

---

## Chapitre 2 — Relation un-à-plusieurs (`02-relation-un-a-plusieurs.md`) — tag `s3-ch2-relation-1n`

### 2.1 La table pointée : Category

```bash
sail artisan make:model Category -m
```

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});
```

### 2.2 La table qui pointe : Quest et sa clé étrangère

```bash
sail artisan make:model Quest -m
```

Coller (`solution/database/migrations/2026_01_01_000003_create_quests_table.php`) :

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

Insister : Artisan ne génère **aucune** clé étrangère ; `categories` doit être jouée **avant** `quests` (ordre des timestamps : les fichiers viennent d'être générés dans le bon ordre).

### 2.3 Jouer

```bash
sail artisan migrate
sail artisan migrate:status
```

### 2.4 `create()` échoue : l'assignation de masse

```php
Category::create(['name' => 'Mission']);   // MassAssignmentException : Add [name] to fillable…
```

### 2.5 `$fillable` et `casts()`

Coller dans `app/Models/Quest.php` (cf. `solution/app/Models/Quest.php`) :

```php
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

Idem `protected $fillable = ['name'];` dans `Category` **et** `Location`. Montrer la liste blanche : `(new Quest(['title' => 'Test', 'nope' => 1]))->getAttributes()` → seul `title` reste, `nope` est ignoré **sans erreur**. Rappel de comportement (Laravel 12) : **aucun** `$fillable` → `MassAssignmentException` ; un `$fillable` partiel → colonnes hors liste ignorées en silence, sauf si `Model::preventSilentlyDiscardingAttributes()` est activé.

Créer les données de démo en Tinker :

```php
Category::create(['name' => 'Quiz']);
Category::create(['name' => 'Mission']);
Quest::create(['title' => 'Salle 404', 'description' => '…', 'xp' => 50, 'difficulty' => 'easy', 'category_id' => 2]);
```

### 2.6 La FK protège (erreur volontaire)

```php
Quest::create([... 'category_id' => 999]);   // QueryException : contrainte de clé étrangère
```

### 2.7 `belongsTo` / `hasMany`

```php
// Quest.php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

// Category.php
public function quests(): HasMany
{
    return $this->hasMany(Quest::class);
}
```

(`use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};` en tête — `solution/app/Models/` contient les fichiers finaux.)

### 2.8 Naviguer

```php
$quest = Quest::first();
$quest->category->name;
Category::find(2)->quests->count();
Category::find(2)->quests()->create(['title' => 'Quiz du RU', ...]);
```

---

## Chapitre 3 — Relation plusieurs-à-plusieurs (`03-relation-plusieurs-a-plusieurs.md`) — tag `s3-ch3-relation-nn`

### 3.1 La pivot

`Location` existe depuis le chapitre 1, `Quest` depuis le chapitre 2 : la pivot peut les référencer.

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

Convention : singulier + ordre alphabétique (`location` < `quest`). Pas d'`id()` ni de `timestamps()`. Puis `sail artisan migrate`.

### 3.2 `belongsToMany`

```php
// Quest.php
public function locations(): BelongsToMany
{
    return $this->belongsToMany(Location::class);
}

// Location.php
public function quests(): BelongsToMany
{
    return $this->belongsToMany(Quest::class);
}
```

### 3.3 Écrire dans la pivot (Tinker)

```php
Location::create(['name' => 'Cafét']);
Location::create(['name' => 'Amphi']);
$quest = Quest::first();
$quest->locations()->attach(2);
$quest->locations()->attach([1, 3]);
$quest->locations()->attach(2);   // erreur volontaire : doublon refusé par la clé composite
$quest->locations()->detach(2);
$quest->locations()->sync([1, 3]);
$quest->locations;                // la Collection
```

---

## Chapitre 4 — Seeders et factory (`04-seeders-factory.md`) — tag `s3-ch4-seeders-factory`

Démo guidée : les étudiants suivent, ils écrivent eux-mêmes seulement les seeders de données fixes.

### 4.1 Le problème

```bash
sail artisan migrate:fresh
```

Les lignes saisies en Tinker ont disparu.

### 4.2 Données fixes

```bash
sail artisan make:seeder CategorySeeder
sail artisan make:seeder LocationSeeder
```

Coller `solution/database/seeders/` : `CategorySeeder` (`['Quiz', 'Mission', 'Culture G']`), `LocationSeeder` (`['BU', 'Cafét', 'Amphi']`). Tester seul : `sail artisan db:seed --class=CategorySeeder`.

### 4.3 La factory

```bash
sail artisan make:factory QuestFactory
```

Coller `solution/database/factories/QuestFactory.php` : un commentaire `//` au-dessus de chaque ligne de `definition()` ; `fake()` est une **fonction helper** (pas une facade) qui renvoie `Faker\Generator` ; `APP_FAKER_LOCALE=fr_FR` dans `.env` pour des données françaises. Ajouter `use HasFactory;` (+ l'import) dans `Quest`.

### 4.4 L'état et la fabrication

```php
Quest::factory()->count(3)->create();
Quest::factory()->featured()->make();   // non sauvegardée
```

### 4.5 `QuestSeeder`

```bash
sail artisan make:seeder QuestSeeder
```

Coller `solution/database/seeders/QuestSeeder.php` (factory ×30 + `recycle(Category::all())` + `attach` de 1 à 3 lieux). Moment léger improvisé (hors `solution/`) : deux quêtes écrites à la main, « Trouver la salle 404 (elle n'existe pas) » et « Convaincre l'imprimante de la BU de coopérer ».

### 4.6 `DatabaseSeeder` et reconstruction

Coller `$this->call([...])` dans l'ordre catégories → lieux → quêtes (inverser l'ordre pour montrer l'erreur de clé étrangère si le temps le permet).

```bash
sail artisan migrate:fresh --seed
```

---

## Chapitre 5 — Brancher le catalogue sur la base (`05-catalogue-n-plus-un.md`) — tag `s3-ch5-catalogue-n1`

### 5.1 Le contrôleur

Remplacer le tableau PHP par Eloquent (`solution/app/Http/Controllers/QuestController.php`) :

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

`findOrFail` = la 404 gratuite : tester `/quests/999`.

### 5.2 Les vues

- Le filtre `?difficulty=` de la S2 disparaît (`where` = S4) — retirer les liens de filtre (cf. `solution/resources/views/quests/index.blade.php`).
- `$quest->title` (objet, plus de `['title']`), `{{ $quest->category->name }}` dans la carte, `@forelse ($quest->locations …)` dans la fiche.

Revenir sur `/quests` : 30 quêtes seedées.

### 5.3 Le N+1, constaté

Faire deviner le chiffre, puis dans Tinker :

```php
DB::enableQueryLog();
$quests = Quest::all();
$quests->each(fn ($q) => $q->category->name);
count(DB::getQueryLog());   // = 31 pour 30 quêtes
```

Teaser (une phrase, **sans l'expliquer**) : `Quest::with('category')->get()` = 2 requêtes — déroulé en S4.

---

## Rejouer la démo

```bash
sail artisan migrate:fresh --seed    # repartir d'une base peuplée (données perdues)
```

Pour sauter à la solution : `cp -r solution/* ../base/` depuis `seance-03/` (projet sans migrations générées à la main).
