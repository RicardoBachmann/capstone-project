import styled from 'styled-components';

export default function ParticipantCard({name, business_type, address, live_date, precinct}) {
  return (
    <Card role="list">
      <section>
        <ParticipantSection>
          <h2>{name}</h2>
          <span>Business Type: {business_type}</span>
          <span>Address: {address}</span>
          <span>Since: {live_date}</span>
          <span>Precint: {precinct}</span>
        </ParticipantSection>
      </section>
    </Card>
  );
}

const Card = styled.section``;

const ParticipantSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: black;
  border: solid 2px lightgrey;
  color: white;
`;
