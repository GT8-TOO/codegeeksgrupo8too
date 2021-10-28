import React, { useState, useEffect } from 'react';
import {
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Button,
  Slide 
} from '@mui/material';
import axios from 'axios';

//Componentes
import TablaHorarios from './Inicio/TablaHorarios';

const Inicio =(props)=>{
  const [localActual, setLocalA]= useState();
  const [horario, setHorario] =useState();

  //Component di mount
  useEffect(()=>{
    document.title="Inicio";
  },[])

  //Horario de local
  const getDatosHorario =async(direccion, data)=>{
    let promise =await axios.post(props.url+direccion, data).then((res)=>{
      console.log(res.data)
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setHorario(promise);
  }

  const mostrarHorario = (event)=>{
    let formData =new FormData();
    formData.append("cod_local", "LAB2" )
    getDatosHorario("reservas/horario/solicitudes/", formData)
    console.log(horario)
    if(horario !== undefined){
      console.log(horario[0].doc_dui)
    }
  }

  //Renderizado
  return(
    <Slide direction="up" in={true}>
      <div style={{wdith:'100%'}}>
        <Typography variant="h4">Horarios de locales ya ocupados</Typography>
        { props.local !== undefined ?
          <Autocomplete
            disablePortal
            fullWidth={true}
            id="combo-box-demo"
            options={props.local}
            sx={{marginTop:5 }}
            renderInput={(params) => <TextField {...params} label="Seleccione el local" />}
            onChange={(_event, newLocal) => {
              setLocalA(newLocal);
            }}
          />:
            <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
              <CircularProgress/>
            </div>
        }
        <Button onClick={mostrarHorario}>Traer datos</Button>
        {localActual !== undefined && <TablaHorarios />}
      </div>

    </Slide>
  );
}

export default Inicio;
