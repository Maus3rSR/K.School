// Panorama « les relations » — https://laravel.com/docs/12.x/eloquent-relationships
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Déclarer
  { name: 'hasOne()', desc: 'Un-à-un, côté parent', group: 'Déclarer' },
  { name: 'hasMany()', desc: 'Un-à-plusieurs, côté parent', group: 'Déclarer', seen: 's3-ch2' },
  { name: 'belongsTo()', desc: 'Côté qui porte la clé étrangère', group: 'Déclarer', seen: 's3-ch2' },
  { name: 'belongsToMany()', desc: 'Plusieurs-à-plusieurs via pivot', group: 'Déclarer', seen: 's3-ch3' },
  { name: 'hasManyThrough()', desc: 'Relation via une table intermédiaire', group: 'Déclarer' },
  { name: 'morphMany() / morphTo()', desc: 'Relation polymorphe', group: 'Déclarer' },
  // Pivot
  { name: '->withPivot()', desc: 'Lire des colonnes de la pivot', group: 'Pivot' },
  { name: '->withTimestamps()', desc: 'Dater les lignes de la pivot', group: 'Pivot' },
  { name: '$x->pivot->colonne', desc: 'Accéder à une colonne pivot', group: 'Pivot' },
  // Lire
  { name: '$quest->category', desc: 'Propriété : le résultat chargé', group: 'Lire', seen: 's3-ch2' },
  { name: '$quest->category()', desc: 'Méthode : une requête à compléter', group: 'Lire', seen: 's3-ch2' },
  { name: 'with()', desc: 'Charger d\'avance (anti N+1)', group: 'Lire' },
  { name: 'load()', desc: 'Charger après coup', group: 'Lire' },
  { name: 'withCount()', desc: 'Compter les éléments liés', group: 'Lire' },
  { name: 'has() / whereHas()', desc: 'Filtrer selon une relation', group: 'Lire' },
  // Écrire
  { name: 'attach()', desc: 'Ajouter un lien pivot', group: 'Écrire', seen: 's3-ch3' },
  { name: 'detach()', desc: 'Retirer un lien pivot', group: 'Écrire', seen: 's3-ch3' },
  { name: 'sync()', desc: 'Remplacer tous les liens pivot', group: 'Écrire', seen: 's3-ch3' },
  { name: 'toggle()', desc: 'Inverser un lien pivot', group: 'Écrire' },
  { name: 'associate() / dissociate()', desc: 'Lier ou délier côté belongsTo', group: 'Écrire' },
  { name: '->quests()->create()', desc: 'Créer un enfant déjà lié', group: 'Écrire', seen: 's3-ch2' },
]
