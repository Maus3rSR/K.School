<?php

use App\Http\Controllers\QuestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/quests', [QuestController::class, 'index'])
    ->name('quests.index');
Route::get('/quests/{id}', [QuestController::class, 'show'])
    ->whereNumber('id')
    ->name('quests.show');
