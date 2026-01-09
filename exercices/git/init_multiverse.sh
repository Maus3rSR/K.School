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

# Dr. Strange place la stèle avec le fragment CELESTIAL et l'indice pour l'arc 2
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

**Situation :** La stèle ancienne (`STELE.txt`) semble avoir été altérée et un fichier d'indice crucial a disparu. Le texte actuel ne contient pas d'information utile.

**Analyse :**
Loki a manipulé l'historique de cette branche. Vous devez :
1. Consulter l'historique complet des modifications.
2. Identifier l'action malveillante de Loki qui a modifié la stèle et supprimé un fichier.
3. Annuler cette action pour restaurer le contenu original de la stèle ET le fichier manquant.
4. Lire le texte restauré pour obtenir le fragment.

**Compétences nécessaires :** Consultation d'historique, annulation de commits (`git revert`).

**Prochaine étape :** Une fois le fragment trouvé, le fichier restauré vous guidera vers l'arc suivant.
EOF

cat << 'EOF' > next-step-1.md
# Bravo, Agent !

Vous avez récupéré le premier fragment : **CELESTIAL**

**Prochaine destination :** L'univers `Kamar-Taj-Spells`.

Dans cet univers, le Dr. Strange a préparé un sort de protection. Mais Loki a corrompu les incantations en créant des versions contradictoires dans différents univers parallèles.

Vous devrez assembler un mot de pouvoir pour obtenir le deuxième fragment.

**Direction :** Explorez la branche `Kamar-Taj-Spells` pour trouver les instructions.
EOF

git add STELE.txt clue-1.md next-step-1.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout de la stèle ancienne et des indices"

# Loki efface le contenu de la stèle et supprime l'indice suivant
cat << 'EOF' > STELE.txt
# STÈLE ANCIENNE - FRAGMENT 1

[TEXTE EFFACÉ PAR LOKI]

Vous ne trouverez rien ici.
EOF

rm next-step-1.md

git add STELE.txt next-step-1.md
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Nettoyage de la stèle et des parchemins inutiles"

# Retour sur Universe-616
git switch Universe-616

# --- ARC 2 : LE RITUEL ANCIEN (Compétences: git branch, git merge, résolution de conflits multiples) ---

echo "=== Arc 2 : Le Rituel Ancien ==="

# Création de la branche de travail
git branch Kamar-Taj-Spells
git switch Kamar-Taj-Spells

cat << 'EOF' > ritual_instructions.md
# Rituel de Reconstruction du Mot de Pouvoir

Vous êtes dans l'univers des sorts anciens.

**Contexte :** Dr. Strange a dispersé les lettres d'un mot de pouvoir dans différentes branches. Vous devez assembler ces lettres dans le bon ordre en utilisant différentes techniques Git.

**Avertissement :** Certaines branches contiennent de mauvaises lettres. Si vous assemblez un mot incorrect, le rituel échouera.

**Techniques requises :**
1. **Fusion avec résolution de conflits** : Certaines lettres nécessitent de fusionner des branches et de résoudre des conflits
2. **Cherry-pick** : Certaines lettres doivent être récupérées via cherry-pick de commits spécifiques
3. **Rebase interactif** : Certaines lettres nécessitent de réorganiser l'historique

**Procédure :**
1. Explorez les branches disponibles
2. Identifiez les bonnes lettres parmi les mauvaises
3. Assemblez-les dans le bon ordre pour former un mot de 4 lettres
4. Le fichier `spell_word.txt` contiendra le mot final

**Compétences nécessaires :** Merge, résolution de conflits, cherry-pick, rebase interactif, exploration de l'historique
EOF

cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ _ _ _
EOF

git add ritual_instructions.md spell_word.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Initialisation du rituel de reconstruction"

# Retour sur Universe-616 pour créer les branches de lettres
git switch Universe-616

# Branches en désordre avec lettres correctes (H, O, C, E) et incorrectes (A, K, R, U)

