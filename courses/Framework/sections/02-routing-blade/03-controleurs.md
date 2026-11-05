---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 40 min
---

# Contrôleurs

- Sortir la logique des routes vers un contrôleur
- Lire les paramètres d'URL avec l'objet `Request`
- Choisir la bonne réponse : vue, JSON, redirection

<!--
Transition : à la fin du chapitre 2, les deux closures recopient le même tableau de quêtes. La closure marche pour une démo, pas pour un vrai projet.
Durée (40 min) = slides (≈ 12 min) + livecoding étapes 6 → 8 (≈ 10 min) + « À vous » A3 (≈ 18 min).
-->

---
transition: slide-up | slide-down
---

# Pourquoi sortir la logique des routes ?

<Compare badLabel="❌ Tout dans web.php" goodLabel="✅ Routes fines + contrôleur">
  <template #bad>

```php
Route::get('/quests', function () {
    $quests = [ /* le tableau… */ ];
    return view('quests.index', /* … */);
});
Route::get('/quests/{id}', function ($id) {
    $quests = [ /* …recopié ! */ ];
    return view('quests.show', /* … */);
});
```

  </template>
  <template #good>

```php
Route::get('/quests',
    [QuestController::class, 'index'])
    ->name('quests.index');
Route::get('/quests/{id}',
    [QuestController::class, 'show'])
    ->name('quests.show');
// données et logique : dans le contrôleur
```

  </template>
</Compare>

<!--
C'est exactement l'état du projet de démo à la fin du chapitre 2 : le montrer à l'écran.
Un contrôleur regroupe les actions d'une même ressource. web.php redevient une table des matières lisible.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Générer un contrôleur avec Artisan

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:controller QuestController', out: '  INFO  Controller [app/Http/Controllers/QuestController.php] created successfully.' }
  ]"
/>

Artisan crée la classe dans `app/Http/Controllers/`, avec le bon `namespace` PHP : rien à écrire à la main.

::right::

<v-click>

<FileTree :tree="[
  { name: 'app', children: [
    { name: 'Http', children: [
      { name: 'Controllers', children: [
        { name: 'Controller.php' },
        { name: 'QuestController.php', highlight: true }
      ]}
    ]}
  ]}
]" />

`Controller.php` est la **classe de base** dont héritent tous vos contrôleurs.

</v-click>

<!--
Livecoding étape 6. Montrer le fichier généré : quasi vide, une classe qui extends Controller.
Question probable : "pourquoi Http/Controllers ?" → ce sont les contrôleurs qui répondent aux requêtes HTTP.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le contrôleur Campus Quest

::left::

```php {all|3-7|9-12|14-17|all}
class QuestController extends Controller
{
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
}
```

::right::

<div v-click="1">

`$quests` — le tableau des closures, rangé **une seule fois** dans une propriété.

</div>

<div v-click="2">

`index()` — l'action de la **liste** : elle passe le tableau à la vue.

</div>

<div v-click="3">

`show(int $id)` — l'action de la **fiche** : elle reçoit le paramètre de route.

</div>

<div v-click="4">

Un contrôleur = des **méthodes publiques** (les *actions*), chacune appelée par une route.

</div>

<!--
Version simplifiée du contrôleur de démo : le filtre ?difficulty arrive à la slide Request.
show() ne vérifie rien : /quests/99 → erreur "Undefined array key". On le sécurise au chapitre 6.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Brancher les routes sur le contrôleur

::left::

````md magic-move
```php
Route::get('/quests', function () {
    $quests = [ /* … */ ];
    return view('quests.index', ['quests' => $quests]);
})->name('quests.index');
```

```php
use App\Http\Controllers\QuestController;
use Illuminate\Support\Facades\Route;

Route::get('/quests', [QuestController::class, 'index'])
    ->name('quests.index');
Route::get('/quests/{id}', [QuestController::class, 'show'])
    ->whereNumber('id')
    ->name('quests.show');
```
````

