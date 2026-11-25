# Exercice 07 — Interactivité front et optimisation

## Objectif

Rendre WishFlix **réactif sans framework JS** : ajouter un jeu à la wishlist ou le retirer **sans rechargement de page** (`fetch`), faire répondre le serveur en **JSON** quand le client le demande, puis **mettre en cache** la section « Mieux notés » de l'accueil et mesurer le gain.

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (4 chapitres, 3 points de contrôle — la pratique est répartie au fil des chapitres) | En séance | ≈ 1h30 en séance (pratique : 8 + 30 + 25 + 25 min) |
| **Attendu** | Partie B (2 user stories) + Partie C « Sous le capot » | À la maison | ≈ 1h15 + ≈ 45 min |
| **Bonus** | Filtre du catalogue en direct, compteur par catégorie en cache, `Cache::flexible` | Facultatif | ≈ 1h30 |

> Le **socle** est dimensionné pour un étudiant lent : ≈ 2× le temps de démo du même geste. Les durées de la **Partie B** et de la **Partie C** restent indicatives — elles supposent un rythme rapide. Pas finie en séance ? La **séance 8** est un atelier pratique dédié au rattrapage.

**Référence officielle** :

- [Fetch API — MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [Codes de statut HTTP — MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)
- [Responses — Laravel 12](https://laravel.com/docs/12.x/responses)
- [Cache — Laravel 12](https://laravel.com/docs/12.x/cache)

---

## Prérequis

- La **Partie A de l'exercice 06 terminée** : route `POST /wishlist/{game}` nommée `wishlist.store`, `WishlistController@store` (`syncWithoutDetaching` + `back()->with('success', …)`), bloc `@auth` de `game-detail.blade.php` (badge / formulaire « Ajouter à ma wishlist »)
- La **Partie B de l'exercice 06** pour la Partie B ci-dessous : badge « Wishlist » de la navbar, boutons « Ajouter » des cartes de l'accueil, page `/wishlist` dynamique avec « Retirer ». Pas encore faite ? Chaque US indique le minimum à ajouter — ou faites-la d'abord, elle est courte
- La **Debugbar** (exercice 04, A3) et `sail npm run dev` lancé dans un second terminal
- `resources/js/app.js` existe (il vient du starter) ; `resources/js/app.js` figure dans le tableau `input` de `vite.config.js` — sinon, ajoutez-le

---

## Étape 0 — Contrôler l'environnement

```bash
./vendor/bin/sail up -d
git status
./vendor/bin/sail artisan route:list --name=wishlist
```

> ✅ **Vérification** :
>
> - `git status` affiche `nothing to commit, working tree clean` — sinon, **commitez maintenant**
> - `route:list` montre `GET /wishlist` (nom `wishlist`) et `POST /wishlist/{game}` (nom `wishlist.store`)
> - `http://localhost` affiche le catalogue ; connecté (`demo@wishflix.com` / `demo1234`), « Ajouter à ma wishlist » sur une fiche **recharge la page** — c'est le « avant » que l'étape A1 mesure

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant.

### A1 — Le cycle requête / réponse (Chapitre 1)

#### A1.1 · Ouvrir l'onglet Réseau

1. Connecté, ouvrez les DevTools (`F12`) → onglet **Réseau**
2. Cochez **« Preserve log »** (ou « Conserver le journal ») : sans lui, la trace du POST disparaît à la redirection
3. Filtrez sur **Doc** (documents)

#### A1.2 · Compter les allers-retours

Sur une fiche jeu, cliquez « Ajouter à ma wishlist » (ou « Retirer » depuis `/wishlist` si la Partie B de l'exercice 06 est faite). Dans l'onglet Réseau :

- **deux** lignes document : le `POST` en **302** (une instruction de redirection, taille quasi nulle) puis le `GET` de la page en **200**
- le `GET` renvoie la **page HTML complète**

#### A1.3 · Le SQL rejoué

Debugbar → onglet **Queries** : la page a rejoué toutes ses requêtes SQL — catégories, plateformes, utilisateur…

#### A1.4 · Noter le « avant »

Dans `REPONSES.md`, créez la section `## Séance 7 — Avant / après` et notez : nombre de requêtes **document**, statut de chacune, taille approximative du HTML reçu.

> ✅ **Vérification** : vous savez décrire le coût d'un simple « Ajouter » : 2 documents, une page entière, tout le SQL rejoué.

### A2 — La requête en arrière-plan : fetch (Chapitre 2)

#### A2.1 · Charger `app.js`

📄 `resources/views/layouts/app.blade.php`

Le `@vite` du `<head>` ne charge aujourd'hui que le CSS :

```blade
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

Vérifiez que `resources/js/app.js` figure dans le tableau `input` de `vite.config.js` (il y est depuis le starter) et que le fichier commence par `import './bootstrap';` — **gardez cette ligne** : axios et l'en-tête `X-Requested-With` dont vous aurez besoin en Partie C.

#### A2.2 · Marquer le formulaire

📄 `resources/views/game-detail.blade.php`

Sur le formulaire « Ajouter à ma wishlist » (celui du bloc `@auth`), ajoutez l'attribut `data-wishlist-form` :

```blade
<form method="POST" action="{{ route('wishlist.store', $game) }}" data-wishlist-form>
```

#### A2.3 · Écrire le script

📄 `resources/js/app.js`

Pour **chaque** formulaire marqué `data-wishlist-form`, le script doit :

1. écouter l'événement `submit` et l'**annuler** (`preventDefault`) pour empêcher la navigation
2. envoyer la requête avec `fetch` : `POST` sur `form.action`, corps = `new FormData(form)` — le `_token` de `@csrf` et le cookie de session partent tout seuls
3. si la réponse n'est pas `ok` (`response.ok` faux : 419, 500…), **replier** sur la soumission classique `form.submit()` — elle n'émet pas l'événement `submit`, donc pas de boucle — puis arrêter
4. sinon, remplacer le formulaire par le badge `<span class="badge badge-success">Dans votre wishlist</span>` (`form.outerHTML = …`)

<details>
<summary>Squelette partiel</summary>

```js
document.querySelectorAll('form[data-wishlist-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const response = await fetch(form.action, {
            method: 'POST',
            // TODO : corps de la requête — indice : FormData
        });

        // TODO : si ! response.ok → form.submit() puis return

        // TODO : sinon → form.outerHTML = '<span class="badge badge-success">…</span>'
    });
});
```

</details>

#### A2.4 · Vérifier — et provoquer l'erreur

1. Rechargez une fiche, ajoutez un jeu : **aucune** navigation, le badge remplace le formulaire. Onglet Réseau, filtre **Fetch/XHR** : une seule requête `fetch`… dont la réponse est **encore la page HTML complète** (fetch a suivi la 302)
2. Erreur provoquée : retirez `@csrf` du formulaire, rechargez, cliquez : la réponse est un **419**, le repli `form.submit()` affiche la page d'erreur. **Remettez `@csrf`** et rechargez

> ✅ **Vérification** :
>
> - l'ajout ne recharge pas la page, le badge apparaît
> - sans `@csrf`, la page 419 s'affiche (repli fonctionnel) ; `@csrf` remis
> - aucune erreur dans la console du navigateur

> ✅ **Point de contrôle 1**
>
> - [ ] `app.js` est chargé par le layout ; le script intercepte tous les formulaires `data-wishlist-form`
> - [ ] Ajout sans rechargement + badge ; repli `form.submit()` vérifié (419)
> - [ ] Commit : « feat: ajout à la wishlist sans rechargement »
>
> 🛟 Rattrapage : relisez le diff des tags Campus Quest `s7-ch1-cycle` et `s7-ch2-fetch` (dépôt `CampusQuest`), puis **refaites** les étapes A1 et A2 sur WishFlix.

### A3 — La réponse JSON (Chapitre 3)

La réponse du fetch est une page entière pour afficher un badge. Le serveur peut répondre en **JSON** quand le client le demande.

#### A3.1 · La branche `expectsJson()`

📄 `app/Http/Controllers/WishlistController.php`

Dans `store()`, après l'ajout à la wishlist et **avant** le `back()` :

```php
if ($request->expectsJson()) {
    return response()->json([
        'in_wishlist' => true,
        'count' => $request->user()->wishlist()->count(),
    ]);
}
```

#### A3.2 · Demander du JSON côté client

📄 `resources/js/app.js`

1. Dans les options du `fetch`, ajoutez l'en-tête : `headers: { Accept: 'application/json' }`
2. Après le test `response.ok`, lisez le corps : `const data = await response.json();` — `data.count` contiendra le nombre de jeux de la wishlist (utilisé en Partie B)

Le badge et le repli ne changent pas.

#### A3.3 · Mesurer le « après »

1. DevTools → Réseau → la requête `wishlist/…` : la réponse fait désormais **quelques dizaines d'octets** — l'onglet **Aperçu/Preview** montre `{"in_wishlist":true,"count":N}`
2. Dans `REPONSES.md` (section « Séance 7 — Avant / après »), notez la taille de la réponse JSON à côté de la taille HTML notée en A1

> ✅ **Vérification** :
>
> - la réponse du fetch est du JSON (Preview), plus une page HTML
> - ajouter un jeu fonctionne toujours sans rechargement, `data.count` est lu sans erreur
> - la taille « avant / après » est notée dans `REPONSES.md`

> ✅ **Point de contrôle 2**
>
> - [ ] `store()` répond en JSON quand `expectsJson()`, en redirect sinon
> - [ ] Le JS envoie `Accept: application/json` et lit `response.json()`
> - [ ] Commit : « feat: réponse JSON de la wishlist »
>
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s7-ch3-json` (dépôt `CampusQuest`), puis **refaites** l'étape A3 sur WishFlix.

