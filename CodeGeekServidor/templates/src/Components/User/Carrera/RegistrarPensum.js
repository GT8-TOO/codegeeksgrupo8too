import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Autocomplete,
  TextField
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RegistrarPensum =(props)=>{
  const [escuelas, setEscuelas]=useState();
  const [width, setWidth]=useState(null);
  const [openDialog, setOpenDialogo]= useState(false);
  const [error, setError]=useState(false)
  var selectIndex;

  //Component di mount
  useEffect(async()=>{
    var prueba = await getDatos("locales/solicitarescuelas-json/");
    if(error===false){
      setEscuelas(prueba)
    }
  },[]);

  //Solicitar datos a servidor
  const getDatos = async(direccion) => {
    var promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((erro)=>{
      setError(true);
    });
    return promise;
  }

  const handleClick = (event) => {
    setWidth(event.currentTarget);
  };    

  const handleClose =async (event, index) => {
    setWidth(null);
  };

  const openDialogClick = () => {
    setOpenDialogo(true);
  };
 
  return(
    <div>
      <Typography variant="h5">Registrar pensum</Typography>
      <Grid style={{marginTop:'10px'}} container rowSpacing={4} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography variant="p">Nombre de la carrera</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" sx={{width:300}} label="Carrera" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="p">Año de creación del pensúm</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" sx={{width:300}} type="number" label="Año" variant="outlined" />
        </Grid>
         <Grid item xs={4}>
          <Typography variant="p">Escuela que pertecenera</Typography>
        </Grid>
        <Grid style={{display:'flex'}} item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={escuelas}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Escuelas diponibles" />}/>
        </Grid>
     </Grid>
    </div>
  );

}
export default RegistrarPensum;
