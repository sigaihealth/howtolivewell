# Deploy livewell.sig.ai

The public source repository is `https://github.com/sigaihealth/howtolivewell`.
The English page is `/`; the Spanish page is `/es/`. The application is static:
no account, database, server-side code, or runtime secrets are needed.

## Fleet path

1. Check that the reviewed source is committed and pushed to the public GitHub
   repository. Clone or fast-forward it to `/home/yonghuang/howtolivewell` on
   `sigdev2`. Do not overwrite local changes on the server.
2. On `sigdev2`, run `docker compose up -d --build` in that directory. The Compose
   service publishes container port 8080 to `192.168.68.85:3640` by default;
   check that this port is free immediately before deployment.
3. Check `docker compose ps` and fetch both
   `http://192.168.68.85:3640/` and `http://192.168.68.85:3640/es/`.
   Fetch `/style.css`, `/app.js`, and `/favicon.svg` as well.
4. On `sigdev1`, install `deploy/livewell.sig.ai.nginx` as the real file
   `/etc/nginx/sites-enabled/livewell.sig.ai`. Run `sudo nginx -t` before
   `sudo systemctl reload nginx`. The vhost reuses the existing `*.sig.ai`
   Cloudflare origin certificate and proxies to `sigdev2:3640`.
5. Precheck the edge from the LAN with
   `curl -k --resolve livewell.sig.ai:443:192.168.71.200 https://livewell.sig.ai/`.
   This direct origin check uses `-k` because the Cloudflare origin certificate
   is trusted by Cloudflare, not by a regular browser.
6. In the `sig.ai` Cloudflare zone, create a **proxied** CNAME for
   `livewell.sig.ai` pointing to `home.sig.ai` (automatic TTL). The configured
   Cloudflare credential is on `sigdev2` in `~/.cloudflare-ddns.env`; do not
   commit, print, or copy its value. Check for an existing/conflicting record
   before creating one.
7. Verify public `https://livewell.sig.ai/` and
   `https://livewell.sig.ai/es/` with normal TLS validation and HTTP 200, both
   language switches, and `X-SIGAI-Hosting: sigdev2`. Confirm authoritative DNS
   and that GitHub reports the repository as public.

## Standby and updates

The static image has no mutable application data. Add `howtolivewell` to the
static-site Compose directory list in the fleet-ops `stage-refresh.sh`, stage
its image and Compose file on `t20`, and verify the new edge vhost reaches t20
through its enabled `proxy-standby-sync.timer`. The Compose port binds the
sigdev2 LAN address by default. On t20, keep a local untracked `.env` with
`LIVEWELL_BIND_IP=192.168.68.81` so the same Compose service starts on the
standby address during promotion. Check the actual failover runbook before
relying on standby coverage.

For an update, fast-forward the server checkout to the reviewed Git commit,
run `docker compose up -d --build`, verify both languages, and stage the new
image on t20. The `.dockerignore` is a public-file allowlist; add any new public
assets there before deploying them.
