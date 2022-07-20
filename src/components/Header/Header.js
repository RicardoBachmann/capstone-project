import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <h1>GREEN LIGHT SURVEILLANCE</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: black;
  z-index: 2;

  h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 3em;
    font: inherit;
    font-weight: 400;
    color: white;
    text-align: center;
  }
`;
