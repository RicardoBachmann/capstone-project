import MapContainer from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxAccessToken =
  'pk.eyJ1IjoiZGV0cm9pdDMxMyIsImEiOiJjbDUxMDVzNTQwMHlnM2RtYTA2cHZkaGs5In0.5E21FmuybbZTLegdNaRXvg';

export default function MapView() {
  return (
    <MapContainer
      initialViewState={{
        longitude: -83.0475,
        latitude: 42.3316,
        zoom: 8,
      }}
      style={{width: window.innerWidth, height: window.innerHeight, position: 'absolute'}}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={mapboxAccessToken}
    />
  );
}
