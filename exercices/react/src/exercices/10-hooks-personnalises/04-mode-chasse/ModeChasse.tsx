import { createContext, useState, type ReactNode } from "react";

// TODO: termine le Context, le Provider et le hook useModeChasse pour partager
// le mode de chasse entre Header, ZoneChasse et Footer.

type ModeChasse = "jour" | "nuit";

const ModeChasseContext = createContext<{
  mode: ModeChasse;
  basculer: () => void;
} | null>(null);

function ModeChasseProvider({ children }: { children: ReactNode }) {
  // TODO: gère le state "mode" et expose mode + basculer au Provider.
  const [mode] = useState<ModeChasse>("jour");

  return (
    <ModeChasseContext.Provider value={{ mode, basculer: () => {} }}>
      {children}
    </ModeChasseContext.Provider>
  );
}

// TODO: crée le hook useModeChasse ici.

export default function ModeChasse() {
  return (
    <ModeChasseProvider>
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-box border border-base-300 p-6">
        <Header />
        <ZoneChasse />
        <Footer />
      </div>
    </ModeChasseProvider>
  );
}

function Header() {
  // TODO: consomme useModeChasse pour afficher le mode et basculer.
  return (
    <header className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span>?</span> Donjon du monstre
      </h2>
      <button type="button" className="btn btn-sm btn-primary">
        Basculer le mode
      </button>
    </header>
  );
}

function ZoneChasse() {
  // TODO: consomme useModeChasse pour adapter le rendu au mode actuel.
  // En mode jour : le monstre dort au soleil.
  // En mode nuit : le monstre chasse dans la nuit.
  return (
    <div className="rounded-box bg-base-200 p-8 text-center transition-colors">
      <p>Zone de chasse en cours...</p>
    </div>
  );
}

function Footer() {
  // TODO: consomme useModeChasse pour afficher le mode actuel.
  return (
    <footer className="text-center text-sm opacity-70">
      Mode actuellement actif : <strong>?</strong>
    </footer>
  );
}
