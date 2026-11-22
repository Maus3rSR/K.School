@extends('layouts.app')

@section('title', $quest->title)

@section('styles')
    @vite(['resources/css/quests.css', 'resources/css/forms.css'])
@endsection

@section('content')
    <h1>{{ $quest->title }}</h1>

    <p>
        <span class="xp">{{ $quest->xp }} XP</span>
        <span class="badge badge--{{ $quest->difficulty }}">{{ $quest->difficulty }}</span>
        <span class="badge">{{ $quest->category->name }}</span>
    </p>

    <p>{!! nl2br(e($quest->description)) !!}</p>

    <h2>Lieux</h2>
    <ul>
        @forelse ($quest->locations as $location)
            <li>{{ $location->name }}</li>
        @empty
            <li>Aucun lieu rattaché.</li>
        @endforelse
    </ul>

    @auth
        @if (Auth::user()->acceptedQuests->contains($quest))
            <p>✅ Vous avez accepté cette quête.</p>
        @else
            <form method="POST" action="{{ route('my-quests.store', $quest) }}">
                @csrf
                <button type="submit">Accepter la quête</button>
            </form>
        @endif
    @endauth

    <div class="actions">
        <a href="{{ route('quests.index') }}">← Retour aux quêtes</a>

        @can('admin')
            <a href="{{ route('quests.edit', $quest) }}">✏️ Modifier</a>

            <form method="POST" action="{{ route('quests.destroy', $quest) }}">
                @csrf
                @method('DELETE')
                <button type="submit" class="danger">Supprimer</button>
            </form>
        @endcan
    </div>
@endsection
