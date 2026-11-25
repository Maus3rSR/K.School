# Exercices Framework avancé (Laravel, S6) — règles pour les agents

À lire avec `courses/Framework-Advanced/programme.md` (« Format de séance »), `courses/Framework-Advanced/AGENTS.md` et le skill `exercices`. La structure d'un README est celle de `exercices/framework/AGENTS.md`, avec les différences ci-dessous.

## Différences avec le S5

- **Partie A** : sur l'**application héritée commune**, jamais sur WishFlix ni Campus Quest. À partir de la S2, chaque point de contrôle inclut « pipeline CI vert ».
- **Partie B** : sur le **WishFlix personnel** de l'étudiant ; les user stories ne supposent que le modèle de données et les noms attendus par le S5, et indiquent le minimum à ajouter si une pièce manque.
- **Partie C** : lire le code du framework lié à la séance (`Illuminate/Testing`, `Illuminate/Queue`, `Illuminate/Http/Client`…), réponses dans `REPONSES.md`. Ne jamais la supprimer.
- **Rattrapage** : tag Campus Quest `adv-sXX-chY-slug`, ou branche `checkpoint-sXX` de l'application héritée si elle est retenue.

## Règles

- Les tests demandés tournent sans réseau externe et sans service payant.
- Aucune consigne ne demande de secret réel dans le dépôt : secrets dans les variables du dépôt GitHub ou `.env` non versionné.
