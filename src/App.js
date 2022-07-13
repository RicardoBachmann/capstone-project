import {useState, useEffect, useCallback, useRef} from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './components/Header/Header';
import MarkerLayer from './components/MarkerLayer/MarkerLayer';
import ParticipantCard from './components/Participant/ParticipantCard';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

const initialViewState = {
  longitude: -83.0475,
  latitude: 42.3316,
  zoom: 12,
  pitch: 0,
  bearing: 0,
};

export default function App() {
  const [participantData, setParticipantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapRef = useRef();

  const handleFlyTo = useCallback(coordinates => {
    mapRef.current?.flyTo({center: coordinates, duration: 5000, curve: 2, zoom: 18});
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
        {participantData.map(location => {
          return (
            <MarkerLayer
              key={location.id}
              longitude={location.geometry.coordinates[0]}
              latitude={location.geometry.coordinates[1]}
            ></MarkerLayer>
          );
        })}
      </ReactMapGL>

      <Infobox>
        <ApiRequest>
          {error && <span>{error}</span>}
          {loading && <span> Data is Loading...</span>}
        </ApiRequest>

        {participantData.map(participant => (
          <ParticipantCard
            key={participant.id}
            name={participant.properties.business_name}
            businessType={participant.properties.business_type}
            address={participant.properties.address}
            liveDate={participant.properties.live_date}
            precinct={participant.properties.precinct}
            handleFlyTo={() => handleFlyTo(participant.geometry.coordinates)}
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
  gap: 3px;
  overflow-y: auto;
  z-index: 2;
`;

const ApiRequest = styled.div`
  width: 100%;
  height: 23%;
  font-size: 1rem;

  color: red;
  background-color: black;
  border: solid 1px red;
  text-align: center;
`;
