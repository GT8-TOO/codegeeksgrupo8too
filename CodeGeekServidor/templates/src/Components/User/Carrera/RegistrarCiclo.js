import React, {useEffect, useContext, useState} from 'react';
import {
  Grid,
  TextField,
  FormControl,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography
} from '@mui/material';

//Components
import RegistrarMateria from './RegistrarMateria';

//Context
import UserContext from '../../../Context/UserContext';

//Estilo
import useStyles from '../../../Styled/RegistrarCicloCSS';
const RegistrarCiclo =()=>{
  const userContext = useContext(UserContext);
  const classes =useStyles();
  const [crearMateria, setCrearMateria]=useState(false);

  //Component di mount
  useEffect(async()=>{
    userContext.setButton({enabled:false})
    console.log(userContext);
  },[]);

  const openCrearMateria = (event)=>{
    setCrearMateria(true)
    console.log(crearMateria);
  }

  return(
    <div>
      <Typography variant="h5">Registrar Ciclo</Typography>
      <form>
        <Grid style={{marginTop:'10px'}} container rowSpacing={4} columnSpacing={1}>
          <Grid item xs={4}>
            <Typography variant="p">Año de creacion de pensum</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{width:'50%'}} 
              label="Pensum" 
              name="yearPensum"
              variant="outlined"/>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="p">Numero de ciclo</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{width:'50%'}} 
              label="Número de ciclo" 
              type="number"
              name="numeroCiclo"
              variant="outlined"/> 
          </Grid>
        </Grid>
        <div className={classes.div}>
          <form>
            <RegistrarMateria state={crearMateria}/>
            <Grid style={{marginLeft:'50px', marginTop:'25px'}} container rowSpacing={4} columnSpacing={1}>
            <Grid item xs={6}>
              <TextField
                sx={{width:'100%'}} 
                label="Materia" 
                name="nombreMateria"
                variant="outlined"/>
            </Grid>
            <Grid item xs={2}>
              <Button 
                onClick={openCrearMateria}
                style={{marginTop:'10px', marginLeft:'20px'}}>Crear una materia</Button>
            </Grid>
            <Grid item xs={2}>
              <Button 
                style={{marginTop:'10px', marginLeft:'20px'}}>Agregar materia a la lista</Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="p">Materia prerequisito</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{width:'80%'}} 
                label="Materia" 
                name="requisitoMateria"
                variant="outlined"/>
            </Grid>
            </Grid>
            <br/> 
          </form>
        </div>
      </form>
    </div>
  );

}
export default RegistrarCiclo;