### A4 — Le cache applicatif (Chapitre 4)

La section « Mieux notés » de l'accueil recalcule sa requête à chaque visite. `Cache::remember` la calcule une fois puis la ressert.

#### A4.1 · Repérer la requête

📄 `app/Http/Controllers/GameController.php`, méthode `index()`

La clé `'topRated'` du tableau renvoyé à la vue contient la requête des 6 jeux les mieux notés (avec son `with('category')` si vous l'avez ajouté à l'exercice 04).

#### A4.2 · `Cache::remember`

En haut du fichier : `use Illuminate\Support\Facades\Cache;`

Remplacez la valeur de `'topRated'` par un appel à `Cache::remember`, avec :

- la **clé** `'home.top-rated'`
- le **TTL** `now()->addMinutes(10)`
- la **closure** qui renvoie la même requête qu'avant (`Game::with('category')->orderByDesc('rating')->limit(6)->get()` ou votre forme exacte)

La closure **contient** l'eager loading : tout ce qui alimente la vue est calculé d'un bloc, une seule fois par fenêtre de 10 minutes.

#### A4.3 · Invalider à l'écriture

Dans `store()`, `update()` et `destroy()` du même contrôleur, avant le `redirect()` :

```php
Cache::forget('home.top-rated');
```

#### A4.4 · Mesurer le gain

