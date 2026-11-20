---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 40 min
---

# Le formulaire de création

- Choisir entre `GET` et `POST` pour envoyer des données
- Afficher un formulaire avec une route `GET`
- Traiter l'envoi avec une route `POST`, puis rediriger

<!--
Transition : le Maître du jeu veut créer ses quêtes dans le navigateur. Première brique : le formulaire.
Moment léger (running gag Campus Quest) : « Hier, le Maître du jeu a voulu ajouter une quête… il a ouvert Tinker,
tapé Quest::create( et refermé le terminal en pleurant. » Aujourd'hui, on lui offre un vrai écran.
Tag Campus Quest de fin de chapitre : s5-ch1-formulaire.
Découpage : ≈ 17 min de slides (≈ 15 slides), démo flash ≈ 3 min — moment : envoyer le formulaire → **419** (le tag ch1 n'a pas `@csrf`) ; micro-pratique ≈ 20 min (slide « À vous », étape A1 du README) juste avant « Premier envoi… » : chacun constate le 419.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Le Maître du jeu va saisir une nouvelle quête dans un formulaire. Avec quelle méthode HTTP le formulaire doit-il l'envoyer, et pour quelle raison ?"
  :options="[
    '`GET` : c\'est la méthode par défaut d\'un formulaire, Laravel s\'adapte',
    '`POST` : les données sont chiffrées, donc protégées des curieux',
    '`POST` : la requête crée une donnée, elle ne doit pas pouvoir être rejouée par un simple lien',
    '`GET` : les saisies restent visibles dans l\'URL, c\'est plus facile à déboguer'
  ]"
  :answer="2"
/>

<!--
Les quatre réponses sont des raisonnements qu'on entend vraiment — faites voter, puis demandez à un défenseur de chaque réponse de se justifier.
- « GET par défaut » : vrai (un <form> sans method envoie en GET)… mais ce n'est pas une raison de le garder.
- « POST chiffré » : faux — POST n'est ni chiffré ni caché ; seul HTTPS chiffre, et il chiffre GET comme POST.
- « GET plus facile à déboguer » : vrai… et c'est justement le problème : un lien /quests/store?title=… recréerait une quête à chaque clic.
- Le vrai critère, déjà croisé en S2 (« un verbe HTTP par intention ») : la requête modifie-t-elle quelque chose ? Oui → POST.
-->

---
transition: slide-up | slide-down
---

# GET ou POST ?

| **Critère** | GET | POST |
|---|---|---|
| **Où voyagent les données** | Dans l'URL (`?difficulty=easy`) | Dans le corps de la requête, hors de l'URL |
| **Marque-page / partage d'URL** | Oui, l'URL suffit | Non, les données ne sont pas dans l'URL |
| **Effet sur le serveur** | Lecture seule, sans effet de bord | Peut créer, modifier, supprimer |
| **Usage typique** | Recherche, filtres, navigation | Inscription, paiement, suppression |

Une recherche en `GET` peut être **enregistrée en favori** ou partagée ; une création en `POST` ne doit **jamais** être rejouée en rechargeant une URL.

<!--
POST n'est pas « plus sûr » : les données sont simplement dans le corps, lisibles dans les DevTools.
Le vrai critère : la requête modifie-t-elle quelque chose ? Oui → POST. Non → GET.
Lien avec S2 : le filtre ?difficulty=easy de la liste était un GET — logique, il ne modifie rien.
-->

---
transition: slide-up | slide-down
---

# Rappel : anatomie d'une requête HTTP
Vue en S2 — cette fois, avec un corps

<HttpRequest
  method="POST"
  url="/login"
  :headers="[['Host', 'www.exemple.fr'], ['User-Agent', 'Firefox'], ['Content-Type', 'application/json']]"
  body='{ "user": "alice", "mdp": "••••••" }'
/>

<!--
Rappel de la S2 (chapitre Routing) : la même structure en 4 parties.
Un GET s'arrête à la ligne vide (3) : ses données sont dans l'URL de la ligne 1.
Un POST remplit la partie 4, le corps — et l'en-tête Content-Type annonce dans quel format il est écrit.
Ici c'est du JSON : c'est ce qu'enverrait une API ou un fetch() JavaScript. Et un formulaire HTML ? Slide suivante.
-->

---
transition: slide-up | slide-down
---

# Que contient le corps ?
L'en-tête `Content-Type` annonce le format

| **Format** | `Content-Type` | **Usage courant** |
|---|---|---|
| **Formulaire encodé** | <span v-mark.circle.orange="1">`application/x-www-form-urlencoded`</span> | Formulaires simples : `title=Salle+404&xp=50` |
| **Formulaire multipart** | <span v-mark.circle.blue="2">`multipart/form-data`</span> | Formulaires avec fichiers (avatar, image…) |
| **JSON** | `application/json` | API web : objets et tableaux structurés |
| **Texte brut** | `text/plain` | Texte sans structure particulière |
| **XML** | `application/xml` | API ou systèmes qui échangent du XML |
| **Binaire** | `application/octet-stream` | Fichier ou données binaires génériques |

<div v-click="1">

Un `<form method="POST">` envoie **par défaut** du `x-www-form-urlencoded` : les paires `name=valeur` de vos champs, séparées par `&`.

</div>

<div v-click="2">

Pour envoyer un fichier, il faut le demander : `<form method="POST" enctype="multipart/form-data">`.

</div>

<!--
Clic 1 : le format par défaut d'un formulaire HTML — c'est celui de Campus Quest aujourd'hui. Même encodage que la query string d'un GET, mais dans le corps.
Clic 2 : multipart n'arrive que si on l'écrit (enctype) ; pas d'upload dans ce chapitre.
Côté Laravel, peu importe le format : $request->input('title') lit la valeur, qu'elle vienne d'un formulaire encodé, multipart ou de JSON.
Geste à montrer en démo : DevTools > Réseau > la requête POST /quests > onglet « Requête » : title=…&xp=… (Content-Type visible dans les en-têtes).
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Les routes et l'action `create()`

::left::

```php {all|2-4|5-7|all}
// routes/web.php
Route::get('/quests/create',
    [QuestController::class, 'create'])
    ->name('quests.create');
Route::post('/quests',
    [QuestController::class, 'store'])
    ->name('quests.store');
```

<div v-click="3">

```php
// QuestController.php
public function create()
{
    return view('quests.create', [
        'categories' => Category::all(),
        'locations' => Location::all(),
    ]);
}
```

</div>

::right::

<div v-click="1">

Le `GET` affiche le formulaire. `/quests/create` n'est pas capturée par `/quests/{id}` : le `whereNumber('id')` de la S2 n'accepte que des chiffres.

</div>

<div v-click="2">

Le `POST` vise la **même URL que la liste** : c'est le verbe qui change l'action.

</div>

<div v-click="3">

`create()` passe `Category::all()` (le `<select>`) **et** `Location::all()` (les cases « Lieux ») à la vue.

</div>

::bottom::

<div v-click="4">

Retenez : **une route `GET` pour afficher, une route `POST` pour traiter**.

</div>

<!--
N'oubliez pas les imports use App\Models\Category; et use App\Models\Location; en tête du contrôleur.
Un lien « Nouvelle quête » dans partials/nav.blade.php : route('quests.create').
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le formulaire Blade
`resources/views/quests/create.blade.php`

::left::

```blade {all|1|2-9|11-16|18-23|27|all}{maxHeight:'300px'}
<form method="POST" action="{{ route('quests.store') }}">
    <label for="title">Titre</label>
    <input id="title" name="title" type="text">

    <label for="description">Description</label>
    <textarea id="description" name="description"></textarea>

    <label for="xp">XP</label>
    <input id="xp" name="xp" type="number">

    <label for="difficulty">Difficulté</label>
    <select id="difficulty" name="difficulty">
        <option value="easy">Facile</option>
        <option value="medium">Moyenne</option>
        <option value="hard">Difficile</option>
    </select>

    <label for="category_id">Catégorie</label>
    <select id="category_id" name="category_id">
        @foreach ($categories as $category)
            <option value="{{ $category->id }}">{{ $category->name }}</option>
        @endforeach
    </select>

    {{-- lieux et « à la une » : slide suivante --}}

    <button type="submit">Créer la quête</button>
</form>
```

::right::

<div v-click="1">

`method="POST"` vers la **route nommée** `quests.store`.

</div>

<div v-click="2">

Chaque champ a un `name` : c'est la **clé** sous laquelle la saisie arrivera au serveur (`$request->input('title')`…).

</div>

<div v-click="3">

`<select>` difficulté : les **mêmes valeurs** que la `QuestFactory` — `easy`, `medium`, `hard`.

</div>

<div v-click="4">

`<select>` catégories : on boucle sur `$categories`, **fournie par le contrôleur** — `value` = l'`id`, le texte = le `name`.

</div>

<div v-click="5">

Le `<button type="submit">` envoie **tout le formulaire** en `POST` vers `quests.store`.

</div>

::bottom::

<div v-click="6">

Retenez : **`name` = clé, saisie = valeur** — le serveur reçoit un tableau associatif.

</div>

<!--
La vue complète étend le layout (@extends('layouts.app'), @section('content')) comme les vues de la S2.
Piège classique : oublier le name → le champ n'arrive jamais au serveur, sans erreur visible.
Les <label for> ne sont pas décoratifs : clic sur le libellé = focus dans le champ + accessibilité.
Volontairement, AUCUN @csrf ici : on le découvre à la fin du chapitre.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Cases à cocher : une saisie en tableau

::left::

```blade {all|1-9|11-14|all}
<fieldset>
    <legend>Lieux</legend>
    @foreach ($locations as $location)
        <label>
            <input type="checkbox" name="location_ids[]" value="{{ $location->id }}">
            {{ $location->name }}
        </label>
    @endforeach
</fieldset>

<label>
    <input type="checkbox" name="featured" value="1">
    Quête à la une
</label>
```

::right::

<div v-click="1">

`location_ids[]` — les crochets `[]` disent au serveur « c'est un **tableau** » : il reçoit **tous** les `id` cochés, dans `$request->input('location_ids')`.

</div>

<div v-click="2">

`featured` — une seule case : `value="1"` ne part que **si elle est cochée**.

</div>

<div v-click="3">

Une case **décochée n'envoie rien** : la clé est simplement absente — on gérera ça au chapitre 03.

</div>

<!--
Même mécanique name[] = tableau que les query strings répétées — le navigateur envoie location_ids[]=1&location_ids[]=3.
Les lieux cochés arrivent comme des chaînes : la validation du chapitre 03 vérifiera qu'ils existent.
Pas de champ caché pour l'instant : featured décoché = clé absente, donc absente de only() — la colonne garde sa valeur par défaut (false). Aucun lieu coché : input('location_ids', []) renvoie un tableau vide.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# L'action `store()`

::left::

```php {all|3|5-6|8-10|all}
public function store(Request $request)
{
    $data = $request->only(['title', 'description', 'xp', 'difficulty', 'category_id', 'featured']);

    $quest = Quest::create($data);
    $quest->locations()->sync($request->input('location_ids', []));

    return redirect()
        ->route('quests.show', $quest)
        ->with('success', 'Quête créée !');
}
```

::right::

<div v-click="1">

`Request` est **injecté** par Laravel ; `only()` ne garde que les champs attendus — `featured` en fait partie.

</div>

<div v-click="2">

`Quest::create()` insère la ligne (`$fillable` de la S3), puis `sync()` rattache les lieux cochés — **rappel S3** : `sync()` remplit la table pivot `location_quest` (aucune case → tableau vide).

</div>

<div v-click="3">

`redirect()->route(...)` renvoie vers **la fiche de la nouvelle quête** ; `with()` y joint un message.

</div>

::bottom::

<div v-click="4">

Le cycle complet : **soumettre → insérer → rediriger**.

</div>

<!--
route('quests.show', $quest) : on passe le modèle, Laravel en extrait l'id pour construire /quests/31.
Question probable : « pourquoi pas return view() après la création ? » → c'est la slide suivante (PRG).
-->

---
transition: slide-up | slide-down
---

# Post/Redirect/Get

<Steps
  :clicks="true"
  :items="[
    { title: 'POST /quests', desc: 'Le formulaire envoie les saisies', icon: '📮' },
    { title: 'INSERT', desc: 'store() enregistre la quête en base' },
    { title: '302 Redirect', desc: 'Le serveur répond « va voir /quests/31 »', icon: '↩️' },
    { title: 'GET /quests/31', desc: 'Le navigateur affiche la fiche créée', icon: '✅' }
  ]"
