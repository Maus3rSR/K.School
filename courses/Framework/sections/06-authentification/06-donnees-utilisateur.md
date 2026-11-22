---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 28 min
---

# Les données de l'utilisateur connecté

- Relier les utilisateurs aux quêtes par une table pivot
- Enregistrer un choix pour l'utilisateur connecté, sans doublon
- Afficher la liste « Mes quêtes »

<!--
Transition : le site sait qui vous êtes et ce que vous avez le droit de faire. Il est temps que chaque joueur ait SES données : les quêtes qu'il a acceptées.
Découpage : ≈ 10 min de slides (≈ 8 slides), démo flash ≈ 3 min — moments : « Accepter » → la fiche affiche « Vous avez accepté cette quête » ; attach() rejoué deux fois dans Tinker → erreur de clé primaire ; « Mes quêtes » et le total d'XP ; micro-pratique ≈ 15 min (slide « À vous », étape A6 + point de contrôle 3).
Moment léger : « Accepter 30 quêtes pour monter au classement, c'est tentant. Le Maître du jeu surveille. »
Tag Campus Quest de fin de chapitre : s6-ch6-mes-quetes.
-->

---
transition: slide-up | slide-down
---

# Une relation plusieurs-à-plusieurs, encore

<div class="text-sm">

<TableLinks
  :tables="[
    { id: 'users', name: 'users', columns: ['id', 'name'], pk: ['id'],
      rows: [[1, 'Joueur démo'], [2, 'Maître du jeu']] },
    { id: 'pivot', name: 'quest_user', columns: ['quest_id', 'user_id'], fk: ['quest_id', 'user_id'],
      rows: [[3, 1], [7, 1], [3, 2]], at: 1 },
    { id: 'quests', name: 'quests', columns: ['id', 'title'], pk: ['id'],
      rows: [[3, 'Le fantôme de la BU'], [7, 'Café au lait mystère']] }
  ]"
  :links="[
    { from: { table: 'pivot', row: 0, col: 'user_id' }, to: { table: 'users', row: 0 }, at: 2 },
    { from: { table: 'pivot', row: 1, col: 'user_id' }, to: { table: 'users', row: 0 }, at: 2 },
    { from: { table: 'pivot', row: 0, col: 'quest_id' }, to: { table: 'quests', row: 0 }, at: 2, variant: 'ok' },
    { from: { table: 'pivot', row: 1, col: 'quest_id' }, to: { table: 'quests', row: 1 }, at: 2, variant: 'ok' },
    { from: { table: 'pivot', row: 2, col: 'user_id' }, to: { table: 'users', row: 1 }, at: 3, variant: 'muted' },
    { from: { table: 'pivot', row: 2, col: 'quest_id' }, to: { table: 'quests', row: 0 }, at: 3, variant: 'muted' }
  ]"
/>

</div>

<v-click at="3">

Un joueur accepte **plusieurs** quêtes, une quête est acceptée par **plusieurs** joueurs : la table pivot `quest_user`, comme `location_quest` en S3.

</v-click>

<!--
Click 1 : la table pivot apparaît. Click 2 : les deux quêtes du joueur démo. Click 3 : la même quête 3, acceptée aussi par le Maître du jeu.
Nom de la table par convention : les deux modèles au singulier, dans l'ordre alphabétique — quest puis user.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La table pivot et la relation

::left::

```php {all|1-6|8-11}
// migration create_quest_user_table
Schema::create('quest_user', function (Blueprint $table) {
    $table->foreignId('quest_id')->constrained();
    $table->foreignId('user_id')->constrained();
    $table->primary(['quest_id', 'user_id']);
});

// app/Models/User.php
public function acceptedQuests(): BelongsToMany
{
    return $this->belongsToMany(Quest::class);
}
```

::right::

<div v-click="1">

Deux clés étrangères et une **clé primaire composée** : un même couple joueur-quête ne peut exister qu'une fois.

</div>

<div v-click="2">

La relation porte un nom **métier** : `acceptedQuests()`. Laravel retrouve la table `quest_user` par convention.

