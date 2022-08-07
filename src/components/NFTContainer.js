import { useState } from "react";
import styled from "styled-components";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import { fetchNFTsOwnedByWallet } from "../lib/fetchNFTsByWallet";

import { NFTItem } from "./NFTItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  text-align: center;
`;
const GridContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100%
  color: white;
  gap: 5px;
  grid-template: repeat(10, 1fr) / repeat(4, 1fr);
  text-align: center;
`;
const SelectedContainer = styled.div`
  margin: auto;
  width: 30%;
  border: 3px solid #73AD21;
  text-align: center;
  padding: 10px;
  font-size: 10px;
`;

// grid-auto-rows: minmax(50px, auto);
// grid-auto-columns: minmax(10px, auto);

const Button = styled.button`
  color: white;
  background-color: teal;
  border: none;
  box-shadow: none;
  padding: 1.5em;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export function NFTContainer( {network}) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [NFTs, setNFTs] = useState(null);
  const [selectednft, setselectednft] = useState('No Gargoyle Selected');
  const [ buttonText, setbuttonTest]= useState('Get NFTS')

  async function onGetNFTClick() {
    setbuttonTest ('Fetching NFTS');
    if (!publicKey) return setNFTs(null);
    let NFTs = await fetchNFTsOwnedByWallet(
      new PublicKey(publicKey),
      connection
    );
    if (typeof NFTs === "undefined") {
      setNFTs(0);
    } else {
      setNFTs(NFTs);
    }
  }

  async function selectNFTClick(nft){
    console.log(nft)
    setselectednft(<NFTItem item={nft} />);
    console.log(selectednft)
  }

  if (publicKey) {
    if (NFTs === 0) {
      setbuttonTest('Get NFTs');
      return (
        <Container>
          <p>
            No NFTs found for <strong>{publicKey.toString()}</strong> on{" "}
            <strong>{network}</strong>!
          </p>
          <Button onClick={onGetNFTClick}>{buttonText}</Button>
        </Container>
      );
    }
    if(NFTs === null){
      return(
        <Container>
          <Button onClick={onGetNFTClick}>{buttonText}</Button>
        </Container>
      );
    }
    return (
      <div>
      <SelectedContainer>
        <h1>Selected Gargoyle: {selectednft}</h1>
      </SelectedContainer>
        <GridContainer>
            {NFTs &&
              NFTs.map((item) => {
                if (item.data.uri === "") return null;
                return (
                  <div key={JSON.stringify(item)}>
                    <NFTItem item={item} />
                    <Button onClick ={()=>selectNFTClick(item)}>Select</Button>
                  </div>
                );
              })}
        </GridContainer>
        </div>
      //</Container>
    );
  } else {
    return null;
  }
}
