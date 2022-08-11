import React, { useState} from 'react';

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletConnectionProvider } from "./components/WalletConnectionProvider";

import { NFTContainer } from "./components/NFTContainer";
import { Welcome } from "./components/Welcome";
import { SqlInterface } from "./components/SqlInterface";

import { OuterContainer, Container } from "./styles/common";
import { Header } from "./components/Header";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [network, setNetwork] = useState("mainnet-beta");
  return (
    <WalletConnectionProvider network={network}>
      <WalletModalProvider>
        <OuterContainer>
          <Header />
          <Container className="App">
            <h1 >Gargoyles</h1>
            <Welcome/>
            <NFTContainer network={network}/>
          </Container>
        </OuterContainer>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
}
export default App;