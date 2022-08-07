import React, { useState} from 'react';

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletConnectionProvider } from "./components/WalletConnectionProvider";

import { NFTContainer } from "./components/NFTContainer";
import { Welcome } from "./components/Welcome";

import { OuterContainer, Container } from "./styles/common";
import { Header } from "./components/Header";

// const DiscordOauth2 = require("discord-oauth2");
// const oauth = new DiscordOauth2({
//   clientId: '975582303734607872',
//   clientSecret: '6m8r3KkaP3xiwPVIk4iLDMep-HcAD6F5',
//   redirectUri: 'http://localhost:3000',
// });
//var accountName=account();

function App() {
  // eslint-disable-next-line no-unused-vars
  const [network, setNetwork] = useState("mainnet-beta");
  return (
    <WalletConnectionProvider network={network}>
      <WalletModalProvider>
        <OuterContainer>
          <Header />
          <Container className="App">
            <Welcome/>
            <NFTContainer network={network}/>
          </Container>
        </OuterContainer>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
}
export default App;