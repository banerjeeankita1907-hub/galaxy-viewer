// Rounded, illustrative heliocentric elements for an educational visualization.
// They are not a high-precision ephemeris or suitable for navigation.
export const PLANETS = [
  {
    name: "Mercury", color: 0xaaa6a0, radius: 0.32,
    elements: { semiMajorAxisAU: 0.3871, eccentricity: 0.2056, inclinationDeg: 7.005, longitudeAscendingNodeDeg: 48.331, argumentPeriapsisDeg: 29.125, meanAnomalyAtEpochDeg: 174.796, periodDays: 87.969 },
  },
  {
    name: "Venus", color: 0xe6c28b, radius: 0.58,
    elements: { semiMajorAxisAU: 0.7233, eccentricity: 0.0068, inclinationDeg: 3.394, longitudeAscendingNodeDeg: 76.680, argumentPeriapsisDeg: 54.884, meanAnomalyAtEpochDeg: 50.115, periodDays: 224.701 },
  },
  {
    name: "Earth", color: 0x3889d8, radius: 0.62,
    elements: { semiMajorAxisAU: 1.0000, eccentricity: 0.0167, inclinationDeg: 0.000, longitudeAscendingNodeDeg: -11.260, argumentPeriapsisDeg: 114.208, meanAnomalyAtEpochDeg: 358.617, periodDays: 365.256 },
  },
  {
    name: "Mars", color: 0xc96e4a, radius: 0.43,
    elements: { semiMajorAxisAU: 1.5237, eccentricity: 0.0934, inclinationDeg: 1.850, longitudeAscendingNodeDeg: 49.558, argumentPeriapsisDeg: 286.502, meanAnomalyAtEpochDeg: 19.373, periodDays: 686.980 },
  },
  {
    name: "Jupiter", color: 0xd8b28e, radius: 1.25,
    elements: { semiMajorAxisAU: 5.2028, eccentricity: 0.0489, inclinationDeg: 1.303, longitudeAscendingNodeDeg: 100.464, argumentPeriapsisDeg: 273.867, meanAnomalyAtEpochDeg: 20.020, periodDays: 4332.59 },
  },
  {
    name: "Saturn", color: 0xe8d7a7, radius: 1.05, rings: true,
    elements: { semiMajorAxisAU: 9.5388, eccentricity: 0.0565, inclinationDeg: 2.485, longitudeAscendingNodeDeg: 113.665, argumentPeriapsisDeg: 339.392, meanAnomalyAtEpochDeg: 317.020, periodDays: 10759.2 },
  },
  {
    name: "Uranus", color: 0x8dd2db, radius: 0.83,
    elements: { semiMajorAxisAU: 19.1914, eccentricity: 0.0463, inclinationDeg: 0.773, longitudeAscendingNodeDeg: 74.006, argumentPeriapsisDeg: 96.998, meanAnomalyAtEpochDeg: 142.238, periodDays: 30688.5 },
  },
  {
    name: "Neptune", color: 0x5279d9, radius: 0.80,
    elements: { semiMajorAxisAU: 30.0611, eccentricity: 0.0095, inclinationDeg: 1.770, longitudeAscendingNodeDeg: 131.784, argumentPeriapsisDeg: 273.187, meanAnomalyAtEpochDeg: 256.228, periodDays: 60182.0 },
  },
];

export const EPOCH_LABEL = "J2000.0";
export const EPOCH_UTC = "2000-01-01T12:00:00.000Z";
