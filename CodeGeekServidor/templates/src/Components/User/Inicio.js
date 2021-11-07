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
  const [cuerpo, setCuerpo]=useState();

  //Component di mount
  useEffect(()=>{
    document.title="Inicio";
  },[])

  //Horario de local
  const getDatosHorario =async(direccion, data)=>{
    let promise =await axios.post(props.url+direccion, data).then((res)=>{
      setHorario(res.data.shift())
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setCuerpo(promise);
  }

  const mostrarHorario = (event)=>{
    setHorario(undefined)
    setCuerpo(undefined)
    let formData =new FormData();
    formData.append("cod_local", localActual.code )
    getDatosHorario("reservas/horario/completo/", formData)
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
          <div>
          <Autocomplete
            disablePortal
            fullWidth={true}
            id="combo-box-demo"
            options={props.local}
            sx={{marginTop:5 }}
            renderInput={(params) => <TextField {...params} label="Seleccione el local" />}
            onChange={(_event, newLocal) => {
              setHorario(undefined);
              setCuerpo(undefined);
              setLocalA(newLocal);
            }}
          />
          <Button onClick={mostrarHorario}>Traer datos</Button>
          </div>:
            <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
              <CircularProgress/>
            </div>
        }
        {localActual !== undefined && horario !== undefined && cuerpo !== undefined &&<TablaHorarios 
          local = {localActual}
          horario={horario} 
          cuerpo={cuerpo}/>}
      </div>

    </Slide>
  );
}

export default Inicio;
