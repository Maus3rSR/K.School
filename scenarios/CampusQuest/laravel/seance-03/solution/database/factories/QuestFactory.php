<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quest>
 */
class QuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
            // une catégorie créée à la volée (ou recyclée via ->recycle())
            'category_id' => Category::factory(),
        ];
    }

    /**
     * Une quête mise en avant.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}
