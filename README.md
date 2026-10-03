# Live Well, Here · Vive bien, aquí

A free, bilingual guide to practical next steps for life in the United States. The
public site is at [livewell.sig.ai](https://livewell.sig.ai/) in English and
[livewell.sig.ai/es/](https://livewell.sig.ai/es/) in Spanish.

This is a curated starting point, not a checklist that everyone should finish.
It covers safety, health, money, support, home, work, connection, family care,
digital safety, and everyday rights. Each of the 121 action cards pairs a brief
reason with a doable first step and at least one public source. Six short
starting paths connect related steps across topics. Cards avoid promising eligibility or giving personal medical,
legal, or financial advice. Rules and services can vary by state and change over
time.

The interactive home pages are paired with ten complete, crawlable topic guides
in each language. Every topic guide contains its actions and source links in
the HTML, so readers and crawlers can use it without JavaScript. The
[editorial-method page](https://livewell.sig.ai/editorial/) explains who
publishes the guide, how sources are chosen, and how to request a correction.

## Why this version exists

The [How to Live Better](https://cdyforever.github.io/how-to-live-better/) reader
inspired the idea of making a large amount of practical guidance easy to browse.
Its Chinese services, laws, and health claims do not translate directly to U.S.
life. This project uses original English and Spanish writing and U.S.-relevant
sources, with a curated collection and situation-based starting paths. No text was copied
from the reference. The reference's upstream source is licensed
[CC BY 4.0](https://github.com/eternity4719/HowToLiveBetter/blob/main/LICENSE).

## Use locally

The site has no build step. Run a static server from the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` or `http://localhost:8000/es/`. The files also
serve directly through the included Nginx container:

```sh
LIVEWELL_BIND_IP=127.0.0.1 docker compose up --build
```

The default Compose port binding is the SIG.AI `sigdev2` LAN address. The
`LIVEWELL_BIND_IP` variable changes the bind address for local use or standby.

Check content structure, translation fields, source references, and path IDs:

```sh
node scripts/check-content.mjs
```

After changing actions, sources, or topic introductions, rebuild the static
topic pages and sitemap, then check crawlable HTML and language links:

```sh
node scripts/build-guides.mjs
node scripts/build-sitemap.mjs
node scripts/check-seo.mjs
```

The sitemap builder's `lastModified` date is changed only for substantive page
updates. Commit generated pages with their source changes.

## How the guide works

- `index.html` and `es/index.html` contain the two independently written page
  shells, language metadata, resource links, and ordinary links to all topic
  guides.
- `content.js` contains the original launch cards and all ten categories.
  `expansion-family.js`, `expansion-rights.js`, and `expansion-lifecourse.js`
  add bilingual cards and source URLs. Each action has a stable `id` used in
  both languages and shareable `#` links. `pathways.js` connects selected
  actions into six short starting paths.
- `app.js` provides search, topic/time filters, saved steps, theme switching,
  situation paths, and source disclosures. Saved IDs and the theme live in the browser's local
  storage. There is no account, database, or site-owned analytics code.
  Cloudflare delivers the public site and may add its own traffic measurement
  script; the design also loads fonts from Google Fonts. Saved step IDs are not
  sent to either service.
- `style.css` provides responsive layout, keyboard focus styles, contrast-aware
  light/dark themes, reduced-motion support, and print rules.
- `scripts/guide-metadata.mjs` holds the topic introductions and EN/ES URL map.
  `scripts/build-guides.mjs` renders the HTML under `topics/` and `es/temas/`.
  `guide.css` styles those pages and the editorial-method pages.
- `scripts/build-sitemap.mjs` produces `sitemap.xml` with reciprocal language
  alternatives. `scripts/check-seo.mjs` verifies the generated cards, language
  links, canonical URLs, sitemap entries, and homepage links.

To add an action, use a stable unique ID and fill in the `en` and `es` fields
with natural writing. Link the specific public page that supports the step, not
just an agency homepage. Prefer primary U.S. sources; describe state-specific
eligibility as a lookup rather than a universal promise. Check both languages
and the linked pages before publishing. Source links were checked in October
2026; they need periodic review because services and guidance can change.
When changing CSS or JavaScript, update its `?v=` token where it is referenced
so Cloudflare fetches the new static file immediately. Add new public files to
`.dockerignore`'s allowlist before building the Docker image.

This work makes content easier to discover and cite. It does not guarantee
search rankings, indexing, or citations in AI-generated answers. [Google's
current guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
says its AI search features use the ordinary Search foundation; no special GEO
schema or `llms.txt` is required for Google Search.

For deployment and failover notes, see [DEPLOYMENT.md](DEPLOYMENT.md).

## License

The original site code and original English and Spanish writing in this
repository are available under the [MIT License](LICENSE). Third-party pages
linked as sources retain their own licenses.
