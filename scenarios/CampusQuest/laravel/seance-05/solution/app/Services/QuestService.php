<?php

namespace App\Services;

use App\Models\Quest;
use Illuminate\Support\Arr;

class QuestService
{
    public function create(array $data): Quest
    {
        $quest = Quest::create(Arr::except($data, 'location_ids'));
        $quest->locations()->sync($data['location_ids'] ?? []);
        $this->unfeatureOthers($quest);

        return $quest;
    }

    public function update(Quest $quest, array $data): Quest
    {
        $quest->update(Arr::except($data, 'location_ids'));
        $quest->locations()->sync($data['location_ids'] ?? []);
        $this->unfeatureOthers($quest);

        return $quest;
    }

    private function unfeatureOthers(Quest $quest): void
    {
        if ($quest->featured) {
            Quest::where('featured', true)
                ->whereKeyNot($quest->id)
                ->update(['featured' => false]);
        }
    }
}
