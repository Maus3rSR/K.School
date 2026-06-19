interface BoutonVarianteProps {
  // 👉 Déclare une prop `label` (string) et une prop `variant` (type union à compléter)
  label: string
}

export default function BoutonVariante({ label }: BoutonVarianteProps) {
  // 👉 Calcule la className en fonction de `variant`
  const className = "btn"

  return <button className={className}>{label}</button>
}
