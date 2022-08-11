import { useState } from "react";
import styled from "styled-components";
import { NFTItem } from "./NFTItem";
import Axios from 'axios'
import { Container } from "../styles/common";
//import{SqlInterface} from "./SqlInterface";


const GridContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100%
  color: white;
  gap: 5px;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  text-align: center;
`;

const SelectedContainer = styled.div`
margin: auto;
width: 80%;
border: 3px solid #73AD21;
text-align: center;
padding: 10px;
font-size: 10px;
`;

const Button = styled.button`
  color: white;
  background-color: teal;
  border: none;
  box-shadow: none;
  padding: 1.5em;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;


export function SelectedGarg( {selectednft}) {
    const [currentGarg, setCurrentGarg] = useState(null);

    // useEffect(()=>{
    //     Axios.get('http://65.108.213.230:3000/api/getGargFromId/${id}').then((data)=>{
    //         setCurrentGarg(data.Gargoyle)
    //     });
    // },[])
  
    function setGarg(){
        setCurrentGarg(selectednft)
    //     console.log(currentGarg)
    //     // const submitPost = () => {
    //         // Axios.post('http://localhost:3002/api/create', {userName: userId, gargId: gargId})
    //     //   }
    }
  
//   if(selectednft !== 'No Gargoyle Selected' && currentGarg === null){
//     return(
//         <SelectedContainer>
//             <h1>Selected Gargoyle: {selectednft}</h1>
//         </SelectedContainer>
//     )
//   }
    if(selectednft !== 'No Gargoyle Selected' && currentGarg === null){
        return (
            <SelectedContainer>
                <h1>Selected Gargoyle: {selectednft}</h1>
                <Button onClick={setGarg}>Confirm Garg</Button>
            </SelectedContainer>
        )
    }
    if(selectednft !== 'No Gargoyle Selected' && currentGarg.props.item.data.name !== selectednft.props.item.data.name){
        return(
            <GridContainer>
                <SelectedContainer>
                    <h1>Current Gargoyle: {currentGarg}</h1>
                </SelectedContainer>
                <SelectedContainer>
                    <h1>Selected Gargoyle: {selectednft}</h1>
                    <Button onClick={setGarg}>Confirm Garg</Button>
                </SelectedContainer>
            </GridContainer>
        )
    }
    else{
        if(currentGarg === null){
            return (
                <SelectedContainer>
                    <h1>Selected Gargoyle: {selectednft}</h1>
                </SelectedContainer>
            )
        }
        else{
            return(
                <SelectedContainer>
                    <h1>Current Gargoyle: {currentGarg}</h1>
                </SelectedContainer>
            )
        }
    }
}