1. Debugbar → **Queries**, rechargez `/` deux fois : au 1er chargement, la requête des jeux à fort rating **+** une écriture dans `cache` ; au 2e, un `select … from cache` à la place
2. Montez un jeu à la note 5 dans le back-office → il apparaît **tout de suite** dans « Mieux notés » (l'invalidation a fonctionné)
3. Notez le nombre de requêtes avant / après dans `REPONSES.md`

> ✅ **Vérification** :
>
> - au 2e chargement de `/`, la requête « Mieux notés » est lue dans `cache`, pas recalculée
> - une modification de jeu invalide le cache (le jeu apparaît sans attendre 10 min)
> - Commit : « perf: cache des mieux notés »
>
> ✅ **Point de contrôle 3 (fin de la Partie A)**
>
> - [ ] `Cache::remember` entoure la requête, `Cache::forget` est dans les trois écritures
> - [ ] Le gain est mesuré dans la Debugbar et noté dans `REPONSES.md`
> - [ ] Commit : « perf: cache des mieux notés »
>
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s7-ch4-cache` (dépôt `CampusQuest`), puis **refaites** l'étape A4 sur WishFlix.

---

## Partie B — Attendu (à la maison, ≈ 1h15)

Même démarche que la Partie A, en réutilisant le script `data-wishlist-form` partout. Chaque US suppose la **Partie B de l'exercice 06** faite (badge navbar réel, boutons « Ajouter » sur les cartes, page `/wishlist` dynamique) : si une pièce manque, l'US indique le minimum à ajouter.

### US1 — Le compteur en direct

**En tant que** joueur connecté, **je veux** voir le badge « Wishlist » de la barre de navigation suivre mes ajouts sans rechargement, **y compris depuis les cartes de l'accueil**, **afin de** toujours connaître ma liste.

Critères d'acceptation :

- Le badge de la navbar porte `data-wishlist-count` et affiche `Auth::user()->wishlist()->count()` (rendu serveur, dans `@auth`) — s'il affiche encore un nombre en dur depuis la maquette, rendez-le réel d'abord (exercice 06, US1)
- Après chaque ajout en fetch — depuis la fiche **ou** depuis une carte de l'accueil — le compteur prend la valeur `data.count` de la réponse, sans rechargement
- Les formulaires « Ajouter » des cartes de l'accueil portent le **même** attribut `data-wishlist-form` : **un seul** script les intercepte tous
- Après un ajout depuis l'accueil, la carte affiche le badge de confirmation à la place du formulaire (comme sur la fiche)

### US2 — Retirer sans rechargement

**En tant que** joueur connecté, **je veux** retirer un jeu de ma wishlist depuis `/wishlist` sans rechargement, **afin de** garder une liste à jour sans perdre ma position.

Critères d'acceptation :

- Chaque formulaire « Retirer » de `/wishlist` porte `data-wishlist-remove` (il contient déjà `@csrf` et `@method('DELETE')` — `FormData` enverra `_method=DELETE`, Laravel routera vers `destroy()` comme avant)
- `WishlistController@destroy` répond en JSON quand `expectsJson()` : `['removed' => true, 'count' => …]` — sinon, `back()->with('success', …)` inchangé
- Le JS intercepte ces formulaires : `POST` + `FormData` + `Accept: application/json`, repli `form.submit()` si `!response.ok` — la soumission classique fonctionne aussi (`_method=DELETE` voyage dans le corps)
- La carte disparaît (`closest()` jusqu'au conteneur de la carte), le compteur `data-wishlist-count` est mis à jour, et quand `data.count === 0` le message « wishlist vide » réapparaît

### Indices de la Partie B

<details>
<summary>Niveau 1 — Où regarder</summary>

- Le compteur ne bouge pas → `data-wishlist-count` absent de la navbar, ou `data.count` lu mais jamais injecté (`textContent`)
- `response.json()` lève une erreur → la réponse n'est pas du JSON : en-tête `Accept` manquant côté fetch, ou branche `expectsJson()` absente du contrôleur — la réponse est alors la page HTML de la redirection suivie par fetch
- La carte ne disparaît pas → `closest()` ne remonte pas jusqu'au bon conteneur ; vérifiez la structure HTML de `wishlist.blade.php`
- « Retirer » répond 405 ou 419 → `@method('DELETE')` ou `@csrf` manquant dans le formulaire

</details>

<details>
<summary>Niveau 2 — Quelle méthode</summary>

- Compteur : `document.querySelector('[data-wishlist-count]').textContent = data.count;` après `response.json()`
- Deux listeners : `form[data-wishlist-form]` (ajout) et `form[data-wishlist-remove]` (retrait) — le second envoie le même `FormData`, `_method=DELETE` fait le tri côté serveur
- Retirer la carte : `form.closest('…').remove()` où `…` est la classe du conteneur de carte ; grille et message vide : attributs `data-wishlist-grid` / `data-wishlist-empty` + `hidden`
- `destroy()` : même gabarit que `store()` — `detach()` puis `if ($request->expectsJson()) { return response()->json([...]) }` puis `back()->with(...)`

</details>

<details>
<summary>Niveau 3 — Squelettes partiels</summary>

```php
public function destroy(Request $request, Game $game)
{
    $request->user()->wishlist()->detach($game->id);

    if ($request->expectsJson()) {
        return response()->json([
            'removed' => true,
            'count' => $request->user()->wishlist()->count(),
        ]);
    }

    return back()->with('success', 'Jeu retiré de votre wishlist.');
}
```

```js
// second listener, même structure que l'ajout :
document.querySelectorAll('form[data-wishlist-remove]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        // fetch POST + FormData + Accept json → !ok : form.submit()
        // ok : const data = await response.json();
        //      form.closest(…).remove();
        //      [data-wishlist-count].textContent = data.count;
        //      si data.count === 0 : afficher data-wishlist-empty, masquer la grille
    });
});
```

</details>

---

## Partie C — Sous le capot (à la maison, ≈ 45 min)

`expectsJson()`, `response()->json()` et `Cache::remember` semblent marcher « tout seuls ». Dans cette partie, vous lisez le code du framework (`vendor/laravel/framework/src/Illuminate/`) pour voir où cela se passe.

> 🧭 **Règle d'or** : vous n'avez **pas besoin de tout comprendre**. Chaque question donne un fil à suivre (un fichier, une méthode) : suivez-le et ignorez le reste.

> 🔧 **Outils** : `Ctrl+P` (ouvrir un fichier), `Ctrl+Shift+O` (sauter à une méthode), `Ctrl+F`, `Ctrl+clic` (aller à la définition). ⚠️ `vendor/` est en lecture seule : ne modifiez rien.

**Rendu** : dans `REPONSES.md`, ajoutez une section `## Séance 7 — Sous le capot`. Pour chaque réponse, indiquez le **chemin suivi** (fichier ouvert → méthode).

