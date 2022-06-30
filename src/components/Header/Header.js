import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <h1>Green Light Surveillance</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.section`
  width: 100%;
  background-color: black;
  height: 90px;
  position: fixed;

  h1 {
    font: inherit;
    font-weight: 300;
    color: white;
    text-align: center;
    position: top;
  }
`;
