---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 20 min
---

# Les services

- Repérer la logique métier qui s'accumule dans un contrôleur
- Extraire cette logique dans une classe de service
- Injecter le service via le constructeur

<!--
Transition : le back-office marche. Dernière couche de propreté : sortir le métier du contrôleur.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le contrôleur qui grossit
Les règles métier du Maître du jeu arrivent

::left::

```php
public function store(StoreQuestRequest $request)
{
    $data = $request->validated();

    // une seule quête « à la une »
    if ($data['featured'] ?? false) {
        Quest::where('featured', true)->update(['featured' => false]);
    }

    $quest = Quest::create(Arr::except($data, 'location_ids'));
    $quest->locations()->sync($data['location_ids'] ?? []);

    return redirect()->route('quests.index')->with('success', 'Quête créée !');
}
```

::right::

Deux **règles métier** s'invitent :

- Une seule quête **« à la une »** à la fois : si la nouvelle est `featured`, toutes les autres repassent à `false`
- Les **lieux** de la quête : la relation `belongsToMany` se remplit via `sync()` et `location_ids`

<v-click>

Le même code serait à **recopier** dans `update()` — et il n'a rien à voir avec HTTP : ni requête, ni réponse.

</v-click>

<!--
Question à poser : ce code appartiendrait aussi à une future commande Artisan ou à une API — on le copierait où ?
C'est le signal classique : le contrôleur connaît trop de choses, il faut un endroit « métier ».
Arr::except retire location_ids : ce n'est pas une colonne de quests, c'est la relation qu'on remplit avec sync().
Import à ajouter : use Illuminate\Support\Arr;
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Un endroit « métier » : le service

::left::

<Definition term="Service">

Une classe qui regroupe les **règles métier** d'un domaine — ici « gérer une quête » — hors du contrôleur.

</Definition>

<v-click>

<Analogy title="Comme au restaurant" icon="🍽️">

Le contrôleur est le **serveur** : il prend la commande (la requête) et apporte l'assiette (la réponse). Le service est la **cuisine** : les règles de préparation n'ont rien à faire en salle.

</Analogy>

</v-click>

::right::

<v-click>

<FileTree :tree="[
  { name: 'app', children: [
    { name: 'Http', children: [
      { name: 'Controllers' },
      { name: 'Requests' }
    ]},
    { name: 'Services', children: [
      { name: 'QuestService.php', highlight: true, comment: 'créé à la main' }
    ]}
  ]}
]" />

Pas de `make:service` : le dossier `app/Services/` et la classe se créent **soi-même** — simple classe PHP, sans héritage.

</v-click>

<!--
Appelé aussi « classe d'action » ou « use case » selon les écoles — l'idée est identique : isoler le métier.
Un service ne connaît ni Request ni Response : il prend des données et rend des modèles.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `QuestService` : la logique déménage

::left::

```php {all|3-9|11-17|19-26|all}
class QuestService
{
    public function create(array $data): Quest
    {
        $quest = Quest::create(Arr::except($data, 'location_ids'));
        $quest->locations()->sync($data['location_ids'] ?? []);
        $this->unfeatureOthers($quest);
        return $quest;
    }

    public function update(Quest $quest, array $data): Quest
    {
        $quest->update(Arr::except($data, 'location_ids'));
        $quest->locations()->sync($data['location_ids'] ?? []);
        $this->unfeatureOthers($quest);
        return $quest;
    }

    private function unfeatureOthers(Quest $quest): void
    {
        if ($quest->featured) {
            Quest::where('featured', true)
                ->whereKeyNot($quest->id)
                ->update(['featured' => false]);
        }
    }
}
```

::right::

<div v-click="1">

`create()` — insertion, lieux rattachés, règle « à la une » : **une seule fois**, ici.

</div>

<div v-click="2">

`update()` — les **mêmes règles** sans duplication.

</div>

<div v-click="3">

`unfeatureOthers()` — la règle en privé : si la quête est mise en avant, **toutes les autres** repassent à `false` (`whereKeyNot` = toutes sauf elle).

</div>

<div v-click="4">

