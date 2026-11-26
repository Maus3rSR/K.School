# Exercice 05 — Formulaires, validation et Form Requests

## Objectif

Construire le **back-office de WishFlix** : créer, modifier et supprimer des jeux depuis le navigateur, avec des formulaires protégés (CSRF), des données validées côté serveur et une validation centralisée dans des Form Requests.

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (6 chapitres, 3 points de contrôle — la pratique est répartie au fil des chapitres) | En séance | ≈ 1h30 en séance (pratique : 25 + 22 + 22 + 12 + 12 min) |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot » | À la maison | ≈ 1h15 + ≈ 45 min |
| **Bonus** | 3e user story, `GameService`, upload de la jaquette | Facultatif | ≈ 1h30 |

> Le **socle** est dimensionné pour un étudiant lent : ≈ 1h30 en séance, soit ≈ 2× le temps de démo du même geste. Les durées de la **Partie B** et de la **Partie C** restent indicatives — elles supposent un rythme rapide. ⚠️ **Requis pour la séance 6** : la Partie A terminée (création validée, édition, suppression) — en S6 on réservera ce back-office aux administrateurs.

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

> ✅ **Vérification** : `games.show` apparaît dans `route:list`, `http://localhost` affiche les jeux, `Game::count()` ≥ 6 et `Category::count()` ≥ 4. Sinon, terminez d'abord l'exercice 03.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant. **A1** se fait pendant le « À vous » du chapitre 1, qui se termine volontairement sur l'erreur 419 : constatez-la, puis **A2** (chapitre 2) la résout avec `@csrf`.

> 💡 **Lire les consignes** : le HTML et les classes **DaisyUI** sont fournis, collez-les tels quels. Ce que vous tapez vous-même, c'est le code Laravel : PHP du contrôleur, routes, directives Blade. Les citations 💡 expliquent le pourquoi, les citations ⚠️ signalent un piège.

### A1 — Le formulaire de création (Chapitre 1)

#### A1.1 · Routes de création

📄 `routes/web.php`

Ajoutez deux **routes nommées** vers `GameController`, écrites comme celles de la S2 (`Route::get(...)->name(...)`) :

| Verbe | URI | Action | Nom |
|---|---|---|---|
| `GET` | `/games/create` | `create` | `games.create` |
| `POST` | `/games` | `store` | `games.store` |

> 💡 **Même URL, deux verbes** : le `GET` affiche le formulaire, le `POST` reçoit ses données. Le **nom** de route (`games.store`) sert ensuite dans `route('games.store')`.

#### A1.2 · La méthode `create()`

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez les **imports** des deux modèles en haut du fichier, sous le `namespace` :

   ```php
   use App\Models\Category;
   use App\Models\Platform;
   ```

2. Ajoutez la méthode `create()`. Elle renvoie la vue `games.create` avec deux variables :
   - `categories`, qui vaut `Category::all()`
   - `platforms`, qui vaut `Platform::all()`

> 💡 **Import** : `use App\Models\Category;` dit à PHP où trouver la classe `Category`. Sans lui, `Category::all()` provoque l'erreur `Class "App\Http\Controllers\Category" not found`.

#### A1.3 · La vue du formulaire

📄 `resources/views/games/create.blade.php` (nouveau fichier, dans un nouveau dossier `games/`)

Le formulaire envoie ces champs (chaque `name` est la clé reçue par le serveur) :

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

1. Écrivez la structure Blade de la vue, qui **étend** le **layout** (S2) :

   ```blade
   @extends('layouts.app')

   @section('title', 'Nouveau jeu')

   @section('content')
       {{-- collez ici le HTML du formulaire --}}
   @endsection
   ```

2. Collez dans `@section('content')` le HTML ci-dessous. Il est déjà mis en forme avec **DaisyUI** (chargé par la balise CDN de votre layout) : ne touchez pas aux classes.

<details>
<summary>HTML du formulaire (DaisyUI)</summary>

