// Panorama « Artisan » — https://laravel.com/docs/12.x/artisan
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Découvrir
  { name: 'artisan list', desc: 'Lister toutes les commandes', group: 'Découvrir', seen: 's1-ch4' },
  { name: 'artisan about', desc: 'Résumé de l\'application', group: 'Découvrir', seen: 's1-ch3' },
  { name: 'artisan <commande> --help', desc: 'Afficher l\'aide d\'une commande', group: 'Découvrir' },
  { name: 'artisan tinker', desc: 'Console PHP interactive', group: 'Découvrir', seen: 's3-ch1' },
  { name: 'artisan route:list', desc: 'Lister toutes les routes', group: 'Découvrir', seen: 's1-ch4' },
  // Générer
  { name: 'make:controller', desc: 'Générer un contrôleur', group: 'Générer', seen: 's2-ch3' },
  { name: 'make:model', desc: 'Générer un modèle Eloquent', group: 'Générer', seen: 's3-ch1' },
  { name: 'make:migration', desc: 'Générer une migration', group: 'Générer', seen: 's3-ch1' },
  { name: 'make:factory', desc: 'Générer une factory', group: 'Générer', seen: 's3-ch4' },
  { name: 'make:seeder', desc: 'Générer un seeder', group: 'Générer', seen: 's3-ch4' },
  { name: 'make:request', desc: 'Générer une Form Request', group: 'Générer', seen: 's5-ch6' },
  { name: 'make:middleware', desc: 'Générer un middleware', group: 'Générer' },
  { name: 'make:policy', desc: 'Générer une policy d\'autorisation', group: 'Générer' },
  { name: 'make:test', desc: 'Générer une classe de test', group: 'Générer' },
  // Base de données
  { name: 'migrate', desc: 'Jouer les migrations en attente', group: 'Base de données', seen: 's1-ch3' },
  { name: 'migrate:rollback', desc: 'Annuler le dernier lot de migrations', group: 'Base de données', seen: 's3-ch1' },
  { name: 'migrate:status', desc: 'Voir les migrations jouées', group: 'Base de données', seen: 's3-ch1' },
  { name: 'migrate:fresh --seed', desc: 'Recréer la base et la peupler', group: 'Base de données', seen: 's3-ch4' },
  { name: 'db:seed', desc: 'Lancer les seeders', group: 'Base de données', seen: 's3-ch4' },
  // Maintenance
  { name: 'optimize:clear', desc: 'Vider tous les caches', group: 'Maintenance' },
  { name: 'storage:link', desc: 'Rendre les fichiers publics accessibles', group: 'Maintenance' },
  { name: 'vendor:publish', desc: 'Copier les fichiers d\'un package', group: 'Maintenance' },
  { name: 'lang:publish', desc: 'Copier les fichiers de traduction', group: 'Maintenance' },
  { name: 'test', desc: 'Lancer les tests', group: 'Maintenance' },
]
