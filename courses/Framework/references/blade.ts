// Panorama « Blade » — https://laravel.com/docs/12.x/blade
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Afficher
  { name: '{{ $var }}', desc: 'Afficher une donnée échappée', group: 'Afficher', seen: 's2-ch2' },
  { name: '{!! $html !!}', desc: 'Afficher du HTML brut (prudence)', group: 'Afficher', seen: 's2-ch2' },
  { name: '{{-- … --}}', desc: 'Commentaire invisible dans le HTML', group: 'Afficher', seen: 's2-ch2' },
  // Conditions
  { name: '@if / @elseif / @else', desc: 'Afficher selon une condition', group: 'Conditions', seen: 's2-ch2' },
  { name: '@unless', desc: 'Condition inversée', group: 'Conditions' },
  { name: '@isset / @empty($x)', desc: 'Tester si une variable existe ou est vide', group: 'Conditions' },
  { name: '@switch', desc: 'Choisir parmi plusieurs cas', group: 'Conditions' },
  { name: '@class([...])', desc: 'Classes CSS conditionnelles', group: 'Conditions' },
  // Boucles
  { name: '@foreach', desc: 'Boucler sur un tableau', group: 'Boucles', seen: 's3-ch5' },
  { name: '@forelse / @empty', desc: 'Boucle avec cas « liste vide »', group: 'Boucles', seen: 's2-ch2' },
  { name: '@for / @while', desc: 'Boucles classiques', group: 'Boucles' },
  { name: '$loop', desc: 'Index, premier ou dernier tour', group: 'Boucles' },
  // Layouts
  { name: '@extends', desc: 'Hériter d\'un layout', group: 'Layouts', seen: 's2-ch4' },
  { name: '@yield', desc: 'Déclarer un emplacement dans le layout', group: 'Layouts', seen: 's2-ch4' },
  { name: '@section', desc: 'Remplir un emplacement du layout', group: 'Layouts', seen: 's2-ch4' },
  { name: '@include', desc: 'Insérer un fragment partagé', group: 'Layouts', seen: 's2-ch4' },
  { name: '@push / @stack', desc: 'Empiler scripts ou styles depuis une page', group: 'Layouts' },
  { name: '<x-composant>', desc: 'Composant Blade réutilisable', group: 'Layouts' },
  // Assets et formulaires
  { name: '@vite', desc: 'Charger CSS et JS via Vite', group: 'Assets et formulaires', seen: 's2-ch5' },
  { name: '@csrf', desc: 'Protéger un formulaire (jeton CSRF)', group: 'Assets et formulaires', seen: 's5-ch2' },
  { name: '@method', desc: 'Simuler PUT ou DELETE en formulaire', group: 'Assets et formulaires', seen: 's5-ch4' },
  { name: '@error', desc: 'Afficher l\'erreur de validation d\'un champ', group: 'Assets et formulaires', seen: 's5-ch3' },
  { name: '@selected($cond)', desc: 'Marquer une option de select choisie', group: 'Assets et formulaires', seen: 's4-ch2' },
  { name: '@checked($cond)', desc: 'Cocher une case selon une condition', group: 'Assets et formulaires', seen: 's5-ch3' },
  { name: 'old(\'champ\')', desc: 'Reprendre la valeur saisie après erreur', group: 'Assets et formulaires', seen: 's5-ch3' },
  // Accès
  { name: '@auth / @guest', desc: 'Afficher selon la connexion', group: 'Accès' },
  { name: '@can', desc: 'Afficher selon une permission', group: 'Accès' },
]
