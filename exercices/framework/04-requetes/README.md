# Exercice 04 — Requêtes Eloquent et optimisation

## Objectif

Rendre le catalogue WishFlix **filtrable, mesuré et paginé** : requêtes `where`/`like`/`orderBy`, filtre par catégorie dans l'URL, Debugbar installée, N+1 diagnostiqué puis corrigé — et, en pagination, un catalogue qui tient la charge.

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (6 chapitres, 3 points de contrôle — la pratique est répartie au fil des chapitres) | En séance | ≈ 1h30 en séance (pratique : 18 + 22 + 10 + 18 + 12 + 12 min) |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot » | À la maison | ≈ 1h15 + ≈ 45 min |
| **Bonus** | 3e user story, `inRandomOrder()`, `simplePaginate()` | Facultatif | ≈ 1h |

> Le **socle** est dimensionné pour un étudiant lent : ≈ 1h30 en séance, soit ≈ 2× le temps de démo du même geste. Les durées de la **Partie B** et de la **Partie C** restent indicatives — elles supposent un rythme rapide. ⚠️ **Requis pour la séance 5** : la Partie A terminée (filtres, mise en avant, N+1 corrigé, pagination) — en S5 on ajoutera des formulaires d'édition au-dessus de ces requêtes.

**Référence officielle** :

