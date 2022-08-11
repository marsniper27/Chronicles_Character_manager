import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import Axios from 'axios'

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
  //redirectUri: 'https://gentle-tooth-0749.on.fleek.co/',
});

export function Welcome() {

    const [discordName, setDiscordName] = useState("");
    const [discordId, setDiscordId] = useState("");
    const [currentGarg, setCurrentGarg] = useState("");

    useEffect(()=>{
        if(window.location.search !== ""){
            console.log(window.location.search.split("=").pop())
            oauth.tokenRequest({
                code: window.location.search.split("=").pop(),//window.location.search.slice(6),
                scope: "identify",    
                grantType: "authorization_code",
            }).then((res)=>{
                oauth.getUser(res.access_token).then((account) =>{
                setDiscordName(account.username) 
                setDiscordId(account.id)
                }).catch(console.error);
            }).catch(console.error);
        }
        Axios.get('http://65.108.213.230:3000/api/getFromId/${id}').then((data)=>{
            setDiscordId(data.ID)
            setDiscordName(data.User)
        //     setCurrentGarg(data.Gargoyle)
        });
    },[])

    if(discordName === "" & window.location.search !== ""){
        return (
            <Container>
                <h1>Welcome</h1>
                
                {/* <button onClick={() => {
                    if(window.location.search !== ""){
                        oauth.tokenRequest({
                            code: window.location.search.slice(6),
                            scope: "identify",    
                            grantType: "authorization_code",
                        }).then((res)=>{
                            oauth.getUser(res.access_token).then((account) =>{
                            setDiscordName(account.username) 
                            setDiscordId(account.id)
                            }).catch(console.error);
                        }).catch(console.error);
                    }}}>
                Get Discord Account
                </button> */}
            </Container>
        )
    }
    else if(window.location.search === ""){
        return (
            <Container>
                <h1>Welcome</h1>
                <button onClick={() => {window.open("https://discord.com/api/oauth2/authorize?client_id=975582303734607872&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify", '_self', 'noopener,noreferrer');}}>
                {/* <button onClick={() => {window.open("https://discord.com/oauth2/authorize?client_id=975582303734607872&redirect_uri=https%3A%2F%2Fgentle-tooth-0749.on.fleek.co%2F&response_type=code&scope=identify", '_self', 'noopener,noreferrer');}}> */}
                Authorize Discord
                </button>
            </Container>
        )
    }
    else{
        return (
            <Container>
                <h1>Welcome {discordName}</h1>
                <h2>Discord ID: {discordId}</h2>
            </Container>
        )
    }
}
//https://discord.com/api/oauth2/authorize?client_id=975582303734607872&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify