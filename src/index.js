import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

require("./styles/index.css");
require("@solana/wallet-adapter-react-ui/styles.css");

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />  
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
