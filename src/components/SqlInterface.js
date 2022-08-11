import React,{useState, useEffect} from 'react';
import Axios from 'axios'

export function SqlInterface(){
  const [userName,setUserName] = useState("");
  const [gargId,setGargId] = useState("");
  const [currentGarg, setCurrentGarg] = useState(null);

  // function setGarg(garg){
  //   setCurrentGarg(garg)
  //   // const submitPost = () => {
  //   //   Axios.post('http://localhost:3002/api/create', {userName: userName, gargId: gargId})
  //   // }
  // }
  return [currentGarg, setCurrentGarg]
}


// export function setGarg(garg) {
//   SqlInterface().setCurrentGarg(garg)
//   // const submitPost = () => {
//   //   Axios.post('http://localhost:3002/api/create', {userName: userName, gargId: gargId})
//   // }
// }

export function getUserData(wallet){
  Axios.get('http://65.108.213.230:3000/api/getFromId/${id}').then((data)=>{
    SqlInterface.setDiscordId(data.ID)
    SqlInterface.setDiscordName(data.User)
    SqlInterface.setCurrentGarg(data.Gargoyle)
  });
}