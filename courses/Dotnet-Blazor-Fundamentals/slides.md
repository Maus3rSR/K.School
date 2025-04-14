---
layout: cover
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Introduction au développement avec .NET Core & Blazor

Objectif de ce parcours : Découvrir les bases du développement Web

---
layout: center
class: text-center
---

# Chapitre 1 - Introduction

---
layout: image-right
image: https://cover.sli.dev?3
---

# Mais, c'est quoi <span v-mark.underline.indigo>.NET</span> ?

<v-clicks class="pt-8">

* Plateforme unique, moderne, open-source, performante et sécurisée
* Environnement d'exécution de plusieurs langages (C#, F#, Visual Basic)
* Support de développement multi-plateforme : Windows, MacOS, Linux, Android, iOS...
* Développement applications variées : Web, Mobile, Desktop, IA, Cloud, Microservices, Gaming, IoT...

</v-clicks>

---
layout: image-left
image: https://cover.sli.dev?4
---

# Petit tracé historique... .NET Framework

<v-clicks class="pt-8">

* Lancé en 2002 par Microsoft pour simplifier le développement d'applications Windows
* Plateforme uniquement Windows
* Difficulté à suivre l'évolution rapide des technologies (cloud, mobile, IoT)
* Complexité croissante avec la multiplication des frameworks (Xamarin, .NET Core, etc.)

</v-clicks>

