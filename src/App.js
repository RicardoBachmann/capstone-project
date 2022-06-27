import {useState, useEffect} from 'react';

export default function App() {
  const [cameraData, setCameraData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/project_greenlight/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson`
    )
      .then(response => response.json())
      .then(fetchData => {
        setCameraData(fetchData.features);
      })
      .catch(error => {
        setError('Sorry! Data is currently not available.');
      });
  }, []);

  return (
    <main className="App">
      <ul>
        {cameraData.map(features => (
          <li key={features}>
            {features.properties.business_name}
            {features.properties.address}
            {features.properties.live_date}
          </li>
        ))}
      </ul>
    </main>
  );
}
