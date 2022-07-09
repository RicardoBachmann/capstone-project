import {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapLayer({latitude, longitude, name}) {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="68.6066" y1="68.6066" x2="47.3934" y2="47.3934" stroke="#3AD713" />
        <line x1="68.6066" y1="47.3934" x2="47.3934" y2="68.6066" stroke="#3AD713" />
        <circle cx="58" cy="58" r="27.5" stroke="#3AD713" />
      </svg>
    </Marker>
  );
}
