// Découpe une ligne de commande en segments étiquetés par rôle, pour la
// coloration syntaxique du composant <Terminal>.
// Rôles : program (1er token), subcommand (1er token non-flag après program),
// action (token non-flag suivant, seulement si subcommand ∈ SUBCOMMAND_WITH_ACTION),
// flag (commence par '-'), argument (le reste).
// Retourne [{ text, role }] — les séparateurs ont role: null, la concaténation
// des text redonne la commande d'origine (copie fidèle).

const SUBCOMMAND_WITH_ACTION = ['artisan', 'compose']

const TOKEN_RE = /"[^"]*"|'[^']*'|\S+/g

export function tokenizeCommand(cmd) {
  const parts = []
  const tokens = []
  let last = 0
  let m
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(cmd)) !== null) {
    if (m.index > last) parts.push({ text: cmd.slice(last, m.index), role: null })
    const token = { text: m[0], role: null }
    parts.push(token)
    tokens.push(token)
    last = m.index + m[0].length
  }
  if (last < cmd.length) parts.push({ text: cmd.slice(last), role: null })

  let state = 'program'
  for (const tok of tokens) {
    const isFlag = tok.text.startsWith('-')
    if (state === 'program') {
      tok.role = 'program'
      state = 'subcommand'
    } else if (state === 'subcommand') {
      if (isFlag) {
        tok.role = 'flag'
      } else {
        tok.role = 'subcommand'
        state = SUBCOMMAND_WITH_ACTION.includes(tok.text) ? 'action' : 'rest'
      }
    } else if (state === 'action') {
      if (isFlag) {
        tok.role = 'flag'
      } else {
        tok.role = 'action'
        state = 'rest'
      }
    } else {
      tok.role = isFlag ? 'flag' : 'argument'
    }
  }

  // Le « : » sépare les actions composées (make:migration, route:list,
  // migrate:fresh) — seulement dans les tokens action/subcommand formés de
  // deux mots autour d'un seul « : » (jamais dans les URL, arguments ni
  // chaînes entre guillemets).
  const expanded = []
  for (const part of parts) {
    if (
      (part.role === 'action' || part.role === 'subcommand') &&
      /^[^\s:/]+:[^\s:/]+$/.test(part.text)
    ) {
      const [before, after] = part.text.split(':')
      expanded.push({ text: before, role: part.role })
      expanded.push({ text: ':', role: 'separator' })
      expanded.push({ text: after, role: part.role })
    } else {
      expanded.push(part)
    }
  }
  return expanded
}

export const COMMAND_ROLES = ['program', 'subcommand', 'action', 'separator', 'flag', 'argument']

export const ROLE_LABELS = {
  program: 'commande',
  subcommand: 'sous-commande',
  action: 'action',
  separator: 'séparateur',
  flag: 'option',
  argument: 'argument',
}