```html
<section class="max-w-2xl mx-auto py-6">
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h1 class="card-title text-2xl">Nouveau jeu</h1>

      <form method="POST" action="#" class="grid gap-3">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Titre</legend>
          <input type="text" name="title" class="input w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Synopsis</legend>
          <textarea name="synopsis" class="textarea w-full h-28"></textarea>
        </fieldset>

        <div class="grid sm:grid-cols-3 gap-3">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Année de sortie</legend>
            <input type="number" name="release_year" class="input w-full" />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Note (sur 10)</legend>
            <input type="number" step="0.1" name="rating" class="input w-full" />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Durée (heures)</legend>
            <input type="number" name="playtime_hours" class="input w-full" />
          </fieldset>
        </div>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">URL de la jaquette</legend>
          <input type="text" name="cover_url" class="input w-full" placeholder="https://…" />
        </fieldset>

        <div class="grid sm:grid-cols-2 gap-3">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Statut</legend>
            <select name="status" class="select w-full">
              <option value="released">Sorti</option>
              <option value="upcoming">À venir</option>
              <option value="early_access">Accès anticipé</option>
            </select>
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Catégorie</legend>
            <select name="category_id" class="select w-full">
              <option value="1">Nom de la catégorie</option>
            </select>
          </fieldset>
        </div>

        <fieldset class="fieldset bg-base-100 border border-base-300 rounded-box p-4">
          <legend class="fieldset-legend">Plateformes</legend>
          <div class="flex flex-wrap gap-4">
            <label class="label">
              <input type="checkbox" name="platform_ids[]" value="1" class="checkbox checkbox-primary" />
              Nom de la plateforme
            </label>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <label class="label">
            <input type="checkbox" name="featured" value="1" class="toggle toggle-primary" />
            À la une
          </label>
        </fieldset>

        <div class="card-actions justify-end mt-2">
          <a href="#" class="btn btn-ghost">Annuler</a>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</section>
```

</details>

3. Complétez le HTML collé avec le code Laravel :
   1. `action="#"` du `<form>` devient `action="{{ route('games.store') }}"`
   2. Le `href="#"` du bouton « Annuler » pointe vers l'accueil : `{{ route('home') }}`
   3. L'unique `<option>` de `category_id` est remplacée par une boucle `@foreach ($categories as $category)` … `@endforeach` : `value` = `{{ $category->id }}`, texte = `{{ $category->name }}`
   4. Le seul `<label>` de `platform_ids[]` est remplacé par une boucle `@foreach ($platforms as $platform)` sur le même principe

> 💡 **`platform_ids[]`** : les crochets disent à PHP de regrouper toutes les cases cochées dans **un tableau**. Cochez PC et PS5, le serveur reçoit `platform_ids = [1, 2]`.

#### A1.4 · Enregistrer le jeu (`store()`)

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez l'**import** de la classe `Request` en haut du fichier (s'il n'y est pas déjà depuis la S4) :

   ```php
   use Illuminate\Http\Request;
   ```

2. Écrivez la méthode `store()` avec cette signature : elle reçoit la requête HTTP en paramètre.

   ```php
   public function store(Request $request)
   {
       // 3. et 4. ci-dessous
   }
   ```

   > 💡 **Injection de dépendances** : vous ne créez pas l'objet `$request` vous-même (pas de `new Request()`). Vous **déclarez** le paramètre avec son **type** `Request`, et Laravel, en lisant ce type, crée l'objet rempli avec les données du formulaire et vous le passe. C'est le **conteneur de services** de la S1 qui fait ce travail.

3. Dans `store()`, créez le jeu par **assignation de masse** (S3) avec seulement les colonnes de `games` :

   ```php
   $game = Game::create($request->only([
       'title', 'synopsis', 'release_year', 'rating',
       'playtime_hours', 'cover_url', 'status', 'category_id', 'featured',
   ]));
   ```

   > 💡 **`$request->only([...])`** renvoie un tableau qui ne contient **que** les clés listées. `platform_ids` n'y est pas : ce n'est pas une colonne de `games`, mais une **table pivot**.

   > ⚠️ `MassAssignmentException` ? Une colonne manque dans le `$fillable` de `app/Models/Game.php` (S3) : ajoutez-la.

4. Rattachez les plateformes cochées, puis redirigez vers la fiche avec un message :

   ```php
   $game->platforms()->sync($request->input('platform_ids', []));

   return redirect()->route('games.show', $game)->with('success', 'Jeu créé !');
   ```

   > 💡 **`sync($ids)`** remplit la **table pivot** `game_platform` : il ajoute les ids absents et retire ceux qui ne sont plus dans la liste. `input('platform_ids', [])` renvoie un tableau vide si aucune case n'est cochée, car une case décochée n'est pas envoyée du tout.

   > 💡 **Post/Redirect/Get** : après un `POST`, on redirige toujours vers une page en `GET`. Un F5 sur la fiche ne renvoie pas le formulaire, et le jeu n'est pas créé deux fois.

