import {useRef} from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapLayer() {
  const mapRef = useRef();
  const {REACT_APP_MAPBOX_TOKEN} = process.env;

  const initialViewState = {
    longitude: -83.0475,
    latitude: 42.3316,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  };

  return (
    <ReactMapGL
      ref={mapRef}
      initialViewState={initialViewState}
      style={{width: '100vw', height: '100vh'}}
      mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/detroit313/cl586y46z003l14pei3pj3bzx"
    ></ReactMapGL>
  );
}
