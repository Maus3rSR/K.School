---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 25 min
---

# Routing

- Définir une route : verbe HTTP, URL, action
- Capturer et contraindre des paramètres d'URL
- Nommer les routes et générer leurs URL

<!--
Transition : en S1 on a vu l'architecture ; aujourd'hui on fait répondre le site à de vraies URL.
-->

---
transition: slide-up | slide-down
---

# Routing
Qu'est-ce qu'une route ?

<Definition term="Route">

Une association entre une **URL**, un **verbe HTTP** et l'**action** à exécuter.

</Definition>

<v-click>

<Analogy title="Comme le standard du campus" icon="☎️">

Vous appelez le standard et demandez « la scolarité » : le standardiste vous **aiguille** vers le bon bureau. Le router de Laravel fait pareil : il reçoit l'URL demandée et la transmet à la bonne action.

</Analogy>

</v-click>

<!--
Faire trouver d'autres exemples d'aiguillage : panneaux d'un hall, accueil d'un hôpital.
Le "router" est la partie de Laravel qui lit routes/web.php et choisit la route qui correspond à l'URL.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Routing
Votre première route

::left::

```php {none|1|2|1-3}
Route::get('/quests', function () {
    return 'Liste des quêtes';
});
```

::right::

<div v-click="1">

`Route::get('/quests', ...)` — « quand le navigateur demande `/quests` en **GET**… »

</div>

<div v-click="2">

`return '...'` — « … exécute cette action et renvoie la réponse. »

</div>

<div v-click="3">

L'action est ici une **closure** : une fonction anonyme définie à la volée. La chaîne retournée devient le corps de la réponse HTTP.

</div>

<!--
La route vit dans routes/web.php. La faire taper en direct si le projet de démo existe.
Question probable : "c'est quoi function () { } ?" → closure, vue en S1.
-->

---
transition: slide-up | slide-down
---

# Routing
Un verbe HTTP par intention

| Verbe | Intention | Exemple Campus Quest |
|-------|-----------|----------------------|
| `GET` | Lire une ressource | Voir la liste des quêtes, une fiche |
| `POST` | Créer une ressource | Proposer une nouvelle quête |
| `PUT` / `PATCH` | Modifier une ressource | Corriger le titre d'une quête |
| `DELETE` | Supprimer une ressource | Retirer une quête terminée |

<!--
En S2 on ne fait que du GET : les formulaires et les autres verbes arrivent en S5.
Mentionner que Route::post, Route::put, Route::delete existent avec la même syntaxe.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Routing
Faire évoluer la route

::left::

````md magic-move
```php
Route::get('/quests', function () {
    return 'Liste des quêtes';
});
```

```php
Route::get('/quests/{id}', function ($id) {
    return "Quête n°{$id}";
});
```

```php
Route::get('/quests/{id}', function ($id) {
    return "Quête n°{$id}";
})->whereNumber('id');
```

```php
Route::get('/quests/{id}', function ($id) {
    return "Quête n°{$id}";
})->whereNumber('id')->name('quests.show');
```
````

::right::

La route `/quests` de tout à l'heure, **enrichie étape par étape**.

<div v-click="1">

`{id}` — le paramètre **capture** un segment d'URL et le passe à l'action : `/quests/3` → « Quête n°3 ». Sans contrainte, `/quests/abc` est accepté aussi. Un paramètre peut être **optionnel** : `{difficulty?}` répond aussi à `/quests`.

</div>

<div v-click="2">

`->whereNumber('id')` — la **contrainte** filtre les valeurs acceptées : `/quests/abc` → **404** renvoyée par le router, avant même d'entrer dans l'action.

</div>

<div v-click="3">

`->name('quests.show')` — la route est **nommée** : on pourra générer son URL avec `route()`.

</div>

<!--
Piège classique : oublier le nom identique entre {id} et le paramètre $id.
Autres contraintes : whereAlpha, where('id', '[0-9]+').
La 404 d'un paramètre invalide est renvoyée par le router, sans jamais entrer dans l'action.
-->

---
transition: slide-up | slide-down
---

# Routing
Générer les URL avec route()

Dans une vue ou un contrôleur, l'URL se génère à partir du **nom** de la route :

```blade
{{ route('quests.show', 3) }}   →   /quests/3
```

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

N'écrivez jamais une URL en dur (`href="/quests/3"`). Générez-la avec `route()` : si l'URL change, le nom reste et les liens continuent de fonctionner.

</KeyPoint>

</v-click>

<!--
Anecdote : un projet où l'on passe de /quest/{id} à /defis/{id} — avec route() on change une ligne, en dur on chasse 40 liens.
-->

---
transition: slide-up | slide-down
---

# Routing
Inspecter toutes les routes de l'application

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan route:list', out: '  GET|HEAD   / ........................................................\n  GET|HEAD   quests ......... quests.index › QuestController@index\n  GET|HEAD   quests/{id} ...... quests.show › QuestController@show\n  GET|HEAD   storage/{path} ............................ storage.local\n  GET|HEAD   up ......................................................\n\n                                                  Showing [5] routes' }
  ]"
/>

<!--
`up` est la route de santé configurée dans bootstrap/app.php (vue en S1, exercice 1).
`storage/{path}` sert les fichiers du disque public.
Faire lancer la commande par les apprenants sur leur projet S1 : ils n'y verront que / et up.
-->