#### A1.5 · Message flash

📄 `resources/views/layouts/app.blade.php`

Juste au-dessus de `@yield('content')`, collez ces deux alertes DaisyUI :

```html
<div role="alert" class="alert alert-success my-4">
  <span>Texte du message</span>
</div>

<div role="alert" class="alert alert-error my-4">
  <span>Texte du message</span>
</div>
```

Puis complétez avec Blade :

1. Entourez la première alerte de `@if (session('success'))` … `@endif`, et remplacez son texte par `{{ session('success') }}`
2. Faites de même pour la seconde avec `session('error')` (elle servira en Partie B)

> 💡 **Donnée flash** : `->with('success', '…')` écrit le message en session pour **une seule** requête. Il s'affiche sur la page suivante, puis disparaît.

#### A1.6 · Lien « Nouveau jeu »

📄 `resources/views/partials/nav.blade.php`

À côté des liens Accueil / Wishlist, collez le bouton :

```html
<a href="#" class="btn btn-sm btn-primary btn-outline">Nouveau jeu</a>
```

Remplacez `href="#"` par `href="{{ route('games.create') }}"`.

> ✅ **Vérification** : `/games/create` affiche le formulaire, avec les vraies catégories et plateformes. Remplissez-le et envoyez : vous obtenez une erreur **419 Page Expired**. C'est normal et attendu, l'étape suivante l'explique.

### A2 — Le jeton CSRF (Chapitre 2)

#### A2.1 · Le jeton `@csrf`

📄 `resources/views/games/create.blade.php`

Ajoutez la **directive** `@csrf` sur la ligne juste après la balise `<form …>`.

> 💡 **CSRF** : `@csrf` ajoute un champ caché qui contient un **jeton** aléatoire, propre à votre session. Laravel refuse tout `POST` sans ce jeton (erreur 419) : un site piégé ne peut donc pas envoyer le formulaire à votre place.

#### A2.2 · Le champ caché `_token`

Rechargez `/games/create`, ouvrez les DevTools (onglet Éléments) et repérez dans le `<form>` le champ `<input type="hidden" name="_token" value="…">`.

> ✅ **Vérification** : l'envoi crée le jeu, vous arrivez sur `/game/{id}` et l'alerte « Jeu créé ! » s'affiche **une seule fois** (rechargez : elle disparaît).

### A3 — Valider la saisie (Chapitre 3)

#### A3.1 · Valider dans `store()`

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez deux **imports** en haut du fichier :

   ```php
   use Illuminate\Support\Arr;
   use Illuminate\Validation\Rule;
   ```

2. Au début de `store()`, appelez `$request->validate([...])` avec un tableau de **règles de validation** par champ, et rangez le résultat dans `$validated` :

   ```php
   $validated = $request->validate([
       'title' => ['required', 'string', 'max:150'],
       // … une ligne par champ du tableau ci-dessous
   ]);
   ```

   | Champ | Contrainte attendue | Règle(s) nouvelle(s), absentes de la démo |
   |---|---|---|
   | `title` | obligatoire, texte, 150 caractères maximum | |
   | `synopsis` | obligatoire, texte | |
   | `release_year` | obligatoire, entier entre 1970 et 2100 | `between:1970,2100` |
   | `rating` | obligatoire, nombre (décimal accepté) entre 0 et 10 | `numeric` (accepte `8.5`, contrairement à `integer`) |
   | `playtime_hours` | obligatoire, entier ≥ 0 | |
   | `cover_url` | obligatoire, URL valide | `url` |
   | `status` | obligatoire, parmi les trois valeurs du `select` | `Rule::in([...])`, comme `difficulty` dans la démo |
   | `category_id` | obligatoire, doit exister dans `categories` | |
   | `platform_ids` | tableau, facultatif | |
   | `platform_ids.*` | chaque id doit exister dans `platforms` | |
   | `featured` | booléen | |

3. Remplacez la création et le `sync()` de A1.4 pour qu'ils utilisent **uniquement les données validées** :

   ```php
   $game = Game::create(Arr::except($validated, 'platform_ids'));
   $game->platforms()->sync($validated['platform_ids'] ?? []);
   ```

> 💡 **`$validated`** contient uniquement les champs qui ont une règle et qui l'ont passée : il remplace `$request->only(...)`. Si une règle échoue, `validate()` ne renvoie rien : Laravel redirige vers le formulaire et la suite de `store()` n'est jamais exécutée.

