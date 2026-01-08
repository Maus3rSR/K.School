#!/bin/bash

# Ce script initialise l'escape game Git "La Poursuite Multidimensionnelle" (Version 2.0).
# Il doit être exécuté depuis le dossier 'exercices/git/'.
# Durée estimée : 3h30 pour un débutant.

# --- Configuration ---
PROJECT_DIR="multiverse-repairs"

# --- Nettoyage et Initialisation ---
echo "=== Initialisation du multivers ==="
rm -rf $PROJECT_DIR
mkdir $PROJECT_DIR
cd $PROJECT_DIR

git init -b Universe-616

# --- README Principal ---
cat << 'EOF' > README.md
# Agent, votre mission vous attend.

**Dossier : 77-B. Nom de code : "La Poursuite Multidimensionnelle".**

Loki, le dieu de la malice, a de nouveau fracturé le multivers. Ses actions ont créé des instabilités temporelles qui menacent de tout effondrer.

Le Dr. Stephen Strange, le Sorcier Suprême, est le seul à pouvoir réparer les dégâts. Malheureusement, pour éviter que Loki ne mette la main sur l'Œil d'Agamotto, il a dû se cacher dans l'un des innombrables univers.

Avant de disparaître, il a laissé une piste, un fil d'Ariane à travers les dimensions. Mais Loki est sur ses talons, et il s'amuse à brouiller les pistes, altérer le passé et créer des paradoxes.

**Votre mission, si vous l'acceptez :**

En tant qu'Agent Temporel, vous devez utiliser votre terminal de navigation temporelle (Git) pour suivre la piste du Dr. Strange. Vous devrez voyager entre les univers (branches), réparer les altérations de Loki (restaurer des fichiers, résoudre des conflits) et déchiffrer les indices qu'il a laissés.

**Point de départ :**

Vous vous trouvez actuellement dans l'univers principal, dont le nom de code est `Universe-616` (correspondant à la branche `Universe-616` dans votre terminal). 

**PREMIÈRE INSTRUCTION :** Consultez le fichier `BRIEFING.md` pour commencer votre mission. Attention, Loki a peut-être déjà altéré ce fichier. Utilisez l'historique des modifications pour retrouver la version originale.

**Objectif Final : Le Rapport de Mission**

Une fois que vous avez découvert le nom de l'univers où se cache Dr. Strange, vous devez soumettre votre rapport pour valider la mission.

1.  Assurez-vous d'être sur la branche `Universe-616`.
2.  Créez une nouvelle branche nommée `solution-<votre_nom>` (ex: `solution-peter-parker`).
3.  Dans cette nouvelle branche, créez un fichier nommé `SOLUTION.md`.
4.  Écrivez **uniquement** le nom de l'univers final dans ce fichier (format: `XXX-YYY-ZZZ`).
5.  Faites un commit avec le message "Rapport de mission final".

C'est cette branche qui servira de preuve de votre succès.

Bonne chance, Agent. Le temps presse.
EOF

git add README.md
GIT_AUTHOR_NAME="TVA" GIT_AUTHOR_EMAIL="tva@chronology.org" git commit -m "[TVA] Initialisation du dossier de mission 77-B"

# --- ÉTAPE 0 : Le Briefing Altéré (Compétences: git log, git restore) ---

cat << 'EOF' > BRIEFING.md
# BRIEFING DE MISSION - DOSSIER 77-B

**SUJET :** Poursuite du Dr. Stephen Strange.

**STATUT :** Priorité Absolue.

**CONTEXTE :**
Le Dr. Strange a laissé des indices à travers plusieurs univers. Votre première destination est la bibliothèque de Wong, dans l'univers `Wong-Library-Archives`. 

**INDICE :** Dans cette bibliothèque se trouve une stèle ancienne contenant le premier fragment du nom de l'univers caché. Mais attention, Loki a manipulé l'historique de cette stèle. Vous devrez examiner les modifications passées pour découvrir ce qui a été effacé.

**OUTILS À VOTRE DISPOSITION :**
- Consultez l'historique des commits
- Examinez le contenu détaillé des modifications
- Annulez les actions malveillantes de Loki

