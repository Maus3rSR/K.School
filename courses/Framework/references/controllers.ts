// Panorama « le contrôleur » — https://laravel.com/docs/12.x/controllers
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Créer
  { name: 'artisan make:controller', desc: 'Générer un contrôleur', group: 'Créer', seen: 's2-ch3' },
  { name: 'make:controller --resource', desc: 'Générer les 7 actions CRUD', group: 'Créer' },
  { name: '__invoke()', desc: 'Contrôleur à une seule action', group: 'Créer' },
  // Actions resource
  { name: 'index()', desc: 'Lister les ressources', group: 'Actions resource', seen: 's2-ch3' },
  { name: 'show($id)', desc: 'Afficher une ressource', group: 'Actions resource', seen: 's2-ch3' },
  { name: 'create()', desc: 'Afficher le formulaire de création', group: 'Actions resource', seen: 's5-ch1' },
  { name: 'store()', desc: 'Enregistrer une nouvelle ressource', group: 'Actions resource', seen: 's5-ch1' },
  { name: 'edit($id)', desc: 'Afficher le formulaire d\'édition', group: 'Actions resource', seen: 's5-ch4' },
  { name: 'update()', desc: 'Enregistrer les modifications', group: 'Actions resource', seen: 's5-ch4' },
  { name: 'destroy($id)', desc: 'Supprimer une ressource', group: 'Actions resource', seen: 's5-ch4' },
  // Lire la requête
  { name: 'Request $request', desc: 'Recevoir la requête HTTP (injection)', group: 'Lire la requête', seen: 's2-ch3' },
  { name: '$request->query()', desc: 'Lire un paramètre d\'URL (?x=)', group: 'Lire la requête', seen: 's2-ch3' },
  { name: '$request->input()', desc: 'Lire un champ de formulaire', group: 'Lire la requête', seen: 's5-ch1' },
  { name: '$request->validate()', desc: 'Valider les données reçues', group: 'Lire la requête', seen: 's5-ch3' },
  // Répondre
  { name: 'view()', desc: 'Renvoyer une page HTML', group: 'Répondre', seen: 's2-ch2' },
  { name: 'response()->json()', desc: 'Renvoyer du JSON', group: 'Répondre', seen: 's2-ch3' },
  { name: 'redirect()->route()', desc: 'Rediriger vers une route nommée', group: 'Répondre', seen: 's2-ch3' },
  { name: 'back()', desc: 'Revenir à la page précédente', group: 'Répondre' },
  { name: '->with(\'status\', …)', desc: 'Transmettre un message flash', group: 'Répondre', seen: 's5-ch1' },
  { name: 'abort(404)', desc: 'Interrompre avec une erreur HTTP', group: 'Répondre', seen: 's2-ch6' },
]
