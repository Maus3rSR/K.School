---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 42 min
---

# Relation un-à-plusieurs

- Placer la clé étrangère du bon côté et l'écrire en migration
- Autoriser l'écriture en masse avec `$fillable`
- Déclarer `belongsTo` et `hasMany`, puis naviguer entre les objets

<!--
Transition : une table seule, c'est un carnet. Une quête appartient à une catégorie : il faut relier deux tables.
Découpage du chapitre (42 min) : slides ≈ 15 min, démo flash ≈ 5 min (moments : `MassAssignmentException` `$fillable` commenté, FK 999 refusée, navigation `$quest->category->name`), micro-pratique WishFlix « Game appartient à Category » ≈ 22 min.
Tag Campus Quest de fin de chapitre : s3-ch2-relation-1n.
Moment léger du chapitre : la FK violée en direct (voir slide « La clé étrangère protège »).
-->

---
transition: slide-up | slide-down
---

# Où placer la clé étrangère ?
Et vous, où la mettriez-vous ?

<Quiz
  question="Une catégorie contient plusieurs quêtes ; chaque quête a une seule catégorie. Dans quelle table place-t-on la clé étrangère ?"
  :options="[
    'Dans categories : une colonne quest_id',
    'Dans quests : une colonne category_id',
    'Dans une troisième table category_quest',
    'Dans les deux tables, pour être sûr'
  ]"
  :answer="1"
/>

<!--
Pré-test : faites voter la salle à main levée avant de révéler.
L'intuition fausse classique : « la catégorie contient les quêtes, donc elle devrait les lister » — mais une colonne ne stocke qu'UNE valeur : la FK vit toujours du côté « plusieurs ».
Moment léger : la 4e réponse, « dans les deux tables, pour être sûr », est la philosophie de la ceinture ET des bretelles — c'est aussi comme ça qu'on fabrique des incohérences.
-->

---
transition: slide-up | slide-down
---

# La clé étrangère, côté « plusieurs »
Chaque quête pointe vers une catégorie

<TableLinks
  class="mt-4"
  :tables="[
    { id: 'categories', name: 'categories', columns: ['id', 'name'], pk: ['id'], rows: [
      [1, 'Quiz'],
      [2, 'Mission']
    ] },
    { id: 'quests', name: 'quests', columns: ['id', 'title', 'category_id'], pk: ['id'], fk: ['category_id'], rows: [
      [1, 'Salle 404', [{ v: '', until: 1 }, { v: 2, at: 1 }]],
      [2, 'Selfie mascotte', [{ v: '', until: 1 }, { v: 2, at: 1 }]],
      [3, 'Quiz du RU', [{ v: '', until: 1 }, { v: 1, at: 1, until: 2 }, { v: 3, at: 2 }]]
    ], badRows: [{ row: 2, at: 2 }] }
  ]"
  :links="[
    { from: { table: 'quests', row: 0, col: 'category_id' }, to: { table: 'categories', row: 1 }, at: 1 },
    { from: { table: 'quests', row: 1, col: 'category_id' }, to: { table: 'categories', row: 1 }, at: 1 },
    { from: { table: 'quests', row: 2, col: 'category_id' }, to: { table: 'categories', row: 0 }, at: 1, until: 2 },
    { from: { table: 'quests', row: 2, col: 'category_id' }, variant: 'error', at: 2, label: 'aucune catégorie 3', labelSide: 'below' }
  ]"
/>

<div v-click="1">

<Definition term="Foreign key" translation="(Clé étrangère)">

Une colonne qui stocke la **clé primaire** d'une autre table : `quests.category_id` contient un `categories.id`.

</Definition>

</div>

<div v-click="2">

Rien n'empêche un `category_id` inexistant… sauf une **contrainte** déclarée en migration.

</div>

<!--
Une colonne ne stocke qu'une valeur : plusieurs quêtes peuvent pointer la même catégorie, pas l'inverse. D'où la FK côté « plusieurs ».
Étape 2 : le « 3 » n'existe pas — la base pourrait accepter ce lien orphelin. Sans contrainte, c'est une quête fantôme.
Moment léger : donner un nom à la quête orpheline — « Trouver la salle 404 (elle n'existe pas) » — et ajouter qu'elle est la seule du campus à rapporter 0 XP à 100 %.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La table pointée d'abord
categories avant quests

::left::

```php
// …_create_categories_table.php
public function up(): void
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
}
```

::right::

On génère `Category` en premier (`make:model Category -m`) : c'est la table **pointée**.

<v-click>

⚠️ `categories` doit exister **avant** `quests` : le **timestamp** du nom de fichier fixe l'ordre d'exécution des migrations.

</v-click>

<!--
En séance, Category est généré avant Quest : categories doit être jouée avant quests.
Si l'ordre est inversé : « Cannot add foreign key constraint » au migrate — regénérer le fichier corrige l'ordre.
Rappel du chapitre 1 : le timestamp du nom de fichier = l'ordre d'exécution — il fait foi pour savoir quelle table existe quand l'autre migre.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La FK s'écrit dans la migration
foreignId + constrained()

::left::

```php {none|11|all}
// …_create_quests_table.php
public function up(): void
{
    Schema::create('quests', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description');
        $table->unsignedInteger('xp')->default(0);
        $table->string('difficulty');
        $table->boolean('featured')->default(false);
        $table->foreignId('category_id')->constrained();
        $table->timestamps();
    });
}
```

::right::

<div v-click="1">

`foreignId('category_id')->constrained()` crée la colonne **et** la contrainte vers `categories.id`.

</div>

<div v-click="2" class="mt-8 text-center">
  <span class="inline-block font-mono text-2xl font-bold text-[#a855f7] border-2 border-[#a855f7]/60 bg-[#a855f7]/10 rounded-xl px-5 py-3">->constrained()</span>
</div>

::bottom::

<div v-click="2" class="text-sm">

Une **contrainte d'intégrité** : la base refuse un `category_id` absent de `categories`. `constrained()` déduit la table `categories` et la colonne `id` du nom `category_id` — équivaut à `->references('id')->on('categories')`.

</div>

<!--
Le schéma complet de quests est dans solution/database/migrations ; la migration est déjà en place pour la démo flash. Artisan ne génère AUCUNE clé étrangère : elle s'écrit à la main.
Côté quests, rappel du chapitre 1 : le fichier vient d'être créé, personne ne l'a joué ; on le complète puis on migre une seule fois.
Pour migrer : sail artisan migrate (migrate:status pour vérifier le batch).
-->

---
transition: slide-up | slide-down
---

# create() refuse d'écrire
Un modèle vide n'accepte rien en masse

<Terminal
  title="tinker" prompt=">"
  :lines="[
    { lang: 'php', cmd: 'Quest::create([\'title\' => \'Salle 404\', \'xp\' => 50, \'difficulty\' => \'easy\'])', out: '   Illuminate\\Database\\Eloquent\\MassAssignmentException\n   Add [title] to fillable property to allow mass assignment on [App\\Models\\Quest].' }
  ]"
/>

`create([...])` remplit le modèle d'un coup : c'est l'**assignation de masse**. Par défaut, Eloquent la **refuse** : sans liste blanche, il ne sait pas quelles colonnes sont sûres.

<!--
Montrer l'erreur en démo flash : c'est le moment où la salle dit « ah ». Avant de corriger, demander à quoi ça sert de refuser.
Réponse : un formulaire qui envoie is_admin=1 ne doit jamais réécrire cette colonne.
Moment léger : l'exception exacte vous dit de quoi vous avez besoin : « Add [title] to fillable property ». C'est la seule fois où une erreur vous donne littéralement la solution — profitez-en.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# $fillable : la liste blanche
Autoriser les colonnes de confiance

::left::

```php {none|7-10|12-17|all}
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    protected $fillable = [
        'title', 'description', 'xp',
        'difficulty', 'featured', 'category_id',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
        ];
    }
}
```

::right::

<div v-click="1">

`$fillable` — la **liste blanche** des colonnes qu'on peut remplir d'un coup avec `Quest::create([...])`.

</div>

<div v-click="2">

`casts()` — convertit à la volée : `featured` est un `0/1` en base, un **vrai booléen** côté PHP.

</div>

<div v-click="3">

<Alert type="warning">

Une colonne **absente** de `$fillable` est **ignorée en silence** par `create()` (alors qu'un `$fillable` totalement absent lève l'exception vue plus haut).

</Alert>

</div>

<!--
Comportement exact de Laravel 12 (vérifié dans Model::fill) : sans aucun $fillable (ni $guarded), le modèle est « totalement protégé » → MassAssignmentException à la première colonne. Avec un $fillable partiel, les colonnes hors liste sont écartées SANS erreur — c'est le piège du « ça enregistre mais la colonne reste vide ».
Pour que Laravel crie aussi dans ce cas : Model::preventSilentlyDiscardingAttributes() dans AppServiceProvider::boot() (pratique en développement).
Faire la démo des deux comportements : (new Quest(['title' => 'T', 'nope' => 1]))->getAttributes() → seul title reste.
Category et Location ont aussi leur `$fillable = ['name']` — sans lui, leur `create()` lèverait la même exception.
Moment léger (erreur volontaire) : oublier 'xp' dans $fillable. La quête s'enregistre… avec 0 XP, la valeur par défaut. Les joueurs vont adorer la quête « Marathon de la BU : 0 XP ».
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La clé étrangère protège
Une quête ne peut pas pointer dans le vide

::left::

<Terminal
  class="text-sm"
  title="tinker" prompt=">"
  :clicks="true"
  :lines="[
    { lang: 'php', cmd: 'Quest::create([\'title\' => \'Salle 404\', \'xp\' => 50, \'difficulty\' => \'easy\', \'description\' => \'…\', \'category_id\' => 2])', out: '   = App\\Models\\Quest {#… id: 1}' },
    { lang: 'php', cmd: 'Quest::create([\'title\' => \'Fantôme\', …, \'category_id\' => 999])', out: '   Illuminate\\Database\\QueryException\n   SQLSTATE[23000]: Integrity constraint violation: 1452\n   Cannot add or update a child row: a foreign key constraint fails' }
  ]"
/>

::right::

- `constrained()` fait refuser à la base tout `category_id` **inexistant**
- Même protection à l'envers : on ne supprime pas une catégorie qui a encore des quêtes

<v-click>

On choisit le comportement avec un modificateur de la FK : `->cascadeOnDelete()` supprime les quêtes avec leur catégorie, `->nullOnDelete()` passe la FK à `NULL` (colonne `nullable` requise).

</v-click>

<!--
Créer d'abord des catégories (Category::create(['name' => 'Mission'])) pour que category_id => 2 existe.
Moment léger (erreur volontaire) : lancer la quête « Fantôme » vers la catégorie 999 : la base lit votre intention, prend un air offensé et répond 1452. C'est exactement la protection qu'on a achetée avec constrained().
Sur SQLite (démo), les FK sont aussi vérifiées par Laravel (PRAGMA foreign_keys activé) : le message diffère (FOREIGN KEY constraint failed).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Cardinalité BDD ↔ méthode Eloquent
Ce que vous avez vu en BDD devient des méthodes de modèle

::left::

**1–1** — une ligne ↔ une ligne au plus

<TableLinks
  class="text-xs mt-1"
  :tables="[
    { id: 'users', name: 'users', columns: ['id', 'name'], pk: ['id'], rows: [[1, 'Ada']] },
    { id: 'profiles', name: 'profiles', columns: ['id', 'user_id'], pk: ['id'], fk: ['user_id'], rows: [[1, 1]] }
  ]"
  :links="[{ from: { table: 'profiles', row: 0, col: 'user_id' }, to: { table: 'users', row: 0 } }]"
/>

<div class="text-xs opacity-75 mt-1 mb-4">
FK **unique** chez l'enfant · `belongsTo` / `hasOne`
</div>

**1–N** — une ligne ↔ plusieurs lignes

<TableLinks
  class="text-xs mt-1"
  :tables="[
    { id: 'cats', name: 'categories', columns: ['id', 'name'], pk: ['id'], rows: [[1, 'Quiz']] },
    { id: 'qs', name: 'quests', columns: ['id', 'category_id'], pk: ['id'], fk: ['category_id'], rows: [[1, 1], [2, 1]] }
  ]"
  :links="[
    { from: { table: 'qs', row: 0, col: 'category_id' }, to: { table: 'cats', row: 0 } },
    { from: { table: 'qs', row: 1, col: 'category_id' }, to: { table: 'cats', row: 0 } }
  ]"
/>

<div class="text-xs opacity-75 mt-1">
FK côté « plusieurs » · `belongsTo` / `hasMany`
</div>

::right::

| Relation | Où est la FK | Porte la FK | « Possède » |
|---|---|---|---|
| **1–1** | chez l'enfant (unique) | `belongsTo` → (0,1) | `hasOne` → (0,1) |
| **1–N** | côté « plusieurs » | `belongsTo` → (1,1) si NOT NULL, (0,1) si nullable | `hasMany` → (0,n) |
| **N–N** | table pivot | `belongsToMany` → (0,n) | `belongsToMany` → (0,n) |

<div class="text-xs opacity-75 mt-2">
N–N : la table pivot arrive au chapitre suivant.
</div>

<!--
Rappel BDD : les cardinalités se lisent depuis la FK. belongsTo = le côté qui PORTE la FK : (1,1) car category_id est NOT NULL (toute quête a une catégorie) ; FK nullable → (0,1). hasMany côté « un » : (0,n) — rien en base n'oblige une catégorie à avoir au moins une quête, donc pas de (1,n). N–N = belongsToMany (0,n) des deux côtés, détaillé au chapitre 3.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# belongsTo et hasMany
Déclarer la relation dans les deux modèles

::left::

```php {none|4-7|13-16|all}
// app/Models/Quest.php
class Quest extends Model
{
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

// app/Models/Category.php
class Category extends Model
{
    public function quests(): HasMany
    {
        return $this->hasMany(Quest::class);
    }
}
```

::right::

<div v-click="1">

`Quest::category()` → `belongsTo` — une quête **appartient à** une catégorie : c'est `quests` qui porte `category_id` (vous aviez deviné ?).

</div>

<div v-click="2">

`Category::quests()` → `hasMany` — une catégorie **possède** plusieurs quêtes, retrouvées par leur `category_id`.

</div>

<div v-click="3">

La relation se déclare **des deux côtés**. Eloquent devine la FK `category_id` d'après le nom du modèle.

</div>

<!--
En tête de chaque fichier : use Illuminate\Database\Eloquent\Relations\BelongsTo; / HasMany;
Logique du nommage : category() au singulier (un objet), quests() au pluriel (une collection) — Eloquent s'en sert pour deviner la FK.
Revenir au quiz : qui avait voté « dans quests » ? La clé est du côté de belongsTo.
-->

---
transition: slide-up | slide-down
---

# Propriété ou méthode ?
Suivre un lien, ou affiner une requête

| Écriture | Ce que ça renvoie | Requête exécutée ? | À utiliser pour |
|---|---|---|---|
| `$quest->category` | Le **modèle** `Category` | Oui, au premier accès | Lire l'objet lié : `->name`… |
| `$category->quests` | Une **Collection** de `Quest` | Oui, au premier accès | Boucler sur les données |
| `$category->quests()` | La **relation** (constructeur de requête) | Non — rien n'est lancé | Chaîner : `->count()`, `->create([...])` |

