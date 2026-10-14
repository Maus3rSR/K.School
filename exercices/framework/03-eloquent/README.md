# Exercice 03 — Eloquent : modèles, relations et seeders

## Objectif

Remplacer le **tableau PHP** du `GameController` par une **vraie base de données** : créer les modèles `Game`, `Category` et `Platform` avec leurs migrations et relations, remplir la base avec des seeders, puis brancher l'accueil et la fiche jeu sur Eloquent.

**Durée estimée** : 4h45 (Partie A : 2h en séance · Partie B : ~2h chez vous · Partie C : ~45 min chez vous · Bonus : au choix)

> **Déroulé** — En séance (2h) : Partie A · Chez vous : Partie B (~2h) + Partie C (~45 min) · Bonus : au choix · ⚠️ **Requis pour la séance 4** : la Partie A terminée (migrations, relations, catalogue branché) — en S4 on interrogera cette base avec des requêtes plus fines.

**Référence officielle** :

- [Eloquent : Getting Started](https://laravel.com/framework/docs/12.x/eloquent)
- [Migrations](https://laravel.com/framework/docs/12.x/migrations)
- [Eloquent Relationships](https://laravel.com/framework/docs/12.x/eloquent-relationships)
- [Eloquent Factories](https://laravel.com/framework/docs/12.x/eloquent-factories)
- [Database Seeding](https://laravel.com/framework/docs/12.x/seeding)

---

## Prérequis

- La **Partie A de l'exercice 02 terminée** : layout `app.blade.php`, accueil `/` qui liste au moins 4 jeux depuis un tableau PHP, fiche `/game/{id}` avec gestion du 404
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`)
- Le `.env` configuré par Sail à l'installation (`?with=mariadb`) : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb`

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

---

## Partie A — En séance (atelier WishFlix)

### A1 — Vérifier la connexion et créer les modèles

1. Ouvrez `.env` et vérifiez que la connexion pointe sur le service MariaDB de Sail : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb`, `DB_PORT=3306`. Lancez `./vendor/bin/sail artisan migrate` : les tables par défaut de Laravel (users, cache, jobs…) doivent se créer — c'est la preuve que la connexion fonctionne.
2. Générez les trois modèles **dans cet ordre** — important pour les clés étrangères :
   - `./vendor/bin/sail artisan make:model Category -m`
   - `./vendor/bin/sail artisan make:model Platform -m`
   - `./vendor/bin/sail artisan make:model Game -m`
3. Repérez les fichiers créés : les modèles dans `app/Models/`, les migrations dans `database/migrations/` (le timestamp du nom de fichier fixe leur ordre d'exécution).
   > Le modèle généré est **vide** et la migration un **squelette** (`id()` + `timestamps()` seulement) : rien n'est déduit — les colonnes s'écrivent à la main dans le `up()` de la migration, et le `$fillable` à la main dans le modèle.

### A2 — Les migrations

1. Complétez les `up()` des trois migrations générées :
   - `categories` : `id()`, `string('name')`, `timestamps()`
   - `platforms` : `id()`, `string('name')`, `timestamps()`
   - `games` : `id()`, `string('title')`, `text('synopsis')`, `unsignedSmallInteger('release_year')`, `decimal('rating', 3, 1)`, `unsignedSmallInteger('playtime_hours')`, `string('cover_url')`, `boolean('featured')->default(false)`, `string('status')`, `foreignId('category_id')->constrained()`, `timestamps()`
2. Créez la migration de la **table pivot** : `./vendor/bin/sail artisan make:migration create_game_platform_table`, puis dans son `up()` : `foreignId('game_id')->constrained()`, `foreignId('platform_id')->constrained()` et la clé primaire composite `primary(['game_id', 'platform_id'])`.
3. Jouez les migrations : `./vendor/bin/sail artisan migrate`, puis vérifiez avec `./vendor/bin/sail artisan migrate:status` — tout doit être à `Ran`.

> 💡 La pivot se nomme **au singulier, dans l'ordre alphabétique** : `game_platform`. C'est cette convention qui permet à `belongsToMany` de la trouver sans configuration.
> 💡 `foreignId('category_id')->constrained()` s'écrit **à la main** dans la migration de `games`, comme toute colonne — Artisan ne génère aucune clé étrangère.

### A3 — Les relations et le mass assignment

1. Dans `app/Models/Game.php`, ajoutez :
   - `category()` → `belongsTo(Category::class)`
   - `platforms()` → `belongsToMany(Platform::class)`
   - `$fillable` avec toutes les colonnes remplissables (`title`, `synopsis`, `release_year`, `rating`, `playtime_hours`, `cover_url`, `featured`, `status`, `category_id`)
   - `casts()` renvoyant `'featured' => 'boolean'`
2. Dans `app/Models/Category.php` : `games()` → `hasMany(Game::class)`
3. Dans `app/Models/Platform.php` : `games()` → `belongsToMany(Game::class)`
4. Testez dans `./vendor/bin/sail artisan tinker` : `Game::count()` renvoie `0` — c'est normal, la base est encore vide.

### A4 — Les seeders

1. Générez les seeders : `./vendor/bin/sail artisan make:seeder CategorySeeder`, `PlatformSeeder`, `GameSeeder`.
2. `CategorySeeder` : insérez **au moins 4 catégories** (RPG, Action, Aventure, Stratégie…).
3. `PlatformSeeder` : insérez **au moins 3 plateformes** (PC, PS5, Xbox, Switch…).
4. `GameSeeder` : insérez **au moins 6 jeux** — reprenez les **4 jeux de votre tableau PHP** de la S2 (avec leur `category_id`) et ajoutez-en au moins 2 ; puis attachez à chaque jeu 1 à 3 plateformes (`$game->platforms()->attach(...)`).
5. Dans `DatabaseSeeder::run()`, appelez les trois seeders **dans le bon ordre** : catégories et plateformes avant les jeux (ce qui est référencé avant ce qui référence).
6. Reconstruisez tout : `./vendor/bin/sail artisan migrate:fresh --seed`, puis vérifiez dans Tinker : `Game::count()` → au moins 6, `Game::first()->category->name` → une catégorie, `Game::first()->platforms` → une Collection non vide.

### A5 — Brancher le catalogue sur la base

1. Dans `GameController::index()`, remplacez le tableau par `Game::all()` et supprimez la propriété `$games`.
2. Dans `show(int $id)`, remplacez le tableau et son `abort_unless` par `Game::findOrFail($id)` — la 404 est automatique.
3. Adaptez les vues : `$game['title']` devient `$game->title`, la catégorie s'affiche avec `$game->category->name`, et `route('games.show', $id)` devient `route('games.show', $game->id)`.
4. Vérifiez : `/` liste les jeux **depuis la base**, `/game/1` affiche la fiche avec sa catégorie, `/game/999` → 404 (via `findOrFail`), `/game/abc` → 404 (contrainte de route inchangée).

### ✅ Checkpoint de fin de séance

- [ ] `sail artisan migrate:status` : toutes les migrations à `Ran`
- [ ] Dans Tinker : `Game::count()` ≥ 6, `Game::first()->category->name` affiche une catégorie, `Game::first()->platforms` une Collection non vide
- [ ] `sail artisan migrate:fresh --seed` reconstruit la base peuplée sans erreur
- [ ] `/` affiche les jeux depuis la base, `/game/{id}` la fiche avec sa catégorie
- [ ] `/game/999` → 404 par `findOrFail`, `/game/abc` → 404 par la contrainte
- [ ] Commit poussé sur votre dépôt GitHub privé

> Tout est coché ? Le catalogue WishFlix lit désormais une vraie base : en S4 vous apprendrez à l'interroger finement (tris, filtres, performance).

---

## Partie B — Chez vous (user stories)

### US1 — Seeders complets avec une factory

**En tant que** développeur, **je veux** obtenir environ 20 jeux variés en une commande, **afin de** tester le catalogue dans des conditions réalistes.

Critères d'acceptation :

- `GameFactory` (via `make:factory`) avec une `definition()` qui utilise `fake()` pour tous les champs — et `Category::factory()` ou `recycle()` pour la catégorie
- Le modèle `Game` utilise le trait `HasFactory`
- Un **état** `featured()` force `featured = true`, utilisé pour garantir qu'au moins un jeu est « à la une »
- `GameSeeder` crée ≈ 20 jeux via la factory et leur attache des plateformes aléatoires
- `migrate:fresh --seed` produit un catalogue varié à chaque run

### US2 — Plateformes sur la fiche jeu

**En tant que** joueur, **je veux** voir les plateformes d'un jeu sur sa fiche, **afin de** savoir où y jouer.

Critères d'acceptation :

- La fiche `/game/{id}` liste les plateformes du jeu (`@foreach` sur `$game->platforms`)
- Si le jeu n'a aucune plateforme, la section ne s'affiche pas (ou affiche « Non renseigné »)

### US3 — Nombre de jeux par catégorie

**En tant que** visiteur, **je veux** voir le nombre de jeux de chaque catégorie sur l'accueil, **afin de** repérer les catégories les plus fournies.

Critères d'acceptation :

- L'accueil affiche les catégories avec leur nombre de jeux (ex. « RPG — 7 jeux »)
- Le comptage passe par la relation : `$category->games()->count()` — une requête par catégorie est **acceptée à ce stade** (l'optimisation arrive en S4)
- Les catégories sont passées à la vue depuis le contrôleur

---

## Partie C — Sous le capot (chez vous, ~45 min)

`Game::all()`, `$game->category->name`, `belongsToMany(Platform::class)` : tout cela fonctionne alors que vous n'avez presque rien écrit — ni nom de table, ni propriété `title`, ni nom de table pivot. Où Eloquent va-t-il chercher tout ça ? Dans cette partie, vous allez lire le code du framework — dans `vendor/laravel/framework/src/Illuminate/Database/Eloquent/` — pour voir les conventions à l'œuvre.

Bonne nouvelle : il n'y a pas de magie, c'est du PHP, et vous savez lire du PHP. Lire du code qu'on n'a pas écrit soi-même, c'est d'ailleurs une bonne part du métier de développeur au quotidien — autant s'y entraîner dès maintenant.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque concept vous donne un fil à suivre — un fichier, une méthode. Suivez ce fil et ignorez le reste du fichier, même s'il fait des milliers de lignes.

> 🔧 **Outils pour naviguer dans le code**
>
> - `Ctrl+P` : ouvrir un fichier par son nom (tapez le début du nom, ex. `Model.php`)
> - `Ctrl+Shift+O` : sauter à une méthode dans le fichier ouvert (tapez son nom, ex. `getTable`)
> - `Ctrl+F` : chercher un mot dans le fichier ouvert
> - `Ctrl+clic` sur le nom d'une méthode ou d'une classe : aller à sa définition
>
> L'extension **PHP Intelephense** rend ces raccourcis bien plus efficaces dans `vendor/` — installez-la si ce n'est pas déjà fait.
>
> ⚠️ `vendor/` est en **lecture seule** pour vous : ne modifiez jamais ces fichiers — ils seraient écrasés au prochain `composer install`.

**Rendu** : dans `REPONSES.md` (à la racine du projet, créé en S1), ajoutez une section `## Séance 3 — Sous le capot`. Pour chaque réponse, indiquez aussi le **chemin suivi** : le fichier ouvert et la méthode qui vous a donné la réponse (ex. `Illuminate/Database/Eloquent/Model.php` → méthode `getTable`).

### C1 — Comment `Game` devine sa table (Observer, ~10 min)

**Point de départ** : votre classe `App\Models\Game` (dans `app/Models/Game.php`) est liée à la table `games`… sans que vous ayez rien configuré.

| # | Question |
|---|----------|
| 1 | Ouvrez `Illuminate/Database/Eloquent/Model.php` et trouvez la méthode `getTable` (Ctrl+Shift+O). Recopiez son `return`. L'opérateur `??` (« coalescence des nuls ») renvoie la valeur de gauche si elle existe et n'est pas `null`, sinon celle de droite : que signifie donc `$this->table ?? ...` pour votre modèle ? |
| 2 | Le nom de table est fabriqué par trois étapes enchaînées : `class_basename`, `Str::pluralStudly`, `Str::snake`. Dans `./vendor/bin/sail artisan tinker`, testez chaque étape séparément : `class_basename(App\Models\Game::class)`, puis `\Illuminate\Support\Str::pluralStudly('Game')`, puis `\Illuminate\Support\Str::snake('Games')`. Que renvoie chacune ? Vérifiez ensuite le résultat complet : `(new App\Models\Game)->getTable()`. |
| 3 | Prédisez : pour un modèle `GameReview` (qui n'existe pas — c'est un exercice de papier), quel nom de table la convention donnerait-elle ? Rejouez les trois étapes de la question 2 avec ce nom pour vérifier votre prédiction. |
| 4 | Votre table `games` suit la convention, mais un jour vous croiserez une table qui ne la suit pas. D'après le `??` de `getTable`, comment forcer un autre nom dans le modèle ? Écrivez la ligne exacte dans `REPONSES.md` (sans l'ajouter à `Game` : la convention vous convient). |

### C2 — Comment `belongsToMany` devine la table pivot (Relier, ~15 min)

**Point de départ** : dans `Game::platforms()`, le `return $this->belongsToMany(Platform::class);` écrit en A3 — qui trouve `game_platform` alors que vous ne lui avez jamais donné ce nom.

Le code des relations vit dans `Illuminate/Database/Eloquent/Concerns/HasRelationships.php` : un **trait** (cette « boîte d'outils » de méthodes branchée sur une classe, déjà croisée en S2 avec les `whereXxx`) que `Model` utilise.

| # | Question |
|---|----------|
| 5 | Dans `belongsToMany` (Ctrl+Shift+O), repérez le moment où le nom de la table pivot est choisi : cherchez `is_null($table)`. Que fait Laravel quand vous ne donnez pas de nom de table — quelle méthode est alors appelée ? |
| 6 | Ouvrez `joiningTable`. Commencez par lire **le commentaire écrit par les développeurs de Laravel** — oui, le framework s'explique lui-même, et lire les commentaires du code fait partie des bons réflexes. Quels sont les deux morceaux (« segments ») empilés dans `$segments` quand l'appel vient de `Game::platforms()` ? |
| 7 | Que font ensuite `sort($segments)` puis `strtolower(implode('_', $segments))` ? |
| 8 | Imaginez maintenant l'appel depuis l'autre côté, `Platform::games()` : quels seraient les segments **avant** le `sort`, et après ? Pourquoi ce tri alphabétique est-il indispensable pour que les deux côtés de la relation trouvent la même table ? |
| 9 | Vérifiez dans Tinker : `(new App\Models\Game)->joiningTable(App\Models\Platform::class)`. Que renvoie-t-il ? |
| 10 | Prédiction : plus tard, WishFlix reliera `User` et `Game` pour la wishlist. Quel nom de table pivot la convention attendra-t-elle ? (Faites le calcul à la main, comme `joiningTable`.) |

### C3 — `$game->title` et `$game->category` : deux lectures, deux chemins (Raisonner, ~20 min)

**Point de départ** : dans vos vues, `$game->title` et `$game->category->name` — alors que `app/Models/Game.php` ne déclare **ni** propriété `title`, **ni** propriété `category`.

Comment PHP accepte-t-il de lire une propriété qui n'existe pas ? Grâce à une **méthode magique** : une méthode au nom réservé (elles commencent par `__`) que PHP appelle tout seul dans une situation précise. Ici, `__get($key)` est appelée automatiquement quand on lit une propriété absente de l'objet.

| # | Question |
|---|----------|
| 11 | Pourquoi `Game` n'a-t-il pas besoin d'un `public $title` ? Ouvrez `Illuminate/Database/Eloquent/Model.php`, méthode `__get` : vers quelle méthode redirige-t-elle la lecture ? |
| 12 | Suivez dans `Illuminate/Database/Eloquent/Concerns/HasAttributes.php`, méthode `getAttribute`. Quel test (`if`) trie le cas « colonne » du cas « relation » ? Quelles méthodes sont appelées dans chacun des deux cas ? Et dans quelle propriété tableau du modèle les valeurs des colonnes sont-elles stockées ? |
| 13 | Appliquez : pour `$game->title` puis pour `$game->category`, quel chemin prend `getAttribute` dans chaque cas ? |
| 14 | Côté relation, `getRelationValue` finit par appeler `getRelationshipFromMethod`. Trouvez-y la ligne `$relation = $this->$method();` : quelle méthode de **votre** modèle `Game` est ainsi appelée quand la vue lit `$game->category` ? |
| 15 | Toujours dans `getRelationshipFromMethod` : que se passe-t-il si votre méthode ne renvoie pas un objet `Relation` ? Quelle **exception** (ce signal d'erreur lancé avec `throw`, croisé en S2) est levée, et que suggère son message ? Recopiez le message dans `REPONSES.md`. |
| 16 | Dans Tinker : `$g = App\Models\Game::first();` puis `$g->relationLoaded('category')` — que renvoie-t-il ? Lisez ensuite `$g->category;` puis redemandez `$g->relationLoaded('category')` : qu'est-ce qui a changé, et quelle ligne de `getRelationshipFromMethod` en est responsable ? |
| 17 | Comptez les requêtes SQL, toujours dans Tinker : `\Illuminate\Support\Facades\DB::enableQueryLog();` puis `$g = App\Models\Game::first();` puis `$g->category;` puis à nouveau `$g->category;` et enfin `count(\Illuminate\Support\Facades\DB::getQueryLog());`. Combien de requêtes ? Pourquoi la deuxième lecture de `category` n'en ajoute-t-elle aucune ? |
| 18 | Prédiction : la page d'accueil fait `Game::all()` puis la boucle lit `$game->category->name` pour chaque jeu. Avec 20 jeux, combien de requêtes SQL au total ? Gardez ce nombre en tête : la séance 4 traitera précisément ce problème de performance. |
| 19 | **Pour finir, reformulez** : en 3 à 5 phrases, racontez ce qui se passe entre « la vue lit `$game->category` » et « la catégorie s'affiche » — les méthodes traversées, la requête exécutée, la mise en mémoire. |

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : la convention « nom de classe → nom de table » vit dans la classe mère de tous les modèles : `Illuminate/Database/Eloquent/Model.php`. Cherchez une méthode dont le nom évoque la table.
- **C2** : les relations (`belongsTo`, `hasMany`, `belongsToMany`…) sont écrites dans un fichier du sous-dossier `Concerns/` d'`Illuminate/Database/Eloquent/` — son nom commence par `Has`.
- **C3** : la porte d'entrée (`__get`) est dans `Model.php` ; le reste du voyage — attributs et relations — se joue dans un autre fichier de `Concerns/`, celui qui parle d'« attributes ».

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `Illuminate/Database/Eloquent/Model.php` → `getTable`.
- **C2** : `Illuminate/Database/Eloquent/Concerns/HasRelationships.php` → `belongsToMany`, puis `joiningTable` et `joiningTableSegment`.
- **C3** : `Illuminate/Database/Eloquent/Model.php` → `__get` ; `Illuminate/Database/Eloquent/Concerns/HasAttributes.php` → `getAttribute`, `getRelationValue`, `getRelationshipFromMethod` (avec `isRelation` et `relationLoaded` en chemin).

</details>

<details>
<summary>Niveau 3 — Extraits du framework (annotés)</summary>

**C1 — la convention de table** (`Illuminate/Database/Eloquent/Model.php`) :

```php
public function getTable()
{
    return $this->table ?? Str::snake(Str::pluralStudly(class_basename($this)));
    //       ↑ ?? : si $this->table est défini (non null), il gagne —
    //         sinon le nom est calculé : Game → Games → games
}
```

**C2 — où `belongsToMany` décide du nom** (`Illuminate/Database/Eloquent/Concerns/HasRelationships.php`) :

```php
// "If no table name was provided, we can guess it by concatenating the two
//  models using underscores in alphabetical order."  (commentaire du framework)
if (is_null($table)) {
    $table = $this->joiningTable($related, $instance);
}
```

**C2 — le calcul du nom** (`joiningTable` et `joiningTableSegment`) :

```php
public function joiningTable($related, $instance = null)
{
    // "The joining table name, by convention, is simply the snake cased models
    //  sorted alphabetically and concatenated with an underscore..."
    $segments = [
        $instance
            ? $instance->joiningTableSegment()    // 'platform' (pour Platform)
            : Str::snake(class_basename($related)),
        $this->joiningTableSegment(),             // 'game' (Game, le modèle courant)
    ];

    sort($segments);                              // ['game', 'platform']
    return strtolower(implode('_', $segments));   // 'game_platform'
}

public function joiningTableSegment()
{
    return Str::snake(class_basename($this));     // nom de classe → snake_case
}
```

**C3 — la porte d'entrée** (`Illuminate/Database/Eloquent/Model.php`) :

```php
public function __get($key)
{
    return $this->getAttribute($key);   // toute lecture de propriété absente passe ici
}
```

**C3 — le tri colonne / relation** (`Illuminate/Database/Eloquent/Concerns/HasAttributes.php`) :

```php
// getAttribute (extrait annoté)
if ($this->hasAttribute($key)) {            // une colonne (ou un cast/mutateur) ?
    return $this->getAttributeValue($key);  // → lue dans le tableau $this->attributes
}
// ...
return $this->isRelation($key) || $this->relationLoaded($key)
    ? $this->getRelationValue($key)          // → chemin « relation »
    : $this->throwMissingAttributeExceptionIfApplicable($key);
```

**C3 — la relation : mémoire d'abord, requête sinon** :

```php
// getRelationValue (extrait annoté)
if ($this->relationLoaded($key)) {          // déjà chargée → en mémoire, pas de requête
    return $this->relations[$key];
}
// ...
return $this->getRelationshipFromMethod($key);

// getRelationshipFromMethod (extrait annoté)
$relation = $this->$method();               // appelle VOTRE méthode, ex. category()
if (! $relation instanceof Relation) {
    // → LogicException : '... must return a relationship instance, but "null"
    //    was returned. Was the "return" keyword used?'
}
return tap($relation->getResults(), function ($results) use ($method) {
    $this->setRelation($method, $results);  // gardée en mémoire dans $this->relations
});
```

</details>

---

## Bonus

### Bonus 1 — Le slug dans l'URL

Remplacez `/game/{id}` par `/game/{slug}` : une nouvelle migration `add_slug_to_games_table` (colonne `slug` unique), un slug renseigné pour chaque jeu, et le **route model binding** de Laravel sur la colonne `slug`. Critère : `/game/hollow-knight` affiche la fiche, un slug inconnu renvoie 404, et `route('games.show', $game)` génère l'URL avec le slug.

<details>
<summary>Indice 1 — Par où commencer</summary>

Le route model binding « scoped » : `{game:slug}` dans la route dit à Laravel de chercher le `Game` par sa colonne `slug` plutôt que par `id` — et `show(Game $game)` reçoit le modèle déjà résolu (404 automatique).

</details>

<details>
<summary>Indice 2 — Les étapes</summary>

1. `make:migration add_slug_to_games_table --table=games` → `string('slug')->unique()` dans `up()`, `dropColumn('slug')` dans `down()`
2. Renseigner les slugs : `Str::slug($game->title)` dans le seeder, ou `fake()->unique()->slug()` dans la factory
3. Route : `Route::get('/game/{game:slug}', [GameController::class, 'show'])->name('games.show')` et `public function show(Game $game)`
4. Vues : `route('games.show', $game)` — Laravel insère automatiquement le slug

</details>

<details>
<summary>Indice 3 — Squelette</summary>

```php
// routes/web.php
Route::get('/game/{game:slug}', [GameController::class, 'show'])->name('games.show');

// GameController.php
public function show(Game $game)
{
    return view('game-detail', ['game' => $game]);
}
```

</details>

### Bonus 2 — `status` en enum PHP 8.3

Remplacez la chaîne `status` par un **enum** `GameStatus` (dans `app/Enums/`) backed par `string` — par exemple `Released`, `Upcoming`, `EarlyAccess` — puis déclarez `'status' => GameStatus::class` dans `casts()`. Critère : `$game->status` renvoie un `GameStatus`, la vue affiche `$game->status->value` (ou un libellé déduit), et les seeders/factory produisent des statuts valides.

<details>
<summary>Indice — L'anatomie</summary>

```php
namespace App\Enums;

enum GameStatus: string
{
    case Released = 'released';
    case Upcoming = 'upcoming';
    case EarlyAccess = 'early_access';
}
```

Dans le modèle : `'status' => GameStatus::class` dans `casts()`. Dans la factory : `fake()->randomElement(GameStatus::cases())`.

</details>

---

## Indices

<details>
<summary>Niveau 1 — Où regarder</summary>

- `Cannot add foreign key constraint` au `migrate` → l'ordre des fichiers : `categories` et `platforms` doivent précéder `games` et `game_platform`
- `MassAssignmentException` → la colonne n'est pas dans le `$fillable` du modèle
- `$game->category` renvoie `null` → `category_id` n'est pas rempli dans le seeder
- `Base table or view not found: game_platform` → la pivot n'a pas été créée, ou son nom ne suit pas la convention singulier-alphabétique
- La fiche n'affiche aucune plateforme → le `attach()` du seeder n'a pas tourné : `migrate:fresh --seed` rejoué ?
- `Call to undefined method Game::factory()` → le trait `HasFactory` manque sur le modèle

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Modèle + migration en une commande : `make:model Game -m`
- Clé étrangère : `$table->foreignId('category_id')->constrained()`
- Pivot : `belongsToMany` des deux côtés ; écrire les liens : `$game->platforms()->attach($ids)` ou `sync([...])`
- Cast : `protected function casts(): array` qui renvoie `['featured' => 'boolean']`
- 404 automatique : `Game::findOrFail($id)`
- Ordre des seeders : `$this->call([...])` dans `DatabaseSeeder`
- Réutiliser les catégories seedées dans la factory : `->recycle(Category::all())`

</details>

<details>
<summary>Niveau 3 — Squelettes partiels</summary>

Migration de `games` (extrait) :

```php
Schema::create('games', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('synopsis');
    $table->unsignedSmallInteger('release_year');
    $table->decimal('rating', 3, 1);
    $table->unsignedSmallInteger('playtime_hours');
    $table->string('cover_url');
    $table->boolean('featured')->default(false);
    $table->string('status');
    $table->foreignId('category_id')->constrained();
    $table->timestamps();
});
```

Relations (extrait) :

```php
// Game.php
public function category(): BelongsTo { return $this->belongsTo(Category::class); }
public function platforms(): BelongsToMany { return $this->belongsToMany(Platform::class); }

// Category.php
public function games(): HasMany { return $this->hasMany(Game::class); }
```

GameSeeder (extrait, partie B) :

```php
$platforms = Platform::all();
Game::factory()->count(20)
    ->recycle(Category::all())
    ->create()
    ->each(fn ($game) => $game->platforms()->attach(
        $platforms->random(rand(1, 3))->pluck('id')
    ));
```

Contrôleur (extrait) :

```php
public function index()
{
    return view('home', ['games' => Game::all()]);
}

public function show(int $id)
{
    return view('game-detail', ['game' => Game::findOrFail($id)]);
}
```

</details>

---

## Critères de réussite

- [ ] `categories`, `platforms`, `games` et `game_platform` existent (`migrate:status` : tout à `Ran`)
- [ ] `Game` belongsTo `Category` et belongsToMany `Platform` ; `Category` hasMany `Game` ; `Platform` belongsToMany `Game`
- [ ] `sail artisan migrate:fresh --seed` reconstruit la base : ≥ 4 catégories, ≥ 3 plateformes, ≥ 6 jeux correctement liés
- [ ] `/` et `/game/{id}` lisent la base — plus aucun tableau PHP dans le contrôleur ; la fiche affiche la catégorie
- [ ] `/game/999` → 404 via `findOrFail` ; `/game/abc` → 404 via la contrainte de route
- [ ] US1–US3 : `GameFactory` + ≈ 20 jeux seedés, plateformes sur la fiche, compteur de jeux par catégorie
- [ ] `REPONSES.md` contient la section « Séance 3 — Sous le capot » avec les réponses de C1–C3 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé

**Temps estimé** : Partie A ≈ 2h · Partie B ≈ 2h · Partie C ≈ 45 min · Bonus ≈ 1h chacun