### C1 — Qui décide qu'il faut du JSON ? (~15 min)

**Point de départ** : l'en-tête `Accept: application/json` de l'étape A3.2.

- Ouvrez `Illuminate/Http/Concerns/InteractsWithContentTypes.php` et lisez `expectsJson()`, puis `wantsJson()`.
- Depuis `expectsJson()`, sautez à `ajax()` et `pjax()` (dans `Illuminate/Http/Request.php`) : quel en-tête HTTP chacun teste-t-il ?
- Ouvrez `resources/js/bootstrap.js` : quel en-tête axios ajoute-t-il à **toutes** ses requêtes ?

**À noter dans `REPONSES.md`** : à quelles conditions `expectsJson()` renvoie-t-il vrai ? Pourquoi un simple `X-Requested-With: XMLHttpRequest` (sans `Accept: json`) suffit-il aussi ? Que changerait l'ajout de cet en-tête à toutes les requêtes d'une application ?

### C2 — Comment un tableau devient-il du JSON ? (~15 min)

**Point de départ** : `return response()->json([...])` de l'étape A3.1 — et la question : que se passe-t-il si le contrôleur `return` le tableau **sans** `response()->json()` ?

- Ouvrez `Illuminate/Routing/Router.php`, lisez `prepareResponse()` puis `toResponse()`.
- Repérez la branche qui transforme un `array` (ou `Arrayable`, `Jsonable`, `JsonSerializable`) en `JsonResponse`, et celle qui fabrique une `Response` HTML sinon.
- Ouvrez `Illuminate/Database/Eloquent/Concerns/HidesAttributes.php` : à quoi sert `$hidden` ? Regardez ensuite `app/Models/User.php` : quels attributs sont masqués, et pourquoi le mot de passe n'apparaît-il jamais dans un JSON ?

