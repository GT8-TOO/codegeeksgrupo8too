import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../Components/User/SlideBar';
//eslint-disable-next-line
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';

import {
  Slide
} from '@mui/material';

//Vistas pequeñas
import Inicio from '../Components/User/Inicio';
import UserProfile from '../Components/User/UserProfile';
import SolicitarLocal from '../Components/User/SolicitarLocal';
import CatalogoLocales from '../Components/User/CatalogoLocales';
import RegistrarCarrera from '../Components/User/RegistrarCarrera';
import CrearAdministrador from '../Components/User/CrearAdministrador';

//Context
import UserContext  from '../Context/UserContext';

import axios from 'axios';

const User =(props)=>{
  const userContext = useContext(UserContext);
  const [local, setLocal]=useState();
  const [horarios, setHorarios] =useState();
  const [edificios, setEdificios]=useState();
  const [escuelas, setEscuelas]=useState();
  let { windows } =useParams();

  //Component di mount
  useEffect(()=>{
    //Trae los datos
    getDatosLocales("locales/solicitarlocales-json/")
    getDatosHorarios("reservas/solicitarhorarios-json/")
    getDatosEdificios("locales/solicitaredificios-json/");
    getDatosEscuelas("locales/solicitarescuelas-json/");
    //const socketConection = new WebSocket('ws://localhost:8000/ws/socketconnection/');
  },[])

  
  //Manda a trare los datos de los locales 
  const getDatosLocales =async(direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=> {
      console.log(error);
    })
    setLocal(promise);
  }

  //Trae los horarios
  const getDatosHorarios = async(direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    setHorarios(promise)
  }

  //Trae los datos del edicio
  const getDatosEdificios = async(direccion) => {
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    });
    setEdificios(promise)
  }

  //Trae los datos de escuelas
  const getDatosEscuelas = async(direccion) => {
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    });
    setEscuelas(promise);
  }

  //Renderizado de HTML
  return(
    <div style={{display:'flex'}}>
      <SlideBar admin={userContext.user.admin}/>
      <div>
        <div style={{margin:'55px 40px'}}>
          {windows ==="home" && 
            <Inicio 
              local={local} 
              url={props.url}/>
          }
          {windows ==="profile" &&
            <UserProfile 
            url={props.url}/>
          }
          {windows ==="requestlocal" &&
            <SolicitarLocal 
              local={local}
              horarios={horarios} 
              url={props.url}/>
          }
          {windows ==="reviewrequest" &&
            <Slide direction="left" in={true}>
              <p>Aqui podra revisar solicitudes (todas)</p>
            </Slide>
          }
          {windows ==="local" &&
            <CatalogoLocales 
              local={local} 
              edificios={edificios}
              url={props.url}/>
          }
          {windows ==="report" &&
            <p>Y aqui mostrar los reportes </p>
          }
          {windows ==="sendemail" &&
            <p>Aqui mandara emails</p>
          }
          {(windows==="registercarrer" && userContext.user.admin ===true)&&
            <RegistrarCarrera 
              escuelas={escuelas}
              url={props.url}/>
          }
          {(windows ==="start" && userContext.user.admin ===true)&&
            <p>Aqui comenzara ciclo</p>
          }
          {(windows ==="authorize" && userContext.user.admin===true)&&
            <CrearAdministrador 
              escuelas={escuelas}
              url={props.url} 
              direction="up"/>
          }
        </div>
        {/*<Footer/>*/}
      </div>
    </div>
  );
}

export default User;
