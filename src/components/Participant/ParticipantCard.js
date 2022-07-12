
import styled from 'styled-components';

export default function ParticipantCard({name, businessType, address, liveDate, precinct}) {
  return (
    <ParticipantButton>
      <button key={} onClick={handleFlyTo}>
        <h2>{name}</h2>
        <p>Business Type: {businessType}</p>
        <p>Address: {address}</p>
        <p>Since: {liveDate}</p>
        <p>Precint: {precinct}</p>
      </button>
    </ParticipantButton>
  );
}

const ParticipantButton = styled.button`
  width: 100%;
  font-size: 0.7rem;
  line-height: 0.3rem;
  color: white;
  background-color: black;
  border: solid 1px lightgrey;
  text-align: left;
  padding-left: 0.6rem;
`;
