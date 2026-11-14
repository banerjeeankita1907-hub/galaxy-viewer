# Kepler Solar System Viewer

An interactive 3D solar-system visualization built with Three.js. The project
uses Kepler's equation and approximate heliocentric orbital elements to animate
Mercury through Neptune. It replaces arbitrary circular angular-speed
animations with a small, tested orbital-mechanics model.

## Features

- Newton solver for Kepler's equation.
- Elliptical heliocentric positions in ecliptic Cartesian AU coordinates.
- Orbital inclination, ascending node and periapsis orientation.
- Animated time control, pause/resume, epoch reset and orbit visibility toggle.
- Click-to-inspect planet name, modeled heliocentric distance and orbital period.
- Responsive layout, capped device pixel ratio and seeded starfield.
- Automated numerical tests using Node's built-in test runner.
- GitHub Pages deployment workflow for the static site.

## Run locally

Requires Node.js 18 or newer and a modern browser with WebGL.

```bash
npm test
npm run build
python -m http.server 8000 --directory dist
```

Open [http://localhost:8000](http://localhost:8000). The 3D library and
OrbitControls are loaded from the Three.js CDN, so the browser needs internet
access to load those modules. The orbital mathematics and tests have no
third-party npm dependencies.

## Controls

Drag to rotate the camera, scroll to zoom, click a planet to inspect it, adjust
simulation speed, pause or resume time, reset to the initial epoch, and toggle
orbital paths.

## Project structure

```text
index.html
src/
  orbits.js         # Kepler solver and orbital coordinate transform
  planet-data.js    # rounded illustrative orbital element table
tests/
  orbits.test.js    # Node test suite
docs/
  orbital-model.md  # equations, rendering choices and limitations
scripts/
  build.mjs         # static-site packaging
.github/workflows/
  ci.yml
  deploy.yml
```

## Scientific scope

The model is an educational two-body approximation, not a high-precision
ephemeris. The orbital element table is rounded and illustrative. The scene
compresses radial distances and exaggerates planet sizes to fit a screen.
Passing unit tests validates code invariants; it does not establish physical
accuracy against JPL data. See [docs/orbital-model.md](docs/orbital-model.md)
before using or citing this project.

## Deployment

Pushes to `main` run the tests and build a static `dist/` site. The Pages
workflow attempts to enable and deploy GitHub Pages using the repository's
Actions permissions. The deployed URL is reported by the GitHub Actions
deployment job when that run succeeds.

## License

No separate license file is currently provided. Ask before reusing or
redistributing this repository's code.
