# Exercice 03 — Eloquent : modèles, relations et seeders

## Objectif

Remplacer le **tableau PHP** du `GameController` par une **vraie base de données** : créer les modèles `Game`, `Category` et `Platform` avec leurs migrations et relations, remplir la base avec des seeders, puis brancher l'accueil et la fiche jeu sur Eloquent.

## Charge

| | Contenu | Estimation indicative |
|---|---|---|
| **Socle** | Étape 0 + Partie A, **en séance** (5 chapitres, 5 points de contrôle — la pratique est répartie au fil des chapitres) | ≈ 60 min de pratique à un rythme d'élève ; ≈ 25 min au rythme du formateur |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot », **chez vous** | ≈ 1h15 + ≈ 45 min |
| **Bonus** | 3e user story et défis | ≈ 30 à 60 min chacun |

> Ces estimations sont indicatives : un étudiant met souvent 2 à 3 fois plus de temps que la démo. ⚠️ **Requis pour la séance 4** : la Partie A terminée (point de contrôle 5) — en S4 on interrogera cette base avec des requêtes plus fines.

**Référence officielle** :

- [Eloquent : Getting Started](https://laravel.com/framework/docs/12.x/eloquent)
- [Migrations](https://laravel.com/framework/docs/12.x/migrations)
- [Eloquent Relationships](https://laravel.com/framework/docs/12.x/eloquent-relationships)
- [Eloquent Factories](https://laravel.com/framework/docs/12.x/eloquent-factories)
- [Database Seeding](https://laravel.com/framework/docs/12.x/seeding)

---

## Prérequis

- La **Partie A de l'exercice 02 terminée** (point de contrôle 6) : layout `app.blade.php`, accueil `/` qui liste au moins 4 jeux depuis un tableau PHP, fiche `/game/{id}` avec gestion du 404
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`)
- Le `.env` configuré par Sail à l'installation (`?with=mariadb`) : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb` (le nom du service, pas `localhost`)

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

---

## Étape 0 — Contrôler l'environnement

- `./vendor/bin/sail up -d`, puis [http://localhost](http://localhost) affiche l'accueil WishFlix (les jeux viennent encore du tableau PHP de la S2)
- `git status` : l'arbre de travail est propre (commit de S2 fait)
- `./vendor/bin/sail artisan migrate` : les tables par défaut de Laravel (users, cache, jobs…) se créent — c'est la preuve que la connexion à la base fonctionne

✅ Vérification : `migrate:status` liste les migrations jouées. Sinon, revenez à l'exercice 01.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. La pratique est répartie au fil des chapitres : après chaque notion démontrée sur Campus Quest, vous la transposez sur WishFlix et vous validez le point de contrôle.

### A1 — Un modèle et sa table : `Category` (Chapitre 1)

**Étape A1.1** — Générez le modèle et sa migration :

```bash
./vendor/bin/sail artisan make:model Category -m
```

Repérez les fichiers : le modèle `app/Models/Category.php` (vide) et la migration `…_create_categories_table.php` (squelette : `id()` + `timestamps()` seulement — les colonnes s'écrivent à la main).

**Étape A1.2** — Dans le `up()` de la migration, ajoutez la colonne `$table->string('name');`, puis jouez-la :

```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan migrate:status
```

✅ La migration `create_categories_table` est à `Ran`.

**Étape A1.3** — Dans Tinker (`./vendor/bin/sail artisan tinker`), écrivez une ligne sans `create()` :

```php
$c = new Category();
$c->name = 'RPG';
$c->save();
Category::find(1)->name;
Category::count();
```

✅ `Category::find(1)->name` renvoie `"RPG"`, `count()` renvoie `1`.

> ✅ **Point de contrôle 1** — la table `categories` existe, une ligne a été écrite et relue en Tinker.
> 🛟 Rattrapage : tag Campus Quest `s3-ch1-table-objet` du dépôt `School_Framework_CampusQuest`.

### A2 — `Game` appartient à `Category` (Chapitre 2)

**Étape A2.1** — Générez le modèle et sa migration :

```bash
./vendor/bin/sail artisan make:model Game -m
```

**Étape A2.2** — Complétez le `up()` de la migration `games` avec toutes les colonnes du modèle de données, **dont la clé étrangère écrite à la main** :

| Colonne | Ligne à écrire |
|---------|----------------|
| `title` | `$table->string('title');` |
| `synopsis` | `$table->text('synopsis');` |
| `release_year` | `$table->unsignedSmallInteger('release_year');` |
| `rating` | `$table->decimal('rating', 3, 1);` |
| `playtime_hours` | `$table->unsignedSmallInteger('playtime_hours');` |
| `cover_url` | `$table->string('cover_url');` |
| `featured` | `$table->boolean('featured')->default(false);` |
| `status` | `$table->string('status');` |
| `category_id` | `$table->foreignId('category_id')->constrained();` |

> ⚠️ `categories` doit exister **avant** `games` : l'ordre des fichiers (le timestamp du nom) fixe l'ordre d'exécution. Comme `categories` a été jouée en A1, vous êtes dans le bon ordre.

**Étape A2.3** — Jouez les migrations et vérifiez : `migrate` puis `migrate:status` (les deux migrations à `Ran`).

**Étape A2.4** — Dans `app/Models/Game.php`, ajoutez `$fillable` avec les colonnes remplissables (`title`, `synopsis`, `release_year`, `rating`, `playtime_hours`, `cover_url`, `featured`, `status`, `category_id`) et `casts()` renvoyant `'featured' => 'boolean'`. Ajoutez aussi `$fillable = ['name']` dans `Category`.

**Étape A2.5** — Déclarez les relations des deux côtés :

```php
// Game.php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

// Category.php
public function games(): HasMany
{
    return $this->hasMany(Game::class);
}
```

(Imports en tête : `Illuminate\Database\Eloquent\Relations\BelongsTo` et `HasMany`.)

**Étape A2.6** — Dans Tinker, créez des données et naviguez :

```php
Category::create(['name' => 'Action']);
Game::create(['title' => 'Hollow Knight', 'synopsis' => '…', 'release_year' => 2017, 'rating' => 9.0, 'playtime_hours' => 40, 'cover_url' => '…', 'status' => 'released', 'category_id' => 1]);
Game::first()->category->name;
Category::find(1)->games->count();
```

✅ Le jeu connaît sa catégorie, la catégorie liste ses jeux. (Un `category_id` inexistant serait refusé par la contrainte — c'est voulu.)

> ✅ **Point de contrôle 2** — `Game::create()` fonctionne grâce au `$fillable`, la FK `category_id` est une vraie contrainte, la navigation marche dans les deux sens.
> 🛟 Rattrapage : tag `s3-ch2-relation-1n`.

### A3 — `Game` ↔ `Platform` : la table pivot (Chapitre 3)

**Étape A3.1** — Générez `Platform` et sa migration (`make:model Platform -m`), ajoutez la colonne `$table->string('name');`, puis créez la pivot :

```bash
./vendor/bin/sail artisan make:migration create_game_platform_table
```

Dans le `up()` de la migration créée :

```php
$table->foreignId('game_id')->constrained();
$table->foreignId('platform_id')->constrained();
$table->primary(['game_id', 'platform_id']);
```

Puis `migrate` : `platforms` et `game_platform` passent à `Ran`.

> 💡 La pivot se nomme **au singulier, dans l'ordre alphabétique** : `game_platform`. C'est cette convention qui permet à `belongsToMany` de la trouver sans configuration.

**Étape A3.2** — Déclarez `belongsToMany` des deux côtés :

```php
// Game.php
public function platforms(): BelongsToMany
{
    return $this->belongsToMany(Platform::class);
}

// Platform.php
public function games(): BelongsToMany
{
    return $this->belongsToMany(Game::class);
}
```

**Étape A3.3** — Dans Tinker, écrivez et lisez les liens :

```php
Platform::create(['name' => 'PC']);
Platform::create(['name' => 'PS5']);
$g = Game::first();
$g->platforms()->attach([1, 2]);
$g->platforms;              // une Collection de Platform
$g->platforms()->sync([2]); // la pivot vaut exactement [2]
```

✅ `$g->platforms` reflète chaque `attach`/`sync` — et un doublon est refusé par la clé composite.

> ✅ **Point de contrôle 3** — la pivot `game_platform` existe et les liens jeu ↔ plateforme s'écrivent et se lisent.
> 🛟 Rattrapage : tag `s3-ch3-relation-nn`.

### A4 — Seeders : peupler la base (Chapitre 4)

Le chapitre 4 est une **démo guidée** : la factory est présentée sur Campus Quest. Ici, écrivez d'abord vos données « à la main » — la factory WishFlix complète est la US1, chez vous.

**Étape A4.1** — Générez les seeders :

```bash
./vendor/bin/sail artisan make:seeder CategorySeeder
./vendor/bin/sail artisan make:seeder PlatformSeeder
./vendor/bin/sail artisan make:seeder GameSeeder
```

**Étape A4.2** — `CategorySeeder` : insérez **au moins 4 catégories** (RPG, Action, Aventure, Stratégie…). `PlatformSeeder` : **au moins 3 plateformes** (PC, PS5, Xbox, Switch…).

**Étape A4.3** — `GameSeeder` : insérez **au moins 6 jeux** avec `Game::create([...])` : reprenez les **4 jeux de votre tableau PHP** de la S2 en ajoutant leur `category_id`, et ajoutez-en au moins 2. Attachez ensuite à chaque jeu 1 à 3 plateformes : `$game->platforms()->attach(...)`.

**Étape A4.4** — Dans `DatabaseSeeder`, appelez les trois seeders **dans le bon ordre** : ce qui est référencé avant ce qui référence (catégories et plateformes, puis jeux).

**Étape A4.5** — Reconstruisez la base :

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

Puis vérifiez dans Tinker : `Game::count()`, `Game::first()->category->name`, `Game::first()->platforms`.

✅ `Game::count()` ≥ 6, la catégorie s'affiche, `platforms` renvoie une Collection non vide.

> ✅ **Point de contrôle 4** — `migrate:fresh --seed` reconstruit la base peuplée en une commande.
> 🛟 Rattrapage : tag `s3-ch4-seeders-factory`.

### A5 — Le catalogue lit la base (Chapitre 5)

**Étape A5.1** — Dans `GameController` : dans `index()`, remplacez le tableau par `Game::all()` et supprimez la propriété `$games` ; dans `show(int $id)`, remplacez le tableau et son `abort_unless` par `Game::findOrFail($id)` — la 404 est automatique. (N'oubliez pas `use App\Models\Game;`.)

**Étape A5.2** — Adaptez les vues `home.blade.php` et `game-detail.blade.php` : `$game['title']` devient `$game->title` (tous les champs), la catégorie s'affiche avec `$game->category->name`, et `route('games.show', $id)` devient `route('games.show', $game->id)`.

**Étape A5.3** — Constatez le N+1 dans Tinker (la correction arrive en S4) :

```php
DB::enableQueryLog();
$games = Game::all();
$games->each(fn ($g) => $g->category->name);
count(DB::getQueryLog());   // = 1 + le nombre de jeux
```

✅ `/` liste les jeux **depuis la base** ; `/game/1` affiche la fiche avec sa catégorie ; `/game/999` → 404 via `findOrFail` ; `/game/abc` → 404 (contrainte de route inchangée).

> ✅ **Point de contrôle 5 (fin de la Partie A, requis pour la S4)**
>
> - [ ] `migrate:status` : `categories`, `platforms`, `games` et `game_platform` à `Ran`
> - [ ] `migrate:fresh --seed` reconstruit la base : ≥ 4 catégories, ≥ 3 plateformes, ≥ 6 jeux correctement liés
> - [ ] `/` et `/game/{id}` lisent la base — plus aucun tableau PHP dans le contrôleur
> - [ ] Commit poussé sur votre dépôt GitHub privé
>
> 🛟 Rattrapage : tag `s3-ch5-catalogue-n1`.

---

## Partie B — Attendu (chez vous, ≈ 1h15)

### US1 — Seeders complets avec une factory (≈ 45 min)

**En tant que** développeur, **je veux** obtenir environ 20 jeux variés en une commande, **afin de** tester le catalogue dans des conditions réalistes.

Critères d'acceptation :

- `GameFactory` (via `make:factory`) avec une `definition()` qui utilise `fake()` pour tous les champs — et `Category::factory()` ou `recycle()` pour la catégorie
- Le modèle `Game` utilise le trait `HasFactory`
- Un **état** `featured()` force `featured = true`, utilisé pour garantir qu'au moins un jeu est « à la une »
- `GameSeeder` crée ≈ 20 jeux via la factory et leur attache des plateformes aléatoires
- `migrate:fresh --seed` produit un catalogue varié à chaque run

### US2 — Plateformes sur la fiche jeu (≈ 30 min)

**En tant que** joueur, **je veux** voir les plateformes d'un jeu sur sa fiche, **afin de** savoir où y jouer.

Critères d'acceptation :

- La fiche `/game/{id}` liste les plateformes du jeu (`@foreach` sur `$game->platforms`)
- Si le jeu n'a aucune plateforme, la section ne s'affiche pas (ou affiche « Non renseigné »)

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

**Question 1** — Le `??` de `getTable`.

- Ouvrez `Illuminate/Database/Eloquent/Model.php`.
- Trouvez la méthode `getTable` (`Ctrl+Shift+O`) et recopiez son `return`.

> 💡 L'opérateur `??` (« coalescence des nuls ») renvoie la valeur de gauche si elle existe et n'est pas `null`, sinon celle de droite.

**À noter dans `REPONSES.md`** : que signifie donc `$this->table ?? ...` pour votre modèle ?

**Question 2** — Les trois étapes du calcul.

Le nom de table est fabriqué par trois étapes enchaînées : `class_basename`, `Str::pluralStudly`, `Str::snake`.

- Lancez `./vendor/bin/sail artisan tinker`.
- Testez chaque étape séparément :

  ```php
  class_basename(App\Models\Game::class)
  \Illuminate\Support\Str::pluralStudly('Game')
  \Illuminate\Support\Str::snake('Games')
  ```

- Vérifiez ensuite le résultat complet :

  ```php
  (new App\Models\Game)->getTable()
  ```

**À noter dans `REPONSES.md`** : ce que renvoie chaque étape, et le résultat complet.

**Question 3** — Prédiction sur papier.

- Prédisez : pour un modèle `GameReview` (qui n'existe pas — c'est un exercice de papier), quel nom de table la convention donnerait-elle ?
- Rejouez les trois étapes de la question 2 avec ce nom pour vérifier votre prédiction.

**À noter dans `REPONSES.md`** : votre prédiction, et le résultat vérifié.

**Question 4** — Forcer un autre nom.

Votre table `games` suit la convention, mais un jour vous croiserez une table qui ne la suit pas. D'après le `??` de `getTable`, comment forcer un autre nom dans le modèle ?

**À noter dans `REPONSES.md`** : la ligne exacte (sans l'ajouter à `Game` : la convention vous convient).

### C2 — Comment `belongsToMany` devine la table pivot (Relier, ~15 min)

**Point de départ** : dans `Game::platforms()`, le `return $this->belongsToMany(Platform::class);` écrit en A3 — qui trouve `game_platform` alors que vous ne lui avez jamais donné ce nom.

Le code des relations vit dans `Illuminate/Database/Eloquent/Concerns/HasRelationships.php` : un **trait** (cette « boîte d'outils » de méthodes branchée sur une classe, déjà croisée en S2 avec les `whereXxx`) que `Model` utilise.

**Question 5** — Où le nom est choisi.

- Dans `HasRelationships.php`, ouvrez la méthode `belongsToMany` (`Ctrl+Shift+O`).
- Cherchez `is_null($table)` : c'est le moment où le nom de la table pivot est choisi.

**À noter dans `REPONSES.md`** : que fait Laravel quand vous ne donnez pas de nom de table — quelle méthode est alors appelée ?

**Question 6** — Lire le commentaire du framework.

- Ouvrez la méthode `joiningTable`.
- Commencez par lire **le commentaire écrit par les développeurs de Laravel** — oui, le framework s'explique lui-même, et lire les commentaires du code fait partie des bons réflexes.

**À noter dans `REPONSES.md`** : quels sont les deux morceaux (« segments ») empilés dans `$segments` quand l'appel vient de `Game::platforms()` ?

**Question 7** — Le tri et l'assemblage.

- Toujours dans `joiningTable`, lisez les lignes `sort($segments)` puis `strtolower(implode('_', $segments))`.

**À noter dans `REPONSES.md`** : que font ces deux lignes ?

**Question 8** — L'autre côté de la relation.

- Imaginez maintenant l'appel depuis l'autre côté, `Platform::games()`.

**À noter dans `REPONSES.md`** : quels seraient les segments **avant** le `sort`, et après ? Pourquoi ce tri alphabétique est-il indispensable pour que les deux côtés de la relation trouvent la même table ?

**Question 9** — Vérifier dans Tinker.

```php
(new App\Models\Game)->joiningTable(App\Models\Platform::class)
```

**À noter dans `REPONSES.md`** : ce que renvoie cette instruction.

**Question 10** — Prédiction : la pivot de la wishlist.

Plus tard, WishFlix reliera `User` et `Game` pour la wishlist.

**À noter dans `REPONSES.md`** : quel nom de table pivot la convention attendra-t-elle ? (Faites le calcul à la main, comme `joiningTable`.)

### C3 — `$game->title` et `$game->category` : deux lectures, deux chemins (Raisonner, ~20 min)

**Point de départ** : dans vos vues, `$game->title` et `$game->category->name` — alors que `app/Models/Game.php` ne déclare **ni** propriété `title`, **ni** propriété `category`.

Comment PHP accepte-t-il de lire une propriété qui n'existe pas ? Grâce à une **méthode magique** : une méthode au nom réservé (elles commencent par `__`) que PHP appelle tout seul dans une situation précise. Ici, `__get($key)` est appelée automatiquement quand on lit une propriété absente de l'objet.

**Question 11** — La méthode magique.

- Ouvrez `Illuminate/Database/Eloquent/Model.php`, méthode `__get`.

**À noter dans `REPONSES.md`** : pourquoi `Game` n'a-t-il pas besoin d'un `public $title` ? Vers quelle méthode `__get` redirige-t-elle la lecture ?

**Question 12** — Le tri colonne / relation.

- Suivez dans `Illuminate/Database/Eloquent/Concerns/HasAttributes.php`, méthode `getAttribute`.

**À noter dans `REPONSES.md`** : quel test (`if`) trie le cas « colonne » du cas « relation » ? Quelles méthodes sont appelées dans chacun des deux cas ? Et dans quelle propriété tableau du modèle les valeurs des colonnes sont-elles stockées ?

**Question 13** — À vous d'appliquer.

**À noter dans `REPONSES.md`** : pour `$game->title` puis pour `$game->category`, quel chemin prend `getAttribute` dans chaque cas ?

**Question 14** — Votre méthode, appelée par le framework.

- Côté relation, `getRelationValue` finit par appeler `getRelationshipFromMethod` : ouvrez-la.
- Trouvez-y la ligne `$relation = $this->$method();`.

**À noter dans `REPONSES.md`** : quelle méthode de **votre** modèle `Game` est ainsi appelée quand la vue lit `$game->category` ?

**Question 15** — Le garde-fou.

- Toujours dans `getRelationshipFromMethod`, lisez ce qui se passe si votre méthode ne renvoie pas un objet `Relation`.

**À noter dans `REPONSES.md`** : quelle **exception** (ce signal d'erreur lancé avec `throw`, croisé en S2) est levée, et que suggère son message ? Recopiez le message.

**Question 16** — La mise en mémoire.

Dans Tinker :

```php
$g = App\Models\Game::first();
$g->relationLoaded('category')
$g->category;
$g->relationLoaded('category')
```

**À noter dans `REPONSES.md`** : que renvoie `relationLoaded` avant puis après la lecture de `category` ? Qu'est-ce qui a changé, et quelle ligne de `getRelationshipFromMethod` en est responsable ?

**Question 17** — Comptez les requêtes SQL.

Dans Tinker :

```php
\Illuminate\Support\Facades\DB::enableQueryLog();
$g = App\Models\Game::first();
$g->category;
$g->category;
count(\Illuminate\Support\Facades\DB::getQueryLog());
```

**À noter dans `REPONSES.md`** : combien de requêtes ? Pourquoi la deuxième lecture de `category` n'en ajoute-t-elle aucune ?

**Question 18** — Prédiction : le coût de l'accueil.

La page d'accueil fait `Game::all()` puis la boucle lit `$game->category->name` pour chaque jeu.

**À noter dans `REPONSES.md`** : avec 20 jeux, combien de requêtes SQL au total ? Gardez ce nombre en tête : la séance 4 traitera précisément ce problème de performance.

**Question 19** — Pour finir, reformulez.

**À noter dans `REPONSES.md`** : en 3 à 5 phrases, racontez ce qui se passe entre « la vue lit `$game->category` » et « la catégorie s'affiche » — les méthodes traversées, la requête exécutée, la mise en mémoire.

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

### US3 (bonus) — Nombre de jeux par catégorie

**En tant que** visiteur, **je veux** voir le nombre de jeux de chaque catégorie sur l'accueil, **afin de** repérer les catégories les plus fournies.

Critères d'acceptation :

- L'accueil affiche les catégories avec leur nombre de jeux (ex. « RPG — 7 jeux »)
- Le comptage passe par la relation : `$category->games()->count()` — une requête par catégorie est **acceptée à ce stade** (l'optimisation arrive en S4)
- Les catégories sont passées à la vue depuis le contrôleur

### Bonus 1 — Le slug dans l'URL

Remplacez `/game/{id}` par `/game/{slug}` :

- une nouvelle migration `add_slug_to_games_table` (colonne `slug` unique) ;
- un slug renseigné pour chaque jeu ;
- le **route model binding** de Laravel sur la colonne `slug`.

✅ Vérification : `/game/hollow-knight` affiche la fiche, un slug inconnu renvoie 404, et `route('games.show', $game)` génère l'URL avec le slug.

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

Remplacez la chaîne `status` par un **enum** `GameStatus` (dans `app/Enums/`), backed par `string` — par exemple `Released`, `Upcoming`, `EarlyAccess` — puis déclarez `'status' => GameStatus::class` dans `casts()`.

✅ Vérification : `$game->status` renvoie un `GameStatus`, la vue affiche `$game->status->value` (ou un libellé déduit), et les seeders/factory produisent des statuts valides.

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
- `Field 'title' doesn't have a default value`, ou une colonne qui reste vide après `create()` → la colonne n'est pas dans le `$fillable` du modèle (Eloquent l'ignore en silence)
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
- [ ] US1–US2 : `GameFactory` + ≈ 20 jeux seedés, plateformes sur la fiche (US3 compteur par catégorie : bonus)
- [ ] `REPONSES.md` contient la section « Séance 3 — Sous le capot » avec les réponses de C1–C3 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé
