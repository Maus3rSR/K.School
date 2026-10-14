---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 20 min
---

# Migrations

- Décrire une table en PHP : types et modificateurs de colonnes
- Jouer et annuler des migrations avec Artisan
- Faire évoluer le schéma sans casser celui des autres

<!--
Transition : le modèle Quest.php est vide — c'est la migration qui décrit réellement la table.
-->

---
transition: slide-up | slide-down
---

# Migrations
Qu'est-ce qu'une migration ?

<Definition term="Migration">

Un fichier PHP **versionné** qui décrit la création ou la modification d'une table : le schéma de la base vit dans votre code, versionné avec lui.

</Definition>

<v-click>

<Analogy title="Comme Git, pour la base de données" icon="🌿">

Un `git clone` suffit pour avoir tout le code. De même, `sail artisan migrate` suffit pour recréer toute la base — sur votre poste, chez un binôme, en production.

</Analogy>

</v-click>

<!--
Faire le contraste : avant, "il faut que tu exécutes ce SQL sur ta machine" — fini, le schéma voyage dans le dépôt.
Chaque fichier porte un timestamp : migrations = historique ordonné des évolutions du schéma.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Migrations
L'anatomie d'une migration

::left::

```php {all|7|9|10-16|20-22|all}
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('xp')->default(0);
            $table->string('difficulty');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
```

::right::

<div v-click="1">

`up()` — ce que la migration **fait** : ici, créer la table `quests`.

</div>

<div v-click="2">

`Schema::create()` — **l'action** sur la table : ici, créer la table `quests`.

</div>

<div v-click="3">

Les **colonnes** : le type défini par une méthode, nom de colonne en argument, puis les modificateurs éventuels

</div>

<div v-click="4">

`down()` — comment **annuler** la migration : ici, supprimer la table lors d'un `rollback` par `artisan`.

</div>

<div v-click="5">

Une migration = un changement de schéma **décrit en PHP**, rejouable à l'identique dans un environnement de développement ou de production.

</div>

<!--
Les trois imports en haut : Migration (classe de base), Blueprint (le plan de table), Schema (le constructeur).
Question probable : "void, c'est quoi ?" → la méthode ne retourne rien, typage PHP moderne.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Migrations
Une clé étrangère, en deux migrations

::left::

````md magic-move
```php
// database/migrations/…_create_categories_table.php
public function up(): void
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
}
```

```php {8}
// database/migrations/…_create_quests_table.php
public function up(): void
{
    Schema::create('quests', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        // … autres colonnes vues plus haut …
        $table->foreignId('category_id')->constrained();
        $table->timestamps();
    });
}
```
````

::right::

Chaque quête appartient à une catégorie → la table `quests` reçoit une **clé étrangère**.

<div v-click="1">

`foreignId('category_id')->constrained()` — crée la colonne `category_id` **et** la contrainte vers `categories.id`.

⚠️ `categories` doit être créée **avant** `quests` : générez-la en premier (`make:model Category -m`), le timestamp des fichiers fixe l'ordre d'exécution.

</div>

<!--
Une table = une migration : categories d'abord (rien à référencer), quests ensuite (FK vers categories).
Si l'ordre est inversé : erreur "Cannot add foreign key constraint" au migrate — régénérer le fichier corrige l'ordre.
-->

---
transition: slide-up | slide-down
---

# Migrations
Les types de colonnes

| Code | Colonne produite |
|---|---|
| `$table->id()` | `BIGINT` auto-incrémenté (clé primaire) |
| `$table->string('title')` | `VARCHAR` — textes courts |
| `$table->text('description')` | `TEXT` — textes longs |
| `$table->unsignedInteger('xp')` | `INT` non signé |
| `$table->decimal('note', 3, 1)` | `DECIMAL` — nombres exacts |
| `$table->boolean('featured')` | `BOOLEAN` — vrai/faux |
| `$table->timestamps()` | `created_at` + `updated_at` |

[📖 Tous les types de colonnes — doc Laravel](https://laravel.com/framework/docs/12.x/migrations#available-column-types)

<!--
`foreignId` a déjà sa slide (la clé étrangère) ; date, dateTime, json, enum sont dans la doc.
Règle pratique : réfléchir au contenu avant de choisir — une note = decimal, pas float ni string.
-->

---
transition: slide-up | slide-down
---

# Migrations
Les modificateurs

Ils se chaînent après le type : `$table->string('slug')->unique()`.

| Code | Effet |
|---|---|
| `->nullable()` | La colonne accepte `NULL` |
| `->default(0)` | Valeur par défaut |
| `->unique()` | Interdit les doublons |
| `->index()` | Index pour accélérer les recherches |
| `->constrained()` | Crée la contrainte de clé étrangère |
| `->cascadeOnDelete()` | Supprime les lignes liées avec le parent |
| `->nullOnDelete()` | Passe la FK à `NULL` si le parent est supprimé |

[📖 Tous les modificateurs — doc Laravel](https://laravel.com/framework/docs/12.x/migrations#column-modifiers)

<!--
constrained(), cascadeOnDelete(), nullOnDelete() s'appliquent à foreignId() : choisir selon ce qui doit
arriver aux quêtes quand une catégorie disparaît. Les autres s'appliquent à n'importe quelle colonne.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Migrations
Jouer, vérifier, annuler

::left::

<Terminal
  class="text-sm"
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan migrate', out: '   INFO  Running migrations.\n\n  2025_…_create_categories_table ......... 42 ms DONE\n  2025_…_create_quests_table .............. 15 ms DONE' },
    { cmd: 'sail artisan migrate:status', out: '  Migration name ........................ Ran\n\n  2025_…_create_categories_table .......... Yes\n  2025_…_create_quests_table .............. Yes' },
    { cmd: 'sail artisan migrate:rollback', out: '   INFO  Rolling back migrations.\n\n  2025_…_create_quests_table ............ 8 ms DONE' },
    { cmd: 'sail artisan migrate:fresh', out: '  Dropped all tables successfully.\n\n   INFO  Running migrations.\n  …' }
  ]"
/>

::right::

- `migrate` joue les migrations **pas encore exécutées** — le suivi est dans la table `migrations` de la base
- `rollback` annule **le dernier lot** en appelant leurs `down()`
- `fresh` **supprime toutes les tables** puis rejoue tout — pratique en dev, action destructive à ne pas jouer en production

<!--
migrate:status est le premier réflexe quand "une colonne n'existe pas" : la migration n'est peut-être pas jouée.
fresh perd TOUTES les données : parfait en développement, jamais en production.
-->

---
transition: slide-up | slide-down
---

# Migrations
Et vous, que feriez-vous ?

<Quiz
  question="La migration create_quests_table est déjà jouée — par vous ET par toute l'équipe. Vous devez ajouter une colonne slug. Que faites-vous ?"
  :options="[
    'Vous ajoutez la colonne dans create_quests_table puis sail artisan migrate',
    'Vous ajoutez la colonne dans create_quests_table puis sail artisan migrate:fresh',
    'Vous créez une nouvelle migration add_slug_to_quests_table puis sail artisan migrate',
    'Vous ajoutez la colonne à la main dans MariaDB, sans migration'
  ]"
  :answer="2"
/>

<!--
Pré-test AVANT la règle : laissez chacun voter à main levée avant de révéler.
L'option migrate:fresh est la plus tentante : ça marche sur VOTRE poste… mais c'est une hérésie en équipe
(données perdues, schéma désynchronisé). La slide suivante tranche.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Migrations
Modifier une table = nouvelle migration

Une migration **déjà jouée** — par vous ou, pire, par un binôme — ne se modifie plus : vous écrivez une **nouvelle** migration qui décrit le changement.

::left::

<Terminal
  class="text-sm"
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:migration add_slug_to_quests_table --table=quests', out: '   INFO  Migration [database/migrations/2025_…_add_slug_to_quests_table.php] created successfully.' }
  ]"
/>

<v-click at="1">

<KeyPoint class="text-sm" variant="rule" title="Règle d'or" icon="📏">

`Schema::table` **modifie** une table existante, `Schema::create` la crée. Modifier un fichier déjà migré n'a aucun effet — `migrate` ne rejoue jamais une migration.

</KeyPoint>

</v-click>

::right::

<v-click>

```php
public function up(): void
{
    Schema::table('quests', function (Blueprint $table) {
        $table->string('slug')->unique();
    });
}

public function down(): void
{
    Schema::table('quests', function (Blueprint $table) {
        $table->dropColumn('slug');
    });
}
```

</v-click>

<!--
L'option --table=quests pré-remplit le fichier avec Schema::table('quests', …).
Le down() d'un ajout de colonne : dropColumn — toujours écrire l'inverse exact du up().
Revenir au vote de la slide précédente : qui avait deviné la nouvelle migration ?
Anecdote : en équipe, modifier une migration déjà jouée désynchronise les bases — d'où la règle.
-->
