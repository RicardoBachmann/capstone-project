import styled from 'styled-components';

export default function ParticipantCard({name, businessType, address, liveDate, precinct, handleFlyTo}) {



  return (
    <ParticipantContainer>
      <h2>{name}</h2>
      <ul>
        <li>Business Type: {businessType}</li>
        <li>Address: {address}</li>
        <li>Since: {liveDate}</li>
        <li>Precint: {precinct}</li>
      </ul>
      <button onClick={handleFlyTo}>INVESTIGATE</button>
    </ParticipantContainer>
  );
}

const ParticipantContainer = styled.section`
  display: grid;
  width: 100%;
  font-size: 0.6rem;
  line-height: 0.8rem;
  color: white;
  background-color: black;
  border: solid 1px lightgrey;
  text-align: left;

  button {
    background-color: black;
    font-size: 0.8rem;
    color: lime;
    border: solid 1px red;
    padding: 0.3rem;
    margin: 0.6rem;

    &:focus {
      background-color: red;
    }
  }

  h2 {
    text-align: center;
    font-size: 1rem;
    line-height: 0.1rem;
    font-weight: 400;
  }

  ul {
    text-align: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
