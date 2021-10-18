import React, {useEffect, useState} from 'react';
import { 
  Typography,
  Autocomplete,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';
import WindowAlert from '../WindowAlert';
import CardLocal from './Locales/CardLocal';
import RegistrarLocal from './Locales/RegistrarLocal';

const CatalogoLocales =(props)=>{
  const [escuelas, setEscuelas]=useState();
  const [localActual, setLocal]=useState("No se encuentra viendo ningún local");
  const [error, setError]=useState(false)
  const [width, setWidth]=useState(null);
  const [openDialog, setOpenDialogo]= useState(false);
  var selectIndex;

  //Component di mount
  useEffect(async()=>{
    document.title="Catalogo de locales";
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
  
  const selectItem=(index)=>{
    setLocal("Esta viendo los locales de la "+escuelas[index].nombre_escuela );
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
      <WindowAlert 
        state={error} 
        type={"warning"} 
        title="Pasó algo inesperado" 
        message="No se ha podido comunicar con el servidor de manera correcta, puede ser problema de conexion o de el servidor, espere mientras se arregla."/>
      <RegistrarLocal open={openDialog} setOpen={setOpenDialogo}/>
      <Typography variant="h4">Catálogo de locales de la Facultad de Ingeniería y Arquietectura</Typography>
      <div style={{display:'flex', gap:'20px', margin:'1px auto'}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={escuelas}
          sx={{marginTop:5, width: 300 }}
          renderInput={(params) => <TextField {...params} label="Escuelas diponibles" />}/>
        <Button 
          variant="outlined" 
          onClick={openDialogClick}
          sx={{marginTop:'40px'}}>Registrar nuevo Local</Button>
      </div>
      <br/>
      <Typography variant="p">{localActual}</Typography>
      <div>
        <CardLocal/>
      </div>
    </div>
  );
}

export default CatalogoLocales;
