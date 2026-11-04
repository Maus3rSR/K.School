<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') — Campus Quest</title>
    @vite(['resources/css/app.css'])
    @yield('styles')
</head>
<body>
    @include('partials.nav')
    <main>
        @if (session('success'))
            <div class="flash">{{ session('success') }}</div>
        @endif

        @yield('content')
    </main>
</body>
</html>
