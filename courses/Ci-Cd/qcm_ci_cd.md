# QCM CI/CD avec GitHub - 20 questions

---

### Questions Faciles

**1. Que signifie l'acronyme "CI" dans le contexte du développement logiciel ?**
- a) Intégration Continue (Continuous Integration)
- b) Code Intelligent (Clever Integration)
- c) Contrôle d'Intégrité (Control of Integrity)
- d) Compilation Initiale (Initial Compilation)

_Réponse(s) : a)_ 

**2. Quel est l'objectif principal de l'Intégration Continue (CI) ?**
- a) Déployer automatiquement l'application en production.
- b) Automatiser l'intégration des changements de code pour en vérifier la justesse et la qualité.
- c) Gérer les versions du code source.
- d) Rédiger la documentation du projet.

_Réponse(s) : b)_ 

**3. Quelles sont les deux pratiques désignées par l'acronyme "CD" ?**
- a) Déploiement Continu et Développement Continu
- b) Livraison Continue et Déploiement Continu
- c) Livraison Continue et Données Continues
- d) Code Détaillé et Code Déployé

_Réponse(s) : b)_ 

**4. Qu'est-ce que GitHub ?**
- a) Un éditeur de code en ligne.
- b) Uniquement un outil de gestion de projet.
- c) Une plateforme cloud pour héberger, partager et collaborer sur du code en utilisant Git.
- d) Un système d'exploitation pour les développeurs.

_Réponse(s) : c)_ 

**5. Dans quel répertoire d'un projet GitHub doivent être placés les fichiers de configuration des workflows ?**
- a) `.github/workflows/`
- b) `.workflows/`
- c) `config/ci/`
- d) `actions/`

_Réponse(s) : a)_ 

---

### Questions de difficulté moyenne

**6. Quelle est la principale différence entre la Livraison Continue (Continuous Delivery) et le Déploiement Continu (Continuous Deployment) ?**
- a) La Livraison Continue se concentre sur le packaging de l'application, tandis que le Déploiement Continu concerne uniquement les tests.
- b) La Livraison Continue automatise le déploiement jusqu'à un environnement de pré-production, nécessitant une approbation manuelle pour la production, alors que le Déploiement Continu automatise le processus jusqu'en production.
- c) Le Déploiement Continu est une pratique plus ancienne qui a été remplacée par la Livraison Continue.
- d) Les deux termes sont interchangeables et décrivent le même processus d'automatisation.

_Réponse(s) : b)_ 

**7. Qu'est-ce qu'un "workflow" dans le contexte de GitHub Actions ?**
- a) Une interface visuelle pour gérer les problèmes (issues) d'un projet.
- b) Un ensemble de processus automatisés définis dans un fichier de configuration YAML, déclenchés par des événements spécifiques, pour construire, tester et déployer du code.
- c) Un synonyme pour une Pull Request dans GitHub.
- d) Un script bash utilisé pour l'automatisation locale.

_Réponse(s) : b)_ 

**8. Qu'est-ce qu'un "événement" (event) dans GitHub Actions ?**
- a) Uniquement une action de `push` sur la branche principale.
- b) Une notification envoyée aux développeurs en cas d'échec d'un build.
- c) Un déclencheur spécifique dans un dépôt, comme un `push`, une `pull request` ou une `release`, qui initie l'exécution d'un workflow.
- d) Un rapport d'erreur généré par un workflow.

_Réponse(s) : c)_ 

**9. Qu'est-ce qu'un "runner" dans GitHub Actions ?**
- a) Le service de GitHub qui stocke les logs des workflows.
- b) L'environnement d'exécution (machine virtuelle ou conteneur) sur lequel les jobs d'un workflow sont exécutés.
- c) Un template de workflow réutilisable.
- d) Un développeur assigné à la supervision d'un workflow.

_Réponse(s) : b)_ 

**10. Comment les "jobs" d'un même workflow sont-ils exécutés par défaut ?**
- a) En séquence, sauf si `needs` est spécifié.
- b) En parallèle, pour optimiser la vitesse d'exécution, chaque job s'exécutant sur un runner disponible.
- c) L'ordre dépend du nombre d'étapes dans chaque job.
- d) Tous les jobs s'exécutent sur le même runner pour partager le contexte.

_Réponse(s) : b)_ 

**11. À quoi sert une "action" dans un workflow GitHub, comme `actions/checkout@v4` ?**
- a) À définir les variables d'environnement pour un job.
- b) Une unité de code réutilisable qui encapsule une tâche spécifique, pouvant être combinée pour construire des jobs. `actions/checkout` est utilisée pour accéder au code source.
- c) À déclencher manuellement un workflow.
- d) À afficher des messages dans la console du runner.

