@extends('layouts.app')

@section('title', 'Introuvable')

@section('content')
    <h1>Cette quête n'existe pas (encore)</h1>
    <a href="{{ route('quests.index') }}">← Retour aux quêtes</a>
@endsection
