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
color: #3a3b3c;
background: #000000;
`;


export function Welcome({network}) {
    const [discordUser, setDiscordUser] = useState(null);
    const [currentGarg, setCurrentGarg] = useState(null);
    const { publicKey } = useWallet();
    const [walletSet,setWalletSet]= useState(false);
    const [authUrl, setAuthUrl] = useState(null);
    const [redirectUri, setredirectUri]=useState(null);
    // const [currentSet, setCurrentSet] = useState(false);

    
    const DiscordOauth2 = require("discord-oauth2");
    var oauth;
    
    useEffect(()=>{
        if(publicKey !== null & discordUser===null){
            getUserData(publicKey.toString())
            .then((data)=>{
                if(data){
                    let user = {
                        id:data.data.id,
                        username:data.data.name
                    }
                    setDiscordUser(user)
                    setCurrentGarg(data.data.garg)
                    setWalletSet(true)
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
    },[publicKey],);

    useEffect(()=>{
        console.log(process.env.REACT_APP_ENV)
        if(process.env.REACT_APP_ENV === "Test"){
            setAuthUrl("https://discord.com/api/oauth2/authorize?client_id=975582303734607872&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify");
            setredirectUri('http://localhost:3000')
            oauth = new DiscordOauth2({
                clientId: "975582303734607872",
                clientSecret: "U99MHnROvWKIQCKkVp_kwwLtjuYao47h",
                redirectUri: 'http://localhost:3000',
            });
        }
        else{
            console.log(process.env.REACT_APP_AUTH_URL);
            setAuthUrl(process.env.REACT_APP_AUTH_URL);
            setredirectUri(process.env.REACT_APP_REDIRECT_URL);
            oauth = new DiscordOauth2({
                clientId: "975582303734607872",
                clientSecret:"U99MHnROvWKIQCKkVp_kwwLtjuYao47h",
                redirectUri: redirectUri,
            });
        }
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

    if(!publicKey){
        return (
            <Container>
                <h1>Welcome</h1>
                <h2>Please connect your wallet</h2>
            </Container>
        )
    }
    else if(discordUser === null){
        return (
            <Container>
                <h1>Welcome</h1>
                <button onClick={() => {console.log(process.env.REACT_APP_AUTH_URL); window.open(authUrl, '_self', 'noopener,noreferrer');}}>
                    Authorize Discord
                </button>
                <NFTContainer network={network} discordUser={discordUser} currentGarg={currentGarg} fromDB = {walletSet}/>
            </Container>
        )
    }
    else if(!walletSet ){
        return (
            <Container>
                <h1>Welcome {discordUser.username}</h1>
                <button onClick={()=> connectWallet(publicKey.toString(),discordUser.id).then((res)=>{if(res){setWalletSet(res)}})}>
                    Add Wallet to Game Profile
                </button>
                <NFTContainer network={network} discordUser={discordUser} currentGarg={currentGarg} fromDB = {walletSet}/>
            </Container>
        )
    }
    else{
        console.log(discordUser)
        console.log(walletSet)
        return (
            <Container>
                <h1>Welcome {discordUser.username}</h1>
                <NFTContainer network={network} discordUser={discordUser} currentGarg={currentGarg} fromDB = {walletSet}/>
            </Container>
        )
    }
}
