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
import MostrarSolicitud from './Solicitudes/MostrarSolicitud';

//Context
import UserContext from '../../Context/UserContext';

const ReporteLocales = (props)=>{
  const [localActual, setLocalA]=useState(null);
  const [solicitudes, setSolicitudes]=useState();
  const usercontext = useContext(UserContext);

  //Component di mount
  useEffect(()=>{
    document.title="Solicitudes de locales";
    getDatosSolicitudes("reservas/horario/reservasrevisadas/")
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
        {usercontext.openSolicitud && <MostrarSolicitud title="Informacion de la solicitud" solicitudRevisada={true} url={props.url}/>}
        <Typography variant="h4">Solicitudes revisadas </Typography>
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
            {solicitudes !== undefined ?
                localActual ===null?
                //eslint-disable-next-line
                  solicitudes.map((item)=>{
                    if(item.estado_solicitud!=="En Proceso"){
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
                //eslint-disable-next-line
                  solicitudes.map((item)=>{
                    if(localActual.code === item.cod_local.cod_local && item.estado !=="En Proceso"){
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

export default ReporteLocales;