_Réponse(s) : b)_ 

**12. Quel est le format de fichier utilisé pour définir les workflows GitHub Actions ?**
- a) JSON, pour sa compatibilité avec les API REST.
- b) XML, pour sa structure hiérarchique stricte.
- c) YAML, pour sa lisibilité et sa syntaxe concise, bien adaptée à la configuration.
- d) Markdown, pour intégrer la documentation directement dans les workflows.

_Réponse(s) : c)_ 

**13. Qu'est-ce qu'un "job" dans un workflow GitHub Actions ?**
- a) Une collection de workflows partageant les mêmes secrets.
- b) Un ensemble d'étapes (steps) exécutées séquentiellement sur un même runner, représentant une unité de travail.
- c) Un rapport de performance généré à la fin d'un workflow.
- d) Le conteneur Docker dans lequel s'exécute une action.

_Réponse(s) : b)_ 

**14. Quel outil CI est considéré comme le "père" de tous les outils CI modernes et a été initié par Kohsuke Kawaguchi ?**
- a) GitHub Actions, pour son intégration native avec GitHub.
- b) Concourse CI, pour son approche basée sur les pipelines.
- c) Jenkins, un serveur d'automatisation open source hautement extensible, pionnier de la CI.
- d) Travis CI, l'un des premiers services CI/CD hébergés et intégrés à GitHub.

_Réponse(s) : c)_ 

**15. Quel avantage le CI apporte-t-il dans un travail d'équipe ?**
- a) Il élimine le besoin de revues de code manuelles.
- b) Il empêche l'introduction de régressions en validant chaque changement par des builds et des tests automatisés, favorisant une base de code stable.
- c) Il garantit que le code est toujours prêt à être déployé, mais ne teste pas la qualité.
- d) Il automatise uniquement la compilation du code, sans exécuter de tests.

_Réponse(s) : c)_ 

**16. Une "étape" (step) dans un job peut être constituée de quoi ?**
- a) Uniquement d'une commande `run` qui exécute un script shell.
- b) D'une commande `run` pour les scripts ou d'une clause `uses` pour exécuter une action, permettant de composer des tâches complexes.
- c) Uniquement d'une clause `uses` pour appeler une action.
- d) D'une référence à un autre workflow pour l'imbrication.

_Réponse(s) : b)_ 

**17. Est-il possible d'héberger ses propres runners pour GitHub Actions ?**
- a) Non, pour des raisons de sécurité, GitHub n'autorise que ses propres runners.
- b) Oui, les `self-hosted runners` permettent d'utiliser des environnements personnalisés, des configurations matérielles spécifiques ou de respecter des contraintes de sécurité.
- c) Oui, mais uniquement pour les organisations GitHub Enterprise.
- d) Oui, mais ils ne peuvent exécuter que des actions publiques du Marketplace.

_Réponse(s) : b)_ 

**18. Quel est l'avantage de partager des données entre les étapes ?**
- a) Le partage de données n'est possible qu'entre jobs, pas entre étapes.
- b) Utiliser des `outputs` pour les métadonnées ou des `artifacts` pour les fichiers permet de chaîner des étapes dépendantes, optimisant ainsi le workflow.
- c) Le partage de données est une mauvaise pratique qui complexifie les workflows.
- d) Les données sont automatiquement partagées via des variables d'environnement globales.

_Réponse(s) : b)_ 

**19. Comment peut-on déclencher un workflow manuellement depuis l'interface de GitHub ?**
- a) En ajoutant un commentaire `/run` dans une Pull Request.
- b) En configurant un événement `workflow_dispatch`, ce qui expose un bouton "Run workflow" dans l'onglet Actions de l'interface GitHub.
- c) En modifiant directement le fichier YAML du workflow.
- d) Le déclenchement manuel n'est disponible que pour les runners auto-hébergés.

_Réponse(s) : b)_ 

**20. Quel est le principal inconvénient de GitHub Actions mentionné dans la présentation ?**
- a) Son manque de flexibilité pour les projets complexes.
- b) Le fait qu'il soit une solution propriétaire de GitHub, ce qui peut rendre la migration vers d'autres plateformes CI/CD plus difficile.
- c) Sa communauté est moins active que celle de Jenkins.
- d) Il ne permet pas d'exécuter des jobs en parallèle.

_Réponse(s) : b)_ 
