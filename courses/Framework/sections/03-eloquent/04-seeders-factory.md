---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 35 min
---

# Seeders et factory : peupler la base

- Écrire des seeders pour des données fixes
- Fabriquer des données plausibles avec une factory
- Reconstruire une base peuplée en une commande

<!--
Chapitre en DÉMO GUIDÉE : vous montrez, ils suivent le fil ; ils écrivent eux-mêmes les seeders de données fixes (micro-pratique), la factory complète est dans la Partie B (US1).
Découpage (≈ 35 min) : 8 slides (≈ 12 min), livecoding (≈ 13 min), micro-pratique WishFlix « seeders fixes + jeux à la main » (≈ 10 min).
Tag Campus Quest de fin de chapitre : s3-ch4-seeders-factory.
Moment léger du chapitre : les quêtes absurdes dans le seeder (voir notes de QuestSeeder).
-->

---
transition: slide-up | slide-down
---

# Le problème : une base à retaper
Ce que vous avez saisi dans Tinker n'est pas partagé

<Terminal
  title="bash" prompt="$"
  :clicks="true"
  :lines="[
    { cmd: 'sail artisan migrate:fresh', out: '  Dropped all tables successfully.\n  …_create_locations_table ......... DONE\n  …_create_categories_table ........ DONE\n  …_create_quests_table ............ DONE\n  …_create_location_quest_table .... DONE' },
    { cmd: 'sail artisan tinker --execute=\'echo Quest::count();\'', out: '0' }
  ]"
/>

`migrate:fresh` repart de zéro : toutes les lignes saisies à la main **disparaissent**. Un binôme qui clone votre dépôt obtient des tables **vides**.

<v-click>

<Definition term="Seeder">

Une classe qui **remplit la base** d'un jeu de données de départ : du code versionné, donc identique pour toute l'équipe.

</Definition>

</v-click>

<!--
Faire un migrate:fresh en direct sur la base de la démo : toutes les quêtes de Tinker disparaissent. Moment léger : l'air de la salle quand les quêtes saisies pendant 30 min s'évaporent. « C'est exactement pour ça qu'on ne tape pas ses données dans Tinker. »
Rappel : migrate:fresh en production, c'est la commande du mauvais jour. Ici, on est en développement.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Des données fixes
Catégories et lieux : un simple create() en boucle

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

<Terminal
  class="text-sm"
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:seeder CategorySeeder', out: '   INFO  Seeder [database/seeders/CategorySeeder.php] created successfully.' },
    { cmd: 'sail artisan db:seed --class=CategorySeeder', out: '   INFO  Seeding database.' }
  ]"
/>

Pour des données **fixes et connues**, pas besoin de Faker. Le `create()` passe grâce au `$fillable` du chapitre 2.

<!--
Le seeder se range dans database/seeders/ — il voyage dans le dépôt comme les migrations. run() ne reçoit rien : c'est un script PHP avec accès aux modèles.
Montrer db:seed --class=CategorySeeder pour tester un seeder seul avant l'orchestration (la slide suivante, plus tard).
Attention aux doublons : rejouer db:seed sans migrate:fresh duplique les lignes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La factory : décrire une quête plausible
Générer et remplir definition()

::left::

```php {all|7,9,11,13,15|17|all}
class QuestFactory extends Factory
{
    public function definition(): array
    {
        return [
            // une phrase de 3 mots
            'title' => fake()->sentence(3),
            // un paragraphe de texte
            'description' => fake()->paragraph(),
            // un entier entre 10 et 200
            'xp' => fake()->numberBetween(10, 200),
            // une valeur au hasard dans la liste
            'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
            // vrai dans 20 % des cas
            'featured' => fake()->boolean(20),
            // une catégorie créée à la volée
            'category_id' => Category::factory(),
        ];
    }
}
```

::right::

<div v-click="1">

<Definition term="Factory" translation="(Fabrique)">

Une classe qui **fabrique** des modèles remplis de fausses données (`fake()`) : le volume sans la saisie.

</Definition>

</div>

<div v-click="2">

`'category_id' => Category::factory()` : chaque quête fabriquée peut **créer sa catégorie**, la clé étrangère est toujours valide.

</div>

<div v-click="3">

Le modèle doit annoncer qu'il a une factory : `use HasFactory;` (ajoute `Quest::factory()`).

</div>

<!--
Lignes surlignées 7,9,11,13,15 : les cinq appels à fake() (le commentaire est à la ligne d'avant, le comptage à partir de 1 dans le bloc : ligne 7 = title, 9 = description, 11 = xp, 13 = difficulty, 15 = featured). Ligne 17 = category_id.
sail artisan make:factory QuestFactory ; use HasFactory dans Quest (use Illuminate\Database\Eloquent\Factories\HasFactory).
fake() : helper global (pas une facade) qui renvoie un Faker\Generator ; en require-dev, donc absent en production. APP_FAKER_LOCALE=fr_FR dans .env pour des données françaises.
Moment léger : fake()->sentence(3) fabrique des quêtes du type « Voluptas quia est. » Les joueurs vont adorer le latin de cuisine.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Fabriquer en une ligne
make, create, états

::left::

```php
class QuestFactory extends Factory
{
    // … definition() …

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}
```

::right::

Un **état** est une variante nommée : `featured()` force `featured = true` par-dessus la `definition()`.

<v-click>

<Terminal
  class="text-sm"
  title="tinker" prompt=">"
  :lines="[
    { cmd: 'Quest::factory()->count(3)->create()', out: '   = Collection {… 3 quêtes}' },
    { cmd: 'Quest::factory()->featured()->make()', out: '   = Quest {… featured: true}  // non sauvegardée' }
  ]"