Bonne chance, Agent.
EOF

git add BRIEFING.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout du briefing de mission"

# Loki altère le briefing
cat << 'EOF' > BRIEFING.md
# BRIEFING DE MISSION - DOSSIER 77-B

[DOCUMENT CORROMPU PAR LOKI]

Vous ne trouverez jamais Strange. Abandonnez maintenant.

- Loki, Dieu de la Malice
EOF

git add BRIEFING.md
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Amélioration du briefing"

# --- Création des branches placeholder (univers de diversion) ---

echo "=== Création des univers de diversion ==="

# Univers Marvel divers (placeholders)
git branch Asgard-Prime
git branch Jotunheim-Frost
git branch Midgard-1999
git branch Sakaar-Wasteland
git branch Xandar-Nova
git branch Knowhere-Mining
git branch Vormir-Soul
git branch Titan-Ruins
git branch Nidavellir-Forge
git branch Hala-Kree
git branch Skrullos-Empire
git branch Quantum-Realm-Sub1
git branch Quantum-Realm-Sub2
git branch Dark-Dimension-001
git branch Mirror-Dimension-Alpha
git branch Astral-Plane-Beta

# Ajout de commits placeholder sur les branches pour brouiller
git switch Asgard-Prime
echo "Archives royales d'Asgard" > asgard_data.txt
git add asgard_data.txt
GIT_AUTHOR_NAME="Heimdall" GIT_AUTHOR_EMAIL="heimdall@asgard.net" git commit -m "Sauvegarde des archives royales"
echo "Inventaire des armes légendaires" >> asgard_data.txt
git add asgard_data.txt
GIT_AUTHOR_NAME="Heimdall" GIT_AUTHOR_EMAIL="heimdall@asgard.net" git commit -m "Mise à jour de l'inventaire"
echo "Rapport de sécurité du Bifrost" >> asgard_data.txt
git add asgard_data.txt
GIT_AUTHOR_NAME="Heimdall" GIT_AUTHOR_EMAIL="heimdall@asgard.net" git commit -m "Rapport de sécurité"

git switch Jotunheim-Frost
echo "Température moyenne : -200°C" > climate.log
git add climate.log
GIT_AUTHOR_NAME="Laufey" GIT_AUTHOR_EMAIL="laufey@jotunheim.ice" git commit -m "Données climatiques"
echo "Réserves de glace éternelle" >> climate.log
git add climate.log
GIT_AUTHOR_NAME="Laufey" GIT_AUTHOR_EMAIL="laufey@jotunheim.ice" git commit -m "Inventaire des ressources"

git switch Sakaar-Wasteland
echo "Déchets accumulés depuis 1000 ans" > junk.log
git add junk.log
GIT_AUTHOR_NAME="Grandmaster" GIT_AUTHOR_EMAIL="gm@sakaar.contest" git commit -m "Inventaire des déchets"
echo "Nouveaux arrivants par le portail" >> junk.log
git add junk.log
GIT_AUTHOR_NAME="Grandmaster" GIT_AUTHOR_EMAIL="gm@sakaar.contest" git commit -m "Registre des arrivées"
echo "Programme des combats de gladiateurs" >> junk.log
git add junk.log
GIT_AUTHOR_NAME="Grandmaster" GIT_AUTHOR_EMAIL="gm@sakaar.contest" git commit -m "Planning des combats"

git switch Xandar-Nova
echo "Registre des Nova Corps" > nova_registry.txt
git add nova_registry.txt
GIT_AUTHOR_NAME="Nova Prime" GIT_AUTHOR_EMAIL="prime@xandar.nova" git commit -m "Mise à jour du registre"
echo "Déploiement de la flotte défensive" >> nova_registry.txt
git add nova_registry.txt
GIT_AUTHOR_NAME="Nova Prime" GIT_AUTHOR_EMAIL="prime@xandar.nova" git commit -m "Ordre de déploiement"

