import styled from 'styled-components';

export default function ParticipantCard({name, businessType, address, liveDate, precinct, handleFlyTo}) {
  return (
    <ParticipantButton onClick={handleFlyTo}>
      <h2>{name}</h2>
      <p>Business Type: {businessType}</p>
      <p>Address: {address}</p>
      <p>Since: {liveDate}</p>
      <p>Precint: {precinct}</p>
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

  &:focus {
    background-color: black;
    color: lime;
    border: solid 1px red;
  }
`;