> 💡 **`Arr::except($tableau, 'clé')`** renvoie le même tableau **sans** la clé donnée. On retire `platform_ids`, qui n'est pas une colonne de `games`. `?? []` donne un tableau vide si aucune case n'a été cochée.

#### A3.2 · Afficher les erreurs

📄 `resources/views/games/create.blade.php`

Sous **chaque** champ, dans son `<fieldset>`, ajoutez la **directive** `@error('champ')` … `@enderror`, comme dans la slide « Afficher les erreurs dans Blade ». À l'intérieur, utilisez ce paragraphe DaisyUI et placez-y `$message` :

```html
<p class="label text-error">Texte de l'erreur</p>
```

Faites-le pour les dix champs. Pour les plateformes, la clé est `platform_ids.*`.

> 💡 **`platform_ids.*`** : chaque case cochée est validée séparément, et son erreur porte la clé `platform_ids.0`, `platform_ids.1`… Le `.*` de `@error` désigne n'importe laquelle d'entre elles, comme dans la règle.

> 💡 **`@error('champ')`** n'affiche son contenu que si ce champ a échoué, et `$message` contient le texte de l'erreur.

#### A3.3 · Conserver la saisie

📄 `resources/views/games/create.blade.php`

Après une erreur, chaque champ doit réafficher ce que l'utilisateur avait tapé, grâce à `old('champ')`. La forme dépend du contrôle :

1. **`input`** (titre, année, note, durée, URL) : ajoutez l'attribut `value="{{ old('champ') }}"`, en remplaçant `champ` par le `name` du champ

2. **`textarea`** (synopsis) : `{{ old('synopsis') }}` se place **entre les balises**, car un `textarea` n'a pas d'attribut `value`

3. **`select` du statut** : la **directive** `@selected(condition)` sur **chaque** `<option>`, comme `difficulty` dans la démo. La condition compare `old('status')` à la `value` de l'option

4. **`select` des catégories** : même chose dans la boucle, en convertissant `old()` en entier

   ```blade
   <option value="{{ $category->id }}" @selected((int) old('category_id') === $category->id)>
   ```

5. **Cases des plateformes** : la **directive** `@checked(condition)`, avec ce code exact

   ```blade
   @checked(in_array($platform->id, old('platform_ids', [])))
   ```

> ⚠️ **`(int)`** : `old()` renvoie toujours du **texte** (`"3"`), alors que `$category->id` est un **entier** (`3`). Avec `===`, `"3" === 3` est faux : sans `(int)`, la catégorie ne serait jamais resélectionnée.

> 💡 **`in_array($valeur, $tableau)`** est une fonction PHP qui renvoie `true` si la valeur est dans le tableau. `old('platform_ids', [])` renvoie les ids cochés lors de la tentative ratée, ou un tableau vide au premier affichage. La case est donc cochée si son id faisait partie de l'envoi précédent.

#### A3.4 · Valeur par défaut de `featured`

📄 `resources/views/games/create.blade.php`

1. Juste **avant** la case `featured`, collez ce champ caché :

   ```html
   <input type="hidden" name="featured" value="0" />
   ```

2. Sur la case elle-même, ajoutez `@checked(old('featured'))`

> 💡 **Pourquoi un champ caché ?** Une case décochée n'est **pas envoyée du tout** : sans ce champ, `featured` serait absent de la requête et, à l'édition, un jeu ne pourrait jamais repasser à « pas à la une ». Quand la case est cochée, sa valeur `1` arrive après le `0` et le remplace : c'est la dernière valeur qui gagne.

