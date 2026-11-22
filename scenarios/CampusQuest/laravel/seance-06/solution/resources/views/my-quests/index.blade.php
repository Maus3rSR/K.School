@extends('layouts.app')

@section('title', 'Mes quêtes')

@section('styles')
    @vite(['resources/css/quests.css', 'resources/css/forms.css'])
@endsection

@section('content')
    <h1>Mes quêtes</h1>

    <ul class="quest-list">
        @forelse ($quests as $quest)
            <li>
                <a class="quest-card" href="{{ route('quests.show', $quest) }}">
                    <span>
                        {{ $quest->title }}
                        <small>— {{ $quest->category->name }}</small>
                    </span>
                    <span class="xp">{{ $quest->xp }} XP</span>
                </a>

                <form method="POST" action="{{ route('my-quests.destroy', $quest) }}">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="danger">Abandonner</button>
                </form>
            </li>
        @empty
            <p>Vous n'avez accepté aucune quête pour l'instant.</p>
        @endforelse
    </ul>

    <p><strong>Total : {{ $quests->sum('xp') }} XP</strong></p>
@endsection
