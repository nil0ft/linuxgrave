import { ground, flowerSpots } from './stone.js'

const spots = flowerSpots()
const key = (slug) => `linuxgrave:flowers:${slug}`

function load(slug) {
  try {
    return Number(localStorage.getItem(key(slug))) || 0
  } catch {
    return 0
  }
}

function save(slug, count) {
  try {
    localStorage.setItem(key(slug), String(count))
  } catch {}
}

function draw(plot, count) {
  const laid = new Set(spots.slice(0, count))
  const row = plot.querySelector('[data-ground]')
  row.replaceChildren(
    ...[...ground()].map((grass, i) => {
      if (!laid.has(i)) return grass
      const flower = document.createElement('span')
      flower.className = 'flower'
      flower.textContent = '@'
      return flower
    }),
  )

  plot.querySelector('[data-laid]').textContent =
    count >= spots.length
      ? 'the grave is covered in flowers.'
      : count > 0
        ? `you laid ${count} flower${count === 1 ? '' : 's'}.`
        : ''
}

function payRespects(plot) {
  const count = Math.min(load(plot.dataset.slug) + 1, spots.length)
  save(plot.dataset.slug, count)
  draw(plot, count)
}

const plots = [...document.querySelectorAll('.plot')]

for (const plot of plots) {
  plot.querySelector('.respects').hidden = false
  plot.querySelector('.respects button').addEventListener('click', () => payRespects(plot))
  draw(plot, load(plot.dataset.slug))
}

function nearestPlot() {
  const middle = window.innerHeight / 2
  let best = null
  let bestDistance = Infinity
  for (const plot of plots) {
    const box = plot.getBoundingClientRect()
    const distance = Math.abs(box.top + box.height / 2 - middle)
    if (distance < bestDistance) {
      best = plot
      bestDistance = distance
    }
  }
  return best
}

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() !== 'f' || event.repeat) return
  if (event.ctrlKey || event.metaKey || event.altKey) return
  if (event.target.closest('input, textarea, select, [contenteditable]')) return
  const plot = nearestPlot()
  if (plot) payRespects(plot)
})
