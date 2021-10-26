import React, { useEffect, useContext } from 'react';
import SlideBar from '../Components/User/SlideBar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';

//eslint-disable-nextline
import Fade from '@mui/material/Fade';
import {Slide, Zoom} from '@mui/material';

//Vistas pequeñas
import CatalogoLocales from '../Components/User/CatalogoLocales';
import RegistrarCarrera from '../Components/User/RegistrarCarrera';
import UserProfile from '../Components/User/UserProfile';
import CrearAdministrador from '../Components/User/CrearAdministrador';

//Context
import UserContext  from '../Context/UserContext';

const User =(props)=>{
  const userContext = useContext(UserContext);
  let { windows } =useParams();

  //Efecto de trasfondo
  useEffect(()=>{
    //socket
    const socketConection = new WebSocket('ws://localhost:8000/ws/socketconnection/');
  })

  //Renderizado de HTML
  return(
    <div style={{display:'flex'}}>
      <SlideBar admin={userContext.user.admin}/>
      <div>
        <div style={{margin:'55px 40px'}}>
          {windows ==="home" &&<Slide direction="up" in={true}><p>Aqui ira el inicio</p></Slide>}
          {windows ==="profile" &&<UserProfile/>}
          {windows ==="requestlocal" &&<Zoom in={true}><p>Aqui podra solicitar local </p></Zoom>}
          {windows ==="reviewrequest" &&<Slide direction="left" in={true}><p>Aqui podra revisar solicitudes (todas)</p></Slide>}
          {windows ==="local" &&<CatalogoLocales url={props.url}/>}
          {windows ==="report" &&<p>Y aqui mostrar los reportes </p>}
          {windows ==="sendemail" &&<p>Aqui mandara emails</p>}
          {(windows==="registercarrer" && userContext.user.admin ===true)&&<RegistrarCarrera url={props.url}/>}
          {(windows ==="start" && userContext.user.admin ===true)&&<p>Aqui comenzara ciclo</p>}
          {(windows ==="authorize" && userContext.user.admin===true)&&<CrearAdministrador url={props.url} direction="up"/>}
        </div>
        {/*<Footer/>*/}
      </div>
    </div>
  );
}

export default User;
