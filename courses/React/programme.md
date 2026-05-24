# Programme React + TypeScript — 10 séances de 3h

## Résumé des séances

### **Séance 1 — Introduction et environnement**
- Présentation de React et son historique
- Rappels JavaScript moderne (ES6+, destructuring, arrow functions, modules)
- SPA vs MPA, présentation d'une application web
- Introduction TypeScript (types de base, pourquoi TS)
- Créer une application React avec TypeScript (Vite + template `react-ts`)
- Structure d'un projet React

### **Séance 2 — JSX et premiers composants**
- Syntaxe JSX/TSX (règles, accolades, fragments)
- Différences JSX vs HTML
- Création de composants typés
- Export/import de composants
- Composition de composants
- Organisation des fichiers

### **Séance 3 — Props et CSS**
- Props typées avec interfaces/types
- Passage de données parent → enfant
- Destructuring des props
- Ajouter du CSS (className, fichiers CSS)
- Styliser des composants
- Props optionnelles

### **Séance 4 — Événements et State**
- Événements typés (`React.MouseEvent`, `React.ChangeEvent`)
- `onClick`, `onChange`, `onSubmit`
- `useState` avec typage (`useState<number>`, `useState<string>`)
- Mise à jour de l'état
- Re-rendu des composants
- Formulaires simples

### **Séance 5 — Rendu conditionnel et listes**
- Rendu conditionnel (`if`, ternaire, `&&`)
- Listes typées avec `map()` et `key`
- Filtrage de tableaux
- Combinaison conditions + listes
- Gestion de tableaux d'objets typés

### **Séance 6 — Cycle de vie et Hooks**
- Cycle de vie d'un composant (montage, mise à jour, démontage)
- Hooks typés (`useEffect`, `useRef<HTMLInputElement>`)
- Effets au montage
- Cleanup des effets
- `useRef` pour accéder au DOM

### **Séance 7 — Appeler une API**
- `fetch` avec typage de la réponse
- `useEffect` pour charger des données
- Gestion des états loading/error/data typés
- Affichage de données depuis JSONPlaceholder
- Gestion des erreurs réseau

### **Séance 8 — React Router (bases)**
- Introduction à React Router
- Installation et configuration
- Mise en place des routes (`BrowserRouter`, `Routes`, `Route`)
- Utiliser les `NavLink`
- Navigation entre pages

### **Séance 9 — React Router (avancé)**
- Routes dynamiques (`:id`, `useParams` typé)
- Routes imbriquées (`Outlet`)
- Layouts partagés
- Page de détail avec paramètres
- Navigation programmatique

### **Séance 10 — Redux (introduction pratique)**
- Pourquoi Redux ? État global vs props drilling
- Démonstration : exemple complet fonctionnel
- Décorticage du code typé (store, slice, Provider)
- `useSelector` et `useDispatch` typés
- `RootState`, `AppDispatch`, `PayloadAction`
- Exercice guidé : ajouter une fonctionnalité

---

## Compétences acquises

À l'issue des 10 séances, l'apprenant sera capable de :
- ✅ Créer une **SPA React avec TypeScript**
- ✅ Structurer une application en **composants réutilisables**
- ✅ Gérer l'**état local** et les **événements**
- ✅ **Consommer une API externe** avec gestion des états de chargement
- ✅ Mettre en place une **navigation multi-pages** avec React Router
- ✅ Utiliser un **état global** avec Redux Toolkit

---

## Notions TypeScript par séance

| Séance | TypeScript introduit |
|--------|---------------------|
| S1 | Types de base, template `react-ts` |
| S2 | Fichiers `.tsx`, composants typés |
| S3 | **Interfaces pour props** |
| S4 | `useState<T>`, événements typés |
| S5 | Tableaux typés (`Task[]`) |
| S6 | `useRef<HTMLElement>` |
| S7 | **Typage réponse API** |
| S8-S9 | `useParams` typé |
| S10 | `RootState`, `AppDispatch`, `PayloadAction` |