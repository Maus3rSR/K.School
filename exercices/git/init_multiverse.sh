#!/bin/bash

# Ce script initialise l'escape game Git "La Poursuite Multidimensionnelle".
# Il doit être exécuté depuis le dossier 'exercices/git/'.

# --- Configuration ---
PROJECT_DIR="multiverse-repairs"

# --- Nettoyage et Initialisation ---
echo "Initialisation du multivers..."
rm -rf $PROJECT_DIR
mkdir $PROJECT_DIR
cd $PROJECT_DIR

git init -b Universe-616

# Configuration des voyageurs temporels (auteurs des commits)
SENDER_STRANGE="Dr. Strange <strange@kamar-taj.net>"
SENDER_FURY="Nick Fury <fury@shield.org>"
SENDER_LOKI="Loki <loki@asgard.mischief>"

# --- ÉTAPE 1 : Le Point de Départ (Univers-616 / Universe-616) ---

# Commit initial avec le contexte
cat << EOF > README.md
# Agent, votre mission vous attend.

**Dossier : 77-B. Nom de code : "La Poursuite Multidimensionnelle".**

Loki, le dieu de la malice, a de nouveau fracturé le multivers. Ses actions ont créé des instabilités temporelles qui menacent de tout effondrer.

Le Dr. Stephen Strange, le Sorcier Suprême, est le seul à pouvoir réparer les dégâts. Malheureusement, pour éviter que Loki ne mette la main sur l'Œil d'Agamotto, il a dû se cacher dans l'un des innombrables univers.

Avant de disparaître, il a laissé une piste, un fil d'Ariane à travers les dimensions. Mais Loki est sur ses talons, et il s'amuse à brouiller les pistes, altérer le passé et créer des paradoxes.

**Votre mission, si vous l'acceptez :**

En tant qu'Agent Temporel, vous devez utiliser votre terminal de navigation temporelle (Git) pour suivre la piste du Dr. Strange. Vous devrez voyager entre les univers (branches), réparer les altérations de Loki (restaurer des fichiers, résoudre des conflits) et déchiffrer les indices qu'il a laissés.

**Point de départ :**

Vous vous trouvez actuellement dans l'univers principal, dont le nom de code est \`Universe-616\` (correspondant à la branche \`Universe-616\` dans votre terminal). Votre première instruction se trouve dans le journal de bord de Strange. Malheureusement, Loki a déjà frappé et a effacé la dernière entrée.

**Objectif Final : Le Rapport de Mission**

Une fois que vous avez découvert le nom de l'univers où se cache Dr. Strange, vous devez soumettre votre rapport pour valider la mission.

