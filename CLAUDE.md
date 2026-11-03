# Morea Evidence Pack — Project Context for Claude Code

## What this is
Non-commercial learning demo (**Morea Evidence Pack**) for EU AI Act Article 4 literacy + exportable evidence practice, for European SME / small professional-firm contexts. Built by Henrique (Espoo, Finland). **Not a company SaaS product**. GRYPS remains the hiring lead; Morea is a secondary tryable skill demo.

**Local folder / GitHub:** `morea` (`hqemoreira/morea`).

## Public posture
- Required line (hero once + footer once): Personal reskilling project · Non-commercial · Not a product for sale · No accounts / no billing
- Indexing: public educational pages **open** (like GRYPS). Keep `noindex` only on `login.html` / `signup.html` / `workspace.html`
- Framing: illustrative Evidence Pack — not pricing, Offer schema, or “get compliant”
- Article 4 (Omnibus mid-2026): providers/deployers shall take measures to **support development** of AI literacy; does **not** require guaranteeing any individual’s literacy level. In force since 2 Feb 2025. Never sell legal advice.

## Core thesis
**The demo object is the Evidence Pack.** Inventory + literacy + quiz + optional policy + SHA-256 `MOREA-…` code. Brand mark: evolved mulberry leaf + evidence check (static primary; subtle hover only).

## Live URL
- **https://morea-pack.vercel.app**
- Note: `morea.vercel.app` is unrelated (third-party). Deploy: morea-pack.vercel.app.

## Current flow
1. Landing
2. Inventory (`inventory.html`) — localStorage progress
3. Exposure intake (`assess.html`)
4. Role-aware module — `staff` | `partner_ops`
5. Track-matched quiz
6. Optional policy (`policy.html`)
7. Evidence Pack (`register.html`) — JSON + print
8. Verify — local JSON hash + optional demo code

Persistence: `MoreaStore` → `localStorage` (`morea_*`) with session/legacy fallbacks. Stepper: `js/stepper.js`.

## Stack
Plain HTML/JS, Vercel, Mistral `mistral-small-latest`, env `MISTRAL_API_KEY`. Optional Neon.

## Design
IBM Plex; paper-and-ink dossier. Favicon/wordmark: mulberry leaf + check.

## Do not
- Restore public pricing / Buy / subscribe / waitlist
- Claim compliance or conformity assessment
- Use EU circle of stars in branding
