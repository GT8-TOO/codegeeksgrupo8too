import React, { useState, useEffect, forwardRef, useContext } from 'react';
import {
  Slide,
  DialogTitle,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  CircularProgress,
  DialogContent,
  Button,
  DialogActions,
  Typography,
  Dialog
} from '@mui/material';
import axios from 'axios';

//Contexto
import UserContext  from '../../../Context/UserContext';

//Iconos
import WarningIcon from '@mui/icons-material/Warning';

//Estilo
import styleError from '../../../Styled/ErorCSS';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CambiarEstado =(props)=>{
  const usercontext = useContext(UserContext);
  const classError = styleError();
  const [usuario, setUsuario]=useState();
  const [estado, setEstado]= useState();
  const [error, setError]= useState(false);

  //Component di mount
  useEffect(()=>{
    let formData = new FormData();
    formData.append("codigoReserva", usercontext.solicitud.cod_reserva)
    getDatosUsuario("reservas/solicitud/usuario-json/", formData)
    usercontext.setRespuesta({
		type:"",
		message:"",
		aprobado:false
    })
  },[])

  //Trae los datos del usuario que realizo la consulta
  const getDatosUsuario = async(direccion,data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setUsuario(promise)
  }

  //Manda los datos a servidor
  const sendEstadoSolicitud = async(direccion,data)=>{
    let promise = await  axios.post(props.url+direccion, data).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    usercontext.setRespuesta(promise)
  }
  
  //Cerrar ventana
  const handleClose =()=>{
    usercontext.setSolicitud(undefined)
    usercontext.setOpenSolicitud(false)
  }

  //Guarda el estado
  const guardarEstado=()=>{
    setError(false)
    if (estado !== undefined){
      let formData = new FormData()
      formData.append("codAdmin",usercontext.user.dui)
      formData.append("cod_reserva", usercontext.solicitud.cod_reserva)
      formData.append("estado", estado)
      usercontext.solicitud.estado_solicitud= estado
      sendEstadoSolicitud("reservas/cambiarestado/", formData)
      handleClose();
    }else{
      setError(true)
    }
  }

  return(
    <div>
      <Dialog
        minWidth="md"
        maxWidth="md"
        open={usercontext.openSolicitud}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent style={{marginLeft:'15px'}}>
          {usuario !== undefined ?
            <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 4, md: 5 }}>
              <Grid item xs={6}>
                <Typography variant="p">Docente que envio la solicitud:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usuario.nombre} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Materia que imparte</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_materia.nombre_materia} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Local que solicito:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_local.nombre_local} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">El local pertenece al edificio de:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_local.cod_edificio.nombre_edificio} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Horario que solicito la reserva:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_horario.cod_hora.hora_inicio} a {usercontext.solicitud.cod_horario.cod_hora.hora_fin} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Para el dia:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_horario.cod_dia.nombre_dia} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Estado de la solicitud:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.estado_solicitud} </Typography>
              </Grid>
              <Grid item xs={12}>
                {!props.solicitudRevisada && usercontext.user.admin &&
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Cambiar estado de solicitud</FormLabel>
                    <RadioGroup row aria-label="estado" name="row-radio-buttons-group" onChange={(e)=>{setEstado(e.target.value)}}>
                      <FormControlLabel value="Aprobado" control={<Radio />} label="Aprobado" />
                      <FormControlLabel value="Denegado" control={<Radio />} label="Denegado" />
                    </RadioGroup>
                    {error && <p className={classError.errors2}><WarningIcon/> Seleccione un local</p>}
                  </FormControl>
                }
              </Grid>
            </Grid>:
            <div style={{width: '100%', height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
              <CircularProgress/>
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={handleClose}>Cancelar</Button>
          { usercontext.user.admin && !props.solicitudRevisada&& 
          <Button 
            variant="outlined" 
            onClick={guardarEstado}>Actualizar estado</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CambiarEstado;
