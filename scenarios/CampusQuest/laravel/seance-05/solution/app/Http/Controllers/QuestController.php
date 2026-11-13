<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestRequest;
use App\Http\Requests\UpdateQuestRequest;
use App\Models\Category;
use App\Models\Location;
use App\Models\Quest;
use App\Services\QuestService;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    public function __construct(private QuestService $quests) {}

    public function index(Request $request)
    {
        $quests = Quest::query()
            ->with('category')
            ->when(
                $request->query('search'),
                fn ($query, $search) => $query->where('title', 'like', "%{$search}%")
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

    public function show(Quest $quest)
    {
        return view('quests.show', [
            'quest' => $quest->load(['category', 'locations']),
        ]);
    }

    public function create()
    {
        return view('quests.create', [
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function store(StoreQuestRequest $request)
    {
        $quest = $this->quests->create($request->validated());

        return redirect()->route('quests.show', $quest)->with('success', 'Quête créée !');
    }

    public function edit(Quest $quest)
    {
        return view('quests.edit', [
            'quest' => $quest,
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function update(UpdateQuestRequest $request, Quest $quest)
    {
        $this->quests->update($quest, $request->validated());

        return redirect()->route('quests.show', $quest)->with('success', 'Quête mise à jour !');
    }

    public function destroy(Quest $quest)
    {
        $quest->locations()->detach();
        $quest->delete();

        return redirect()->route('quests.index')->with('success', 'Quête supprimée !');
    }
}