- [Query Builder](https://laravel.com/docs/12.x/queries)
- [Eloquent Relationships — Eager Loading](https://laravel.com/docs/12.x/eloquent-relationships#eager-loading)
- [Pagination](https://laravel.com/docs/12.x/pagination)
- [Laravel Debugbar](https://laraveldebugbar.com/docs/installation)

---

## Prérequis

- La **Partie A de l'exercice 03 terminée** : modèles `Game`, `Category`, `Platform` + migrations jouées + seeders qui peuplent la base — `/` affiche les jeux depuis la base, `/game/{id}` la fiche
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`)

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

---

## Étape 0 — Contrôler l'environnement

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan route:list --name=games
./vendor/bin/sail artisan tinker
```

Dans Tinker : `App\Models\Game::count()` puis `App\Models\Category::count()`.

> ✅ **Vérification** : `games.show` apparaît dans `route:list`, `http://localhost` affiche les jeux, `Game::count()` ≥ 6 et `Category::count()` ≥ 4. Sinon, terminez d'abord l'exercice 03.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant.

> 💡 **Lire les consignes** : vous **réutilisez** les blocs des maquettes (hero, sections, cartes, filtres) ; le peu de HTML qui manque est fourni avec ses classes **DaisyUI**. Ce que vous tapez vous-même, c'est le code Laravel : requêtes Eloquent, contrôleur, directives Blade. Les citations 💡 expliquent le pourquoi, les citations ⚠️ signalent un piège.

### A1 — La une et le podium (Chapitre 1)

**En tant que** visiteur, **je veux** voir un jeu mis en avant et les mieux notés, **afin de** repérer les valeurs sûres du catalogue.

#### A1.1 · Deux requêtes de plus

📄 `app/Http/Controllers/GameController.php`

1. Dans `index()`, ajoutez deux requêtes en plus de celle du catalogue :

   ```php
   $featured = Game::where('featured', true)->first();
   $topRated = Game::orderByDesc('rating')->limit(6)->get();
   ```

2. Ajoutez `featured` et `topRated` au tableau passé à `view('home', [...])`

> 💡 **Query Builder** : `where()`, `orderByDesc()` et `limit()` construisent la requête SQL morceau par morceau. Rien n'est envoyé à la base avant `first()` (un seul jeu, ou `null`) ou `get()` (une Collection).

#### A1.2 · Le hero « À la une »

📄 `resources/views/home.blade.php`

Le hero de la maquette (`<section class="hero wishflix-hero">`, en haut de la page) devient l'encart du jeu à la une. Gardez son HTML et ses classes, et branchez-le sur `$featured` :

1. Entourez toute la `<section class="hero wishflix-hero">` de `@if ($featured)` … `@endif`
2. `src` et `alt` de l'image : `{{ $featured->cover_url }}` et le titre du jeu
3. Le badge de catégorie (« RPG ») : `{{ $featured->category->name }}`
4. Le titre (`<h1>`) et la description : `{{ $featured->title }}` et `{{ $featured->synopsis }}`
5. La ligne de détails : `{{ $featured->release_year }} | {{ $featured->rating }}/10 | {{ $featured->playtime_hours }}h de jeu`
6. `href` du bouton « Voir la fiche » : `{{ route('games.show', $featured->id) }}`
7. Le badge des plateformes (« PC, PS5, Xbox ») : `{{ $featured->platforms->pluck('name')->join(', ') }}`

> ⚠️ **Pourquoi `@if` ?** `first()` renvoie `null` si aucun jeu n'est `featured`. Sans le `@if`, `$featured->title` provoque l'erreur `Attempt to read property "title" on null`.

> 💡 **`pluck('name')->join(', ')`** : `$featured->platforms` est une **Collection** de plateformes. `pluck('name')` n'en garde que les noms (`['PC', 'PS5']`), et `join(', ')` les colle en un texte : « PC, PS5 ».

#### A1.3 · La section « Mieux notés »

📄 `resources/views/home.blade.php`

La maquette a déjà tout ce qu'il faut : la section du catalogue (`<section class="wish-section">`) et ses cartes de jeu (`<article class="card movie-card game-card">`). Rien à écrire en HTML, vous les réutilisez :

1. **Dupliquez** la `<section class="wish-section">` du catalogue et placez la copie entre le hero et le catalogue
2. Dans la copie, gardez seulement le `<header>` et la grille `<div class="wish-home__grid">` : supprimez les filtres et les statistiques
3. Changez le titre en « Mieux notés », et l'`id` du titre (`top-rated-title`, repris dans l'`aria-labelledby` de la section), pour qu'il ne soit pas en double dans la page
4. Dans la grille, la boucle passe sur `$topRated` au lieu de `$games` : `@foreach ($topRated as $game)` … `@endforeach`, autour d'**une seule** carte

> 💡 **Suggestion** (facultatif) : la carte de jeu est maintenant écrite deux fois, et elle reviendra en S6 sur la page wishlist. Vous pouvez l'extraire dans un **fragment partagé**, comme la navbar en S2 :
>
> 1. Coupez une carte `<article class="card movie-card game-card">…</article>` et collez-la dans un nouveau fichier `resources/views/partials/game-card.blade.php`
> 2. À sa place, dans les deux boucles, écrivez `@include('partials.game-card', ['game' => $game])`
>
> Le second argument de `@include` passe des variables au fragment : dans `game-card.blade.php`, `$game` est le jeu de la boucle.

> ✅ **Vérification** :
>
> - un jeu `featured` s'affiche dans l'encart
> - sans jeu `featured` (passez-les tous à `false` dans Tinker), la page n'affiche pas d'encart vide
> - la section « Mieux notés » liste 6 jeux maximum, du mieux noté au moins bien noté

> 💡 Variante : `->inRandomOrder()->first()` pioche un jeu « à la une » différent à chaque chargement (bonus).

### A2 — Filtrer par catégorie (Chapitre 2)

**En tant que** visiteur, **je veux** filtrer les jeux par catégorie via `/?category=`, **afin de** ne voir que les jeux qui m'intéressent.

#### A2.1 · Recevoir la requête HTTP

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez l'**import** de la classe `Request` en haut du fichier, sous le `namespace` :

   ```php
   use Illuminate\Http\Request;
   ```

2. Changez la signature de `index()` pour qu'elle reçoive la requête en paramètre :

   ```php
   public function index(Request $request)
   ```

> 💡 **Injection de dépendances** : vous ne créez pas l'objet `$request` vous-même (pas de `new Request()`). Vous **déclarez** le paramètre avec son **type** `Request`, et Laravel, en lisant ce type, crée l'objet avec les données de la requête HTTP (URL, **query string**, formulaire…) et vous le passe. C'est le **conteneur de services** de la S1 qui fait ce travail.

#### A2.2 · Le filtre optionnel

📄 `app/Http/Controllers/GameController.php`

Dans `index()`, construisez la requête du catalogue avec `when()` :

```php
$games = Game::query()
    ->when($request->query('category'), fn ($query, $id) =>
        $query->where('category_id', $id))
    ->get();
```

> 💡 **`$request->query('category')`** lit le paramètre `?category=` de l'URL, ou renvoie `null` s'il est absent.

> 💡 **`when(valeur, fonction)`** n'ajoute le `where` que si la valeur est remplie. Sans `?category=`, la requête reste « tous les jeux ». La fonction reçoit la requête en cours (`$query`) et la valeur (`$id`).

#### A2.3 · Les catégories pour le filtre

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez l'**import** `use App\Models\Category;`
2. Ajoutez `'categories' => Category::all()` au tableau passé à la vue

#### A2.4 · Le formulaire de filtre

📄 `resources/views/home.blade.php`

Les filtres du catalogue existent déjà dans la maquette (`<div class="wish-home__filters">`), mais ce n'est que du HTML statique : sans framework front (React, Vue…), il manque le `<form>`, les attributs `name` et un bouton d'envoi. Gardez le bloc et ses classes, et ajoutez seulement ce qui manque :

1. La `<div class="wish-home__filters">` devient un formulaire, avec la même classe :

   ```blade
   <form method="GET" action="{{ route('home') }}" class="wish-home__filters">
   ```

   N'oubliez pas de remplacer aussi la balise fermante `</div>` par `</form>`.

2. Sur le `<select>` des catégories, ajoutez `name="category"`
3. L'option « Toutes » prend `value=""` ; remplacez les autres options par une boucle `@foreach ($categories as $category)` : `value` = l'`id`, texte = le `name`
4. Sur l'option de la boucle, ajoutez la **directive** `@selected(request('category') == $category->id)`
5. Ajoutez le bouton d'envoi après le dernier `<fieldset>` :

   ```html
   <button type="submit" class="btn btn-primary">Filtrer</button>
   ```

6. Sur le bouton « Disponibles uniquement » de la maquette, ajoutez `type="button"` : il ne fait rien pour l'instant

> 💡 **`type="button"`** : dans un `<form>`, un `<button>` sans type **envoie** le formulaire. `type="button"` en fait un simple bouton, qui n'envoie rien.

> 💡 Le champ « Rechercher » reste en place : il sera branché en Partie B, avec son attribut `name`.

> 💡 **Formulaire `GET`** : les champs partent dans l'URL. Choisir « Action » et valider ouvre `/?category=2`, que `$request->query('category')` lit côté contrôleur.

> 💡 **`@selected(condition)`** ajoute l'attribut `selected` à l'option si la condition est vraie : la catégorie choisie reste affichée après le filtrage. `request('category')` lit le même paramètre que dans le contrôleur.

> ✅ **Vérification** : `/?category=1` n'affiche que les jeux de cette catégorie, `/` sans paramètre affiche tout, et la catégorie choisie reste sélectionnée dans le `select`.

> ✅ **Point de contrôle 1**
>
> - [ ] Un jeu « à la une » (`featured`) et les 6 meilleures notes s'affichent sur l'accueil
> - [ ] `/?category=<id>` filtre le catalogue, `/` affiche tout, le `select` se souvient du choix
> - [ ] Commit : « feat: catalogue à la une et filtrable »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s4-ch1-filtrer-trier` et `s4-ch2-filtres-optionnels` (dépôt `CampusQuest`), puis **refaites** les étapes A1 et A2 sur WishFlix.

### A3 — Installer la Debugbar et mesurer (Chapitre 3)

#### A3.1 · Installer le package

Installez le package avec **Composer**, en dépendance de développement :

```bash
./vendor/bin/sail composer require fruitcake/laravel-debugbar --dev
```

> ⚠️ **Le `--dev` est important** : la barre affiche vos requêtes SQL. Utile en développement, elle ne doit **jamais** partir en production.

#### A3.2 · Ouvrir l'onglet Queries

1. Rechargez `/` : une barre apparaît en bas de page
2. Ouvrez l'onglet **Queries** : il liste chaque requête SQL exécutée, sa durée, et le nombre total

> 💡 **Profiler** : un outil qui mesure ce que fait la page (requêtes, temps, mémoire). La Debugbar en est un.

> ⚠️ La barre n'apparaît pas ? Elle nécessite une page HTML complète (pas de réponse JSON) et `APP_DEBUG=true` dans `.env`. Elle se désactive via `DEBUGBAR_ENABLED=false`.

#### A3.3 · Mesurer AVANT

📄 `REPONSES.md`, section « Séance 4 — N+1 »

Vos cartes affichent `$game->category->name` : chaque carte déclenche sa propre requête sur `categories`. Notez :

1. le **nombre de requêtes** de la page d'accueil
2. le SQL de la requête qui se répète

> 💡 **Lazy loading** : `$game->category` charge la catégorie **au moment où on la lit**, avec une requête par jeu. C'est la cause du **N+1** de la S3.

> 💡 Si vous avez fait l'US3 de l'exercice 03 (`$category->games()->count()` dans la vue), elle compte aussi une requête par catégorie : elle fait partie du diagnostic.

### A4 — Corriger le N+1 (Chapitre 4)

#### A4.1 · Charger les catégories d'avance

📄 `app/Http/Controllers/GameController.php`

Dans la requête du catalogue, ajoutez `->with('category')` **avant** `->get()`.

> 💡 **Eager loading** : `with('category')` charge les catégories de tous les jeux **en une seule requête** (`where id in (…)`), avant la boucle de la vue.

#### A4.2 · Les autres requêtes

📄 `app/Http/Controllers/GameController.php`

Si d'autres requêtes de l'accueil affichent aussi la catégorie d'un jeu (section « Mieux notés », par exemple), ajoutez-leur le même `with('category')`. La Debugbar montre si elles en ont besoin.

#### A4.3 · Mesurer APRÈS

📄 `REPONSES.md`

Rechargez l'accueil, relisez l'onglet Queries, puis notez :

1. le **nombre de requêtes après correction**
2. le gain constaté
3. en une phrase, ce que `with('category')` a changé dans le SQL exécuté

> ✅ **Vérification** : l'onglet Queries montre nettement moins de requêtes qu'en A3.3, et les catégories s'affichent toujours sur les cartes.

> ✅ **Point de contrôle 2**
>
> - [ ] La Debugbar est installée (`--dev`) et l'onglet Queries s'ouvre
> - [ ] Le N+1 est corrigé par `with('category')` — les chiffres avant/après sont dans `REPONSES.md`
> - [ ] Commit : « perf: eager loading des catégories »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s4-ch3-debugbar` et `s4-ch4-eager-loading` (dépôt `CampusQuest`), puis **refaites** les étapes A3 et A4 sur WishFlix.

### A5 — Compter les jeux par catégorie (Chapitre 5)

**En tant que** visiteur, **je veux** voir le nombre de jeux dans chaque catégorie du filtre, **afin de** choisir en connaissance de cause.

#### A5.1 · `withCount()`

📄 `app/Http/Controllers/GameController.php`

Dans `index()`, remplacez `Category::all()` par `Category::withCount('games')->get()`.

> 💡 **Agrégat** : `withCount('games')` compte les jeux de chaque catégorie **dans la même requête SQL** (`count(*)`), et range le résultat dans un attribut `games_count`. La relation `games()` existe déjà sur `Category` (S3).

#### A5.2 · Afficher le compteur

📄 `resources/views/home.blade.php`

Dans l'`<option>` du `select`, affichez le compteur après le nom : `{{ $category->name }} ({{ $category->games_count }})`, ce qui donne « Action (5) ».

> ✅ **Vérification** : chaque option du `select` affiche son nombre de jeux, et le filtre par catégorie fonctionne toujours.

### A6 — Paginer le catalogue (Chapitre 6)

**En tant que** visiteur, **je veux** parcourir le catalogue page par page, **afin de** ne pas charger tous les jeux d'un coup.

#### A6.1 · `paginate()`

📄 `app/Http/Controllers/GameController.php`

1. Sur la requête du catalogue, remplacez `->get()` par `->paginate(9)`, **après** les `with()` et `when()`
2. Ajoutez `->withQueryString()` juste après `paginate(9)`

> 💡 **Pagination** : `paginate(9)` lit le paramètre `?page=` tout seul et ne renvoie que les 9 jeux de cette page. Il fait 2 requêtes : un `count(*)` pour le nombre total de pages, puis un `limit … offset …`.

> 💡 **`withQueryString()`** : les liens de page recopient les paramètres de l'URL courante. Sans lui, passer à la page 2 perdrait le `?category=`.

#### A6.2 · Les liens de page

📄 `resources/views/home.blade.php`

Sous la grille de jeux, collez :

```html
<div class="flex justify-center my-8">
  {{ $games->links() }}
</div>
```

> 💡 **`links()`** génère les liens numérotés de la pagination (HTML et classes Tailwind fournis par Laravel).

> ✅ **Vérification** : `/` affiche 9 jeux par page avec des liens numérotés ; `?category=…&page=2` conserve le filtre ; la Debugbar montre les 2 requêtes de pagination (`count(*)` + `limit … offset …`).

> ✅ **Point de contrôle 3 — fin du socle**
>
> - [ ] Le `select` affiche « Catégorie (N) » pour chaque option
> - [ ] 9 jeux par page, liens de pagination sous la grille
> - [ ] `?category=…` (et plus tard `?search=…`) survivent au changement de page
> - [ ] Commit : « feat: pagination du catalogue »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s4-ch5-agregats` et `s4-ch6-pagination` (dépôt `CampusQuest`), puis **refaites** les étapes A5 et A6 sur WishFlix.

---

## Partie B — Attendu (à la maison, ≈ 1h15)

### US1 — Recherche par titre (~40 min)

**En tant que** visiteur, **je veux** chercher un jeu par son titre, **afin de** le retrouver sans parcourir tout le catalogue.

Critères d'acceptation :

- Un champ de recherche `search` dans le formulaire de l'accueil (méthode `GET`)

- La requête applique `where('title', 'like', "%{$search}%")` via `when()` — pas de filtre si `search` est absent
- Le champ reste rempli après la recherche (`value="{{ request('search') }}"`)
- `/?search=zelda` ne renvoie que les jeux dont le titre contient « zelda »
- La pagination de l'étape A6 conserve `search` au changement de page (`withQueryString()` est déjà en place)

> 💡 **Rien à écrire en HTML** : le champ « Rechercher » de la maquette est déjà dans le formulaire de A2.4. Ajoutez-lui `name="search"`.

### US2 — Recherche + filtre combinés (~35 min)

**En tant que** visiteur, **je veux** combiner recherche par titre et filtre par catégorie, **afin d'** affiner ma recherche.

Critères d'acceptation :

- `/?search=…&category=…` applique les **deux** contraintes en même temps
- `/?category=…` sans `search` filtre seul ; `/?search=…` sans `category` cherche seule
- Le formulaire « se souvient » des deux valeurs après envoi
- Un lien « Réinitialiser » ramène à `/` sans paramètres
  (après le bouton « Filtrer » : `<a href="#" class="btn btn-ghost">Réinitialiser</a>`, avec `href` vers `route('home')`)
- `?search=…&category=…&page=2` conserve les trois paramètres dans les liens de pagination

---

## Partie C — Sous le capot (chez vous, ~45 min)

`->when(…)`, `->paginate(9)` : deux méthodes que vous avez chaînées sans qu'elles apparaissent dans votre modèle. Où vivent-elles dans le framework, et que font-elles vraiment ? Dans cette partie, vous lisez le code dans `vendor/laravel/framework/src/Illuminate/` pour suivre la chaîne.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque concept vous donne un fil à suivre — un fichier, une méthode. Suivez ce fil et ignorez le reste.

> 🔧 **Outils** : `Ctrl+P` (fichier par nom), `Ctrl+Shift+O` (méthode dans le fichier), `Ctrl+F`, `Ctrl+clic` (aller à la définition). `vendor/` est en **lecture seule**.

**Rendu** : dans `REPONSES.md`, ajoutez une section `## Séance 4 — Sous le capot`. Pour chaque réponse, indiquez le **chemin suivi** : fichier → méthode (ex. `Illuminate/Database/Eloquent/Builder.php` → `paginate`).

### C1 — D'où vient `when()` (Raisonner, ~20 min)

**Point de départ** : `Game::query()->when(...)` fonctionne — mais ouvrez `Illuminate/Database/Eloquent/Builder.php` et cherchez `function when` : elle n'y est **pas**. La méthode arrive par un trait.

**Question 1** — La filière du trait.

- Dans `Illuminate/Database/Eloquent/Builder.php`, repérez le `use` de traits en haut de la classe : l'un d'eux s'appelle `BuildsQueries`.
- Ouvrez `Illuminate/Database/Concerns/BuildsQueries.php` et trouvez à quel **autre trait** il fait appel pour fournir `when`/`unless`.

**À noter dans `REPONSES.md`** : la chaîne complète Builder → trait → trait (avec le chemin du fichier où vit enfin `when`).

**Question 2** — Le cœur de `when`.

- Ouvrez la méthode `when($value, $callback, $default)` : elle tient en quelques lignes.
- Lisez le `if ($value) { ... }` et le `return $this;` final.

**À noter dans `REPONSES.md`** : que renvoie `when` quand la valeur est « falsy » (`null`, chaîne vide) ? Pourquoi la chaîne `->when(null, …)->orderByDesc(…)` continue-t-elle sans erreur ?

**Question 3** — Le `??` du callback.

- Lisez `return $callback($this, $value) ?? $this;`.

**À noter dans `REPONSES.md`** : quels **deux** arguments votre closure `fn ($query, $id) => …` reçoit-elle ? Que se passe-t-il si la closure ne renvoie rien ?

**Question 4** — À vous d'appliquer.

Prédisez le SQL de `Game::where('featured', true)->when(null, fn ($q) => $q->where('rating', '>', 9))->toSql()`, puis vérifiez dans Tinker.

**À noter dans `REPONSES.md`** : votre prédiction et le `toSql()` réel.

### C2 — Comment `paginate()` fabrique les pages (Observer, ~25 min)

**Point de départ** : `Game::paginate(9)` renvoie un objet qui boucle comme une Collection, mais affiche des liens de pages. Deux requêtes SQL se cachent derrière.

**Question 5** — La méthode.

- Ouvrez `Illuminate/Database/Eloquent/Builder.php`, méthode `paginate` (`Ctrl+Shift+O`).
- Repérez les appels à `Paginator::resolveCurrentPage`, `getCountForPagination` et `forPage`.

**À noter dans `REPONSES.md`** : à quoi sert chacun des trois — en une phrase par appel.

**Question 6** — Le comptage.

- Dans la Debugbar ou avec `DB::enableQueryLog()` en Tinker, exécutez `Game::paginate(5)` puis `count(DB::getQueryLog())`.

**À noter dans `REPONSES.md`** : combien de requêtes, et recopiez le SQL des deux (`count(*)` et `limit … offset …`).

**Question 7** — `forPage`, la clause qui borne.

- `forPage` vit dans `Illuminate/Database/Query/Builder.php` : ouvrez-le et trouvez quelles clauses SQL il produit (`limit`, `offset`).

**À noter dans `REPONSES.md`** : pour `?page=3` avec 5 par page, quelles valeurs `limit`/`offset` sont calculées ?

**Question 8** — L'objet paginé.

Dans Tinker :

```php
$p = App\Models\Game::paginate(5);
$p->total();  $p->currentPage();  $p->lastPage();  $p->perPage();
```

**À noter dans `REPONSES.md`** : les 4 valeurs sur votre base, et le nom de la classe de `$p` (`get_class($p)`).

**Question 9** — Pour finir, reformulez.

**À noter dans `REPONSES.md`** : en 3 à 5 phrases, racontez ce qui se passe entre « le navigateur demande `?page=2` » et « la vue affiche 5 jeux + les liens ».

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : `when` n'est pas dans `Eloquent/Builder.php` — elle arrive par un trait ; partez du `use` de traits en haut de la classe, puis du trait que ce trait utilise lui-même.
- **C2** : `paginate` existe bien dans `Eloquent/Builder.php` ; `forPage` vit dans `Query/Builder.php` (la couche SQL, en dessous d'Eloquent).

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `Illuminate/Database/Eloquent/Builder.php` → `use BuildsQueries` → `Illuminate/Database/Concerns/BuildsQueries.php` → `use Conditionable` → `Illuminate/Conditionable/Traits/Conditionable.php` → `when`.
- **C2** : `Illuminate/Database/Eloquent/Builder.php` → `paginate` (ligne ≈ 1116) ; `Illuminate/Database/Query/Builder.php` → `forPage` ; `Illuminate/Pagination/Paginator.php` → `resolveCurrentPage`.

</details>

<details>
<summary>Niveau 3 — Extraits du framework (annotés)</summary>

**C1 — `when` tel quel** (`Illuminate/Conditionable/Traits/Conditionable.php`) :

```php
public function when($value = null, ?callable $callback = null, ?callable $default = null)
{
    $value = $value instanceof Closure ? $value($this) : $value;

    if ($value) {
        return $callback($this, $value) ?? $this;
        //            ↑ votre closure reçoit (la requête, la valeur)
        //   ?? $this : si elle renvoie null, on garde la requête telle quelle
    } elseif ($default) {
        return $default($this, $value) ?? $this;
    }

    return $this;   // valeur falsy → la requête repart inchangée
}
```

**C2 — `paginate` extrait annoté** (`Illuminate/Database/Eloquent/Builder.php`) :

```php
$page = $page ?: Paginator::resolveCurrentPage($pageName);   // lit ?page= dans l'URL
$total = value($total) ?? $this->toBase()->getCountForPagination();  // select count(*)
$results = $total
    ? $this->forPage($page, $perPage)->get($columns)          // limit + offset
    : $this->model->newCollection();
return $this->paginator($results, $total, $perPage, $page, […]);     // l'objet paginé
```

</details>

---

## Bonus — À la maison, au choix

**US3 — Top catégories par note moyenne** (~45 min)

**En tant que** visiteur, **je veux** voir les catégories classées par la note moyenne de leurs jeux, **afin de** repérer les genres les mieux notés.

- `Category::withAvg('games', 'rating')->orderByDesc('games_avg_rating')->get()` — la moyenne arrive dans `games_avg_rating`
- Affichez un podium ou une liste « Catégories les mieux notées » sur l'accueil ou sur une page dédiée
- En Debugbar : vérifiez que ce n'est pas une requête par catégorie

**Défi 1 — Une « à la une » qui change** : `Game::where('featured', true)->inRandomOrder()->first()` dans A1 — un jeu différent à chaque chargement.

**Défi 2 — Pagination allégée** : `simplePaginate(9)` remplace `paginate(9)` — liens « Précédent / Suivant » seulement, pas de `count(*)`. Quand est-ce un bon choix ? (Indice : les très grandes tables.)

---

## Indices

<details>
<summary>Niveau 1 — Où regarder</summary>

- `Call to undefined method` sur `when`/`with` → la chaîne part bien d'un builder : `Game::query()` ou `Game::where(…)`, pas d'une Collection déjà récupérée
- Le filtre ne réagit pas → vérifiez que le `<select>` s'appelle `category` et que le formulaire est en `method="GET"` (le paramètre doit apparaître dans l'URL)
- `like` ne trouve rien → les `%` doivent entourer la valeur : `"%{$search}%"` — pas `{$search}` seul
- La barre n'apparaît pas → `APP_DEBUG=true`, page HTML complète, `storage/` inscriptible
- Les chiffres N+1 ne bougent pas → `with('category')` doit être **avant** `get()`/`paginate()`, sur la requête du catalogue (pas sur `$featured`)
- Les liens de page perdent le filtre → `withQueryString()` manquant après `paginate()`

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Jeu à la une : `Game::where('featured', true)->first()` ; podium : `Game::orderByDesc('rating')->limit(6)->get()`
- Filtre : `->when($request->query('category'), fn ($query, $id) => $query->where('category_id', $id))`
- Recherche : `->when($request->query('search'), fn ($query, $search) => $query->where('title', 'like', "%{$search}%"))`
- N+1 : `Game::with('category')` ; compteur par catégorie : `Category::withCount('games')` → `$category->games_count`
- Pagination : `->paginate(9)->withQueryString()` + `{{ $games->links() }}`

</details>

<details>
<summary>Niveau 3 — Squelettes partiels</summary>

Contrôleur d'accueil (extrait, état de fin de socle) :

```php
public function index(Request $request)
{
    $games = Game::query()
        ->with('category')
        ->when($request->query('category'), fn ($query, $id) =>
            $query->where('category_id', $id))
        ->paginate(9)
        ->withQueryString();

    return view('home', [
        'games' => $games,
        'categories' => Category::withCount('games')->get(),
        'featured' => Game::where('featured', true)->first(),
        'topRated' => Game::orderByDesc('rating')->limit(6)->get(),
    ]);
}
```

Formulaire de filtre (extrait) :

```blade
<form method="GET" action="{{ url('/') }}">
    <input type="search" name="search" value="{{ request('search') }}" placeholder="Rechercher…">
    <select name="category">
        <option value="">Toutes les catégories</option>
        @foreach ($categories as $category)
            <option value="{{ $category->id }}" @selected(request('category') == $category->id)>
                {{ $category->name }} ({{ $category->games_count }})
            </option>
        @endforeach
    </select>
    <button type="submit">Filtrer</button>
</form>
```

</details>

---

## Critères de réussite

- [ ] Un jeu « à la une » (`featured`) et les 6 meilleures notes sur l'accueil
- [ ] `/?category=<id>` filtre le catalogue ; la catégorie choisie reste sélectionnée et affiche son compteur
- [ ] Debugbar installée en `require-dev`, N+1 corrigé par `with('category')` — chiffres avant/après dans `REPONSES.md`
- [ ] 9 jeux par page avec liens de pagination ; `?category=…` survit au changement de page
- [ ] US1–US2 : `/?search=` cherche dans le titre, combiné à `?category=` ; le formulaire conserve les valeurs
- [ ] `REPONSES.md` contient la section « Séance 4 — Sous le capot » avec les réponses de C1–C2 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé

**Temps estimé** : Partie A ≈ 1h30 en séance · Partie B ≈ 1h15 · Partie C ≈ 45 min · Bonus ≈ 1h