> ✅ **Vérification** :
>
> - un titre vide ramène au formulaire avec un message sous le champ et les autres champs conservés (catégorie et plateformes comprises)
> - une catégorie inexistante (modifiez le `value` d'une option dans les DevTools) est refusée
> - un jeu valide est créé

> ✅ **Point de contrôle 1**
>
> - [ ] `/games/create` s'affiche, l'envoi valide crée un jeu et redirige vers sa fiche
> - [ ] Sans `@csrf` vous obtenez un 419, avec il n'y en a plus
> - [ ] Chaque règle refuse bien une valeur invalide, et la saisie est conservée
> - [ ] Commit : « feat: création validée d'un jeu »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s5-ch1-formulaire`, `s5-ch2-csrf` et `s5-ch3-validation` (dépôt `CampusQuest`), puis **refaites** les étapes A1 à A3 sur WishFlix.

### A4 — Éditer et supprimer, routes à la main (Chapitre 4)

#### A4.1 · Routes d'édition et de suppression

📄 `routes/web.php`

Ajoutez à la main, une par une, trois **routes nommées** vers `GameController` :

| Verbe | URI | Action | Nom |
|---|---|---|---|
| `GET` | `/games/{id}/edit` | `edit` | `games.edit` |
| `PUT` | `/games/{id}` | `update` | `games.update` |
| `DELETE` | `/games/{id}` | `destroy` | `games.destroy` |

> 💡 Les trois routes partagent presque la même URI : c'est le **verbe** qui choisit l'action. `Route::put(...)` et `Route::delete(...)` s'écrivent comme `Route::get(...)`.

#### A4.2 · La méthode `edit(int $id)`

📄 `app/Http/Controllers/GameController.php`

1. Écrivez la méthode avec cette signature : `public function edit(int $id)`
2. Chargez le jeu : `$game = Game::findOrFail($id);`
3. Renvoyez la vue `games.edit` avec trois variables : `game`, `categories` et `platforms`

> 💡 **`{id}`** dans l'URI arrive dans le paramètre `$id` parce que les deux noms correspondent. `findOrFail()` renvoie une 404 si l'id n'existe pas.

#### A4.3 · La vue `games/edit.blade.php`

📄 `resources/views/games/edit.blade.php`

**Dupliquez** `create.blade.php` (ne retapez rien), puis adaptez :

1. Le titre de la page et le `<h1>` deviennent « Modifier le jeu »
2. L'attribut `action` du formulaire :

   ```blade
   action="{{ route('games.update', $game->id) }}"
   ```

3. Ajoutez la **directive** `@method('PUT')` sur la ligne après `@csrf`
4. Chaque `old()` reçoit un **second argument**, la valeur actuelle du jeu, utilisée tant qu'il n'y a pas eu d'erreur :

   ```blade
   value="{{ old('title', $game->title) }}"
   ```

   Faites-le pour chaque champ, y compris les `select` (`old('status', $game->status)`, `old('category_id', $game->category_id)`) et la case `featured` (`old('featured', $game->featured)`).

5. Pour les cases des plateformes, remplacez la condition de `@checked` par ce code exact :

   ```blade
   @checked(in_array($platform->id, old('platform_ids', $game->platforms->pluck('id')->all())))
   ```

> 💡 **Method spoofing** : un formulaire HTML ne sait envoyer que `GET` et `POST`. `@method('PUT')` ajoute un champ caché `_method=PUT`, et Laravel traite alors le `POST` comme un `PUT`. Le `method` du `<form>` reste donc `POST`.

> 💡 **`pluck('id')`** : `$game->platforms` est une **Collection** d'objets `Platform` (S3). `pluck('id')` en extrait uniquement la colonne `id` et renvoie une nouvelle Collection, par exemple `[1, 3]`. `->all()` la convertit en simple tableau PHP, ce qu'attend `in_array()`. Résultat : au premier affichage, les plateformes actuelles du jeu sont cochées.

#### A4.4 · La méthode `update(Request $request, int $id)`

📄 `app/Http/Controllers/GameController.php`

1. Écrivez la méthode avec cette signature, qui reçoit **à la fois** la requête (**injectée** par Laravel, comme dans `store()`) et l'id de l'URI :

   ```php
   public function update(Request $request, int $id)
   ```

2. Chargez le jeu avec `findOrFail($id)`
3. Validez avec les **mêmes règles** que `store()` (recopiez-les : le chapitre 6 supprimera cette copie)
4. Mettez à jour le jeu : `$game->update(Arr::except($validated, 'platform_ids'));`
5. Synchronisez les plateformes avec `sync()`, comme dans `store()`
6. Redirigez vers la fiche avec le message « Jeu mis à jour ! »

#### A4.5 · La méthode `destroy(int $id)`

📄 `app/Http/Controllers/GameController.php`

1. Chargez le jeu avec `findOrFail($id)`
2. Détachez ses plateformes : `$game->platforms()->detach();`
3. Supprimez le jeu : `$game->delete();`
4. Redirigez vers l'accueil (`route('home')`) avec le message « Jeu supprimé ! »

> 💡 **`detach()`** vide les lignes du jeu dans la **table pivot**. Sans lui, la **clé étrangère** de `game_platform` refuse la suppression d'un jeu qui a des plateformes : erreur 500.

#### A4.6 · Modifier et supprimer depuis la fiche

📄 `resources/views/game-detail.blade.php`

1. Sous le titre du jeu, collez ces deux boutons DaisyUI :

   ```html
   <div class="flex gap-2 my-4">
     <a href="#" class="btn btn-sm btn-outline">Modifier</a>

     <form method="POST" action="#">
       <button type="submit" class="btn btn-sm btn-error">Supprimer</button>
     </form>
   </div>
   ```

2. Complétez avec le code Laravel :
   1. Le `href` du lien : `{{ route('games.edit', $game->id) }}`
   2. L'`action` du formulaire : `{{ route('games.destroy', $game->id) }}`
   3. Dans le `<form>`, avant le bouton : `@csrf` puis `@method('DELETE')`

> ⚠️ **Supprimer = un formulaire, jamais un lien** : un lien fait un `GET`, qui ne peut pas porter le **jeton CSRF** et peut être déclenché par un simple préchargement du navigateur.

> ✅ **Vérification** :
>
> - modifier un jeu change bien sa fiche, et le formulaire d'édition s'ouvre pré-rempli (plateformes cochées comprises)
> - un titre invalide ramène au formulaire d'édition avec ses erreurs
> - supprimer un jeu qui a des plateformes fonctionne (retirez le `detach()` pour voir l'erreur 500, puis remettez-le)

### A5 — `Route::resource` et route model binding (Chapitre 5)

C'est un **refactor** : les pages ne changent pas, seul le code devient plus court.

#### A5.1 · `Route::resource`

📄 `routes/web.php`

Supprimez vos cinq routes `games.create`, `games.store`, `games.edit`, `games.update` et `games.destroy`, et remplacez-les par une seule ligne :

```php
Route::resource('games', GameController::class)->except(['index', 'show']);
```

> 💡 **Contrôleur ressource** : `Route::resource` déclare d'un coup les sept routes CRUD conventionnelles, avec leurs noms (`games.create`, `games.store`…). `->except([...])` retire celles qu'on ne veut pas : `index` (l'accueil joue ce rôle) et `show` (`/game/{id}` existe déjà depuis la S2).

#### A5.2 · Route model binding

📄 `app/Http/Controllers/GameController.php`

1. Remplacez les signatures de `edit`, `update` et `destroy` par celles-ci :

   ```php
   public function edit(Game $game)
   public function update(Request $request, Game $game)
   public function destroy(Game $game)
   ```

2. Dans ces trois méthodes, supprimez la ligne `$game = Game::findOrFail($id);` : `$game` est déjà là

> 💡 **Route model binding** : `Route::resource('games', …)` nomme le paramètre de l'URI `{game}` (au singulier). Comme votre paramètre s'appelle aussi `$game` et a le **type** `Game`, Laravel exécute le `findOrFail` pour vous et vous passe le jeu, ou renvoie une 404.

> ⚠️ Le nom doit correspondre **exactement** : avec `edit(Game $jeu)`, Laravel ne fait pas le lien avec `{game}` et vous passe un `Game` vide, sans erreur.

#### A5.3 · `route()` avec le modèle

📄 `resources/views/games/edit.blade.php` et `resources/views/game-detail.blade.php`

Dans les appels `route()` de `games.edit`, `games.update` et `games.destroy`, passez le modèle au lieu de son id : `route('games.edit', $game)`.

> 💡 Laravel extrait lui-même l'id du modèle pour construire l'URL.

> ✅ **Vérification** : `./vendor/bin/sail artisan route:list --name=games` montre vos routes avec `{game}`. Création, édition et suppression marchent toujours.

> ✅ **Point de contrôle 2**
>
> - [ ] Plus aucun `findOrFail` dans `edit`, `update` et `destroy`
> - [ ] `route:list` montre `games.create`, `games.store`, `games.edit`, `games.update`, `games.destroy`
> - [ ] Les trois actions (créer, modifier, supprimer) fonctionnent encore
> - [ ] Commit : « refactor: Route::resource et route model binding »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s5-ch4-edition` et `s5-ch5-resource` (dépôt `CampusQuest`), puis **refaites** les étapes A4 et A5 sur WishFlix.

### A6 — Form Request (Chapitre 6)

#### A6.1 · Générer les Form Requests

Générez les deux classes avec Artisan :

```bash
./vendor/bin/sail artisan make:request StoreGameRequest
./vendor/bin/sail artisan make:request UpdateGameRequest
```

> ✅ **Vérification** : `app/Http/Requests/StoreGameRequest.php` et `UpdateGameRequest.php` existent.

#### A6.2 · `authorize()` et `rules()`

📄 `app/Http/Requests/StoreGameRequest.php` et `app/Http/Requests/UpdateGameRequest.php`

Dans chacune des deux classes :

1. `authorize()` renvoie `true` au lieu de `false`
2. `rules()` renvoie le tableau de règles, **déplacé** tel quel depuis le contrôleur (coupez-le de `validate([...])`, collez-le après `return`)
3. Ajoutez l'**import** `use Illuminate\Validation\Rule;` en haut du fichier, pour la règle du statut

> 💡 **Form Request** : une classe dédiée qui centralise les règles d'un formulaire. `authorize()` dit si l'utilisateur a le droit d'envoyer ce formulaire : avec `false`, Laravel répond 403. On renvoie `true` pour l'instant ; en S6, on y réservera le back-office aux administrateurs.

#### A6.3 · Brancher les Form Requests

📄 `app/Http/Controllers/GameController.php`

1. Ajoutez les deux **imports** en haut du fichier :

   ```php
   use App\Http\Requests\StoreGameRequest;
   use App\Http\Requests\UpdateGameRequest;
   ```

2. Changez le **type** du paramètre `$request` dans les signatures :

   ```php
   public function store(StoreGameRequest $request)
   public function update(UpdateGameRequest $request, Game $game)
   ```

3. Dans les deux méthodes, remplacez tout l'appel `$request->validate([...])` par :

   ```php
   $validated = $request->validated();
   ```

> 💡 **Ce qui se passe** : c'est encore de l'**injection de dépendances**. En voyant le type `StoreGameRequest`, Laravel crée l'objet **et lance la validation avant même d'entrer dans `store()`**. Si une règle échoue, la redirection vers le formulaire a lieu sans que votre code s'exécute. `validated()` renvoie seulement les données validées.

> ✅ **Vérification** : le comportement est identique à celui du point de contrôle 2, mais `store()` et `update()` ne contiennent plus de `validate()`.

> ✅ **Point de contrôle 3 (fin de la Partie A, requis pour la S6)**
>
> - [ ] `app/Http/Requests/StoreGameRequest.php` et `UpdateGameRequest.php` existent
> - [ ] `store()` et `update()` utilisent `$request->validated()`
> - [ ] Erreurs et `old()` fonctionnent comme avant
> - [ ] Commit : « refactor: Form Requests pour les jeux »
>
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s5-ch6-form-request` (dépôt `CampusQuest`), puis **refaites** l'étape A6 sur WishFlix.

> Les services forment une **annexe** : rien à reproduire en séance. `GameService` est en Bonus.

---

## Partie B — Attendu (à la maison, ≈ 1h15)

Même démarche que la Partie A, sur de nouvelles ressources. Chaque US réutilise `Route::resource`, le **route model binding** et les **Form Requests**. Les vues sont fournies plus bas (HTML DaisyUI) : votre travail porte sur les contrôleurs, les Form Requests et le code Blade.

### US1 — CRUD des catégories

**En tant que** administrateur, **je veux** gérer les catégories de jeux depuis le navigateur, **afin de** ne plus passer par les seeders.

Critères d'acceptation :

- `Route::resource('categories', CategoryController::class)->except(['show'])`
- Une liste des catégories (`index`) avec, sur chaque ligne, le lien « Modifier » et le formulaire « Supprimer »
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

### Vues fournies

Les deux US ont les mêmes écrans : une liste et un formulaire à un champ `name`. Les blocs ci-dessous sont écrits pour les catégories ; pour les plateformes, remplacez `categories` / `$category` par `platforms` / `$platform` et les libellés.

Comme en Partie A, le HTML est fourni et vous écrivez le code Laravel : `@extends` / `@section`, boucles, `route()`, `@csrf`, `@method`, `old()`, `@error`.

<details>
<summary>📄 <code>resources/views/categories/index.blade.php</code> — la liste</summary>

```html
<section class="max-w-3xl mx-auto py-6">
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-2xl font-bold">Catégories</h1>
    <a href="#" class="btn btn-primary btn-sm">Nouvelle catégorie</a>
  </div>

  <div class="overflow-x-auto rounded-box border border-base-300 bg-base-100">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Nom</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nom de la catégorie</td>
          <td>
            <div class="flex justify-end gap-2">
              <a href="#" class="btn btn-xs btn-outline">Modifier</a>
              <form method="POST" action="#">
                <button type="submit" class="btn btn-xs btn-error">Supprimer</button>
              </form>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

À compléter :

1. Le `href` de « Nouvelle catégorie » pointe vers `categories.create`
2. Le `<tr>` du `<tbody>` est répété avec `@forelse ($categories as $category)` ; le `@empty` affiche une ligne `<tr><td colspan="2" class="text-center opacity-60">Aucune catégorie</td></tr>`
3. « Modifier » pointe vers `categories.edit`, le formulaire vers `categories.destroy`, avec `@csrf` et `@method('DELETE')`

</details>

<details>
<summary>📄 <code>resources/views/categories/create.blade.php</code> et <code>edit.blade.php</code> — le formulaire</summary>

```html
<section class="max-w-md mx-auto py-6">
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h1 class="card-title text-2xl">Nouvelle catégorie</h1>

      <form method="POST" action="#" class="grid gap-3">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Nom</legend>
          <input type="text" name="name" class="input w-full" maxlength="50" />
        </fieldset>

        <div class="card-actions justify-end mt-2">
          <a href="#" class="btn btn-ghost">Annuler</a>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</section>
```

À compléter dans `create.blade.php` :

1. `action` vers `categories.store`, `@csrf` dans le formulaire
2. « Annuler » vers `categories.index`
3. `value="{{ old('name') }}"` et le bloc `@error('name')` sous le champ (même modèle qu'en A3.2)

Pour `edit.blade.php`, dupliquez puis adaptez comme en A4.3 : titre « Modifier la catégorie », `action` vers `categories.update`, `@method('PUT')`, `old('name', $category->name)`.

</details>

### Indices de la Partie B

<details>
<summary>Niveau 1 — Où regarder</summary>

- 419 → un `@csrf` manque dans un formulaire
- La suppression renvoie une erreur 500 → la **table pivot** référence encore la ligne (**clé étrangère**)
- Le formulaire d'édition ne se pré-remplit pas → `old('name', $category->name)`
- `$category` est vide dans `edit()` → le nom du paramètre `{category}` doit correspondre à la variable `$category` (**route model binding**)

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Générer le contrôleur avec ses sept méthodes vides : `./vendor/bin/sail artisan make:controller CategoryController --resource --model=Category`
- Création : `'name' => ['required', 'string', 'max:50', 'unique:categories,name']`
- Édition, dans `UpdateCategoryRequest` : `Rule::unique('categories', 'name')->ignore($this->category)`, avec l'**import** `use Illuminate\Validation\Rule;`
- Savoir si la catégorie a des jeux : `$category->games()->exists()`
- Retour avec erreur : `redirect()->route('categories.index')->with('error', '…')`

> 💡 **`->ignore($this->category)`** : dans une Form Request, `$this->category` est la catégorie de l'URI `{category}`, déjà chargée par le **route model binding**. La règle `unique` l'exclut de la vérification : garder son propre nom n'est pas un doublon.

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

Sortez la logique métier du contrôleur dans un **service**.

1. Créez à la main `app/Services/GameService.php` : une classe PHP simple `GameService`, dans le `namespace App\Services;`
2. Écrivez deux méthodes qui enregistrent le jeu, synchronisent les plateformes et appliquent la règle « à la une » :

   ```php
   public function create(array $data): Game
   public function update(Game $game, array $data): Game
   ```

3. Dans `GameController`, ajoutez l'**import** `use App\Services\GameService;`, puis recevez le service par **injection de dépendances** dans le constructeur :

   ```php
   public function __construct(private GameService $games) {}
   ```

4. Dans `store()` et `update()`, appelez `$this->games->create($request->validated())` / `$this->games->update($game, $request->validated())`

> 💡 **Injection dans le constructeur** : comme pour `Request` dans une méthode, vous **déclarez** le paramètre avec son **type**, et le **conteneur de services** crée le `GameService` et le passe au contrôleur : aucun `new`. `private` devant le paramètre est la **promotion de propriété** : PHP crée la propriété `$this->games` et l'affecte en une ligne.

> ✅ **Vérification** : `store()` et `update()` ne contiennent plus que l'appel au service et la redirection.

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
