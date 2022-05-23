import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

require("./styles/index.css");
require("@solana/wallet-adapter-react-ui/styles.css");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
  console.log(fragment)
  console.log(accessToken)
  console.log(tokenType)

  if (!accessToken) {
    //return (document.getElementById('login').style.display = 'block');
    console.log(accessToken)
    return
  }

  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then(result => result.json())
    .then(response => {
      const { username, discriminator } = response;
      //document.getElementById('info').innerText += ` ${username}#${discriminator}`;
      console.log(username + " " + discriminator)
    })
    .catch(console.error);
};