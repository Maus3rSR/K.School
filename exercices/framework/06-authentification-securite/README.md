# Exercice 06 — Authentification et sécurité

## Objectif

Donner des **comptes** à WishFlix : se connecter avec le compte démo de la maquette, réserver le back-office des jeux à un **administrateur**, permettre à chaque joueur d'ajouter des jeux à **sa** wishlist, puis provoquer et bloquer deux attaques classiques (**XSS** et **injection SQL**).

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (8 chapitres, 4 points de contrôle — la pratique est répartie au fil des chapitres) | En séance | ≈ 1h25 en séance (pratique : 12 + 14 + 7 + 7 + 15 + 15 + 7 + 6 min) |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot » | À la maison | ≈ 1h15 + ≈ 45 min |
| **Bonus** | Inscription, back-office complet protégé, `GamePolicy`, page 403 | Facultatif | ≈ 1h30 |

> Le **socle** est dimensionné pour un étudiant lent : ≈ 2× le temps de démo du même geste. Les durées de la **Partie B** et de la **Partie C** restent indicatives — elles supposent un rythme rapide. ⚠️ **Requis pour la séance 7** : la Partie A terminée (la route `POST /wishlist/{game}` sera appelée sans rechargement de page).

**Référence officielle** :

- [Authentication](https://laravel.com/docs/12.x/authentication)
- [Authorization](https://laravel.com/docs/12.x/authorization)
- [Hashing](https://laravel.com/docs/12.x/hashing)
- [Laravel Breeze (dépôt GitHub)](https://github.com/laravel/breeze)
- [Blade — Displaying Data](https://laravel.com/docs/12.x/blade#displaying-data)

---

## Prérequis

- La **Partie A de l'exercice 05 terminée** : back-office des jeux (`Route::resource('games', …)->except(['index', 'show'])`, `StoreGameRequest`, `UpdateGameRequest`)
- Le layout `resources/views/layouts/app.blade.php` et la navbar `resources/views/partials/nav.blade.php` (S2)
- La page de connexion statique `resources/views/login.blade.php` (S2, Partie B — US2). Pas faite ? Un squelette est fourni à l'étape A2.2
- Le projet `wishflix` qui démarre (`./vendor/bin/sail up -d`), `sail npm run dev` lancé dans un second terminal

---

## Étape 0 — Contrôler l'environnement

```bash
./vendor/bin/sail up -d
git status
./vendor/bin/sail artisan route:list --name=games
```

> ✅ **Vérification** :
>
> - `git status` affiche `nothing to commit, working tree clean` — sinon, **commitez maintenant** : l'étape A1 en a besoin
> - `route:list` montre `games.create`, `games.store`, `games.edit`, `games.update`, `games.destroy` et `games.show`
> - `http://localhost` affiche le catalogue

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant.

### A1 — Le starter kit Breeze (Chapitre 1)

#### A1.1 · Installer Breeze

Installez le starter kit (l'installation lance un `npm install` : comptez une minute) :

```bash
./vendor/bin/sail composer require laravel/breeze --dev
./vendor/bin/sail artisan breeze:install blade
```

#### A1.2 · Repérer ce que Breeze a écrasé

```bash
git status --short
```

Les lignes `M` sont **vos** fichiers, écrasés par Breeze (`routes/web.php`, votre layout, `app.css`, `vite.config.js`…). Les lignes `??` sont les nouveaux fichiers de Breeze.

#### A1.3 · Récupérer vos fichiers

1. Remettez vos fichiers modifiés :

   ```bash
   git restore .
   ```

2. Supprimez les deux fichiers de configuration de l'ancienne version de Tailwind :

   ```bash
   rm tailwind.config.js postcss.config.js
   ```

3. Réinstallez les paquets de votre `package.json` :

   ```bash
   ./vendor/bin/sail npm install
   ```

4. Relancez `./vendor/bin/sail npm run dev` dans le second terminal.

> 💡 Une erreur « Unable to locate file in Vite manifest » ? Breeze a reconstruit `public/build` avec **sa** configuration : relancez `./vendor/bin/sail npm run dev` (ou supprimez le dossier `public/build`).

#### A1.4 · Brancher les routes de Breeze

📄 `routes/web.php`

1. Supprimez votre ancienne route statique `GET /login` (S2) : Breeze fournit la sienne, avec le même nom `login`
2. Ajoutez à la **fin** du fichier :

   ```php
   require __DIR__.'/auth.php';
   ```

> ✅ **Vérification** :
>
> - l'accueil et une fiche jeu s'affichent comme avant
> - `./vendor/bin/sail artisan route:list --path=login` montre `GET login` et `POST login` vers `AuthenticatedSessionController`
> - `/login` s'affiche (encore avec le style de Breeze : c'est l'étape suivante)

### A2 — La connexion (Chapitre 2)

#### A2.1 · Adapter le contrôleur de Breeze

📄 `app/Http/Controllers/Auth/AuthenticatedSessionController.php`

1. Dans `create()`, renvoyez **votre** vue : `view('login')` au lieu de `view('auth.login')`
2. Dans `store()`, redirigez vers l'accueil au lieu de `dashboard` :

   ```php
   return redirect()->intended(route('home', absolute: false));
   ```

#### A2.2 · Faire fonctionner le formulaire

📄 `resources/views/login.blade.php`

Adaptez le `<form>` de la maquette :

| Élément | Attendu |
|---|---|
| `<form>` | `method="POST"`, `action="{{ route('login') }}"`, `@csrf` juste après |
| Champ email | `name="email"`, `value="{{ old('email') }}"`, `@error('email')` dessous |
| Champ mot de passe | `name="password"`, **sans** `old()` |
| Case « Se souvenir de moi » | `name="remember"`, `value="1"` (à ajouter) |

Pour l'erreur, reprenez la classe de la S5 : `<p class="text-error text-sm">…</p>`.

<details>
<summary>Pas de page de connexion depuis la S2 ? Squelette brut de la vue</summary>

Collez-le dans `resources/views/login.blade.php`, puis faites les adaptations du tableau ci-dessus.

```html
@extends('layouts.app')

@section('title', 'Connexion')

@section('content')
<section class="wish-login">
  <div class="card wish-login__card">
    <div class="card-body">
      <h1 class="card-title">Connexion</h1>

      <form class="wish-login__form">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Email</legend>
          <input id="email" type="email" class="input w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Mot de passe</legend>
          <input id="password" type="password" class="input w-full" />
        </fieldset>

        <label class="label">
          <input type="checkbox" class="checkbox" />
          Se souvenir de moi
        </label>

        <button class="btn btn-primary" type="submit">Se connecter</button>
      </form>
    </div>
  </div>
</section>
@endsection
```

</details>

#### A2.3 · Un premier compte

Créez un compte dans Tinker (`./vendor/bin/sail artisan tinker`) :

```php
App\Models\User::create(['name' => 'Alice', 'email' => 'alice@wishflix.com', 'password' => 'secret123'])
```

#### A2.4 · L'utilisateur dans la navbar

📄 `resources/views/partials/nav.blade.php`

Le bloc `navbar-end` de la maquette (« Invité » + « Se connecter ») devient :

1. `@guest` … `@endguest` autour de « Invité » et du bouton « Se connecter », qui pointe vers `route('login')`
2. `@auth` … `@endauth` avec le nom (`Auth::user()->name`) et un formulaire de déconnexion :

   ```blade
   <form method="POST" action="{{ route('logout') }}">
       @csrf
       <button type="submit" class="btn btn-ghost btn-sm">Déconnexion</button>
   </form>
   ```

> ✅ **Vérification** :
>
> - un mauvais mot de passe ramène sur `/login` avec un message sous l'email, l'email est conservé
> - `alice@wishflix.com` / `secret123` vous connecte : vous arrivez sur l'accueil, « Alice » et « Déconnexion » sont dans la barre
> - « Déconnexion » vous ramène sur l'accueil, « Invité » réapparaît

### A3 — Le mot de passe haché (Chapitre 3)

#### A3.1 · Lire l'empreinte

Dans Tinker :

```php
App\Models\User::first()->password
Illuminate\Support\Facades\Hash::check('secret123', App\Models\User::first()->password)
```

#### A3.2 · Le compte démo de la maquette

📄 `database/seeders/UserSeeder.php`

1. Générez le seeder : `./vendor/bin/sail artisan make:seeder UserSeeder`
2. Dans `run()`, créez le compte annoncé par la maquette `login.html` :

   ```php
   User::factory()->create([
       'name' => 'Joueur démo',
       'email' => 'demo@wishflix.com',
       'password' => 'demo1234',
   ]);
   ```

3. Ajoutez `use App\Models\User;` en tête du fichier

#### A3.3 · Appeler le seeder

📄 `database/seeders/DatabaseSeeder.php`

1. Ajoutez `UserSeeder::class` en **tête** de la liste de `$this->call([...])`
2. Si la méthode crée encore un utilisateur `test@example.com` (code d'origine de Laravel), supprimez ces lignes
3. Recréez la base :

   ```bash
   ./vendor/bin/sail artisan migrate:fresh --seed
   ```

> ✅ **Vérification** : `demo@wishflix.com` / `demo1234` vous connecte ; dans Tinker, son mot de passe commence par `$2y$12$`.

> ✅ **Point de contrôle 1**
>
> - [ ] Breeze est installé, vos pages s'affichent comme avant
> - [ ] `/login` est votre page WishFlix ; connexion, erreur et déconnexion fonctionnent
> - [ ] `migrate:fresh --seed` crée le compte démo, avec un mot de passe haché
> - [ ] Commit : « feat: connexion avec Breeze et compte démo »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s6-ch1-breeze`, `s6-ch2-connexion` et `s6-ch3-mot-de-passe` (dépôt `CampusQuest`), puis **refaites** les étapes A1 à A3 sur WishFlix.

### A4 — Le middleware d'authentification (Chapitre 4)

#### A4.1 · Protéger les routes d'écriture

📄 `routes/web.php`

Enveloppez votre déclaration du back-office dans un groupe `auth` :

```php
Route::middleware('auth')->group(function () {
    Route::resource('games', GameController::class)->except(['index', 'show']);
});
```

L'accueil (`home`) et la fiche (`games.show`) restent **en dehors** du groupe.

> ✅ **Vérification** (dans une fenêtre de navigation privée, donc déconnecté) :
>
> - `/games/create` redirige vers `/login`
> - après la connexion, vous arrivez directement sur `/games/create`
> - l'accueil et `/game/1` restent visibles sans connexion

### A5 — L'autorisation (Chapitre 5)

#### A5.1 · La colonne `is_admin`

📄 `database/migrations/xxxx_add_is_admin_to_users_table.php`

1. Générez la migration :

   ```bash
   ./vendor/bin/sail artisan make:migration add_is_admin_to_users_table
   ```

2. Dans `up()` :

   ```php
   Schema::table('users', function (Blueprint $table) {
       $table->boolean('is_admin')->default(false);
   });
   ```

3. Dans `down()` : `$table->dropColumn('is_admin')`, dans un `Schema::table('users', …)`

#### A5.2 · Le cast et le compte admin

1. 📄 `app/Models/User.php` : ajoutez `'is_admin' => 'boolean'` dans `casts()` — **pas** dans `$fillable`
2. 📄 `database/seeders/UserSeeder.php` : ajoutez un second compte, `admin@wishflix.com` / `admin1234`, avec `'is_admin' => true`
3. Recréez la base : `./vendor/bin/sail artisan migrate:fresh --seed`

#### A5.3 · La Gate `admin`

📄 `app/Providers/AppServiceProvider.php`

Dans `boot()` :

```php
Gate::define('admin', function (User $user) {
    return $user->is_admin;
});
```

Imports en tête : `use App\Models\User;` et `use Illuminate\Support\Facades\Gate;`.

#### A5.4 · Réserver le back-office

📄 `routes/web.php`

Le groupe de l'étape A4 reçoit un second middleware :

```php
Route::middleware(['auth', 'can:admin'])->group(function () {
```

#### A5.5 · Masquer les boutons

Entourez de `@can('admin')` … `@endcan` :

1. 📄 `resources/views/partials/nav.blade.php` (ou votre layout) : le lien « Nouveau jeu »
2. 📄 `resources/views/game-detail.blade.php` : le lien « Modifier » et le formulaire « Supprimer »

#### A5.6 · Vérifier dans les Form Requests

📄 `app/Http/Requests/StoreGameRequest.php` et `app/Http/Requests/UpdateGameRequest.php`

`authorize()` ne renvoie plus `true` :

```php
return $this->user()->can('admin');
```

> ✅ **Vérification** :
>
> - connecté en `demo@wishflix.com` : `/games/create` → **403**, aucun bouton « Nouveau jeu », « Modifier » ni « Supprimer »
> - connecté en `admin@wishflix.com` : création, édition et suppression fonctionnent
> - déconnecté : `/games/create` → redirection vers `/login` (et non 403)

> ✅ **Point de contrôle 2**
>
> - [ ] Invité → 302 vers `/login`, joueur → 403, admin → back-office
> - [ ] `is_admin` n'est pas dans `$fillable`
> - [ ] Les Form Requests vérifient la Gate `admin`
> - [ ] Commit : « feat: back-office réservé aux administrateurs »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s6-ch4-middleware` et `s6-ch5-autorisation` (dépôt `CampusQuest`), puis **refaites** les étapes A4 et A5 sur WishFlix.

### A6 — Les données de l'utilisateur connecté (Chapitre 6)

#### A6.1 · La table pivot `game_user`

📄 `database/migrations/xxxx_create_game_user_table.php`

1. Générez la migration : `./vendor/bin/sail artisan make:migration create_game_user_table`
2. Même structure que la pivot des plateformes (S3) : `game_id` et `user_id` en `foreignId(...)->constrained()`, clé primaire composée `$table->primary(['game_id', 'user_id'])`
3. `./vendor/bin/sail artisan migrate`

#### A6.2 · La relation `wishlist()`

📄 `app/Models/User.php`

```php
public function wishlist(): BelongsToMany
{
    return $this->belongsToMany(Game::class);
}
```

Import en tête : `use Illuminate\Database\Eloquent\Relations\BelongsToMany;`.

#### A6.3 · Le contrôleur et la route

1. Générez le contrôleur : `./vendor/bin/sail artisan make:controller WishlistController`
2. 📄 `app/Http/Controllers/WishlistController.php` : une action `store(Request $request, Game $game)` qui ajoute le jeu **sans doublon** à la wishlist de l'utilisateur connecté (`syncWithoutDetaching()`, chapitre 6), puis revient à la page précédente avec un message (`back()->with('success', 'Jeu ajouté à votre wishlist !')`)
3. 📄 `routes/web.php` : dans un groupe `auth` **sans** `can:admin` :

   ```php
   Route::post('/wishlist/{game}', [WishlistController::class, 'store'])->name('wishlist.store');
   ```

Votre route `GET /wishlist` (S2) ne change pas pour l'instant : elle devient dynamique en Partie B.

#### A6.4 · Le bouton sur la fiche jeu

📄 `resources/views/game-detail.blade.php`

Dans un bloc `@auth` :

1. Si `Auth::user()->wishlist->contains($game)` : un badge `<span class="badge badge-success">Dans votre wishlist</span>`
2. Sinon : un formulaire `POST` vers `route('wishlist.store', $game)`, avec `@csrf` et un bouton `class="btn btn-secondary"` « Ajouter à ma wishlist »

> ✅ **Vérification** :
>
> - connecté, « Ajouter à ma wishlist » ramène sur la fiche avec le message, puis le badge remplace le bouton
> - envoyer deux fois le formulaire (bouton « Précédent » du navigateur puis renvoi) ne provoque **pas** d'erreur 500
> - dans Tinker, `App\Models\User::where('email', 'demo@wishflix.com')->first()->wishlist` contient le jeu
> - déconnecté, la fiche n'affiche ni bouton ni badge

> ✅ **Point de contrôle 3**
>
> - [ ] La table `game_user` existe, `User::wishlist()` renvoie les jeux ajoutés
> - [ ] L'ajout utilise l'utilisateur de la session (`$request->user()`), jamais un `user_id` venu du formulaire
> - [ ] Aucun doublon possible
> - [ ] Commit : « feat: ajout d'un jeu à sa wishlist »
>
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s6-ch6-mes-quetes` (dépôt `CampusQuest`), puis **refaites** l'étape A6 sur WishFlix.

### A7 — La faille XSS (Chapitre 7)

#### A7.1 · Créer un jeu piégé

Connecté en admin, créez un jeu dont le **titre** est :

```html
<script>alert('XSS')</script>
```

Ouvrez sa fiche : le titre s'affiche **en texte**, balises comprises.

#### A7.2 · Faire sauter la protection (une minute)

📄 `resources/views/game-detail.blade.php`

1. Remplacez l'affichage du titre `{{ $game->title }}` par `{!! $game->title !!}`
2. Rechargez la fiche : l'alerte s'ouvre
3. **Remettez `{{ $game->title }}`** et rechargez : plus d'alerte

#### A7.3 · Auditer vos vues

Dans VS Code, `Ctrl+Shift+F` puis cherchez `{!!` dans `resources/views`.

> ✅ **Vérification** :
>
> - la fiche du jeu piégé affiche le titre en texte, sans alerte
> - aucun `{!!` de vos vues n'affiche une donnée saisie par un utilisateur
> - supprimez le jeu piégé

### A8 — L'injection SQL (Chapitre 8)

#### A8.1 · Une route volontairement vulnérable

📄 `routes/web.php`

1. Ajoutez en tête : `use Illuminate\Http\Request;` et `use Illuminate\Support\Facades\DB;`
2. Collez à la fin du fichier, **telle quelle** :

   ```php
   Route::get('/debug/recherche', function (Request $request) {
       $q = $request->query('q', '');

       return DB::select("SELECT id, title, rating FROM games WHERE title LIKE '%$q%'");
   });
   ```

#### A8.2 · L'attaquer

Ouvrez successivement dans le navigateur :

1. `http://localhost/debug/recherche?q=Zelda` (un titre de votre catalogue) : quelques jeux
2. `http://localhost/debug/recherche?q=' OR 1=1 -- x` : **tous** les jeux
3. `http://localhost/debug/recherche?q=zzz' UNION SELECT id, email, password FROM users -- x` : les **emails et empreintes** de vos comptes

#### A8.3 · Lier la valeur

Remplacez la ligne du `return` par une requête avec `?` :

```php
return DB::select('SELECT id, title, rating FROM games WHERE title LIKE ?', ["%{$q}%"]);
```

Rejouez l'URL de l'étape A8.2-3 : la réponse est `[]`.

#### A8.4 · Supprimer la route

Supprimez la route `/debug/recherche` et les deux imports ajoutés en A8.1 : elle n'a pas sa place dans le projet.

> ✅ **Vérification** : `/debug/recherche` renvoie une 404.

> ✅ **Point de contrôle 4 (fin de la Partie A, requis pour la S7)**
>
> - [ ] Vous avez vu la fuite de la table `users`, puis la même URL bloquée par `?`
> - [ ] La route de démonstration est supprimée
> - [ ] Aucun `DB::select`, `whereRaw` ou `orderByRaw` de votre projet ne contient de variable dans la chaîne SQL
> - [ ] Commit : « chore: audit XSS et injection SQL »
>
> 🛟 Rattrapage : relisez les slides des chapitres 07 et 08 et le tag Campus Quest `s6-ch7-xss` (le tag `s6-ch8-injection-sql` ne contient aucun code : la route est supprimée), puis **refaites** les étapes A7 et A8 sur WishFlix.

---

## Partie B — Attendu (à la maison, ≈ 1h15)

Même démarche que la Partie A, ailleurs dans WishFlix. Chaque US s'appuie sur la session et la relation `wishlist()`.

### US1 — Ma page wishlist

**En tant que** joueur connecté, **je veux** voir ma vraie wishlist sur `/wishlist` et en retirer un jeu, **afin de** garder une liste à jour.

Critères d'acceptation :

- La route `GET /wishlist` garde son nom `wishlist`, passe par `WishlistController@index` et est réservée aux connectés (un invité est redirigé vers `/login`)
- La page (issue de `wishlist.html`) affiche les jeux de **l'utilisateur connecté**, avec catégorie et plateformes, sans N+1 (Debugbar : le nombre de requêtes ne dépend pas du nombre de jeux)
- Chaque carte a un bouton « Retirer » : formulaire `DELETE /wishlist/{game}` (route `wishlist.destroy`) qui retire le jeu et revient à la page avec un message
- Une wishlist vide affiche un message et un lien vers le catalogue
- Le badge « Wishlist » de la navbar affiche le **nombre réel** de jeux de l'utilisateur ; il est masqué pour un invité

### US2 — Ma wishlist visible dans le catalogue

**En tant que** joueur connecté, **je veux** repérer sur l'accueil les jeux déjà dans ma wishlist et ajouter les autres d'un clic, **afin de** ne pas ouvrir chaque fiche.

Critères d'acceptation :

- Connecté : chaque carte de l'accueil affiche soit un badge « Dans ma wishlist », soit un bouton « Ajouter » (`POST` vers `wishlist.store`)
- Invité : ni badge ni bouton
- Les identifiants de la wishlist sont chargés en **une seule** requête, quel que soit le nombre de cartes (Debugbar)
- Après un ajout depuis l'accueil, vous revenez sur l'accueil avec le message de succès

### Indices de la Partie B

<details>
<summary>Niveau 1 — Où regarder</summary>

- Un invité voit une erreur sur `/wishlist` → la route n'est pas dans le groupe `auth`, `$request->user()` vaut `null`
- La Debugbar compte une requête par jeu → les relations `category` / `platforms` ne sont pas chargées d'avance (S4)
- « Retirer » renvoie un 419 ou un 405 → `@csrf` ou `@method('DELETE')` manquant
- Sur l'accueil, une requête par carte → vous appelez `contains()` sur la relation pour chaque jeu au lieu de charger les identifiants une fois

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Liste : `$request->user()->wishlist()->with(['category', 'platforms'])->get()`
- Retirer : `$request->user()->wishlist()->detach($game->id)`
- Compteur : `Auth::user()->wishlist()->count()` dans la navbar, entouré de `@auth`
- Identifiants en une requête : `$request->user()?->wishlist()->pluck('games.id')->all() ?? []`, puis `in_array($game->id, $wishlistIds)` dans la vue

</details>

<details>
<summary>Niveau 3 — Squelette partiel</summary>

```php
public function index(Request $request)
{
    $games = $request->user()
        ->wishlist()
        ->with(['category', 'platforms'])
        ->get();

    return view('wishlist', ['games' => $games]);
}

public function destroy(Request $request, Game $game)
{
    $request->user()->wishlist()->detach($game->id);

    return back()->with('success', 'Jeu retiré de votre wishlist.');
}
```

</details>

---

## Partie C — Sous le capot (à la maison, ≈ 45 min)

La connexion, le middleware `auth` et les valeurs liées semblent marcher « tout seuls ». Dans cette partie, vous lisez le code du framework (`vendor/laravel/framework/src/Illuminate/`) pour voir où cela se passe.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque question donne un fil à suivre (un fichier, une méthode) : suivez-le et ignorez le reste.

> 🔧 **Outils** : `Ctrl+P` (ouvrir un fichier), `Ctrl+Shift+O` (sauter à une méthode), `Ctrl+F`, `Ctrl+clic` (aller à la définition). ⚠️ `vendor/` est en lecture seule : ne modifiez rien.

**Rendu** : dans `REPONSES.md`, ajoutez une section `## Séance 6 — Sous le capot`. Pour chaque réponse, indiquez le **chemin suivi** (fichier ouvert → méthode).

### C1 — Qui vous renvoie vers `/login` ? (~15 min)

**Point de départ** : la redirection de l'étape A4.

- Ouvrez `Illuminate/Auth/Middleware/Authenticate.php` et lisez `handle()`, `authenticate()` puis `unauthenticated()`.
- Suivez l'exception levée jusqu'à `Illuminate/Foundation/Exceptions/Handler.php`, méthode `unauthenticated()`.

**À noter dans `REPONSES.md`** : quelle exception le middleware lance-t-il ? Où est-elle transformée en redirection ? Pourquoi la route de connexion doit-elle s'appeler `login` ? Que reçoit une requête qui attend du JSON ?

### C2 — Comment `Auth::attempt()` vérifie le mot de passe ? (~15 min)

**Point de départ** : `LoginRequest::authenticate()` (chapitre 2).

- Ouvrez `Illuminate/Auth/SessionGuard.php` et lisez `attempt()`, puis `hasValidCredentials()`.
- Suivez `validateCredentials()` jusqu'à `Illuminate/Auth/EloquentUserProvider.php`.

**À noter dans `REPONSES.md`** : dans quel ordre l'utilisateur est-il cherché puis le mot de passe vérifié ? Quelle méthode compare la saisie à l'empreinte ? Que fait `attempt()` quand les identifiants sont bons ?

### C3 — Où la valeur liée quitte-t-elle le SQL ? (~15 min)

**Point de départ** : l'étape A8.3, `DB::select('… LIKE ?', ["%{$q}%"])`.

- Ouvrez `Illuminate/Database/Connection.php` et lisez la méthode `select()`.
- Repérez l'appel à `prepare()` puis à `bindValues()`, et lisez `bindValues()`.

**À noter dans `REPONSES.md`** : à quel moment le texte SQL est-il envoyé à la base, et à quel moment les valeurs ? Quelle classe PHP (pas Laravel) fait le travail ? Pourquoi une apostrophe dans la valeur ne peut-elle plus fermer la chaîne SQL ?

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : le mot `login` apparaît dans `Handler.php`.
- **C2** : cherchez `hasher` dans `EloquentUserProvider.php`.
- **C3** : dans `select()`, suivez la variable `$statement`.

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `Authenticate::unauthenticated()` lance `AuthenticationException` ; `Handler::unauthenticated()` → `redirect()->guest(... route('login'))` ou une réponse JSON 401.
- **C2** : `SessionGuard::attempt()` → `$this->provider->retrieveByCredentials()` puis `hasValidCredentials()` → `EloquentUserProvider::validateCredentials()` → `$this->hasher->check()` ; en cas de succès, `login()`.
- **C3** : `Connection::select()` → `$this->getPdoForSelect($useReadPdo)->prepare($query)` (le SQL avec ses `?`), puis `$this->bindValues($statement, $this->prepareBindings($bindings))` → `PDOStatement::bindValue()` pour chaque valeur, puis `execute()`.

</details>

---

## Bonus

### Bonus 1 — L'inscription d'un nouvel utilisateur

**En tant que** visiteur, **je veux** créer un compte, **afin de** commencer ma propre wishlist.

- Breeze a déjà généré la route `register` et `RegisteredUserController` : dans `create()`, renvoyez une vue `register.blade.php` construite sur le modèle de votre page de connexion (champs `name`, `email`, `password`, `password_confirmation`)
- Dans `store()`, redirigez vers `route('home')` au lieu de `dashboard`
- Un lien « Créer un compte » apparaît sous le formulaire de connexion (`@guest`)
- Un nouveau compte n'est **jamais** admin, même si quelqu'un ajoute `is_admin=1` au formulaire dans les DevTools

### Bonus 2 — Tout le back-office réservé aux admins

Les CRUD `Category` et `Platform` (S5, Partie B) passent dans le groupe `['auth', 'can:admin']` ; leurs liens sont masqués par `@can('admin')` et leurs Form Requests vérifient la Gate.

### Bonus 3 — `GamePolicy`

Remplacez la Gate `admin` du back-office des jeux par une Policy (`./vendor/bin/sail artisan make:policy GamePolicy --model=Game`) : `create`, `update` et `delete` renvoient `$user->is_admin`. Dans les vues : `@can('update', $game)` ; dans les routes ou les Form Requests : `$this->user()->can('update', $this->route('game'))`.

### Bonus 4 — Une page 403 à l'image de WishFlix

Sur le modèle de la page 404 de la S2, créez `resources/views/errors/403.blade.php` : elle étend le layout et propose un retour au catalogue.

---

## Critères de réussite

- [ ] Étape 0 : l'environnement répond, `git status` est propre avant Breeze
- [ ] Connexion et déconnexion avec le compte démo de la maquette, mot de passe haché en base
- [ ] Back-office des jeux : invité → `/login`, joueur → 403, admin → accès ; boutons masqués pour les non-admins
- [ ] Ajout d'un jeu à la wishlist de l'utilisateur connecté, sans doublon
- [ ] XSS et injection SQL provoquées puis bloquées ; route de démonstration supprimée
- [ ] US1 et US2 : page `/wishlist` dynamique, catalogue qui signale les jeux de la wishlist, sans N+1
- [ ] `REPONSES.md` contient la section « Séance 6 — Sous le capot » avec les réponses de C1 à C3 et le chemin suivi
- [ ] Commits réguliers poussés sur le dépôt GitHub privé
