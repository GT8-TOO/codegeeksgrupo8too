import React, { useState,forwardRef, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  DialogTitle,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid
}from '@mui/material';
import Slide from '@mui/material/Slide';
import {useForm} from 'react-hook-form';
import WarningIcon from '@mui/icons-material/Warning';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

//Context
import UserContext  from '../../../Context/UserContext';

//style
import errorStyle from '../../../Styled/ErorCSS';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrarMateria =(props)=> {
  const userContext = useContext(UserContext);
  const errorClass =errorStyle();
  const {register, formState:{errors}, handleSubmit }= useForm();
  const [obligatoria, setObligatoria]=useState("si");

  const handleClose = () => {
    userContext.setCrearMateria(false)
  };

  const sendData = async(direccion, data)=>{
    let respuesta2 = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }) 
    console.log(respuesta2)
    userContext.setRespuesta(respuesta2)
  }

  const registrarMateria =(data)=>{
    userContext.setRespuesta({
		type:"",
		message:"",
		materiaGuardada:false
    })
    handleClose()
    let formData =new FormData();
    formData.append("codigoMateria",data.codigoMateria);
    formData.append("nombreMateria", data.nombreMateria);
    formData.append("unidadesValorativas", data.unidadesValorativas);
    formData.append("materiaObligatoria", obligatoria);
    sendData("materias/registrarMateria/", formData);
    console.log(userContext.respuesta)
  }

  const onChangeRadioButton =(event)=>{
    setObligatoria(event.target.value)
    console.log(obligatoria)
  }

  return (
    <div>
      <Dialog
        open={userContext.openMateria}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(registrarMateria)}>
        <DialogTitle id="alert-dialog-title">Registrar Materia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid sx={{marginTop:'20px'}} container rowSpacing={4} columnSpacing={1}>
              <Grid item xs={5}>
                <Typography variant="p">Codigo de la materia</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  label="Codigo materia" 
                  name="codigoMateria"
                  variant="outlined"
                  {...register("codigoMateria",{
                    required:{
                      value:true,
                      message:"Campo necesario, ingrese el codigoode la materia"
                    }
                })}/>
              <ErrorMessage 
                errors={errors} 
                name="codigoMateria"
                render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Nombre de la materia</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  label="Nombre materia" 
                  name="nombreMateria"
                  variant="outlined"
                  {...register("nombreMateria",{
                    required:{
                      value:true,
                      message:"Debe de ingresar el nombre de la materia"
                    },
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="nombreMateria"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Unidades valorativas</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  type="number"
                  min="0"
                  label="Unidades valorativas" 
                  name="unidadesValorativas"
                  variant="outlined"
                  {...register("unidadesValorativas",{
                    required:{
                      value:true,
                      message:"Debe de ingresar las unidades valorativas"
                    },
                    pattern:{
                      value: /^\d*[1-9]\d*$/,
                      message:"Solo deben de ser números positivos, sin contar el cero"
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="nombreMateria"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Obligatoria </Typography>
              </Grid>
              <Grid item xs={7}>
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="materiaObligatoria"
                      defaultValue="si"
                      onChange={onChangeRadioButton}>
                      <FormControlLabel value="si" control={<Radio />} label="Si" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type ='submit'>Guardar Materia</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default RegistrarMateria;
