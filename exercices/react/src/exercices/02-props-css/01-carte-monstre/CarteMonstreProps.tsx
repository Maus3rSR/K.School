interface CarteMonstreProps {
  // 👉 Déclare ici les props : nom, emoji, description
}

export default function CarteMonstreProps(/* props ici */) {
  return (
    <div className="card w-56 bg-base-100 shadow-md">
      <div className="card-body items-center text-center">
        {/* 👉 Affiche emoji, nom et description depuis les props */}
        <p className="opacity-60">Props à brancher…</p>
      </div>
    </div>
  )
}
