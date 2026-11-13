---
layout: chapter
transition: slide-left | slide-right
number: 05
duration: 22 min
---

# Route::resource et route model binding

- Déclarer les sept routes d'une ressource en une ligne
- Laisser Laravel charger le modèle avec le route model binding
- Retrouver la convention dans `make:controller --resource`

<!--
Transition : le chapitre précédent a laissé une douleur — sept routes à la main, quatre findOrFail identiques. Laravel a une convention pour ça.
Découpage : ≈ 8 min de slides (≈ 8 slides), démo flash ≈ 2 min — moments : `route:list` avant/après `Route::resource`, `/quests/999` → 404 par binding ; micro-pratique ≈ 12 min (slide « À vous », étape A5 + point de contrôle 2 — refactor, pas de nouvelle fonctionnalité).
Moment léger : le refactor vu par les tags — 5 routes et 4 findOrFail en moins, et tout marche encore. « Le meilleur code est celui qu'on supprime. »
Tag Campus Quest de fin de chapitre : s5-ch5-resource.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Route et méthode ci-dessous. Que se passe-t-il pour `/quests/999`, une quête qui n'existe pas ?"
  :options="[
    'Une erreur 500 : le modèle est introuvable',
    'Une page 404, sans que vous ayez écrit `findOrFail`',
    'Un objet `Quest` vide est injecté',
    'Rien ne se passe : la route ne correspond pas'
  ]"
  :answer="1"
>

```php
Route::get('/quests/{quest}', [QuestController::class, 'show']);

public function show(Quest $quest) { /* … */ }
```

</Quiz>

<!--
Réponse : 404 automatique. Laravel exécute le findOrFail pour vous — c'est le route model binding, vu à la slide « Le binding ».
Fausse piste fréquente : « objet vide » — vrai seulement si le nom du paramètre ne correspond pas à la variable (voir notes plus loin).
-->

---
transition: slide-up | slide-down
---

# Le problème : tout est répété

```php {all|1-3|5-8|all}
Route::get('/quests/{id}', [QuestController::class, 'show']);
Route::get('/quests/{id}/edit', [QuestController::class, 'edit']);
Route::put('/quests/{id}', [QuestController::class, 'update']);

public function show(int $id)  { $quest = Quest::findOrFail($id); /* … */ }
public function edit(int $id)  { $quest = Quest::findOrFail($id); /* … */ }
public function update(Request $request, int $id)  { $quest = Quest::findOrFail($id); /* … */ }
public function destroy(int $id)  { $quest = Quest::findOrFail($id); /* … */ }
```

<v-click at="1">

Sept routes, chacune avec ses noms, son verbe et son `{id}`.

</v-click>

<v-click at="2">

Quatre fois la même ligne `findOrFail`. Deux problèmes, **deux outils** : `Route::resource` pour les routes, le **binding** pour la recherche.

</v-click>

<!--
Compter ensemble : combien de lignes de routes aujourd'hui ? 7 avec index, create, store. Combien de findOrFail ? 4.
-->

---
transition: slide-up | slide-down
---

# `Route::resource` : sept routes en une ligne

```php
Route::resource('quests', QuestController::class);
```

Cette **seule ligne** remplace toutes les routes des quêtes — et leur donne un nom :

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

Mêmes noms que vos routes à la main : **rien à changer dans les vues**. Mais le paramètre s'appelle maintenant `{quest}`, plus `{id}`.

</v-click>

<!--
À retenir plutôt que par cœur : index/show = GET d'affichage, create/edit = GET des formulaires,
store/update/destroy = POST/PUT/DELETE de modification.
On peut limiter les routes générées : Route::resource('quests', C)->only(['index','show']) ou ->except([...]) — utile quand une route existe déjà.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le binding : `{quest}` devient `$quest`

::left::

````md magic-move
```php
public function show(int $id)
{
    $quest = Quest::findOrFail($id);

    return view('quests.show', ['quest' => $quest]);
}
```

```php
public function show(Quest $quest)
{
    return view('quests.show', ['quest' => $quest]);
}
```
````

::right::

Avant : `{id}` arrive brut dans `$id`, et `findOrFail()` fait la recherche — ou lève la 404.

<div v-click="1">

Après : `{quest}` dans la route + le type `Quest` dans la signature. Laravel **cherche le modèle lui-même** et lève la 404 s'il n'existe pas.

</div>

