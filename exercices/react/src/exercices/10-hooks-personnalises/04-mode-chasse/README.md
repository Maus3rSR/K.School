# Exercice 04 — Le mode chasse partagé

> Réf. officielle : [Passing Data Deeply with Context](https://fr.react.dev/learn/passing-data-deeply-with-context)

## Objectif

Créer un **Context** et un **hook personnalisé** pour partager le mode de chasse
(jour / nuit) entre `Header`, `ZoneChasse` et `Footer` sans prop drilling.

**Durée estimée** : 25 min

---

## Prérequis

- Exercices 01 à 03 terminés.
- Avoir vu en cours : `createContext`, `useContext`, le pattern Provider.

---

## Fichier à éditer

```
ModeChasse.tsx
```

---

## Instructions

1. Le `ModeChasseContext` est déjà créé. Complète `ModeChasseProvider` pour
   qu'il gère un state `mode` (`"jour" | "nuit"`) et une fonction `basculer`
   qui inverse la valeur.
2. Passe ces deux valeurs au `ModeChasseContext.Provider`.
3. Crée un hook `useModeChasse()` qui appelle `useContext(ModeChasseContext)`
   et **lève une erreur** si la valeur est `null` (c'est-à-dire si le hook est
   utilisé en dehors du Provider).
4. Utilise `useModeChasse` dans `Header` pour afficher le mode courant et le
   basculer au clic sur le bouton.
5. Utilise `useModeChasse` dans `ZoneChasse` pour changer l'ambiance visuelle :
   - **Mode jour** : fond clair, soleil ☀️, le monstre dort 😴, texte
     "Le monstre dort au soleil...".
   - **Mode nuit** : fond sombre, lune 🌙, le monstre chasse 🐺, texte
     "Le monstre chasse dans la nuit !".
6. Utilise `useModeChasse` dans `Footer` pour afficher le mode actuel.

---

## Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Quel type pour le Context ?</strong></summary>

Le Context peut transporter `{ mode: ModeChasse; basculer: () => void }`. Le
type est `createContext<{ mode: ModeChasse; basculer: () => void } | null>(null)`
pour pouvoir détecter un usage hors Provider.
</details>

<details>
<summary><strong>Indice 2 — Comment animer le mode ?</strong></summary>

Dans `ZoneChasse`, teste la valeur de `mode` pour choisir l'emoji, le texte
et les classes Tailwind. Par exemple :

```tsx
className={mode === "nuit" ? "bg-neutral text-neutral-content" : "bg-warning/20 text-base-content"}
```
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
function ModeChasseProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ModeChasse>("jour");

  function basculer() {
    setMode((m) => (m === "jour" ? "nuit" : "jour"));
  }

  return (
    <ModeChasseContext.Provider value={{ mode, basculer }}>
      {children}
    </ModeChasseContext.Provider>
  );
}

function useModeChasse() {
  const context = useContext(ModeChasseContext);
  if (!context) {
    throw new Error("useModeChasse doit être utilisé dans ModeChasseProvider");
  }
  return context;
}
```
</details>

---

## Critères de réussite

- [ ] Le bouton dans l'en-tête bascule le mode entre jour et nuit, et son
      libellé change en fonction du mode actuel.
- [ ] La zone centrale affiche le monstre dormant au soleil en mode jour, et le
      monstre chassant dans la nuit en mode nuit (emoji + texte + couleur).
- [ ] Le pied de page affiche toujours le même mode que l'en-tête.
- [ ] Utiliser `useModeChasse` hors du `ModeChasseProvider` déclencherait une
      erreur explicite.
