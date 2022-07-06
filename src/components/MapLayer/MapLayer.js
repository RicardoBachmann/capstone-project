import {Marker} from 'react-map-gl';

export default function MapLayer({latitude, longitude, name}) {
  return (
    <>
      <Marker longitude={longitude} latitude={latitude} name={name} anchor="bottom">
    
      </Marker>
    </>
  );
}
