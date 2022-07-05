import MapContainer, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

export default function MapLayer({latitude, longitude}) {
  return (
    <>
      <MapContainer
        initialViewState={{
          longitude: -83.0475,
          latitude: 42.3316,
          zoom: 8,
        }}
        style={{width: window.innerWidth, height: window.innerHeight, position: 'absolute'}}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
      >
        <Marker>
          {latitude} {longitude}
        </Marker>
      </MapContainer>
    </>
  );
}
