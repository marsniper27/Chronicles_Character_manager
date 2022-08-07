import React, { useState} from 'react';
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
padding: 1em 0;
text-align: center;
`;

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: '975582303734607872',
  clientSecret: '6m8r3KkaP3xiwPVIk4iLDMep-HcAD6F5',
  redirectUri: 'http://localhost:3000',
});

export function Welcome() {

 const [discordName, setDiscordName] = useState("");

    if(discordName === "" ){
        return (
            <Container>
                <h1 >Gargoyles</h1>
                <h1>Welcome {discordName}</h1>
                <p>Discord name {discordName}</p>
                
                <button onClick={() => {
                    if(window.location.search !== ""){
                        oauth.tokenRequest({
                            code: window.location.search.slice(6),
                            scope: "identify",    
                            grantType: "authorization_code",
                        }).then((res)=>{
                            oauth.getUser(res.access_token).then((account) =>{
                            setDiscordName(account.username) 
                            }).catch(console.error);
                        }).catch(console.error);
                    }}}>
                Get Discord Account
                </button>
            </Container>
        )
    }
    else{
        return (
            <Container>
                <h1 >Gargoyles</h1>
                <h1>Welcome {discordName}</h1>
            </Container>
        )

    }
}