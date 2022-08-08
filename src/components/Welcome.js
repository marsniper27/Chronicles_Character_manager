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
  redirectUri: 'https://gentle-tooth-0749.on.fleek.co/',
});

export function Welcome() {

 const [discordName, setDiscordName] = useState("");

    if(discordName === "" & window.location.search !== ""){
        return (
            <Container>
                <h1 >Gargoyles</h1>
                <h1>Welcome</h1>
                
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
    else if(window.location.search === ""){
        return (
            <Container>
                <h1 >Gargoyles</h1>
                <h1>Welcome</h1>
                
                <button onClick={() => {window.open("https://discord.com/oauth2/authorize?client_id=975582303734607872&redirect_uri=https%3A%2F%2Fgentle-tooth-0749.on.fleek.co%2F&response_type=code&scope=identify", '_self', 'noopener,noreferrer');}}>
                Authorize Discord
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