**À noter dans `REPONSES.md`** : quel type de retour produit une `JsonResponse` sans appeler `response()->json()` ? Que recevrait un client si `store()` renvoyait directement `$request->user()->wishlist` (une collection de modèles) ?

### C3 — Que fait `Cache::remember` en coulisses ? (~15 min)

**Point de départ** : l'étape A4.2.

- Ouvrez `Illuminate/Cache/Repository.php` et lisez `remember()`.
- Repérez l'ordre des opérations : lecture, appel de la closure, écriture.
- Cherchez `forget()` dans le même fichier : que fait-il de la clé ?

**À noter dans `REPONSES.md`** : dans quel ordre `get`, la closure et `put` sont-ils exécutés ? Que se passe-t-il si la closure renvoie `null` — la valeur est-elle jamais servie depuis le cache ? (Vérifiez en relisant le test `is_null`.)

### Indices de la Partie C

<details>
<summary>Niveau 1 — Où chercher</summary>

- **C1** : les deux conditions de `expectsJson()` sont un `||` : une branche `ajax()` et une branche `wantsJson()`.
- **C2** : dans `toResponse()`, la branche `JsonResponse` liste plusieurs interfaces — `is_array` est du lot.
- **C3** : dans `remember()`, le `return` anticipé dépend de `is_null($value)` — comparez avec ce que `put()` stocke.

