import React, { useEffect, useState } from 'react';
import {
  Slide,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography
} from '@mui/material';
import axios from 'axios';

const RevisarSolicitudes = (props)=>{
  const [localActual, setLocalA]=useState();
  const [solicitudes, setSolicitudes]=useState();

  //Component di mount
  useEffect(()=>{
    document.title="Solicitudes de locales";
    getDatosSolicitudes("horario/solicitudes/")
  }, [])

  const getDatosSolicitudes = async (direccion)=>{
    let promise = await axios.get(props.url+direction).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setSolicitudes(promise)
  }
  
  const mostrarLocal=()=>{

  }

  return(
    <Slide direction="up" in={true}>
      <div style={{width:'100%'}}>
        <Typography variant="h4">Solicitudes</Typography>
        {props.local !== undefined ?
          <div style={{width:'100%'}}>
            <Autocomplete
              disablePortal
              fullWidth={true}
              id="combo-box-demo"
              options={props.local}
              sx={{marginTop:5, width:500}}
              renderInput={(params) => <TextField {...params} label="Seleccione el local" />}
              onChange={(_event, newLocal) => {
                setLocalA(newLocal);
                mostrarLocal();
              }}
            />
          </div>:
          <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress />
          </div>
        }
      </div>
    </Slide>
  );
}

export default RevisarSolicitudes;
