# Fil à suivre — Séance 4 : Requêtes Eloquent et optimisation

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/04-requetes/`.
Le projet Laravel est dans `../base/` ; les fichiers finaux à coller sont dans `solution/` (à copier avec `cp -r solution/* ../base/`).

## Avant la séance

- [ ] **Prérequis : les solutions S2 et S3 sont appliquées** (`cp -r ../seance-02/solution/* .` puis `cp -r ../seance-03/solution/* .` depuis `base/` ou `app/`), base seedée : `sail artisan migrate:fresh --seed` (30 quêtes)
- [ ] `cd ../base && ./vendor/bin/sail up -d` puis `sail npm install && sail npm run dev` (second terminal)
- [ ] `http://localhost/quests` affiche les 30 quêtes seedées — le N+1 est **présent** (chaque carte lit `$quest->category->name`)
- [ ] Éditeur ouvert, terminal prêt (`sail artisan ...`, `sail artisan tinker`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final
- [ ] **Ne pas activer `preventLazyLoading` avant l'étape e** : il fait échouer le N+1… dont on a besoin pour la démo
- [ ] Optionnel : pré-installer la Debugbar (`sail composer require fruitcake/laravel-debugbar --dev`) pour gagner du temps à l'étape d

> Les slides montrent la variante **MariaDB/Sail** ; le projet démo tourne en SQLite — les commandes `sail artisan` sont identiques.

---

## a. Query Builder vs Eloquent — `01-query-builder-vs-eloquent.md`

Dans Tinker, exécuter **la même requête par les deux portes** et comparer ce qui revient :

```php
DB::table('quests')->where('xp', '>=', 100)->get();   // Collection de stdClass
Quest::where('xp', '>=', 100)->get();                // Collection de Quest

$q = DB::table('quests')->find(1);
$q->featured;        // int (0/1) — pas de cast
$q->category;        // erreur : propriété inexistante — pas de relation

$q = Quest::find(1);
$q->featured;        // bool — le casts() du modèle s'applique
$q->category->name;  // la relation marche (et coûte 1 requête)
```

Voir le SQL généré — les deux portes produisent le même SQL :

```php
DB::table('quests')->where('xp', '>=', 100)->toSql();
Quest::where('xp', '>=', 100)->toSql();
Quest::where('xp', '>=', 100)->dd();   // SQL + bindings, puis arrêt
```

Message : `find`, `where`, `orderBy`, `get`… même chaîne des deux côtés — ce qui change, c'est **ce qui revient** (stdClass vs modèle avec relations et casts).

## b. Filtrer, chercher, trier — `02-filtrer-et-trier.md`

Toujours dans Tinker :

```php
Quest::where('difficulty', 'hard')->count();
Quest::whereIn('difficulty', ['easy', 'medium'])->count();
Quest::whereBetween('xp', [50, 100])->pluck('title');
Quest::where('title', 'like', '%quiz%')->pluck('title');
Quest::orderByDesc('xp')->limit(5)->pluck('title', 'xp');
Quest::latest()->first()?->title;
```

Filtrer par **relation** (chapitre 2, `whereHas`) — les quêtes qui se déroulent à la BU :

```php
Quest::whereHas('locations', fn ($q) => $q->where('name', 'BU'))->pluck('title');
```

## c. Le catalogue filtrable — `02-filtrer-et-trier.md` (« Filtres optionnels »)

Brancher le formulaire de la vue sur `index()` — coller le contrôleur final (`solution/app/Http/Controllers/QuestController.php`) :

```php
$quests = Quest::query()
    ->with('category')                                              // étape e — pas encore !
    ->when($request->query('q'),
        fn ($query, $q) => $query->where('title', 'like', "%{$q}%"))
    ->when($request->query('category'),
        fn ($query, $categoryId) => $query->where('category_id', $categoryId))
    ->orderByDesc('xp')
    ->paginate(10)                                                  // étape g — pas encore !
    ->withQueryString();                                            // idem
```

Montrer la version **intermédiaire** d'abord (sans `with`, sans `paginate` — juste `->get()`), puis la vue (`solution/resources/views/quests/index.blade.php`) : formulaire `GET`, `request('q')` pour re-remplir le champ, `@selected` pour la catégorie.

Tester : `/quests?q=quiz`, `/quests?category=2`, combinaison des deux, puis « Réinitialiser ».

Insister sur `"%{$q}%"` : la valeur reste **liée** (binding) — jamais concaténée dans du SQL brut.

## d. Le N+1 revient à l'écran — `03-eager-loading.md`

Avec la vue qui affiche `$quest->category->name` par carte, refaire le comptage de la S3 :

```php
DB::enableQueryLog();
$quests = Quest::all();
$quests->each(fn ($q) => $q->category->name);
count(DB::getQueryLog());   // = 31 pour 30 quêtes
```

Corriger dans le contrôleur : `->with('category')`. Recompter : **2 requêtes** (1 pour les quêtes, 1 pour les catégories) quel que soit le nombre de quêtes.

Variantes à montrer en Tinker : `Quest::with(['category', 'locations'])->get()` (3 requêtes), `$quest->load('locations')` (eager loading *après coup*), `Location::withCount('quests')->get()` → attribut `quests_count`.

## e. `preventLazyLoading` + Debugbar — `03-…` fin et `04-debugbar.md`

1. Coller `solution/app/Providers/AppServiceProvider.php` (`Model::preventLazyLoading(! $this->app->isProduction())`).
2. **Reproduire le N+1** : retirer temporairement `with('category')` du contrôleur → `/quests` explose avec `LazyLoadingViolationException` — la barre d'outils anti-N+1 est branchée. Remettre `with('category')`.
3. Installer la Debugbar :

```bash
sail composer require fruitcake/laravel-debugbar --dev
```

4. Recharger `/quests` : la barre en bas de page → onglet **Queries** : nombre total, durée par requête, doublons. Jouer avec les filtres (`?q=`, `?category=`) et faire lire le SQL réel par la salle.
5. Reproduire le N+1 une dernière fois **sous les yeux de la Debugbar** (retirer `with`, recharger : ~33 requêtes listées ; remettre `with` : 4 requêtes) — **noter les deux chiffres au tableau** : c'est le réflexe « mesurer avant/après » exigé à la soutenance (S9).

> ⚠️ Avec `preventLazyLoading` actif, la page N+1 plante **avant** d'afficher la barre : pour mesurer le N+1 dans la Debugbar, commenter la ligne le temps de la démo — ou compter sur la page où `with` est retiré ET `preventLazyLoading` désactivé.

## f. Le classement — `05-agregats-et-classement.md`

Agrégats en Tinker :

```php
Quest::count();  Quest::sum('xp');  Quest::avg('xp');  Quest::max('xp');
Quest::select('difficulty')->selectRaw('avg(xp) as xp_moyen')
     ->groupBy('difficulty')->having('xp_moyen', '>', 100)->get();
```

Puis les requêtes-qui-comptent-sans-charger :

```php
Category::withSum('quests', 'xp')->orderByDesc('quests_sum_xp')->get();
Location::withCount('quests')->orderByDesc('quests_count')->get();
```

Brancher la page `/classement` — coller `LeaderboardController`, `routes/web.php`, `leaderboard/index.blade.php`, `partials/nav.blade.php` (lien « Classement »).

> Le « classement de la promo » (XP par joueur) n'est **pas faisable** : pas encore de table `user ↔ quest` — ce lien arrive en S6 avec l'authentification. Dire pourquoi on classe donc les catégories et les lieux.

## g. La pagination — `06-pagination.md`

Remplacer `->get()` par `->paginate(10)->withQueryString()` dans `index()` (version finale dans `solution/`). Dans la vue : `{{ $quests->links() }}`.

Montrer :

- `/quests` → page 1 (10 quêtes), `?page=2`, `?page=3` ;
- `?q=quiz&page=2` conserve la recherche **grâce à `withQueryString()`** — le retirer pour casser la démo, puis le remettre ;
- dans la Debugbar : les 2 requêtes de pagination (`select count(*)` + `select … limit 10 offset 20`).

La librairie de liens rend du markup prévu pour **Tailwind** — notre démo n'a pas Tailwind : les liens restent fonctionnels, juste dépouillés. Citer `Paginator::useBootstrapFive()` pour les projets Bootstrap.

---

## Rejouer la démo

```bash
sail artisan migrate:fresh --seed   # repartir d'une base peuplée
```

Pour sauter à la solution : `cp -r solution/* ../base/` depuis `seance-04/`.
