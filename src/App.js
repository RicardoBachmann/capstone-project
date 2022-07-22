import {useState, useEffect, useCallback, useRef} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './components/Header/Header';
import MarkerLayer from './components/MarkerLayer/MarkerLayer';
import ParticipantCard from './components/Participant/ParticipantCard';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

const initialViewState = {
  longitude: -83.0475,
  latitude: 42.3316,
  zoom: 11,
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

  const navControlStyle = {
    position: 'relative',
    top: 500,
    left: 0,
    padding: '0.2rem',
  };

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

  function handleSearch(participantData) {
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
        {participantData
          .filter(location => {
            const address = location.properties.address.toLowerCase();
            const name = location.properties.business_name?.toLowerCase();

            return address.includes(query) || (name && name.includes(query));
          })
          .map(location => {
            return (
              <MarkerLayer
                key={location.id}
                name={location.properties.business_name}
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

        <NavigationControl showCompass={false} style={navControlStyle} />
      </ReactMapGL>

      <SearchContainer>
        <TextInput
          onChange={e => setQuery(e.target.value.toLowerCase())}
          htmlFor="search-form"
          type="search"
          name="search-form"
          placeholder="Search for..."
        />
      </SearchContainer>
      <Infobox>
        <ApiRequest>
          {error && <span>{error}</span>}
          {loading && <span> Data is Loading...</span>}
        </ApiRequest>

        {handleSearch(participantData).map(participant => (
          <ParticipantCard
            key={participant.id}
            name={participant.properties.business_name}
            businessType={participant.properties.business_type}
            address={participant.properties.address}
            liveDate={participant.properties.live_date}
            precinct={participant.properties.precinct}
            onClick={() => {
              handleFlyTo(participant.geometry.coordinates);
              setSelectedMarkerId(participant.id);
            }}
            isSelected={selectedMarkerId === participant.id}
          ></ParticipantCard>
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
  gap: 5px;
  overflow-y: auto;
  z-index: 5;
`;

const TextInput = styled.input`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem;
  top: 599px;
  position: fixed;
  padding: 0.8rem;
  width: 100%;
  border: solid 2px red;
  color: red;
  background-color: transparent;

  :focus {
    outline: none;
    background-color: black;
    color: lime;
  }
`;

const SearchContainer = styled.section`
  position: absolute;
`;

const ApiRequest = styled.div`
  color: red;
`;
