# Framework avancé (Laravel, S6) — règles pour les agents

À lire avec `programme.md` (section « Format de séance ») et les skills `pedagogie`, `slides`, `slidev`, `exercices`. Ce cours est la suite de `courses/Framework` (S5) : ses règles s'appliquent sauf mention contraire ci-dessous.

## Pacte des trois terrains

- **Campus Quest** (état de fin de S5) : démonstrations uniquement (`scenarios/CampusQuest/laravel-advanced/seance-XX/{LIVECODING.md, solution/}`).
- **Application héritée commune** : Partie A des exercices, en séance. Jamais de recopie : aucune slide ni exercice ne montre le code de l'application héritée pour la notion démontrée.
- **WishFlix personnel** (S5) : Partie B uniquement, à la maison. Hétérogène d'un étudiant à l'autre : aucune consigne ne suppose un code WishFlix précis au-delà du modèle de données et des noms attendus par le S5.

## Séquencement

- Démo flash dès la S1 (3-5 min par chapitre) : test rouge puis vert, pipeline qui casse, couverture, déploiement — jamais de code retapé.
- Ordre des chapitres = ordre des moments de `LIVECODING.md` = ordre des étapes de la Partie A.
- `duration` d'un chapitre = slides + démo + micro-pratique ; total ≤ **180 min utiles**.
- Sur une application existante, jamais de TDD avant les tests de caractérisation (S1-S3) : le TDD arrive en S4, pour du code nouveau.

## Tags

- Tags Campus Quest au format **`adv-sXX-chY-slug`** (ex. `adv-s2-ch3-github-actions`) : le préfixe `adv-` évite la collision avec les tags `sXX-` du S5.
- Palier de rattrapage = tag du chapitre ; aucun tag Git dans K.School.

## Tout passe par la CI

- À partir de la S2, chaque point de contrôle de la Partie A exige un **pipeline vert** ; une consigne qui casserait la CI sans le dire est un défaut.
- Les tests de démonstration et ceux attendus des étudiants tournent sans réseau externe (`Http::fake`, `Mail::fake`…).

## Panoramas

- Données des slides `<Panorama>` dans `references/` (un fichier `<concept>.ts` par Panorama), même convention `seen: 'sN-chM'` que `courses/Framework`.
- Un Panorama du S5 peut être réutilisé : l'importer depuis `courses/Framework/references/` plutôt que le dupliquer.

## Nommage

Fichiers, dossiers et scripts en anglais (`sections/02-safety-net-ci/`, `slides-tdd.md`, `dev:tdd`), contenu en français.
