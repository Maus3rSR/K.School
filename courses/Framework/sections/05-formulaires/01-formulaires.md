---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 20 min
---

# Les formulaires HTML

- Distinguer GET et POST pour envoyer des données
- Écrire un formulaire Blade complet
- Enregistrer puis rediriger avec un message flash

<!--
Transition : le Maître du jeu veut créer ses quêtes dans le navigateur. Première brique : le formulaire.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Campus Quest gagne deux formulaires : une recherche de quêtes et l'inscription d'une nouvelle quête. Lequel doit partir en POST ?"
  :options="[
    'Le formulaire de recherche : ses critères doivent rester cachés',
    'Le formulaire de création : il modifie les données du serveur',
    'Les deux : POST est toujours plus sécurisé que GET',
    'Aucun des deux : le choix GET/POST est purement cosmétique'
  ]"
  :answer="1"
/>

<!--
Faites voter : beaucoup répondent « POST = plus sécurisé » — non, POST n'est ni chiffré ni caché, il transporte juste
autrement. La slide suivante compare concrètement les deux méthodes.
-->

---
transition: slide-up | slide-down
---

# GET ou POST ?

| **Critère** | GET | POST |
|---|---|---|
| **Où voyagent les données** | Dans l'URL (`?difficulty=easy`) | Dans le corps de la requête, invisibles |
| **Marque-page / partage d'URL** | Oui, l'URL suffit | Non, les données ne sont pas dans l'URL |
| **Effet sur le serveur** | Lecture seule, sans effet de bord | Peut créer, modifier, supprimer |
| **Usage typique** | Recherche, filtres, navigation | Inscription, paiement, suppression |

Une recherche en GET peut être **enregistrée en favori** ou partagée ; une création en POST ne doit **jamais** être rejouée en rechargeant une URL.

<!--
POST n'est pas « plus sûr » : les données sont simplement dans le corps, lisibles dans les DevTools.
Le vrai critère : la requête modifie-t-elle quelque chose ? Oui → POST. Non → GET.
Lien avec S2 : le filtre ?difficulty=easy de la liste était un GET — logique, il ne modifie rien.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le formulaire Blade
`resources/views/quests/create.blade.php`

::left::

```blade {all|1-2|4-11|13-18|20-25|27-28|all}
<form method="POST" action="{{ route('quests.store') }}">
    @csrf

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

    <button type="submit">Créer la quête</button>
</form>
```

::right::

<div v-click="1">

`method="POST"` vers la **route nommée** `quests.store`. `@csrf` ajoute un jeton de sécurité obligatoire — on y revient **au chapitre 2**.

</div>

<div v-click="2">

Chaque champ a un `name` : c'est la **clé** sous laquelle la saisie arrivera au serveur (`$request['title']`…).

</div>

<div v-click="3">

`<select>` difficulté : les **mêmes valeurs** que la `QuestFactory` — `easy`, `medium`, `hard`.

</div>

<div v-click="4">

`<select>` catégories : on boucle sur `$categories`, **fournie par le contrôleur** — `value` = l'`id`, le texte = le `name`.

</div>

<div v-click="5">

Le `<button type="submit">` envoie **tout le formulaire** en POST vers `quests.store`.

</div>

<div v-click="6">

Retenez : **`name` = clé, saisie = valeur** — le serveur reçoit un tableau associatif.

</div>

<!--
Piège classique : oublier le name → le champ n'arrive jamais au serveur, sans erreur visible.
Le @csrf : une ligne à dire « indispensable, explication au chapitre suivant » — ne pas dérouler le jeton maintenant.
Les <label for> ne sont pas décoratifs : clic sur le libellé = focus dans le champ + accessibilité.
-->

---
transition: slide-up | slide-down
---

# Le formulaire, côté navigateur

<Browser url="campus-quest.test/quests/create" title="Campus Quest">
  <Placeholder :w="800" :h="500" text="Formulaire de création de quête" />
</Browser>

Ce que Blade a produit n'est que **du HTML classique** : directives compilées, `@csrf` devenu un `<input type="hidden">`, la boucle devenue une liste d'`<option>`.

<!--
Ouvrir les DevTools > Éléments en démo : montrer l'input caché _token et les options du select catégories.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Les routes et le contrôleur

::left::

```php {all|1-3|5-9|11-15|all}
// routes/web.php — deux nouvelles routes
Route::get('/quests/create', [QuestController::class, 'create'])->name('quests.create');
Route::post('/quests', [QuestController::class, 'store'])->name('quests.store');

// app/Http/Controllers/QuestController.php
public function create()
{
    return view('quests.create', ['categories' => Category::all()]);
}

public function store(Request $request)
{
    Quest::create($request->only(['title', 'description', 'xp', 'difficulty', 'category_id']));
    return redirect()->route('quests.index')->with('success', 'Quête créée !');
}
```

::right::

<div v-click="1">

Deux routes : le **GET** affiche le formulaire, le **POST** le traite — même logique qu'en S2.

</div>

<div v-click="2">

`create()` passe `Category::all()` à la vue : c'est ce `$categories` que le `<select>` boucle.

</div>

<div v-click="3">

`store()` — `Request` est **injecté** par Laravel ; `only()` ne retient que les champs attendus (par prudence vis-à-vis du `$fillable`) ; `create()` insère ; `redirect()` + `with()` renvoie vers la liste **avec un message**.

</div>

<div v-click="4">

Le cycle complet : **soumettre → insérer → rediriger**.

</div>

<!--
$request->only() renvoie un tableau limité aux clés listées — un champ parasite envoyé par un formulaire
trafiqué est ignoré avant même d'atteindre le modèle.
Question probable : « pourquoi pas return view() après la création ? » → c'est toute la slide suivante (PRG).
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
    { title: '302 Redirect', desc: 'Le serveur répond « va voir /quests »', icon: '↩️' },
    { title: 'GET /quests', desc: 'Le navigateur affiche la liste à jour', icon: '✅' }
  ]"
/>

<v-click>

<Definition term="Post/Redirect/Get">

Le pattern <KeyTerm>PRG</KeyTerm> : après un POST réussi, on répond par une **redirection** vers une page en GET — jamais par la page elle-même.

</Definition>

</v-click>

<v-click>

Sans redirection, un **F5** renverrait le formulaire une seconde fois — et créerait un doublon. Avec la redirection, F5 ne recharge qu'un inoffensif GET.

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
@if (session('success'))
    <div class="flash">{{ session('success') }}</div>
@endif
```

::right::

- `with('success', '…')` écrit en session une <KeyTerm>donnée flash</KeyTerm> : elle ne survit qu'à **une seule** requête
- `session('success')` la lit au prochain chargement — puis elle est oubliée : la bannière ne se répète pas à chaque page

<v-click>

<Alert type="warning">

Rien n'est **validé** pour l'instant : un titre vide ou `xp = 'beaucoup'` serait enregistré tel quel — ou planterait. Rendez-vous au **chapitre 4**.

</Alert>

</v-click>

<!--
Démo : créer une quête → bannière « Quête créée ! », puis naviguer : elle a disparu. C'est la définition du flash.
Comparé à une session classique (panier, login) qui persiste, le flash s'auto-détruit après lecture.
-->
