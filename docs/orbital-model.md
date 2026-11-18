# Orbital model and numerical method

## Keplerian approximation

Each planet is represented by a fixed set of approximate heliocentric
elliptical-orbit elements: semi-major axis a, eccentricity e, inclination i,
longitude of ascending node Ω, argument of periapsis ω, mean anomaly at epoch
M0 and orbital period P.

For elapsed time t (days), the mean anomaly is

    M(t) = M0 + 2π t / P

Kepler's equation is solved with a safeguarded Newton method. The solver keeps\na [0, 2π] bracket (the residual is strictly increasing for elliptical orbits),\nuses a Newton step only when it remains inside the bracket, and otherwise\nfalls back to bisection. It terminates on a residual or bracket-width tolerance:

    M = E - e sin(E)

The coordinates in the orbital plane are

    x' = a (cos(E) - e)
    y' = a sqrt(1 - e²) sin(E)

A rotation by ω, i and Ω maps the orbital-plane coordinates into heliocentric
ecliptic Cartesian coordinates. Distances returned by the pure model are in AU.

## Rendering choices

The 3D scene applies a square-root radial compression to semi-major axes so
outer planets fit on screen. Planet radii are also visually exaggerated. Orbit
shape and orientation are retained, but the displayed distances and apparent
sizes are **not to scale**. The display is an explanatory visualization.

The initial orbital parameters are rounded illustrative values associated with
a J2000-like epoch. They are not a precision ephemeris. The model omits
interplanetary perturbations, moons, relativistic corrections, light-time,
precession, spacecraft and observational uncertainty. It must not be used for
navigation, conjunction prediction or scientific measurement.

## Numerical validation

The Node test suite checks:
- residuals of Kepler's equation over circular, highly eccentric and wrapped-angle cases;\n- convergence near the parabolic limit and explicit iteration-exhaustion behavior;
- constant radius and periodicity for a circular test orbit;
- periapsis/apoapsis bounds for an eccentric orbit;
- finite positions for all configured planets;
- rejection of invalid orbital parameters.

Passing these tests verifies the implementation invariants, not the accuracy
of the approximate element table against a modern ephemeris. A research-grade
extension should source versioned state vectors or osculating elements, record
the reference frame and epoch, and compare results against an independent JPL
ephemeris over a held-out date range.
