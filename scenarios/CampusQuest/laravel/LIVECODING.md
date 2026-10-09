# Fil à suivre — Séance 2 : Routing, contrôleurs et Blade

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/02-routing-blade/`.
Le projet est livré **sans le code des étapes** ; la solution complète est dans `../solution/`.

## Avant la séance

- [ ] `./vendor/bin/sail up -d` puis `sail npm install && sail npm run dev` (second terminal)
- [ ] `http://localhost` affiche la page Laravel
- [ ] Éditeur ouvert sur `routes/web.php`, terminal prêt (`sail artisan ...`)
- [ ] Filet de sécurité : `../solution/` contient chaque fichier final

## État de départ

Déjà prêt : `resources/css/app.css` (styles globaux, nav) et `resources/css/quests.css` (cartes, badges).
**Pas encore déclaré** dans `vite.config.js` : `quests.css` (étape h).

---

## a. Première route closure — `01-routing.md` (« Votre première route »)

`routes/web.php`
```php
Route::get('/quests', function () {
    return 'Liste des quêtes';
});
```
Test : `localhost/quests`. Expliquer verbe / URL / closure.

## b. Paramètre, contrainte, nom — `01-routing.md` (« Faire évoluer la route », « Générer les URL avec route() »)

```php
Route::get('/quests/{id}', function ($id) {
    return "Quête n°{$id}";
})->whereNumber('id')->name('quests.show');

Route::get('/quests', function () {
    return 'Liste des quêtes';
})->name('quests.index');
```
Test : `/quests/3` OK. Montrer d'abord **sans** `whereNumber` que `/quests/abc` passe, puis l'ajouter → 404.

## c. `route:list` — `01-routing.md` (« Inspecter toutes les routes »)

```bash
sail artisan route:list
```

## d. Contrôleur + tableau — `02-controleurs.md` (« Générer… », « Le contrôleur Campus Quest »)

```bash
sail artisan make:controller QuestController
```
`app/Http/Controllers/QuestController.php`
```php
private array $quests = [
    1 => ['title' => 'Salle 404', 'xp' => 50, 'difficulty' => 'easy'],
    2 => ['title' => 'Quiz campus', 'xp' => 30, 'difficulty' => 'easy'],
    3 => ['title' => 'Selfie mascotte', 'xp' => 80, 'difficulty' => 'hard'],
];
```
Ajouter `use Illuminate\Http\Request;` au passage (étape f).

## e. `index` / `show`, routes et vues — `02-controleurs.md` + `03-blade-vue.md`

```php
public function index()
{
    return view('quests.index', ['quests' => $this->quests]);
}

public function show(int $id)
{
    return view('quests.show', ['quest' => $this->quests[$id]]);
}
```
`routes/web.php` (remplace les closures)
```php
use App\Http\Controllers\QuestController;

Route::get('/quests', [QuestController::class, 'index'])->name('quests.index');
Route::get('/quests/{id}', [QuestController::class, 'show'])
    ->whereNumber('id')->name('quests.show');
```
Vue `resources/views/quests/index.blade.php` (HTML brut pour l'instant, sans layout)
```blade
<h1>Quêtes disponibles</h1>
@forelse ($quests as $id => $quest)
    <a href="{{ route('quests.show', $id) }}">
        {{ $quest['title'] }} — {{ $quest['xp'] }} XP
    </a>
@empty
    <p>Aucune quête pour le moment.</p>
@endforelse
```
Vue `quests/show.blade.php` : `<h1>{{ $quest['title'] }}</h1>` + `{{ $quest['xp'] }} XP`.
Démo `{{ }}` vs `{!! !!}` : mettre `<script>alert('xp volée')</script>` en titre, comparer, puis remettre.
Piège à montrer : `/quests/99` → « Undefined array key » (réglé à l'étape i).
Optionnel (`02-controleurs.md`, « Choisir sa réponse ») : `return response()->json($this->quests);` puis `redirect()->route('quests.index')`, à retirer ensuite.

## f. Filtre `Request` — `02-controleurs.md` (« L'objet Request »)

```php
public function index(Request $request)
{
    $difficulty = $request->query('difficulty');
    $quests = $difficulty
        ? array_filter($this->quests, fn ($q) => $q['difficulty'] === $difficulty)
        : $this->quests;

    return view('quests.index', ['quests' => $quests]);
}
```
Test : `/quests?difficulty=easy`, puis `?difficulty=nope` (→ `@empty`).

## g. Layout — `04-blade-layouts.md` (« Le layout : des trous à remplir », « La page enfant remplit les trous »)

Créer `resources/views/layouts/app.blade.php`
```blade
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') — Campus Quest</title>
    @vite(['resources/css/app.css'])
    @yield('styles')
</head>
<body>
    @include('partials.nav')
    <main>
        @yield('content')
    </main>
</body>
</html>
```
`partials/nav.blade.php`
```blade
<nav class="nav">
    <a href="/">Campus Quest</a>
    <a href="{{ route('quests.index') }}">Quêtes</a>
</nav>
```
Réécrire `quests/index.blade.php` :
```blade
@extends('layouts.app')

@section('title', 'Quêtes')

@section('content')
    {{-- le contenu de l'étape e --}}
@endsection
```
Bug du quiz à provoquer : `@section('contenu')` au lieu de `content` → trou vide, aucune erreur.

## h. CSS par page avec `@vite` — `05-vite.md` (« Vite compile… », « Une CSS par page »)

1. Montrer l'erreur « Vite manifest not found » en arrêtant `npm run dev`, puis le relancer.
2. `vite.config.js` : ajouter `'resources/css/quests.css'` dans `input`.
3. Dans les pages quêtes :
```blade
@section('styles')
    @vite('resources/css/quests.css')
@endsection
```
Pour un rendu plus joli, utiliser les classes de `quests.css` : `quest-list`, `quest-card`, `xp`, `badge badge--easy|hard`, `filters`. Voir `../solution/resources/views/quests/index.blade.php`.
Si `quests.css` n'est pas dans `input` : erreur « Unable to locate file in Vite manifest » → à montrer volontairement.

## i. `abort(404)` + page 404 — `06-erreurs.md` (« La page 404 personnalisée »)

```php
public function show(int $id)
{
    abort_unless(isset($this->quests[$id]), 404);

    return view('quests.show', ['quest' => $this->quests[$id], 'id' => $id]);
}
```
`resources/views/errors/404.blade.php`
```blade
@extends('layouts.app')

@section('title', 'Introuvable')

@section('content')
    <h1>Cette quête n'existe pas (encore)</h1>
    <a href="{{ route('quests.index') }}">← Retour aux quêtes</a>
@endsection
```
Tester `/quests/999` **et** `/nimportequoi` : même page.

---

## Rejouer la démo

```bash
git restore .   # ou git clean -fd resources app routes (attention : supprime vos essais)
```
Pour sauter à la solution : `cp -r ../solution/* .` depuis le dossier `laravel/`.