<div v-click="1">

`[Classe::class, 'méthode']` remplace la closure : la route **délègue** au contrôleur. Le nom et la contrainte ne bougent pas.

</div>

<div v-click="3">

<Analogy title="Comme au restaurant" icon="🍽️">

Le router est l'hôte d'accueil qui vous conduit à une table. Le contrôleur est le serveur : il prend votre commande, la fait préparer (les données) et vous apporte l'assiette (la vue).

</Analogy>

</div>

::right::

<div v-click="2">

```mermaid
sequenceDiagram
    Navigateur->>Router: GET /quests/3
    Router->>QuestController: show(3)
    QuestController->>Vue: view('quests.show', ...)
    Vue-->>Navigateur: HTML de la quête
```

</div>

<!--
Livecoding étape 7 : remplacer les closures par les routes vers le contrôleur.
Le paramètre {id} est injecté dans show(int $id) par nom.
Même trajet qu'au chapitre 2 : seule la closure est remplacée par une méthode de contrôleur.
`sail artisan route:list` affiche maintenant QuestController@index dans la colonne de droite.
-->

---
transition: slide-up | slide-down
---

# L'objet Request : lire les paramètres d'URL

Comment filtrer la liste : `/quests?difficulty=easy` ?

````md magic-move
```php
public function index()
{
    return view('quests.index', ['quests' => $this->quests]);
}
```

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
````

<div v-click="1">

Laravel **injecte** `Request $request` dans l'action : `$request->query('difficulty')` lit le paramètre d'URL.

</div>

<div v-click="2">

Testez : `/quests?difficulty=easy` n'affiche que les quêtes faciles ; `?difficulty=nope` affiche le cas `@empty`.

</div>

<!--
Livecoding étape 8. Ne pas oublier `use Illuminate\Http\Request;` en haut du contrôleur.
Insister sur l'injection : on ne crée pas l'objet, on le déclare et Laravel le fournit — c'est l'inversion de contrôle vue en S1.
Côté WishFlix, le filtre par paramètre d'URL est la user story bonus de l'exercice (il sera refait avec la base en S4).
-->

---
transition: slide-up | slide-down
---

# Choisir sa réponse

| Code | Cas d'usage |
|------|-------------|
| `view('quests.index', $data)` | Renvoyer une page HTML |
| `response()->json($this->quests)` | Renvoyer du JSON (API, front JS) |
| `redirect()->route('quests.index')` | Renvoyer le navigateur vers une route nommée |

<!--
Livecoding optionnel : return response()->json($this->quests); puis redirect()->route('quests.index'), à retirer ensuite.
Question probable : "quand utiliser redirect ?" → après un POST réussi, pour éviter la resoumission du formulaire (S5).
Il existe une 4e réponse, l'erreur : elle a son propre chapitre (6).
Moment léger : remplacer index() par un redirect vers… quests.index → boucle de redirection infinie, « ERR_TOO_MANY_REDIRECTS » : la quête sans fin.
-->

---
transition: slide-up | slide-down
---

# À vous : le GameController

<Exercise title="WishFlix — étapes A3.1 à A3.6" duration="18 min" level="guidé"
  :criteria="[
    'Le tableau des jeux vit dans GameController, plus dans web.php',
    'L\'accueil s\'affiche à l\'identique, servi par GameController@index',
    '/game/1 affiche la fiche du jeu n°1 (vue game-detail)'
  ]">

Consignes : README de l'exercice `02-routing-blade`, **Partie A, étapes A3**.

Déplacez la logique de vos closures dans un contrôleur, puis ajoutez la vraie fiche jeu.

</Exercise>

<!--
Point de contrôle 3. Palier de rattrapage : tag Campus Quest s2-ch3-controleurs.
/game/999 plante encore (« Undefined array key ») : normal, c'est le chapitre 6.
-->
