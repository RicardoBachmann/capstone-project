import styled from 'styled-components';

export default function ParticipantCard({name, businessType, address, liveDate, precinct, handleFlyTo}) {
  return (
    <ParticipantButton onClick={handleFlyTo}>
      <dl>
        <h2>{name}</h2>
        <dt>Business Type: {businessType}</dt>
        <dt>Address: {address}</dt>
        <dt>Since: {liveDate}</dt>
        <dt>Precint: {precinct}</dt>
      </dl>
    </ParticipantButton>
  );
}

const ParticipantButton = styled.button`
  width: 100%;
  font-size: 0.7rem;
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

  h2 {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
