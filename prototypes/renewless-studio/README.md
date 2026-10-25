# Renewless Design Studio

Buildless editable prototype. Open `dist/index.html` or serve `dist/` with a static HTTP server.

- `dist/app.js`: 41 named screens/states, shared demo interactions and per-version rendering.
- `dist/style.css`: approved theme plus separate `.baseline` and `.upgraded` styling.
- `dist/assets/`: self-contained public copies of brand images, Raleway and its license.

Baseline is reconstructed from reviewed Figma screens and product docs, not a pixel-exact Figma export. Upgraded is a comparison proposal, not a replacement of the locked app design. Both versions preserve the same product scope. No real authentication, purchases, AI, email, audio capture or uploads occur. Use fictional sample data only.

Changing a local file changes the local preview. Public updates require a new verified deployment to the same Site. Visitors can explore but cannot edit source. No backend or live app credentials belong here.

Publication is pending explicit push/deployment confirmation under the user's Git rules. Do not use a helper that automatically pushes before that approval. Never push to main.
