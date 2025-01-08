---
layout: cover
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Introduction au développement avec JavaScript

Objectif de ce parcours : Découvrir les bases du développement Web avec JavaScript & TypeScript dans un navigateur web

<div class="abs-bl mx-14 my-12 flex">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKElEQVR4nO2WT0hVQRTGz/GZ7yEiRJJ/SsMiRaigUFwUhQgGouLChZS5Cmmj5c4kol1tRNoYLcJ0JRKUFYmUJi5EQSP/dEFxkUW4iQyUIMS+mHe5jtN7ihLeO8L54OPBmXmX+c2c+90hEolEIisFh2CTSQAcOQFIC+1GQbcM5CV2gt91SIw6we885EPm2GHarYJeMATACX7XIS3k/M+O8YZ7282xmT5CbTkjI42RGGJkHWbUVTJmX+4DgMFOQiSsx2iTkyMcHbcWYH2WkHtU18NJjILj7q9XKz7D+PPJUoCPz3U9IYEx/cKtLw4STmQzbl5jrExYfALDXbqu2uj3lJ7/64NlKRQP4MuQWa8uZXx+t9PnWQCgfPmC+eJGwozrNYz5/n0C8G2YcLYgNoFCIRdkddJyAGW1yNYGRkpyLMjpPMaPMcsBPH8fJdxvJqQfMiEar3KwACrvtwP4N+d/jlM0/7352Rk+AqgUqSphvH6kawsDJsCrDj3W/YBQeCo279tb9H+SDvgE0NNG0c+/lya36hkddwnnz5ktoe4+ar66/3i1kmLG1yG3vjxOuFSkx9TX2heAuTcaYCufPKavBg9bzZNhZhxJN68SyrcbfGyh908JqSnxF69a4e0Ts/fv3Nge+GJh/CjdMwDlpRFCUx0jJ9PNc3VNriljTD6LP3+sh3ClgpGf6+7+wVR34Y/vEdZmtkq1PQTwwyQAjpwAfG0hkUgkIj/0FxH0JVVHu8XgAAAAAElFTkSuQmCC" alt="JavaScript logo">

<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJ0lEQVR4nO2Xy2sTQRzH998YS1VqLz0WwYJeRLS0eCiCiBQVb4Jn2ajtwUsfBqS1SEVsYyooHsRzKra1FInSqpDnZtM8mhbdYBrqpmn6SOYru7Rpx6TYHNKd4Hzhe9idx85n5jczv5UkISEhIS5FZA94siQAZLECECFUiawOGSI2sWz9rBNxjMrWzzwRF5nMh6VKZfWAiQCQrZ91IkJI3n9G5uJZVCr7uFZsf+y+F7Z3S3gf0JFIb2BlLW9a07fwdSGLl5+Xcdoe4hOguScIRcv9s/41R4xPgI+hTEnZVoEinc0z7y4/i1QPoG0ojCvPo0VfHYkyHw/8yDHlhlv6FZzqU5h6BQrcebuEo/e8Zr8NXT7ceBHHVEjHxSfzh3cP1N/1MgNzR1fL1uscjTH1JhV93z7rbB7+AK47WIDgz5y5oS0/Rg8KcLI3CErZ+J+LZ9H6OFwbAIbfzKZLNjGlgMv/G+cGVP4Bmh748X1xrQTCUL5A4XSncPyvsOIKwHBjtw9j7mXzFCqnL7HV4snEJcCOLwyGMaHoZSH6XRr/AGTbl55GsJjeZPownmsGgMgenLGHmD6M8Dpi4wzg7CMVt18nigMje2zc1HtlJHfcrUDHcMQsV5PreDiumRfb+UHVTNy+Jdj8alrN8AtwEN10xmsTgFJg4EOSaccNwIluH269WoDjUwoz8xnEUhtmGv0rs/sj0z5UmlZUHaDalv47ACEhISHpMPQHFt1nSGvrWBcAAAAASUVORK5CYII=" alt="typescript logo">
</div>

---
layout: center
class: text-center
---

# Chapitre 1 - Introduction
JavaScript : Le Langage dynamique du web

---
layout: image-right
image: https://cover.sli.dev
---

# Mais, c'est quoi <span v-mark.underline.indigo>JavaScript</span> ?

<v-clicks class="pt-8">

* Créé par Brendan Eich en 1995
* Un langage de programmation dynamique
* Intégré dans les navigateurs web
* Principalement utilisé pour ajouter de l'interactivité aux pages web

</v-clicks>

<!--
Créé par Brendan Eich en 1995

- JavaScript a été développé en seulement 10 jours, c'est fou !
- C'est un peu le début de l'ère des sites interactifs.
_____
Un langage de programmation dynamique

