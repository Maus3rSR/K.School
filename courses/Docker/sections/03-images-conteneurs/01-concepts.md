# Images & Conteneurs
Analogie

Similaire à la programmation orientée objet, un `container` est une instance d'une `image`

<div class="grid grid-cols-2 gap-x-4">
```ts
class Point2D {
  x: number;
  y: number;
  constructor(coordinates: { x: number, y: number }) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }
}
```

```ts
// point est une instance de la classe Point2D
const point = new Point2D({ x: 1, y: 2 });
```
</div>

---

# Images & Conteneurs
Structure des Images

<div class="grid grid-cols-2 gap-x-4">

<img src="/container-filesystem.png" />

* Composées de couches <small>_(layers)_</small>
* Chaque couche est immuable <small>_(lecture seule)_</small>
* Modifier une couche crée une nouvelle couche au-dessus <small>_(stratégie COW - Copy On Write)_</small>
* Quand on lance un conteneur, une nouvelle couche se créé par dessus, celle-ci en écriture
</div>

<!--
Imaginez préparer un gâteau où chaque couche représente une nouvelle fonctionnalité.

Couche de base = Pain burger → votre image de base (comme Ubuntu ou Alpine).
Couche suivante = Salade → l'installation de Python, par exemple.
Couche supérieure = Steak haché → le code de votre application.

Docker construit cette image gourmande instruction par instruction, et chaque instruction de votre Dockerfile crée une nouvelle couche.
-->

---

# Images & Conteneurs
L'utilité des couches

* 📦 Mise en cache, uniquement les couches modifiées sont re-construits
* ♻️ Partage des layers entre différentes images, on sauvegarde de l'espace disque !
* ⚡ Coût réduit lors de la construction des images dans votre pipeline CI

## Les images Docker sont comme des oignons
