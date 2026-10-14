---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 15 min
---

# ORM et Active Record

- Comprendre ce qu'un ORM fait à votre place
- Appliquer les conventions de nommage d'Eloquent
- Explorer vos données avec Tinker

<!--
Transition : le tableau PHP du S2 était une béquille. Aujourd'hui on branche une vraie base — sans SQL.
-->

---
transition: slide-up | slide-down
---

# ORM et Active Record
Qu'est-ce qu'un ORM ?

<Definition term="ORM" translation="(Object-Relational Mapping)">

Une couche qui **traduit** vos objets PHP en lignes de base de données — et les lignes SQL en objets PHP — sans que vous écriviez de SQL.

</Definition>

<v-click>

<Analogy title="Comme un traducteur assermenté" icon="🗣️">

Vous parlez PHP, la base parle SQL. L'ORM est le traducteur : vous lui confiez un objet `Quest`, il rédige l'`INSERT` ; il reçoit des lignes, il vous rend des objets.

</Analogy>

</v-click>

<!--
Demander à la salle qui a déjà écrit du SQL à la main : la promesse est de ne plus le faire au quotidien.
L'ORM de Laravel s'appelle Eloquent ; le pattern qu'il implémente s'appelle Active Record.
-->

---
transition: slide-up | slide-down
---

# ORM et Active Record
Écrire du SQL, ou parler en objets ?

<Compare badLabel="❌ SQL brut" goodLabel="✅ Eloquent">
  <template #bad>

```php
$rows = DB::select(
    'SELECT * FROM quests WHERE id = ?', [3]
);
$title = $rows[0]->title;
DB::insert('INSERT INTO quests
    (title, xp) VALUES (?, ?)', ['Quiz', 30]);
```

  </template>
  <template #good>

```php
$quest = Quest::find(3);
$title = $quest->title;

Quest::create(['title' => 'Quiz', 'xp' => 30]);
```

  </template>
</Compare>

<!--
À gauche : des chaînes SQL et des tableaux — aucune aide de l'IDE, une faute de frappe explose à l'exécution.
À droite : des objets PHP. Même résultat, zéro SQL écrit à la main.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# ORM et Active Record
Active Record : un objet par ligne

::left::

<Definition term="Active Record">

Le pattern d'Eloquent : **1 classe** représente une **table**, **1 instance** représente une **ligne** — et l'objet sait se sauvegarder lui-même.

</Definition>

<v-click>

```php
$quest = Quest::find(3);  // la ligne id = 3
$quest->xp = 80;          // la colonne xp
$quest->save();           // UPDATE en base
```

`$quest` (instance de `Quest`) ↔ la ligne `id = 3` : lire `$quest->title`, c'est lire la colonne `title`.

</v-click>

::right::

La table `quests` :

| id | title | xp |
|----|-------|----|
| 1 | Salle 404 | 50 |
| 3 | Selfie mascotte | 80 |

<!--
"Active" = l'objet n'est pas une boîte de données inerte : il porte les méthodes save(), delete(), update().
Autres implémentations d'Active Record : Ruby on Rails (qui a inspiré Eloquent), Django s'en rapproche.
-->

---
transition: slide-up | slide-down
---

# ORM et Active Record
Les conventions de nommage

Eloquent devine tout à partir du nom de votre classe — à condition de suivre les conventions :

| Vous écrivez | Eloquent en déduit |
|---|---|
| `class Quest` | La table `quests` (snake_case, pluriel) |
| `Quest::find(3)` | Clé primaire `id`, auto-incrémentée |
| `$quest->created_at` | Colonnes `created_at` / `updated_at` gérées seules |
| `$quest->category_id` | Clé étrangère vers `categories.id` |

<v-click>

<KeyPoint variant="tip" title="Convention over configuration" icon="🪄">

Une classe `Quest` dans `app/Models/` suffit : aucun fichier de mapping à écrire. Suivez les noms, l'ORM fait le reste.

</KeyPoint>

</v-click>

<!--
Chaque convention peut être surchargée ($table, $primaryKey, $timestamps) — mais ne le faites pas sans raison.
C'est le même principe que les noms de fichiers Blade ou de contrôleurs : Laravel récompense les conventions.
-->

---
transition: slide-up | slide-down
---

# ORM et Active Record
Convention… et sortie de secours

Chaque convention peut être **surchargée** — une propriété sur le modèle suffit :

| Convention | Pour la changer |
|---|---|
| Table `quests` | `protected $table = 'mes_quetes'` |
| Clé primaire `id` | `protected $primaryKey = 'quest_id'` |
| `created_at` / `updated_at` | `public $timestamps = false` |
| PK entière auto-incrémentée | `public $incrementing = false` + `protected $keyType = 'string'` |
| Connexion par défaut | `protected $connection = 'autre_base'` |

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

