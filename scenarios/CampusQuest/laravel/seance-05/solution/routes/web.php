<?php

use App\Http\Controllers\QuestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('quests', QuestController::class);
