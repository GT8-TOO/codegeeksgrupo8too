import React, {useEffect, useState} from 'react';
import { 
  Typography,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import axios from 'axios';
import WindowAlert from '../WindowAlert';

const CatalogoLocales =(props)=>{
  const [escuelas, setEscuelas]=useState([{nombre:"Escuela de ingenieria en sistemas"},{nombre:"Escuela de ingenieria quimica"}]);
  const [localActual, setLocal]=useState("No se encuentra viendo ningún local");
  const [error, setError]=useState(false)
  const [width, setWidth]=useState(null);
  var selectIndex;

  //Component di mount
  useEffect(()=>{
    document.title="Catalogo de locales";
    var datos = getDatos("locales/solicitarescuelas-json/");
    if(error===false){
      console.log(datos)
    }
  },[]);

  const getDatos=async(direccion)=>{
    var datos = await axios.get(props.url+direccion).then(res=>{
      return res.data;
    }).catch(erro=>{
      setError(true);
    });
    return datos;
  }
  const selectItem=(index)=>{
    setLocal("Esta viendo los locales de la "+escuelas[index].nombre );
  }

  const handleClick = (event) => {
    setWidth(event.currentTarget);
  };    

  const handleClose =async (event, index) => {
    setWidth(null);
  };

  return(
    <div>
      <WindowAlert 
        state={error} 
        type={"warning"} 
        title="Pasó algo inesperado" 
        message="No se ha podido comunicar con el servidor de manera correcta, puede ser problema de conexion o de el servidor, espere mientras se arregla."/>
      <Typography variant="h4">Catálogo de locales de la Facultad de Ingeniería y Arquietectura</Typography>
      <div style={{display:'flex', gap:'20px', margin:'1px auto'}}>
        <Button  
          aria-controls="simple-menu" 
          sx={{marginTop:'40px'}}
          aria-haspopup="true" 
          variant="outlined" 
          onClick={handleClick}>Seleccionar escuela </Button>
        <Menu
          id="simple-menu"
          anchorEl={width}
          keepMounted
          open={Boolean(width)}
          onClose={handleClose}>
          {escuelas.map((escuela, index)=>(
            <MenuItem 
              key={index}
              selected={index===selectIndex}
              onClick={(event)=>{
                selectItem(index);
                handleClose(event, index);
              }}>{escuela.nombre}</MenuItem>
          ))}
        </Menu>
        <Button 
          variant="outlined" 
          sx={{marginTop:'40px'}}>Registrar nuevo Local</Button>
      </div>
      <br/>
      <Typography variant="p">{localActual}</Typography>
    </div>
  );
}

export default CatalogoLocales;
