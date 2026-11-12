---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 35 min
---

# Une table, un objet

- Expliquer ce qu'un ORM fait à votre place
- Créer un modèle et sa migration, puis jouer la migration
- Lire et écrire une ligne avec Tinker

<!--
Transition : le tableau PHP du S2 était une béquille. Aujourd'hui on branche une vraie base — sans écrire de SQL.
Découpage du chapitre (35 min) : slides ≈ 12 min, démo flash ≈ 4 min (moments : `make:model -m`, `migrate`/`status`/`rollback`, Tinker `new`/`save`/`find` + faute `nmae`), micro-pratique WishFlix « Category » ≈ 18 min.
Tag Campus Quest de fin de chapitre : s3-ch1-table-objet.
Moment léger : demandez qui a déjà tapé un SELECT * FROM sans WHERE sur une table de production. Les mains qui se lèvent en grimaçant sont les bonnes.
-->

---
transition: slide-up | slide-down
---

# ORM : traduire PHP en SQL
Qu'est-ce qu'un ORM ?

<Definition term="ORM" translation="(Object-Relational Mapping)">

Une couche qui **traduit** vos objets PHP en lignes de base de données — et les lignes SQL en objets PHP — sans que vous écriviez de SQL.

</Definition>

<v-click>

<Analogy title="Comme un traducteur assermenté" icon="🗣️">

Vous parlez PHP, la base parle SQL. L'ORM est le traducteur : vous lui confiez un objet `Location`, il rédige l'`INSERT` ; il reçoit des lignes, il vous rend des objets.

</Analogy>

</v-click>

<!--
Demander à la salle qui a déjà écrit du SQL à la main : la promesse est de ne plus le faire au quotidien.
L'ORM de Laravel s'appelle Eloquent ; le pattern qu'il implémente s'appelle Active Record.
Moment léger : le traducteur assermenté… qui ne sait traduire que ce qui est bien orthographié. Une faute de frappe dans un nom de colonne et il refuse de signer (on le verra en Tinker).
-->

---
transition: slide-up | slide-down
---

# ORM : traduire PHP en SQL
Écrire du SQL, ou parler en objets ?

<Compare badLabel="❌ SQL brut" goodLabel="✅ Eloquent">
  <template #bad>

```php
$rows = DB::select(
    'SELECT * FROM locations WHERE id = ?', [2]
);
$name = $rows[0]->name;
DB::insert('INSERT INTO locations
    (name) VALUES (?)', ['Amphi']);
```

  </template>
  <template #good>

```php
$location = Location::find(2);
$name = $location->name;

$amphi = new Location();
$amphi->name = 'Amphi';
$amphi->save();
```

  </template>
</Compare>

<!--
À gauche : des chaînes SQL et des tableaux — aucune aide de l'IDE, une faute de frappe explose à l'exécution.
À droite : des objets PHP. Même résultat, zéro SQL écrit à la main.
Ne montrez pas encore Location::create([...]) : il demande une autorisation (le $fillable) qu'on découvrira au chapitre suivant, quand elle servira.
-->

---
transition: slide-up | slide-down
---

# Active Record : un objet par ligne
Une ligne de la table, un objet PHP

<TableLinks
  class="mt-4"
  :tables="[
    { id: 'locations', name: 'locations', columns: ['id', 'name'], pk: ['id'], rows: [
      [1, 'BU'],
      [2, [{ v: 'Cafét', until: 2 }, { v: 'Cafèt', at: 2 }]]
    ] },
    { id: 'loc', kind: 'object', name: '$location', at: 1, props: [
      ['name', [{ v: '\'Cafét\'', at: 1, until: 2 }, { v: '\'Cafèt\'', at: 2 }]]
    ] }
  ]"
  :links="[
    { from: { table: 'locations', row: 1, col: 'name' }, to: { table: 'loc', row: 0 }, at: 1, until: 2, label: 'Location::find(2)', labelSide: 'below' },
    { from: { table: 'loc', row: 0 }, to: { table: 'locations', row: 1, col: 'name' }, at: 2, label: 'save() = UPDATE', labelSide: 'below' }
  ]"