</div>

<!--
Exactement le schéma de location_quest en S3 : aucune notion nouvelle côté base.
Le nom de la méthode est libre : acceptedQuests() se lit mieux que quests() dans $user->acceptedQuests.
Démo : sail artisan migrate.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Le joueur clique deux fois de suite sur « Accepter la quête ». Le contrôleur appelle attach() à chaque clic. Que se passe-t-il au second clic ?"
  :options="[
    'La quête apparaît deux fois dans « Mes quêtes »',
    'Rien de plus : attach() ignore un lien qui existe déjà',
    'Une erreur 500 : le couple (quest_id, user_id) existe déjà en clé primaire',
    'Une erreur de validation s\'affiche sous le bouton'
  ]"
  :answer="2"
/>

<!--
Faites voter : « attach ignore le doublon » est l'intuition la plus fréquente… et elle est fausse.
attach() fait un INSERT, sans vérifier. Sans clé primaire composée, on aurait eu le doublon (réponse 1) ; avec, la base refuse : 500.
Démo : dans Tinker, $user->acceptedQuests()->attach(3) deux fois → QueryException (UNIQUE constraint failed).
-->

---
layout: two-cols-bottom
class: '!grid-cols-[minmax(0,13fr)_minmax(0,7fr)] gap-x-6'
transition: slide-up | slide-down
---

# Accepter une quête
`app/Http/Controllers/MyQuestController.php`

::left::

```php {all|1|3-5|7|all}
public function store(Request $request, Quest $quest)
{
    $request->user()
        ->acceptedQuests()
        ->syncWithoutDetaching([$quest->id]);

    return back()->with('success', 'Quête acceptée !');
}
```

::right::

<div v-click="1">

La quête arrive par le **binding** (S5) ; l'utilisateur, par la **requête**.

</div>

<div v-click="2">

`syncWithoutDetaching()` : ajoute le lien **s'il n'existe pas**, sans toucher aux autres. Deux clics, une seule ligne.

</div>

<div v-click="3">

`back()` : retour à la page d'où vient le formulaire, avec un message flash.

</div>

::bottom::

<div v-click="4">

Retenez : `attach()` **ajoute toujours**, `sync()` **remplace tout**, `syncWithoutDetaching()` **ajoute si absent**.

</div>

<!--
sync([$quest->id]) serait une erreur subtile : il retirerait toutes les AUTRES quêtes acceptées.
detach($quest->id) pour abandonner : c'est l'action destroy() du même contrôleur.
-->

---
transition: slide-up | slide-down
---

# Qui est l'utilisateur ?

<Compare badLabel="❌ L'id vient du formulaire" goodLabel="✅ L'utilisateur vient de la session">
  <template #bad>

```blade
<input type="hidden" name="user_id" value="7">
```

```php
User::find($request->input('user_id'))
    ->acceptedQuests()->attach($quest->id);
```

→ un `user_id` modifié dans les DevTools ajoute la quête **chez quelqu'un d'autre**

  </template>
  <template #good>

```php
$request->user()
    ->acceptedQuests()
    ->syncWithoutDetaching([$quest->id]);
```

→ le serveur sait qui est connecté : **rien** à envoyer depuis le navigateur

  </template>
</Compare>

<!--
Le réflexe de la S5 (category_id trafiqué dans les DevTools) s'applique ici : tout ce qui vient du formulaire se modifie.
L'identité de l'utilisateur ne doit JAMAIS transiter par un champ : elle vient de la session ouverte au chapitre 02.
-->

---
transition: slide-up | slide-down
---

# Les routes de « Mes quêtes »

```php {all|1,8|2-7}
Route::middleware('auth')->group(function () {
    Route::get('/mes-quetes', [MyQuestController::class, 'index'])
        ->name('my-quests.index');
    Route::post('/mes-quetes/{quest}', [MyQuestController::class, 'store'])
        ->name('my-quests.store');
    Route::delete('/mes-quetes/{quest}', [MyQuestController::class, 'destroy'])
        ->name('my-quests.destroy');
});
```

