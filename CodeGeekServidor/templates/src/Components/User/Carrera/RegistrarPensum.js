import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Grid,
  CircularProgress,
  Autocomplete,
  Button,
  TextField
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import {useForm} from 'react-hook-form';
import WarningIcon from '@mui/icons-material/Warning';

//CSS Error
import useStyles from '../../../Styled/ErorCSS'; 

//Context
import UserContext from '../../../Context/UserContext';

const RegistrarPensum =(props)=>{
  const classes = useStyles();
  const {register, formState:{errors}, handleSubmit}= useForm();
  const [escuelaV, setVacio]=useState({label:"", error:undefined});
  const userContext = useContext(UserContext);

  //Component di mount
  useEffect(async()=>{
  },[]);

  const ingresarPensum =(data)=>{
    if(escuelaV.error !==undefined){
      userContext.setButton({enabled:true})
      userContext.setCarrera({data, ...escuelaV})
    }else{
      setVacio({
        label:"",
        error:true 
      })
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit(ingresarPensum)}>
      <Typography variant="h5">Registrar pensum</Typography>
        {props.escuelas!== undefined ?
      <Grid style={{marginTop:'10px'}} container rowSpacing={4} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography variant="p">Nombre de la carrera</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField 
            sx={{width:300}} 
            autoFocus
            label="Carrera" 
            name="carrera"
            variant="outlined" 
            {...register("carrera",{
              required:{
                value:true,
                message:"Campo obligatorio ingrese una carrera"
              }
            })}
          />
           <ErrorMessage 
              errors={errors} 
              name="carrera"
             render={({message})=><p className={classes.errors} ><WarningIcon/> {message}</p>}/>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="p">Año de creación de la carrera</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField 
            sx={{width:300}} 
            type="number" 
            label="Año" 
            name="yearcarrer"
            variant="outlined" 
            {...register("yearcarrer", {
              required:{
                value:true,
                message:"Es necesario ingresar el año de creación"
              }
            })}/>
          <ErrorMessage
            errors={errors}
            name="year"
            render={({message})=><p className={classes.errors} ><WarningIcon/> {message}</p>}/>
        </Grid>
         <Grid item xs={4}>
          <Typography variant="p">Escuela que pertecenera</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            name="escuelas"
            options={props.escuelas}
            sx={{ width: 300 }}
            onChange={(_event, data)=>{
              if(data !== undefined){
                setVacio({
                  escuela:data,
                  error:false
                })
            }}}
            renderInput={(params) => <TextField {...params} label="Escuelas diponibles" />}/>
          <br/>
          {escuelaV.error && <p className={classes.errors} ><WarningIcon/>Tiene que ingresar a que escuela pertenecera</p>}
        </Grid>
      </Grid>:
      <div style={{width: '100%', height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
        <CircularProgress/>
      </div>
        }
        <Button
          sx={{marginTop:'-10px'}} 
          variant="outlined"
          type="submit">Registrar</Button>
      </form>
    </div>
  );
}

export default RegistrarPensum;