/>

<div v-click="1">

```php
$location = Location::find(2);
```

**1 classe** = **1 table**, **1 instance** = **1 ligne** : lire `$location->name`, c'est lire la colonne `name`.

</div>

<div v-click="2">

```php
$location->name = 'Cafèt';
$location->save();
```

L'objet **sait se sauvegarder lui-même** : on modifie ses propriétés puis on appelle `save()`.

</div>

<!--
"Active" = l'objet n'est pas une boîte de données inerte : il porte les méthodes save(), delete().
Le schéma suit le code : click 1 = find() ramène la ligne dans l'objet ; click 2 = le code assigne 'Cafèt' et save() réécrit la ligne (UPDATE) — la cellule et l'objet changent au même instant.
Moment léger (étape 2) : demander qui a vu la faute. Le framework, lui, n'a rien dit : il enregistre ce qu'on lui donne.
Autres implémentations d'Active Record : Ruby on Rails (qui a inspiré Eloquent), Django s'en rapproche.
-->

---
transition: slide-up | slide-down
---

# Les conventions de nommage
Eloquent devine à partir du nom de la classe

| Vous écrivez | Eloquent en déduit |
|---|---|
| `class Location` | La table `locations` (snake_case, pluriel) |
| `class Category` | La table `categories` (le pluriel est géré en anglais) |
| `Location::find(2)` | Clé primaire `id`, auto-incrémentée |
| `$location->created_at` | Colonnes `created_at` / `updated_at` gérées seules |

<v-click>

<KeyPoint variant="tip" title="Convention over configuration" icon="🪄">

Une classe `Location` dans `app/Models/` suffit : aucun fichier de mapping. Suivez les noms, l'ORM fait le reste.

</KeyPoint>

</v-click>

<!--
Chaque convention peut être surchargée — à connaître, à ne pas utiliser sans raison :
$table = 'mes_lieux' ; $primaryKey = 'location_id' ; $timestamps = false ; $incrementing = false + $keyType = 'string' ; $connection.
Cas typique : reprendre une base legacy aux noms exotiques (tbl_lieux, PK lieuID, sans timestamps). Sinon, chaque override est une convention en moins et une surprise en plus pour le lecteur.
Moment léger : Category → categories fonctionne parce que Laravel connaît le pluriel anglais. Le pluriel français « un cheval, des chevals » ne lui a pas été enseigné.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Générer le modèle et sa migration
Ce que produit make:model Location -m

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:model Location -m', out: '   INFO  Model [app/Models/Location.php] created successfully.\n\n   INFO  Migration [database/migrations/2026_…_create_locations_table.php] created successfully.' }
  ]"
/>

::right::

```php
// app/Models/Location.php — généré VIDE
class Location extends Model
{
    //
}
```

```php
// …_create_locations_table.php — un SQUELETTE
Schema::create('locations', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
});
```

::bottom::

Pourquoi `-m` ? **Une seule commande** produit deux fichiers cohérents : le modèle et la migration `create_locations_table`, bien nommés, bien rangés.

<!--
Le modèle vit dans app/Models/ — à ne pas confondre avec app/Http/Controllers/.
Insister : Artisan ne devine RIEN du contenu de la table. Le modèle ne liste pas ses colonnes : Eloquent lit le schéma de la base à l'exécution. Les colonnes sont dans la migration.
Alternatives à citer en une phrase : make:migration seule, make:model Location -mfs (+ factory + seeder), --all.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La migration : décrire la table en PHP
Anatomie d'une migration

::left::

```php {all|7-14|16-19|all}
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
```

::right::

<div v-click="1">

`up()` — ce que la migration **fait** : créer la table `locations` et ses colonnes. Le type est une méthode, le nom de colonne son argument.

</div>

<div v-click="2">

`down()` — comment **annuler** : supprimer la table. C'est ce que lance `rollback`.

</div>

<div v-click="3">

<Definition term="Migration">

