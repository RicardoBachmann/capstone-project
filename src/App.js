import {useState, useEffect, useCallback, useRef} from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './components/Header/Header';
import MarkerLayer from './components/MarkerLayer/MarkerLayer';
import ParticipantCard from './components/Participant/ParticipantCard';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

export default function App() {
  const initialViewState = {
    longitude: -83.0475,
    latitude: 42.3316,
    zoom: 8,
    pitch: 0,
    bearing: 0,
  };

  const [participantData, setParticipantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapRef = useRef();

  const handleFlyTo = useCallback(coordinates => {
    mapRef.current?.flyTo({center: coordinates, duration: 3000, curve: 1, zoom: 18});
  }, []);

  useEffect(() => {
    fetch(
      'https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/project_greenlight/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
    )
      .then(response => {
        if (!response.ok) {
          throw Error('We are sorry! Web-API is currently offline.');
        }

        return response.json();
      })
      .then(data => {
        setParticipantData(data.features);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <Header />
      <ReactMapGL
        ref={mapRef}
        initialViewState={initialViewState}
        style={{width: '100vw', height: '100vh'}}
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/detroit313/cl586y46z003l14pei3pj3bzx"
      >
        {participantData.map(locations => {
          return (
            <MarkerLayer
              key={locations.id}
              longitude={locations.geometry.coordinates[0]}
              latitude={locations.geometry.coordinates[1]}
            ></MarkerLayer>
          );
        })}
      </ReactMapGL>

      <Infobox>
        <ApiRequest>
          {error && <div>{error}</div>}
          {loading && <div> Data is Loading...</div>}
        </ApiRequest>

        {participantData.map(features => (
          <ParticipantCard
            key={features.id}
            name={features.properties.business_name}
            businessType={features.properties.business_type}
            address={features.properties.address}
            liveDate={features.properties.live_date}
            precinct={features.properties.precinct}
            handleFlyTo={() => handleFlyTo(features.geometry.coordinates)}
          />
        ))}
      </Infobox>
    </>
  );
}

const Infobox = styled.section`
  display: grid;
  position: fixed;
  height: 30%;
  width: 100%;
  bottom: 0;
  padding: 0.6rem;
  gap: 9px;
  overflow-y: auto;
  z-index: 2;
`;

const ApiRequest = styled.div`
  width: 100%;
  font-size: 1.3rem;
  color: white;
  background-color: black;
  border: solid 1px white;
  text-align: center;
`;