</details>

<details>
<summary>Niveau 2 — Quel fichier, quelle méthode</summary>

- **C1** : `expectsJson()` = `(ajax() && ! pjax() && acceptsAnyContentType()) || wantsJson()` ; `ajax()` → `isXmlHttpRequest()` (en-tête `X-Requested-With`) ; `wantsJson()` lit le premier type de l'en-tête `Accept` ; `bootstrap.js` pose `X-Requested-With: XMLHttpRequest` sur axios.
- **C2** : `Router::prepareResponse()` dispatche les événements puis appelle `toResponse()` ; `array`/`Arrayable`/`Jsonable`/`JsonSerializable`/`stdClass` → `new JsonResponse($response)` ; un modèle Eloquent est `Jsonable`/`JsonSerializable` → JSON aussi, et `$hidden` filtre `password`, `remember_token` à la sérialisation.
- **C3** : `remember()` → `$this->get($key)` ; si `! is_null($value)` → `return $value` ; sinon `$value = $callback()` puis `$this->put($key, $value, value($ttl, $value))` ; une closure qui renvoie `null` est stockée mais `get()` la relira `null` → traitée comme un **miss** à chaque appel : le callback se ré-exécute à chaque fois.

</details>

---

## Bonus

### Bonus 1 — Le filtre du catalogue en direct

Sur l'accueil, interceptez le formulaire de filtre (`GET`, `search` + `category`) : `fetch` vers l'URL avec la query string (`new URLSearchParams(new FormData(form))`), puis remplacez la grille des résultats. Côté serveur, vous pouvez soit renvoyer la page complète et n'en extraire que la grille (ou ajouter une branche `expectsJson()`/paramètre `partial` qui ne rend que le partiel `games-grid`).

### Bonus 2 — Un retour visuel pendant la requête

Pendant le `fetch`, désactivez le bouton (`button.disabled = true`) et changez son libellé (« Ajout… ») ; restaurez les deux dans tous les cas (`try`/`finally` ou après le `if`).

### Bonus 3 — Le compteur de jeux par catégorie en cache

Le filtre de l'accueil affiche le nombre de jeux par catégorie (`Category::withCount('games')`, exercice 04, A5). Mettez ce comptage en cache (`Cache::remember`, clé dédiée), invalidez-le dans `GameController::store/update/destroy` **en plus** de `home.top-rated`, et mesurez le gain dans la Debugbar.

### Bonus 4 — `Cache::flexible`

Remplacez le TTL fixe de `home.top-rated` par `Cache::flexible($key, [now()->addMinutes(5), now()->addMinutes(15)], fn () => …)` : la valeur est resservie telle quelle pendant 5 min, puis rafraîchie en arrière-plan jusqu'à 15 min. Comparez avec `Cache::remember` (Panorama du chapitre 4).

---

## Critères de réussite

- [ ] Étape 0 : l'environnement répond, `git status` est propre
- [ ] Ajout à la wishlist **sans rechargement**, avec repli `form.submit()` en cas d'erreur (419 provoquée puis `@csrf` remis)
- [ ] Réponse JSON `{"in_wishlist":true,"count":N}` quand `Accept: application/json`, redirect sinon
- [ ] « Mieux notés » en cache 10 min, mesuré dans la Debugbar, invalidé à chaque écriture de jeu
- [ ] US1 : compteur de la navbar en direct depuis la fiche et les cartes ; US2 : retrait sans rechargement, carte supprimée, message « wishlist vide »
- [ ] `REPONSES.md` contient les sections « Séance 7 — Avant / après » et « Séance 7 — Sous le capot » avec les réponses de C1 à C3 et le chemin suivi
- [ ] Commits réguliers poussés sur le dépôt GitHub privé
