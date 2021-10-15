import React, { useEffect} from 'react';
import SlideBar from '../Components/User/SlideBar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import {Slide, Zoom} from '@mui/material';

const User =()=>{
  let { windows } =useParams();

  useEffect(()=>{
    //socket
  })

  return(
    <div style={{display:'flex'}}>
      <SlideBar/>
      <div>
        {windows ==="home" &&<Slide direction="up" in={true}><p>Aqui ira el inicio</p></Slide>}
        {windows ==="profile" &&<Fade in={true}><p>Aqui ira el perfil del usuario</p></Fade>}
        {windows ==="requestlocal" &&<Zoom in={true}><p>Aqui podra solicitar local </p></Zoom>}
        {windows ==="reviewrequest" &&<Slide direction="left" in={true}><p>Aqui podra revisar solicitudes (todas)</p></Slide>}
        {windows ==="local" &&<p>Aqui mostrar los locales</p>}
        {windows ==="report" &&<p>Y aqui mostrar los reportes </p>}
        {windows ==="sendemail" &&<p>Aqui mandara emails</p>}
        <Footer/>
      </div>
    </div>
  );
}

export default User
