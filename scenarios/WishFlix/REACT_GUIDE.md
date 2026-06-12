# Guide d'intégration WishFlix dans un projet React + Vite (Squelette HTML)

## Objectif

Ce guide vous explique comment intégrer l'application WishFlix (catalogue de jeux vidéo) dans un projet React initialisé avec Vite, en se concentrant uniquement sur le **squelette HTML statique** sans logique React ni réactivité.

## Prérequis

- Node.js (version 18 ou supérieure)
- pnpm _(ou npm mais pnpm est recommandé pour ces performances)_
- Avoir un projet React installé avec Vite

## Étape 1: Installation des dépendances UI

WishFlix utilise TailwindCSS et DaisyUI. Installons-les :

```bash
# Installer TailwindCSS et ses dépendances
pnpm install -D tailwindcss postcss autoprefixer

# Installer DaisyUI
pnpm install daisyui

# Initialiser TailwindCSS
pnpx tailwindcss init -p
```

## Étape 2: Configuration de TailwindCSS

Modifiez le fichier `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wishflix-dark': '#141414',
        'wishflix-card': '#1f1f1f',
        'wishflix-accent': '#e50914',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        wishflix: {
          "primary": "#e50914",
          "secondary": "#333333",
          "accent": "#f59e0b",
          "neutral": "#141414",
          "base-100": "#1f1f1f",
          "base-200": "#2a2a2a",
          "base-300": "#333333",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbf24",
          "error": "#f87272",
        },
      },
    ],
  },
}
```

## Étape 3: Configuration des styles CSS

Remplacez le contenu de `src/index.css` par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --wishflix-bg-dark: #141414;
  --wishflix-bg-card: #1f1f1f;
  --wishflix-accent: #e50914;
  --wishflix-text: #ffffff;
}

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--wishflix-bg-dark);
  color: var(--wishflix-text);
}

.wishflix-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.wishflix-shell__navbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 20;
  padding-inline: clamp(1rem, 3vw, 2rem);
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.wishflix-shell__brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--wishflix-accent);
  text-decoration: none;
}

.wishflix-shell__tagline {
  font-size: 0.875rem;
  color: #999;
  margin-left: 0.5rem;
}

.wishflix-shell__link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.wishflix-shell__link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.wishflix-shell__link--active {
  background-color: var(--wishflix-accent);
  color: white;
}

.wishflix-main {
  flex: 1;
  margin-top: 64px;
  padding: 2rem;
}

.wishflix-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 3rem;
}

.wishflix-hero__backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.wishflix-hero__backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishflix-hero__backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0.4) 0%,
    rgba(20, 20, 20, 0.8) 50%,
    rgba(20, 20, 20, 1) 100%
  );
}

.wishflix-hero__content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
}

.wishflix-hero__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.wishflix-hero__description {
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.wishflix-hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.wishflix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.wishflix-card {
  background: var(--wishflix-bg-card);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.wishflix-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.wishflix-card__image {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.wishflix-card__content {
  padding: 1rem;
}

.wishflix-card__title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
}

.wishflix-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #999;
}

.wishflix-card__rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.wishflix-card__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .wishflix-main {
    padding: 1rem;
  }
  
  .wishflix-hero {
    height: 40vh;
    min-height: 300px;
  }
  
  .wishflix-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
```

## Étape 4: Création des squelettes de composants React

### 4.1: Composant Navbar (squelette)

Créez `src/components/Navbar.tsx` :

```tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="navbar wishflix-shell__navbar" aria-label="Navigation principale">
      <div className="navbar-start">
        <a className="wishflix-shell__brand" href="/">WishFlix</a>
        <span className="wishflix-shell__tagline">Gaming catalog</span>
      </div>

      <nav className="navbar-center wishflix-shell__menu" aria-label="Liens principaux">
        <a className="wishflix-shell__link wishflix-shell__link--active" href="/">
          Accueil
        </a>
        <a className="wishflix-shell__link" href="/wishlist">
          Wishlist
          <span className="badge badge-secondary badge-sm">3</span>
        </a>
      </nav>

      <div className="navbar-end wishflix-shell__user">
        <span className="wishflix-shell__user-label">Invité</span>
        <a className="btn btn-primary btn-sm" href="/login">Se connecter</a>
      </div>
    </header>
  );
};

export default Navbar;
```

### 4.2: Composant GameCard (squelette)

Créez `src/components/GameCard.tsx` :

```tsx
import React from 'react';

const GameCard: React.FC = () => {
  return (
    <div className="wishflix-card">
      <img 
        src="https://via.assets.so/game.png?id=1&q=95&w=300&h=200&fit=cover"
        alt="Game placeholder"
        className="wishflix-card__image"
      />
      <div className="wishflix-card__content">
        <h3 className="wishflix-card__title">Titre du jeu</h3>
        <div className="wishflix-card__meta">
          <span>Catégorie</span>
          <span>2023</span>
        </div>
        <div className="wishflix-card__rating">
          <span>⭐</span>
          <span>4.5</span>
        </div>
        <div className="wishflix-card__actions">
          <button className="btn btn-primary btn-sm">
            Voir détails
          </button>
          <button className="btn btn-outline btn-sm">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
```

### 4.3: Composant Hero (squelette)

Créez `src/components/Hero.tsx` :

```tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero wishflix-hero" aria-labelledby="hero-title">
      <figure className="wishflix-hero__backdrop">
        <img
          src="https://via.assets.so/game.png?id=1&q=95&w=1600&h=900&fit=cover"
          alt="Hero background"
        />
      </figure>
      <div className="wishflix-hero__content">
        <h1 id="hero-title" className="wishflix-hero__title">
          Découvrez votre prochain jeu préféré
        </h1>
        <p className="wishflix-hero__description">
          Explorez notre catalogue de jeux vidéo et créez votre wishlist personnalisée
        </p>
        <div className="wishflix-hero__actions">
          <button className="btn btn-primary btn-lg">
            Explorer le catalogue
          </button>
          <button className="btn btn-outline btn-lg">
            Ma wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

## Étape 5: Composant App principal (squelette)

Remplacez le contenu de `src/App.tsx` :

```tsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';

const App: React.FC = () => {
  return (
    <div className="wishflix-shell">
      <Navbar />
      
      <main className="wishflix-main" id="contenu-principal">
        <Hero />
        
        <section aria-label="Filtres et recherche">
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              className="input input-bordered flex-1"
            />
            
            <select className="select select-bordered">
              <option>Tous</option>
              <option>RPG</option>
              <option>Action</option>
              <option>Aventure</option>
              <option>Combat</option>
            </select>
          </div>
        </section>

        <section aria-label="Catalogue de jeux">
          <h2 className="text-2xl font-bold mb-4">Catalogue (6 jeux)</h2>
          
          <div className="wishflix-grid">
            {/* Cartes de jeux statiques - à remplacer par des données dynamiques plus tard */}
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
```

## Étape 6: Démarrage de l'application

```bash
# Démarrer le serveur de développement
pnpm run dev
```

Votre application WishFlix React est maintenant disponible sur `http://localhost:5173` !

## Ce que vous avez maintenant

✅ **Structure de base React** avec TypeScript  
✅ **Design complet** avec TailwindCSS + DaisyUI  
✅ **Squelettes de composants** prêts à être animés  
✅ **Layout responsive** avec thème sombre  
✅ **Navigation statique** entre les sections  

## Prochaines étapes (pour ajouter la réactivité)

- [ ] Ajouter des données de jeux statiques
- [ ] Implémenter `useState` pour la recherche et les filtres
- [ ] Ajouter React Router pour la navigation
- [ ] Créer un hook `useWishlist` pour la gestion de wishlist
- [ ] Connecter les composants avec des props et événements
- [ ] Ajouter des animations et transitions

## Dépannage

### Problèmes courants

**TailwindCSS ne fonctionne pas :**
- Vérifiez que `tailwind.config.js` est correctement configuré
- Assurez-vous que `src/index.css` contient les directives `@tailwind`

**DaisyUI ne s'affiche pas :**
- Vérifiez que DaisyUI est installé : `pnpm install daisyui`
- Ajoutez `require("daisyui")` dans les plugins de `tailwind.config.js`

**Routing ne fonctionne pas :**
- Assurez-vous que `react-router-dom` est installé
- Vérifiez que `BrowserRouter` enveloppe votre composant `App`

### Commandes utiles

```bash
# Vérifier les dépendances
pnpm list

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
pnpm install

# Build pour production
pnpm run build

# Preview du build
pnpm run preview
```

---

**Bon développement !** 🎮✨
