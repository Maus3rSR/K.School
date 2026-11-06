<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Location;

class LeaderboardController extends Controller
{
    public function index()
    {
        return view('leaderboard.index', [
            'categories' => Category::withSum('quests', 'xp')
                ->orderByDesc('quests_sum_xp')
                ->get(),
            'locations' => Location::withCount('quests')
                ->orderByDesc('quests_count')
                ->get(),
        ]);
    }
}
