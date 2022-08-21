import React, { useState} from 'react';
import { Routes, Route} from "react-router-dom";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletConnectionProvider } from "./components/WalletConnectionProvider";

// import { NFTContainer } from "./components/NFTContainer";
import { Welcome } from "./components/Welcome";
import { UserManager } from "./components/UserManager";
import { Comic } from "./components/Comic";

import { OuterContainer, Container } from "./styles/common";
import { Header } from "./components/Header";
import Layout from './layout/Layout.jsx';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [network, setNetwork] = useState("mainnet-beta");

  return (
    <WalletConnectionProvider network={network}>
      <WalletModalProvider>
        <OuterContainer>
          <Header/>
            <Container className="App">
              <Layout>
                <Routes>
                  <Route path="/" element={<Welcome network={network}/>} />
                  <Route path="UserManager" element={<UserManager/>} />
                  <Route path="Comic" element={<Comic/>} />
                </Routes>
              </Layout>
            </Container>
        </OuterContainer>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
}
export default App;