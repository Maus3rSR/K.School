// Panorama « la validation » — https://laravel.com/docs/12.x/validation
// seen: 'sN-chM' = chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus).
export default [
  // Présence
  { name: 'required', desc: 'Champ présent et non vide', group: 'Présence', seen: 's5-ch3' },
  { name: 'nullable', desc: 'Champ facultatif (null accepté)', group: 'Présence', seen: 's5-ch3' },
  { name: 'sometimes', desc: 'Valider seulement si présent', group: 'Présence' },
  { name: 'required_if:champ,valeur', desc: 'Obligatoire selon un autre champ', group: 'Présence' },
  // Types
  { name: 'string', desc: 'Texte', group: 'Types', seen: 's5-ch3' },
  { name: 'integer', desc: 'Nombre entier', group: 'Types', seen: 's5-ch3' },
  { name: 'numeric', desc: 'Nombre (entier ou décimal)', group: 'Types', seen: 's5-ch3' },
  { name: 'boolean', desc: 'Vrai ou faux', group: 'Types', seen: 's5-ch3' },
  { name: 'array', desc: 'Tableau (cases à cocher multiples)', group: 'Types', seen: 's5-ch3' },
  { name: 'date', desc: 'Date valide', group: 'Types' },
  { name: 'email', desc: 'Adresse e-mail valide', group: 'Types' },
  { name: 'url', desc: 'URL valide', group: 'Types', seen: 's5-ch3' },
  // Valeurs
  { name: 'min / max', desc: 'Borne basse ou haute', group: 'Valeurs', seen: 's5-ch3' },
  { name: 'between:a,b', desc: 'Dans un intervalle', group: 'Valeurs', seen: 's5-ch3' },
  { name: 'in:a,b,c', desc: 'Parmi une liste fermée', group: 'Valeurs', seen: 's5-ch3' },
  { name: 'confirmed', desc: 'Champ de confirmation identique', group: 'Valeurs' },
  { name: 'regex:/…/', desc: 'Respecter un motif', group: 'Valeurs' },
  // Base de données
  { name: 'exists:table,colonne', desc: 'Valeur présente dans une table', group: 'Base de données', seen: 's5-ch3' },
  { name: 'unique:table,colonne', desc: 'Valeur pas encore utilisée', group: 'Base de données' },
  { name: 'Rule::unique()->ignore()', desc: 'Unique sauf l\'enregistrement édité', group: 'Base de données' },
  // Fichiers
  { name: 'image', desc: 'Fichier image (jpg, png…)', group: 'Fichiers' },
  { name: 'mimes:jpg,png', desc: 'Extensions autorisées', group: 'Fichiers' },
  // Côté vue
  { name: 'old(\'champ\')', desc: 'Repeupler un champ après échec', group: 'Côté vue', seen: 's5-ch3' },
  { name: '$errors->any()', desc: 'Tester s\'il y a des erreurs', group: 'Côté vue' },
]