/>

<v-click>

<Definition term="Post/Redirect/Get">

Le pattern <KeyTerm>PRG</KeyTerm> : après un `POST` réussi, on répond par une **redirection** vers une page en `GET` — jamais par la page elle-même.

</Definition>

</v-click>

<v-click>

Sans redirection, un **F5** renverrait le formulaire une seconde fois — et créerait un doublon. Avec la redirection, F5 ne recharge qu'un inoffensif `GET`.

</v-click>

<!--
C'est la réponse à « pourquoi redirect() et pas view() » : la dernière requête de l'historique devient un GET,
rafraîchir ou partager la page est alors sans danger.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le message flash
Dans `layouts/app.blade.php`, commun à toutes les pages

::left::

```blade
{{-- resources/views/layouts/app.blade.php --}}
<main>
    @if (session('success'))
        <div class="flash">{{ session('success') }}</div>
    @endif

    @yield('content')
</main>
```

::right::

- `with('success', '…')` écrit en session une <KeyTerm>donnée flash</KeyTerm> : elle ne survit qu'à **une seule** requête
- `session('success')` la lit au prochain chargement — puis elle est oubliée : la bannière ne se répète pas à chaque page

<!--
Comparé à une session classique (panier, login) qui persiste, le flash s'auto-détruit après lecture.
On le verra fonctionner… dès que le formulaire passera. Slide suivante : premier essai.
-->

