# Morea Evidence Pack

Personal reskilling project · Non-commercial · Not a product for sale · No accounts / no billing.

Educational prototype for an EU AI Act **Article 4** literacy trail aimed at small European professional firms: inventory AI tools → exposure intake → role-aware module → quiz → optional policy draft → exportable **Evidence Pack**.

**Live:** [morea-pack.vercel.app](https://morea-pack.vercel.app) · **GitHub:** [hqemoreira/morea](https://github.com/hqemoreira/morea)  
**Not** a compliance service, legal advice, or commercial SaaS. GRYPS remains the hiring lead.

## Demo object

A dated, SHA-256-verified, exportable **Evidence Pack** (`MOREA-…` code) — educational / illustrative. About 15 minutes; progress saved in the browser.

Flow: inventory → assess → literacy module (Mistral + fallback) → quiz (staff or partner/ops) → policy (optional) → pack export / verify.

## Posture

- Public educational pages are indexable (like GRYPS); optional demo auth pages stay `noindex`
- Non-commercial research / skill demo — no pricing or billing
- Owner: create a Google Search Console property for `morea-pack.vercel.app` and paste verification meta if needed. Note: `morea.vercel.app` is owned by an unrelated third-party app — production host is **morea-pack.vercel.app**.

## Brand

Mulberry leaf + evidence check (Moreira / Morea heritage). No EU stars.

## Stack

- Plain HTML / JS on Vercel (no build step)
- Serverless functions · Mistral (`mistral-small-latest`)
- Optional Neon for demo register saves

## Docs

Project context for agents: [`CLAUDE.md`](./CLAUDE.md).

## License

Proprietary — see [`LICENSE`](./LICENSE). All rights reserved.
