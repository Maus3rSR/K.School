import type { ReactNode } from "react";
import type { Exercice as ExerciceMeta } from "../exercices";

type Props = {
  meta: ExerciceMeta;
  children: ReactNode;
};

/**
 * Cadre commun à tous les exercices : titre, rappel du README et
 * du ou des fichiers à éditer. Le rendu de l'apprenant est affiché dans
 * la zone « aperçu » via `children`.
 */
export default function Exercice({ meta, children }: Props) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide opacity-60">
          Exercice {meta.numero}
        </p>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <span>{meta.emoji}</span> {meta.titre}
        </h1>
        <div role="alert" className="alert alert-info mt-3 py-2 text-sm">
          <span>
            📖 Lis le <strong>README.md</strong> de l&apos;exercice avant de
            commencer.
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {meta.fichiers.map((f) => (
            <span key={f} className="badge badge-ghost font-mono text-xs">
              ✏️ Editer{" "}
              <code className="ml-1 rounded bg-base-300 px-1 py-0.5 font-mono text-xs">
                {f}
              </code>
            </span>
          ))}
        </div>
      </div>

      <div className="divider text-xs uppercase opacity-50">Aperçu</div>

      <div className="rounded-box border border-base-300 bg-base-200/30 p-6">
        {children}
      </div>
    </div>
  );
}
