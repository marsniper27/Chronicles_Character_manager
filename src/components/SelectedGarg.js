import { useState, useEffect } from "react";
import styled from "styled-components";
import{setGarg} from "./SqlInterface";


const GridContainer = styled.div`
  display: grid;
  width: 80%
  color: white;
  gap: 5px;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  text-align: center;
`;

const SelectedContainer = styled.div`
margin: auto;
width: 50%;
width-max:100px;
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


export function SelectedGarg( props) {
    const selectednft = props.selectednft;
    const discordUser = props.discordUser
    const [currentGarg, setCurrentGarg] = useState(null);
    const [currentSet, setCurrentSet] = useState(props.fromDB);
    //const [discordUser, setDiscordUser] =useContext(UserContext);
    
    useEffect(()=>{
        if(props.selectednft !== 'No Gargoyle Selected' & currentSet){
            setCurrentGarg(props.selectednft)
            setCurrentSet(false)
        }
    },[props.selectednft])
    
  
    function confirmGarg(){
        setCurrentGarg(selectednft)
        setGarg(selectednft,discordUser.id)
    }
    if(selectednft !== 'No Gargoyle Selected' && currentGarg === null){
        return (
            <SelectedContainer>
                <h1>Selected Gargoyle: {selectednft}</h1>
                <Button onClick={confirmGarg}>Confirm Garg</Button>
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
                    <Button onClick={confirmGarg}>Confirm Garg</Button>
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