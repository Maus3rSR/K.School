// Panorama « les Form Requests » — https://laravel.com/docs/12.x/validation#form-request-validation
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Créer
  { name: 'artisan make:request', desc: 'Générer une Form Request', group: 'Créer', seen: 's5-ch6' },
  { name: 'StoreXRequest $request', desc: 'Typer l\'action pour déclencher la validation', group: 'Créer', seen: 's5-ch6' },
  // Méthodes
  { name: 'authorize()', desc: 'Autoriser ou refuser la requête', group: 'Méthodes', seen: 's5-ch6' },
  { name: 'rules()', desc: 'Déclarer les règles', group: 'Méthodes', seen: 's5-ch6' },
  { name: 'messages()', desc: 'Personnaliser les messages d\'erreur', group: 'Méthodes', seen: 's5-ch6' },
  { name: 'attributes()', desc: 'Renommer les champs dans les messages', group: 'Méthodes' },
  { name: 'prepareForValidation()', desc: 'Nettoyer les données avant validation', group: 'Méthodes' },
  { name: 'after()', desc: 'Ajouter des vérifications après les règles', group: 'Méthodes' },
  // Accès
  { name: '$request->validated()', desc: 'Seulement les données validées', group: 'Accès', seen: 's5-ch6' },
  { name: '$request->safe()->only()', desc: 'Un sous-ensemble des données validées', group: 'Accès' },
  { name: '$this->route(\'quest\')', desc: 'Lire un paramètre de route', group: 'Accès' },
  { name: '$this->user()', desc: 'Utilisateur connecté', group: 'Accès' },
  // Option
  { name: '$stopOnFirstFailure', desc: 'S\'arrêter à la première erreur', group: 'Option' },
]
