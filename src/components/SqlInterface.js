// import {useState} from 'react';
import Axios from 'axios'
//Axios.defaults.headers.common['Authorization'] = "123";
// export function SqlInterface(){
//   const [discordUser, setDiscordUser] = useState(null);
//   const [discordName, setDiscordName] = useState("");
//   const [discordId, setDiscordId] = useState("");
//   const [currentGarg, setCurrentGarg] = useState(null);
//   const [wallet, setWallet] = useState(null);

//   // function setGarg(garg){
//   //   setCurrentGarg(garg)
//   //   // const submitPost = () => {
//   //   //   Axios.post('http://localhost:3002/api/create', {userName: userName, gargId: gargId})
//   //   // }
//   // }
//   return [discordUser, setDiscordUser, currentGarg, setCurrentGarg, discordName, setDiscordName,discordId, setDiscordId]
// }
// export function useDiscordUser(){
//   const [discordUser, setDiscordUser] = useState(null);
//   return [discordUser, setDiscordUser]
// }
var serverUrl;
var apiKey;
if(process.env.REACT_APP_ENV==="Test"){
  serverUrl = 'http://localhost:4000/player/'
  apiKey = "Basic 123"
}
else{
  serverUrl = process.env.REACT_APP_SERVER_URL;
  apiKey = process.env.REACT_APP_API_KEY;
}

export function setGarg(garg,user) {
  Axios.patch(serverUrl+ ':id/',
      {
        'garg':garg.props.item.data.name
      },
      {
        params:{
          'id':user
        },
        headers: {
          'Authorization': apiKey 
      }
    }).then((response)=>{
      }).catch(console.error);
      
  fetch(garg.props.item.data.uri)
    .then((res)=>{
      res.json()
        .then((uriInfo)=>{ 
          Axios.patch(serverUrl+ ':id/',
              {
                'imageUrl':uriInfo.image
              },
              {
                params:{
                  'id':user
                },
                headers: {
                  'Authorization': apiKey 
              }
            }).then((response)=>{
                  alert("you set your garg")
              }).catch(console.error);
    })})
}

export function getUserData(wallet){
  return new Promise((resolve, reject) => {
  Axios.get(serverUrl+ 'wallet',{
    params:{
      'wallet':'"'+wallet+'"'
    },
    headers: {
      'Authorization': apiKey,
    }}).then((response)=>{
      resolve(response);
    }).catch((error)=>{
      console.log(error);
      reject(null)
    });
  })
}

export function connectWallet(wallet,user){
  return new Promise((resolve, reject) => {
      Axios.patch(serverUrl+ ':id/',
      {
        'wallet':wallet
      },
      {
        params:{
          'id':user
        },
        headers: {
          'Authorization': apiKey 
      }
    }).then((response)=>{
          alert("you set wallet")
          resolve(true);
      }).catch((error)=>{
        console.log(error);
        reject(false)
      });
    })
}

export function  getplayers(){
  return new Promise((resolve, reject) => {
    Axios.get(serverUrl,{
      headers: {
        'Authorization': apiKey 
      }})
    .then((data)=>{
        resolve(data.data);
    }).catch((error)=>{
      console.log(error)
      reject(null)
    });
  })
}