Un fichier PHP **versionné** qui décrit une évolution du schéma : la base vit dans votre code, comme un `git clone` pour vos tables.

</Definition>

</div>

<!--
Les trois imports en haut : Migration (classe de base), Blueprint (le plan de table), Schema (le constructeur).
Question probable : « void, c'est quoi ? » → la méthode ne retourne rien, typage PHP moderne.
Le timestamp dans le nom du fichier = l'ordre d'exécution. Retenez cette phrase : on en aura besoin au chapitre suivant.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Types et modificateurs de colonnes
Le type d'abord, les options ensuite

::left::

| Type | Colonne |
|---|---|
| `id()` | clé primaire auto-incrémentée |
| `string('name')` | `VARCHAR` — texte court |
| `text('description')` | `TEXT` — texte long |
| `unsignedInteger('xp')` | `INT` positif |
| `decimal('note', 3, 1)` | nombre exact |
| `boolean('featured')` | vrai/faux |

::right::

| Modificateur | Effet |
|---|---|
| `->nullable()` | accepte `NULL` |
| `->default(0)` | valeur par défaut |
| `->unique()` | interdit les doublons |
| `->index()` | accélère les recherches |

Les autres types et modificateurs : **Panorama des migrations**, en fin de chapitre.

<!--
Ils se chaînent : $table->string('slug')->unique(). Les modificateurs de clé étrangère (constrained, cascadeOnDelete) viennent au chapitre suivant, avec leur problème.
Règle pratique : réfléchir au contenu avant de choisir — une note = decimal, pas float ni string.
Moment léger : un prix stocké en string, c'est comme ranger ses clés dans le frigo : ça marche, jusqu'au jour de faire un tri.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Jouer, vérifier, annuler
La timeline des migrations

::left::

<Terminal
  class="text-sm"
  title="bash" prompt="$"
  :clicks="true"
  :lines="[
    { cmd: 'sail artisan migrate', out: '  …_create_locations_table ......... DONE' },
    { cmd: 'sail artisan migrate:status', out: '  …_create_locations_table ......... [1] Ran' },
    { cmd: 'sail artisan migrate:rollback', out: '  …_create_locations_table ......... DONE' },
    { cmd: 'sail artisan migrate', out: '  …_create_locations_table ......... DONE' }
  ]"
/>

::right::

<div class="relative h-52">

<div class="absolute inset-0" v-click.hide="1">
  <div class="mig-card">
    <carbon-time class="mig-icon mig-pending" />
    <div>
      <div class="mig-file">…_create_locations_table.php</div>
      <div class="mig-status mig-pending">pending</div>
    </div>
  </div>
</div>

<div class="absolute inset-0" v-click="[1,3]">
  <div class="mig-card">
    <carbon-checkmark-filled class="mig-icon mig-ran" />
    <div>
      <div class="mig-file">…_create_locations_table.php</div>
      <div class="mig-status mig-ran">batch 1 · Ran</div>
    </div>
  </div>
</div>

<div class="absolute inset-0" v-click="[3,4]">
  <div class="mig-card">
    <carbon-time class="mig-icon mig-pending" />
    <div>
      <div class="mig-file">…_create_locations_table.php</div>
      <div class="mig-status mig-pending">pending</div>
      <div class="mig-sub">down() exécuté — batch 1 annulé</div>
    </div>
  </div>
</div>

<div class="absolute inset-0" v-click="4">
  <div class="mig-card">
    <carbon-checkmark-filled class="mig-icon mig-ran" />
    <div>
      <div class="mig-file">…_create_locations_table.php</div>
      <div class="mig-status mig-ran">batch 1 · Ran</div>
    </div>
  </div>
</div>

</div>

<div v-click="2">

Le **batch** regroupe ce qu'un même `migrate` a joué : `rollback` annule le **dernier lot**. Le suivi est dans la table `migrations`.

</div>

