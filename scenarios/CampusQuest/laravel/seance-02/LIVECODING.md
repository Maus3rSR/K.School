# Fil à suivre — Séance 2 : Routing, contrôleurs et Blade

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/02-routing-blade/` : une notion à la fois, chaque étape arrive après le problème qu'elle résout.
Le projet Laravel est dans `../base/` ; il est livré **sans le code des étapes** — l'état final de la séance est dans `solution/` (à copier avec `cp -r solution/* ../base/`).

## Étape ↔ chapitre ↔ tag

Les tags sont **déclarés** ici ; ils seront créés dans le dépôt `CampusQuest`. Le tag d'un chapitre = l'état du code **à la fin** du chapitre (palier de rattrapage du point de contrôle).

| Étapes | Chapitre | Contenu | Tag |
|--------|----------|---------|-----|
| 1 → 3 | 1. Routing | closure, paramètre, contrainte, nom, `route:list` | `s2-ch1-routing` |
| 4 → 5 | 2. Blade : la vue | la route renvoie une vue, `{{ }}`, `@forelse` | `s2-ch2-blade-vue` |
| 6 → 9 | 3. Contrôleurs | `QuestController`, routes, `Request`, réponses | `s2-ch3-controleurs` |
| 10 | 4. Blade : les layouts | `@extends`, `@section`, `@yield`, `@include` | `s2-ch4-layouts` |
| 11 → 13 | 5. Vite | `@vite`, serveur Vite, `input`, CSS par page | `s2-ch5-vite` |
| 14 | 6. Pages d'erreur | `abort_unless`, page 404 | `s2-ch6-erreurs` |

## Avant la séance

- [ ] `./vendor/bin/sail up -d` puis `sail npm install` (le `npm run dev` ne se lance qu'à l'étape 12)
- [ ] `http://localhost` affiche la page Laravel
- [ ] Éditeur ouvert sur `routes/web.php`, terminal prêt (`sail artisan ...`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final

## État de départ

Déjà prêt : `resources/css/app.css` (styles globaux, nav) et `resources/css/quests.css` (cartes, badges).
**Pas encore déclaré** dans `vite.config.js` : `quests.css` (étape 13).

---

## 1. Première route closure — Chapitre 1 (`01-routing.md`, « Votre première route »)

`routes/web.php`
```php
Route::get('/quests', function () {
    return 'Liste des quêtes';
});
```
Test : `localhost/quests`. Expliquer verbe / URL / closure.

## 2. Paramètre, contrainte, nom — Chapitre 1 (`01-routing.md`, « Faire évoluer la route », « Générer les URL avec route() »)

```php
Route::get('/quests/{id}', function ($id) {
    return "Quête n°{$id}";
})->whereNumber('id')->name('quests.show');

Route::get('/quests', function () {
    return 'Liste des quêtes';
})->name('quests.index');
```
Test : `/quests/3` OK. Montrer d'abord **sans** `whereNumber` que `/quests/abc` passe, puis l'ajouter → 404.

## 3. `route:list` — Chapitre 1 (`01-routing.md`, « Inspecter toutes les routes »)

```bash
sail artisan route:list
```

**Tag de fin de chapitre : `s2-ch1-routing`**

## 4. La route renvoie une vue — Chapitre 2 (`02-blade-vue.md`, « De la route à la vue »)

Les closures gardent le tableau, qui vit dans `routes/web.php` pour l'instant.
```php
Route::get('/quests', function () {
    $quests = [
        1 => ['title' => 'Salle 404', 'xp' => 50, 'difficulty' => 'easy'],
        2 => ['title' => 'Quiz campus', 'xp' => 30, 'difficulty' => 'easy'],
        3 => ['title' => 'Selfie mascotte', 'xp' => 80, 'difficulty' => 'hard'],
    ];
    return view('quests.index', ['quests' => $quests]);
})->name('quests.index');
```
Vue `resources/views/quests/index.blade.php` (HTML brut, sans layout)
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

## 5. `show` en vue, `{{ }}` et directives — Chapitre 2 (`02-blade-vue.md`, « Les directives »)

La closure de `quests.show` renvoie `view('quests.show', ['quest' => $quests[$id]])` et **recopie le tableau** (à faire remarquer : problème du chapitre 3).
Vue `quests/show.blade.php` : `<h1>{{ $quest['title'] }}</h1>` + `{{ $quest['xp'] }} XP`.
Démo `{{ }}` vs `{!! !!}` : mettre `<script>alert('xp volée')</script>` en titre, comparer, puis remettre.

**Tag de fin de chapitre : `s2-ch2-blade-vue`**

## 6. Contrôleur + tableau — Chapitre 3 (`03-controleurs.md`, « Pourquoi sortir la logique… », « Générer… », « Le contrôleur Campus Quest »)

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

public function index()
{
    return view('quests.index', ['quests' => $this->quests]);
}

public function show(int $id)
{
    return view('quests.show', ['quest' => $this->quests[$id]]);
}
```

## 7. Brancher les routes — Chapitre 3 (`03-controleurs.md`, « Brancher les routes sur le contrôleur »)

`routes/web.php` (remplace les closures)
```php
use App\Http\Controllers\QuestController;

Route::get('/quests', [QuestController::class, 'index'])->name('quests.index');
Route::get('/quests/{id}', [QuestController::class, 'show'])
    ->whereNumber('id')->name('quests.show');
```
`sail artisan route:list` affiche maintenant `QuestController@index`.
Piège à montrer : `/quests/99` → « Undefined array key » (réglé à l'étape 14).

## 8. Filtre `Request` — Chapitre 3 (`03-controleurs.md`, « L'objet Request »)

Ajouter `use Illuminate\Http\Request;`.
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

## 9. (Optionnel) Autres réponses — Chapitre 3 (`03-controleurs.md`, « Choisir sa réponse »)

`return response()->json($this->quests);` puis `redirect()->route('quests.index')`, à retirer ensuite.

**Tag de fin de chapitre : `s2-ch3-controleurs`**

## 10. Layout — Chapitre 4 (`04-blade-layouts.md`, « Le layout : des emplacements à remplir », « La page enfant remplit les emplacements »)

Créer `resources/views/layouts/app.blade.php` — **sans CSS pour l'instant**
```blade
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') — Campus Quest</title>
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
Réécrire `quests/index.blade.php` (et `show`) :
```blade
@extends('layouts.app')

@section('title', 'Quêtes')

@section('content')
    {{-- le contenu de l'étape 4 --}}
@endsection
```
Bug du quiz à provoquer : `@section('contenu')` au lieu de `content` → emplacement vide, aucune erreur.

**Tag de fin de chapitre : `s2-ch4-layouts`**

## 11. Le layout réclame sa CSS — Chapitre 5 (`05-vite.md`, « Le layout réclame sa CSS »)

Dans le `<head>` du layout, ajouter :
```blade
@vite(['resources/css/app.css'])
@yield('styles')
```
Arrêter `npm run dev` (s'il tourne) et recharger : « Vite manifest not found » — erreur volontaire.

## 12. Lancer Vite — Chapitre 5 (`05-vite.md`, « Vite prépare vos assets », « Lancer le serveur Vite »)

```bash
sail npm run dev
```
Recharger : la page s'affiche avec `app.css`.

## 13. CSS par page — Chapitre 5 (`05-vite.md`, « Une CSS par page »)

1. `vite.config.js` : ajouter `'resources/css/quests.css'` dans `input`.
2. Dans les pages quêtes :
```blade
@section('styles')
    @vite('resources/css/quests.css')
@endsection
```
Classes de `quests.css` : `quest-list`, `quest-card`, `xp`, `badge badge--easy|hard`, `filters`. Voir `solution/resources/views/quests/index.blade.php`.
Si `quests.css` n'est pas dans `input` : erreur « Unable to locate file in Vite manifest » → à montrer volontairement.

**Tag de fin de chapitre : `s2-ch5-vite`**

## 14. `abort(404)` + page 404 — Chapitre 6 (`06-erreurs.md`, « La page 404 personnalisée »)

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

**Tag de fin de chapitre : `s2-ch6-erreurs`** (= état de `solution/`)

---

## Rejouer la démo

```bash
git restore ../app   # ou git clean -fd ../base/resources ../base/app ../base/routes (attention : supprime vos essais)
```
Pour sauter à la solution : `cp -r solution/* ../base/` depuis `seance-02/`.