/>

</v-click>

<!--
make() construit en mémoire sans INSERT — pratique pour inspecter ce que la factory produit. create() sauvegarde.
Les états se composent : ->featured()->for($category).
Question probable : « pourquoi ne pas écrire ça dans le code des pages ? » → la factory sert aux seeders et aux tests, pas aux pages.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# QuestSeeder : le volume et le scénario
La factory dans un seeder

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

`Location::all()` : on charge les lieux **une fois**, pour les piocher ensuite au hasard.

</div>

<div v-click="2">

`factory()->count(30)` fait le volume ; `recycle(Category::all())` pioche la catégorie **parmi les trois existantes** au lieu d'en créer une par quête.

</div>

<div v-click="3">

`each()` + `attach(...)` : chaque quête est rattachée à **1 à 3 lieux** au hasard dans la pivot.

</div>

<div v-click="4">

Factories pour le **volume**, seeders pour le **scénario** : les deux se combinent.

</div>

<!--
Sans recycle(), category_id => Category::factory() créerait 30 nouvelles catégories.
random(1) renvoie une Collection d'un élément → pluck('id') donne toujours un tableau d'ids pour attach().
Moment léger (hors solution, à improviser en live) : ajouter avant la factory deux quêtes écrites à la main, par exemple « Trouver la salle 404 (elle n'existe pas) » et « Convaincre l'imprimante de la BU de coopérer — 500 XP ». Les quêtes absurdes ne sont PAS dans solution/ : on garde le jeu de données reproductible.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# DatabaseSeeder
Le chef d'orchestre

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

`$this->call([...])` exécute les seeders **dans l'ordre du tableau**.

</div>

<div v-click="2">

Catégories et lieux **d'abord** : les quêtes ont besoin de `category_id` et de lieux à attacher. Inverser l'ordre → clé étrangère violée.

</div>

<!--
La dépendance dicte l'ordre : ce qui est référencé avant ce qui référence — comme pour les migrations.
Le squelette Laravel seede un User::factory() de test dans ce même fichier : on peut le garder ou le remplacer.
Moment léger : mettre QuestSeeder en premier, lancer db:seed… et lire l'erreur à voix haute avec la voix du juge de paix.
-->

---
transition: slide-up | slide-down
---

# Une base propre en une commande

<Terminal
  title="bash" prompt="$"
  :clicks="true"
  :lines="[
    { cmd: 'sail artisan migrate:fresh --seed', out: '  Dropped all tables successfully.\n   INFO  Running migrations.\n   INFO  Seeding database.\n\n  Database\\Seeders\\CategorySeeder ................... DONE\n  Database\\Seeders\\LocationSeeder ................... DONE\n  Database\\Seeders\\QuestSeeder ...................... DONE' },
    { cmd: 'sail artisan tinker --execute=\'echo Quest::count();\'', out: '30' }
  ]"
/>

<v-click>

<KeyPoint variant="tip" title="À retenir" icon="💡">

`migrate:fresh --seed` = tables recréées + données remplies. N'importe quel binôme obtient **la même base que vous** — c'est le contrat des seeders.

</KeyPoint>

</v-click>

<!--
migrate:fresh --seed est LE réflexe du matin : base propre, données fraîches, tout le monde aligné.
Moment léger : relancer deux fois et montrer que les 30 quêtes changent de titre à chaque run — les catégories, elles, restent les mêmes.
Micro-pratique WishFlix : CategorySeeder, PlatformSeeder, GameSeeder (≥ 6 jeux à la main), DatabaseSeeder, migrate:fresh --seed. La factory complète : Partie B (US1).
-->

---
transition: slide-up | slide-down
---

# À vous : les seeders WishFlix

<Exercise title="WishFlix — étapes A4.1 à A4.5" duration="10 min" level="guidé"
  :criteria="[
    'CategorySeeder (≥ 4 catégories), PlatformSeeder (≥ 3 plateformes), GameSeeder (≥ 6 jeux liés)',
    'DatabaseSeeder appelle les seeders dans le bon ordre',
    'migrate:fresh --seed reconstruit la base peuplée en une commande'
  ]">

Consignes : README de l'exercice `03-eloquent`, **Partie A, étapes A4**.

Transposez la démo sur WishFlix : reprenez les jeux de votre tableau PHP de la S2 dans `GameSeeder`, attachez leurs plateformes, orchestrez dans `DatabaseSeeder`, puis `migrate:fresh --seed`. La factory complète arrive chez vous (US1).

</Exercise>

<!--
Point de contrôle 4. Palier de rattrapage : tag Campus Quest s3-ch4-seeders-factory.
Erreur fréquente : GameSeeder avant les seeders de catégories/plateformes → clé étrangère violée. Faire lire l'erreur à voix haute : elle dit exactement quelle contrainte a bloqué.
-->
