# Live Well, Here · Vive bien, aquí

A free, bilingual guide to practical next steps for life in the United States. The
public site is at [livewell.sig.ai](https://livewell.sig.ai/) in English and
[livewell.sig.ai/es/](https://livewell.sig.ai/es/) in Spanish.

This is a curated starting point, not a checklist that everyone should finish.
It covers safety, health, money, support, home, work, and connection. Each of the
52 action cards pairs a brief reason with a doable first step and at least one
public source. Cards avoid promising eligibility or giving personal medical,
legal, or financial advice. Rules and services can vary by state and change over
time.

## Why this version exists

The [How to Live Better](https://cdyforever.github.io/how-to-live-better/) reader
inspired the idea of making a large amount of practical guidance easy to browse.
Its Chinese services, laws, and health claims do not translate directly to U.S.
life. This project uses original English and Spanish writing and U.S.-relevant
sources, with a smaller launch collection for readability. No text was copied
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

## How the guide works

- `index.html` and `es/index.html` contain the two independently written page
  shells, language metadata, and resource links.
- `content.js` contains matched English and Spanish action cards, categories,
  and source URLs. Each action has a stable `id` used in both languages and
  shareable `#` links.
- `app.js` provides search, topic/time filters, saved steps, theme switching,
  and source disclosures. Saved IDs and the theme live in the browser's local
  storage. There is no account, database, or site-owned analytics code.
  Cloudflare delivers the public site and may add its own traffic measurement
  script; the design also loads fonts from Google Fonts. Saved step IDs are not
  sent to either service.
- `style.css` provides responsive layout, keyboard focus styles, contrast-aware
  light/dark themes, reduced-motion support, and print rules.

To add an action, use a stable unique ID and fill in the `en` and `es` fields
with natural writing. Link the specific public page that supports the step, not
just an agency homepage. Prefer primary U.S. sources; describe state-specific
eligibility as a lookup rather than a universal promise. Check both languages
and the linked pages before publishing. Source links were checked in October
2026; they need periodic review because services and guidance can change.
When changing CSS, JavaScript, or content, update the shared `?v=` asset token
in both HTML files and the `content.js` import in `app.js` so Cloudflare fetches
the new static files immediately.

For deployment and failover notes, see [DEPLOYMENT.md](DEPLOYMENT.md).

## License

The original site code and original English and Spanish writing in this
repository are available under the [MIT License](LICENSE). Third-party pages
linked as sources retain their own licenses.
