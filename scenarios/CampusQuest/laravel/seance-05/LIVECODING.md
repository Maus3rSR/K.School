# Fil à suivre — Séance 5 : Formulaires, validation et services

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/05-formulaires/`.
Le projet Laravel est dans `../base/` ; les fichiers finaux à coller sont dans `solution/` (à copier avec `cp -r solution/* ../base/`).
Fil rouge : le **Maître du jeu** gère les quêtes depuis le navigateur (back-office).

## Étape ↔ chapitre ↔ tag

| Étape | Contenu | Chapitre (slides) | Tag Campus Quest |
|---|---|---|---|
| a | Routes `create` / `store`, `create()`, vue, `store()`, flash, **419 provoqué** | 01 — `01-formulaire-creation.md` | `s5-ch1-formulaire` |
| b | `@csrf` : le 419 disparaît | 02 — `02-csrf.md` | `s5-ch2-csrf` |
| c | `validate()`, `@error`, `old()`, `@selected` | 03 — `03-validation.md` | `s5-ch3-validation` |
| d | Routes `edit`/`update`/`destroy` à la main, `@method`, FK pivot | 04 — `04-edition.md` | `s5-ch4-edition` |
| e | `Route::resource` + route model binding | 05 — `05-resource.md` | `s5-ch5-resource` |
| f | Form Requests `Store`/`Update` | 06 — `06-form-request.md` | `s5-ch6-form-request` |
| g | `QuestService` + injection (**démo**, hors socle) | 07 — `07-services.md` | `s5-ch7-services` |

Les tags sont **déclarés** ici ; ils seront créés dans `CampusQuest`. Un commit par étape, tag sur le dernier commit du chapitre.

## Avant la séance

- [ ] **Prérequis : états S2 puis S3 appliqués** (`cp -r ../seance-02/solution/* .` puis `cp -r ../seance-03/solution/* .` depuis `../base/`) : routes, layout, nav, contrôleur Eloquent, modèles, seeders. L'état de départ de la S5 = `seance-03/solution` par-dessus `seance-02/solution`.
- [ ] **Prérequis S4** : aucune notion de la S4 n'est requise. Si la S4 modifie `QuestController::index` (filtres, `with('category')`, pagination) ou `quests/index.blade.php`, la solution S5 **les écrase** : à reporter à la main dans `seance-05/solution` quand la S4 sera écrite.
- [ ] `sail up -d`, `sail npm run dev` (second terminal), `sail artisan migrate:fresh --seed` : 30 quêtes
- [ ] `http://localhost/quests` affiche la liste
- [ ] Le projet démo tourne en SQLite : `DB_CONNECTION=sqlite`, fichier `database/database.sqlite` présent. SQLite est plus permissif que MariaDB (voir étape c)

---

## a. Créer : GET + POST — chapitre 01 (tag `s5-ch1-formulaire`)

1. Routes (`routes/web.php`), **à côté** des deux routes existantes :

```php
Route::get('/quests/create', [QuestController::class, 'create'])->name('quests.create');
Route::post('/quests', [QuestController::class, 'store'])->name('quests.store');
```

Mettre `quests.create` **avant** `/quests/{id}` ou s'appuyer sur `whereNumber('id')` : la création n'est pas capturée.

2. Contrôleur (`use App\Models\Category;`) :

```php
public function create()
{
    return view('quests.create', ['categories' => Category::all()]);
}

public function store(Request $request)
{
    $data = $request->only(['title', 'description', 'xp', 'difficulty', 'category_id']);
    $quest = Quest::create($data);

    return redirect()->route('quests.show', $quest->id)->with('success', 'Quête créée !');
}
```

(`use Illuminate\Http\Request;` en tête.)

3. Vue `resources/views/quests/create.blade.php` : `<form method="POST" action="{{ route('quests.store') }}">` et les champs `title`, `description`, `xp`, `difficulty`, `category_id` (`name` = clé). **Volontairement sans `@csrf`.**
4. Layout : afficher `session('success')` dans `<main>` ; lien « Nouvelle quête » dans `partials/nav.blade.php`.
5. **Envoyer le formulaire : 419 Page Expired.** Laisser deviner. Ne pas expliquer : c'est le chapitre 02.

## b. `@csrf` — chapitre 02 (tag `s5-ch2-csrf`)

Ajouter `@csrf` juste après `<form ...>`, recharger, renvoyer : la quête est créée, redirection vers la fiche, bannière « Quête créée ! ». DevTools : montrer l'input caché `_token`. Recharger : la bannière disparaît (flash).

Moment léger : retirer `@csrf` d'un second formulaire pour retrouver le 419 avec la salle.

## c. Valider — chapitre 03 (tag `s5-ch3-validation`)

1. Provoquer d'abord la douleur : titre vide, `xp = beaucoup`. **SQLite accepte `beaucoup`** (MariaDB lèverait une 500) : la donnée pourrie est enregistrée.
2. `store()` :

```php
$validated = $request->validate([
    'title' => ['required', 'string', 'max:100'],
    'description' => ['required', 'string'],
    'xp' => ['required', 'integer', 'min:0', 'max:500'],
    'difficulty' => ['required', Rule::in(['easy', 'medium', 'hard'])],
    'category_id' => ['required', 'exists:categories,id'],
]);

$quest = Quest::create($validated);
```

(`use Illuminate\Validation\Rule;`.)

3. Vue : sous chaque champ `@error('champ') <p class="error">{{ $message }}</p> @enderror` ; `old('champ')` dans les inputs ; `{{ old('description') }}` entre les balises du `textarea` ; `@selected(old('difficulty') === 'easy')` et `@selected((int) old('category_id') === $category->id)`.
4. Resoumettre titre vide : message + saisie conservée. Montrer qu'un `required` HTML se contourne dans les DevTools.

## d. Éditer et supprimer à la main — chapitre 04 (tag `s5-ch4-edition`)

1. Routes à la main :

```php
Route::get('/quests/{id}/edit', [QuestController::class, 'edit'])->name('quests.edit');
Route::put('/quests/{id}', [QuestController::class, 'update'])->name('quests.update');
Route::delete('/quests/{id}', [QuestController::class, 'destroy'])->name('quests.destroy');
```

2. `edit(int $id)` : `findOrFail`, vue `quests.edit` (quête + catégories). `update(Request $request, int $id)` : `findOrFail`, **mêmes règles recopiées**, `$quest->update($validated)`, redirection fiche. Faire remarquer la duplication.
3. `quests/edit.blade.php` : `@csrf`, `@method('PUT')`, `old('title', $quest->title)`, `@selected(old('difficulty', $quest->difficulty) === 'easy')`. Montrer l'input caché `_method`.
4. `destroy(int $id)` **sans** `detach()` d'abord : supprimer une quête seedée → **500** (clé étrangère de `location_quest`). Puis ajouter `$quest->locations()->detach();` avant `delete()`.
5. Fiche : lien « Modifier » + formulaire `@csrf @method('DELETE')` (jamais un lien GET).

## e. `Route::resource` + binding — chapitre 05 (tag `s5-ch5-resource`)

1. Compter la répétition (7 routes, 4 `findOrFail`), puis remplacer **toutes** les routes des quêtes par :

```php
Route::resource('quests', QuestController::class);
```

2. `sail artisan route:list --name=quests` : mêmes noms, paramètre `{quest}`.
3. Signatures : `show(Quest $quest)`, `edit(Quest $quest)`, `update(Request $request, Quest $quest)`, `destroy(Quest $quest)` ; supprimer les `findOrFail`. Tester `/quests/999` : 404 automatique.
4. Vues : `route('quests.show', $quest)` (et non `->id`). Piège à montrer : `{quest}` ↔ `$quete` ne bind pas.

## f. Form Requests — chapitre 06 (tag `s5-ch6-form-request`)

```bash
sail artisan make:request StoreQuestRequest
sail artisan make:request UpdateQuestRequest
```

Coller (cf. `solution/app/Http/Requests/`) `authorize(): true` (S6), `rules()` déplacées depuis le contrôleur, `messages()`. `store(StoreQuestRequest $request)` → `Quest::create($request->validated())` ; `update(UpdateQuestRequest $request, Quest $quest)` → `$quest->update($request->validated())`. Retester : mêmes erreurs, même `old()`.

## g. Le service — chapitre 07, **démo** (tag `s5-ch7-services`)

1. Nouvelle règle : une seule quête « à la une » ; lieux de la quête. Montrer le `store()` qui grossit.
2. Formulaires (create + edit) : `<input type="hidden" name="featured" value="0">` + case `featured` ; cases `location_ids[]` (cf. `solution/resources/views/quests/create.blade.php`). Form Requests : `featured` (`boolean`), `location_ids` (`array`), `location_ids.*` (`exists:locations,id`).
3. Créer `app/Services/QuestService.php` à la main (`create`, `update`, `unfeatureOthers` privée avec `whereKeyNot`) : cf. `solution/app/Services/QuestService.php`.
4. Contrôleur : `public function __construct(private QuestService $quests) {}` et `$this->quests->create(...)` / `update(...)`. Jamais de `new` : le conteneur instancie.
5. Test : cocher « à la une » sur deux quêtes successives, vérifier qu'une seule reste à la une.

---

## Solution finale

`solution/` contient l'état final (back-office complet : `routes/web.php`, `QuestController`, `StoreQuestRequest`, `UpdateQuestRequest`, `QuestService`, vues `create`/`edit`/`index`/`show`, layout avec flash, nav, `forms.css` + `vite.config.js` mis à jour). Les formulaires `create` et `edit` dupliquent volontairement leurs champs.

```bash
cp -r seance-05/solution/* base/   # après seance-02 puis seance-03
sail npm run dev                    # forms.css est un nouveau point d'entrée Vite
```

## Rejouer la démo

```bash
sail artisan migrate:fresh --seed
```