Le service ne voit ni `Request` ni `redirect` : que des **données et des modèles**.

<Alert type="info">

Côté Form Request, ajoutez : `'location_ids' => ['array']`, `'location_ids.*' => ['exists:locations,id']`, `'featured' => ['boolean']`.

</Alert>

</div>

<!--
On peut envelopper le tout dans DB::transaction(...) pour que « créer + lieux + une » soit tout-ou-rien —
mention orale, ne pas alourdir la slide.
Pourquoi whereKeyNot : sinon la quête qu'on vient de sauvegarder se dé-« feature » elle-même.
Arr::except retire location_ids : ce n'est pas une colonne de quests, c'est la relation qu'on remplit avec sync().
Import à ajouter : use Illuminate\Support\Arr;
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Injecter le service

::left::

````md magic-move
```php
class QuestController extends Controller
{
    public function store(StoreQuestRequest $request)
    {
        $quest = Quest::create($request->validated());
        // + lieux à attacher, règle « à la une »…
        return redirect()->route('quests.index')->with('success', 'Quête créée !');
    }
}
```

```php
class QuestController extends Controller
{
    public function __construct(private QuestService $quests) {}

    public function store(StoreQuestRequest $request)
    {
        $this->quests->create($request->validated());
        return redirect()->route('quests.index')->with('success', 'Quête créée !');
    }
}
```

```php
class QuestController extends Controller
{
    public function __construct(private QuestService $quests) {}

    public function store(StoreQuestRequest $request)
    {
        $this->quests->create($request->validated());
        return redirect()->route('quests.index')->with('success', 'Quête créée !');
    }

    public function update(UpdateQuestRequest $request, Quest $quest)
    {
        $this->quests->update($quest, $request->validated());
        return redirect()->route('quests.show', $quest)->with('success', 'Quête mise à jour !');
    }
}
```
````

::right::

Avant : `store()` mélange HTTP et métier — et `update()` devrait tout recopier.

<div v-click="1">

Le constructeur déclare `private QuestService $quests` (**promotion de propriété** PHP 8) — et le conteneur de services, vu en S1, **instancie `QuestService` tout seul**. Jamais de `new`.

</div>

<div v-click="2">

`update()` délègue pareil : les règles métier restent **au même endroit**.

</div>

<div v-click="3">

<Definition term="Dependency injection" translation="(Injection de dépendances)">

Recevoir ses dépendances **de l'extérieur** — ici par le constructeur — au lieu de les instancier soi-même.

</Definition>

</div>

<!--
Faire le lien explicite : c'est EXACTEMENT le mécanisme qui injectait Request ou le modèle via le binding —
le conteneur lit les types déclarés et construit ce qu'il faut. Vos classes sont injectables pareil.
Remplaçable : un autre QuestService (test, autre implémentation) se substitue sans toucher le contrôleur.
-->

---
transition: slide-up | slide-down
---

# Pourquoi extraire un service ?

<ProsCons
  :pros="[
    'Testable sans HTTP — depuis Tinker ou un test',
    'Réutilisable : commande Artisan, API, autre contrôleur',
    'Contrôleur lisible : le flux se lit en trois lignes',
    'Règles métier regroupées au même endroit'
  ]"
  :cons="[
    'Un fichier de plus à ouvrir pour suivre le code',
    'Indirection : la logique n\'est plus sous les yeux du contrôleur',
    'Surdimensionné pour un CRUD vraiment trivial'
  ]"
  prosTitle="Ce que ça gagne" consTitle="Ce que ça coûte"
/>

<v-click>

<KeyPoint variant="rule" title="Le contrôleur fin" icon="📏">

HTTP en entrée → le service travaille → HTTP en sortie. Le contrôleur **orchestre**, il ne calcule pas.

</KeyPoint>

</v-click>

<!--
Ne pas en faire un dogme : un CRUD sans règles métier n'a pas besoin de service — dès qu'une règle
apparaît (notre « une seule quête à la une »), l'extraction se justifie.
Lien S1 : le conteneur de services est la même boîte qui résout Request, les modèles et maintenant QuestService.
-->
