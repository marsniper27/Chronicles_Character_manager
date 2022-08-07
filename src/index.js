import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// const DiscordOauth2 = require("discord-oauth2");
// const oauth = new DiscordOauth2({
//   clientId: '975582303734607872',
//   clientSecret: '6m8r3KkaP3xiwPVIk4iLDMep-HcAD6F5',
//   redirectUri: 'http://localhost:3000',
// });

require("./styles/index.css");
require("@solana/wallet-adapter-react-ui/styles.css");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// window.onload = () => {

//   var token='';
//   var type='';
//   var expire='';
//   var refresh='';
//   var scope='';
  
//   if(window.location.search !== ""){
//     oauth.tokenRequest({
//       code: window.location.search.slice(6),
//       scope: "identify",    
//       grantType: "authorization_code",
//     }).then((res)=>{
//       console.log(res)
//       token=res.access_token;
//       type=res.token_type;
//       expire=res.expires_in;
//       refresh=res.refresh_token;
//       scope=res.scope;
      
//       oauth.getUser(token).then(console.log);
//     }).catch(console.error);
    
//   }
// };