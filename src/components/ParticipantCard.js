import {useState, useEffect} from 'react';
import styled from 'styled-components';

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
    <Card>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage> Data is Loading...</LoadingMessage>}
      <section className="Participant__card">
        {' '}
        {participantData.map(features => (
          <ParticipantButton key={features.id}>
            <h2>{features.properties.business_name}</h2>
            <span>Business Type: {features.properties.business_type}</span>
            <span>Address: {features.properties.address}</span>
            <span>Since: {features.properties.live_date}</span>
            <span>Precint: {features.properties.precinct}</span>
          </ParticipantButton>
        ))}{' '}
      </section>
    </Card>
  );
}

const ErrorMessage = styled.p`
  color: red;
  background: black;
  border: solid 2px lightgrey;
  position: center;
  text-align: center;
  margin: 1rem;
  padding: 1.3rem;
`;

const LoadingMessage = styled.div``;

const Card = styled.section``;

const ParticipantButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: black;
  border: solid 2px lightgrey;
  color: white;
`;
