import { defineConfig } from 'vite'
import graves from './src/graves.js'
import { renderIndex, renderPlots } from './src/render.js'

export default defineConfig({
  plugins: [
    {
      name: 'linuxgrave-graves',
      transformIndexHtml: (html) =>
        html
          .replace('<!--graves:index-->', renderIndex(graves))
          .replace('<!--graves:plots-->', renderPlots(graves)),
    },
  ],
})
