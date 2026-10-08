<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestController extends Controller
{
    private array $quests = [
        1 => ['title' => 'Salle 404', 'xp' => 50, 'difficulty' => 'easy'],
        2 => ['title' => 'Quiz campus', 'xp' => 30, 'difficulty' => 'easy'],
        3 => ['title' => 'Selfie mascotte', 'xp' => 80, 'difficulty' => 'hard'],
    ];

    public function index(Request $request)
    {
        $difficulty = $request->query('difficulty');
        $quests = $difficulty
            ? array_filter($this->quests, fn ($q) => $q['difficulty'] === $difficulty)
            : $this->quests;

        return view('quests.index', ['quests' => $quests]);
    }

    public function show(int $id)
    {
        abort_unless(isset($this->quests[$id]), 404);

        return view('quests.show', ['quest' => $this->quests[$id], 'id' => $id]);
    }
}