git switch Knowhere-Mining
echo "Extraction de matière cérébrale céleste" > mining_log.txt
git add mining_log.txt
GIT_AUTHOR_NAME="Collector" GIT_AUTHOR_EMAIL="collector@knowhere.org" git commit -m "Rapport d'extraction"
echo "Nouvelle collection d'artefacts" >> mining_log.txt
git add mining_log.txt
GIT_AUTHOR_NAME="Collector" GIT_AUTHOR_EMAIL="collector@knowhere.org" git commit -m "Catalogue des artefacts"
echo "Spécimens rares acquis" >> mining_log.txt
git add mining_log.txt
GIT_AUTHOR_NAME="Collector" GIT_AUTHOR_EMAIL="collector@knowhere.org" git commit -m "Acquisition de spécimens"

git switch Vormir-Soul
echo "Gardien de la Pierre d'Âme" > guardian.log
git add guardian.log
GIT_AUTHOR_NAME="Red Skull" GIT_AUTHOR_EMAIL="skull@vormir.soul" git commit -m "Journal du gardien"
echo "Aucun visiteur depuis 73 ans" >> guardian.log
git add guardian.log
GIT_AUTHOR_NAME="Red Skull" GIT_AUTHOR_EMAIL="skull@vormir.soul" git commit -m "Mise à jour du journal"

git switch Titan-Ruins
echo "Ruines de la civilisation Titan" > ruins_survey.txt
git add ruins_survey.txt
GIT_AUTHOR_NAME="Thanos" GIT_AUTHOR_EMAIL="thanos@titan.ruins" git commit -m "Exploration des ruines"
echo "Ressources épuisées" >> ruins_survey.txt
git add ruins_survey.txt
GIT_AUTHOR_NAME="Thanos" GIT_AUTHOR_EMAIL="thanos@titan.ruins" git commit -m "Rapport de ressources"

git switch Quantum-Realm-Sub1
echo "Particules subatomiques détectées" > quantum_data.txt
git add quantum_data.txt
GIT_AUTHOR_NAME="Hank Pym" GIT_AUTHOR_EMAIL="hank@pym.tech" git commit -m "Analyse quantique"
echo "Tunnel temporel instable" >> quantum_data.txt
git add quantum_data.txt
GIT_AUTHOR_NAME="Hank Pym" GIT_AUTHOR_EMAIL="hank@pym.tech" git commit -m "Détection de tunnel temporel"
echo "Vortex d'énergie quantique" >> quantum_data.txt
git add quantum_data.txt
GIT_AUTHOR_NAME="Janet van Dyne" GIT_AUTHOR_EMAIL="janet@pym.tech" git commit -m "Cartographie du vortex"

git switch Quantum-Realm-Sub2
echo "Zone de distorsion temporelle" > temporal_anomaly.log
git add temporal_anomaly.log
GIT_AUTHOR_NAME="Janet van Dyne" GIT_AUTHOR_EMAIL="janet@pym.tech" git commit -m "Anomalie détectée"
echo "Fluctuations chronologiques" >> temporal_anomaly.log
git add temporal_anomaly.log
GIT_AUTHOR_NAME="Janet van Dyne" GIT_AUTHOR_EMAIL="janet@pym.tech" git commit -m "Analyse des fluctuations"

git switch Dark-Dimension-001
echo "Énergie obscure infinie" > dark_energy.log
git add dark_energy.log
GIT_AUTHOR_NAME="Dormammu" GIT_AUTHOR_EMAIL="dormammu@dark.dimension" git commit -m "Mesure de l'énergie"
echo "Absorption de dimensions mineures" >> dark_energy.log
git add dark_energy.log
GIT_AUTHOR_NAME="Dormammu" GIT_AUTHOR_EMAIL="dormammu@dark.dimension" git commit -m "Expansion dimensionnelle"
echo "Tentative d'invasion de Terre-616" >> dark_energy.log
git add dark_energy.log
GIT_AUTHOR_NAME="Dormammu" GIT_AUTHOR_EMAIL="dormammu@dark.dimension" git commit -m "Plan d'invasion"

