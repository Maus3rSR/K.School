// Panorama « l'autorisation » — https://laravel.com/docs/12.x/authorization
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Gates
  { name: 'Gate::define()', desc: 'Déclarer une règle nommée', group: 'Gates', seen: 's6-ch5' },
  { name: 'Gate::allows() / denies()', desc: 'Tester une règle (vrai ou faux)', group: 'Gates' },
  { name: 'Gate::authorize()', desc: 'Tester, sinon erreur 403', group: 'Gates' },
  { name: 'Gate::before()', desc: 'Règle prioritaire (super-admin)', group: 'Gates' },
  { name: '$user->can() / cannot()', desc: 'Tester une règle pour un utilisateur', group: 'Gates', seen: 's6-ch5' },
  // Vérifier
  { name: '->middleware(\'can:admin\')', desc: 'Protéger une route par une Gate', group: 'Vérifier', seen: 's6-ch5' },
  { name: '->can(\'update\', \'quest\')', desc: 'Protéger une route par une Policy', group: 'Vérifier' },
  { name: 'authorize() (Form Request)', desc: 'Refuser la requête avant validation', group: 'Vérifier', seen: 's6-ch5' },
  { name: 'abort(403)', desc: 'Refuser à la main', group: 'Vérifier' },
  // Blade
  { name: '@can / @endcan', desc: 'Afficher si autorisé', group: 'Blade', seen: 's6-ch5' },
  { name: '@cannot', desc: 'Afficher si refusé', group: 'Blade' },
  { name: '@canany([...])', desc: 'Afficher si une des règles passe', group: 'Blade' },
  // Policies
  { name: 'artisan make:policy --model=', desc: 'Générer une Policy liée à un modèle', group: 'Policies', seen: 's6-ch5' },
  { name: 'viewAny / view / create', desc: 'Méthodes de lecture et de création', group: 'Policies' },
  { name: 'update / delete', desc: 'Méthodes de modification', group: 'Policies', seen: 's6-ch5' },
  { name: '@can(\'update\', $quest)', desc: 'Vérifier une Policy dans Blade', group: 'Policies' },
  { name: 'Response::deny(\'…\')', desc: 'Refuser avec un message', group: 'Policies' },
]
