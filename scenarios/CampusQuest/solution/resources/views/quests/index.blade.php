@extends('layouts.app')

@section('title', 'Quêtes')

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>Quêtes disponibles</h1>

    <div class="filters">
        <a href="{{ route('quests.index') }}">Toutes</a>
        <a href="{{ route('quests.index', ['difficulty' => 'easy']) }}">Faciles</a>
        <a href="{{ route('quests.index', ['difficulty' => 'hard']) }}">Difficiles</a>
    </div>

    <ul class="quest-list">
        @forelse ($quests as $id => $quest)
            <li>
                <a class="quest-card" href="{{ route('quests.show', $id) }}">
                    <span>{{ $quest['title'] }}</span>
                    <span><span class="xp">{{ $quest['xp'] }} XP</span>
                    <span class="badge badge--{{ $quest['difficulty'] }}">{{ $quest['difficulty'] }}</span></span>
                </a>
            </li>
        @empty
            <p>Aucune quête pour le moment.</p>
        @endforelse
    </ul>
@endsection