git switch Mirror-Dimension-Alpha
echo "Reflets de la réalité" > mirror_data.txt
git add mirror_data.txt
GIT_AUTHOR_NAME="Ancient One" GIT_AUTHOR_EMAIL="ancient@kamar-taj.net" git commit -m "Cartographie de la dimension miroir"
echo "Entraînement des sorciers" >> mirror_data.txt
git add mirror_data.txt
GIT_AUTHOR_NAME="Ancient One" GIT_AUTHOR_EMAIL="ancient@kamar-taj.net" git commit -m "Sessions d'entraînement"

git switch Nidavellir-Forge
echo "Forge des nains" > forge_status.log
git add forge_status.log
GIT_AUTHOR_NAME="Eitri" GIT_AUTHOR_EMAIL="eitri@nidavellir.forge" git commit -m "État de la forge"
echo "Création de Stormbreaker" >> forge_status.log
git add forge_status.log
GIT_AUTHOR_NAME="Eitri" GIT_AUTHOR_EMAIL="eitri@nidavellir.forge" git commit -m "Forgeage de Stormbreaker"

# Retour sur Universe-616
git switch Universe-616

# --- ARC 1 : LA STÈLE CÉLESTE (Compétences: git switch, git log, git revert) ---

echo "=== Arc 1 : La Stèle Céleste ==="

# Création de la branche Wong-Library-Archives
git branch Wong-Library-Archives
git switch Wong-Library-Archives

# Dr. Strange place la stèle avec le fragment CELESTIAL
cat << 'EOF' > STELE.txt
# STÈLE ANCIENNE - FRAGMENT 1

Cette stèle a été découverte dans les ruines de Kamar-Taj.
Elle contient un mot de pouvoir, gravé dans une langue oubliée.

Le mot est : **CELESTIAL**

Ce mot est le premier fragment de la coordonnée finale.
EOF

cat << 'EOF' > clue-1.md
# Indice pour l'Arc 1

Vous êtes dans la bibliothèque de Wong (`Wong-Library-Archives`).

**Objectif :** Trouver le premier fragment du nom de l'univers caché.

**Situation :** La stèle ancienne (`STELE.txt`) semble avoir été altérée. Le texte actuel ne contient pas d'information utile.

**Analyse :**
Loki a manipulé l'historique de cette branche. Vous devez :
1. Consulter l'historique complet des modifications
2. Identifier l'action malveillante de Loki
3. Annuler cette action pour restaurer le contenu original
4. Lire le texte restauré pour obtenir le fragment

**Compétences nécessaires :** Consultation d'historique, annulation de commits

**Prochaine étape :** Une fois le fragment trouvé, un nouveau fichier vous guidera vers l'arc suivant.
EOF

git add STELE.txt clue-1.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout de la stèle ancienne et de l'indice"

# Loki efface le contenu de la stèle
cat << 'EOF' > STELE.txt
# STÈLE ANCIENNE - FRAGMENT 1

[TEXTE EFFACÉ PAR LOKI]

Vous ne trouverez rien ici.
EOF

git add STELE.txt
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Nettoyage de la stèle"

# Ajout d'un fichier qui apparaîtra après le revert
cat << 'EOF' > next-step-1.md
# Bravo, Agent !

Vous avez récupéré le premier fragment : **CELESTIAL**

**Prochaine destination :** L'univers `Kamar-Taj-Spells`.

Dans cet univers, le Dr. Strange a préparé un sort de protection. Mais Loki a corrompu les incantations en créant des versions contradictoires dans différents univers parallèles.

Vous devrez synchroniser et fusionner deux versions du sort pour obtenir le deuxième fragment.

**Direction :** Retournez sur l'univers principal, puis explorez `Kamar-Taj-Spells`.
EOF

git add next-step-1.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout de l'indice pour l'arc 2"

# Retour sur Universe-616
git switch Universe-616

# --- ARC 2 : LE SORT DE L'ÉCHO (Compétences: git branch, git merge, résolution de conflits) ---

echo "=== Arc 2 : Le Sort de l'Écho ==="

# Création de la branche Kamar-Taj-Spells
git branch Kamar-Taj-Spells
git switch Kamar-Taj-Spells

# Dr. Strange crée le sort initial (version incomplète)
cat << 'EOF' > incantations.txt
# SORT DE PROTECTION DU SANCTUAIRE

