@extends('layouts.app')

@section('title', 'Quêtes')

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>Quêtes disponibles</h1>

    <ul class="quest-list">
        @forelse ($quests as $quest)
            <li>
                <a class="quest-card" href="{{ route('quests.show', $quest->id) }}">
                    <span>
                        {{ $quest->title }}
                        <small>— {{ $quest->category->name }}</small>
                    </span>
                    <span class="xp">{{ $quest->xp }} XP</span>
                    <span class="badge badge--{{ $quest->difficulty }}">{{ $quest->difficulty }}</span>
                </a>
            </li>
        @empty
            <p>Aucune quête pour le moment.</p>
        @endforelse
    </ul>
@endsection
