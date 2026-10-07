# Exercice 02 — Routing, contrôleurs et Blade

## Objectif

Transformer les **maquettes HTML statiques** de WishFlix en **pages Laravel dynamiques** : un layout Blade commun, une page d'accueil qui liste les jeux depuis un tableau PHP, et une fiche jeu `/game/{id}` avec gestion du 404.

**Durée estimée** : 4h (Partie A : 2h en séance · Partie B : ~2h chez vous · Bonus : au choix)

> **Déroulé** — En séance (2h) : Partie A · Chez vous (~2h) : Partie B · Bonus : au choix · ⚠️ **Requis pour la séance 3** : la Partie A terminée (layout, accueil, fiche jeu) — en S3 le tableau PHP sera remplacé par la base de données.

**Référence officielle** :

- [Routing](https://laravel.com/framework/docs/12.x/routing)
- [Controllers](https://laravel.com/framework/docs/12.x/controllers)
- [Blade Templates](https://laravel.com/framework/docs/12.x/blade)
- [Vite](https://laravel.com/framework/docs/12.x/vite)

---

## Prérequis

- Le projet `wishflix` de la séance 1 qui démarre (`./vendor/bin/sail up -d`, page Laravel sur [http://localhost](http://localhost))
- Les **maquettes statiques** fournies : `home.html`, `game-detail.html`, `wishlist.html`, `login.html`, `404.html`, ainsi que `app.css` et une CSS par page (`home.css`, `game-detail.css`, `wishlist.css`, `login.css`, `404.css`)
- Chaque maquette partage la même coquille : une `<header class="navbar wishflix-shell__navbar">` (logo WishFlix, liens Accueil / Wishlist avec badge, bloc Invité / Se connecter) et un `<footer class="wishflix-footer">` — c'est elle qui deviendra votre layout

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

---

## Partie A — En séance (atelier WishFlix)

### A1 — CSS et Vite

1. Copiez `app.css` dans `resources/css/wishflix.css`, puis `home.css` et `game-detail.css` dans `resources/css/` (gardez leurs noms).
2. Dans `vite.config.js`, ajoutez ces fichiers au tableau `input` du plugin `laravel(...)` — chaque fichier CSS/JS chargé par `@vite` doit y figurer.
3. Gardez pour l'instant dans le `<head>` les liens **CDN DaisyUI et Tailwind** présents dans les maquettes (la migration vers Tailwind via Vite est un bonus).
4. Lancez `./vendor/bin/sail npm install` puis `./vendor/bin/sail npm run dev` (ce terminal reste ouvert).
5. Vérifiez que la page Laravel s'affiche toujours — si vous voyez « Vite manifest not found », `npm run dev` ne tourne pas.

### A2 — Le layout `app.blade.php`

1. Créez `resources/views/layouts/app.blade.php` à partir de la **coquille commune** de `home.html` : le `<!doctype>`, le `<head>`, la navbar et le footer — c'est-à-dire tout ce qui est identique d'une page à l'autre.
2. Remplacez les trois endroits qui changent d'une page à l'autre par des `@yield` : le titre de l'onglet, les CSS propres à la page (`@yield('styles')` dans le `<head>`), et le contenu du `<main>` (`@yield('content')`).
3. Mettez `@vite(['resources/css/wishflix.css'])` dans le `<head>` pour charger la CSS commune.
4. (Optionnel mais recommandé) Sortez la navbar dans `resources/views/partials/nav.blade.php` et insérez-la avec `@include('partials.nav')`.

### A3 — `GameController` et la page d'accueil

1. Générez le contrôleur : `./vendor/bin/sail artisan make:controller GameController`
2. Ajoutez-y une propriété tableau d'**au moins 4 jeux**. Chaque jeu suit le modèle de données du programme : `title`, `synopsis`, `release_year`, `rating`, `category`, `platforms`, `cover_url` (utilisez par exemple `https://via.assets.so/game.png?id=N&q=95&w=300&h=450&fit=cover` avec un `id` différent par jeu).
3. Écrivez l'action `index()` qui passe ce tableau à une vue `home` (fichier `resources/views/home.blade.php`).
4. Dans `routes/web.php`, remplacez la route `/` par une route vers `[GameController::class, 'index']`, nommée `home`.
5. Construisez la vue `home.blade.php` à partir du **contenu du `<main>`** de `home.html` (hero + section catalogue), en la faisant `@extends('layouts.app')`. La grille de cartes ne doit contenir **qu'une seule carte** qui boucle sur vos jeux (`@forelse` sur `$games`, en récupérant l'id dans la clé `$id => $game`).

### A4 — La fiche jeu `/game/{id}`

1. Ajoutez l'action `show(int $id)` : si l'id n'existe pas dans le tableau → `abort(404)`, sinon passe le jeu (et son id) à une vue `game-detail` (`resources/views/game-detail.blade.php`).
2. Déclarez la route `GET /game/{id}` : paramètre **contrainte numérique** (`whereNumber`), nommée `games.show`, vers `[GameController::class, 'show']`.
3. La vue `game-detail.blade.php` étend le layout et reprend le `<main>` de `game-detail.html`, rempli avec le jeu reçu. Sa CSS : `@section('styles')` + `@vite('resources/css/game-detail.css')`.
4. Vérifiez : `/game/1` affiche la fiche, `/game/999` → 404 par `abort`, `/game/abc` → 404 par la contrainte.

### A5 — Des liens générés, pas écrits en dur

1. Dans la boucle de l'accueil, le bouton « Details » de chaque carte pointe vers `route('games.show', $id)`.
2. Dans la navbar, les liens « Accueil », « Wishlist » et « Se connecter » utilisent les routes nommées (`home`, et plus tard `wishlist` / `login` de la partie B — en attendant, un `#` ou la route quand elle existe).
3. Le bouton « Voir la fiche » du hero pointe vers la fiche du jeu mis en avant.

### ✅ Checkpoint de fin de séance

- [ ] `sail up -d` et `sail npm run dev` tournent, pas d'erreur « Vite manifest not found »
- [ ] `/` affiche l'accueil WishFlix avec la navbar, le hero et **vos 4+ jeux** en cartes
- [ ] Chaque carte mène à `/game/{id}` via `route('games.show', $id)`
- [ ] `/game/999` et `/game/abc` renvoient une 404
- [ ] La navbar et le footer n'existent que dans le layout (et `partials.nav` si extrait)
- [ ] `sail artisan route:list` montre vos deux routes nommées
- [ ] Commit poussé sur votre dépôt GitHub privé

---

## Partie B — Chez vous (user stories)

### US1 — Page wishlist

**En tant que** joueur, **je veux** consulter ma wishlist sur `/wishlist`, **afin de** retrouver les jeux mis de côté.

Critères d'acceptation :

- Route `GET /wishlist` nommée `wishlist`, qui affiche une vue construite depuis `wishlist.html` et qui **étend le layout**
- La page charge sa propre CSS (`wishlist.css` ajoutée à `input`, `@section('styles')`)
- Le lien « Wishlist » de la navbar pointe vers cette route nommée
- Contenu statique accepté (les vraies données utilisateur arrivent en S6)

### US2 — Page de connexion

**En tant que** joueur, **je veux** voir le formulaire de connexion sur `/login`, **afin de** préparer mon compte.

Critères d'acceptation :

- Route `GET /login` nommée `login`, vue issue de `login.html` qui étend le layout, avec `login.css`
- **GET uniquement** : le formulaire ne fonctionne pas encore (traitement en S6) — c'est normal et attendu
- Le bouton « Se connecter » de la navbar pointe vers cette route

### US3 — Page 404 personnalisée

**En tant que** joueur, **je veux** une page d'erreur aux couleurs WishFlix, **afin de** ne pas tomber sur l'erreur brute de Laravel.

Critères d'acceptation :

- `resources/views/errors/404.blade.php` construit depuis `404.html`, qui étend le layout avec `404.css`
- Vérifiée **deux façons** : `/game/999` (via `abort`) et `/url-inexistante` (aucune route) affichent toutes deux la page WishFlix
- Le lien de retour utilise `route('home')`

---

## Bonus

### Bonus 1 — Tailwind et DaisyUI via Vite

Remplacez les balises CDN (link DaisyUI + script `@tailwindcss/browser`) par une installation Tailwind CSS + DaisyUI **via Vite**, en suivant la [documentation officielle Laravel](https://laravel.com/framework/docs/12.x/vite) et les docs de Tailwind v4 / DaisyUI 5. Critère : le rendu est identique **sans** aucune balise CDN dans le layout.

### Bonus 2 — Lien actif dans la navbar

Mettez en évidence le lien de navbar correspondant à la page courante (la classe `wishflix-shell__link--active` des maquettes). Indice : `request()->routeIs('...')` permet de tester le nom de la route courante — voir la [documentation Requests](https://laravel.com/framework/docs/12.x/requests). La navbar ne doit pas connaître la page : c'est la vue/le layout qui décide.

---

## Indices

<details>
<summary>Niveau 1 — Où regarder</summary>

- « Vite manifest not found » → `./vendor/bin/sail npm run dev` est-il lancé ? Votre fichier CSS est-il dans le `input` de `vite.config.js` ?
- `@extends` qui n'affiche rien → comparez les noms : chaque `@yield('...')` du layout a-t-il un `@section('...')` du **même nom** dans la page ?
- « Route [x] not defined » → `./vendor/bin/sail artisan route:list` : le nom exact de la route est-il bien celui passé à `route()` ?
- Boucle sur tableau associatif → c'est la même syntaxe que dans la démo du cours : la clé devient l'id.

</details>

<details>
<summary>Niveau 2 — Quelle fonction ou directive</summary>

- Vite : `@vite('resources/css/xxx.css')` ne prend qu'**un** fichier ou un tableau ; il doit figurer dans `input`.
- Layout : `@yield('title')` se remplit avec la forme courte `@section('title', 'Texte')` ; `@yield('content')` avec la forme longue `@section('content') ... @endsection`.
- Routes nommées : `->name('games.show')` après la déclaration, puis `route('games.show', $id)` côté vue.
- Boucle : `@forelse ($games as $id => $game)` — `$id` est la clé du tableau (1, 2, 3…), `$game` la valeur.
- 404 : `abort(404)` dans le contrôleur ; `resources/views/errors/404.blade.php` pour le rendu.

</details>

<details>
<summary>Niveau 3 — Squelettes partiels</summary>

Routes (`routes/web.php`) :

```php
Route::get('/', [GameController::class, 'index'])->name('home');
Route::get('/game/{id}', [GameController::class, 'show'])
    ->whereNumber('id')
    ->name('games.show');
```

Contrôleur (méthode `show`) :

```php
public function show(int $id)
{
    abort_unless(isset($this->games[$id]), 404);
    return view('game-detail', ['game' => $this->games[$id], 'id' => $id]);
}
```

Boucle de la vue d'accueil :

```blade
@forelse ($games as $id => $game)
    {{-- UNE carte de jeu, avec {{ $game['title'] }}, {{ $game['rating'] }}... --}}
    {{-- le lien Details : route('games.show', $id) --}}
@empty
    <p>Aucun jeu pour le moment.</p>
@endforelse
```

</details>

---

## Critères de réussite

- [ ] Le projet tourne (`sail up -d` + `sail npm run dev`) sans « Vite manifest not found »
- [ ] `vite.config.js` déclare `wishflix.css` + les CSS de chaque page utilisée
- [ ] `layouts/app.blade.php` contient navbar + footer en un seul endroit, avec `@yield('title')`, `@yield('styles')`, `@yield('content')`
- [ ] `/` (route `home`) affiche au moins 4 jeux issus du tableau PHP, chacun avec titre, catégorie, note, jaquette
- [ ] `/game/{id}` (route `games.show`, `whereNumber`) affiche la fiche du bon jeu ; `/game/999` → 404 ; `/game/abc` → 404
- [ ] Aucun `href="/..."` en dur : tous les liens internes passent par `route()`
- [ ] US1–US3 : `/wishlist`, `/login` et la 404 personnalisée fonctionnent et étendent le layout
- [ ] Commits réguliers poussés sur le dépôt GitHub privé

**Temps estimé** : Partie A ≈ 2h · Partie B ≈ 2h · Bonus ≈ 1h chacun
