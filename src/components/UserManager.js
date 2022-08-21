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

// function customCheckbox({theme}) {
//   return {
//     "& .MuiCheckbox-root svg": {
//       width: 16,
//       height: 16,
//       backgroundColor: "#3a3b3c",
//       border: `3px solid "#d4af37"`,
//       borderRadius: 2
//     },
//     "& .MuiCheckbox-root svg path": {
//       display: "none"
//     },
//     "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
//       backgroundColor: "#d4af37",
//       borderColor: "#3a3b3c",
//       border: "2px solid #3a3b3c",
//       borderRadius: 2,
//     },
//     "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
//       position: "absolute",
//       display: "table",
//       border: "5px solid #3a3b3c",
//       borderTop: 0,
//       borderLeft: 0,
//       transform: "rotate(45deg) translate(-50%,-50%)",
//       opacity: 1,
//       transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
//       content: '""',
//       top: "50%",
//       left: "39%",
//       width: 5.71428571,
//       height: 9.14285714
//     },
//     "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after": {
//       width: 8,
//       height: 8,
//       backgroundColor: "#4e44ce",
//       transform: "none",
//       top: "39%",
//       border: `3 solid #d4af37`
//     }
//   };
// }


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
