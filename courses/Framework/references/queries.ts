// Panorama « les requêtes Eloquent » — https://laravel.com/docs/12.x/queries
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Récupérer
  { name: 'all()', desc: 'Tous les enregistrements', group: 'Récupérer', seen: 's3-ch5' },
  { name: 'find()', desc: 'Un enregistrement par clé', group: 'Récupérer', seen: 's3-ch1' },
  { name: 'findOrFail()', desc: 'Un par clé, sinon 404', group: 'Récupérer', seen: 's3-ch5' },
  { name: 'first()', desc: 'Le premier résultat', group: 'Récupérer', seen: 's3-ch2' },
  { name: 'get()', desc: 'Exécuter et récupérer la collection', group: 'Récupérer', seen: 's4-ch1' },
  { name: 'pluck()', desc: 'Une seule colonne', group: 'Récupérer', seen: 's4-ch1' },
  { name: 'paginate()', desc: 'Résultats page par page', group: 'Récupérer', seen: 's4-ch6' },
  // Filtrer
  { name: 'where()', desc: 'Filtrer sur une condition', group: 'Filtrer', seen: 's4-ch1' },
  { name: 'orWhere()', desc: 'Condition alternative', group: 'Filtrer', seen: 's4-ch1' },
  { name: 'whereIn()', desc: 'Valeur parmi une liste', group: 'Filtrer', seen: 's4-ch1' },
  { name: 'whereNull()', desc: 'Colonne vide', group: 'Filtrer', seen: 's4-ch1' },
  { name: 'whereBetween()', desc: 'Valeur dans un intervalle', group: 'Filtrer', seen: 's4-ch1' },
  { name: 'when()', desc: 'Filtre conditionnel (si paramètre présent)', group: 'Filtrer', seen: 's4-ch2' },
  // Trier et limiter
  { name: 'orderBy()', desc: 'Trier les résultats', group: 'Trier et limiter', seen: 's4-ch1' },
  { name: 'latest()', desc: 'Les plus récents d\'abord', group: 'Trier et limiter', seen: 's4-ch1' },
  { name: 'limit() / take()', desc: 'Limiter le nombre de résultats', group: 'Trier et limiter', seen: 's4-ch1' },
  { name: 'select()', desc: 'Choisir les colonnes', group: 'Trier et limiter' },
  // Agréger
  { name: 'count()', desc: 'Compter les résultats', group: 'Agréger', seen: 's3-ch1' },
  { name: 'sum() / avg()', desc: 'Somme ou moyenne d\'une colonne', group: 'Agréger', seen: 's4-ch5' },
  { name: 'max()', desc: 'La plus grande valeur', group: 'Agréger', seen: 's4-ch5' },
  { name: 'groupBy() / having', desc: 'Regrouper puis filtrer les groupes', group: 'Agréger', seen: 's4-ch5' },
  { name: 'exists()', desc: 'Tester s\'il y a au moins un résultat', group: 'Agréger' },
  // Déboguer
  { name: 'toSql() / dd()', desc: 'Voir le SQL et les bindings générés', group: 'Déboguer', seen: 's4-ch1' },
  { name: 'toRawSql()', desc: 'Voir le SQL généré', group: 'Déboguer' },
]
