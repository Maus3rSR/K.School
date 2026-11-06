<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Quest;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    public function index(Request $request)
    {
        $quests = Quest::query()
            ->with('category')
            ->when(
                $request->query('q'),
                fn ($query, $q) => $query->where('title', 'like', "%{$q}%")
            )
            ->when(
                $request->query('category'),
                fn ($query, $categoryId) => $query->where('category_id', $categoryId)
            )
            ->orderByDesc('xp')
            ->paginate(10)
            ->withQueryString();

        return view('quests.index', [
            'quests' => $quests,
            'categories' => Category::all(),
        ]);
    }

    public function show(int $id)
    {
        return view('quests.show', [
            'quest' => Quest::with(['category', 'locations'])->findOrFail($id),
        ]);
    }
}