# Branche fragment-alpha : Lettre H (position 3)
git branch fragment-alpha Kamar-Taj-Spells
git switch fragment-alpha
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ _ H _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Fragment alpha"

# Branche fragment-beta : Lettre O (position 4) - CORRECTE
git branch fragment-beta Kamar-Taj-Spells
git switch fragment-beta
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ _ _ O
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Fragment beta"

# Branche fragment-gamma : Lettre C (position 2) - CORRECTE
git branch fragment-gamma Kamar-Taj-Spells
git switch fragment-gamma
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ C _ _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Fragment gamma"

# Branche fragment-delta : Lettre E (position 1) - CORRECTE
git branch fragment-delta Kamar-Taj-Spells
git switch fragment-delta
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

E _ _ _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Fragment delta"

# Branches avec mauvaises lettres

# Branche fragment-epsilon : Lettre A (incorrecte)
git branch fragment-epsilon Kamar-Taj-Spells
git switch fragment-epsilon
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

A _ _ _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Fragment epsilon"

# Branche fragment-zeta : Lettre K (incorrecte)
git branch fragment-zeta Kamar-Taj-Spells
git switch fragment-zeta
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ K _ _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Fragment zeta"

# Branche fragment-eta : Lettre R (incorrecte)
git branch fragment-eta Kamar-Taj-Spells
git switch fragment-eta
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ _ R _
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Fragment eta"

# Branche fragment-theta : Lettre U (incorrecte)
git branch fragment-theta Kamar-Taj-Spells
git switch fragment-theta
cat << 'EOF' > spell_word.txt
# MOT DE POUVOIR

_ _ _ U
EOF
git add spell_word.txt
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Fragment theta"

# Fichier de vérification (à consulter après assemblage)
git switch Kamar-Taj-Spells
cat << 'EOF' > verification.md
# Vérification du Rituel

Une fois que vous avez assemblé les 4 lettres dans le bon ordre dans le fichier `spell_word.txt`, consultez ce fichier pour vérifier votre réponse.

**Si la formule que vous avez formé avec le mot est correcte :**

Un [REMPLACER_PAR_LE_MOT_FORME] résonne à travers les mondes.

Le deuxième fragment est confirmé. Il s'agit du mot que vous venez de reconstituer.

**Prochaine destination :** L'univers `Nexus-Calculations`.

Le Dr. Strange a effectué des calculs complexes pour déterminer le dernier fragment. Mais Loki a saboté ces calculs et a même effacé certains commits de l'historique en utilisant des manipulations temporelles.

Vous devrez utiliser des outils avancés de navigation dans l'historique Git pour retrouver les commits perdus et restaurer le calcul correct.

**Direction :** Retournez sur l'univers principal, puis explorez `Nexus-Calculations`.

---

**Si vous avez formé un autre mot :** Vous avez choisi les mauvaises lettres. Recommencez en explorant les branches de fragments.
EOF
git add verification.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout du fichier de vérification"

# Retour sur Universe-616
git switch Universe-616

# --- ARC 3 : LE PARADOXE TEMPOREL (Compétences: git reflog, git reset, git cherry-pick) ---

echo "=== Arc 3 : Le Paradoxe Temporel ==="

# Création de la branche Nexus-Calculations
git branch Nexus-Calculations
git switch Nexus-Calculations

# Dr. Strange crée le premier fichier de séquence avec la partie 1
cat << 'EOF' > sequence_part1.txt
7
EOF

cat << 'EOF' > paradox.log
# SÉQUENCE DE DÉVERROUILLAGE DIMENSIONNEL

Dr. Strange a fragmenté la coordonnée finale en trois parties.
Chaque partie est stockée dans un fichier différent.

Partie 1 : sequence_part1.txt
Partie 2 : sequence_part2.txt
Partie 3 : sequence_part3.txt

Formule d'assemblage : [Part1] × [Part2] - [Part3]
EOF

