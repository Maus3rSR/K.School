<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Joueur démo',
            'email' => 'joueur@campus-quest.test',
            'password' => 'joueur1234',
        ]);

        User::factory()->create([
            'name' => 'Maître du jeu',
            'email' => 'mj@campus-quest.test',
            'password' => 'mj1234',
            'is_admin' => true,
        ]);
    }
}