<!-- 
Historique du .NET Framework

    Le .NET Framework a été lancé par Microsoft en 2002 pour simplifier le développement d’applications Windows, avec une prise en charge de plusieurs langages (C#, VB.NET, etc.) et une gestion centralisée de la mémoire, de la sécurité et des exceptions via le Common Language Runtime (CLR)

Les versions majeures ont apporté des évolutions importantes :
    .NET 1.0 (2002) : Première version, support multi-langages, Windows uniquement.
    .NET 2.0 (2005) : Introduction des generics, améliorations ASP.NET, support 64 bits
    .NET 3.0/3.5 (2006-2007) : Ajout de WPF, WCF, WF, CardSpace pour les interfaces graphiques, la communication et les workflows.
    .NET 4.x (2010-2022) : Dernières évolutions majeures, stabilité, sécurité, mais toujours limité à Windows

Limites du .NET Framework
    Plateforme uniquement Windows.
    Difficulté à suivre l’évolution rapide des technologies (cloud, mobile, IoT).
    Complexité croissante avec la multiplication des frameworks (Xamarin, .NET Core, etc.)
 -->

---
layout: image-right
image: https://cover.sli.dev?5
---

# 2016, place à la (longue) révolution !

<v-clicks class="pt-8">

  * .NET Core est apparu en 2016 pour répondre aux besoins de développement multiplateforme (Windows, Linux, macOS)
  * En 2020, Microsoft a lancé .NET 5, fusionnant .NET Framework, .NET Core et Xamarin en une plateforme unifiée appelée simplement “.NET”
  * Les nouvelles versions de .NET ont continuer avec des améliorations en performance, sécurité et support multiplateforme
  * Actuellement en version .NET 9 (2024)

</v-clicks>

<!-- 
Émergence de .NET Core
    .NET Core est apparu en 2016 pour répondre aux besoins de développement multiplateforme (Windows, Linux, macOS).
    Plus léger, plus performant, open source, adapté au cloud et aux microservices.
    Permet de créer des applications web, API, services, applications console, etc.

Unification avec .NET 5 et versions ultérieures

    En 2020, Microsoft a lancé .NET 5, fusionnant .NET Framework, .NET Core et Xamarin en une plateforme unifiée appelée simplement “.NET”

Objectif : une expérience de développement cohérente pour tous les types d’applications (web, desktop, mobile, cloud, IoT).

.NET 6 (2021), .NET 7, .NET 8 (2023) et .NET 9 (2024) poursuivent cette unification, avec des améliorations continues en performance, sécurité et support multiplateforme

.NET aujourd’hui (2025)
    Plateforme unique, moderne, open source, performante et sécurisée.
    Supporte le développement sur Windows, Linux, macOS, Android, iOS, et le cloud.
    Utilisé dans des secteurs variés (banque, IoT, applications web, etc.) grâce à sa flexibilité et son écosystème riche

Les dernières versions (jusqu’à .NET 9 en 2024) apportent des mises à jour régulières de sécurité et de fonctionnalités
 -->

---

# En résumé

<v-clicks class="pt-8">

* .NET Framework : Plateforme historique
* .NET / .NET Core : Plateforme unifiée moderne et multi-plateforme

</v-clicks>

---
layout: center
class: text-center
---

# Chapitre 2 - Focus sur le Web

---
layout: image-left
image: https://cover.sli.dev?8
---

# En .NET, vous avez plusieurs options pour développer une application web :

<v-clicks class="pt-8">

* .NET MVC (MVC design)
* Razor Pages (MVVM design)
* Blazor (Component design)
* Serveur API

</v-clicks>

<v-click>

_NB: Vous pouvez avoir une application qui mélange plusieurs options_

</v-click>


---
layout: image-right
image: https://cover.sli.dev?9
---

# .NET MVC

<v-clicks class="pt-8">

* **Modèle** : Gère les données et la logique métier
* **Vue** : Interface utilisateur (fichiers .cshtml avec syntaxe Razor)
* **Contrôleur** : Traite les requêtes HTTP, contrôle des données, orchestre les interactions entre Modèle et Vue

</v-clicks>

---
layout: image-left
image: https://cover.sli.dev?10
---

# .NET Razor Pages

<v-clicks class="pt-8">

* **Modèle** : Gère les données et la logique métier
* **Page Razor (View)** (.cshtml) : Interface utilisateur
* **Page Razor (ViewModel)** (.cshtml.cs) : Logique de présentation, fait le lien avec le modèle en fonction des actions utilisateurs
  * Différences clés vs MVC : Aucun contrôleur. Le routage et la logique métier sont intégrés à la page
  * **Simplification** : Moins de fichiers, adapté aux pages autonomes (ex : formulaires, tableaux de bord)

</v-clicks>

---
layout: image-right
image: https://cover.sli.dev?11
---

# .NET Blazor

[Documentation](https://learn.microsoft.com/fr-fr/aspnet/core/tutorials/choose-web-ui?view=aspnetcore-9.0)

<v-clicks class="pt-8">

* Application orienté **Composants**
* **Composant** : Un bloc d'UI autonome, qui peut être réutilisé dans plusieurs interfaces
* Ecrit dans des fichiers Razor (.razor)
* Permet de créer des SPA (Single Page application) en C# sans JavaScript (ou avec un minimum)
* Pour des applications riches, réactives, interactives sans rechargement serveur
</v-clicks>

---
layout: center
class: text-center
---

# Chapitre 3 - Focus sur Blazor

---
layout: image-left
image: https://cover.sli.dev?13
---

# Différents modèles d'hébergement

[Documentation](https://learn.microsoft.com/fr-fr/aspnet/core/blazor/hosting-models?view=aspnetcore-9.0#blazor-hybrid)

<v-clicks class="pt-8">

* **Blazor Server** : Application .NET 100% côté serveur (SSR)
* **Blazor WebAssembly** : Application .NET 100% côté client (CSR avec [WebAssembly](./webassembly.png))
* **Blazor Hybrid** : Application .NET, exécution des composants directement sur la plateforme native (desktop, mobile...) et affiche une interface basée sur HTML/CSS (via une webview)

</v-clicks>

<!-- 

WebAssembly (WASM) est un standard web binaire de bas niveau conçu pour exécuter du code compilé à des performances quasi natives dans les navigateurs. Développé par des acteurs majeurs comme Mozilla, Google et Microsoft, il sert de complément à JavaScript plutôt que de remplacement

Fonctionnement clé :
– Compilation : On écrit du code dans des langages comme Rust, C/C++, puis on le compile en bytecode WASM
.
– Intégration : Les modules WASM interagissent avec JavaScript via l'API WebAssembly, permettant une coexistence harmonieuse.
– Environnement d'exécution : Le bytecode est compilé en langage machine par le navigateur pour une exécution optimisée

Cas d'usage principaux :
▸ Calculs intensifs (traitement d'images, simulations scientifiques)

▸ Jeux vidéo/3D et réalité augmentée
▸ Optimisation de frameworks existants (comme React pour le DOM virtuel)

Avantages majeurs :
✓ Portabilité multiplateforme (web et hors web)

✓ Sécurité via l'exécution en bac à sable
✓ Interopérabilité avec les API web existantes

Bien que parfois présenté comme un "JavaScript nouvelle génération", WASM est conçu pour collaborer avec JS, exploitant sa flexibilité tout en apportant des gains de performance sur les tâches critiques
. Les développeurs peuvent ainsi mixer les deux technologies dans une même application.
 -->

---

 # Les composants

[Documentation](https://learn.microsoft.com/fr-fr/aspnet/core/blazor/?view=aspnetcore-9.0)

 ```razor
@* Fichier Counter.razor *@
<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
 ```

<!-- 

Les applications Blazor sont basées sur des composants. Dans Blazor, un composant est un élément d’IU, par exemple une page, une boîte de dialogue ou un formulaire d’entrée de données.

Les composants sont des classes C# .NET intégrées dans des assemblys .NET qui :

    Définissent la logique de rendu de l’interface utilisateur flexible.
    Gèrent les événements de l’utilisateur.
    Peuvent être imbriqués et réutilisés.
    Peuvent être partagés et distribués en tant que bibliothèques de classes Razor ou en tant que packages NuGet.

La classe de composant est généralement écrite sous la forme d’une page de balises Razor avec l’extension de fichier .razor. Dans Blazor, les composants sont appelés officiellement composants Razor, et officieusement composants Blazor. Razor est une syntaxe qui combine des balises HTML à du code C# destiné à améliorer la productivité des développeurs. Razor vous permet de basculer entre les balises HTML et C# dans le même fichier tout en bénéficiant du support IntelliSense pour la programmation dans Visual Studio.

Blazor utilise des balises HTML naturelles pour la composition de l’IU. Les balises Razor suivantes illustrent un composant qui incrémente un compteur lorsque l’utilisateur sélectionne un bouton.

 -->