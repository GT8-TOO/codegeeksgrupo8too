import React, { useState, useEffect, useContext } from 'react';
import {
  Slide,
  CircularProgress,
  Button,
  Autocomplete,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';

import userContext from '../../Context/UserContext';

//Iconos
import WarningIcon from '@mui/icons-material/Warning';

//Components
import WindowAlert from '../WindowAlert';

//Style
import styleError from '../../Styled/ErorCSS';

const SolicitarLocal = (props)=>{
  const [dataSelect, setData]=useState({
    cod_horario:undefined,
    cod_local:undefined
  });
  const [elegido, setElegido]= useState('')
  const classError = styleError();
  const usercontext = useContext(userContext);
  const [error, setError]= useState({
    state:false,
    type:"",
    sesionCaducada:false,
    title:"",
    message:""
  })

  //Manda los datos a servidor
  const mandarSolicitud =async(direccion, data)=>{
    let promise = await axios.post(props.url+direccion, data,{withCredentials:true}).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error);
    })
    setError(promise);
    if(promise.sesionCaducada){
      cambiarUsuario("dui",0)
      cambiarUsuario("admin", true)
      cambiarUsuario("logeado", false)
      cambiarUsuario("token", undefined)
    }
  }

  //Component di mount
  useEffect(()=>{
    document.title="Realizar reserva";
    if (usercontext.codigoLocal !== undefined){   
      setData({cod_horario:undefined, cod_local:usercontext.codigoLocal});
    }
    console.log(usercontext.codigoLocal)
  },[])

  //Cambia el estado de userContext
  const cambiarUsuario=(clave, valor)=>{
    usercontext.setUser(prevState=>{
      return {...prevState, [clave]:valor}
    })
  }

  const solicitarReserva =()=>{
    setError({
      state:false,
      type:"",
      title:"",
      message:""
    })
    if(dataSelect.cod_horario!== undefined && dataSelect.cod_local !== undefined){
      if(dataSelect.cod_local !== '' &&dataSelect!== ''){
        let formData = new FormData();
        formData.append("cod_local",dataSelect.cod_local);
        formData.append("cod_horario", dataSelect.cod_horario);
        formData.append("cod_empleado", usercontext.user.dui);
        formData.append("token", usercontext.user.token);
        mandarSolicitud("reservas/nueva/",formData);
        console.log(error.sesionCaducada)
      }else{
        setError({
          state:true,
          type:"warning",
          title:"Campos vacios",
          message:"No ha ingresado ningun dato asi que no puede realizar la reserva"
        })
      }
    }else{
      setError({
        state:true,
        type:"warning",
        title:"Campos vacios",
        message:"No ha ingresado ningun dato asi que no puede realizar la reserva"
      })
    }
  }
  
  return (
    <Slide direction="up" in={true}>
      <div>
        {error.state && 
          <WindowAlert
            type={error.type}
            state={error.state}
            title={error.title}
            message={error.message}
          />
        }
        {error.sesionCaducada && 
          <WindowAlert
            type={error.type}
            state={error.state}
            title={error.title}
            message={error.message}
            redirect="/login"
          />
        }
        <Typography variant="h4">Realizar reserva de local</Typography>
        { props.horarios !== undefined ?
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.local}
              value ={usercontext.codigoLocal !== undefined ? usercontext.codigoLocal: elegido}
              fullWidth={true}
              sx={{marginTop:5 }}
              renderInput={(params) => <TextField {...params} label="Local a solicitar" />}
              onChange={(_event, elegido) => {
                if(elegido!== null){
                  setData({cod_horario: dataSelect.cod_horario, cod_local:elegido.code});
                  setElegido(elegido.label)
                }else{
                  setData({cod_horario: dataSelect.cod_horario, cod_local:""});
                }
              }}
            /> 
            {dataSelect.cod_local ==="" &&<p className={classError.errors2}><WarningIcon/> Seleccione un local</p>}
            {dataSelect.cod_local ===undefined && error.state &&<p className={classError.errors2}><WarningIcon/> Seleccione un local</p>}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.horarios}
              fullWidth={true}
              sx={{marginTop:5 }}
              renderInput={(params) => <TextField {...params} label="Horarios para solicitar local" />}
              onChange={(_event, elegido) => {
                if(elegido !== null){
                  setData({cod_horario:elegido.cod_horario, cod_local:dataSelect.cod_local});
                }else{
                  setData({cod_horario:"", cod_local:dataSelect.cod_local});
                }
              }}
            /> 
            {dataSelect.cod_horario ==="" &&<p className={classError.errors2}><WarningIcon/> Seleccione un horario</p>}
            {dataSelect.cod_horario ===undefined && error.state&&<p className={classError.errors2}><WarningIcon/> Seleccione un horario</p>}
            <br/>
            <Button
              variant="contained" 
              style={{backgroundColor:'#01818A'}}
              onClick={solicitarReserva}>Realizar reserva</Button>
          </div>:
          <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress m="auto"/>
          </div>
        }
      </div>
    </Slide>
  )
}

export default SolicitarLocal;

