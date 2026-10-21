# Exercice 02 — Routing, contrôleurs et Blade

## Objectif

Transformer les **maquettes HTML statiques** de WishFlix en **pages Laravel dynamiques** : un layout Blade commun, une page d'accueil qui liste les jeux depuis un tableau PHP, et une fiche jeu `/game/{id}` avec gestion du 404.

**Durée estimée** : 4h45 (Partie A : 2h en séance · Partie B : ~2h chez vous · Partie C : ~45 min chez vous · Bonus : au choix)

> **Déroulé** — En séance (2h) : Partie A · Chez vous : Partie B (~2h) + Partie C (~45 min) · Bonus : au choix · ⚠️ **Requis pour la séance 3** : la Partie A terminée (layout, accueil, fiche jeu) — en S3 le tableau PHP sera remplacé par la base de données.

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

### A1 — Démarrer Vite et copier les CSS

**Étape 1 — Repérer la configuration Vite**

Ouvrez `vite.config.js` et repérez le tableau `input` du plugin `laravel(...)` :

```js
input: ['resources/css/app.css', 'resources/js/app.js'],
```

C'est la liste des fichiers que Vite peut servir. Dans ce fichier, vous ne modifierez **que** ce tableau.

> ⚠️ Laissez la ligne `tailwindcss()` en place : elle servira au Bonus 1.

**Étape 2 — Installer les dépendances front**

```bash
./vendor/bin/sail npm install
```

> Le premier `npm install` peut prendre quelques minutes : c'est normal.

**Étape 3 — Lancer Vite dans un second terminal** (laissez-le ouvert pendant toute la séance)

```bash
./vendor/bin/sail npm run dev
```

**Étape 4 — Copier la CSS commune**

Ouvrez `resources/css/app.css` et **remplacez tout son contenu** par celui du `app.css` des maquettes.

> 💡 Les lignes d'origine (`@import 'tailwindcss'`, `@source`…) servent à Tailwind via Vite : vous les retrouverez au Bonus 1.

**Étape 5 — Copier les CSS de page**

Copiez `home.css` et `game-detail.css` des maquettes dans `resources/css/` (gardez leurs noms).

> 💡 Les maquettes utilisent **Tailwind** et **DaisyUI** (les classes `navbar`, `badge`, `btn`, `card`…) chargés par deux balises **CDN** dans le `<head>`. Vous n'avez pas besoin de connaître ces outils : gardez ces deux balises telles quelles et recopiez les classes HTML des maquettes, elles fonctionneront.

### A2 — Le layout `app.blade.php`

**Étape 1 — Créer le layout**

Créez `resources/views/layouts/app.blade.php` à partir de la **coquille commune** de `home.html` : le `<!doctype>`, le `<head>`, la navbar et le footer — c'est-à-dire tout ce qui est identique d'une page à l'autre.

**Étape 2 — Marquer les parties qui changent**

Dans `resources/views/layouts/app.blade.php`, remplacez les trois endroits qui changent d'une page à l'autre par des `@yield` :

- le titre de l'onglet → `@yield('title')`
- les CSS propres à la page → `@yield('styles')`, dans le `<head>`
- le contenu du `<main>` → `@yield('content')`

**Étape 3 — Brancher la CSS commune sur Vite**

Toujours dans le `<head>` de `app.blade.php` :

- **gardez** les deux balises CDN (DaisyUI et `@tailwindcss/browser`) ;
- **supprimez** les deux `<link rel="stylesheet">` vers `app.css` et `home.css` ;
- à leur place, chargez la CSS commune (déjà déclarée dans `input`) :

  ```blade
  @vite(['resources/css/app.css'])
  ```

Les CSS propres à chaque page passeront par `@yield('styles')`.

**Étape 4 — Extraire la navbar (optionnel mais recommandé)**

Déplacez la navbar dans `resources/views/partials/nav.blade.php`, puis insérez-la dans le layout :

```blade
@include('partials.nav')
```

> 💡 Le layout ne s'affiche pas tout seul : vous le verrez à l'écran à la fin de A3, quand une page l'étendra.

### A3 — `GameController` et la page d'accueil

