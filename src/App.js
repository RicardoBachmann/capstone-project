import {useState, useEffect} from 'react';

import ParticipantCard from './components/ParticipantCard';

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
    <main className="App">
      <h1>Camera Surveillance</h1>
      {error && <div>{error}</div>}
      {loading && <div> Data is Loading...</div>}
      {participantData.map(features => (
        <ParticipantCard
          key={features.id}
          name={features.properties.business_name}
          business_type={features.properties.business_type}
          address={features.properties.address}
          live_date={features.properties.live_date}
          precinct={features.properties.precinct}
        />
      ))}
    </main>
  );
}
