import Map, { Layer, Source } from "react-map-gl/mapbox";
import { useState } from "react";

import type { FeatureCollection } from "geojson";

import "mapbox-gl/dist/mapbox-gl.css";

interface ViewData {
  longitude: number;
  latitude: number;
  zoom: number;
}

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [174.76, -36.85] },
      properties: null,
    },
  ],
};

function WorldMap() {
  const [viewState, setViewState] = useState<ViewData>({
    longitude: 174.76,
    latitude: -36.85,
    zoom: 1,
  });

  return (
    <Map
      {...viewState}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onMove={(event) => setViewState(event.viewState)}
      style={{ width: 600, height: 400 }}
      mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
    >
      <Source id="data" type="geojson" data={geojson}>
        <Layer
          id="layer"
          type="symbol"
          layout={{
            "text-field": ".",
            "icon-optional": true,
            "symbol-z-elevate": true,
            "symbol-elevation-reference": "sea",
          }}
          paint={{
            "text-emissive-strength": 1,
            "text-color": "#fcba03",
            "symbol-z-offset": 1000000,
          }}
        />
      </Source>
    </Map>
  );
}

export default WorldMap;
