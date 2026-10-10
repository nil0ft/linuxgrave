# linuxgrave

here lie the projects.

```
bun install
bun run dev     # local server
bun run build   # static site in dist/
```

## burying a project

Add an entry to `src/graves.js` and open a pull request. The page is rendered
to static HTML at build time, so no JavaScript is needed to read it. The only
script on the page is "press F to pay respects".
