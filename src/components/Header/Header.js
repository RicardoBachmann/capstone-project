import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <h1>Green Light Surveillance</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.section`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: black;
  z-index: 2;

  h1 {
    font: inherit;
    font-weight: 300;
    color: white;
    text-align: center;
  }
`;