<div class="grid grid-cols-2 gap-6 mt-2">

<div v-click="1">

Un groupe `auth` **sans** `can:admin` : tout joueur connecté a ses quêtes.

</div>

<div v-click="2">

Lister, accepter, abandonner : trois routes, un contrôleur.

</div>

</div>

<!--
Un invité qui enverrait le POST à la main serait renvoyé vers /login par le middleware auth.
-->

---
layout: two-cols-header
layoutClass: gap-x-6 !grid-cols-[minmax(0,13fr)_minmax(0,7fr)]
transition: slide-up | slide-down
---

# Le bouton dans la fiche
`resources/views/quests/show.blade.php`

::left::

```blade {all|2|5-8}
@auth
    @if (Auth::user()->acceptedQuests->contains($quest))
        <p>✅ Vous avez accepté cette quête.</p>
    @else
        <form method="POST" action="{{ route('my-quests.store', $quest) }}">
            @csrf
            <button type="submit">Accepter la quête</button>
        </form>
    @endif
@endauth
```

::right::

Le bloc entier est entouré de `@auth` : un invité ne voit rien.

<div v-click="1">

`contains()` teste si la quête est **déjà** dans la collection du joueur.

</div>

<div v-click="2">

Sinon, un formulaire `POST` vers `my-quests.store`, avec `@csrf`.

</div>

<!--
Auth::user()->acceptedQuests (sans parenthèses) charge la collection une fois ; contains() cherche dedans, sans nouvelle requête.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Mes quêtes

::left::

```php {all|3-7}
public function index(Request $request)
{
    $quests = $request->user()
        ->acceptedQuests()
        ->with('category')
        ->orderByDesc('xp')
        ->get();

    return view('my-quests.index', ['quests' => $quests]);
}
```

::right::

<div v-click="1">

`acceptedQuests()` avec parenthèses : une **requête** à compléter (S3), avec l'eager loading et le tri de la S4.

</div>

<v-click>

<Browser url="localhost/mes-quetes" title="Campus Quest">
  <div class="p-4 text-left text-sm">
    <div class="text-lg font-bold mb-2">Mes quêtes</div>
    <div class="flex justify-between py-1"><span>Le fantôme de la BU — Mission</span><span>120 XP · Abandonner</span></div>
    <div class="flex justify-between py-1"><span>Café au lait mystère — Quiz</span><span>40 XP · Abandonner</span></div>
    <div class="mt-2 font-bold">Total : 160 XP</div>
  </div>
</Browser>

</v-click>

<!--
Démo : accepter deux quêtes, ouvrir « Mes quêtes » (lien dans la barre, @auth), puis la Debugbar : 1 requête pour les quêtes, 1 pour les catégories — pas de N+1.
Le total est un $quests->sum('xp') sur la collection : pas de nouvelle requête.
-->

---
transition: slide-up | slide-down
---

# À vous : ma wishlist

<Exercise title="WishFlix — ajouter un jeu à sa wishlist" duration="15 min" level="guidé"
  :criteria="[
    'La table game_user existe, User a une relation wishlist()',
    'Connecté, la fiche jeu propose « Ajouter à ma wishlist », puis indique que le jeu y est',
    'Deux clics sur le bouton n\'ajoutent le jeu qu\'une fois'
  ]"
  :hints="[
    'make:migration create_game_user_table : même structure que la pivot des plateformes',
    'Route POST /wishlist/{game} dans un groupe auth, nommée wishlist.store',
    'syncWithoutDetaching() sur la relation de l\'utilisateur connecté, comme dans la démo'
  ]">

**Exercice** `06-authentification-securite` — étape **A6** du README, puis **point de contrôle 3**.

La page `/wishlist` elle-même devient dynamique **chez vous** (Partie B).

</Exercise>

<!--
Point de contrôle 3 dans le README (après A6). Palier de rattrapage : tag Campus Quest s6-ch6-mes-quetes.
La route GET /wishlist (S2, US1) existe déjà en statique : on n'y touche pas en séance — la Partie B la rend dynamique et la protège.
-->
