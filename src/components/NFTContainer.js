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
grid-template: repeat(10, 1fr) / repeat(3, 1fr);
text-align: center;
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

export function NFTContainer({ network }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [NFTs, setNFTs] = useState(null);
  const [selectednft, setselectednft] = useState('No Gargoyle Selected');

  async function onGetNFTClick() {
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
    setselectednft(nft.data.name);
    console.log(selectednft)
  }

  if (publicKey) {
    if (NFTs === 0) {
      return (
        <Container>
          <p>
            No NFTs found for <strong>{publicKey.toString()}</strong> on{" "}
            <strong>{network}</strong>!
          </p>
          <Button onClick={onGetNFTClick}>Get NFTs</Button>
        </Container>
      );
    }
    return (
      <div>
        <Button onClick={onGetNFTClick}>Get NFTs</Button>
        <h1>selected nft: {selectednft}</h1>
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
    );
  } else {
    return null;
  }
}
