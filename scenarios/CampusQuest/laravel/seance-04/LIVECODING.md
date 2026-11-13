# Fil à suivre — Séance 4 : Requêtes Eloquent et optimisation

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/04-request/` (6 chapitres + 1 annexe, un cycle « théorie → démo flash → micro-pratique WishFlix » chacun).

**À partir de la S3, plus de livecoding** : les slides expliquent le code ligne par ligne, la démo ne retape rien — elle dure 2-4 min par chapitre et ne montre que les moments où l'exécution parle : Tinker, navigateur, erreurs provoquées, compteurs SQL. Le code du chapitre est **déjà en place** : on avance de tag en tag dans le dépôt `CampusQuest` (`git checkout s4-chN-…` avant chaque chapitre). Le projet Laravel est dans `../base/` ; `solution/` contient l'état **final** (fin du chapitre 6) — les états intermédiaires sont les tags.

## Moment ↔ chapitre ↔ tag

Les tags existent dans le dépôt `CampusQuest` (**un tag par chapitre**) ; la démo les parcourt dans l'ordre. Le diff entre deux tags reste le code du chapitre pour le rattrapage WishFlix.

| Moment | Chapitre | Tag Campus Quest |
|---|---|---|
| 1.1 Tinker : `where`/`whereIn`/`like`, `orderByDesc`/`limit`/`first`, `->dd()` | 01 — Filtrer et trier | `s4-ch1-filtrer-trier` |
| 2.1 `/quests?search=…&category=…` : recherche + filtre combinés, `@selected` conserve le choix, version `->get()` | 02 — Les filtres optionnels | `s4-ch2-filtres-optionnels` |
| 3.1 Install Debugbar `--dev`, onglet Queries sur `/quests`, comptage du N+1 | 03 — Mesurer avec la Debugbar | `s4-ch3-debugbar` |
| 4.1 Debugbar : `with('category')` retiré (`preventLazyLoading` commenté) → ≈ 33 requêtes, remis → ≈ 4 ; puis alarme `LazyLoadingViolationException` | 04 — L'eager loading | `s4-ch4-eager-loading` |
| 5.1 Agrégats en Tinker (count/sum/avg/max) puis page `/classement` | 05 — Les agrégats | `s4-ch5-agregats` |
| 6.1 `Quest::factory(470)->recycle(Category::all())->create()` → 500 quêtes, `/quests` lourde ; `?page=2`, `withQueryString()` retiré → filtres perdus, remis → conservés ; 2 requêtes dans la Debugbar | 06 — La pagination | `s4-ch6-pagination` |
| — | Annexe Query Builder vs Eloquent + `whereHas` (`08-annexe-query-builder.md`, lecture — hors séance) | — |

## Avant la séance

- [ ] **Prérequis : les solutions S2 et S3 sont appliquées** (`cp -r ../seance-02/solution/* .` puis `cp -r ../seance-03/solution/* .` depuis `base/` ou `app/`), base seedée : `sail artisan migrate:fresh --seed` (30 quêtes)
- [ ] `sail up -d`, `sail npm install && sail npm run dev` (second terminal), `http://localhost/quests` affiche les 30 quêtes — le N+1 est **présent** (chaque carte lit `$quest->category->name`)
- [ ] Dépôt `CampusQuest` propre : les tags `s4-ch1-filtrer-trier` … `s4-ch6-pagination` sont créés et la séance démarre sur l'état de fin S3 (avant `s4-ch1-filtrer-trier`)
- [ ] Le projet démo tourne en **SQLite** (`DB_CONNECTION=sqlite`, fichier `database/database.sqlite` présent)
- [ ] Filet de sécurité : `solution/` contient l'état final (fin ch6)
- [ ] **Ne pas activer `preventLazyLoading` avant le chapitre 4** : il fait échouer le N+1… dont on a besoin pour la démo du chapitre 3
- [ ] Pas de commit en séance : le code est déjà versionné, la démo ne fait qu'exécuter (les rares modifications — `with` commenté, `withQueryString` retiré — sont annulées en direct)

> Les slides montrent la variante **MariaDB/Sail** ; le projet démo tourne en SQLite — les commandes `sail artisan` sont identiques.

---

## Chapitre 1 — Filtrer et trier — tag `s4-ch1-filtrer-trier` (≈ 3 min)

**État de départ** :

```bash
git checkout s4-ch1-filtrer-trier
```

Rien ne change dans les fichiers (le code du catalogue arrive au chapitre 2) — tout se passe en Tinker. Le tag sert de point de reprise pour le rattrapage.

### 1.1 Les variantes de `where` (≈ 1,5 min)

Dans `sail artisan tinker` :

```php
Quest::where('difficulty', 'hard')->count();
Quest::whereIn('difficulty', ['easy', 'medium'])->count();
Quest::where('title', 'like', '%quiz%')->count();           // la recherche « contient »
```

Chaque `where` s'empile en `AND` : en ajouter un second affine le résultat.

### 1.2 Trier, limiter, lire le SQL (≈ 1,5 min)

```php
Quest::orderByDesc('xp')->limit(5)->pluck('title', 'xp');   // le top 5
Quest::orderByDesc('xp')->first()?->title;                  // la plus généreuse
Quest::where('xp', '>=', 100)->orderByDesc('xp')->dd();     // dump + die : SQL + bindings
```

Le `?` du SQL et le tableau de bindings : la valeur voyage **à part** — c'est la protection contre l'injection (démontrée en S6). `dd()` arrête tout : retirer la ligne ensuite. `pluck('title', 'xp')` renvoie un tableau indexé par xp — pratique pour un podium.

---

## Chapitre 2 — Les filtres optionnels — tag `s4-ch2-filtres-optionnels` (≈ 3 min)

**État de départ** :

```bash
git checkout s4-ch2-filtres-optionnels
```

`index()` lit `Request $request`, enchaîne deux `when()` (`search` et `category`), trie par `xp` et finit en **`->get()`** — la pagination arrive au chapitre 6. La vue a le formulaire GET avec `@selected`.

### 2.1 Le catalogue filtrable (≈ 3 min)

Navigateur, en montrant l'URL à chaque fois :

- `/quests` → les 30 quêtes triées par XP
- `/quests?search=quiz` → seules les quêtes dont le titre contient « quiz »
- `/quests?category=2` → seules les quêtes de la catégorie 2
- `/quests?search=quiz&category=2` → les deux contraintes ensemble
- `/quests?search=quiz&category=2` puis « Réinitialiser » → retour à `/` sans paramètres

Dans le `<select>`, la catégorie choisie **reste sélectionnée** après filtrage (`@selected`) — le formulaire se souvient.

Montrer la version `->get()` du contrôleur (pas encore de `paginate`) et insister sur `"%{$search}%"` : valeur **liée**, jamais concaténée dans du SQL brut.

---

## Chapitre 3 — Mesurer avec la Debugbar — tag `s4-ch3-debugbar` (≈ 3 min)

**État de départ** :

```bash
git checkout s4-ch3-debugbar
```

Code identique au ch2 (les filtres sont en place) — le seul changement est la dépendance `fruitcake/laravel-debugbar` en `require-dev` (déjà dans `composer.json` au tag, ou à installer en direct pour le geste).

### 3.1 Installer et ouvrir (≈ 1 min)

Si le package n'est pas encore installé :

```bash
sail composer require fruitcake/laravel-debugbar --dev
```

Le `--dev` compte : la barre n'a rien à faire en production. Recharger `/quests` → la barre apparaît en bas de page → onglet **Queries** : chaque requête SQL, sa durée, le nombre total.

### 3.2 Compter le N+1 (≈ 2 min)

Sur `/quests` (30 quêtes, chacune lisant `$quest->category->name`) : l'onglet Queries liste **~33 requêtes** — 1 pour les quêtes + 1 par carte pour sa catégorie (+ session et formulaire). Jouer avec les filtres (`?search=`, `?category=`) : le nombre de requêtes **par quête** ne change pas — le N+1 est proportionnel au nombre de lignes, pas à la base.

**Noter les deux chiffres au tableau** (≈33 avant, et le `select * from categories where id = ?` répété) : c'est le réflexe « mesurer avant/après » — la correction arrive au chapitre suivant.

> ⚠️ `preventLazyLoading` n'est **pas encore** activé (il arrive au chapitre 4) : la page N+1 s'affiche et se mesure sans planter. C'est voulu.

---

## Chapitre 4 — L'eager loading — tag `s4-ch4-eager-loading` (≈ 4 min)

**État de départ** :

```bash
git checkout s4-ch4-eager-loading
```

`index()` a maintenant `->with('category')` **avant** `orderByDesc` ; `show()` charge `category` + `locations` ; `AppServiceProvider` active `Model::preventLazyLoading(! $this->app->isProduction())`.

### 4.1 Le N+1 mesuré (≈ 2 min)

Pour montrer le gain chiffré, il faut le N+1 **sans** l'exception : commenter temporairement la ligne `Model::preventLazyLoading(…)` dans `AppServiceProvider` **et** retirer `->with('category')` → recharger `/quests` → l'onglet Queries compte **~33 requêtes** (filtres + N+1). Puis, dans l'ordre inverse : remettre `with('category')` → **~4 requêtes**.

Finir sur les deux chiffres au tableau : le même écran, 33 requêtes devenues 4 — `with()` a chargé les catégories **en une requête** (`IN` sur tous les `category_id`) au lieu d'une par quête.

*Variante Tinker (30 s)* : `Quest::with(['category', 'locations'])->get()` = 3 requêtes au total.

### 4.2 L'alarme (≈ 1 min)

Décommenter d'abord la ligne `Model::preventLazyLoading(…)` dans `AppServiceProvider`, puis erreur provoquée : dans `QuestController::index()`, **retirer `->with('category')`**, sauvegarder, recharger `/quests` :

```
Illuminate\Database\LazyLoadingViolationException — Attempted to lazy load [category] on model [App\Models\Quest]…
```

`preventLazyLoading` transforme le N+1 silencieux en **exception** — la protection est branchée. **Remettre `with('category')`** → la page refonctionne.

### 4.3 `preventLazyLoading` en une phrase (≈ 1 min)

La ligne vit dans `AppServiceProvider::boot()` : `! $this->app->isProduction()` = l'alarme sonne **en dev**, jamais en prod (où le lazy loading reste toléré pour ne pas casser la prod sur une relation oubliée).

---

## Chapitre 5 — Les agrégats — tag `s4-ch5-agregats` (≈ 3 min)

**État de départ** :

```bash
git checkout s4-ch5-agregats
```

`LeaderboardController`, route `/classement`, vue `leaderboard/index`, lien « Classement » dans la nav — tout est en place. La liste `/quests` est inchangée (toujours `->get()`, pagination au ch6).

### 5.1 Les agrégats en Tinker (≈ 1 min)

```php
Quest::count();  Quest::sum('xp');  Quest::avg('xp');  Quest::max('xp');
```

La base calcule et renvoie **un chiffre** — pas 30 lignes à additionner en PHP.

### 5.2 La page Classement (≈ 2 min)

Navigateur : `http://localhost/classement` — deux colonnes : **catégories par XP total** (`withSum`) et **lieux par nombre de quêtes** (`withCount`). Dans la Debugbar : **2 requêtes** pour tout le podium — les sous-requêtes `withSum`/`withCount` calculent dans le `SELECT`, l'attribut `quests_sum_xp` / `quests_count` voyage dans le modèle et `orderByDesc` trie dessus.

> Le « classement de la promo » (XP par joueur) n'est **pas faisable** : pas encore de table `user ↔ quest` — ce lien arrive en S6 avec l'authentification. On classe donc les catégories et les lieux : même mécanique, même code.

---

## Chapitre 6 — La pagination — tag `s4-ch6-pagination` (≈ 3 min)

### 6.0 Faire sentir le volume (≈ 1 min)

**Avant le checkout** — encore sur l'état `s4-ch5` (le catalogue est en `->get()`), `sail artisan tinker` :

```php
Quest::factory(470)->recycle(Category::all())->create();
```

→ 500 quêtes en base. Recharger `/quests` : la Debugbar montre la durée, la page devient interminable. C'est le problème que `paginate()` résout.

> `->recycle(Category::all())` réutilise les catégories existantes — sans lui, la `CategoryFactory` créerait une catégorie par quête (cf. `QuestSeeder`).

**État de départ** :

```bash
git checkout s4-ch6-pagination
```

`index()` finit par `->paginate(10)->withQueryString()` ; la vue affiche `{{ $quests->links() }}` sous les cartes. Recharger `/quests` : la même base à 500 quêtes, mais 10 cartes et des liens de pages.

### 6.1 Les pages et les filtres (≈ 2 min)

Navigateur :

- `/quests` → 10 quêtes, liens `1 2 3 … Suivant` en bas
- `/quests?page=2` → la page 2 ; `?page=3`…
- `/quests?search=quiz&page=2` → la recherche **survit** au changement de page (`withQueryString` recopie les paramètres dans chaque lien)

Erreur provoquée : **retirer `->withQueryString()`** dans `index()`, recharger, filtrer `?search=quiz`, cliquer « page 2 » → **la recherche saute**, la page 2 affiche tout le catalogue. **Remettre** `withQueryString()` → elle survit. C'est LE bug classique des catalogues filtrés.

Dans la Debugbar : `paginate()` exécute **2 requêtes** — `select count(*)` pour le total + `select … limit 10 offset 20` pour la page.

*Note sincérité* : la librairie de liens rend du markup prévu pour **Tailwind** — la démo n'a pas Tailwind : les liens restent fonctionnels, juste dépouillés. Citer `Paginator::useBootstrapFive()` pour les projets Bootstrap.

---

## Annexe — Query Builder vs Eloquent + `whereHas` (lecture, hors séance)

`08-annexe-query-builder.md` : la comparaison détaillée des deux portes (quand choisir, même résultat / facture différente) et `whereHas` — filtre **par relation** (`Quest::whereHas('locations', …)`). Ni la séance ni la Partie A ne l'exigent : le catalogue filtre sur ses propres colonnes. À proposer en lecture libre ou en fin de séance si le temps le permet.

---

## Rejouer la démo

```bash
git checkout s4-chN-…              # sauter au tag d'un chapitre (code seulement)
sail artisan migrate:fresh --seed  # repartir d'une base peuplée (données perdues)
```

La base (sqlite) et le code (tags) avancent séparément : un `git checkout` en arrière ne touche pas aux données, un `migrate:fresh` non plus au code. Après les 470 quêtes seedées au chapitre 6, `sail artisan migrate:fresh --seed` remet les 30 quêtes d'origine.

**Solution finale** : `solution/` contient l'état de fin de chapitre 6 — catalogue filtré + `with('category')` + `paginate(10)->withQueryString()`, page `/classement`, `preventLazyLoading`. Sur un projet S4 incomplet, s'appuyer sur les tags `s4-chN-…`.
