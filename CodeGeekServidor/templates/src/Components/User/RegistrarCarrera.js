import React, { useEffect, useState, useContext } from 'react';
import {
  Typography,
  Slide,
  Button
} from '@mui/material';
import axios from 'axios';

//Components
import RegistrarPensum from './Carrera/RegistrarPensum';
import RegistrarCiclo from './Carrera/RegistrarCiclo';
import ConfirmacionEnvio from './Carrera/ConfirmacionEnvio';
import Notificacion from '../Notifiacion';

//Icons
import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

//Context
import UserContext from '../../Context/UserContext';

const RegistrarCarrera = (props)=>{
  const [slideChange, setSlide] = useState(0);
  const userContext = useContext(UserContext);

  //Component di mount
  useEffect(()=>{
    document.title="Registrar carrera";
    userContext.setRespuesta({
      message:"",
      state:false,
      creado:false,
      type:""
    })
  },[])

  //Siguiente componente
  const nextSlide =()=>{
    setSlide(slideChange+1);
    if(slideChange===2){
      setSlide(0);
      //Metodo guardar
    }
  }

  const sendDataCarrera =async(direccion,data)=>{
    userContext.setRespuesta({
      message:"",
      state:false,
      creado:false,
      type:""
    })
    let promise = await axios.post(props.url+direccion,data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    userContext.setRespuesta(promise)
  }

  //Componente anterior
  const previousSlide = ()=>{
    setSlide(slideChange-1);
  }

  //Metodo para enviar la informacion de la carrera
  const guardarCarrera =()=>{
    let formData = new FormData();
    //Informacion de la escuela
    formData.append("codEscuela", userContext.inputCarrerra[0].escuela.code)

    //Informacion de la carrera
    formData.append("carrera", userContext.inputCarrerra[0].data.carrera)
    formData.append("yearcarrer", userContext.inputCarrerra[0].data.yearcarrer)

    //Año de pensum
    formData.append("yearPensum", userContext.inputCarrerra[1].añoPensum)

    //Pensum
    formData.append("cantidad", userContext.inputCarrerra[1].pensum.length)
    for(let i=0; i < userContext.inputCarrerra[1].pensum.length; i++){
      formData.append("codMateria"+i, userContext.inputCarrerra[1].pensum[i].codigoMateria)
      formData.append("codMateriaRequisito"+i, userContext.inputCarrerra[1].pensum[i].codigoMateriaRequisito)
      formData.append("ciclo"+i, userContext.inputCarrerra[1].pensum[i].ciclo)
    }
    sendDataCarrera("materias/registrarcarrera/",formData)
  }

  return (
    <div>
      {userContext.respuesta.state && 
      <Notificacion
        state={userContext.respuesta.state}
        type={userContext.respuesta.type}
        message={userContext.respuesta.message}
      />}
      <Typography variant="h4">Ingresar Carrera</Typography>
      <div style={{marginTop:'30px'}}>
        <Slide 
          direction="left" 
          in={slideChange===0} 
          mountOnEnter 
          unmountOnExit><div><RegistrarPensum escuelas={props.escuelas} url={props.url}/></div></Slide>
        <Slide 
          direction="left" 
          in={slideChange===1} 
          mountOnEnter 
          unmountOnExit><div><RegistrarCiclo url={props.url}/></div></Slide>
        <Slide 
          direction="left" 
          in={slideChange===2} 
          mountOnEnter 
          unmountOnExit><div><ConfirmacionEnvio url={props.url}/></div></Slide>
      </div>
      <div style={{display:'flex', gap:'20px', marginTop:'40px'}}>
        {slideChange !==0 && 
          <Button 
            variant="contained" 
            startIcon={<NavigateBeforeIcon/>}
            style={{backgroundColor:'#01818A'}}
            onClick={previousSlide}>Anterior</Button>}
        {slideChange !==2 && userContext.button.enabled ?
          <Button 
            variant="contained"  
            endIcon={<NavigateNextIcon />}
            style={{backgroundColor:'#01818A'}}
            onClick={nextSlide}>Siguiente</Button>:
          <Button 
            variant="contained" 
            endIcon={<NavigateNextIcon />}
            disabled onClick={nextSlide}>Siguiente</Button>
        }
        {slideChange ===2 && 
          <Button 
            variant="contained" 
            style={{backgroundColor:'#01818A'}}
            endIcon={<SendIcon />}
            onClick={guardarCarrera}>Guardar</Button>}
      </div>
    </div>
  ); }

export default RegistrarCarrera;
