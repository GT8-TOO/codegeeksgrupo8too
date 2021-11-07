import React, { useState,forwardRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  Rating,
  Slide,
  CircularProgress,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import axios from 'axios';

//Components
import Slider from '../../Sliders';
import Mapa from './Mapa';

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

const MostrarLocal = (props)=>{
  const userContext = useContext(UserContext);
  const [calificacion,setCalificacion]=useState();
  const [imagenesLocal, setImagenes]= useState();
  const [edificio, setEdificio]= useState([]);
  const [click, setClick] =useState(false);

  //Component dimount
  useEffect(()=>{
    let data= new FormData();
    data.append("codLocal",userContext.catalogoLocal.code);
    data.append("codEdificio",userContext.catalogoLocal.codEdificio);
    getDataImages("locales/solicitarimagenes-json/", data)
    getDataEdificio("locales/solicitaredificios-json/",data)
    userContext.setRespuesta({
		message:"",
      state:false,
      type:""
    })
    setCalificacion(userContext.catalogoLocal.calificacion)
  },[])

  //Trae las imagenes del local cuando se monta el componente
  const getDataImages =async(direccion, data)=>{
    let promise = await axios.post(props.url +direccion,data).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    setImagenes(promise)
  }

  //Trae la itnformacion del edificio
  const getDataEdificio = async(direccion, data)=>{
    let promise = await  axios.post(props.url+direccion,data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setEdificio(promise);
  }

  //Envia la nueva ponderacion del local
  const sendDataPonderacion = async (direccion, data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error);
    })
    userContext.setRespuesta(promise);
  }

  //Cierra la ventana flotante
  const handleClose = () => {
    userContext.setMostrarLocal(false);
    userContext.setCatalogo(undefined);
  };

  //Metodo que guarda el comentario del local
  const ponderacionUsuario = ()=>{
    handleClose();
    if (click ==="true"){
      let formData = new FormData();
      formData.append("nuevaValoracion",calificacion)
      formData.append("codLocal",userContext.catalogoLocal.code)
      formData.append("dui", userContext.user.dui)
      sendDataPonderacion("locales/nuevacalificacion/", formData);
    }
  }

  //Renderizado de HTML
  return(
    <div>
      <Dialog TransitionComponent={Transition} open={userContext.openLocal} fullWidth={true} width="xl" onClose={handleClose}>
        <DialogTitle>Informacion del local {userContext.catalogoLocal.label}</DialogTitle>
        {imagenesLocal !== undefined? <div>
          <DialogContent style={{marginLeft:'15px'}}>
            <div style={{display:'felx'}}>
              <Slider 
                inicio={false} 
                autoplay={false} 
                arrows={true}
                images={imagenesLocal}/>
              <Typography variant="subtitle1">Descripcion del local</Typography>
              <Typography variant="body1" color="text.secondary">{userContext.catalogoLocal.descripcion}</Typography>
              <br/>
              <div style={{display:'flex'}}>
                <Typography>Valorar el local:</Typography>
                <Rating
                  style={{marginLeft:'80px'}}
                  defaultValue={calificacion}
                  readOnly={click === "true" ? false : true}
                  onChange={(event, data)=>{
                    if(data!== null){
                      setCalificacion(data);
                      setClick(click+1);
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
              </div>
              <Typography variant="body2" color="text.secondary">(La calificación que se muestra es la que tiene el local actualmente)</Typography>
              <FormGroup>
                <FormControlLabel control={
                  <Checkbox 
                    onChange={(e)=>{click === "true" ? setClick(""):setClick("true") }}
                    />
                } label="Habilitar calificación del usuario" />
              </FormGroup>
              <br/>
              <br/>
              {edificio[0] !== undefined &&
              <Mapa
                edificio={edificio[0]}
              />
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="outlined" 
              onClick={handleClose}>Cerrar</Button>
             <Button 
              disabled={click ==="true" ? false: true}
              variant="outlined" 
              onClick={ponderacionUsuario}>Guardar nueva calificación</Button>
          </DialogActions>
        </div>:
        <div style={{width: '100%', height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
          <CircularProgress/>
        </div>
        }
      </Dialog>
    </div>
  );
}
export default MostrarLocal;
