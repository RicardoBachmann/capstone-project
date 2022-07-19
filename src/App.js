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

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const [query, setQuery] = useState('');

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

  function search(participantData) {
    return participantData.filter(participant => {
      const address = participant.properties.address.toLowerCase();
      const name = participant.properties.business_name?.toLowerCase();

      return address.includes(query) || (name && name.includes(query));
    });
  }

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
              onClick={() => {
                handleFlyTo(location.geometry.coordinates);
                setSelectedMarkerId(location.id);
              }}
              isSelected={selectedMarkerId === location.id}
            ></MarkerLayer>
          );
        })}
      </ReactMapGL>

      <ControlPanel>
        <Infobox>
          <SearchContainer>
            <SearchInput
              label
              htmlFor="search-form"
              type="search"
              name="search-form"
              placeholder="Search for..."
              onChange={e => setQuery(e.target.value.toLowerCase())}
            />
          </SearchContainer>
          <ApiRequest>
            {error && <span>{error}</span>}
            {loading && <span> Data is Loading...</span>}
          </ApiRequest>

          {search(participantData).map(participant => (
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
      </ControlPanel>
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
  gap: 5px;
  overflow-y: auto;
  z-index: 5;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  top: 435px;
  position: fixed;
  padding: 0.2rem;
  width: 357px;
  border: solid 2px red;
  color: black;
  background-color: rgb(255, 255, 255, 0.8);
`;

const ControlPanel = styled.section`
  position: absolute;
`;

const ApiRequest = styled.div`
  color: red;
`;
