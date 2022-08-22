import React, { useState, useEffect } from 'react'
import { DataGrid,GridValueGetterParams,GRID_CHECKBOX_SELECTION_COL_DEF} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import{getplayers} from "./SqlInterface";
import managers from "./managers.js";
import {useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

const Container = styled('div')({
  width:'100%'
});

const UserName = styled(`div`)({
  display:`flex`
});


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  width:"100%",
  padding: '10px 0px 0px',
  height:800,
  backgroundColor: "#4e44ce",
  boxShadow: 2,
  border: '2 solid',
  borderColor: "#d4af37",
  '& .MuiDataGrid-cell:hover': {
    color: "#d4af37",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#d4af37" : "#4e44ce"
    }`
  },
}));

const rows = [
  { id: 1, col1: 'Hello', col2: 'World', col3:'',col4:'',col5:'',col6:'',col7:'',col8:'',col9:'f'},
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

function getName(params: GridValueGetterParams) {
    return (
      <UserName>
        <Avatar alt={params.row.name} src={params.row.imageUrl} />
        <div style={{padding:`8px 10px 0px`, fontSize:18}}>{params.row.name}</div>
      </UserName>
    );
}

const columns = [
  { field: 'id', headerName: 'ID', flex:0.6 },
  { field: 'name', headerName: 'User', flex:1, renderCell:getName },
  { field: 'coins', headerName: 'Coins', flex:0.2, type: 'number', editable: true },
  { field: 'level', headerName: 'Level', flex:0.2, type: 'number', editable: true },
  { field: 'xp', headerName: 'XP', flex:0.2, type: 'number', editable: true },
  { field: 'win', headerName: 'Win', flex:0.2, type: 'number', editable: true },
  { field: 'hunt', headerName: 'Hunt',flex:0.2, type: 'number', editable: true },
  { field: 'col8', headerName: 'Win/Hunt %', flex:0.3,type: 'number', editable: true },
  { field: 'currentMonster', headerName: 'Current Monster', flex:.4 },
];


export function UserManager() {
  const [tableData, setTableData] = useState([])
  const { publicKey } = useWallet();
  let navigate = useNavigate();

  useEffect(() => {
    if(publicKey){
      if(managers.includes(publicKey.toString())){
        getPlayerdata()
      }
    }
    else{navigate("/")}
  }, [publicKey])
  
  function getPlayerdata(){
    getplayers()
      //.then((data) => data.json())
      .then((data) => {
        //data.foreach()
        setTableData(data)})
      console.log(tableData)
  }

  return (
    <Container>
      <div>
        <StyledDataGrid 
          checkboxSelection 
          rows={tableData} 
          columns={columns} 
          GRID_CHECKBOX_SELECTION_COL_DEF ={columns}/> 
          </div>
          <div style={{display: "flex", }}>
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={() =>
              getPlayerdata()
            }
          >
            Refresh
          </Button>
          </div>
    </Container>
  );
}
