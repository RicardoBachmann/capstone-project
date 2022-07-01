import styled from 'styled-components';

export default function ParticipantCard({name, business_type, address, live_date, precinct}) {
  return (
    <ParticipantContainer>
      <span>{name}</span>
      <span>Business Type: {business_type}</span>
      <span>Address: {address}</span>
      <span>Since: {live_date}</span>
      <span>Precint: {precinct}</span>
    </ParticipantContainer>
  );
}

const ParticipantContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.9rem;
  background-color: black;
  border: solid 2px lightgrey;
  color: white;
  text-align: center;

  .h1 {
    font: inherit;
  }
`;
