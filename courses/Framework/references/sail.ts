// Panorama « Sail » — https://laravel.com/docs/12.x/sail
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Conteneurs
  { name: 'sail up -d', desc: 'Démarrer les conteneurs en arrière-plan', group: 'Conteneurs', seen: 's1-ch3' },
  { name: 'sail down', desc: 'Arrêter et supprimer les conteneurs', group: 'Conteneurs' },
  { name: 'sail stop', desc: 'Arrêter sans supprimer les conteneurs', group: 'Conteneurs' },
  { name: 'sail ps', desc: 'Voir l\'état des conteneurs', group: 'Conteneurs' },
  { name: 'sail restart', desc: 'Redémarrer les conteneurs', group: 'Conteneurs' },
  { name: 'sail build --no-cache', desc: 'Reconstruire les images', group: 'Conteneurs' },
  { name: 'sail logs', desc: 'Lire les logs des conteneurs', group: 'Conteneurs' },
  // Outils
  { name: 'sail artisan …', desc: 'Lancer Artisan dans le conteneur', group: 'Outils', seen: 's1-ch3' },
  { name: 'sail composer …', desc: 'Lancer Composer dans le conteneur', group: 'Outils' },
  { name: 'sail npm …', desc: 'Lancer npm dans le conteneur', group: 'Outils', seen: 's2-ch5' },
  { name: 'sail php …', desc: 'Lancer PHP dans le conteneur', group: 'Outils' },
  { name: 'sail tinker', desc: 'Console PHP interactive', group: 'Outils' },
  { name: 'sail test', desc: 'Lancer les tests', group: 'Outils' },
  // Accès
  { name: 'sail shell', desc: 'Ouvrir un terminal dans le conteneur', group: 'Accès' },
  { name: 'sail mariadb', desc: 'Ouvrir le client SQL de la base', group: 'Accès' },
]