**Étape 1 — Générer le contrôleur**

```bash
./vendor/bin/sail artisan make:controller GameController
```

Le fichier créé est `app/Http/Controllers/GameController.php`.

**Étape 2 — Décrire les jeux**

Ouvrez `app/Http/Controllers/GameController.php` et ajoutez-y une propriété tableau d'**au moins 4 jeux**.

Chaque jeu suit le modèle de données du programme : `title`, `synopsis`, `release_year`, `rating`, `category`, `platforms`, `cover_url`.

> 💡 Pour `cover_url`, vous pouvez utiliser `https://via.assets.so/game.png?id=N&q=95&w=300&h=450&fit=cover` avec un `id` différent par jeu.

**Étape 3 — Écrire l'action `index()`**

Toujours dans `GameController.php`, écrivez l'action `index()` qui passe ce tableau à une vue `home` (fichier `resources/views/home.blade.php`, créé à l'étape 5).

**Étape 4 — Brancher la route `/`**

Ouvrez `routes/web.php` et remplacez la route `/` existante par une route vers l'action `index`, nommée `home` :

```php
Route::get('/', [GameController::class, 'index'])->name('home');
```

**Étape 5 — Construire la vue d'accueil**

Créez `resources/views/home.blade.php` à partir du **contenu du `<main>`** de `home.html` (hero + section catalogue), et faites-la étendre le layout :

```blade
@extends('layouts.app')
```

Dans la grille de cartes, ne gardez **qu'une seule carte** et faites-la boucler sur vos jeux avec `@forelse` sur `$games` — l'id du jeu se récupère dans la clé (`$id => $game`).

**Étape 6 — Déclarer la CSS de la page à Vite**

Ouvrez `vite.config.js` et ajoutez `'resources/css/home.css'` au tableau `input`.

> ⚠️ **Chaque fichier CSS/JS chargé par `@vite` doit figurer dans `input`.**

**Étape 7 — Charger la CSS dans la vue**

Dans `resources/views/home.blade.php`, remplissez la section `styles` :

```blade
@section('styles')
    @vite('resources/css/home.css')
@endsection
```

