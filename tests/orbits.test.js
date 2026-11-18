import test from "node:test";
import assert from "node:assert/strict";
import { TAU, positionAtDays, sceneDistance, solveKepler } from "../src/orbits.js";
import { PLANETS } from "../src/planet-data.js";

test("Kepler solver satisfies M = E - e sin(E)", () => {
  for (const eccentricity of [0, 0.0167, 0.2056, 0.8, 0.95]) {
    for (const meanAnomaly of [0, 0.4, 1.7, Math.PI, 5.8]) {
      const eccentricAnomaly = solveKepler(meanAnomaly, eccentricity);
      const wrappedMean = ((meanAnomaly % TAU) + TAU) % TAU;
      const recovered = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly);
      assert.ok(Math.abs(recovered - wrappedMean) < 1e-10);
    }
  }
});

test("safeguarded Kepler solver converges near the parabolic limit and across angle wraps", () => {
  for (const eccentricity of [0.9, 0.99, 0.999999]) {
    for (const meanAnomaly of [1e-12, 1e-8, 1e-4, Math.PI, TAU - 1e-8, -1e-8, 17.2]) {
      const eccentricAnomaly = solveKepler(meanAnomaly, eccentricity);
      const wrappedMean = ((meanAnomaly % TAU) + TAU) % TAU;
      const residual = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - wrappedMean;
      assert.ok(Math.abs(residual) < 1e-10, `residual ${residual} for e=${eccentricity}, M=${meanAnomaly}`);
    }
  }
});

test("Kepler solver rejects non-finite tolerances and reports iteration exhaustion", () => {
  assert.throws(() => solveKepler(1, 0.5, Number.POSITIVE_INFINITY), RangeError);
  assert.throws(() => solveKepler(1, 0.5, Number.NaN), RangeError);
  assert.throws(() => solveKepler(1, 0.9, 1e-15, 1), /did not converge/);
});

test("circular orbit has constant radius and repeats after one period", () => {
  const elements = {
    semiMajorAxisAU: 2,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeAscendingNodeDeg: 0,
    argumentPeriapsisDeg: 0,
    meanAnomalyAtEpochDeg: 0,
    periodDays: 100,
  };
  const start = positionAtDays(elements, 0);
  const quarter = positionAtDays(elements, 25);
  const repeat = positionAtDays(elements, 100);
  assert.ok(Math.abs(start.radiusAU - 2) < 1e-10);
  assert.ok(Math.abs(quarter.radiusAU - 2) < 1e-10);
  assert.ok(Math.abs(start.x - repeat.x) < 1e-10);
  assert.ok(Math.abs(start.y - repeat.y) < 1e-10);
});

test("elliptic radius stays between periapsis and apoapsis", () => {
  const planet = PLANETS.find((item) => item.name === "Mercury");
  for (let day = 0; day < planet.elements.periodDays; day += 2) {
    const state = positionAtDays(planet.elements, day);
    assert.ok(state.radiusAU >= planet.elements.semiMajorAxisAU * (1 - planet.elements.eccentricity) - 1e-10);
    assert.ok(state.radiusAU <= planet.elements.semiMajorAxisAU * (1 + planet.elements.eccentricity) + 1e-10);
  }
});

test("all planetary definitions produce finite positions", () => {
  for (const planet of PLANETS) {
    const state = positionAtDays(planet.elements, 1234.5);
    assert.ok([state.x, state.y, state.z, state.radiusAU].every(Number.isFinite));
  }
});

test("invalid orbital parameters and scene scales are rejected", () => {
  assert.throws(() => solveKepler(1, 1), RangeError);
  assert.throws(() => sceneDistance(0), RangeError);
  assert.throws(() => positionAtDays({ ...PLANETS[0].elements, periodDays: 0 }, 1), RangeError);
});

test("scene distance is monotonic with semi-major axis", () => {
  assert.ok(sceneDistance(30) > sceneDistance(1));
});
