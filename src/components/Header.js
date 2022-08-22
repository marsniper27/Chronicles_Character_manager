import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import logo from "../assets/logo_cropped.gif";
import banner from "../assets/banner.jpg";
import { useWallet, } from "@solana/wallet-adapter-react";
import { useEffect,useState } from "react";
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  vertical-align:middle;
  width: 100%;
  min-height: 50px;
  background-color: #000000;
  border-bottom: 3px solid #d4af37;
`;

const InnerContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1000px; */
  width: 100%;
  padding: 0 2em;
`;

const LeftNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const RightNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

// background-color: var(--purple);
const NavItem = styled.button`
  background-color: var(--purple);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  :hover {
    cursor: pointer;
    background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  }
}
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  padding: 50,50,50,50;
`;


export function Header() {
  const { publicKey } = useWallet();
  const [manager,setManager] = useState(false)
  let navigate = useNavigate();

  useEffect(()=>{
    if(publicKey){
      switch(publicKey.toString()) {
        case "F1p5ct9NqBP63Zrf2QBFn1MAGTNNiRG6BRkmm4g5vCUS":
          setManager(true);
          break;
        default:
          break;
      }
    }
  },[publicKey],);

  if(manager){
    return (
      <StyledHeader>
        <InnerContainer>
          <LeftNav>
            <img style ={{height:80}}src={logo} alt="loading..." />
          </LeftNav>
          <img src={banner} style ={{height:100}} alt='Chronicles Character Manager' />
          <RightNav>
              <WalletMultiButton />
              <NavItem onClick={() =>navigate("/UserManager")}>User Managment</NavItem>
          </RightNav>
        </InnerContainer>
      </StyledHeader>
    );
  }
  else{
    return (
      <StyledHeader>
        <InnerContainer>
          <LeftNav>
            <img style ={{height:80}}src={logo} alt="loading..." />
          </LeftNav>
          <img src={banner} style ={{height:120}} alt='Chronicles Character Manager' />
          {/* <Title>Chronicles Character Manager</Title> */}
          <RightNav>
            <li>
              <WalletMultiButton />
            </li>
          </RightNav>
        </InnerContainer>
      </StyledHeader>
    );
  }
}
