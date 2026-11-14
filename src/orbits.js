export const TAU = 2 * Math.PI;

function assertFinite(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be finite`);
  }
}

/** Solve Kepler's equation M = E - e sin(E) for an elliptical orbit. */
export function solveKepler(meanAnomalyRad, eccentricity, tolerance = 1e-12, maxIterations = 32) {
  assertFinite(meanAnomalyRad, "meanAnomalyRad");
  assertFinite(eccentricity, "eccentricity");
  if (eccentricity < 0 || eccentricity >= 1) {
    throw new RangeError("eccentricity must be in [0, 1)");
  }
  if (!(tolerance > 0) || !Number.isInteger(maxIterations) || maxIterations < 1) {
    throw new RangeError("tolerance and maxIterations must be positive");
  }

  const meanAnomaly = ((meanAnomalyRad % TAU) + TAU) % TAU;
  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const residual = eccentricAnomaly
      - eccentricity * Math.sin(eccentricAnomaly)
      - meanAnomaly;
    const derivative = 1 - eccentricity * Math.cos(eccentricAnomaly);
    const step = residual / derivative;
    eccentricAnomaly -= step;
    if (Math.abs(step) <= tolerance) {
      return eccentricAnomaly;
    }
  }

  throw new Error("Kepler solver did not converge within maxIterations");
}

/**
 * Return a heliocentric position in ecliptic Cartesian AU coordinates.
 *
 * elements: { semiMajorAxisAU, eccentricity, inclinationDeg,
 * longitudeAscendingNodeDeg, argumentPeriapsisDeg,
 * meanAnomalyAtEpochDeg, periodDays }
 */
export function positionAtDays(elements, daysSinceEpoch) {
  assertFinite(daysSinceEpoch, "daysSinceEpoch");
  const {
    semiMajorAxisAU: a,
    eccentricity: e,
    inclinationDeg,
    longitudeAscendingNodeDeg,
    argumentPeriapsisDeg,
    meanAnomalyAtEpochDeg,
    periodDays,
  } = elements;

  for (const [name, value] of Object.entries({
    semiMajorAxisAU: a,
    eccentricity: e,
    inclinationDeg,
    longitudeAscendingNodeDeg,
    argumentPeriapsisDeg,
    meanAnomalyAtEpochDeg,
    periodDays,
  })) {
    assertFinite(value, name);
  }
  if (a <= 0 || periodDays <= 0 || e < 0 || e >= 1) {
    throw new RangeError("a and periodDays must be positive; eccentricity must be in [0, 1)");
  }

  const degreesToRadians = Math.PI / 180;
  const meanAnomaly = meanAnomalyAtEpochDeg * degreesToRadians
    + TAU * daysSinceEpoch / periodDays;
  const eccentricAnomaly = solveKepler(meanAnomaly, e);
  const xOrbital = a * (Math.cos(eccentricAnomaly) - e);
  const yOrbital = a * Math.sqrt(1 - e * e) * Math.sin(eccentricAnomaly);

  const inclination = inclinationDeg * degreesToRadians;
  const node = longitudeAscendingNodeDeg * degreesToRadians;
  const periapsis = argumentPeriapsisDeg * degreesToRadians;
  const cosNode = Math.cos(node);
  const sinNode = Math.sin(node);
  const cosPeriapsis = Math.cos(periapsis);
  const sinPeriapsis = Math.sin(periapsis);
  const cosInclination = Math.cos(inclination);
  const sinInclination = Math.sin(inclination);

  const x = (cosNode * cosPeriapsis - sinNode * sinPeriapsis * cosInclination) * xOrbital
    + (-cosNode * sinPeriapsis - sinNode * cosPeriapsis * cosInclination) * yOrbital;
  const y = (sinNode * cosPeriapsis + cosNode * sinPeriapsis * cosInclination) * xOrbital
    + (-sinNode * sinPeriapsis + cosNode * cosPeriapsis * cosInclination) * yOrbital;
  const z = sinPeriapsis * sinInclination * xOrbital
    + cosPeriapsis * sinInclination * yOrbital;
  const radiusAU = a * (1 - e * Math.cos(eccentricAnomaly));

  return { x, y, z, radiusAU, eccentricAnomalyRad: eccentricAnomaly };
}

/** Compress large AU distances for a readable, explicitly non-scale scene. */
export function sceneDistance(semiMajorAxisAU, scale = 5) {
  assertFinite(semiMajorAxisAU, "semiMajorAxisAU");
  assertFinite(scale, "scale");
  if (semiMajorAxisAU <= 0 || scale <= 0) {
    throw new RangeError("semiMajorAxisAU and scale must be positive");
  }
  return scale * Math.sqrt(semiMajorAxisAU);
}
