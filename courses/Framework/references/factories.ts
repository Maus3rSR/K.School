// Panorama « factories et seeders » — https://laravel.com/docs/12.x/eloquent-factories
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Faker
  { name: 'fake()->sentence()', desc: 'Une phrase aléatoire', group: 'Faker', seen: 's3-ch4' },
  { name: 'fake()->paragraph()', desc: 'Un paragraphe aléatoire', group: 'Faker', seen: 's3-ch4' },
  { name: 'fake()->words()', desc: 'Quelques mots aléatoires', group: 'Faker' },
  { name: 'fake()->numberBetween()', desc: 'Un entier dans un intervalle', group: 'Faker', seen: 's3-ch4' },
  { name: 'fake()->randomElement()', desc: 'Une valeur parmi une liste', group: 'Faker', seen: 's3-ch4' },
  { name: 'fake()->boolean()', desc: 'Vrai ou faux (avec probabilité)', group: 'Faker', seen: 's3-ch4' },
  { name: 'fake()->name() / email()', desc: 'Identité plausible', group: 'Faker' },
  { name: 'fake()->unique()', desc: 'Garantir des valeurs uniques', group: 'Faker' },
  { name: 'fake()->dateTimeBetween()', desc: 'Une date dans un intervalle', group: 'Faker' },
  // Factory
  { name: 'Model::factory()->create()', desc: 'Fabriquer et enregistrer', group: 'Factory', seen: 's3-ch4' },
  { name: '->make()', desc: 'Fabriquer sans enregistrer', group: 'Factory', seen: 's3-ch4' },
  { name: '->count(n)', desc: 'Fabriquer n exemplaires', group: 'Factory', seen: 's3-ch4' },
  { name: '->state([...])', desc: 'Forcer certains attributs', group: 'Factory', seen: 's3-ch4' },
  { name: '->for($parent)', desc: 'Rattacher à un parent', group: 'Factory' },
  { name: '->has()', desc: 'Fabriquer avec des enfants', group: 'Factory' },
  { name: '->recycle()', desc: 'Réutiliser des modèles existants', group: 'Factory', seen: 's3-ch4' },
  { name: '->sequence()', desc: 'Alterner des valeurs', group: 'Factory' },
  // Seeders
  { name: '$this->call([...])', desc: 'Enchaîner les seeders', group: 'Seeders', seen: 's3-ch4' },
  { name: 'artisan db:seed', desc: 'Lancer les seeders', group: 'Seeders', seen: 's3-ch4' },
  { name: 'migrate:fresh --seed', desc: 'Repartir d\'une base propre', group: 'Seeders', seen: 's3-ch4' },
  { name: 'db:seed --class=', desc: 'Lancer un seul seeder', group: 'Seeders', seen: 's3-ch4' },
]
