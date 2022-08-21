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

export function setGarg(garg,user) {
  Axios.patch('http://localhost:3030/player/:id/',
      {
        'garg':garg.props.item.data.name
      },
      {
        params:{
          'id':user
        },
        headers: {
          'Authorization': `Basic 123` 
      }
    }).then((response)=>{
      }).catch(console.error);
      
  fetch(garg.props.item.data.uri)
    .then((res)=>{
      res.json()
        .then((uriInfo)=>{ 
          Axios.patch('http://localhost:3030/player/:id/',
              {
                'imageUrl':uriInfo.image
              },
              {
                params:{
                  'id':user
                },
                headers: {
                  'Authorization': `Basic 123` 
              }
            }).then((response)=>{
                  alert("you set your garg")
              }).catch(console.error);
    })})
}

export function getUserData(wallet){
  return new Promise((resolve, reject) => {
  Axios.get('http://localhost:3030/player/wallet',{
    params:{
      'wallet':'"'+wallet+'"'
    },
    headers: {
      'Authorization': `Basic 123`,
    }}).then((response)=>{
      resolve(response);
    }).catch((error)=>{
      console.log(error);
      reject(null)
    });
  })
}

export function connectWallet(wallet,user){
      Axios.patch('http://localhost:3030/player/:id/',
      {
        'wallet':wallet
      },
      {
        params:{
          'id':user
        },
        headers: {
          'Authorization': `Basic 123` 
      }
    }).then((response)=>{
          alert("you set wallet")
      }).catch(console.error);
}

export function  getplayers(){
  return new Promise((resolve, reject) => {
    Axios.get('http://65.108.213.230:6363/player',{
      headers: {
        'Authorization': `Basic theapiphrase` 
      }})
    .then((data)=>{
        resolve(data.data);
    }).catch((error)=>{
      console.log(error)
      reject(null)
    });
  })
}