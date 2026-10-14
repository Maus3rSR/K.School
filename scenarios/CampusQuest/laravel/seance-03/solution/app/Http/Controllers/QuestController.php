<?php

namespace App\Http\Controllers;

use App\Models\Quest;

class QuestController extends Controller
{
    public function index()
    {
        return view('quests.index', ['quests' => Quest::all()]);
    }

    public function show(int $id)
    {
        return view('quests.show', ['quest' => Quest::findOrFail($id)]);
    }
}
