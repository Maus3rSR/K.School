// Panorama « les migrations » — https://laravel.com/docs/12.x/migrations
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Colonnes
  { name: 'id()', desc: 'Clé primaire auto-incrémentée', group: 'Colonnes', seen: 's3-ch1' },
  { name: 'string()', desc: 'Texte court (VARCHAR)', group: 'Colonnes', seen: 's3-ch1' },
  { name: 'text()', desc: 'Texte long', group: 'Colonnes', seen: 's3-ch2' },
  { name: 'integer() / unsignedInteger()', desc: 'Nombre entier', group: 'Colonnes', seen: 's3-ch2' },
  { name: 'decimal()', desc: 'Nombre exact (prix, note)', group: 'Colonnes', seen: 's3-ch2' },
  { name: 'boolean()', desc: 'Vrai ou faux', group: 'Colonnes', seen: 's3-ch2' },
  { name: 'date() / dateTime()', desc: 'Date, date et heure', group: 'Colonnes' },
  { name: 'timestamps()', desc: 'Colonnes created_at et updated_at', group: 'Colonnes', seen: 's3-ch1' },
  { name: 'foreignId()', desc: 'Colonne de clé étrangère', group: 'Colonnes', seen: 's3-ch2' },
  // Modificateurs
  { name: '->nullable()', desc: 'Accepter NULL', group: 'Modificateurs', seen: 's3-ch1' },
  { name: '->default()', desc: 'Valeur par défaut', group: 'Modificateurs', seen: 's3-ch2' },
  { name: '->unique()', desc: 'Interdire les doublons', group: 'Modificateurs' },
  { name: '->index()', desc: 'Accélérer les recherches', group: 'Modificateurs' },
  { name: '->constrained()', desc: 'Lier la clé à sa table', group: 'Modificateurs', seen: 's3-ch2' },
  { name: '->cascadeOnDelete()', desc: 'Supprimer les lignes liées en cascade', group: 'Modificateurs' },
  // Structure
  { name: 'Schema::create()', desc: 'Créer une table', group: 'Structure', seen: 's3-ch1' },
  { name: 'Schema::table()', desc: 'Modifier une table existante', group: 'Structure', seen: 's3-ch1' },
  { name: '->change()', desc: 'Modifier une colonne existante', group: 'Structure' },
  { name: 'dropColumn()', desc: 'Supprimer une colonne', group: 'Structure', seen: 's3-ch1' },
  { name: 'Schema::dropIfExists()', desc: 'Supprimer la table (down)', group: 'Structure', seen: 's3-ch1' },
  // Commandes
  { name: 'artisan migrate', desc: 'Jouer les migrations en attente', group: 'Commandes', seen: 's1-ch3' },
  { name: 'artisan migrate:rollback', desc: 'Annuler le dernier lot', group: 'Commandes', seen: 's3-ch1' },
]
