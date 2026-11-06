# Exercice 04 — Requêtes Eloquent et optimisation

## Objectif

Rendre le catalogue WishFlix **filtrable et mesuré** : installer la Debugbar, filtrer les jeux par catégorie, afficher un jeu « à la une » et les meilleures notes, puis **diagnostiquer et corriger le N+1** du catalogue en prouvant le gain — et, chez vous, ajouter la recherche par titre et (en bonus) la pagination.

**Durée estimée** : 4h45 (Partie A : 2h en séance · Partie B : ~2h chez vous · Partie C : ~45 min chez vous · Bonus : au choix)

> **Déroulé** — En séance (2h) : Partie A · Chez vous : Partie B (~2h) + Partie C (~45 min) · Bonus : au choix · ⚠️ **Requis pour la séance 5** : la Partie A terminée (filtres, mise en avant, N+1 corrigé) — en S5 on ajoutera des formulaires d'édition au-dessus de ces requêtes.

**Référence officielle** :

- [Query Builder](https://laravel.com/framework/docs/12.x/queries)
- [Eloquent Relationships — Eager Loading](https://laravel.com/framework/docs/12.x/eloquent-relationships#eager-loading)
- [Pagination](https://laravel.com/framework/docs/12.x/pagination)
- [Laravel Debugbar](https://laraveldebugbar.com/docs/installation)

---

## Prérequis

- La **Partie A de l'exercice 03 terminée** : modèles `Game`, `Category`, `Platform` + migrations jouées + seeders qui peuplent la base — `/` affiche les jeux depuis la base, `/game/{id}` la fiche
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`)

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

---

## Partie A — En séance (atelier WishFlix)

### A1 — Installer la Debugbar

**Étape 1 — Installer le package en dépendance de dev**

```bash
./vendor/bin/sail composer require fruitcake/laravel-debugbar --dev
```

Le `--dev` est important : la barre affiche vos requêtes SQL — utile en développement, elle ne doit **jamais** partir en production.

**Étape 2 — Vérifier l'affichage**

Rechargez `/` dans le navigateur : une barre apparaît en bas de page (rien à configurer, Laravel découvre le package tout seul). Cliquez sur l'onglet **Queries** : vous voyez chaque requête SQL exécutée, sa durée, et le nombre total.

✅ Vérification : l'onglet Queries liste les requêtes de la page d'accueil.

> 💡 Si la barre n'apparaît pas : elle nécessite une page HTML complète (pas de réponse JSON) et `APP_DEBUG=true`. Elle se désactive via `DEBUGBAR_ENABLED=false` dans `.env`.

### A2 — Filtrer le catalogue par catégorie

**En tant que** visiteur, **je veux** filtrer les jeux par catégorie via `/?category=`, **afin de** ne voir que les jeux qui m'intéressent.

**Étape 1 — Lire le paramètre dans le contrôleur**

Dans `GameController::index`, remplacez `Game::all()` par une requête construite :

```php
$games = Game::query()
    ->when($request->query('category'), fn ($query, $id) =>
        $query->where('category_id', $id))
    ->get();
```

Pensez à injecter `Request $request` en paramètre de `index` et à ajouter l'import `Illuminate\Http\Request`.

**Étape 2 — Ajouter le filtre dans la vue**

Sur l'accueil, ajoutez un formulaire `GET` (ou des liens) avec un `<select name="category">` alimenté par les catégories — passez-les à la vue depuis le contrôleur. La catégorie choisie doit rester sélectionnée après filtrage (`@selected`).

✅ Vérification : `/?category=1` n'affiche que les jeux de cette catégorie, `/` sans paramètre affiche tout, et le filtre combiné à une catégorie vide n'exclut rien.

### A3 — Un jeu « à la une »

**En tant que** visiteur, **je veux** voir un jeu mis en avant en haut de l'accueil, **afin de** découvrir une recommandation.

**Étape 1 — La requête**

Dans le contrôleur, ajoutez une deuxième variable pour la vue :

```php
$featured = Game::where('featured', true)->first();
```

**Étape 2 — L'affichage**

Affichez `$featured` dans un encart en haut de l'accueil (titre, jaquette, note) — protégez l'affichage par un `@if ($featured)` au cas où aucun jeu n'est `featured`.

✅ Vérification : un jeu `featured` s'affiche dans l'encart ; sans jeu `featured`, la page n'affiche pas d'encart vide (et ne plante pas).

> 💡 Variante : `->inRandomOrder()->first()` pioche un jeu « à la une » différent à chaque chargement.

### A4 — Les meilleures notes

**En tant que** visiteur, **je veux** voir les jeux les mieux notés, **afin de** repérer les valeurs sûres du catalogue.

Dans le contrôleur, ajoutez une troisième collection — les 6 jeux les mieux notés :

```php
$topRated = Game::orderByDesc('rating')->limit(6)->get();
```

Affichez-la dans une section « Mieux notés » de l'accueil.

✅ Vérification : la section liste 6 jeux maximum, triés du `rating` le plus haut au plus bas.

### A5 — Diagnostiquer puis corriger le N+1

**Étape 1 — Mesurer AVANT**

Ouvrez `/` avec la Debugbar, onglet **Queries**, et regardez la liste : vos cartes affichent `$game->category->name` — chaque carte déclenche sa propre requête `categories`.

**À noter dans `REPONSES.md`** (section « Séance 4 — N+1 ») : le **nombre de requêtes** de la page d'accueil avant correction, et le SQL de la requête qui se répète.

> 💡 Si vous avez fait l'US3 de l'exercice 03 (`$category->games()->count()` dans la vue), elle compte aussi une requête par catégorie — elle fait partie du diagnostic.

**Étape 2 — Corriger avec `with()`**

Ajoutez `->with('category')` à la requête du catalogue. Et si votre accueil affiche le nombre de jeux par catégorie, remplacez le comptage en boucle par :

```php
$categories = Category::withCount('games')->get();
```

La vue lit alors `$category->games_count` — un seul calcul en sous-requête, plus de requête par catégorie.

**Étape 3 — Mesurer APRÈS**

Rechargez et relisez l'onglet Queries.

**À noter dans `REPONSES.md`** : le **nombre de requêtes après correction**, le gain constaté — et en une phrase, ce que `with('category')` a changé dans le SQL exécuté.

### ✅ Checkpoint de fin de séance

- [ ] La Debugbar est installée (`--dev`) et l'onglet Queries s'ouvre
- [ ] `/?category=<id>` filtre le catalogue, `/` affiche tout
- [ ] Un jeu « à la une » et les 6 meilleures notes s'affichent sur l'accueil
- [ ] Le N+1 du catalogue est corrigé par `with('category')` — les chiffres avant/après sont dans `REPONSES.md`
- [ ] Commit poussé sur votre dépôt GitHub privé

> Tout est coché ? Votre catalogue filtre et prouve son efficacité — chez vous, vous lui ajouterez la recherche et, en bonus, la pagination.

---

## Partie B — Chez vous (user stories)

### US1 — Recherche par titre

**En tant que** visiteur, **je veux** chercher un jeu par son titre, **afin de** le retrouver sans parcourir tout le catalogue.

Critères d'acceptation :

- Un champ de recherche `q` dans le formulaire de l'accueil (méthode `GET`)
- La requête applique `where('title', 'like', "%{$q}%")` via `when()` — pas de filtre si `q` est absent
- Le champ reste rempli après la recherche (`value="{{ request('q') }}"`)
- `/?q=zelda` ne renvoie que les jeux dont le titre contient « zelda »

### US2 — Recherche + filtre combinés

**En tant que** visiteur, **je veux** combiner recherche par titre et filtre par catégorie, **afin d'** affiner ma recherche.

Critères d'acceptation :

- `/?q=…&category=…` applique les **deux** contraintes en même temps
- `/?category=…` sans `q` filtre seul ; `/?q=…` sans `category` cherche seule
- Le formulaire « se souvient » des deux valeurs après envoi
- Un lien « Réinitialiser » ramène à `/` sans paramètres

---

## Partie C — Sous le capot (chez vous, ~45 min)

`->when(…)`, `->paginate(10)` : deux méthodes que vous avez chaînées sans qu'elles apparaissent dans votre modèle. Où vivent-elles dans le framework, et que font-elles vraiment ? Dans cette partie, vous lisez le code dans `vendor/laravel/framework/src/Illuminate/` pour suivre la chaîne.

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

**À noter dans `REPONSES.md`** : quels **deux** arguments votre closure `fn ($query, $q) => …` reçoit-elle ? Que se passe-t-il si la closure ne renvoie rien ?

**Question 4** — À vous d'appliquer.

Prédisez le SQL de `Game::where('featured', true)->when(null, fn ($q) => $q->where('rating', '>', 9))->toSql()`, puis vérifiez dans Tinker.

**À noter dans `REPONSES.md`** : votre prédiction et le `toSql()` réel.

### C2 — Comment `paginate()` fabrique les pages (Observer, ~25 min)

**Point de départ** : `Game::paginate(10)` renvoie un objet qui boucle comme une Collection, mais affiche des liens de pages. Deux requêtes SQL se cachent derrière.

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

## Bonus — Pagination du catalogue

**En tant que** visiteur, **je veux** parcourir le catalogue page par page, **afin de** ne pas charger des dizaines de jeux d'un coup.

- Remplacez `->get()` par `->paginate(9)` (ou `12`) sur la requête du catalogue — **après** les `when()`
- Ajoutez `->withQueryString()` pour que `?q=…&category=…` survivent au changement de page
- Affichez `{{ $games->links() }}` sous la grille de jeux

✅ Vérification : `/` affiche N jeux par page avec des liens numérotés ; `?q=…&page=2` conserve la recherche ; la Debugbar montre les 2 requêtes de pagination (`count(*)` + `limit … offset …`).

<details>
<summary>Indice — Le piège classique</summary>

Sans `withQueryString()`, cliquer « page 2 » perd `?q=` et `?category=` : le filtre saute. Avec, chaque lien de page recopie les paramètres courants.

</details>

---

## Indices

<details>
<summary>Niveau 1 — Où regarder</summary>

- `Call to undefined method` sur `when`/`with` → la chaîne part bien d'un builder : `Game::query()` ou `Game::where(…)`, pas d'une Collection déjà récupérée
- Le filtre ne réagit pas → vérifiez que le `<select>` s'appelle `category` et que le formulaire est en `method="GET"` (le paramètre doit apparaître dans l'URL)
- `like` ne trouve rien → les `%` doivent entourer la valeur : `"%{$q}%"` — pas `{$q}` seul
- La barre n'apparaît pas → `APP_DEBUG=true`, page HTML complète, `storage/` inscriptible
- Les chiffres N+1 ne bougent pas → `with('category')` doit être **avant** `get()`/`paginate()`, sur la requête du catalogue (pas sur `$featured`)

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Filtre optionnel : `->when($request->query('category'), fn ($query, $id) => $query->where('category_id', $id))`
- Recherche : `->when($request->query('q'), fn ($query, $q) => $query->where('title', 'like', "%{$q}%"))`
- N+1 : `Game::with('category')` ; compteur par catégorie : `Category::withCount('games')` → `$category->games_count`
- Pagination : `->paginate(9)->withQueryString()` + `{{ $games->links() }}`

</details>

<details>
<summary>Niveau 3 — Squelettes partiels</summary>

Contrôleur d'accueil (extrait) :

```php
public function index(Request $request)
{
    $games = Game::query()
        ->with('category')
        ->when($request->query('q'), fn ($query, $q) =>
            $query->where('title', 'like', "%{$q}%"))
        ->when($request->query('category'), fn ($query, $id) =>
            $query->where('category_id', $id))
        ->get();

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
    <input type="search" name="q" value="{{ request('q') }}" placeholder="Rechercher…">
    <select name="category">
        <option value="">Toutes les catégories</option>
        @foreach ($categories as $category)
            <option value="{{ $category->id }}" @selected(request('category') == $category->id)>
                {{ $category->name }}
            </option>
        @endforeach
    </select>
    <button type="submit">Filtrer</button>
</form>
```

</details>

---

## Critères de réussite

- [ ] Debugbar installée en `require-dev`, onglet Queries lisible sur `/`
- [ ] `/?category=<id>` filtre le catalogue ; la catégorie choisie reste sélectionnée
- [ ] Encart « À la une » (`featured`) et section des 6 meilleures notes sur l'accueil
- [ ] `REPONSES.md` contient la section « Séance 4 — N+1 » avec les nombres de requêtes avant/après
- [ ] US1–US2 : `/?q=` cherche dans le titre, combiné à `?category=` ; le formulaire conserve les valeurs
- [ ] `REPONSES.md` contient la section « Séance 4 — Sous le capot » avec les réponses de C1–C2 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé

**Temps estimé** : Partie A ≈ 2h · Partie B ≈ 2h · Partie C ≈ 45 min · Bonus ≈ 45 min
