# Plan de cours — Séance 7 : Appeler une API

Durée : 3h (180 min)

## Fil conducteur

La séance 6 a montré comment déclencher du code au montage d'un composant (`useEffect`) avec des exemples simulés (`setTimeout`, `setInterval`). Cette séance remplace la simulation par du réel : on va chercher des données sur une vraie API (JSONPlaceholder) et gérer le cycle complet loading → error → data.

## Prérequis

- `useEffect` et tableau de dépendances (S6)
- `useState` typé (S4)
- Rendu conditionnel (S5) — nécessaire pour afficher loading/error/data

## Objectifs pédagogiques

À l'issue de la séance, l'apprenant sait :
- Appeler `fetch` et typer la réponse attendue
- Charger des données au montage via `useEffect`
- Gérer et typer les états loading / error / data
- Afficher des données réelles depuis une API externe
- Gérer proprement les erreurs réseau

## Déroulé horaire

| Bloc | Durée | Contenu |
|------|-------|---------|
| Accroche & rappel S6 | 10 min | Reprendre le teaser : on sait déclencher un effet au montage, on va maintenant s'en servir pour aller chercher de vraies données. |
| `fetch` et typage de la réponse | 25 min | Rappel rapide des Promises. `fetch(url).then(res => res.json())`. Typer la réponse avec une `interface`/`type` (ex. `Post`). Vérifier `res.ok` avant de parser. |
| `useEffect` pour charger des données | 30 min | Pattern : `useEffect(() => { fetch(...).then(setData) }, [])`. Live coding : charger une liste de posts JSONPlaceholder et l'afficher avec `map()` (réutilise S5). |
| États loading / error / data typés | 30 min | Modéliser les 3 états avec `useState` (`isLoading`, `error`, `data: Post[] \| null`) ou un type union discriminé. Affichage conditionnel selon l'état (réutilise S5). |
| Pratique guidée | 30 min | Exercice encadré : composant `PostList` qui affiche un loader pendant le chargement puis la liste de posts. |
| Gestion des erreurs réseau | 20 min | `try/catch` avec `fetch`, statut HTTP en erreur (404/500), simulation d'une erreur (mauvaise URL) pour observer le message d'erreur affiché. |
| Exercice autonome | 25 min | L'apprenant construit seul un composant équivalent pour un autre endpoint JSONPlaceholder (ex. `/users` ou `/comments`), avec gestion loading/error/data. |
| Pièges courants | 10 min | Oublier `res.ok` (une 404 ne rejette pas la Promise). Fetch relancé à chaque rendu par oubli du tableau de dépendances. Race condition si l'id change vite (mention rapide, sans `AbortController` en détail). |
| Synthèse | 5 min | Récap du pattern complet fetch + useEffect + états typés. |
| Teaser séance 8 | 5 min | "On sait afficher les données d'un post. Comment afficher une page dédiée à *un* post en particulier, avec sa propre URL ?" → React Router. |

## Exercices

1. **Pratique guidée** — `PostList` avec loading/data depuis JSONPlaceholder.
2. **Exercice autonome** — composant équivalent sur un autre endpoint, géré seul par l'apprenant.

## Points de vigilance (notes formateur)

- Bien vérifier `res.ok` en live coding et montrer ce qui se passe si on l'oublie (une 404 affichée comme si c'était une donnée valide) — piège fréquent.
- Ne pas introduire `AbortController` en profondeur : juste mentionner le risque de race condition pour ne pas surcharger la séance, sujet pour plus tard si besoin.
- Réutiliser explicitement les acquis de S5 (map, rendu conditionnel) pour montrer que rien n'est nouveau côté affichage — seule la source de données change.
- Garder JSONPlaceholder comme unique API de la séance pour ne pas ajouter de complexité d'authentification/CORS.
