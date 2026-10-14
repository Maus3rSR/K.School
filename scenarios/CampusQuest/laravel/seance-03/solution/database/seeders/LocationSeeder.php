<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['BU', 'Cafét', 'Amphi'] as $name) {
            Location::create(['name' => $name]);
        }
    }
}