On ne configure que quand la base **existe déjà** ou ne suit pas les conventions. Sinon, suivez la convention : c'est ce qui rend le code lisible.

</KeyPoint>

</v-click>

<!--
Cas typique : reprendre une base legacy aux noms exotiques (tbl_quests, PK questID, sans timestamps).
Ne jamais renommer pour le plaisir : chaque override est une convention en moins, une surprise en plus pour le lecteur.
Une seule slide d'override par chapitre : la convention d'abord, la sortie de secours ensuite.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# ORM et Active Record
Ce que génère make:model Quest -m

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:model Quest -m', out: '   INFO  Model [app/Models/Quest.php] created successfully.\n\n   INFO  Migration [database/migrations/2025_…_create_quests_table.php] created successfully.' }
  ]"
/>

```php
// app/Models/Quest.php — généré VIDE
class Quest extends Model
{
    //
}
```

::right::

<v-click>

```php
// …_create_quests_table.php — un SQUELETTE
Schema::create('quests', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
});
```

</v-click>

<div v-click="2">

Pourquoi `-m` ? **Une seule commande** produit deux fichiers cohérents : le modèle `Quest` et la migration `create_quests_table` — les bons noms, dans les bons dossiers, selon la convention.

</div>

<!--
Le modèle vit dans app/Models/ — à ne pas confondre avec app/Http/Controllers/.
Insister : le fichier généré est vide de champ — Artisan ne devine RIEN du contenu de la table.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# ORM et Active Record
Le reste s'écrit à la main

::left::

```php
// …_create_quests_table.php
Schema::create('quests', function (Blueprint $table) {
    $table->id();
    $table->string('title');           // ← à la main
    $table->foreignId('category_id')   // ← à la main
        ->constrained();
    $table->timestamps();
});
```

::right::

- Les **colonnes** : écrites dans le `up()` de la migration — y compris `foreignId('category_id')->constrained()`, rien n'est déduit ni généré
- Le modèle **ne déclare pas** ses colonnes : Eloquent lit le schéma de la base à l'exécution

::bottom::

<v-click>

Alternatives de génération : `make:migration create_quests_table` seule, `make:model Quest -mfs` (+ factory + seeder), ou `--all` (tout).

</v-click>

<!--
Piège à désamorcer tout de suite : les apprenants croient souvent que le modèle liste les colonnes — non, c'est la migration qui décrit la table.
-mfs est un bon réflexe dès qu'on sait qu'on voudra factory + seeder (chapitres 7 et 8).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# ORM et Active Record
Connecter l'application à MariaDB

::left::

```ini
# .env — configuré par Sail à l'installation
DB_CONNECTION=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

::right::

- `DB_HOST=mariadb` — l'hôte n'est **pas** `localhost` : c'est le nom du service dans `compose.yaml` — les conteneurs se joignent par leur nom
- `DB_USERNAME` / `DB_PASSWORD` — identifiants de dev locaux créés par Sail au premier `sail up`

<v-click>

<Alert type="warning">

Sail + MariaDB = environnement de **développement** : mot de passe `password`, hôte = nom du service Docker — en production, tout change.

</Alert>

</v-click>

<!--
Tout est déjà en place depuis l'installation ?with=mariadb de la S1 : rien à changer pour aujourd'hui.
En production (à dire à l'oral) : serveur de BDD géré ou dédié plutôt qu'un conteneur Sail ; identifiants
dans les variables d'environnement du serveur — jamais de .env commité (il est dans .gitignore) ;
utilisateur BDD aux droits limités ; sauvegardes ; migrations jouées avec php artisan migrate --force.
Piège classique hors Docker : un poste sans Sail aurait DB_HOST=127.0.0.1 et ses propres identifiants.
-->

---
transition: slide-up | slide-down
---

# ORM et Active Record
Tinker : parler à l'application en direct

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan tinker', out: 'Psy Shell (PHP 8.3.x — cli) by Justin Hileman' },
    { cmd: 'Quest::count()', out: '   = 0' }
  ]"
/>

Tinker est une **console REPL** : elle exécute du PHP *dans le contexte de votre application* — vos modèles, votre `.env`, votre base.

- Idéal pour tester une requête ou inspecter une donnée en cours de développement
- Rien n'est sauvegardé dans le code : ce que vous tapez disparaît en quittant (`exit` ou `Ctrl+C`)

<!--
Démo en direct : Quest::all() renvoie une Collection vide — la base est vide, count = 0 est NORMAL.
Tinker a déjà été croisé dans l'exercice 1 ; on l'utilisera comme terrain de jeu tout au long de la séance.
-->
