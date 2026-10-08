@extends('layouts.app')

@section('title', $quest['title'])

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>{{ $quest['title'] }}</h1>
    <p>
        <span class="xp">{{ $quest['xp'] }} XP</span>
        <span class="badge badge--{{ $quest['difficulty'] }}">{{ $quest['difficulty'] }}</span>
    </p>
    <p>Quête n°{{ $id }}</p>
    <a href="{{ route('quests.index') }}">← Retour aux quêtes</a>
@endsection
