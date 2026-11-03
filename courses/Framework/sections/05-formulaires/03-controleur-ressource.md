---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 20 min
---

# Le contrôleur ressource

- Déclarer les sept routes d'une ressource avec `Route::resource`
- Récupérer le modèle via le route model binding
- Éditer et supprimer avec PUT et DELETE

<!--
Transition : créer, c'est fait. Le back-office complet a besoin des autres écrans — Laravel a une convention pour tout un CRUD.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Générer le squelette ressource

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:controller QuestController --resource --model=Quest', out: '   INFO  Controller [app/Http/Controllers/QuestController.php] created successfully.' }
  ]"
/>

::right::

- `--resource` génère les **sept méthodes vides** : `index`, `create`, `store`, `show`, `edit`, `update`, `destroy`
- `--model=Quest` pré-remplit les signatures avec le modèle `Quest`

<v-click>

Notre `QuestController` existe déjà depuis la S2 — on **ajoute les méthodes à la main**, mais le squelette montre la convention exacte à suivre.

</v-click>

<!--
Sur un projet neuf, la commande crée le contrôleur complet d'un coup — pratique à retenir.
Ici le fichier existe : make:controller refuse (« Controller already exists ») sauf avec --force, qui écraserait
notre code — on ne le lance pas, on montre seulement les noms des 7 actions.
-->

---
transition: slide-up | slide-down
---

# `Route::resource` : sept routes en une ligne

```php
Route::resource('quests', QuestController::class);
```

Cette **seule ligne** remplace les deux routes de la S2 — et en ajoute cinq :

| **Verbe** | **URI** | **Action** | **Nom de route** |
|---|---|---|---|
| GET | `/quests` | `index` | `quests.index` |
| GET | `/quests/create` | `create` | `quests.create` |
| POST | `/quests` | `store` | `quests.store` |
| GET | `/quests/{quest}` | `show` | `quests.show` |
| GET | `/quests/{quest}/edit` | `edit` | `quests.edit` |
| PUT/PATCH | `/quests/{quest}` | `update` | `quests.update` |
| DELETE | `/quests/{quest}` | `destroy` | `quests.destroy` |

<v-click>

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan route:list --name=quests', out: '  GET|HEAD   quests          quests.index   › QuestController@index\n  GET|HEAD   quests/create   quests.create  › QuestController@create\n  POST       quests          quests.store   › QuestController@store\n  GET|HEAD   quests/{quest}  quests.show    › QuestController@show\n  … 4 autres routes' }
  ]"
/>

Même URI pour `show`, `update` et `destroy` : c'est **le verbe HTTP** qui choisit l'action.

</v-click>

<!--
À retenir plutôt que par cœur : index/show = GET d'affichage, create/edit = GET des formulaires,
store/update/destroy = POST/PUT/DELETE de modification.
On peut limiter les routes générées : Route::resource('quests', C)->only(['index','show']) — en notes seulement.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Route model binding
Le `findOrFail` disparaît

::left::

````md magic-move
```php
Route::get('/quests/{id}', [QuestController::class, 'show']);

public function show(int $id)
{
    $quest = Quest::findOrFail($id);

    return view('quests.show', ['quest' => $quest]);
}
```

```php
Route::get('/quests/{quest}', [QuestController::class, 'show']);

public function show(Quest $quest)
{
    return view('quests.show', ['quest' => $quest]);
}
```
````

::right::

Aujourd'hui : `{id}` arrive brut dans `$id`, et `findOrFail()` fait la recherche — ou lève la 404.

<div v-click="1">

`{quest}` + le type `Quest` dans la signature : Laravel **cherche le modèle lui-même** et lève la 404 s'il n'existe pas. Règle : le nom du paramètre `{quest}` doit **correspondre** au nom de la variable `$quest`.

</div>

<div v-click="2">

<Definition term="Route model binding">

Laravel **résout** le paramètre de route en instance du modèle — le `findOrFail` est exécuté pour vous.

</Definition>

</div>

