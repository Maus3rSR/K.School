// Panorama « l'authentification » — https://laravel.com/docs/12.x/authentication
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Installer
  { name: 'composer require laravel/breeze --dev', desc: 'Ajouter le starter kit', group: 'Installer', seen: 's6-ch1' },
  { name: 'artisan breeze:install blade', desc: 'Générer routes, contrôleurs et vues', group: 'Installer', seen: 's6-ch1' },
  { name: 'require __DIR__.\'/auth.php\'', desc: 'Brancher les routes de Breeze', group: 'Installer', seen: 's6-ch1' },
  // Connecter
  { name: 'Auth::attempt()', desc: 'Vérifier email et mot de passe', group: 'Connecter', seen: 's6-ch2' },
  { name: '$request->session()->regenerate()', desc: 'Nouvel identifiant de session', group: 'Connecter', seen: 's6-ch2' },
  { name: 'redirect()->intended()', desc: 'Revenir à la page demandée', group: 'Connecter', seen: 's6-ch2' },
  { name: 'Auth::login($user)', desc: 'Connecter un utilisateur sans mot de passe', group: 'Connecter' },
  { name: 'Auth::logout()', desc: 'Déconnecter', group: 'Connecter', seen: 's6-ch2' },
  // Utilisateur courant
  { name: 'Auth::user()', desc: 'Le User connecté, ou null', group: 'Utilisateur courant', seen: 's6-ch2' },
  { name: '$request->user()', desc: 'Idem, depuis la requête', group: 'Utilisateur courant', seen: 's6-ch6' },
  { name: 'Auth::check()', desc: 'Quelqu\'un est-il connecté ?', group: 'Utilisateur courant' },
  { name: 'Auth::id()', desc: 'L\'id du User connecté', group: 'Utilisateur courant' },
  { name: '@auth / @guest', desc: 'Afficher selon la connexion', group: 'Utilisateur courant', seen: 's6-ch2' },
  // Mots de passe
  { name: '\'password\' => \'hashed\'', desc: 'Cast qui hache à l\'enregistrement', group: 'Mots de passe', seen: 's6-ch3' },
  { name: 'Hash::make()', desc: 'Calculer une empreinte', group: 'Mots de passe' },
  { name: 'Hash::check()', desc: 'Comparer une saisie à une empreinte', group: 'Mots de passe', seen: 's6-ch3' },
  // Protéger
  { name: 'Route::middleware(\'auth\')->group()', desc: 'Réserver un groupe aux connectés', group: 'Protéger', seen: 's6-ch4' },
  { name: '->middleware(\'auth\')', desc: 'Réserver une route aux connectés', group: 'Protéger' },
  { name: '->middleware(\'guest\')', desc: 'Réserver une route aux invités', group: 'Protéger', seen: 's6-ch1' },
  { name: '->middleware(\'verified\')', desc: 'Exiger un email vérifié', group: 'Protéger' },
  { name: 'RateLimiter', desc: 'Limiter les essais de connexion', group: 'Protéger', seen: 's6-ch2' },
]
