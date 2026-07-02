/* ============================================================
   Satellite Archaeology — map logic
   Depends on: Leaflet, data.js (REGIONS, DEFAULT_REGION)
   ------------------------------------------------------------
   One map, many regions. The selector switches the active
   region; the map flies to it and its markers are rebuilt.
   ============================================================ */

// --- Initialise the map on the default region ---
const startRegion = REGIONS[DEFAULT_REGION];
const map = L.map('map', {
  center: startRegion.center,
  zoom: startRegion.zoom,
  zoomControl: true
});

// --- Base layer: satellite imagery (Esri World Imagery, free) ---
L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Imagery © Esri · Analysis: Sentinel-2 / Google Earth Engine',
    maxZoom: 18
  }
).addTo(map);

// A layer group we clear and refill whenever the region changes.
const markerLayer = L.layerGroup().addTo(map);

// --- Popups ------------------------------------------------
function sitePopup(s) {
  return `
    <div class="popup-title">${s.name}</div>
    <div class="popup-tag site">Documented site</div>
    <div class="popup-row"><span>Culture</span><span>${s.culture}</span></div>
    <div class="popup-row"><span>Period</span><span>${s.period}</span></div>
    <div class="popup-row"><span>Status</span><span>${s.status}</span></div>
    <div class="popup-row"><span>Location</span><span>${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}</span></div>
  `;
}

function candidatePopup(c, index, distLabel) {
  return `
    <div class="popup-title">Candidate ${String(index + 1).padStart(2, '0')}</div>
    <div class="popup-tag candidate">Unverified anomaly</div>
    <div class="popup-row"><span>${distLabel}</span><span>${c.dist_km} km</span></div>
    <div class="popup-row"><span>Extent</span><span>${c.pixels} px · ~${c.area_m2.toLocaleString()} m²</span></div>
    <div class="popup-row"><span>Location</span><span>${c.lat.toFixed(4)}, ${c.lon.toFixed(4)}</span></div>
    <div class="popup-note">Flagged as a local spectral anomaly (z-score &gt; 2σ) in Sentinel-2 dry-season imagery, after filtering out cropland, water and built-up ground. Requires ground investigation — not a confirmed feature.</div>
  `;
}

// --- Draw one region's markers ------------------------------
function drawRegion(id, opts) {
  const r = REGIONS[id];
  if (!r) return;
  opts = opts || {};

  markerLayer.clearLayers();

  // Candidates (terracotta)
  r.candidates.forEach((c, i) => {
    L.circleMarker([c.lat, c.lon], {
      radius: 6 + Math.min(c.pixels / 6, 8),
      color: '#c0392b',
      weight: 1.5,
      fillColor: '#c0392b',
      fillOpacity: 0.55
    })
      .bindPopup(candidatePopup(c, i, r.distLabel || 'Distance'))
      .addTo(markerLayer);
  });

  // Known sites on top (satellite blue)
  r.knownSites.forEach((s) => {
    L.circleMarker([s.lat, s.lon], {
      radius: 9,
      color: '#ffffff',
      weight: 2,
      fillColor: '#2e6e9e',
      fillOpacity: 0.95
    })
      .bindPopup(sitePopup(s))
      .addTo(markerLayer);
  });

  // Update the side-panel candidate count + region title/blurb
  const countEl = document.getElementById('stat-candidates');
  if (countEl) countEl.textContent = r.candidates.length;
  const titleEl = document.getElementById('region-title');
  if (titleEl) titleEl.textContent = r.label + ' Anomaly Survey';
  const blurbEl = document.getElementById('region-blurb');
  if (blurbEl) blurbEl.textContent = r.blurb;

  // Move the view. On first load: snap. On switch: smooth flyTo.
  const bounds = L.latLngBounds(
    [...r.knownSites.map(s => [s.lat, s.lon]),
     ...r.candidates.map(c => [c.lat, c.lon])]
  );
  if (opts.fly) {
    map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 15, duration: 2.2 });
  } else {
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
  }
}

// --- Region selector (dropdown) -----------------------------
function buildSelector() {
  const sel = document.getElementById('region-select');
  if (!sel) return;
  sel.innerHTML = '';
  Object.keys(REGIONS).forEach((id) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = REGIONS[id].label;
    sel.appendChild(opt);
  });
  sel.value = DEFAULT_REGION;
  sel.addEventListener('change', function () {
    drawRegion(this.value, { fly: true });
  });
}

// --- Boot ---------------------------------------------------
buildSelector();
drawRegion(DEFAULT_REGION, { fly: false });