## Incantation Principale
Par les Vishanti, par les anciens,
Je convoque la protection des dimensions.

## Fragment du Nom Sacré
Le son de la création résonne...
EOF

cat << 'EOF' > clue-2.md
# Indice pour l'Arc 2

Vous êtes dans l'univers `Kamar-Taj-Spells`.

**Objectif :** Récupérer le deuxième fragment du nom de l'univers caché.

**Situation :** Le sort de protection (`incantations.txt`) est incomplet. Le Dr. Strange a créé une version complète dans un univers parallèle appelé `Sorcerer-Supreme-838`.

**Stratégie recommandée :**
1. Créez une branche de travail temporaire
2. Fusionnez l'univers `Sorcerer-Supreme-838` dans votre branche de travail
3. **ATTENTION :** Un conflit va se produire dans `incantations.txt`. C'est normal et attendu !
4. Résolvez le conflit manuellement en conservant les informations des deux versions
5. Finalisez la fusion
6. Lisez le fichier fusionné pour trouver le fragment
7. Nettoyez en supprimant la branche temporaire

**Compétences nécessaires :** Création de branches, fusion, résolution de conflits

**Prochaine étape :** Un nouveau fichier apparaîtra après la fusion réussie.
EOF

git add incantations.txt clue-2.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Préparation du sort de protection"

# Création de la branche Sorcerer-Supreme-838 (version parallèle)
git switch Universe-616
git branch Sorcerer-Supreme-838
git switch Sorcerer-Supreme-838

cat << 'EOF' > incantations.txt
# SORT DE PROTECTION DU SANCTUAIRE

## Incantation Principale
Par les Vishanti, par les anciens,
Je convoque la protection des dimensions.

## Fragment du Nom Sacré
Le son de la création résonne...
C'est un ÉCHO qui traverse les mondes.
EOF

cat << 'EOF' > post_merge_clue.md
# Synchronisation Réussie

Excellent travail, Agent ! Vous avez fusionné les deux versions du sort.

Le deuxième fragment est : **ECHO**

**Fragments collectés jusqu'à présent :** CELESTIAL-ECHO

**Prochaine destination :** L'univers `Nexus-Calculations`.

Le Dr. Strange a effectué des calculs complexes pour déterminer le dernier fragment. Mais Loki a saboté ces calculs et a même effacé certains commits de l'historique en utilisant des manipulations temporelles.

Vous devrez utiliser des outils avancés de navigation dans l'historique Git pour retrouver les commits perdus et restaurer le calcul correct.

**Direction :** Retournez sur l'univers principal, puis explorez `Nexus-Calculations`.
EOF

git add incantations.txt post_merge_clue.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Version complète du sort avec le fragment ECHO"

# Retour sur Universe-616
git switch Universe-616

# --- ARC 3 : LE PARADOXE TEMPOREL (Compétences: git reflog, git reset, git cherry-pick) ---

echo "=== Arc 3 : Le Paradoxe Temporel ==="

# Création de la branche Nexus-Calculations
git branch Nexus-Calculations
git switch Nexus-Calculations

# Dr. Strange commence les calculs
cat << 'EOF' > paradox.log
# CALCUL DES COORDONNÉES NEXUS

## Étape 1 : Initialisation
Base de calcul : 100
EOF

git add paradox.log
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Initialisation des calculs"

# Calcul intermédiaire 1
cat << 'EOF' > paradox.log
# CALCUL DES COORDONNÉES NEXUS

## Étape 1 : Initialisation
Base de calcul : 100

## Étape 2 : Addition des constantes temporelles
100 + 200 = 300
EOF

git add paradox.log
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Calcul intermédiaire 1"

# Calcul intermédiaire 2 (CORRECT - celui que Loki va effacer)
cat << 'EOF' > paradox.log
# CALCUL DES COORDONNÉES NEXUS

## Étape 1 : Initialisation
Base de calcul : 100

## Étape 2 : Addition des constantes temporelles
100 + 200 = 300

## Étape 3 : Multiplication par le facteur Nexus
300 + 477 = 777
EOF

git add paradox.log
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Calcul du facteur Nexus - CORRECT"

