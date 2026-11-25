// Panorama « le cache » — https://laravel.com/docs/12.x/cache
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Lire / écrire
  { name: 'Cache::remember()', desc: 'Valeur en cache, sinon closure puis stockage', group: 'Lire / écrire', seen: 's7-ch4' },
  { name: 'Cache::get()', desc: 'Lire une valeur en cache', group: 'Lire / écrire' },
  { name: 'Cache::put()', desc: 'Écrire une valeur en cache', group: 'Lire / écrire' },
  { name: 'Cache::has()', desc: 'Tester si une clé existe', group: 'Lire / écrire' },
  { name: 'Cache::rememberForever()', desc: 'Comme remember, sans expiration', group: 'Lire / écrire' },
  { name: 'Cache::flexible()', desc: 'TTL souple : durée min et max', group: 'Lire / écrire' },
  // Invalider
  { name: 'Cache::forget()', desc: 'Supprimer une entrée du cache', group: 'Invalider', seen: 's7-ch4' },
  { name: 'Cache::flush()', desc: 'Vider tout le cache', group: 'Invalider' },
  { name: 'artisan cache:clear', desc: 'Vider le cache depuis la console', group: 'Invalider', seen: 's7-ch4' },
  // Configurer
  { name: 'CACHE_STORE', desc: 'Store de cache dans .env (database, file…)', group: 'Configurer', seen: 's7-ch4' },
  { name: 'now()->addMinutes()', desc: 'TTL : durée de vie de l\'entrée', group: 'Configurer', seen: 's7-ch4' },
]
