# Consignes de refonte S2 (fichier temporaire — À SUPPRIMER une fois le travail terminé)

Contexte : repo K.School, cours Framework (Laravel 12). Avant de commencer, invoquer les skills `pedagogie`, `slides`, `slidev`, `exercices`. Pas de `rtk` installé. Ne pas commiter. Le skill `slides` est déjà à jour (un chapitre = un seul concept, numérotation relative au deck).

Fichiers concernés : `courses/Framework/sections/02-routing-blade/`, `courses/Framework/slides-routing.md`, `courses/Framework/sections/01-setup/05-exercice.md`, `exercices/framework/02-routing-blade/README.md`, `courses/Framework/programme.md`.

Conventions : vouvoiement dans le texte visible ; « formateur/apprenants » seulement dans les notes présentateur ; ligne vide après la balise ouvrante et avant la fermante des composants à slot (Definition, Alert, KeyPoint...) ; `{{ }}` hors bloc de code => `<code v-pre>{{ }}</code>` ; un `v-click` par bloc dès 2+ blocs, numérotés (`v-click="N"`) et synchronisés avec `{all|…}` ; jamais `GameGameController` dans les slides ; démos = Campus Quest, atelier = WishFlix.

## Déjà fait

- Skill `slides` mis à jour (un concept par chapitre, numérotation relative au deck).
- `courses/Framework/style.css` : ligatures de la police de code désactivées.
- S1 : titres alignés sur S2 (titre du chapitre + sous-titre), bonus Artisan.

## À faire

### A) Découpage S2 en 6 chapitres (`number:` 1 à 6, aujourd'hui 5 à 8)
Fichiers dans `sections/02-routing-blade/` : `00-ressources`, `00-lexique`, `00-campus-quest` (nouveau), `01-routing`, `02-controleurs`, `03-blade-vue` (« Blade : la vue »), `04-blade-layouts` (« Blade : les layouts »), `05-vite`, `06-erreurs` (« Pages d'erreur » : 404 personnalisée, abort), `07-exercice` (renommé depuis `05-exercice`, pas un chapitre).
- Répartir le contenu de `03-blade.md` et `04-vite-erreurs.md` sur ces fichiers.
- Mettre à jour `index.md` et `slides-routing.md`.
- Corriger les renvois « chapitre 7/8 » (texte et notes).
- Chaque chapitre a sa slide `layout: chapter` (2-4 objectifs en verbes d'action, `duration`).
- Chapitre Contrôleurs : titre « Contrôleurs » ; les slides Requête/Réponse/redirections restent comme sous-parties (ce qu'il reçoit / renvoie), H1 « Contrôleurs », sous-titre = concept.

### B) Campus Quest
Slide d'intro dédiée dans `00-campus-quest.md` (après ressources/lexique, avant Routing), reprenant la 2e slide actuelle de `01-routing.md` (image-right, pitch, pacte démo Campus Quest / transposition WishFlix). Titre « Campus Quest » + sous-titre, plus de titre « Routing ». La retirer de `01-routing.md`.

### C) Code : magic-move vs surlignage
Utiliser `magic-move` (voir `.agents/skills/slidev/references/code-magic-move.md` et `slides/SKILL.md` ~l.335) pour le code qui évolue : route `/quests` -> `/quests/{id}` -> `where` -> `->name()` ; closure -> contrôleur ; construction du layout. Garder `{all|…}` + `v-click` pour le code lu sans évolution (`vite.config.js`, boucle `@forelse`). Analyser chaque slide de code et choisir ; ne pas changer ce qui marche. Clics synchronisés.

### D) Blade : la vue
- Ajouter une slide « vue d'ensemble » en deux colonnes : EXPRESSIONS (`{{ }}`, `{{-- --}}`) et DIRECTIVES par famille : conditions (`@if/@elseif/@else/@unless/@isset`), boucles (`@foreach/@forelse/@for/@while`), layouts (`@extends/@section/@yield/@include`). Vérifier chaque directive sur https://laravel.com/docs/12.x/blade ; distinguer « utilisé aujourd'hui » et « à connaître, pas d'urgence ».
- Supprimer la slide Compare `{!! !!}` vs `{{ }}` ; la remplacer par une seule phrase/`<Alert>` dans une slide existante (« Blade échappe automatiquement ce que vous affichez ; l'affichage de HTML brut existe mais n'est pas nécessaire ici »).
- Dans `programme.md`, séance 6 : ajouter « Démo XSS : `{!! !!}` vs `{{ }}` ».

### E) Blade : les layouts
Ajouter une slide animée qui fait comprendre le remplacement : layout (avec `@yield('title')`, `@yield('content')`) + page enfant (`@section`) => HTML final rendu, avec `v-click` montrant chaque trou rempli (ou magic-move). Garder l'analogie « formulaire à trous » et le Quiz.

### F) Vite
On garde Vite, en version réduite : (1) le piège « Vite manifest not found » + `sail npm run dev` ; (2) une CSS par page (entrée `input` + `@vite` dans la section). Aucun contenu en plus. Note présentateur : Vite est le choix par défaut de Laravel, nécessaire pour Breeze (S6) et le JS fetch (S7).

### G) Slides d'atelier (S1 : `sections/01-setup/05-exercice.md` ; S2 : `07-exercice.md`)
La consigne affiche uniquement le nom de l'exercice (`01-installation-architecture`, `02-routing-blade`), sans chemin `exercices/framework/...` et sans commande à lancer (retirer `./vendor/bin/sail up -d`, `sail artisan about`, etc. des `criteria` et du texte ; critères de résultat, ex. « le projet démarre et la page d'accueil s'affiche »). Le détail reste dans le README. Vérifier la cohérence du README S2 (renvois à des numéros de chapitres/slides ; la mention « partie A requise pour S3 » reste).

### Volume
~30-34 slides de contenu max pour S2. Ajouts : Campus Quest, vue d'ensemble Blade, slide animée layout ; suppression : HTML brut. Compter avant/après ; si > 34, proposer (sans appliquer) les fusions/suppressions.

## Vérification
Depuis `courses/Framework` : `pnpm build:routing` et `pnpm build:setup` passent ; chaque bloc `{a|b|c}` a le bon nombre de `v-click="N"` ; plus de `number: 5..8` ; pas de `exercices/framework` ni `sail ` dans les 2 slides d'atelier ; `pnpm-lock.yaml` non modifié.

## Rapport attendu
Liste des chapitres avec leurs slides (H1 / sous-titre), nombre de slides avant/après, choix magic-move vs surlignage slide par slide, fichiers modifiés, résultats des builds.

**Dernière étape : supprimer ce fichier (`TODO-S2-REFONTE.md`).**