<div v-click="2">

<Definition term="Route model binding" translation="(Liaison route-modèle)">

Laravel **résout** le paramètre de route en instance du modèle — le `findOrFail` est exécuté pour vous.

</Definition>

</div>

<div v-click="3">

Règle : le nom du paramètre `{quest}` doit **correspondre** au nom de la variable `$quest`.

</div>

<!--
Question probable : « et si le nom ne correspond pas ? » → {quest} vers $quete : pas de binding — le conteneur
injecte une Quest vide (new Quest), sans erreur. Piège silencieux, d'où la règle du même nom.
-->

---
transition: slide-up | slide-down
---

# Le binding, étape par étape

<Steps
  :clicks="true"
  :items="[
    { title: 'GET /quests/5/edit', desc: 'Le routeur reconnaît {quest} = 5', icon: '🧭' },
    { title: 'Lecture de la signature', desc: 'edit(Quest $quest) : le type est un modèle' },
    { title: 'SELECT … WHERE id = 5', desc: 'Laravel charge la quête (404 si absente)', icon: '🗄️' },
    { title: 'edit() s\'exécute', desc: '$quest est déjà une instance prête à l\'emploi', icon: '✅' }
  ]"
/>

<!--
Même mécanisme d'injection que Request au chapitre 01 : le conteneur lit les types déclarés et fournit l'objet.
Le binding fonctionne pour show, edit, update et destroy — toutes les routes qui portent {quest}.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le contrôleur après refactor

::left::

```php {all|1-4|6-11|13-17|all}
public function edit(Quest $quest)
{
    return view('quests.edit', ['quest' => $quest, 'categories' => Category::all()]);
}

public function update(Request $request, Quest $quest)
{
    $validated = $request->validate([/* … les 5 règles … */]);
    $quest->update($validated);
    return redirect()->route('quests.show', $quest)->with('success', 'Quête mise à jour !');
}

public function destroy(Quest $quest)
{
    $quest->locations()->detach();
    $quest->delete();
    return redirect()->route('quests.index')->with('success', 'Quête supprimée !');
}
```

::right::

<div v-click="1">

`edit()` : plus de `findOrFail`, `$quest` arrive prêt.

</div>

<div v-click="2">

`update()` : le binding fournit la quête, le reste est **inchangé**.

</div>

<div v-click="3">

`destroy()` : même chose, et le `detach()` reste nécessaire.

</div>

<div v-click="4">

Les vues passent `$quest` plutôt que `$quest->id` : `route('quests.edit', $quest)` suffit, Laravel extrait l'id.

</div>

<!--
Il reste la duplication des règles entre store() et update() : c'est le chapitre 06.
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

Sur un projet neuf, c'est le point de départ : la convention est déjà écrite. Ici le contrôleur existe déjà — vous l'avez construit **méthode par méthode**.

</v-click>

<!--
make:controller refuse si le fichier existe (« Controller already exists ») sauf avec --force, qui écraserait notre code — ne pas le lancer.
-->

---
transition: slide-up | slide-down
---

# Panorama : les routes

<script setup>
import routes from '/references/routes'
</script>

<Panorama :items="routes" doc="https://laravel.com/docs/12.x/routing" at="s5-ch5" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# Panorama : le contrôleur

<script setup>
import controllers from '/references/controllers'
</script>

<Panorama :items="controllers" doc="https://laravel.com/docs/12.x/controllers" at="s5-ch5" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : passez en ressource

<Exercise title="WishFlix — Route::resource et binding" duration="12 min" level="guidé"
  :criteria="[
    'Les routes create/store/edit/update/destroy des jeux sont déclarées par Route::resource',
    'edit, update et destroy reçoivent un Game via le binding, sans findOrFail',
    'Toutes les pages marchent encore : création, édition, suppression'
  ]"
  :hints="[
    'La route /game/{id} (games.show) existe déjà : excluez index et show avec ->except([...])',
    'Le nom du paramètre doit correspondre à la variable : {game} ↔ $game',
    'sail artisan route:list --name=games montre ce que Laravel a généré'
  ]">

**Exercice** `05-formulaires-validation` — étape **A5** du README, puis **point de contrôle 2**.

C'est un **refactor** : mêmes pages, moins de code.

</Exercise>

<!--
Point de contrôle 2 dans le README (après A5). Palier de rattrapage : tag Campus Quest s5-ch5-resource.
-->
