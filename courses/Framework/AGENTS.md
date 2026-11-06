# Framework (Laravel) — règles pour les agents

À lire avec `programme.md` (section « Format de séance ») et les skills `pedagogie`, `slides`, `slidev`, `exercices`.

## Pacte des deux domaines

- **Campus Quest** (sujet A) : démonstrations et livecoding uniquement (`scenarios/CampusQuest/laravel/seance-XX/{LIVECODING.md, solution/}`).
- **WishFlix** (sujet B) : projet fil rouge des étudiants, transposition de la démo. **Jamais de recopie** : aucune slide ni exercice ne montre le code WishFlix de la notion démontrée.
- Correspondance des entités : table « Domaine des démonstrations » de `programme.md`.

## Séquencement

- Une séance = une suite de cycles : théorie courte → livecoding Campus Quest → micro-pratique WishFlix.
- Ordre des chapitres = ordre des étapes de `LIVECODING.md` = ordre des étapes de la Partie A de l'exercice. Chaque étape de `LIVECODING.md` indique son chapitre et son tag Campus Quest.
- `duration` d'un chapitre = slides + livecoding + micro-pratique ; total de la séance ≤ 4h − 10 %.

## Campus Quest versionné

- Campus Quest vit dans son propre dépôt (`School_Framework_CampusQuest`), un commit par étape du livecoding, **un tag par chapitre** au format `sXX-chY-slug` (ex. `s3-ch2-migrations`). Le diff entre deux tags = le code du chapitre.
- Les tags restent aux frontières de chapitres (modifier une slide réécrit l'historique et déplace les tags).
- Une slide de chapitre peut citer son tag pour la relecture.
- `scenarios/CampusQuest/laravel` dans ce dépôt reste la source des `LIVECODING.md` et `solution/`.

## Rattrapage

- Palier de rattrapage = tag Campus Quest du chapitre : l'étudiant relit le diff et **refait** sa partie sur WishFlix.
- Aucun tag Git dans K.School, aucun dépôt de rattrapage WishFlix.

## Compatibilité

Les étudiants ont commencé WishFlix en S1 : ne jamais changer le modèle de données ni les noms de fichiers, routes et vues déjà attendus par les exercices précédents.

## Panoramas

- Les données des slides `<Panorama>` vivent dans `references/` (un fichier `<concept>.ts` par Panorama).
- `seen: 'sN-chM'` marque le chapitre où l'élément est utilisé en livecoding / démo ou en Partie A de l'atelier (bonus, parties B et C exclus) : quand une nouvelle séance utilise un élément, mettre à jour son `seen` dans le fichier de données — et ne jamais changer un `seen` existant vers une valeur plus tardive.
