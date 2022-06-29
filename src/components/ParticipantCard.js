import styled from 'styled-components';

export default function ParticipantCard({
  error,
  loading,
  participantData,
  name,
  business_type,
  address,
  live_date,
  precinct,
}) {
  return (
    <Card role="list">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage> Data is Loading...</LoadingMessage>}
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

const ErrorMessage = styled.p`
  color: red;
  background: black;
  border: solid 2px lightgrey;
  position: center;
  text-align: center;
  margin: 1rem;
  padding: 1.3rem;
`;

const LoadingMessage = styled.p`
  color: red;
  background: black;
  border: solid 2px lightgrey;
  position: center;
  text-align: center;
  margin: 1rem;
  padding: 1.3rem;
`;

const Card = styled.section``;

const ParticipantSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: black;
  border: solid 2px lightgrey;
  color: white;
`;
