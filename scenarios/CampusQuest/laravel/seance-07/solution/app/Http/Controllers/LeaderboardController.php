<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Location;
use Illuminate\Support\Facades\Cache;

class LeaderboardController extends Controller
{
    public function index()
    {
        $data = Cache::remember('leaderboard', now()->addMinutes(10), fn () => [
            'categories' => Category::withSum('quests', 'xp')
                ->orderByDesc('quests_sum_xp')
                ->get(),
            'locations' => Location::withCount('quests')
                ->orderByDesc('quests_count')
                ->get(),
        ]);

        return view('leaderboard.index', $data);
    }
}
