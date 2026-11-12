@extends('layouts.app')

@section('title', 'Quêtes')

@section('styles')
    @vite(['resources/css/quests.css', 'resources/css/forms.css'])
@endsection

@section('content')
    <h1>Quêtes disponibles</h1>

    <p><a href="{{ route('quests.create') }}">➕ Nouvelle quête</a></p>

    <form class="quest-filters" method="GET" action="{{ route('quests.index') }}">
        <input type="search" name="q" value="{{ request('q') }}" placeholder="Rechercher une quête…">

        <select name="category">
            <option value="">Toutes les catégories</option>
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" @selected(request('category') == $category->id)>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>

        <button type="submit">Filtrer</button>
        <a class="reset" href="{{ route('quests.index') }}">Réinitialiser</a>
    </form>

    <ul class="quest-list">
        @forelse ($quests as $quest)
            <li>
                <a class="quest-card" href="{{ route('quests.show', $quest) }}">
                    <span>
                        {{ $quest->title }}
                        <small>— {{ $quest->category->name }}</small>
                    </span>
                    <span class="xp">{{ $quest->xp }} XP</span>
                    <span class="badge badge--{{ $quest->difficulty }}">{{ $quest->difficulty }}</span>
                </a>
            </li>
        @empty
            <p>Aucune quête ne correspond à votre recherche.</p>
        @endforelse
    </ul>

    {{ $quests->links() }}
@endsection
