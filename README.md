# What the Soil Remembers 

A personal satellite archaeology project — looking for buried sites from orbit, starting with Dholavira.

🔗 **Live site:** https://manunibhavsar.github.io/satellite-archaeology/

This is a curiosity-driven experiment, not a professional survey. It grew out of a fascination with the idea (inspired by Albert Lin's work) that you can look for traces of buried archaeology without ever picking up a shovel — just by reading how the ground and the vegetation above it behave in satellite imagery.

## What it does

Using **Google Earth Engine** and free **Sentinel-2** imagery, it analyses the landscape around **Dholavira**, a Harappan city in the Rann of Kutch, Gujarat, and surfaces spots where the spectral signal breaks pattern near the known site.

The result is a small interactive atlas: a map you can explore, plus the history of the site. It's built to grow — more regions can be added over time.

## Method (in brief)

- Sentinel-2 SR dry-season imagery (Nov 2023 – Mar 2024), cloud-filtered and composited
- Three spectral indices computed: **NDVI**, **NDWI**, and a **soil index**
- Local anomaly detection: **z-score > 2σ** against a neighbourhood mean
- Confound filtering with **ESA WorldCover** to exclude cropland, water and built-up ground
- Candidates retained: clustered features (10+ pixels) within 3 km of the known site

## Honest limits

- **These are candidates, not discoveries.** Remote sensing can say "maybe look here" — it can't confirm anything. Only ground investigation could do that.
- I'm still learning. This is where the project is right now, not a finished claim.
- Historical facts are sourced from **UNESCO** and the **Archaeological Survey of India**. The analysis is my own, with its limits stated openly.

## Built with

Vanilla HTML / CSS / JavaScript · [Leaflet](https://leafletjs.com/) · Esri World Imagery basemap · Google Earth Engine (analysis) · Sentinel-2 (data)

## Structure

```
index.html      home — the idea and the method
map.html        interactive survey map (the living atlas)
history.html    the history of Dholavira
style.css       shared styles
map.js          map logic + region switching
data.js         region data (add a region = add a key)
```

---

Made by Manuni Bhavsar · [LinkedIn](https://www.linkedin.com/in/manuni-b-877329381)