1.  Assurez-vous d'être sur la branche \`Universe-616\`.
2.  Dans cette branche, créez un fichier nommé \`SOLUTION.md\`.
3.  Écrivez **uniquement** le nom de l'univers final dans ce fichier.
4.  Faites un commit avec le message "Rapport de mission final".

C'est cette branche qui servira de preuve de votre succès.

Bonne chance, Agent. Le temps presse.
EOF

cat << EOF > tva_manual.md
# Manuel de l'Agent Temporel - Section 7

**Sujet : Le Reflog - Notre filet de sécurité temporel**

Parfois, des événements (commits) sont effacés de la chronologie principale. Un \`reset --hard\` malencontreux, une réécriture de l'histoire... Loki adore ça.

Heureusement, la TVA conserve une trace de *toutes* les positions de la tête de lecture (HEAD) dans un journal de bord local : le \`reflog\`.

Chaque fois que vous changez de branche, que vous faites un commit, un reset, ou un rebase, une entrée est ajoutée au \`reflog\`. C'est notre mémoire à court terme.

Si un commit semble avoir disparu de \`git log\`, il est probablement encore accessible via le \`reflog\`. Utilisez \`git reflog\` pour voir l'historique de vos actions et retrouver le hash du commit perdu.

Une fois retrouvé, vous pouvez y revenir pour voir ce qu'il contenait.
EOF

git add README.md tva_manual.md
git commit -m "[TVA] Initialisation du dossier de mission 77-B"

# Dr. Strange laisse son journal avec l'indice
echo "# Journal du Dr. Strange" > strange_journal.md
echo "
**Entrée 44 :** Loki m'a repéré. Je me réfugie dans un univers où la technologie Stark a fusionné avec la magie. Cherchez l'univers Tech-Arcane-928." >> strange_journal.md
git add strange_journal.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ajout de mon journal de bord"

# Loki efface l'indice
echo "# Journal du Dr. Strange" > strange_journal.md
echo "
**Entrée 44 :** [CETTE ENTRÉE A ÉTÉ EFFACÉE PAR UNE FORCE INCONNUE]" >> strange_journal.md
git add strange_journal.md
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git commit -m "Un peu de désordre..."

# --- ÉTAPE 4 (préparation en amont) : L'univers perdu ---

# Dr Strange crée la branche Wasteland-2149 avec l'indice final
git switch Universe-616
git branch Wasteland-2149
git switch Wasteland-2149
echo "La coordonnée finale est : Quantum-Verse-001" > final_coordinate.md
git add final_coordinate.md
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Ultime recours"

# On note le hash de ce commit avant de le perdre
WASTELAND_COMMIT_HASH=$(git rev-parse HEAD)

# Retour sur Universe-616
git switch Universe-616

# --- ÉTAPE 3 (préparation) : Le message de Fury et le revert de Loki ---

# Nick Fury laisse un message secret qui parle de la branche que Loki va supprimer
GIT_AUTHOR_NAME="Nick Fury" GIT_AUTHOR_EMAIL="fury@shield.org" git commit --allow-empty -m "Message secret : Strange a mentionné un univers post-apocalyptique où il a caché la coordonnée finale. Mais attention, le commit qui a créé cet univers a été effacé de l'histoire. Il faut le retrouver."

# On récupère le hash du commit de Fury
FURY_COMMIT_HASH=$(git log --author="Nick Fury" --format="%H" -n 1)

# Loki annule le commit de Fury pour cacher l'info
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git revert --no-edit $FURY_COMMIT_HASH

# Loki supprime la branche Wasteland pour effacer les traces
GIT_AUTHOR_NAME="Loki" GIT_AUTHOR_EMAIL="loki@asgard.mischief" git reset --hard HEAD~0 # Simule une action qui fait perdre la référence directe
git branch -D Wasteland-2149

# --- ÉTAPE 2 (préparation) : Les univers à fusionner et le conflit ---

# On note le commit actuel de Universe-616 pour la suite
MAIN_BRANCH_HASH=$(git rev-parse HEAD)

# Création de la branche Tech-Arcane-928
git branch Tech-Arcane-928 $MAIN_BRANCH_HASH

# Création de la branche Magic-Realm-838
git branch Magic-Realm-838 $MAIN_BRANCH_HASH

# Sur Tech-Arcane-928, on ajoute les fichiers de Stark et le décodeur
git switch Tech-Arcane-928
echo "Fragment de code Alpha : LOKI_" > stark_blueprints.txt
echo "Ceci est un leurre de Loki." > agamoto_spells.txt
cat << EOF > decoder.md
# Décodeur Temporel

Analyse en cours... Fragment de code détecté.
Source : Stark Industries, Univers Tech-Arcane-928.

**AVERTISSEMENT :** Le fragment est incomplet. La clé de déchiffrement est instable.
**Recommandation :** Synchroniser cet univers avec sa contrepartie purement magique, le \`Magic-Realm-838\`, pour stabiliser et compléter le code.
EOF
git add .
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Stockage des schémas techno-magiques"

# Sur Magic-Realm-838, on ajoute le sort qui va créer le conflit
git switch Magic-Realm-838
echo "Fragment de code Bêta : IS_A_LIAR" > agamoto_spells.txt
cat << EOF > post_merge_clue.md
# Synchronisation terminée

Le code assemblé "LOKI_IS_A_LIAR" est une clé de vérité.

Retournez dans l'univers principal \`Universe-616\`. Un message crucial y a été laissé par l'agent Fury, mais Loki l'a effacé en annulant l'action de Fury. Votre mission : trouvez l'annulation de Loki et annulez-la à votre tour pour restaurer la vérité.
EOF
git add .
GIT_AUTHOR_NAME="Dr. Strange" GIT_AUTHOR_EMAIL="strange@kamar-taj.net" git commit -m "Préparation d'un sort de vérité et d'une instruction"

# --- Finalisation ---

git switch Universe-616

echo ""
echo "Le multivers a été généré avec succès dans le dossier '$PROJECT_DIR'."
echo "La mission peut commencer."

