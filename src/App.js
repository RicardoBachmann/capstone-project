import {useState, useEffect} from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './components/Header/Header';
import MapLayer from './components/MapLayer/MapLayer';
import ParticipantCard from './components/Participant/ParticipantCard';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

export default function App() {
  const [participantData, setParticipantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        initialViewState={{
          longitude: -83.0475,
          latitude: 42.3316,
          zoom: 8,
        }}
        style={{width: '100vw', height: '100vh'}}
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/detroit313/cl586y46z003l14pei3pj3bzx"
      >
        {participantData.map(locations => {
          return (
            <MapLayer
              name={locations.properties.business_name}
              key={locations.id}
              longitude={locations.geometry.coordinates[0]}
              latitude={locations.geometry.coordinates[1]}
            ></MapLayer>
          );
        })}
      </ReactMapGL>

      {error && <div>{error}</div>}
      {loading && <div> Data is Loading...</div>}

      <Infobox>
        {participantData.map(features => (
          <ParticipantCard
            key={features.id}
            name={features.properties.business_name}
            businessType={features.properties.business_type}
            address={features.properties.address}
            liveDate={features.properties.live_date}
            precinct={features.properties.precinct}
          />
        ))}
      </Infobox>
    </>
  );
}

const Infobox = styled.div`
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