✅ Vérification : ouvrez [http://localhost](http://localhost) — l'accueil WishFlix s'affiche avec ses styles. Si vous voyez « Vite manifest not found », `sail npm run dev` ne tourne pas.

> La page Laravel par défaut ne déclenche jamais cette erreur (elle vérifie d'abord que Vite tourne) : c'est la première fois que vous pouvez la rencontrer.

### A4 — La fiche jeu `/game/{id}`

**Étape 1 — Écrire l'action `show()`**

Ouvrez `app/Http/Controllers/GameController.php` et ajoutez l'action `show(int $id)` :

- si l'id n'existe pas dans le tableau → `abort(404)` ;
- sinon → passer le jeu (et son id) à une vue `game-detail` (fichier `resources/views/game-detail.blade.php`).

**Étape 2 — Déclarer la route**

Ouvrez `routes/web.php` et déclarez la route `GET /game/{id}` vers l'action `show`, nommée `games.show`, avec un paramètre **contrainte numérique** (`whereNumber`) :

```php
Route::get('/game/{id}', [GameController::class, 'show'])
    ->whereNumber('id')
    ->name('games.show');
```

**Étape 3 — Construire la vue de la fiche**

Créez `resources/views/game-detail.blade.php` : elle étend le layout et reprend le `<main>` de `game-detail.html`, rempli avec le jeu reçu.

**Étape 4 — Brancher sa CSS**

Dans `vite.config.js`, ajoutez `'resources/css/game-detail.css'` au tableau `input`.

Puis dans `resources/views/game-detail.blade.php`, remplissez la section `styles` :

```blade
@section('styles')
    @vite('resources/css/game-detail.css')
@endsection
```

✅ Vérification :

- [http://localhost/game/1](http://localhost/game/1) affiche la fiche du jeu ;
- [http://localhost/game/999](http://localhost/game/999) → 404 par `abort` ;
- [http://localhost/game/abc](http://localhost/game/abc) → 404 par la contrainte.

### A5 — Des liens générés, pas écrits en dur

**Étape 1 — Le bouton « Details » des cartes**

Dans la boucle de `resources/views/home.blade.php`, faites pointer le bouton « Details » de chaque carte vers la route nommée :

```blade
route('games.show', $id)
```

**Étape 2 — Les liens de la navbar**

Dans la navbar (le layout, ou `partials/nav.blade.php` si vous l'avez extraite), utilisez les routes nommées pour les liens « Accueil », « Wishlist » et « Se connecter » : `home` existe déjà ; `wishlist` et `login` arriveront en partie B — en attendant, mettez `#` ou la route quand elle existe.

**Étape 3 — Le bouton du hero**

Toujours dans `home.blade.php`, faites pointer le bouton « Voir la fiche » du hero vers la fiche du jeu mis en avant.

### ✅ Checkpoint de fin de séance

- [ ] `sail up -d` et `sail npm run dev` tournent, pas d'erreur « Vite manifest not found »
- [ ] `/` affiche l'accueil WishFlix avec la navbar, le hero et **vos 4+ jeux** en cartes
- [ ] Chaque carte mène à `/game/{id}` via `route('games.show', $id)`
- [ ] `/game/999` et `/game/abc` renvoient une 404
- [ ] La navbar et le footer n'existent que dans le layout (et `partials.nav` si extrait)
- [ ] `sail artisan route:list` montre vos deux routes nommées
- [ ] Commit poussé sur votre dépôt GitHub privé

> Tout est coché ? Vous venez de transformer un site statique en application Laravel : c'est sur cette base que s'appuie tout le reste du module.

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

**Point de départ** : dans `resources/views/home.blade.php`, le `{{ $game['title'] }}` que vous avez écrit en A3.

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

**Point de départ** : dans `routes/web.php`, le `->whereNumber('id')` écrit en A4.

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

**Prérequis** : l'US3 terminée — votre `resources/views/errors/404.blade.php` existe.

**Point de départ** : dans `GameController::show`, le `abort(404)` / `abort_unless(...)` écrit en A4 — et cette même page 404 WishFlix qui s'affiche aussi sur `/url-inexistante`.

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

### Bonus 1 — Tailwind et DaisyUI via Vite

Remplacez les balises CDN (link DaisyUI + script `@tailwindcss/browser`) par Tailwind CSS + DaisyUI servis **via Vite**.

✅ Vérification : le rendu est identique **sans** aucune balise CDN dans le layout.

Bon à savoir : Tailwind est **déjà installé** dans votre projet Laravel (paquet npm + plugin `tailwindcss()` dans `vite.config.js`) — ne suivez pas un guide d'installation Tailwind « from scratch ». Il reste à ajouter DaisyUI et à réactiver Tailwind dans `app.css` : voir la [page d'installation DaisyUI pour Laravel](https://daisyui.com/docs/install/laravel/).

<details>
<summary>Indice 1 — Par où commencer</summary>

En A1, vous avez retiré de `app.css` les lignes qui activaient Tailwind. DaisyUI est un **plugin** de Tailwind : il s'installe avec npm, puis se déclare dans ce même `app.css`, à côté de Tailwind.

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

### Bonus 2 — Lien actif dans la navbar

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
- [ ] `/` (route `home`) affiche au moins 4 jeux issus du tableau PHP, chacun avec titre, catégorie, note, jaquette
- [ ] `/game/{id}` (route `games.show`, `whereNumber`) affiche la fiche du bon jeu ; `/game/999` → 404 ; `/game/abc` → 404
- [ ] Aucun `href="/..."` en dur : tous les liens internes passent par `route()`
- [ ] US1–US3 : `/wishlist`, `/login` et la 404 personnalisée fonctionnent et étendent le layout
- [ ] `REPONSES.md` contient la section « Séance 2 — Sous le capot » avec les réponses de C1–C3 et le chemin suivi (fichier → méthode) pour chacune
- [ ] Commits réguliers poussés sur le dépôt GitHub privé

**Temps estimé** : Partie A ≈ 2h · Partie B ≈ 2h · Partie C ≈ 45 min · Bonus ≈ 1h chacun