---
transition: slide-up | slide-down
---

# À vous : le formulaire de création

<Exercise title="WishFlix — formulaire de création d'un jeu" duration="20 min" level="guidé"
  :criteria="[
    '/games/create affiche un formulaire avec tous les champs du jeu et le select des catégories',
    'Vous avez cliqué sur « Créer » et regardé ce qui se passe',
    'Vous savez dire quel code HTTP et quel message vous avez reçus'
  ]"
  :hints="[
    'Deux routes : un GET pour afficher, un POST pour traiter',
    'L\'ordre du chapitre : routes → create() → vue → store() → flash dans le layout',
    'Une erreur à l\'envoi ? C\'est probablement le but : notez le code et le message'
  ]">

**Exercice** `05-formulaires-validation` — étape **A1** du README.

Transposez le chapitre sur les **jeux** WishFlix : routes, `create()`, vue, `store()`, flash.

**À la fin, remplissez le formulaire et envoyez-le.** Notez ce que vous obtenez : on en parle juste après.

</Exercise>

<!--
Point clé : les étudiants ne mettent PAS @csrf (il n'est pas dans les slides du chapitre) — ils doivent tous tomber sur le 419 par eux-mêmes. Ne leur soufflez rien.
Palier de rattrapage : tag Campus Quest s5-ch1-formulaire (relire le diff, refaire sur WishFlix).
-->

---
layout: center
transition: slide-up | slide-down
---

# Premier envoi…
Vous l'avez vu aussi ?

<Browser url="localhost/quests" title="Campus Quest">
  <div class="flex flex-col items-center justify-center h-60 text-2xl tracking-widest opacity-70">
    419 | PAGE EXPIRED
  </div>
</Browser>

<v-click>

Le formulaire est correct, les routes existent, le contrôleur aussi. **Qui refuse votre requête ?**

</v-click>

<!--
Les étudiants viennent de le vivre : demandez qui a eu le 419, faites lancer des hypothèses dans la salle (« ça marchait chez moi ! »).
« Page Expired » alors qu'on vient d'ouvrir la page : le message est trompeur, c'est voulu par Laravel.
Ne donnez pas la réponse : elle ouvre le chapitre suivant.
-->
