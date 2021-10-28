import React, { useState, useEffect, forwardRef, useContext } from 'react';
import {
  Slide,
  DialogTitle,
  Grid,
  CircularProgress,
  DialogContent,
  Button,
  DialogActions,
  Typography,
  Dialog
} from '@mui/material';
import axios from 'axios';
import UserContext  from '../../../Context/UserContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CambiarEstado =(props)=>{
  const usercontext = useContext(UserContext);
  const [usuario, setUsuario]=useState();

  //Component di mount
  useEffect(()=>{
    let formData = new FormData();
    console.log(usercontext.solicitud)
    formData.append("codigoReserva", usercontext.solicitud.cod_reserva)
    getDatosUsuario("reservas/solicitud/usuario-json/", formData)
  },[])

  //Trae los datos del usuario que realizo la consulta
  const getDatosUsuario = async(direccion,data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
    })
    setUsuario(promise)
  }
  
  //Cerrar ventana
  const handleClose =()=>{
    usercontext.setSolicitud(undefined)
    usercontext.setOpenSolicitud(false)
  }

  //Guarda el estado
  const guardarEstado=()=>{
    console.log("Estado guardado")
    handleClose();
  }

  return(
    <div>
      <Dialog
        minWidth="md"
        maxWidth="md"
        open={usercontext.openSolicitud}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <DialogTitle>Cambiar estado de solicitud</DialogTitle>
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
                <Typography variant="p">Para el dia de:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_horario.cod_dia.nombre_dia} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">Para el dia de:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p">{usercontext.solicitud.cod_horario.cod_dia.nombre_dia} </Typography>
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
          { usercontext.user.admin && 
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
