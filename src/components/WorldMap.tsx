import Map from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

function WorldMap() {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default WorldMap;
