---
layout: chapter
transition: slide-left | slide-right
number: 07
duration: 15 min
---

# Factories

- Décrire une fausse donnée plausible avec `definition()`
- Générer des modèles en une ligne avec `factory()`
- Créer des variantes nommées avec les états

<!--
Transition : pour tester les relations et remplir la base, il faut des données — on va les fabriquer, pas les taper à la main.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Factories
Générer la factory du modèle

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:factory QuestFactory', out: '   INFO  Factory [database/factories/QuestFactory.php] created successfully.' }
  ]"
/>

Le modèle doit aussi **annoncer** qu'il a une factory :

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quest extends Model
{
    use HasFactory;
    // …
}
```

::right::

<v-click>

<Definition term="Factory" translation="(Fabrique)">

Une classe qui sait **fabriquer** des modèles remplis de fausses données plausibles — pour les seeders et les tests.

</Definition>

</v-click>

<!--
Convention : QuestFactory ↔ modèle Quest — le suffixe Factory et le namespace suffisent, Eloquent les associe seul.
Le trait HasFactory ajoute la méthode statique Quest::factory() qui renvoie la factory du modèle.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Factories
definition() : décrire une quête plausible

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

<Definition term="fake()">

Une **fonction helper globale** de Laravel — pas une facade — qui renvoie un générateur `Faker\Generator` : chaque ligne pioche un générateur (`sentence`, `numberBetween`, `randomElement`, `boolean`…).

</Definition>

</div>

<div v-click="2">

`'category_id' => Category::factory()` — chaque quête fabriquée peut **créer sa catégorie** : la clé étrangère est toujours valide.

</div>

<div v-click="3">

`definition()` décrit **une** quête type ; c'est à l'appel qu'on choisit la quantité et les variantes.

</div>

<!--
fake() vit dans Illuminate/Foundation/helpers.php et renvoie un Faker\Generator (bibliothèque FakerPHP).
Installée en require-dev : absente en production — les factories ne tournent qu'en dev/test.
Locale : config('app.faker_locale') → APP_FAKER_LOCALE=fr_FR dans .env pour des données françaises.
Au passage : Route::, Schema::, DB:: sont des FACADES (raccourcis statiques vers un service) — fake() n'en est pas une.
La liste complète des générateurs Faker : voir la doc Factories en ressources.
category_id via Category::factory() évite les FK vers des catégories inexistantes ; on verra au chapitre 8 comment recycler les catégories existantes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Factories
Des variantes nommées avec les états

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

Un **état** est une variante nommée de la factory : `featured()` force `featured = true` par-dessus la `definition()` par défaut.

<v-click>

```php
Quest::factory()->featured()->count(2)->create();
```

Deux quêtes « à la une » : le reste des colonnes reste aléatoire.

</v-click>

<!--
Les états se composent : ->featured()->for($category) — chaque appel ajoute une couche de personnalisation.
Utile pour les cas particuliers : quête difficile, sans lieu, etc.
-->

---
transition: slide-up | slide-down
---

# Factories
Fabriquer en une ligne

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan tinker' },
    { cmd: 'Quest::factory()->count(5)->create()', out: '   = Illuminate\\Database\\Eloquent\\Collection {… 5 quêtes}' },
    { cmd: 'Quest::factory()->for(Category::factory())->create()', out: '   = App\\Models\\Quest {… category_id: 9}' },
    { cmd: 'Quest::count()', out: '   = 11' }
  ]"
/>

- `->count(5)` — cinq quêtes, chacune différente
- `->for(Category::factory())` — force la catégorie parente
- `->make()` au lieu de `->create()` — des objets **non sauvegardés**, pour prévisualiser

<!--
make() construit en mémoire sans INSERT — pratique pour inspecter ce que la factory produit.
Question probable : "pourquoi ne pas écrire ça dans le code ?" → la factory sert aux seeders et aux tests, pas aux pages.
-->
