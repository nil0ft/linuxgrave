import { headstone, ground } from './stone.js'

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )

const link = ({ label, href }) => `<a href="${esc(href)}">${esc(label)}</a>`

export function renderIndex(graves) {
  const rows = graves
    .map(
      (g) => `
        <tr>
          <td><a href="#${esc(g.slug)}">${esc(g.name)}/</a></td>
          <td>${esc(g.born)}</td>
          <td>${esc(g.buried)}</td>
          <td>${esc(g.cause)}</td>
        </tr>`,
    )
    .join('')

  return `
    <div class="listing">
      <table>
        <thead>
          <tr><th>Name</th><th>Born</th><th>Buried</th><th>Cause of death</th></tr>
        </thead>
        <tbody>${rows}
        </tbody>
      </table>
    </div>`
}

function renderPlot(g) {
  const label = `Headstone: ${g.name}, ${g.born} - ${g.buried}. ${g.epitaph.join(' ')}.`

  return `
    <section class="plot" id="${esc(g.slug)}" data-slug="${esc(g.slug)}">
      <h2>/graves/${esc(g.slug)}/</h2>
      <pre role="img" aria-label="${esc(label)}">${esc(headstone(g))}
<span data-ground>${esc(ground())}</span></pre>
      <dl>
        <dt>cause of death</dt><dd>${esc(g.cause)}</dd>
        <dt>survived by</dt><dd>${esc(g.survivedBy)}</dd>
        <dt>last seen</dt><dd>${link(g.lastSeen)}</dd>
        <dt>obituary</dt><dd>${link(g.obituary)}</dd>
      </dl>
    </section>`
}

export function renderPlots(graves) {
  return graves.map(renderPlot).join('')
}
