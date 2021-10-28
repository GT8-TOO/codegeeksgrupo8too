import React, { useState,forwardRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  Rating,
  Slide,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from '@mui/material';
import { useForm } from 'react-hook-form';
import WarningIcon from '@mui/icons-material/Warning';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

//Style
import errorStyle from '../../../Styled/ErorCSS';

//Icons
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

//Context
import UserContext from '../../../Context/UserContext';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Muy desatisfecho',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Insastifecho',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Sastifecho',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Muy Satisfecho',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrarLocal = (props)=>{
  const errorClass =errorStyle();
  const userContext = useContext(UserContext);
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [calificacion,setCalificacion]=useState(2);
  const [numeroImagenes, setNumero] = useState(3);
  const [imagenes, setImagenes]=useState([]);

  //Component dimount
  useEffect(()=>{
    setCalificacion(2)
    setNumero(3)
  },[])

  //Cierra la ventana flotante
  const handleClose = () => {
    userContext.setCrearLocal(false);
  };

  const mandarDatos = async(direccion, data)=>{
    var promise = await axios.post(props.url+direccion, data,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    console.log(promise)
  }

  //Validara el form y mandara a llamar el metodo de envio
  const registrarLocal =(data)=>{
    handleClose()
    var formData = new FormData();
    formData.append("imagenes", imagenes[0])
    mandarDatos("locales/registrarlocal-json/", formData)
  }

  //Renderizado de HTML
  return(
    <div>
      <Dialog TransitionComponent={Transition} open={userContext.openLocal} maxWidth="md" onClose={handleClose}>
        <DialogTitle>Registrar un nuevo local</DialogTitle>
        <form onSubmit={handleSubmit(registrarLocal)}>
          <Grid  container spacing={1} >
            <DialogContent style={{marginLeft:'15px'}}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="codigoCarrera"
                  label="Codigo de carrera"
                  fullWidth
                  {...register("codigoCarrera", {
                    required:{
                      value:true,
                      message:"Debe de ingresar el codigo de la carrera"
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="codigoCarrera"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <TextField
                  name="nombreLocal"
                  label="Nombre del local"
                  fullWidth
                  {...register("nombreLocal",{
                    required:{
                      value:true,
                      message:"Ingrese el nombre del local" }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="nombreLocal"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <TextField
                  name="nombreEdificio"
                  label="Nombre del edificio"
                  fullWidth
                  {...register("nombreEdifico",{
                    required:{
                      value:true,
                      message:"Debe de dar ingresar el nombre del edificio que pertecenera"
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="nombreEdifico"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                />
              </Grid>
              <Grid xs={12} columnSpacing={3} style={{display:'flex', marginTop:'15px'}}>
                <Grid item xs={6}>
                  <TextField
                    name="nivel"
                    fullWidth
                    label="Nivel"
                    {...register("nivel",{
                      required:{
                        value:true,
                        message:"Ingrese el nivel donde se encuentra"
                      },
                      pattern:{
                        value: /^\d*[1-9]\d*$/,
                        message:"Solo deben de ser números positivos, sin contar el cero"
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="nivel"
                    render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                  />
               </Grid>
                <Grid item xs={6} style={{marginLeft:'10px'}}>
                  <TextField
                    name="altitud"
                    fullWidth
                    label="Altitud"
                    {...register("altitud",{
                      required:{
                        value:true,
                        message:"Debe de ingresar la altitud"
                      },
                      pattern:{
                        value: /^\d*[1-9]\d*$/,
                        message:"Solo deben de ser números positivos, sin contar el cero"
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="altitud"
                    render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                  />
               </Grid>
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <Typography variant="p">Calificacion del local:</Typography>
                <Rating
                  style={{marginLeft:'50px'}}
                  defaultValue={calificacion}
                  onChange={(event, data)=>{
                    if(data!== null){
                      setCalificacion(data);
                    }
                  }}
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly/>
                {customIcons[calificacion].label !== null &&
                  <Typography 
                    variant="p" 
                    style={{
                      color:'#686767',
                      marginLeft:'20px',
                      fontSize:'15px'}}
                  >{customIcons[calificacion].label}</Typography>
                }
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Cantidad de imagenes</FormLabel>
                  <RadioGroup 
                    row aria-label="numeroImagens" 
                    defaultValue={numeroImagenes} 
                    onChange={(event, data)=>{
                      setNumero(parseInt(data))
                    }}
                    name="row-radio-buttons-group">
                    <FormControlLabel value={3} control={<Radio />} label="Tres" />
                    <FormControlLabel value={4} control={<Radio />} label="Cuatro" />
                    <FormControlLabel value={5} control={<Radio />} label="Cinco" />
                  </RadioGroup>
                </FormControl>
                {
                  [...Array(numeroImagenes)].map((x, i)=>{
                    return(
                      <TextField
                        key={i}
                        id={i}
                        style={{marginTop:'10px'}}
                        fullWidth
                        onChange={(event,i)=>{
                          if(imagenes.length <numeroImagenes){
                            setImagenes([...imagenes,event.target.files]);
                         }else{
                            const aux = imagenes;
                            aux[event.target.id] = event.target.files;
                            setImagenes(aux);
                          }
                        }}
                        type="file"
                        accept=".jpg, .jpge, .png"
                      />
                    );
                  })
                }
              </Grid>
              <Grid item xs={12} style={{marginTop:'20px'}}>
                <TextField
                  name="descripcion"
                  label="Descripcion"
                  multiline
                  fullWidth
                  rows={4}
                  {...register("descripcion",{
                    required:{
                      value:true,
                      message:"Tiene que ingresar una descripcion del local"
                    },
                    maxLength:{
                      value:255,
                      message:"No tiene que ser mayor a 256 caracteres"
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="descripcion"
                  render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}
                />
             </Grid>
           </DialogContent>
            <Grid item xs={11.5}>
              <DialogActions>
                <Button 
                  variant="outlined" 
                  onClick={handleClose}>Cancelar</Button>
                <Button 
                  variant="outlined" 
                  type="submit">Guardar local</Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}
export default RegistrarLocal;
