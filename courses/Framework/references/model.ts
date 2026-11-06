// Panorama « le modèle Eloquent » — https://laravel.com/docs/12.x/eloquent
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Propriétés
  { name: '$fillable', desc: 'Colonnes remplissables en masse', group: 'Propriétés', seen: 's3-ch2' },
  { name: '$guarded', desc: 'Colonnes interdites en masse', group: 'Propriétés' },
  { name: 'casts()', desc: 'Convertir un attribut (date, booléen…)', group: 'Propriétés', seen: 's3-ch2' },
  { name: '$hidden', desc: 'Masquer des attributs en JSON', group: 'Propriétés' },
  { name: '$table', desc: 'Nom de table hors convention', group: 'Propriétés' },
  { name: '$primaryKey', desc: 'Clé primaire hors convention', group: 'Propriétés' },
  { name: '$timestamps', desc: 'Désactiver created_at / updated_at', group: 'Propriétés' },
  { name: '$with', desc: 'Relations toujours chargées', group: 'Propriétés' },
  // Écrire
  { name: 'Model::create([...])', desc: 'Créer et enregistrer en une ligne', group: 'Écrire', seen: 's3-ch2' },
  { name: 'new Model + ->save()', desc: 'Créer puis enregistrer', group: 'Écrire', seen: 's3-ch1' },
  { name: '->update([...])', desc: 'Modifier et enregistrer', group: 'Écrire', seen: 's5-ch4' },
  { name: '->delete()', desc: 'Supprimer l\'enregistrement', group: 'Écrire', seen: 's5-ch4' },
  { name: 'Model::destroy($id)', desc: 'Supprimer par clé primaire', group: 'Écrire' },
  { name: 'firstOrCreate()', desc: 'Trouver ou créer', group: 'Écrire' },
  { name: 'updateOrCreate()', desc: 'Mettre à jour ou créer', group: 'Écrire' },
  // Outils
  { name: 'HasFactory', desc: 'Brancher la factory du modèle', group: 'Outils', seen: 's3-ch4' },
  { name: 'SoftDeletes', desc: 'Corbeille au lieu de supprimer', group: 'Outils' },
  { name: 'scopeX()', desc: 'Requête réutilisable nommée', group: 'Outils' },
  { name: 'Attribute::make()', desc: 'Transformer un attribut (accessor)', group: 'Outils' },
  { name: '->toArray() / ->toJson()', desc: 'Convertir en tableau ou JSON', group: 'Outils' },
]