<v-click>

Pourquoi sans parenthèses ? Eloquent **intercepte l'accès** à une propriété absente — le mécanisme [`__get`](https://www.php.net/manual/fr/language.oop5.overloading.php#object.get) de PHP, creusé en exercice (Partie C).

</v-click>

<v-click>

<KeyPoint variant="tip" title="Règle de pouce" icon="🪄">

**Propriété** pour lire les données, **méthode** pour affiner ou compter.

</KeyPoint>

</v-click>

<!--
`->count()` sur la méthode = COUNT(*) en SQL ; `->count()` sur la Collection = comptage en PHP. Même résultat, pas la même requête — le distinguo resservira à la fin de la séance.
Le « __get » est exploré dans la Partie C de l'exercice : ne pas tout détailler ici.
-->

---
transition: slide-up | slide-down
---

# Naviguer entre les objets
Tinker : suivre les liens en direct

<Terminal
  title="tinker" prompt=">"
  :clicks="true"
  :lines="[
    { lang: 'php', cmd: '$quest = Quest::first()', out: '   = App\\Models\\Quest {#… title: &quot;Salle 404&quot;, category_id: 2, …}' },
    { lang: 'php', cmd: '$quest->category->name', out: '   = &quot;Mission&quot;' },
    { lang: 'php', cmd: 'Category::find(2)->quests->count()', out: '   = 1' },
    { lang: 'php', cmd: 'Category::find(2)->quests()->create([\'title\' => \'Quiz du RU\', …])', out: '   = App\\Models\\Quest {#… category_id: 2}' }
  ]"
/>

Une fois la relation déclarée, naviguer entre les objets coûte **une ligne de PHP** — la jointure SQL est invisible. Et `quests()->create()` renseigne tout seul `category_id`.

<!--
Si la base est vide : créer deux catégories et une quête en Tinker avant.
Montrer $quest->category sans ->name : Eloquent renvoie l'objet Category complet.
Garder en tête le prochain sujet : une quête peut se dérouler dans PLUSIEURS lieux — la FK unique ne suffira plus.
Micro-pratique WishFlix : Game (migration avec category_id), $fillable + casts, belongsTo/hasMany, vérification Tinker.
-->

---
transition: slide-up | slide-down
---

# Panorama : le modèle Eloquent

<script setup>
import model from '/references/model'
</script>

<Panorama :items="model" doc="https://laravel.com/docs/12.x/eloquent" at="s3-ch2" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : Game appartient à Category

<Exercise title="WishFlix — étapes A2.1 à A2.6" duration="22 min" level="guidé"
  :criteria="[
    'La migration games (avec foreignId category_id) est à Ran',
    'Game::create() fonctionne grâce au fillable ; une catégorie inconnue est refusée',
    'Game::first()->category->name et Category::find(1)->games naviguent dans les deux sens'
  ]">

Consignes : README de l'exercice `03-eloquent`, **Partie A, étapes A2**.

Transposez la démo sur WishFlix : le modèle `Game`, sa migration avec la clé étrangère écrite à la main, `$fillable` + `casts()`, puis `belongsTo` / `hasMany` vérifiés dans Tinker.

**Spécificités WishFlix** : `games` a 9 colonnes (liste exacte au README, A2.2) — `decimal('rating', 3, 1)` pour la note, `unsignedSmallInteger` pour `release_year` et `playtime_hours`, `status` en `string`. Toutes figurent dans le `$fillable`, `category_id` comprise ; `casts()` ne convertit que `featured`.

</Exercise>

<!--
Point de contrôle 2. Palier de rattrapage : tag Campus Quest s3-ch2-relation-1n.
Erreur fréquente : oublier category_id dans le $fillable → le jeu se crée sans catégorie, en silence. Faire vérifier Game::first()->category_id en Tinker.
-->
