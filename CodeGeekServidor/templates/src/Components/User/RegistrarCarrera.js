import React, {useState, useContext} from 'react';
import {
  Typography,
  Slide,
  Button
} from '@mui/material';

//Components
import RegistrarPensum from './Carrera/RegistrarPensum';
import RegistrarCiclo from './Carrera/RegistrarCiclo';
import RegistrarMateria from './Carrera/RegistrarMateria';

//Context
import UserContext from '../../Context/UserContext';

const RegistrarCarrera = (props)=>{
  const [slideChange, setSlide] = useState(0);
  const userContext = useContext(UserContext);

  const nextSlide =()=>{
    setSlide(slideChange+1);
    if(slideChange===2){
      setSlide(0);
      //Metodo guardar
    }
  }

  const previousSlide = ()=>{
    setSlide(slideChange-1);
    console.log(userContext);
  }

  return (
    <div>
      <Typography variant="h4">Ingresar Carrera</Typography>
      <div style={{marginTop:'30px'}}>
        <Slide 
          direction="left" 
          in={slideChange===0} 
          mountOnEnter 
          unmountOnExit><div><RegistrarPensum url={props.url}/></div></Slide>
        <Slide 
          direction="left" 
          in={slideChange===1} 
          mountOnEnter 
          unmountOnExit><div><RegistrarCiclo url={props.url}/></div></Slide>
        <Slide 
          direction="left" 
          in={slideChange===2} 
          mountOnEnter 
          unmountOnExit><div><RegistrarMateria url={props.url}/></div></Slide>
      </div>
      <div style={{display:'flex', gap:'20px', marginTop:'40px'}}>
        {slideChange !==0 && <Button variant="contained" onClick={previousSlide}>Anterior</Button>}
        {slideChange !==2 && !userContext.button.enabled ?
          <Button variant="contained"  onClick={nextSlide}>Siguiente</Button>:
          <Button variant="contained" disabled onClick={nextSlide}>Siguiente</Button>
        }
        {slideChange ===2 && <Button variant="contained" onClick={nextSlide}>Guardar</Button>}
      </div>
    </div>
  ); }

export default RegistrarCarrera;
