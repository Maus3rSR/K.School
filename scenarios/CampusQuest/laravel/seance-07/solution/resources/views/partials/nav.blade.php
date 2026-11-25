<nav class="nav">
    <a href="/">Campus Quest</a>
    <a href="{{ route('quests.index') }}">Quêtes</a>
    <a href="{{ route('leaderboard.index') }}">Classement</a>

    @can('admin')
        <a href="{{ route('quests.create') }}">Nouvelle quête</a>
    @endcan

    <span class="nav__user">
        @auth
            <a href="{{ route('my-quests.index') }}">Mes quêtes <span data-my-quests-count>{{ Auth::user()->acceptedQuests()->count() }}</span></a>
            <span>{{ Auth::user()->name }}</span>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit">Déconnexion</button>
            </form>
        @endauth

        @guest
            <a href="{{ route('login') }}">Se connecter</a>
        @endguest
    </span>
</nav>
