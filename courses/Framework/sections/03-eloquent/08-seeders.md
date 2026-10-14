---
layout: chapter
transition: slide-left | slide-right
number: 08
duration: 15 min
---

# Seeders

- Remplir la base avec des classes seeder
- Orchestrer l'ordre d'exécution dans `DatabaseSeeder`
- Repartir d'une base propre et peuplée en une commande

<!--
Transition : les factories fabriquent — les seeders décident quoi mettre en base, pour tout le monde, à chaque installation.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Seeders
Une classe par jeu de données

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:seeder CategorySeeder', out: '   INFO  Seeder [database/seeders/CategorySeeder.php] created successfully.' }
  ]"
/>

```php
class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // insertion ici
    }
}
```

::right::

<v-click>

<Definition term="Seeder">

Une classe qui **remplit la base** d'un jeu de données de départ : les catégories, les lieux, des quêtes de démo.

</Definition>

Contrairement à Tinker, le seeder est **du code versionné** : tout le monde obtient les mêmes données en lançant la même commande.

</v-click>

<!--
Le seeder se range dans database/seeders/ — il voyage dans le dépôt comme les migrations.
run() ne reçoit rien et ne renvoie rien : c'est juste un script PHP avec accès aux modèles.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Seeders
Des données fixes : catégories et lieux

::left::

```php
// CategorySeeder
public function run(): void
{
    foreach (['Quiz', 'Mission', 'Culture G'] as $name) {
        Category::create(['name' => $name]);
    }
}

// LocationSeeder
public function run(): void
{
    foreach (['BU', 'Cafét', 'Amphi'] as $name) {
        Location::create(['name' => $name]);
    }
}
```

::right::

Pour des données **fixes et connues** — les catégories, les lieux du campus — un simple `create()` en boucle suffit : pas besoin de Faker.

<v-click>

Ces seeders doivent tourner **avant** celui des quêtes : les quêtes référencent une `category_id` et rattachent des lieux existants.

</v-click>

<!--
Pensez au $fillable : name doit y figurer pour que create(['name' => …]) passe — c'est l'assignation de masse vue au chapitre 3.
On pourrait aussi utiliser insert() ou firstOrCreate() ; create() reste le plus lisible pour débuter.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Seeders
Des données générées : les quêtes

::left::

```php {all|3|5-7|8-10|all}
public function run(): void
{
    $locations = Location::all();

    Quest::factory()->count(30)
        ->recycle(Category::all())
        ->create()
        ->each(fn ($quest) => $quest->locations()->attach(
            $locations->random(rand(1, 3))->pluck('id')
        ));
}
```

::right::

<div v-click="1">

`Location::all()` — on charge les lieux **une fois**, pour les piocher ensuite au hasard.

</div>

<div v-click="2">

`Quest::factory()->count(30)` fait le gros du travail ; `recycle(Category::all())` pioche la catégorie **parmi les 3 existantes** au lieu d'en créer une par quête.

</div>

<div v-click="3">

`each()` + `attach(...)` — chaque quête créée est rattachée à **1 à 3 lieux au hasard** dans la pivot.

</div>

<div v-click="4">

Factories pour le **volume**, seeders pour le **scénario** : les deux se combinent.

</div>

<!--
Sans recycle(), category_id => Category::factory() créerait 30 nouvelles catégories — on veut les 3 seedées.
random(1) renvoie une Collection d'un élément → pluck('id') donne toujours un tableau d'ids pour attach().
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Seeders
Orchestrer dans DatabaseSeeder

::left::

```php {all|4-8|all}
// database/seeders/DatabaseSeeder.php
public function run(): void
{
    $this->call([
        CategorySeeder::class,
        LocationSeeder::class,
        QuestSeeder::class,
    ]);
}
```

::right::

<div v-click="1">

`$this->call([...])` — `DatabaseSeeder` est le **chef d'orchestre** : il exécute les seeders dans l'ordre du tableau.

</div>

<div v-click="2">

Catégories et lieux **d'abord** : les quêtes ont besoin de `category_id` et de lieux à attacher. Inverser l'ordre → clés étrangères cassées ou listes vides.

</div>

<!--
La dépendance dicte l'ordre : ce qui est référencé avant ce qui référence — comme pour l'ordre des migrations.
Le squelette Laravel seede un User::factory() de test dans ce même fichier : on peut le garder ou le remplacer.
-->

---
transition: slide-up | slide-down
---

# Seeders
Une base propre en une commande

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan db:seed', out: '   INFO  Seeding database.\n\n  Database\\Seeders\\CategorySeeder ................... DONE\n  Database\\Seeders\\LocationSeeder ................... DONE\n  Database\\Seeders\\QuestSeeder ...................... DONE' },
    { cmd: 'sail artisan migrate:fresh --seed', out: '  Dropped all tables successfully.\n\n   INFO  Running migrations.\n   INFO  Seeding database.' }
  ]"
/>

<v-click>

<KeyPoint variant="tip" title="À retenir" icon="💡">

`migrate:fresh --seed` = tables recréées + données remplies. N'importe quel binôme obtient **la même base que vous** en une commande — c'est le contrat des seeders.

</KeyPoint>

</v-click>

<!--
db:seed relance les seeders sur la base existante — attention aux doublons si elle n'est pas vide.
migrate:fresh --seed est LE réflexe du matin : base propre, données fraîches, tout le monde aligné.
-->
