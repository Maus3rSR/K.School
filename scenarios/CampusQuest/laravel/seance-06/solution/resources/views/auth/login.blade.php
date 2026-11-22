@extends('layouts.app')

@section('title', 'Connexion')

@section('styles')
    @vite('resources/css/forms.css')
@endsection

@section('content')
    <h1>Connexion</h1>

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <label for="email">Email</label>
        <input id="email" name="email" type="email"
               value="{{ old('email') }}" required autofocus>
        @error('email')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="password">Mot de passe</label>
        <input id="password" name="password" type="password" required>

        <label>
            <input type="checkbox" name="remember" value="1">
            Se souvenir de moi
        </label>

        <button type="submit">Se connecter</button>
    </form>
@endsection
