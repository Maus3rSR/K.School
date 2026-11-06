// Panorama « les requêtes Eloquent » — https://laravel.com/docs/12.x/queries
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Récupérer
  { name: 'all()', desc: 'Tous les enregistrements', group: 'Récupérer', seen: 's3-ch5' },
  { name: 'find()', desc: 'Un enregistrement par clé', group: 'Récupérer', seen: 's3-ch1' },
  { name: 'findOrFail()', desc: 'Un par clé, sinon 404', group: 'Récupérer', seen: 's3-ch5' },
  { name: 'first()', desc: 'Le premier résultat', group: 'Récupérer', seen: 's3-ch2' },
  { name: 'get()', desc: 'Exécuter et récupérer la collection', group: 'Récupérer' },
  { name: 'pluck()', desc: 'Une seule colonne', group: 'Récupérer', seen: 's5-ch4' },
  { name: 'paginate()', desc: 'Résultats page par page', group: 'Récupérer' },
  // Filtrer
  { name: 'where()', desc: 'Filtrer sur une condition', group: 'Filtrer' },
  { name: 'orWhere()', desc: 'Condition alternative', group: 'Filtrer' },
  { name: 'whereIn()', desc: 'Valeur parmi une liste', group: 'Filtrer' },
  { name: 'whereNull()', desc: 'Colonne vide', group: 'Filtrer' },
  { name: 'whereBetween()', desc: 'Valeur dans un intervalle', group: 'Filtrer' },
  { name: 'when()', desc: 'Filtre conditionnel (si paramètre présent)', group: 'Filtrer' },
  // Trier et limiter
  { name: 'orderBy()', desc: 'Trier les résultats', group: 'Trier et limiter' },
  { name: 'latest()', desc: 'Les plus récents d\'abord', group: 'Trier et limiter' },
  { name: 'limit() / take()', desc: 'Limiter le nombre de résultats', group: 'Trier et limiter' },
  { name: 'select()', desc: 'Choisir les colonnes', group: 'Trier et limiter' },
  // Agréger
  { name: 'count()', desc: 'Compter les résultats', group: 'Agréger', seen: 's3-ch1' },
  { name: 'sum() / avg()', desc: 'Somme ou moyenne d\'une colonne', group: 'Agréger' },
  { name: 'exists()', desc: 'Tester s\'il y a au moins un résultat', group: 'Agréger' },
  // Déboguer
  { name: 'toRawSql()', desc: 'Voir le SQL généré', group: 'Déboguer' },
]