<style>
.mig-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(148, 163, 184, 0.08);
}
.mig-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}
.mig-file {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.7em;
  opacity: 0.6;
}
.mig-status {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 700;
  font-size: 1em;
}
.mig-sub {
  font-size: 0.75em;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.mig-pending { color: #ffbe00; }
.mig-ran { color: #00a96e; }
</style>

<!--
Les clicks sont ceux du Terminal (1 commande par click) : migrate → status → rollback → migrate. Le schéma les suit.
migrate:status est le premier réflexe quand « une colonne n'existe pas » : la migration n'est peut-être pas jouée.
migrate:fresh (supprime TOUTES les tables puis rejoue tout) : parfait en développement. Moment léger : en production, c'est la commande qui vous vaut un café offert à toute l'équipe — et un nouvel emploi. On le dit, on ne le tape pas.
Attention à la synchronisation : le Terminal consomme 4 clicks ; le texte du batch apparaît au click 2 (après le status).
-->

---
transition: slide-up | slide-down
---

# Tinker : parler à l'application en direct

<Terminal
  title="bash" prompt="$"
  :clicks="true"
  :lines="[
    { cmd: 'sail artisan tinker' },
    { lang: 'php', cmd: '$l = new Location()' },
    { lang: 'php', cmd: '$l->name = \'BU\'' },
    { lang: 'php', cmd: '$l->save()', out: '   = true' },
    { lang: 'php', cmd: 'Location::find(1)->name', out: '   = &quot;BU&quot;' },
    { lang: 'php', cmd: 'Location::count()', out: '   = 1' }
  ]"
/>

Tinker est une **console REPL** : elle exécute du PHP *dans le contexte de votre application* — vos modèles, votre base.

<div class="text-xs opacity-75 mt-6">

Tinker répond « Class not found » ? Écrivez le nom complet `App\Models\Location` (ou `use App\Models\Location;`) — et si le modèle vient d'être généré, lancez `sail composer dump-autoload` puis relancez Tinker.

</div>

<!--
Montrer d'abord l'erreur : avant make:model, Location::count() lève « Class not found » — c'est la preuve que le modèle compte.
Le count = 0 sur une base vide est NORMAL.
Étape .env (environnement) : ouvrir .env, montrer DB_CONNECTION, DB_HOST=mariadb (le nom du service dans compose.yaml, pas localhost), DB_DATABASE/USERNAME/PASSWORD créés par Sail. Sail + MariaDB = environnement de développement : en production tout change (serveur géré, identifiants dans les variables d'environnement, jamais de .env commité, migrate --force).
Piège classique hors Docker : un poste sans Sail aurait DB_HOST=127.0.0.1.
Moment léger : faire une faute volontaire, $l->nmae = 'Amphi'; $l->save(). Eloquent essaie d'insérer une colonne « nmae » et la base répond « Unknown column ». La faute est dans votre code, mais c'est MariaDB qui vous le dit.
Tinker disparaît à la fermeture : ce que vous tapez n'est pas dans le code. Les données sont, elles, bien dans la base.
-->

---
transition: slide-up | slide-down
---

# Panorama : les migrations

<script setup>
import migrations from '/references/migrations'
</script>

<Panorama :items="migrations" doc="https://laravel.com/docs/12.x/migrations" at="s3-ch1" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : le modèle Category et sa table

<Exercise title="WishFlix — étapes A1.1 à A1.3" duration="18 min" level="guidé"
  :criteria="[
    'migrate:status affiche la migration categories à Ran',
    'Category::find(1)->name renvoie votre catégorie en Tinker',
    'Category::count() renvoie au moins 1'
  ]">

Consignes : README de l'exercice `03-eloquent`, **Partie A, étapes A1**.

Transposez la démo sur WishFlix : un modèle `Category`, sa migration avec la colonne `name`, puis une première ligne écrite et relue dans Tinker.

</Exercise>

<!--
Point de contrôle 1. Palier de rattrapage : tag Campus Quest s3-ch1-table-objet (diff = modèle + migration locations).
Vérifier au passage que migrate de l'étape 0 a bien créé les tables par défaut : sinon, dépanner la connexion maintenant, pas au chapitre 4.
-->
