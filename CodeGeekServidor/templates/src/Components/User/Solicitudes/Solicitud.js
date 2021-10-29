import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

//UserContext
import UserContext from '../../../Context/UserContext';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Solicitud =(props)=> {
  const usercontext =useContext(UserContext);
  return (
    <Paper sx={{ p: 2, margin: '30px auto',width:'80%', minWidth: 700, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.local.url_img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.local.nombre_local}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Docente que hizo la solicitud
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.materia.nombre_materia}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.horario.cod_dia.nombre_dia} a las {props.horario.cod_hora.hora_inicio} a {props.horario.cod_hora.hora_fin}
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                sx={{ cursor: 'pointer' }} 
                onClick={(e)=> {
                  usercontext.setOpenSolicitud(true);
                  usercontext.setSolicitud(props.solicitud); 
                }} 
                variant="body2">
                Ver solicitud
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {props.estado}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Solicitud;
