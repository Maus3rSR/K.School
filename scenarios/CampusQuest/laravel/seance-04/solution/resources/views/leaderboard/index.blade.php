@extends('layouts.app')

@section('title', 'Classement')

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>Classement</h1>

    <h2>Catégories les plus généreuses en XP</h2>
    <ol class="quest-list">
        @foreach ($categories as $category)
            <li class="ranking">
                <span>{{ $loop->iteration }}. {{ $category->name }}</span>
                <span class="xp">{{ $category->quests_sum_xp ?? 0 }} XP</span>
            </li>
        @endforeach
    </ol>

    <h2>Lieux les plus chargés en quêtes</h2>
    <ol class="quest-list">
        @foreach ($locations as $location)
            <li class="ranking">
                <span>{{ $loop->iteration }}. {{ $location->name }}</span>
                <span class="badge">{{ $location->quests_count }} quêtes</span>
            </li>
        @endforeach
    </ol>
@endsection
