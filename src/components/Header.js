import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  background-color: var(--black);
`;

const InnerContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  /* max-width: 1000px; */
  width: 100%;
  padding: 0 2em;
`;

// const LeftNav = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-direction: row;
//   padding: 0;
// `;

const RightNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

// const NavItem = styled.button`
//   border: none;
//   font-size: 1em;
//   color: white;
//   background-color: var(--purple);
//   padding: 1.3em;
//   font-weight: 800;
//   border-radius: 5px;
//   :hover {
//     cursor: pointer;
//   }
// `;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


export function Header() {
  return (
    <StyledHeader>
      <InnerContainer>
        {/* <LeftNav>
          <li>
            <NavItem>Left nav Item</NavItem>
          </li>
        </LeftNav> */}
        <Title>Chronicles Character Manager</Title>
        <RightNav>
          <li>
            <WalletMultiButton />
          </li>
        </RightNav>
      </InnerContainer>
    </StyledHeader>
  );
}