git add sequence_part1.txt paradox.log
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Séquence partie 1 - Initialisation"

# Dr. Strange ajoute la partie 2
cat << 'EOF' > sequence_part2.txt
111
EOF

git add sequence_part2.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Séquence partie 2 - Ajout du multiplicateur"

# Dr. Strange ajoute la partie 3 (CORRECT - celui que Loki va effacer)
cat << 'EOF' > sequence_part3.txt
0
EOF

git add sequence_part3.txt
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Séquence partie 3 - CORRECTE"

# On sauvegarde le hash de ce commit correct
CORRECT_SEQUENCE_HASH=$(git rev-parse HEAD)

# Loki sabote en faisant un reset pour effacer le bon commit
git reset --hard HEAD~1

# Loki remplace les fichiers par de fausses valeurs
cat << 'EOF' > sequence_part1.txt
5
EOF

cat << 'EOF' > sequence_part2.txt
99
EOF

cat << 'EOF' > sequence_part3.txt
12
EOF

cat << 'EOF' > paradox.log
# SÉQUENCE DE DÉVERROUILLAGE DIMENSIONNEL

Dr. Strange a fragmenté la coordonnée finale en trois parties.
Chaque partie est stockée dans un fichier différent.

Partie 1 : sequence_part1.txt
Partie 2 : sequence_part2.txt
Partie 3 : sequence_part3.txt

Formule d'assemblage : [Part1] × [Part2] - [Part3]

[ATTENTION : Ces valeurs ont été corrompues par Loki]
EOF

git add sequence_part1.txt sequence_part2.txt sequence_part3.txt paradox.log
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Correction des séquences"

# Ajout du fichier d'indice
cat << 'EOF' > tva_report.md
# Rapport de la TVA - Anomalie Temporelle Détectée

**ALERTE :** Une manipulation temporelle majeure a été détectée dans cette branche.

**Analyse :** Dr. Strange a créé une séquence de déverrouillage en trois parties pour protéger la coordonnée finale. Loki a utilisé une réinitialisation forcée pour effacer le commit contenant les vraies valeurs et les a remplacées par des valeurs corrompues.

**Objectif :** Retrouver le commit perdu contenant les vraies valeurs de la séquence.

**Situation actuelle :**
- Les fichiers `sequence_part1.txt`, `sequence_part2.txt` et `sequence_part3.txt` existent
- MAIS ils contiennent des valeurs corrompues par Loki
- Le commit original avec les vraies valeurs a été effacé de l'historique standard

**Procédure de récupération :**
1. Consultez l'historique complet de TOUTES les actions Git (y compris les commits "perdus")
2. Identifiez le commit avec le message "Séquence partie 3 - CORRECTE"
3. Notez son identifiant (hash)
4. Créez une nouvelle branche pointant vers ce commit perdu
5. Basculez sur cette nouvelle branche
6. Lisez les trois fichiers `sequence_part1.txt`, `sequence_part2.txt`, `sequence_part3.txt`
7. Appliquez la formule indiquée dans `paradox.log` : [Part1] × [Part2] - [Part3]
8. Le résultat est le dernier fragment

**Compétences nécessaires :** Navigation avancée dans l'historique, récupération de commits perdus, création de branches, calcul simple

EOF

git add tva_report.md
GIT_AUTHOR_NAME="TVA" GIT_AUTHOR_EMAIL="tva@chronology.org" git commit -m "Rapport d'anomalie temporelle"

# Retour sur Universe-616
git switch Universe-616

# --- Message final sur Universe-616 ---
cat << 'EOF' > MISSION_FINALE.md
# Instructions Finales

Une fois que vous avez assemblé les trois fragments, vous devez soumettre votre rapport.

**Format de la solution :** Les trois fragments doivent être assemblés avec des tirets (format: `FRAGMENT1-FRAGMENT2-FRAGMENT3`).

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
