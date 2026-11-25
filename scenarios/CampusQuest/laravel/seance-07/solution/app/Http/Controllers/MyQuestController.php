<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\Request;

class MyQuestController extends Controller
{
    public function index(Request $request)
    {
        $quests = $request->user()
            ->acceptedQuests()
            ->with('category')
            ->orderByDesc('xp')
            ->get();

        return view('my-quests.index', ['quests' => $quests]);
    }

    public function store(Request $request, Quest $quest)
    {
        $user = $request->user();
        $user->acceptedQuests()->syncWithoutDetaching([$quest->id]);

        if ($request->expectsJson()) {
            return response()->json([
                'accepted' => true,
                'count' => $user->acceptedQuests()->count(),
            ]);
        }

        return back()->with('success', 'Quête acceptée !');
    }

    public function destroy(Request $request, Quest $quest)
    {
        $request->user()->acceptedQuests()->detach($quest->id);

        return back()->with('success', 'Quête abandonnée.');
    }
}
