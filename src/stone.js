const INNER = 21
const INDENT = 4
const WIDTH = INDENT * 2 + INNER + 2

function center(text, width) {
  const left = Math.floor((width - text.length) / 2)
  return ' '.repeat(left) + text + ' '.repeat(width - text.length - left)
}

function wrap(text, max) {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line)
      line = word
    } else {
      line = line ? line + ' ' + word : word
    }
  }
  if (line) lines.push(line)
  return lines
}

export function headstone({ name, born, buried, epitaph }) {
  const fit = (text) => wrap(text, INNER - 2)
  const face = [
    '',
    'R . I . P .',
    '',
    ...fit(name.toUpperCase()),
    '',
    `${born} - ${buried}`,
    '',
    ...epitaph.flatMap(fit),
    '',
  ]

  return [
    ' '.repeat(INDENT + 4) + '_'.repeat(INNER - 6),
    ' '.repeat(INDENT + 2) + ".'" + ' '.repeat(INNER - 6) + "'.",
    ' '.repeat(INDENT + 1) + '/' + ' '.repeat(INNER - 2) + '\\',
    ...face.map((line) => ' '.repeat(INDENT) + '|' + center(line, INNER) + '|'),
    ' '.repeat(INDENT - 2) + '__|' + '_'.repeat(INNER) + '|__',
  ]
    .map((line) => line.trimEnd())
    .join('\n')
}

export function ground() {
  return '"'.repeat(WIDTH)
}
