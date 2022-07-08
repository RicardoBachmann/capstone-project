import styled from 'styled-components';

export default function ParticipantCard({name, businessType, address, liveDate, precinct}) {
  return (
    <ParticipantContainer role="article">
      <h2>{name}</h2>
      <p>Business Type: {businessType}</p>
      <p>Address: {address}</p>
      <p>Since: {liveDate}</p>
      <p>Precint: {precinct}</p>
    </ParticipantContainer>
  );
}

const ParticipantContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.9rem;
  background-color: black;
  border: solid 2px lightgrey;
  color: white;
  text-align: center;

  .h2 {
    color: white;
  }
`;