# On sauvegarde le hash de ce commit correct
CORRECT_CALCULATION_HASH=$(git rev-parse HEAD)

# Loki sabote en faisant un reset pour effacer le bon calcul
git reset --hard HEAD~1

# Loki ajoute un mauvais calcul
cat << 'EOF' > paradox.log
# CALCUL DES COORDONNÉES NEXUS

## Étape 1 : Initialisation
Base de calcul : 100

## Étape 2 : Addition des constantes temporelles
100 + 200 = 300

## Étape 3 : Multiplication par le facteur Nexus (ERRONÉ)
300 + 444 = 744
EOF

git add paradox.log
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Correction du calcul"

# Ajout du fichier d'indice
cat << 'EOF' > tva_report.md
# Rapport de la TVA - Anomalie Temporelle Détectée

**ALERTE :** Une manipulation temporelle a été détectée dans cette branche.

**Analyse :** Loki a utilisé une réinitialisation forcée pour effacer un commit contenant le calcul correct. Ce commit existe toujours dans l'historique de Git, mais il n'est plus accessible via les commandes d'historique standard.

**Objectif :** Retrouver le commit perdu et restaurer le calcul correct.

**Procédure de récupération :**
1. Consultez l'historique complet de TOUTES les actions Git (y compris les commits "perdus")
2. Identifiez le commit avec le message "Calcul du facteur Nexus - CORRECT"
3. Notez son identifiant (hash)
4. Créez une nouvelle branche pointant vers ce commit perdu
5. Basculez sur cette nouvelle branche
6. Lisez le fichier `paradox.log` pour obtenir le dernier fragment
7. Documentez votre découverte dans un fichier `final_coordinate.md`
8. Validez votre travail avec un commit

**Compétences nécessaires :** Navigation avancée dans l'historique, récupération de commits perdus, création de branches

**Le dernier fragment se trouve dans le résultat du calcul correct.**
EOF

git add tva_report.md
GIT_AUTHOR_NAME="TVA" GIT_AUTHOR_EMAIL="tva@chronology.org" git commit -m "Rapport d'anomalie temporelle"

# Retour sur Universe-616
git switch Universe-616

# --- Message final sur Universe-616 ---
cat << 'EOF' > MISSION_FINALE.md
# Instructions Finales

Une fois que vous avez assemblé les trois fragments, vous devez soumettre votre rapport.

**Format de la solution :** Les trois fragments doivent être assemblés avec des tirets entre eux (format: FRAGMENT1-FRAGMENT2-FRAGMENT3).

**Procédure de soumission :**
1. Assurez-vous d'être sur `Universe-616` : `git switch Universe-616`
2. Créez votre branche de solution : `git branch solution-<votre_nom>`
3. Basculez sur cette branche : `git switch solution-<votre_nom>`
4. Créez le fichier `SOLUTION.md` contenant uniquement le nom de l'univers assemblé
5. Ajoutez et commitez : `git add SOLUTION.md` puis `git commit -m "Rapport de mission final"`

**Félicitations, Agent ! Vous avez sauvé le multivers !**
EOF

git add MISSION_FINALE.md
GIT_AUTHOR_NAME="TVA" GIT_AUTHOR_EMAIL="tva@chronology.org" git commit -m "Ajout des instructions finales"

# --- Finalisation ---
echo ""
echo "=========================================="
echo "Le multivers a été généré avec succès !"
echo "=========================================="
echo ""
echo "Dossier créé : $PROJECT_DIR"
echo ""
echo "Structure de l'escape game :"
echo "- Arc 1 : Branche Wong-Library-Archives"
echo "- Arc 2 : Branches Kamar-Taj-Spells + Sorcerer-Supreme-838"
echo "- Arc 3 : Branche Nexus-Calculations"
echo "- 16 branches de diversion créées"
echo ""
echo "La mission peut commencer. Bonne chance !"
echo ""
echo "ATTENTION : Ce script va s'autodétruire dans 3 secondes..."
sleep 3

# Autodestruction du script
SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
rm -f "$SCRIPT_PATH"
echo "Script init_multiverse.sh supprimé avec succès."
echo ""
