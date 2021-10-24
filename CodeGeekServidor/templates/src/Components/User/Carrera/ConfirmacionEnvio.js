import React, {useContext} from 'react';
import {
  Grid,
  Typography
}from '@mui/material';

//Context
import UserContext from '../../../Context/UserContext';

//Componenentes
import TablaMaterias from './TablaMaterias';

const ConfirmacionEnvio =(props)=>{
  const userContext = useContext(UserContext);

  return(
    <div>
      <Typography variant="h5">Informacion ingresada</Typography>
      <Grid style={{marginTop:'10px'}} container rowSpacing={4} columnSpacing={1}>
        <Grid item xs={6}>
          <Typography variant="p">Nombre de la carrera:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">{userContext.inputCarrerra[0].data.carrera}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">Año de creación:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">{userContext.inputCarrerra[0].data.yearcarrer}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">Escuela que pertenecera:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">{userContext.inputCarrerra[0].escuela.label}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">Año de creacion de pensum:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p">{userContext.inputCarrerra[1].añoPensum}</Typography>
        </Grid>
      </Grid>
        <br/>
        <br/>
      <TablaMaterias rows ={userContext.inputCarrerra[1].pensum}/>
    </div>
  );
}

export default ConfirmacionEnvio;
