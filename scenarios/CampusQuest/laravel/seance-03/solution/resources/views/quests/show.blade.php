@extends('layouts.app')

@section('title', $quest->title)

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>{{ $quest->title }}</h1>

    <p>
        <span class="xp">{{ $quest->xp }} XP</span>
        <span class="badge badge--{{ $quest->difficulty }}">{{ $quest->difficulty }}</span>
        <span class="badge">{{ $quest->category->name }}</span>
    </p>

    <p>{{ $quest->description }}</p>

    <h2>Lieux</h2>
    <ul>
        @forelse ($quest->locations as $location)
            <li>{{ $location->name }}</li>
        @empty
            <li>Aucun lieu rattaché.</li>
        @endforelse
    </ul>

    <p><a href="{{ route('quests.index') }}">← Retour aux quêtes</a></p>
@endsection
