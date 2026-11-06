# Exercice 05 — Formulaires, validation et Form Requests

## Objectif

Construire le **back-office de WishFlix** : créer, modifier et supprimer des jeux depuis le navigateur, avec des formulaires protégés (CSRF), des données validées côté serveur et une validation centralisée dans des Form Requests.

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (6 chapitres, 3 points de contrôle) | En séance | ≈ 1 h à un rythme d'élève |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot » | À la maison | ≈ 1h15 + ≈ 45 min |
| **Bonus** | 3e user story, `GameService`, upload de la jaquette | Facultatif | ≈ 1h30 |

> Ces estimations sont indicatives : elles supposent un rythme rapide — un étudiant met souvent 2 à 3 fois plus de temps que la démo. ⚠️ **Requis pour la séance 6** : la Partie A terminée (création validée, édition, suppression) — en S6 on réservera ce back-office aux administrateurs.

**Référence officielle** :

- [Validation](https://laravel.com/docs/12.x/validation)
- [CSRF Protection](https://laravel.com/docs/12.x/csrf)
- [Resource Controllers](https://laravel.com/docs/12.x/controllers#resource-controllers)
- [Route Model Binding](https://laravel.com/docs/12.x/routing#route-model-binding)
- [Form Request Validation](https://laravel.com/docs/12.x/validation#form-request-validation)

---

## Prérequis

- La **Partie A de l'exercice 03 terminée** : modèles `Game`, `Category`, `Platform`, base seedée (≥ 6 jeux), accueil et `/game/{id}` branchés sur Eloquent
- Le layout `resources/views/layouts/app.blade.php` et un `GameController` (S2)
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`)

---

## Étape 0 — Contrôler l'environnement

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan route:list --name=games
./vendor/bin/sail artisan tinker
```

Dans Tinker : `App\Models\Game::count()` puis `App\Models\Category::count()`.

✅ Vérification : `games.show` apparaît dans `route:list`, `http://localhost` affiche les jeux, `Game::count()` ≥ 6 et `Category::count()` ≥ 4. Sinon, terminez d'abord l'exercice 03.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant.

### A1 — Le formulaire de création (Chapitre 1)

**Étape A1.1** — **Routes** : dans `routes/web.php`, ajoutez `GET /games/create` (action `create`, nom `games.create`) et `POST /games` (action `store`, nom `games.store`) vers `GameController`.

**Étape A1.2** — **`create()`** : renvoyez la vue `games.create` en lui passant `Category::all()` et `Platform::all()`.

**Étape A1.3** — **Vue** `resources/views/games/create.blade.php` : elle étend le layout et contient un `<form method="POST" action="{{ route('games.store') }}">` avec ces champs (chaque `name` est la clé reçue par le serveur) :

| Champ (`name`) | Contrôle |
|---|---|
| `title` | `input type="text"` |
| `synopsis` | `textarea` |
| `release_year` | `input type="number"` |
| `rating` | `input type="number" step="0.1"` |
| `playtime_hours` | `input type="number"` |
| `cover_url` | `input type="text"` |
| `status` | `select` (valeurs `released`, `upcoming`, `early_access`) |
| `category_id` | `select` alimenté par `$categories` |
| `platform_ids[]` | cases à cocher alimentées par `$platforms` |
| `featured` | case à cocher (`value="1"`) |

**Étape A1.4** — **`store()`** : `Game::create($request->only([...]))` avec les colonnes de `Game`, puis `platforms()->sync($request->input('platform_ids', []))`, puis `redirect()->route('games.show', $game)->with('success', 'Jeu créé !')`.

**Étape A1.5** — **Message flash** : dans `layouts/app.blade.php`, affichez `session('success')` au-dessus de `@yield('content')`.

**Étape A1.6** — Ajoutez un lien « Nouveau jeu » dans la navbar.

✅ Vérification : `/games/create` affiche le formulaire. Remplissez-le et envoyez : vous obtenez une erreur **419 Page Expired**. C'est normal et attendu, l'étape suivante l'explique.

### A2 — Le jeton CSRF (Chapitre 2)

**Étape A2.1** — Ajoutez `@csrf` juste après la balise `<form>`.

**Étape A2.2** — Inspectez la page avec les DevTools : repérez le champ caché `_token`.

✅ Vérification : l'envoi crée le jeu, vous arrivez sur `/game/{id}` et la bannière « Jeu créé ! » s'affiche **une seule fois** (rechargez : elle disparaît).

### A3 — Valider la saisie (Chapitre 3)

**Étape A3.1** — Dans `store()`, remplacez `only()` par `$request->validate([...])` : une règle par champ.

| Champ | Contrainte attendue |
|---|---|
| `title` | obligatoire, texte, 150 caractères maximum |
| `synopsis` | obligatoire, texte |
| `release_year` | obligatoire, entier entre 1970 et 2100 |
| `rating` | obligatoire, nombre entre 0 et 10 |
| `playtime_hours` | obligatoire, entier ≥ 0 |
| `cover_url` | obligatoire, URL valide |
| `status` | obligatoire, parmi les trois valeurs du `select` |
| `category_id` | obligatoire, doit exister dans `categories` |
| `platform_ids` / `platform_ids.*` | tableau facultatif, chaque id doit exister dans `platforms` |
| `featured` | booléen |

**Étape A3.2** — Dans la vue, sous chaque champ : `@error('champ')` avec `$message`.

**Étape A3.3** — Conservez la saisie : `old('title')` dans les champs texte, entre les balises du `textarea`, `@selected(...)` sur les `select`, `@checked(...)` sur les cases.

**Étape A3.4** — `featured` : ajoutez avant la case un `<input type="hidden" name="featured" value="0">` pour que la valeur soit toujours envoyée.

✅ Vérification : un titre vide ramène au formulaire avec un message sous le champ et les autres champs conservés ; une catégorie inexistante (modifiez le `value` dans les DevTools) est refusée ; un jeu valide est créé.

> ✅ **Point de contrôle 1**
>
> - [ ] `/games/create` s'affiche, l'envoi valide crée un jeu et redirige vers sa fiche
> - [ ] Sans `@csrf` vous obtenez un 419, avec il n'y en a plus
> - [ ] Chaque règle refuse bien une valeur invalide, et la saisie est conservée
> - [ ] Commit : « feat: création validée d'un jeu »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s5-ch1-formulaire`, `s5-ch2-csrf` et `s5-ch3-validation` (dépôt `CampusQuest`), puis **refaites** les étapes A1 à A3 sur WishFlix.

### A4 — Éditer et supprimer, routes à la main (Chapitre 4)

**Étape A4.1** — **Routes** (à la main, une par une) : `GET /games/{id}/edit` (`games.edit`), `PUT /games/{id}` (`games.update`), `DELETE /games/{id}` (`games.destroy`).

**Étape A4.2** — **`edit(int $id)`** : `Game::findOrFail($id)`, puis la vue `games.edit` avec le jeu, les catégories et les plateformes.

**Étape A4.3** — **Vue** `games/edit.blade.php` : même formulaire que la création, avec `@csrf`, `@method('PUT')` et les valeurs actuelles en repli : `old('title', $game->title)`. Pour les plateformes cochées : `$game->platforms->pluck('id')`.

**Étape A4.4** — **`update(Request $request, int $id)`** : `findOrFail`, les **mêmes règles** que `store()` (recopiez-les), `$game->update(...)`, `sync()` des plateformes, redirection vers la fiche avec un message.

**Étape A4.5** — **`destroy(int $id)`** : `findOrFail`, détachez les plateformes (`platforms()->detach()`), `delete()`, redirection vers `/` avec un message.

**Étape A4.6** — Sur `game-detail.blade.php` : un lien « Modifier » et un petit formulaire « Supprimer » (`@csrf` + `@method('DELETE')`).

✅ Vérification : modifier un jeu change bien sa fiche, un titre invalide ramène au formulaire d'édition avec ses erreurs, supprimer un jeu qui a des plateformes fonctionne (sans le `detach()` vous auriez une erreur 500).

### A5 — `Route::resource` et route model binding (Chapitre 5)

C'est un **refactor** : les pages ne changent pas.

**Étape A5.1** — Remplacez vos cinq routes `games.create`, `games.store`, `games.edit`, `games.update`, `games.destroy` par :

```php
Route::resource('games', GameController::class)->except(['index', 'show']);
```

`games.show` (`/game/{id}`) existe déjà : il est donc exclu.

**Étape A5.2** — Passez `edit`, `update` et `destroy` au **binding** : signatures `edit(Game $game)`, `update(Request $request, Game $game)`, `destroy(Game $game)` ; supprimez les `findOrFail`.

**Étape A5.3** — Dans les vues, `route('games.edit', $game)` suffit.

✅ Vérification : `sail artisan route:list --name=games` montre vos routes avec `{game}` ; création, édition et suppression marchent toujours.

> ✅ **Point de contrôle 2**
>
> - [ ] Plus aucun `findOrFail` dans `edit`, `update` et `destroy`
> - [ ] `route:list` montre `games.create`, `games.store`, `games.edit`, `games.update`, `games.destroy`
> - [ ] Les trois actions (créer, modifier, supprimer) fonctionnent encore
> - [ ] Commit : « refactor: Route::resource et route model binding »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s5-ch4-edition` et `s5-ch5-resource` (dépôt `CampusQuest`), puis **refaites** les étapes A4 et A5 sur WishFlix.

### A6 — Form Request (Chapitre 6)

**Étape A6.1** — Générez les classes :

```bash
./vendor/bin/sail artisan make:request StoreGameRequest
./vendor/bin/sail artisan make:request UpdateGameRequest
```

**Étape A6.2** — Dans chacune : `authorize()` renvoie `true` et `rules()` contient vos règles (déplacées telles quelles depuis le contrôleur).

**Étape A6.3** — Dans le contrôleur, remplacez `Request` par `StoreGameRequest` / `UpdateGameRequest` et utilisez `$request->validated()`.

✅ Vérification : le comportement est identique à celui du point de contrôle 2, mais `store()` et `update()` ne contiennent plus de `validate()`.

> ✅ **Point de contrôle 3 (fin de la Partie A, requis pour la S6)**
>
> - [ ] `app/Http/Requests/StoreGameRequest.php` et `UpdateGameRequest.php` existent
> - [ ] `store()` et `update()` utilisent `$request->validated()`
> - [ ] Erreurs et `old()` fonctionnent comme avant
> - [ ] Commit : « refactor: Form Requests pour les jeux »
>
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s5-ch6-form-request` (dépôt `CampusQuest`), puis **refaites** l'étape A6 sur WishFlix.

> Le chapitre 7 (services) est une **démo** : rien à reproduire en séance. `GameService` est en Bonus.

---

## Partie B — Attendu (à la maison, ≈ 1h15)

Même démarche que la Partie A, sur de nouvelles ressources. Chaque US réutilise `Route::resource`, le binding et les Form Requests.

### US1 — CRUD des catégories

**En tant que** administrateur, **je veux** gérer les catégories de jeux depuis le navigateur, **afin de** ne plus passer par les seeders.

Critères d'acceptation :

- `Route::resource('categories', CategoryController::class)->except(['show'])`
- Une liste des catégories (`index`) avec les liens « Modifier » et le formulaire « Supprimer »
- Création et édition avec `StoreCategoryRequest` / `UpdateCategoryRequest` : `name` obligatoire, texte, 50 caractères maximum, **unique** dans `categories`
- À l'édition, une catégorie peut garder son propre nom (règle `unique` qui ignore la catégorie courante)
- Une catégorie qui contient des jeux ne peut pas être supprimée : retour à la liste avec un message d'erreur

### US2 — CRUD des plateformes

**En tant que** administrateur, **je veux** gérer les plateformes, **afin d'**en ajouter une nouvelle (Switch 2, Steam Deck…).

Critères d'acceptation :

- `Route::resource('platforms', PlatformController::class)->except(['show'])`
- Liste, création, édition, suppression avec Form Requests (`name` obligatoire, unique)
- La suppression détache d'abord la plateforme de ses jeux (`games()->detach()`)
- Le message flash de succès s'affiche après chaque action

### Indices de la Partie B

<details>
<summary>Niveau 1 — Où regarder</summary>

- 419 → un `@csrf` manque dans un formulaire
- La suppression renvoie une erreur 500 → la table pivot référence encore la ligne (clé étrangère)
- Le formulaire d'édition ne se pré-remplit pas → `old('name', $category->name)`
- La saisie n'est pas conservée dans un `select` → `@selected(...)`
- `$category` est vide dans `edit()` → le nom du paramètre `{category}` doit correspondre à la variable `$category`

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- `unique:categories,name` à la création ; `Rule::unique('categories', 'name')->ignore($this->category)` à l'édition (dans `UpdateCategoryRequest`)
- Compter les jeux liés : `$category->games()->exists()`
- Retour avec erreur : `redirect()->route('categories.index')->with('error', '…')`
- Générer les squelettes : `make:controller CategoryController --resource --model=Category`

</details>

<details>
<summary>Niveau 3 — Squelette partiel</summary>

```php
public function destroy(Category $category)
{
    if ($category->games()->exists()) {
        return redirect()->route('categories.index')
            ->with('error', 'Cette catégorie contient encore des jeux.');
    }

    $category->delete();

    return redirect()->route('categories.index')->with('success', 'Catégorie supprimée !');
}
```

</details>

---

## Partie C — Sous le capot (à la maison, ≈ 45 min)

Les formulaires de la Partie A semblent marcher « tout seuls » : `@csrf`, `@method('PUT')`, `{game}` qui devient un `Game`. Dans cette partie, vous lisez le code du framework (`vendor/laravel/framework/src/Illuminate/`) pour voir où cela se passe.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque question donne un fil à suivre (un fichier, une méthode) : suivez-le et ignorez le reste.

> 🔧 **Outils** : `Ctrl+P` (ouvrir un fichier), `Ctrl+Shift+O` (sauter à une méthode), `Ctrl+F`, `Ctrl+clic` (aller à la définition). ⚠️ `vendor/` est en lecture seule : ne modifiez rien.

**Rendu** : dans `REPONSES.md`, ajoutez une section `## Séance 5 — Sous le capot`. Pour chaque réponse, indiquez le **chemin suivi** (fichier ouvert → méthode).

### C1 — Qui refuse la requête sans jeton ? (~15 min)

**Point de départ** : l'erreur 419 de l'étape A1.

- Ouvrez `Illuminate/Foundation/Http/Middleware/ValidateCsrfToken.php`, puis remontez à sa classe parente (`Ctrl+clic` sur `VerifyCsrfToken`).
- Lisez `handle()` et `tokensMatch()`.

**À noter dans `REPONSES.md`** : quelles conditions laissent passer une requête ? Pourquoi un `GET` n'est-il jamais vérifié ? D'où vient le jeton auquel `_token` est comparé ?

### C2 — Comment `_method=PUT` devient un PUT ? (~15 min)

**Point de départ** : votre formulaire d'édition (étape A4).

- Ouvrez `Symfony/Component/HttpFoundation/Request.php` (dans `vendor/symfony/http-foundation/`) : la classe `Illuminate\Http\Request` en hérite.
- Lisez la méthode `getMethod` et cherchez `enableHttpMethodParameterOverride`.

**À noter dans `REPONSES.md`** : à quelle condition le champ `_method` est-il pris en compte ? Que se passerait-il avec un `GET` portant `_method=DELETE` ?

### C3 — Comment `{game}` devient un `Game` ? (~15 min)

**Point de départ** : votre `edit(Game $game)` (étape A5).

- Ouvrez `Illuminate/Routing/ImplicitRouteBinding.php` et lisez `resolveForRoute`.
- Repérez où `findOrFail` / `resolveRouteBinding` est appelé et d'où vient la 404.

**À noter dans `REPONSES.md`** : comment Laravel sait-il que le paramètre est un modèle ? Quelle méthode du modèle charge l'enregistrement ? Quelle exception produit la 404 ?

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : le middleware a « Csrf » dans son nom, dans `Foundation/Http/Middleware/`.
- **C2** : cherchez le mot `_method` dans `Symfony/Component/HttpFoundation/Request.php`.
- **C3** : le fichier a « Binding » dans son nom, dans `Routing/`.

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `…/Middleware/VerifyCsrfToken.php` (parent de `ValidateCsrfToken`) → `handle`, `isReading`, `tokensMatch`, `getTokenFromRequest`.
- **C2** : `vendor/symfony/http-foundation/Request.php` → `getMethod`, `enableHttpMethodParameterOverride`.
- **C3** : `Illuminate/Routing/ImplicitRouteBinding.php` → `resolveForRoute` ; `Illuminate/Database/Eloquent/Model.php` → `resolveRouteBinding`, `resolveRouteBindingQuery`.

</details>

---

## Bonus

### Bonus 1 — Une 3e user story : « Jeu à la une unique »

**En tant que** visiteur, **je veux** qu'un seul jeu soit « à la une » à la fois, **afin de** garder un accueil lisible.

- Quand un jeu est enregistré avec `featured` à vrai, tous les autres repassent à faux.
- La règle s'applique à la création **et** à l'édition.

### Bonus 2 — `GameService`

Sortez la logique métier du contrôleur dans `app/Services/GameService.php` (classe PHP simple, créée à la main) : `create(array $data)` et `update(Game $game, array $data)` qui enregistrent le jeu, synchronisent les plateformes et appliquent la règle « à la une ». Injectez-le dans le constructeur de `GameController`.

✅ Vérification : `store()` et `update()` ne contiennent plus que `$this->games->create(...)` / `update(...)` et la redirection.

<details>
<summary>Indice — L'anatomie</summary>

```php
public function __construct(private GameService $games) {}
```

Laravel instancie `GameService` tout seul grâce au conteneur de services : aucun `new`.

</details>

### Bonus 3 — Upload de la jaquette

Ajoutez un champ fichier `cover` au formulaire (`enctype="multipart/form-data"`), validé par `image` et `max:2048`, stocké avec `$request->file('cover')->store('covers', 'public')`, puis affiché sur la fiche. `sail artisan storage:link` rend le dossier accessible.

---

## Critères de réussite

- [ ] Étape 0 : l'environnement répond, la base contient des jeux
- [ ] Créer, modifier et supprimer un jeu fonctionnent, avec `@csrf` et `@method` corrects
- [ ] Validation côté serveur : erreurs affichées sous les champs, saisie conservée
- [ ] `Route::resource` + binding, `StoreGameRequest` / `UpdateGameRequest`
- [ ] US1 et US2 : CRUD `Category` et `Platform`, suppression sans erreur 500
- [ ] `REPONSES.md` contient la section « Séance 5 — Sous le capot » avec les réponses de C1 à C3 et le chemin suivi
- [ ] Commits réguliers poussés sur le dépôt GitHub privé
