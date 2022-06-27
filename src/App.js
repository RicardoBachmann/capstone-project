import {useState, useEffect} from 'react';

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
        setParticipantData(data);
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
      {loading && <div>Is Loading...</div>}
      <ul>
        {participantData.map(features => (
          <li key={features}>
            {features.properties.ObjectId}
            {features.properties.business_name}
            {features.properties.business_type}
            {features.properties.address}
            {features.properties.live_date}
            {features.properties.precinct}
          </li>
        ))}
      </ul>
    </main>
  );
}
