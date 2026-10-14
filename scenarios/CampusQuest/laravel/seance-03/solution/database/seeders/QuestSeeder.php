<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Location;
use App\Models\Quest;
use Illuminate\Database\Seeder;

class QuestSeeder extends Seeder
{
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
}