- Le typage est dynamique, donc pas besoin de déclarer les types à l'avance.
- On peut créer des variables à la volée, c'est super flexible.
- Ça permet de faire plein de trucs sans se prendre la tête.
_____
Intégré dans les navigateurs web

- Tous les navigateurs modernes supportent JavaScript, c'est un must-have.
- Ça permet d'exécuter du code directement dans le navigateur, sans serveur.
- L'expérience utilisateur s'en trouve vraiment améliorée grâce à ça.
- Principalement utilisé pour ajouter de l'interactivité aux pages web
-->

---

# Quelques possibilités de JavaScript

<v-switch class="mt-16">
  <template #1-3>
  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">
  <div class="my-auto opacity-75">
  Algorithmie
  </div>

```js {monaco-run}
function calculerFactorielle(n) {
  let resultat = 1
  for (let i = 1; i <= n; i++) resultat *= i
  return resultat
}

console.log(calculerFactorielle(5))
```
  </div>
  </template>

  <template #2-3>

  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">

  <div class="my-auto opacity-75">
  Gestion des évènements
  </div>

  <div class="grid grid-cols-[75%_25%] gap-4">
```js {monaco-run}
const button = document.querySelector('#button_explosion')
button.addEventListener('click', function() {
  alert('BOOM! 💥')
})
```
  <button id="button_explosion" class="bg-red-500 text-white font-semibold py-2 px-4 border border-red-500 rounded-full">
    Ne me touche pas !
  </button>

  </div>
  </div>
  </template>
  
  <template #3-5>
  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">

  <div class="my-auto opacity-75">
  Manipulation du DOM
  </div>

```js {monaco}
document.querySelector('h1').textContent = 'Bonjour, monde !';
```
  </div>
  </template>

  <template #4-5>
  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">

  <div class="my-auto opacity-75">
  Manipulation du style
  </div>

```js {monaco}
document.querySelector('h1').style.color = 'blue';
```

  </div>
  </template>

  <template #5-7>
  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">

  <div class="my-auto opacity-75">
  Requêtes HTTP (AJAX)
  </div>


```js {monaco-run}
console.log('Chargement des pokemons...')
await new Promise(resolve => setTimeout(resolve, 1000));
fetch('https://pokeapi.co/api/v2/pokemon?limit=3')
  .then(response => response.json())
  .then(data => {
    console.log('Pokemons récupérés ! Voici la liste :')
    data.results.forEach(pokemon => console.log(pokemon.name));
  })
  .catch(error => console.error('Erreur lors de la récupération des pokémons:', error));
```
  </div>
  </template>

  <template #6-7>
  <div class="grid grid-cols-[.2fr_1fr] gap-x-4 gap-y-12">

  <div class="my-auto opacity-75">
  Et plus encore (2d, 3d, communication en temps réel, etc.)
  </div>

  </div>
  </template>
</v-switch>

---

# Un langage, <span v-mark.underline.indigo>plusieurs environnement</span>

<v-clicks class="pt-8">

* **Navigateur web** : JavaScript est exécuté côté client dans un navigateur web pour ajouter de l'interactivité aux pages web. Il permet de manipuler le Document Object Model (DOM) pour modifier le contenu et le style des pages web.
* **Serveur avec Node.js** : Node.js permet d'exécuter JavaScript côté serveur, ce qui signifie que le code JavaScript s'exécute sur le serveur web au lieu du navigateur. Cela permet de créer des applications serveur robustes et scalables.
* **Mobile** : JavaScript est également utilisé dans le développement d'applications mobiles, notamment avec des frameworks tels que React Native. Cela permet de créer des applications mobiles natives pour Android et iOS en utilisant JavaScript et des technologies web.

</v-clicks>


---

# Comment JavaScript fonctionne dans un navigateur web ?

<v-clicks class="pt-8">

* Le moteur JavaScript dans un navigateur web est responsable de l'exécution du code JavaScript. Les moteurs les plus courants sont V8 pour Google Chrome et SpiderMonkey pour Mozilla Firefox.
* JavaScript est un langage interprété, ce qui signifie que le code est exécuté ligne par ligne sans être compilé au préalable. Cela permet une grande flexibilité et une rapidité de développement.
* Cependant, pour améliorer les performances, les moteurs JavaScript utilisent une technique appelée Just-In-Time (JIT) compilation. Cette technique compile le code JavaScript en code machine au moment de l'exécution, ce qui permet d'obtenir des performances plus proches de celles d'un langage compilé.

</v-clicks>



---

# Trigger Warning

Ne pas confondre JavaScript & Java !

Il est important de noter que JavaScript et Java sont deux langages de programmation distincts, malgré leur nom similaire. JavaScript est un langage de programmation dynamique principalement utilisé pour ajouter de l'interactivité aux pages web, tandis que Java est un langage de programmation utilisé pour développer des applications plus larges.