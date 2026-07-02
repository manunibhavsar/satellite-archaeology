/* ============================================================
   Satellite Archaeology — region data
   ------------------------------------------------------------
   Each region is one entry in REGIONS, keyed by a short id.
   To add a new survey area (e.g. Mahabalipuram), add a new key
   with the same shape — the map and the region selector pick it
   up automatically. Nothing else needs to change.

   Shape:
     id: {
       label:     display name in the selector
       blurb:     one-line description under the title
       center:    [lat, lon] the map flies to
       zoom:      target zoom on arrival
       knownSites:[ { name, lon, lat, culture, period, status } ]
       candidates:[ { lon, lat, pixels, dist_km, area_m2 } ]
       distLabel: what the candidate "distance" is measured to
     }
   ============================================================ */

const REGIONS = {
  dholavira: {
    label: "Dholavira",
    blurb: "Harappan city, Khadir Bet, Rann of Kutch — Gujarat",
    center: [23.8877, 70.2102],
    zoom: 14,
    distLabel: "Distance to Dholavira",
    knownSites: [
      {
        name: "Dholavira",
        lon: 70.2102, lat: 23.8877,
        culture: "Harappan / Indus Valley",
        period: "c. 3500–1450 BCE",
        status: "Excavated · UNESCO World Heritage Site"
      }
    ],
    candidates: [
      { lon: 70.21074, lat: 23.88575, pixels: 11, dist_km: 0.22, area_m2: 1100 },
      { lon: 70.2044,  lat: 23.88386, pixels: 14, dist_km: 0.73, area_m2: 1400 },
      { lon: 70.21976, lat: 23.88635, pixels: 10, dist_km: 0.98, area_m2: 1000 },
      { lon: 70.19586, lat: 23.88703, pixels: 13, dist_km: 1.46, area_m2: 1300 },
      { lon: 70.22428, lat: 23.89356, pixels: 19, dist_km: 1.57, area_m2: 1900 },
      { lon: 70.22762, lat: 23.88726, pixels: 15, dist_km: 1.77, area_m2: 1500 },
      { lon: 70.19244, lat: 23.88616, pixels: 17, dist_km: 1.81, area_m2: 1700 },
      { lon: 70.23079, lat: 23.88272, pixels: 11, dist_km: 2.17, area_m2: 1100 },
      { lon: 70.19265, lat: 23.89932, pixels: 28, dist_km: 2.2,  area_m2: 2800 },
      { lon: 70.22483, lat: 23.86924, pixels: 17, dist_km: 2.53, area_m2: 1700 }
    ]
  }

  // ── To add later, uncomment and fill in real data: ─────────
  // ,mahabalipuram: {
  //   label: "Mahabalipuram",
  //   blurb: "Coastal temple complex — Tamil Nadu",
  //   center: [12.6122, 80.1927],
  //   zoom: 15,
  //   distLabel: "Distance to Shore Temple",
  //   knownSites: [ /* ... */ ],
  //   candidates: [ /* ... */ ]
  // }
};

// The region shown on first load.
const DEFAULT_REGION = "dholavira";
