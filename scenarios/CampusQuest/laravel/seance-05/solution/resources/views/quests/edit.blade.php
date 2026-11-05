@extends('layouts.app')

@section('title', 'Modifier la quête')

@section('styles')
    @vite('resources/css/forms.css')
@endsection

@section('content')
    <h1>Modifier la quête</h1>

    <form method="POST" action="{{ route('quests.update', $quest) }}">
        @csrf
        @method('PUT')

        <label for="title">Titre</label>
        <input id="title" name="title" type="text" value="{{ old('title', $quest->title) }}">
        @error('title')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="description">Description</label>
        <textarea id="description" name="description">{{ old('description', $quest->description) }}</textarea>
        @error('description')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="xp">XP</label>
        <input id="xp" name="xp" type="number" value="{{ old('xp', $quest->xp) }}">
        @error('xp')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="difficulty">Difficulté</label>
        <select id="difficulty" name="difficulty">
            <option value="easy" @selected(old('difficulty', $quest->difficulty) === 'easy')>Facile</option>
            <option value="medium" @selected(old('difficulty', $quest->difficulty) === 'medium')>Moyenne</option>
            <option value="hard" @selected(old('difficulty', $quest->difficulty) === 'hard')>Difficile</option>
        </select>
        @error('difficulty')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="category_id">Catégorie</label>
        <select id="category_id" name="category_id">
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" @selected((int) old('category_id', $quest->category_id) === $category->id)>{{ $category->name }}</option>
            @endforeach
        </select>
        @error('category_id')
            <p class="error">{{ $message }}</p>
        @enderror

        <fieldset>
            <legend>Lieux</legend>
            @foreach ($locations as $location)
                <label>
                    <input type="checkbox" name="location_ids[]" value="{{ $location->id }}" @checked(in_array($location->id, old('location_ids', $quest->locations->pluck('id')->all())))>
                    {{ $location->name }}
                </label>
            @endforeach
        </fieldset>

        <input type="hidden" name="featured" value="0">
        <label>
            <input type="checkbox" name="featured" value="1" @checked(old('featured', $quest->featured))>
            Quête à la une
        </label>

        <button type="submit">Enregistrer les modifications</button>
    </form>
@endsection
