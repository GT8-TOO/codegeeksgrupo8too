import React, { useEffect, useState, useContext } from 'react';
import {
  Slide,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography
} from '@mui/material';
import axios from 'axios';

//Componentes
import Solicitud from './Solicitudes/Solicitud';
import CambiarEstado from './Solicitudes/CambiarEstado';

//Context
import UserContext from '../../Context/UserContext';

const RevisarSolicitudes = (props)=>{
  const [localActual, setLocalA]=useState(null);
  const [solicitudes, setSolicitudes]=useState();
  const usercontext = useContext(UserContext);

  //Component di mount
  useEffect(()=>{
    document.title="Solicitudes de locales";
    getDatosSolicitudes("reservas/horario/solicitudes/")
    usercontext.setSolicitud(undefined);
  }, [])

  const getDatosSolicitudes = async (direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setSolicitudes(promise)
  }
  
  return(
    <Slide direction="up" in={true}>
      <div style={{width:'100%'}}>
        {usercontext.openSolicitud && <CambiarEstado url={props.url}/>}
        <Typography variant="h4">Solicitudes pendientes </Typography>
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
              }}
            />
            <br/>
            {solicitudes !== undefined?
                localActual ===null?
                  solicitudes.map((item)=>{
                    return(
                      <Solicitud
                        solicitud={item}
                        local={item.cod_local}
                        horario={item.cod_horario}
                        materia={item.cod_materia}
                        estado={item.estado_solicitud}
                      />
                    )
                  }):
                //eslint-disable-next-line
                  solicitudes.map((item)=>{
                    if(localActual.code === item.cod_local.cod_local){
                      return(
                        <Solicitud
                          solicitud={item}
                          local={item.cod_local}
                          horario={item.cod_horario}
                          materia={item.cod_materia}
                          estado={item.estado_solicitud}
                        />
                      )
                    }
                  }):
              <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
                <CircularProgress />
              </div>
            }
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