<!--
Question probable : « et si le nom ne correspond pas ? » → {quest} vers $quete : pas de binding — le conteneur
injecte une Quest vide (new Quest), sans erreur. Piège silencieux, d'où la règle du même nom.
edit(), update() et destroy() profitent du même mécanisme — on le voit sur les slides suivantes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le formulaire d'édition
`resources/views/quests/edit.blade.php`

::left::

```blade {all|1-3|5-6|8-9|all}
<form method="POST" action="{{ route('quests.update', $quest) }}">
    @csrf
    @method('PUT')

    <input id="title" name="title" type="text" value="{{ $quest->title }}">
    {{-- description, xp, difficulty, category_id : mêmes champs, pré-remplis --}}

    <button type="submit">Enregistrer les modifications</button>
</form>
```

::right::

<div v-click="1">

L'`action` vise `quests.update` **avec la quête**. `@method('PUT')` ajoute un champ caché `_method` : un formulaire HTML ne connaît que **GET et POST**.

</div>

<div v-click="2">

Chaque champ est **pré-rempli** : `value="{{ $quest->title }}"` — le formulaire affiche la quête actuelle.

</div>

<div v-click="3">

Au submit : `POST /quests/5` + `_method=PUT` → Laravel lit `_method` et **dispatche vers `update()`**.

</div>

<div v-click="4">

<Definition term="Method spoofing" translation="(Usurpation de méthode)">

Le champ caché `_method` fait passer un PUT, PATCH ou DELETE **dans** un POST — seule façon pour un formulaire HTML.

</Definition>

</div>

<!--
edit() passe la quête à la vue : edit(Quest $quest) → view('quests.edit', ['quest' => $quest]).
Duplication create/edit : les champs sont identiques — on peut les factoriser dans un partial
@include('quests._form'). À faire en atelier si le temps le permet, pas indispensable pour suivre.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `update()` et `destroy()`

::left::

```php {all|1-5|7-11|all}
public function update(Request $request, Quest $quest)
{
    $quest->update($request->only(['title', 'description', 'xp', 'difficulty', 'category_id']));
    return redirect()->route('quests.show', $quest)->with('success', 'Quête mise à jour !');
}

public function destroy(Quest $quest)
{
    $quest->delete();
    return redirect()->route('quests.index')->with('success', 'Quête supprimée !');
}
```

::right::

<div v-click="1">

`update()` — le binding fournit `$quest`, `$quest->update(...)` applique les champs ; redirection vers **la fiche** avec un message.

</div>

<div v-click="2">

`destroy()` — `$quest->delete()` puis retour à **la liste**, toujours en PRG.

</div>

<div v-click="3">

Sept actions, un seul contrôleur — encore fin, mais `store()` et `update()` n'ont **aucune validation** : chapitre suivant.

</div>

<!--
Même squelette partout : lire la requête → toucher le modèle → redirect()->route(...)->with(...).
-->

---
transition: slide-up | slide-down
---

# Supprimer : un formulaire, pas un lien
Le bouton « Supprimer » à côté de chaque quête

<Compare badLabel="❌ Un lien GET" goodLabel="✅ Un formulaire DELETE">
  <template #bad>

```blade
<a href="/quests/5/delete">Supprimer</a>
```

Un **GET destructeur** : déclenché par un prefetch ou un aspirateur de liens — et forgeable depuis n'importe quel site piégé.

  </template>
  <template #good>

```blade
<form method="POST" action="{{ route('quests.destroy', $quest) }}">
    @csrf
    @method('DELETE')
    <button type="submit">Supprimer</button>
</form>
```

Verbe **DELETE** + jeton **CSRF** : seule la page qui affiche le formulaire peut supprimer.

  </template>
</Compare>

<!--
Faire le lien avec le chapitre 2 : le lien GET ne peut même pas porter de jeton — il serait à la fois
dangereux ET sans protection. Le formulaire DELETE coche les deux cases : bon verbe, jeton inclus.
Anecdote : les aspirateurs hors-ligne et les prefetch de navigateurs ont déjà vidé des bases via des liens « delete ».
-->
