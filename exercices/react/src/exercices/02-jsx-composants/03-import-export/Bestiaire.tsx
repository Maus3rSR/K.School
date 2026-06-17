import CarteMonstre from './CarteMonstre'

export default function Bestiaire() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <CarteMonstre />
      {/* 👉 Ajoute d'autres <CarteMonstre /> pour remplir ton bestiaire */}
    </div>
  )
}
