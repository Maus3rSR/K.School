## Correction

### Exercice 1
```ts
let nomHero: string = "Aria";
let niveau: number = 1;
let vivant: boolean = true;
```

### Exercice 2
```ts
type Hero = {
  nom: string;
  niveau: number;
  pointsDeVie: number;
};

const hero: Hero = {
  nom: "Aria",
  niveau: 1,
  pointsDeVie: 100
};

console.log(`${hero.nom} est niveau ${hero.niveau}`);
```

### Exercice 3
```ts
const inventaire: string[] = ["arme", "potion", "bouclier"];
```

### Exercice 4
```ts
function attaquer(nomHero: string, pointsAttaque: number): string {
  return `${nomHero} attaque avec ${pointsAttaque} points.`;
}
```

### Exercice 5
```ts
interface Personnage {
  nom: string;
  classe: string;
  niveau: number;
  vivant: boolean;
}

const aria: Personnage = {
  nom: "Aria",
  classe: "mage",
  niveau: 1,
  vivant: true
};

const borin: Personnage = {
  nom: "Borin",
  classe: "guerrier",
  niveau: 2,
  vivant: true
};
```

### Exercice 6
```ts
type Personnage = {
  nom: string;
  niveau: number;
  vivant: boolean;
};

const hero: Personnage = {
  nom: "Aria",
  niveau: 1,
  vivant: true
};

function afficherHero(nom: string): string {
  return `Héros : ${nom}`;
}
```

### Exercice 7
```ts
type Hero = {
  nom: string;
  niveau: number;
  vivant: boolean;
};

const hero: Hero = {
  nom: "Aria",
  niveau: 1,
  vivant: true
};

const inventaire: string[] = ["épée", "potion", "bouclier"];

function attaquer(nomHero: string, degats: number): string {
  return `${nomHero} attaque et inflige ${degats} points.`;
}

console.log(attaquer(hero.nom, 10));
console.log(`${hero.nom} part en mission avec ${inventaire[0]} et 3 potions.`);
```