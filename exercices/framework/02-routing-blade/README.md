# Exercice 02 — Routing, contrôleurs et Blade

## Objectif

Transformer les **maquettes HTML statiques** de WishFlix en **pages Laravel dynamiques** : une route, une vue Blade, un contrôleur, un layout commun, des CSS servies par Vite et une page 404, puis deux nouvelles pages (wishlist, connexion).

## Charge

| | Contenu | Estimation indicative |
|---|---|---|
| **Socle** | Étape 0 + Partie A, **en séance** (6 chapitres, 6 points de contrôle) | ≈ 95 min de pratique à un rythme d'élève ; ≈ 40 min au rythme du formateur |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot », **chez vous** | ≈ 1h15 + ≈ 45 min |
| **Bonus** | 3e user story et défis | ≈ 30 à 60 min chacun |

> Ces estimations sont indicatives : un étudiant met souvent 2 à 3 fois plus de temps que la démo. ⚠️ **Requis pour la séance 3** : la Partie A terminée (point de contrôle 6) — en S3 le tableau PHP sera remplacé par la base de données.

**Référence officielle** :

- [Routing](https://laravel.com/framework/docs/12.x/routing)
- [Controllers](https://laravel.com/framework/docs/12.x/controllers)
- [Blade Templates](https://laravel.com/framework/docs/12.x/blade)
- [Vite](https://laravel.com/framework/docs/12.x/vite)

---

## Prérequis

- Le projet `wishflix` de la séance 1 qui démarre (`./vendor/bin/sail up -d`, page Laravel sur [http://localhost](http://localhost))
- L'**archive WishFlix fournie par le formateur** (`wishflix-maquettes.zip`, via Moodle), décompressée dans un dossier de votre choix : elle contient les maquettes (`home.html`, `game-detail.html`, `wishlist.html`, `login.html`, `404.html`, `app.css` et une CSS par page) et le script `copy-css.mjs` utilisé à l'étape A5, ainsi que **Node.js** installé sur votre machine (hors Sail) pour lancer ce script
- Chaque maquette partage la même coquille : une `<header class="navbar wishflix-shell__navbar">` (logo WishFlix, liens Accueil / Wishlist avec badge, bloc Invité / Se connecter) et un `<footer class="wishflix-footer">` — c'est elle qui deviendra votre layout

> 💡 Les consignes gardent la forme longue `./vendor/bin/sail` ; l'alias `sail` configuré en S1 fonctionne aussi.

> 💡 Les maquettes utilisent **Tailwind** et **DaisyUI** (classes `navbar`, `badge`, `btn`, `card`…) chargés par deux balises **CDN** dans le `<head>`. Vous n'avez pas besoin de connaître ces outils : gardez ces deux balises telles quelles et recopiez les classes HTML des maquettes.

---

## Étape 0 — Contrôler l'environnement

- `./vendor/bin/sail up -d`, puis [http://localhost](http://localhost) affiche la page Laravel
- `git status` : l'arbre de travail est propre (commit de S1 fait)
- Dans un terminal : `./vendor/bin/sail npm install` (peut prendre quelques minutes : lancez-le maintenant, il sert à l'étape A5)

✅ Vérification : la page Laravel s'affiche. Sinon, revenez à l'exercice 01.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Les maquettes de départ sont celles de l'archive `wishflix-maquettes` décompressée (prérequis).

### A1 — Une première route (Chapitre 1)

**Étape A1.1** — Ouvrez `routes/web.php` et ajoutez une route `GET /game/{id}` dont la closure renvoie `"Jeu n°{$id}"`.

✅ `/game/3` affiche « Jeu n°3 ».

**Étape A1.2** — Ajoutez la contrainte `->whereNumber('id')`.

✅ `/game/abc` renvoie une 404.

**Étape A1.3** — Nommez la route `games.show` et vérifiez-la :

```bash
./vendor/bin/sail artisan route:list
```

✅ `games.show` apparaît dans la liste.

> ✅ **Point de contrôle 1** — `/game/3` répond, `/game/abc` → 404, `games.show` dans `route:list`.
> 🛟 Rattrapage : tag Campus Quest `s2-ch1-routing` du dépôt `School_Framework_CampusQuest`.

### A2 — De la route à la vue (Chapitre 2)

**Étape A2.1** — Créez `resources/views/home.blade.php` en copiant **tout** `home.html`. Supprimez les deux balises `<link rel="stylesheet">` vers `app.css` et `home.css` (les CSS arrivent à l'étape A5) ; gardez les deux balises CDN.

**Étape A2.2** — Dans `routes/web.php`, faites répondre la route `/` par `view('home', ['games' => $games])`, nommée `home`. Définissez `$games` juste au-dessus : un tableau d'**au moins 4 jeux**, indexé par id (`1 => [...]`).

Chaque jeu suit le modèle de données du programme : `title`, `synopsis`, `release_year`, `rating`, `category`, `platforms`, `cover_url`.

> 💡 Pour `cover_url`, vous pouvez utiliser `https://via.assets.so/game.png?id=N&q=95&w=300&h=450&fit=cover` avec un `id` différent par jeu.

✅ `/` affiche la maquette (sans ses couleurs, c'est normal).

**Étape A2.3** — Dans la grille de cartes de `home.blade.php`, ne gardez **qu'une carte** et faites-la boucler avec `@forelse ($games as $id => $game)` / `@empty`, en affichant les champs avec `{{ }}`.

✅ Une carte par jeu du tableau.

**Étape A2.4** — Le bouton « Details » de la carte pointe vers `route('games.show', $id)`.

✅ Le bouton mène à `/game/{id}`.

> ✅ **Point de contrôle 2** — l'accueil est une vue Blade avec ses 4+ cartes générées par la boucle.
> 🛟 Rattrapage : tag `s2-ch2-blade-vue`.

### A3 — Le contrôleur (Chapitre 3)

**Étape A3.1** — Générez le contrôleur :

```bash
./vendor/bin/sail artisan make:controller GameController
```

**Étape A3.2** — Déplacez votre tableau dans `app/Http/Controllers/GameController.php`, comme propriété `private array $games` (même contenu, même clés).

**Étape A3.3** — Écrivez l'action `index()` qui renvoie `view('home', ['games' => $this->games])`, puis remplacez la closure de la route `/` par `[GameController::class, 'index']` (nom `home` conservé).

✅ L'accueil s'affiche **à l'identique**.

**Étape A3.4** — Créez `resources/views/game-detail.blade.php` en copiant `game-detail.html` (supprimez, comme en A2.1, les `<link>` vers `app.css` et `game-detail.css`), rempli avec la variable `$game`.

**Étape A3.5** — Ajoutez l'action `show(int $id)` qui renvoie `view('game-detail', ['game' => $this->games[$id], 'id' => $id])`.

**Étape A3.6** — Remplacez la closure de `/game/{id}` par `[GameController::class, 'show']` ; gardez `whereNumber` et le nom `games.show` :

```php
Route::get('/game/{id}', [GameController::class, 'show'])
    ->whereNumber('id')
    ->name('games.show');
```

✅ `/game/1` affiche la fiche du jeu n°1. (`/game/999` plante encore : c'est normal, voir A6.)

> ✅ **Point de contrôle 3** — plus de tableau dans `web.php`, `route:list` affiche `GameController@index` et `GameController@show`.
> 🛟 Rattrapage : tag `s2-ch3-controleurs`.

### A4 — Le layout (Chapitre 4)

**Étape A4.1** — Créez `resources/views/layouts/app.blade.php` à partir de la **coquille commune** de `home.blade.php` : `<!doctype>`, `<head>` (balises CDN comprises), navbar et footer. Remplacez le titre par `@yield('title')` et le contenu du `<main>` par `@yield('content')`.

**Étape A4.2** — Dans `home.blade.php`, ne gardez que le contenu du `<main>` et faites-le étendre le layout :

```blade
@extends('layouts.app')

@section('title', 'Accueil')

@section('content')
    {{-- hero + catalogue --}}
@endsection
```

**Étape A4.3** — Faites de même pour `game-detail.blade.php` (titre : le titre du jeu).

**Étape A4.4** — Déplacez la navbar dans `resources/views/partials/nav.blade.php` et insérez-la dans le layout avec `@include('partials.nav')`.

✅ Modifier un libellé de la navbar change les **deux** pages.

> ✅ **Point de contrôle 4** — navbar et footer n'existent qu'une fois ; les deux pages étendent le layout.
> 🛟 Rattrapage : tag `s2-ch4-layouts`.

### A5 — Vite et les CSS (Chapitre 5)

**Étape A5.1** — Lancez Vite dans un second terminal (laissez-le ouvert) :

```bash
./vendor/bin/sail npm run dev
```

**Étape A5.2** — Copiez les CSS des maquettes avec le **script fourni dans l'archive**. Depuis le dossier `wishflix-maquettes` décompressé :

```bash
node copy-css.mjs /chemin/vers/wishflix
```

Le script copie `app.css` et les CSS de page (`home`, `game-detail`, `wishlist`, `login`, `404`) dans `resources/css/` de votre projet. Votre ancien `app.css` est sauvegardé en `app.css.orig`. Utilisez un chemin **absolu** pour éviter les erreurs de dossier.

> 💡 Distribution : le script `copy-css.mjs` fait partie de l'archive WishFlix, à côté des maquettes. Si vous n'avez pas Node.js hors Sail, copiez à la main les six fichiers CSS du dossier `wishflix-maquettes` dans `resources/css/` de votre projet.

✅ `resources/css/` contient `app.css`, `home.css`, `game-detail.css`, `wishlist.css`, `login.css`, `404.css`.

**Étape A5.3** — Ouvrez `vite.config.js` et ajoutez `'resources/css/home.css'` et `'resources/css/game-detail.css'` au tableau `input` (ne modifiez que ce tableau ; laissez `tailwindcss()`).

> ⚠️ **Chaque fichier CSS/JS chargé par `@vite` doit figurer dans `input`.**

**Étape A5.4** — Dans le `<head>` du layout, après le titre, ajoutez :

```blade
@vite(['resources/css/app.css'])
@yield('styles')
```

**Étape A5.5** — Dans `home.blade.php` puis `game-detail.blade.php`, chargez la CSS de la page :

```blade
@section('styles')
    @vite('resources/css/home.css')
@endsection
```

(`game-detail.css` pour la fiche.)

✅ L'accueil et la fiche ont les couleurs WishFlix. Si vous voyez « Vite manifest not found », `sail npm run dev` ne tourne pas.

> ✅ **Point de contrôle 5** — pages stylées, Vite tourne.
> 🛟 Rattrapage : tag `s2-ch5-vite`.

### A6 — La page 404 (Chapitre 6)

**Étape A6.1** — Dans `show()`, avant le `return` :

```php
abort_unless(isset($this->games[$id]), 404);
```

✅ `/game/999` affiche la 404 de Laravel.

**Étape A6.2** — Créez `resources/views/errors/404.blade.php` depuis `404.html` : elle étend le layout, charge `404.css` (ajoutez-la à `input`) et son lien de retour utilise `route('home')`.

**Étape A6.3** — Vérifiez les **deux** cas : `/game/999` (via `abort`) et `/url-inexistante` (aucune route).

> ✅ **Point de contrôle 6 (fin de la Partie A, requis pour la S3)**
>
> - [ ] `sail up -d` et `sail npm run dev` tournent, pas de « Vite manifest not found »
> - [ ] `/` affiche vos 4+ jeux, chaque carte mène à `/game/{id}` via `route('games.show', $id)`
> - [ ] `/game/999` et `/url-inexistante` affichent la 404 WishFlix ; `/game/abc` renvoie aussi une 404 (contrainte)
> - [ ] `sail artisan route:list` montre `home` et `games.show`
> - [ ] Commit poussé sur votre dépôt GitHub privé
>
> 🛟 Rattrapage : tag `s2-ch6-erreurs`.

---

## Partie B — Attendu (chez vous, ≈ 1h15)

### US1 — Page wishlist (≈ 40 min)

**En tant que** joueur, **je veux** consulter ma wishlist sur `/wishlist`, **afin de** retrouver les jeux mis de côté.

Critères d'acceptation :

- Route `GET /wishlist` nommée `wishlist`, qui affiche une vue construite depuis `wishlist.html` et qui **étend le layout**
- La page charge sa propre CSS (`wishlist.css` ajoutée à `input`, `@section('styles')`)
- Le lien « Wishlist » de la navbar pointe vers cette route nommée
- Contenu statique accepté (les vraies données utilisateur arrivent en S6)

### US2 — Page de connexion (≈ 35 min)

**En tant que** joueur, **je veux** voir le formulaire de connexion sur `/login`, **afin de** préparer mon compte.

Critères d'acceptation :

- Route `GET /login` nommée `login`, vue issue de `login.html` qui étend le layout, avec `login.css`
- **GET uniquement** : le formulaire ne fonctionne pas encore (traitement en S6) — c'est normal et attendu
- Le bouton « Se connecter » de la navbar pointe vers cette route

---

## Partie C — Sous le capot (chez vous, ~45 min)

Vous avez écrit `{{ ... }}`, `->whereNumber('id')`, `abort(404)` — et « ça marche ». Mais que se passe-t-il vraiment quand Laravel lit ces lignes ? Dans cette partie, vous allez ouvrir le code source du framework — dans `vendor/laravel/framework/src/Illuminate/` — pour suivre le fil de trois mécanismes que vous venez d'utiliser.

Bonne nouvelle : il n'y a pas de magie, c'est du PHP, et vous savez lire du PHP. Lire du code qu'on n'a pas écrit soi-même, c'est d'ailleurs une bonne part du métier de développeur au quotidien — autant s'y entraîner dès maintenant.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque concept vous donne un fil à suivre — un fichier, une méthode. Suivez ce fil et ignorez le reste du fichier, même s'il fait des milliers de lignes.

> 🔧 **Outils pour naviguer dans le code**
>
> - `Ctrl+P` : ouvrir un fichier par son nom (tapez le début du nom, ex. `Route.php`)
> - `Ctrl+Shift+O` : sauter à une méthode dans le fichier ouvert (tapez son nom, ex. `where`)
> - `Ctrl+F` : chercher un mot dans le fichier ouvert
> - `Ctrl+clic` sur le nom d'une méthode ou d'une classe : aller à sa définition
>
> L'extension **PHP Intelephense** rend ces raccourcis bien plus efficaces dans `vendor/` — installez-la si ce n'est pas déjà fait.
>
> ⚠️ `vendor/` est en **lecture seule** pour vous : ne modifiez jamais ces fichiers — ils seraient écrasés au prochain `composer install`.

**Rendu** : dans `REPONSES.md` (à la racine du projet, créé en S1), ajoutez une section `## Séance 2 — Sous le capot`. Pour chaque réponse, indiquez aussi le **chemin suivi** : le fichier ouvert et la méthode qui vous a donné la réponse (ex. `Illuminate/Routing/Route.php` → méthode `where`).

### C1 — Ce que devient votre `{{ ... }}` (Observer, ~10 min)

**Point de départ** : dans `resources/views/home.blade.php`, le `{{ $game['title'] }}` que vous avez écrit en A2.

Laravel n'exécute pas vos `.blade.php` tels quels : il les **compile** une fois en PHP pur et range le résultat dans `storage/framework/views/`, sous un nom haché illisible. Chaque fichier compilé se termine par un commentaire `<?php /**PATH /chemin/vers/la/vue.blade.php ENDPATH**/ ?>` qui dit de quelle vue il vient.

**Question 1** — Retrouver la vue compilée.

- Ouvrez `storage/framework/views/` et retrouvez le fichier compilé de `home.blade.php` (lisez la toute fin de chaque fichier).

**À noter dans `REPONSES.md`** : ce qu'est devenue votre ligne `{{ $game['title'] }}` — recopiez-la.

**Question 2** — Blade ou PHP ?

- Dans ce même fichier compilé, cherchez votre `@forelse`.

**À noter dans `REPONSES.md`** : ce fichier compilé est-il encore du Blade ou du PHP ? Qu'est devenu votre `@forelse` ? (Constatez que c'est du PHP — inutile de le détailler ligne à ligne.)

**Question 3** — La fonction `e(...)`.

Votre `{{ }}` a été remplacé par un appel à une fonction `e(...)`.

- Ouvrez `Illuminate/Support/helpers.php` (`Ctrl+P`, tapez `Support/helpers.php` pour éviter les homonymes).
- Sautez à la fonction `e` (`Ctrl+Shift+O`).

**À noter dans `REPONSES.md`** : quelle fonction **native de PHP** termine son `return` ?

**Question 4** — Expérience : `{{ }}` contre `{!! !!}`.

- Dans `GameController`, mettez temporairement `<script>alert('XSS')</script>` comme `title` d'un jeu, puis rechargez l'accueil.
- Remplacez ensuite `{{ $game['title'] }}` par `{!! $game['title'] !!}` dans la vue, et rechargez à nouveau.
- **Remettez tout comme avant** à la fin.

> 💡 Une **XSS** (*cross-site scripting*) est une attaque où du JavaScript injecté s'exécute dans le navigateur d'un visiteur.

**À noter dans `REPONSES.md`** : ce que vous voyez dans chaque cas, et la différence entre les deux syntaxes.

**Question 5** — Quand Laravel compile-t-il ?

- Exécutez :

  ```bash
  ./vendor/bin/sail artisan view:clear
  ```

- Regardez le contenu de `storage/framework/views/`.
- Rechargez la page d'accueil, puis regardez le dossier à nouveau.

**À noter dans `REPONSES.md`** : ce que vous observez, et ce que vous en déduisez sur le moment où Laravel compile les vues.

### C2 — Qui répond à `->whereNumber('id')` (Relier, ~15 min)

**Point de départ** : dans `routes/web.php`, le `->whereNumber('id')` écrit en A1.

`whereNumber` s'utilise sur votre route… pourtant vous ne le trouverez pas dans la classe `Route` elle-même : il vient d'un **trait**. Un trait est une « boîte d'outils » de méthodes qu'une classe branche sur elle avec le mot-clé `use` (dans le corps de la classe) — les méthodes du trait deviennent alors des méthodes de la classe.

**Question 6** — Un fichier qui n'est pas une classe.

- Ouvrez `Illuminate/Routing/CreatesRegularExpressionRouteConstraints.php`.
- Trouvez la méthode `whereNumber`.

**À noter dans `REPONSES.md`** : quel mot-clé, à la place de `class`, montre que ce fichier n'est **pas** une classe ? Quelle **expression régulière** (« regex », un motif qui décrit la forme autorisée d'un texte — ici « au moins un chiffre ») est associée à `whereNumber` ?

**Question 7** — La délégation.

`whereNumber` délègue à `assignExpressionToParameters` : lisez-la.

**À noter dans `REPONSES.md`** : quelle méthode appelle-t-elle en fin de compte, et à quoi associe-t-elle le paramètre `id` ?

**Question 8** — Le branchement du trait.

- Ouvrez `Illuminate/Routing/Route.php`.
- Cherchez `CreatesRegularExpressionRouteConstraints` (`Ctrl+F`).

**À noter dans `REPONSES.md`** : sur quelle ligne `use` apparaît-il, et dans quelle classe ?

**Question 9** — Le rangement de la contrainte.

- Toujours dans `Route.php`, ouvrez la méthode `where` (`Ctrl+Shift+O`).

**À noter dans `REPONSES.md`** : dans quelle propriété range-t-elle la contrainte ?

**Question 10** — Les voisines de `whereNumber`.

- De retour dans le trait, lisez `whereAlpha` et `whereAlphaNumeric`.

**À noter dans `REPONSES.md`** : quelles regex se cachent derrière chacune, un exemple de valeur que `/game/{id}` accepterait pour chacune, et ce que vous remarquez chez les voisines `whereUuid` et `whereIn` (sans entrer dans le détail).

**Question 11** — Expérience : la regex à la main.

- Dans `routes/web.php`, remplacez `->whereNumber('id')` par :

  ```php
  ->where('id', '[0-9]+')
  ```

- Vérifiez que `/game/1` fonctionne toujours et que `/game/abc` donne toujours une 404.
- Remettez ensuite `whereNumber`.

**À noter dans `REPONSES.md`** : qu'en concluez-vous sur `whereNumber` ?

### C3 — De `abort(404)` à votre page 404 (Raisonner, ~20 min)

**Prérequis** : l'étape A6 terminée — votre `resources/views/errors/404.blade.php` existe.

**Point de départ** : dans `GameController::show`, le `abort(404)` / `abort_unless(...)` écrit en A6 — et cette même page 404 WishFlix qui s'affiche aussi sur `/url-inexistante`.

Vocabulaire : une **exception** est un signal d'erreur qu'un bout de code **lance** avec le mot-clé `throw` pour dire « je ne peux pas continuer » ; un autre bout du framework, plus loin, le rattrape et décide quoi répondre. Toute la question de ce C3 : qui lance l'exception du 404, et qui choisit votre vue ?

**Question 12** — La fonction globale `abort`.

`abort` n'est pas une méthode de classe : c'est une **fonction globale**, rangée dans `Illuminate/Foundation/helpers.php`.

- Ouvrez ce fichier et lisez la fonction `abort`.

**À noter dans `REPONSES.md`** : pour un code d'erreur comme `404`, quel appel fait-elle, et sur quel objet ?

**Question 13** — Ce qui est lancé.

- Suivez cet appel jusqu'à `Illuminate/Foundation/Application.php`, méthode `abort`.

**À noter dans `REPONSES.md`** : que `throw`-t-elle quand le code vaut 404 ? Et quand le code est différent de 404 ?

**Question 14** — Le gestionnaire d'erreurs.

L'exception remonte jusqu'au gestionnaire d'erreurs : `Illuminate/Foundation/Exceptions/Handler.php`.

- Ouvrez sa méthode `renderHttpException`, puis `getHttpExceptionView`.

**À noter dans `REPONSES.md`** : quelles sont les deux actions faites avant de produire la réponse ? Quel **nom de vue** est construit à partir du code d'erreur, pour un 404 ?

**Question 15** — Le plan B.

- Toujours dans `getHttpExceptionView`, lisez la ligne qui transforme `$view`.

**À noter dans `REPONSES.md`** : si cette vue n'existe pas, quel nom de vue « de secours » est essayé ensuite ? Et si celle-là non plus n'existe pas ?

**Question 16** — Les dossiers `errors::`.

- Ouvrez `Illuminate/Foundation/Exceptions/RegisterErrorViewPaths.php`.

Le préfixe `errors::` pointe vers une **liste de dossiers**.

**À noter dans `REPONSES.md`** : lesquels, et dans quel ordre ? Et pourquoi votre `resources/views/errors/404.blade.php` l'emporte-t-il sur la page 404 livrée par Laravel ?

**Question 17** — L'URL sans route.

Et `/url-inexistante`, qui ne correspond à aucune route ?

- Cherchez le message `The route %s could not be found` dans `vendor/laravel/framework/src/Illuminate/Routing/`.

**À noter dans `REPONSES.md`** : quelle méthode de quel fichier lance une `NotFoundHttpException` — la **même exception** qu'`abort(404)` ?

**Question 18** — (Facultatif) Expérience : un autre code d'erreur.

- Remplacez temporairement `abort(404)` par `abort(403)` dans `show`.
- Rechargez `/game/999`.
- Remettez `abort(404)`.

**À noter dans `REPONSES.md`** : quelle page s'affiche, et pourquoi (reliez aux questions 14 et 16 : quelle vue `errors::403` est trouvée, et dans quel dossier) ?

**Question 19** — Pour finir, reformulez.

**À noter dans `REPONSES.md`** : en 3 à 5 phrases, racontez toute la chaîne qui transforme `abort(404)` — ou une URL sans route — en votre page 404 WishFlix, en nommant le fichier et la méthode de chaque étape.

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : le résultat de la compilation est dans `storage/` — le dossier où Laravel range ce qu'il génère à l'exécution — sous-dossier `framework/views/`. `e()` est une fonction d'aide du framework : les helpers « génériques » vivent dans `Illuminate/Support/`.
- **C2** : le code des `whereXxx` n'est pas dans `Route.php` mais dans un autre fichier du dossier `Illuminate/Routing/`, dont le nom parle d'« expressions régulières ».
- **C3** : `abort` vit dans un `helpers.php` — celui d'`Illuminate/Foundation/` (pas celui de `Support`). Le choix de la vue d'erreur se joue dans `Illuminate/Foundation/Exceptions/`. Pour l'URL sans route, restez dans `Illuminate/Routing/`.

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `Illuminate/View/Compilers/Concerns/CompilesEchos.php` → `compileRegularEchos` (le `{{ }}`) et `compileRawEchos` (le `{!! !!}`) ; le format `e(%s)` est la constante `DEFAULT_ECHO_FORMAT` de `Illuminate/View/Compilers/BladeCompiler.php`. `Illuminate/Support/helpers.php` → fonction `e`.
- **C2** : `Illuminate/Routing/CreatesRegularExpressionRouteConstraints.php` (le trait) → `whereNumber`, `assignExpressionToParameters` ; `Illuminate/Routing/Route.php` → la ligne `use` des traits en haut de la classe, puis la méthode `where`.
- **C3** : `Illuminate/Foundation/helpers.php` → `abort` ; `Illuminate/Foundation/Application.php` → `abort` ; `Illuminate/Foundation/Exceptions/Handler.php` → `renderHttpException` puis `getHttpExceptionView` ; `Illuminate/Foundation/Exceptions/RegisterErrorViewPaths.php` → `__invoke` ; `Illuminate/Routing/AbstractRouteCollection.php` → `handleMatchedRoute`.

</details>

<details>
<summary>Niveau 3 — Extraits du framework (annotés)</summary>

**C1 — la compilation des `{{ }}` et des `{!! !!}`** (`Illuminate/View/Compilers/Concerns/CompilesEchos.php`) :

```php
protected function compileRegularEchos($value)     // pour {{ ... }}
{
    $callback = function ($matches) {
        // ...
        $wrapped = sprintf($this->echoFormat, $this->wrapInEchoHandler($matches[2]));
        // echoFormat vaut 'e(%s)' → $wrapped contient e($game['title'])
        return $matches[1] ? substr($matches[0], 1)
                           : "<?php echo {$wrapped}; ?>{$whitespace}";
        // résultat : <?php echo e($game['title']); ?>
    };
}

protected function compileRawEchos($value)         // pour {!! ... !!}
{
    $callback = function ($matches) {
        // ...
        return $matches[1] ? substr($matches[0], 1)
                           : "<?php echo {$this->wrapInEchoHandler($matches[2])}; ?>{$whitespace}";
        // résultat : <?php echo $game['title']; ?> — pas de e(), le HTML est brut
    };
}
```

**C1 — la fin de `e()`** (`Illuminate/Support/helpers.php`) :

```php
function e($value, $doubleEncode = true): string
{
    // ... cas particuliers (enum, objet Htmlable) ...
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8', $doubleEncode);
    // htmlspecialchars : fonction PHP native qui transforme <, >, ", ' en entités
    // $value ?? '' : l'opérateur ?? renvoie la gauche si elle existe et n'est pas
    // null, sinon la droite — ici '' (chaîne vide) quand $value est null
}
```

**C2 — le trait des contraintes** (`Illuminate/Routing/CreatesRegularExpressionRouteConstraints.php`) :

```php
trait CreatesRegularExpressionRouteConstraints    // ← un trait, pas une classe
{
    public function whereNumber($parameters)
    {
        return $this->assignExpressionToParameters($parameters, '[0-9]+');
    }

    public function whereAlpha($parameters)
    {
        return $this->assignExpressionToParameters($parameters, '[a-zA-Z]+');
    }

    public function whereAlphaNumeric($parameters)
    {
        return $this->assignExpressionToParameters($parameters, '[a-zA-Z0-9]+');
    }

    protected function assignExpressionToParameters($parameters, $expression)
    {
        return $this->where(Collection::wrap($parameters)
            ->mapWithKeys(fn ($parameter) => [$parameter => $expression])
            ->all());                        // appelle where(['id' => '[0-9]+'])
    }
}
```

**C2 — le rangement** (`Illuminate/Routing/Route.php`) :

```php
class Route
{
    use Conditionable, CreatesRegularExpressionRouteConstraints, /* ... */;
    // ↑ le trait est « branché » ici : whereNumber devient une méthode de Route

    public function where($name, $expression = null)
    {
        foreach ($this->parseWhere($name, $expression) as $name => $expression) {
            $this->wheres[$name] = $expression;     // la regex est rangée ici
        }
        return $this;
    }
}
```

**C3 — la chaîne du 404** :

```php
// Illuminate/Foundation/helpers.php
function abort($code, $message = '', array $headers = [])
{
    // ...
    app()->abort($code, $message, $headers);   // délègue à l'objet Application
}

// Illuminate/Foundation/Application.php
public function abort($code, $message = '', array $headers = [])
{
    if ($code == 404) {
        throw new NotFoundHttpException($message, null, 0, $headers);  // cas 404
    }
    throw new HttpException($code, $message, null, $headers);          // les autres codes
}

// Illuminate/Foundation/Exceptions/Handler.php
protected function renderHttpException(HttpExceptionInterface $e)
{
    $this->registerErrorViewPaths();                // 1) enregistrer les dossiers errors::
    if ($view = $this->getHttpExceptionView($e)) {  // 2) trouver la vue d'erreur
        // ... response()->view($view, ...) ...
    }
    // sinon : page d'erreur par défaut
}

protected function getHttpExceptionView(HttpExceptionInterface $e)
{
    $view = 'errors::'.$e->getStatusCode();         // 'errors::404'
    if (view()->exists($view)) {
        return $view;
    }
    $view = substr($view, 0, -2).'xx';              // 'errors::4xx' — le plan B
    if (view()->exists($view)) {
        return $view;
    }
    return null;
}
```

**C3 — les dossiers `errors::`** (`Illuminate/Foundation/Exceptions/RegisterErrorViewPaths.php`) :

```php
View::replaceNamespace('errors', (new Collection(config('view.paths')))
    ->map(fn ($path) => "{$path}/errors")   // resources/views/errors : VOTRE dossier, en premier
    ->push(__DIR__.'/views')                 // puis les vues d'erreur du framework
    ->all()
);
```

**C3 — l'URL sans route** (`Illuminate/Routing/AbstractRouteCollection.php`, méthode `handleMatchedRoute`) :

```php
throw new NotFoundHttpException(sprintf(
    'The route %s could not be found.',
    $request->path()
));
```

</details>

---

## Bonus

### US3 (bonus) — Filtrer le catalogue

**En tant que** joueur, **je veux** filtrer l'accueil avec `/?category=RPG`, **afin de** ne voir qu'un genre de jeux.

Critères d'acceptation :

- `GameController::index` reçoit l'objet `Request` et lit `$request->query('category')`
- Sans paramètre, tous les jeux s'affichent ; avec une catégorie inconnue, le cas `@empty` s'affiche
- Contenu filtré avec `array_filter` (la version avec la base arrive en S4)

### Bonus 1 — Des liens générés partout

- Le bouton « Voir la fiche » du hero pointe vers la fiche du jeu mis en avant via `route('games.show', ...)`
- Les liens « Accueil », « Wishlist » et « Se connecter » de la navbar utilisent `route()`
- Plus aucun `href="/..."` interne en dur

### Bonus 2 — Tailwind et DaisyUI via Vite

Remplacez les balises CDN (link DaisyUI + script `@tailwindcss/browser`) par Tailwind CSS + DaisyUI servis **via Vite**.

✅ Vérification : le rendu est identique **sans** aucune balise CDN dans le layout.

Bon à savoir : Tailwind est **déjà installé** dans votre projet Laravel (paquet npm + plugin `tailwindcss()` dans `vite.config.js`) — ne suivez pas un guide d'installation Tailwind « from scratch ». Il reste à ajouter DaisyUI et à réactiver Tailwind dans `app.css` : voir la [page d'installation DaisyUI pour Laravel](https://daisyui.com/docs/install/laravel/).

<details>
<summary>Indice 1 — Par où commencer</summary>

Le script de l'étape A5.2 a remplacé les lignes de `app.css` qui activaient Tailwind (l'ancien fichier est dans `resources/css/app.css.orig`). DaisyUI est un **plugin** de Tailwind : il s'installe avec npm, puis se déclare dans ce même `app.css`, à côté de Tailwind.

</details>

<details>
<summary>Indice 2 — Les étapes</summary>

1. Installer le paquet `daisyui` en dépendance de développement (via `sail npm`)
2. Remettre en **tête** de `resources/css/app.css` l'import de Tailwind et ses `@source`, puis une ligne `@plugin` pour DaisyUI — votre CSS WishFlix reste en dessous
3. Supprimer les deux balises CDN du layout (`app.css` est déjà chargé par `@vite`)

</details>

<details>
<summary>Indice 3 — Squelette</summary>

```bash
./vendor/bin/sail npm install -D daisyui@latest
```

En tête de `resources/css/app.css`, au-dessus de votre CSS WishFlix :

```css
@import "tailwindcss";

@source "../**/*.blade.php";
@source "../**/*.js";
@source "../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php";
@source "../../storage/framework/views/*.php";

@plugin "daisyui";
```

Gardez `data-theme="dark"` sur la balise `<html>` : c'est lui qui active le thème sombre de DaisyUI.

</details>

### Bonus 3 — Lien actif dans la navbar

Mettez en évidence le lien de navbar correspondant à la page courante (la classe `wishflix-shell__link--active` des maquettes).

> 💡 `request()->routeIs('...')` permet de tester le nom de la route courante — voir la [documentation Requests](https://laravel.com/framework/docs/12.x/requests). La navbar ne doit pas connaître la page : c'est la vue/le layout qui décide.

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
- [ ] `vite.config.js` déclare `app.css` + les CSS de chaque page utilisée
- [ ] `layouts/app.blade.php` contient navbar + footer en un seul endroit, avec `@yield('title')`, `@yield('styles')`, `@yield('content')`
- [ ] `/` (route `home`) affiche au moins 4 jeux issus du tableau PHP du `GameController`, chacun avec titre, catégorie, note, jaquette
- [ ] `/game/{id}` (route `games.show`, `whereNumber`) affiche la fiche du bon jeu ; `/game/999` → 404 ; `/game/abc` → 404 ; la 404 est celle de WishFlix
- [ ] US1–US2 : `/wishlist` et `/login` fonctionnent et étendent le layout
- [ ] `REPONSES.md` contient la section « Séance 2 — Sous le capot » avec les réponses de C1–C3 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé
