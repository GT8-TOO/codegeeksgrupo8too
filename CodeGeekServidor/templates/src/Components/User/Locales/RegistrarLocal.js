import React, { useState,forwardRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  Autocomplete,
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
  const [edificioActual, setEdificio]= useState();

  //Component dimount
  useEffect(()=>{
    setCalificacion(2)
    setNumero(3)
    userContext.setRespuesta({
		message:"",
      state:false,
      type:""
    })
  },[])

  //Cierra la ventana flotante
  const handleClose = () => {
    userContext.setCrearLocal(false);
  };

  const mandarDatos = async(direccion, data)=>{
    var promise = await axios.post(props.url+direccion, data,{
      headers: {
        'accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    console.log(promise)
    userContext.setRespuesta(promise)
  }

  //Validara el form y mandara a llamar el metodo de envio
  const registrarLocal =(data)=>{
    handleClose()
   
    if (edificioActual !== null && edificioActual !== undefined){
      let formData = new FormData();
      formData.append('codigoLocal',data.codigoLocal)
      formData.append('nombreLocal',data.nombreLocal)
      formData.append('codEdificio',edificioActual.code)
      formData.append('nivel',data.nivel)
      formData.append('altitud',data.altitud)
      formData.append('calificacion',calificacion)
      formData.append('descripcionLocal',data.descripcion)
      formData.append('cantidadImagenes', numeroImagenes)
      for (let i=0; i < numeroImagenes; i++){
        formData.append('imagenes'+i, imagenes[i], imagenes[i].name)
      }
      //formData.append('cover', cover, cover.name); //TOQUE
      mandarDatos("locales/registrarlocal-json/", formData)
    }
  }

  //Renderizado de HTML
  return(
    <div>
      <Dialog TransitionComponent={Transition} open={userContext.openCrearLocal} maxWidth="md" onClose={handleClose}>
        <DialogTitle>Registrar un nuevo local</DialogTitle>
        <form onSubmit={handleSubmit(registrarLocal)}>
          <Grid  container spacing={1} >
            <DialogContent style={{marginLeft:'15px'}}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="codigoLocal"
                  label="Codigo del local"
                  fullWidth
                  {...register("codigoLocal", {
                    required:{
                      value:true,
                      message:"Debe de ingresar el codigo del local"
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="codigoLocal"
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
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  options={props.edificios}
                  sx={{marginTop:5 }}
                  renderInput={(params) => <TextField {...params} label="Edificios disponibles" />}
                  onChange={(_event, newLocal) => {
                    setEdificio(newLocal);
                 }}
                />
                {edificioActual===null && <p className={errorClass.errors2}><WarningIcon/> Seleccione un edifcio </p>}
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
                <br/>
                <Typography variant="p">La imagen en el primer puesto se mostrara por defecto en el catalogo</Typography>
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
                            let aux = imagenes;
                            aux[event.target.id] = event.target.files[0];
                            setImagenes(aux);
                         }else{
                            let aux = imagenes;
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
