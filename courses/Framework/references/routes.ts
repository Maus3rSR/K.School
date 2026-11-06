// Panorama « les routes » — https://laravel.com/docs/12.x/routing
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Déclarer
  { name: 'Route::get()', desc: 'Répondre à une lecture (GET)', group: 'Déclarer', seen: 's2-ch1' },
  { name: 'Route::post()', desc: 'Recevoir un formulaire de création', group: 'Déclarer', seen: 's5-ch1' },
  { name: 'Route::put() / patch()', desc: 'Modifier une ressource', group: 'Déclarer', seen: 's5-ch4' },
  { name: 'Route::delete()', desc: 'Supprimer une ressource', group: 'Déclarer', seen: 's5-ch4' },
  { name: 'Route::view()', desc: 'Afficher une vue sans contrôleur', group: 'Déclarer' },
  { name: 'Route::redirect()', desc: 'Rediriger une URL vers une autre', group: 'Déclarer' },
  { name: 'Route::resource()', desc: 'Déclarer les 7 routes CRUD d\'un contrôleur', group: 'Déclarer', seen: 's5-ch5' },
  { name: '[Controller::class, \'action\']', desc: 'Brancher la route sur un contrôleur', group: 'Déclarer', seen: 's2-ch3' },
  // Paramètres
  { name: '{id}', desc: 'Capturer un segment d\'URL', group: 'Paramètres', seen: 's2-ch1' },
  { name: '{id?}', desc: 'Paramètre optionnel', group: 'Paramètres', seen: 's2-ch1' },
  { name: '->whereNumber()', desc: 'Accepter uniquement des chiffres', group: 'Paramètres', seen: 's2-ch1' },
  { name: '->where()', desc: 'Contraindre avec une expression régulière', group: 'Paramètres' },
  { name: '{game} + type Game', desc: 'Recevoir directement le modèle (binding)', group: 'Paramètres', seen: 's5-ch5' },
  // Nommer et générer
  { name: '->name()', desc: 'Nommer la route', group: 'Nommer et générer', seen: 's2-ch1' },
  { name: 'route()', desc: 'Générer l\'URL d\'une route nommée', group: 'Nommer et générer', seen: 's2-ch1' },
  { name: 'request()->routeIs()', desc: 'Tester la route courante (menu actif)', group: 'Nommer et générer' },
  // Grouper
  { name: 'Route::prefix()', desc: 'Préfixer les URL d\'un groupe', group: 'Grouper' },
  { name: 'Route::name()', desc: 'Préfixer les noms d\'un groupe', group: 'Grouper' },
  { name: 'Route::middleware()', desc: 'Protéger un groupe de routes', group: 'Grouper' },
  { name: 'Route::controller()', desc: 'Partager un contrôleur entre routes', group: 'Grouper' },
  { name: 'Route::fallback()', desc: 'Répondre quand aucune route ne correspond', group: 'Grouper' },
  // Outils
  { name: 'artisan route:list', desc: 'Lister toutes les routes', group: 'Outils', seen: 's1-ch4' },
]
