import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import{connectWallet,getUserData} from "./SqlInterface";
import { useWallet, } from "@solana/wallet-adapter-react";
import { NFTContainer } from "./NFTContainer";

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
  //   redirectUri: 'http://localhost:3000',
  redirectUri: 'https://gentle-tooth-0749.on.fleek.co/',
});

export function Welcome({network}) {
    const [discordUser, setDiscordUser] = useState(null);
    const [currentGarg, setCurrentGarg] = useState(null);
    const { publicKey } = useWallet();
    const [walletSet,setWalletSet]= useState(false);
    // const [currentSet, setCurrentSet] = useState(false);
    
    useEffect(()=>{
        if(publicKey !== null & discordUser===null){
            getUserData(publicKey.toString()).then((data)=>{
                if(data){
                    let user = {
                        id:data.data.id,
                        username:data.data.name
                    }
                    setDiscordUser(user)
                    setCurrentGarg(data.data.garg)
                    setWalletSet(true)
                }
            });
        }
    },[publicKey],);

    useEffect(()=>{
        if(window.location.search !== ""){
            console.log(window.location.search.split("=").pop())
            oauth.tokenRequest({
                code: window.location.search.split("=").pop(),//window.location.search.slice(6),
                scope: "identify",    
                grantType: "authorization_code",
            }).then((res)=>{
                oauth.getUser(res.access_token).then((account) =>{
                    setDiscordUser(account)
                    console.log("account: "+discordUser)
                }).catch(console.error);
            }).catch(console.error);
        }
    },[])

    if(discordUser === null & window.location.search !== ""){
        return (
            <Container>
                <h1>Welcome</h1>
            </Container>
        )
    }
    else if(window.location.search === "" & !walletSet & !publicKey){
        return (
            <Container>
                <h1>Welcome</h1>
                <h2>Please connect your wallet</h2>
            </Container>
        )
    }
    else if(window.location.search === "" && discordUser === null & !walletSet ){
        return (
            <Container>
                <h1>Welcome</h1>
                <h2>Please connect your wallet</h2>
                {/* <button onClick={() => {window.open("https://discord.com/api/oauth2/authorize?client_id=975582303734607872&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify", '_self', 'noopener,noreferrer');}}> */}
                <button onClick={() => {window.open("https://discord.com/oauth2/authorize?client_id=975582303734607872&redirect_uri=https%3A%2F%2Fgentle-tooth-0749.on.fleek.co%2F&response_type=code&scope=identify", '_self', 'noopener,noreferrer');}}>
                    Authorize Discord
                </button>
            </Container>
        )
    }
    else if(!publicKey){
        return (
            <Container>
                <h1>Welcome {discordUser.username}</h1>
                <h2>Please connect your wallet</h2>
                {/* <h2>Discord ID: {discordUser.id}</h2> */}
                {/* <button onClick={()=> getUserData(publicKey.toString())}>
                    get data
                </button> */}
            </Container>
        )
    }
    else if(!walletSet){
        return (
            <Container>
                <h1>Welcome {discordUser.username}</h1>
                {/* <h2>Discord ID: {discordUser.id}</h2> */}
                <button onClick={()=> connectWallet(publicKey.toString(),discordUser.id)}>
                    Connect Wallet
                </button>
                <NFTContainer network={network} discordUser={discordUser} currentGarg={currentGarg} fromDB = {walletSet}/>
            </Container>
        )
    }    
    else{
        return (
            <Container>
                <h1>Welcome {discordUser.username}</h1>
                <NFTContainer network={network} discordUser={discordUser} currentGarg={currentGarg} fromDB = {walletSet}/>
            </Container>
        )
    }
}
//https://discord.com/api/oauth2/authorize?client_id=975582303734607872&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify
