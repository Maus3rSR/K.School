<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Quest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'xp',
        'difficulty', 'featured', 'category_id',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class);
    }

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
        ];
    }
}
