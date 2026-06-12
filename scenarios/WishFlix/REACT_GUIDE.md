# Guide d'intégration WishFlix dans React

Ce guide explique comment poser le **squelette de base** de WishFlix dans un projet
React (Vite + TypeScript). On part du template fourni dans votre dossier `WishFlix`
et on remplace la page de démonstration par la **page d'accueil** (`home.html`), avec
**exactement** le HTML et le CSS du scénario.

> Objectif de cette étape : obtenir la **homepage** avec le bon rendu HTML + CSS dans
> React. **Pas encore** de composants, de state, de props ni de données dynamiques :
> on construit le squelette **avant** d'appliquer les concepts du cours.

---

## 0. Pré-requis

- Le projet est **déjà initialisé** (template Vite + React + TypeScript).
- On utilise **uniquement pnpm**.
- Vous travaillez dans votre dossier `WishFlix`.

Structure de départ (template Vite) :

```
WishFlix/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.js
└── src/
    ├── main.tsx
    ├── App.tsx        ← page de démo Vite (à remplacer)
    ├── App.css        ← styles de démo (à remplacer)
    ├── index.css      ← styles globaux (à remplacer)
    └── assets/
```

Vérifiez que tout démarre :

```bash
pnpm install
pnpm dev
```

Vous devez voir la page de démonstration Vite + React.

---

## 1. Installer Tailwind CSS + daisyUI

La page d'accueil du scénario utilise Tailwind CSS **v4** et daisyUI **v5**
(via CDN dans le `.html`). Dans un projet Vite, on les installe proprement avec pnpm
au lieu du CDN.

```bash
pnpm add tailwindcss @tailwindcss/vite daisyui
```

Ajoutez le plugin Tailwind à la config Vite — `vite.config.ts` :

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 2. Configurer les styles globaux

Remplacez **tout** le contenu de `src/index.css` par l'import de Tailwind et le plugin
daisyUI :

```css
@import "tailwindcss";
@plugin "daisyui";
```

C'est l'équivalent des deux lignes CDN qui étaient dans le `<head>` de `home.html` :

```html
<!-- Ce que faisait le HTML statique, désormais géré par Vite + pnpm -->
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

---

## 3. Récupérer le CSS de la page d'accueil

La page d'accueil dépend de deux feuilles de style du scénario, **à reprendre telles
quelles** (ne rien modifier) :

- `app.css` → styles du shell (navbar, footer, cards, layout)
- `home.css` → styles spécifiques à l'accueil (hero, grille, filtres)

Copiez ces deux fichiers depuis `scenarios/WishFlix/src/` vers le dossier `src/` de
votre projet React. Vous obtenez :

```
src/
├── app.css      ← copié tel quel
├── home.css     ← copié tel quel
├── index.css    ← Tailwind + daisyUI (étape 2)
└── ...
```

> Ne renommez pas les classes et ne touchez pas au CSS : le HTML et le CSS fournis
> sont exactement le rendu attendu.

---

## 4. Nettoyer le squelette de démo

On supprime ce qui appartient à la démo Vite :

- Supprimez `src/App.css` (styles de démo).
- Le dossier `src/assets/` (logos React/Vite) n'est plus utilisé par l'accueil.

`src/main.tsx` reste tel quel — il importe déjà `index.css` et monte `<App />` :

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Mettez à jour le `<title>` dans `index.html` :

```html
<title>WishFlix - Accueil</title>
```

---

## 5. Convertir `home.html` en JSX dans `App.tsx`

C'est l'étape clé : on reprend le `<body>` de `home.html` **à l'identique**, en le
transformant en JSX. Le JSX n'est pas du HTML, il y a donc quelques règles mécaniques
à appliquer (rien d'inventé, juste la syntaxe React) :

| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` (label) | `htmlFor="..."` |
| `<!-- commentaire -->` | `{/* commentaire */}` |
| balises auto-fermantes | `<img ... />`, `<input ... />` |
| un seul élément racine | tout est enveloppé dans la `<div>` du shell |

Les feuilles de style sont importées **en haut** du fichier. L'ordre compte :
Tailwind/daisyUI d'abord (via `index.css` dans `main.tsx`), puis `app.css` et
`home.css` pour appliquer le thème WishFlix par-dessus.

Remplacez **tout** le contenu de `src/App.tsx` par :

```tsx
import './app.css'
import './home.css'

function App() {
  return (
    <div className="wishflix-shell">
      <header
        className="navbar wishflix-shell__navbar"
        aria-label="Navigation principale"
      >
        <div className="navbar-start">
          <a className="wishflix-shell__brand" href="/">WishFlix</a>
          <span className="wishflix-shell__tagline">Gaming catalog</span>
        </div>

        <nav
          className="navbar-center wishflix-shell__menu"
          aria-label="Liens principaux"
        >
          <a className="wishflix-shell__link wishflix-shell__link--active" href="/">
            Accueil
          </a>
          <a className="wishflix-shell__link" href="wishlist.html">
            Wishlist
            <span className="badge badge-secondary badge-sm">3</span>
          </a>
        </nav>

        <div className="navbar-end wishflix-shell__user">
          <span className="wishflix-shell__user-label">Invité</span>
          <a className="btn btn-primary btn-sm" href="login.html">Se connecter</a>
        </div>
      </header>

      <main className="wishflix-main" id="contenu-principal">
        <section className="hero wishflix-hero" aria-labelledby="hero-title">
          <figure className="wishflix-hero__backdrop">
            <img
              src="https://via.assets.so/game.png?id=1&q=95&w=1600&h=900&fit=cover"
              alt="Image de couverture de The Witcher 3"
              width="1600"
              height="900"
            />
          </figure>
          <div className="wishflix-hero__veil" aria-hidden="true"></div>

          <div className="hero-content wishflix-hero__content">
            <div className="wishflix-hero__text">
              <p className="wishflix-hero__kicker">Nouveaute WishFlix</p>
              <div className="wishflix-hero__meta">
                <span className="badge badge-primary">A la une</span>
                <span className="badge badge-ghost">RPG</span>
                <span className="badge badge-outline">PC, PS5, Xbox</span>
              </div>

              <h1 id="hero-title" className="wishflix-hero__title">
                The Witcher 3
              </h1>
              <p className="wishflix-hero__description">
                Incarnez Geralt de Riv, un chasseur de monstres professionnel,
                dans un monde ouvert fantastique rempli de quêtes épiques et de
                choix moraux difficiles.
              </p>
              <p className="wishflix-hero__details">2015 | 4.8/5 | 100h de jeu</p>

              <div className="wishflix-hero__actions">
                <a className="btn btn-primary btn-lg" href="game-detail.html">
                  Voir la fiche
                </a>
                <button className="btn btn-outline btn-lg">
                  Ajouter a la wishlist
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="wish-section" aria-labelledby="catalogue-title">
          <header className="wish-section__header">
            <div>
              <h2 className="wish-section__title" id="catalogue-title">
                Catalogue
              </h2>
              <p className="wish-section__subtitle">
                Filtres, navigation et cards dynamiques
              </p>
            </div>
            <div className="wish-section__actions">
              <div className="wish-home__filters">
                <label className="form-control wish-home__search" htmlFor="game-search">
                  <span className="label-text">Rechercher</span>
                  <input
                    id="game-search"
                    type="search"
                    className="input input-bordered"
                    placeholder="Titre ou mot-cle"
                  />
                </label>

                <label className="form-control" htmlFor="game-category">
                  <span className="label-text">Categorie</span>
                  <select id="game-category" className="select select-bordered">
                    <option value="all">Toutes</option>
                    <option value="RPG">RPG</option>
                    <option value="Action">Action</option>
                    <option value="Aventure">Aventure</option>
                  </select>
                </label>

                <button className="btn btn-secondary">
                  Disponibles uniquement
                </button>
              </div>
            </div>
          </header>

          <div className="wish-section__stats">
            <div
              className="stats shadow wish-home__stats"
              role="group"
              aria-label="Statistiques catalogue"
            >
              <div className="stat">
                <div className="stat-title">Jeux disponibles</div>
                <div className="stat-value text-primary">12</div>
              </div>

              <div className="stat">
                <div className="stat-title">Resultats filtres</div>
                <div className="stat-value text-secondary">12</div>
              </div>

              <div className="stat">
                <div className="stat-title">Ma wishlist</div>
                <div className="stat-value text-accent">3</div>
              </div>
            </div>
          </div>

          <div className="wish-section__content">
            <div className="wish-home__grid">
              <article
                className="card movie-card game-card"
                aria-label="Jeu The Witcher 3"
              >
                <figure className="game-card__cover">
                  <img
                    src="https://via.assets.so/game.png?id=1&q=95&w=300&h=450&fit=cover"
                    alt="Affiche de The Witcher 3"
                    width="300"
                    height="450"
                  />
                </figure>

                <div className="card-body game-card__body">
                  <div className="game-card__badges">
                    <span className="badge badge-secondary">RPG</span>
                    <span className="badge badge-success">Disponible</span>
                  </div>

                  <h3 className="card-title game-card__title">The Witcher 3</h3>
                  <p className="game-card__meta">2015 - PC, PS5, Xbox</p>

                  <div className="game-card__rating" aria-label="Note moyenne">
                    <span className="game-card__rating-value">4.8</span>
                    <span className="game-card__rating-max">/5</span>
                  </div>

                  <p className="game-card__synopsis">
                    Incarnez Geralt de Riv, un chasseur de monstres
                    professionnel, dans un monde ouvert fantastique.
                  </p>

                  <div className="card-actions game-card__actions">
                    <a
                      className="btn btn-sm btn-ghost"
                      href="game-detail.html"
                      aria-label="Voir les details de The Witcher 3"
                    >
                      Details
                    </a>
                    <button className="btn btn-sm btn-outline">Wishlist</button>
                  </div>
                </div>
              </article>

              <article
                className="card movie-card game-card"
                aria-label="Jeu Elden Ring"
              >
                <figure className="game-card__cover">
                  <img
                    src="https://via.assets.so/game.png?id=2&q=95&w=300&h=450&fit=cover"
                    alt="Affiche de Elden Ring"
                    width="300"
                    height="450"
                  />
                </figure>

                <div className="card-body game-card__body">
                  <div className="game-card__badges">
                    <span className="badge badge-secondary">Action</span>
                    <span className="badge badge-success">Disponible</span>
                  </div>

                  <h3 className="card-title game-card__title">Elden Ring</h3>
                  <p className="game-card__meta">2022 - PC, PS5, Xbox</p>

                  <div className="game-card__rating" aria-label="Note moyenne">
                    <span className="game-card__rating-value">4.9</span>
                    <span className="game-card__rating-max">/5</span>
                  </div>

                  <p className="game-card__synopsis">
                    Un RPG d'action en monde ouvert développé par FromSoftware
                    et George R.R. Martin.
                  </p>

                  <div className="card-actions game-card__actions">
                    <a className="btn btn-sm btn-ghost" href="game-detail.html">
                      Details
                    </a>
                    <button className="btn btn-sm btn-secondary">Retirer</button>
                  </div>
                </div>
              </article>

              <article
                className="card movie-card game-card"
                aria-label="Jeu Cyberpunk 2077"
              >
                <figure className="game-card__cover">
                  <img
                    src="https://via.assets.so/game.png?id=3&q=95&w=300&h=450&fit=cover"
                    alt="Affiche de Cyberpunk 2077"
                    width="300"
                    height="450"
                  />
                </figure>

                <div className="card-body game-card__body">
                  <div className="game-card__badges">
                    <span className="badge badge-secondary">RPG</span>
                    <span className="badge badge-success">Disponible</span>
                  </div>

                  <h3 className="card-title game-card__title">Cyberpunk 2077</h3>
                  <p className="game-card__meta">2020 - PC, PS5, Xbox</p>

                  <div className="game-card__rating" aria-label="Note moyenne">
                    <span className="game-card__rating-value">4.5</span>
                    <span className="game-card__rating-max">/5</span>
                  </div>

                  <p className="game-card__synopsis">
                    Plongez dans Night City, une mégalopole obsédée par le
                    pouvoir, le glamour et les modifications corporelles.
                  </p>

                  <div className="card-actions game-card__actions">
                    <a className="btn btn-sm btn-ghost" href="game-detail.html">
                      Details
                    </a>
                    <button className="btn btn-sm btn-outline">Wishlist</button>
                  </div>
                </div>
              </article>

              <article
                className="card movie-card game-card"
                aria-label="Jeu Red Dead Redemption 2"
              >
                <figure className="game-card__cover">
                  <img
                    src="https://via.assets.so/game.png?id=4&q=95&w=300&h=450&fit=cover"
                    alt="Affiche de Red Dead Redemption 2"
                    width="300"
                    height="450"
                  />
                </figure>

                <div className="card-body game-card__body">
                  <div className="game-card__badges">
                    <span className="badge badge-secondary">Aventure</span>
                    <span className="badge badge-success">Disponible</span>
                  </div>

                  <h3 className="card-title game-card__title">
                    Red Dead Redemption 2
                  </h3>
                  <p className="game-card__meta">2018 - PC, PS5, Xbox</p>

                  <div className="game-card__rating" aria-label="Note moyenne">
                    <span className="game-card__rating-value">4.7</span>
                    <span className="game-card__rating-max">/5</span>
                  </div>

                  <p className="game-card__synopsis">
                    L'épopée de hors-la-loi Arthur Morgan et de la bande de
                    Dutch van der Linde.
                  </p>

                  <div className="card-actions game-card__actions">
                    <a className="btn btn-sm btn-ghost" href="game-detail.html">
                      Details
                    </a>
                    <button className="btn btn-sm btn-secondary">Retirer</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="wishflix-footer" aria-label="Pied de page">
        <p className="wishflix-footer__text">WishFlix - Gaming Catalog</p>
      </footer>
    </div>
  )
}

export default App
```

---

## 6. Lancer et vérifier

```bash
pnpm dev
```

Ouvrez l'URL affichée par Vite. Vous devez retrouver **la page d'accueil WishFlix**
à l'identique de `home.html` : navbar, hero « The Witcher 3 », filtres, statistiques,
grille de 4 cards, footer.

État final du `src/` après cette étape :

```
src/
├── main.tsx     ← inchangé
├── App.tsx      ← homepage WishFlix (JSX statique)
├── index.css    ← Tailwind + daisyUI
├── app.css      ← copié du scénario
└── home.css     ← copié du scénario
```

---

## Ce qu'on a fait (et pas fait)

**Fait** : un squelette React qui affiche la homepage avec le bon rendu HTML/CSS.

**Pas encore fait (volontairement)** :

- Aucun composant supplémentaire — tout est dans `App.tsx`.
- Aucun state, aucune props, aucune donnée dynamique.
- Les cards sont écrites « en dur », répétées 4 fois.
- Les liens (`href="game-detail.html"`, etc.) pointent encore vers les pages statiques.

Ces points seront repris **étape par étape** au fil du cours (composants, props,
`map` sur des données, événements, routing…), en partant de ce squelette propre.
