import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../Components/User/SlideBar';
//eslint-disable-next-line
import Footer from '../Components/Footer';
import { useParams, Redirect } from 'react-router-dom';

//Vistas pequeñas
import Inicio from '../Components/User/Inicio';
import UserProfile from '../Components/User/UserProfile';
import SolicitarLocal from '../Components/User/SolicitarLocal';
import RevisarSolicitudes from '../Components/User/RevisarSolicitudes';
import CatalogoLocales from '../Components/User/CatalogoLocales';
import ReporteLocales from '../Components/User/ReporteLocales';
import SendEmail from '../Components/User/SendEmail';

//Admin
import RegistrarCarrera from '../Components/User/RegistrarCarrera';
import ComenzarCiclo from '../Components/User/ComenzarCiclo';
import CrearAdministrador from '../Components/User/CrearAdministrador';


//Context
import UserContext  from '../Context/UserContext';

import axios from 'axios';

const User =(props)=>{
  const userContext = useContext(UserContext);
  const [local, setLocal]=useState();
  const [usuario, setUsuario]=useState();
  const [horarios, setHorarios] =useState();
  const [edificios, setEdificios]=useState();
  const [escuelas, setEscuelas]=useState();
  const [session, setSession]=useState(true);
  let { windows } =useParams();

  //Component di mount
  useEffect(()=>{
    //Valida al usuario si tiene session
    if(sessionStorage.getItem("dui")!== null && sessionStorage.getItem("token")!== null){
      setSession(true)
      cambiarUsuario("dui",sessionStorage.getItem("dui"))
      if (sessionStorage.getItem("admin")==='true'){
        cambiarUsuario("admin", true)
      }else{
        cambiarUsuario("admin", false)
      }
      cambiarUsuario("logeado", sessionStorage.getItem("logeado"))
      cambiarUsuario("token", sessionStorage.getItem("token"))
    }else{
      setSession(false);
    }

    userContext.setRespuesta({
      type:"",
      message:"",
      creado:false
    })

    //Trae los datos
    let data = new FormData();
    data.append("dui", sessionStorage.getItem("dui"));
    getDatosLocales("locales/solicitarlocales-json/");
    getDatosHorarios("reservas/solicitarhorarios-json/");
    getDatosEdificios("locales/solicitaredificios-json/");
    getDatosEscuelas("locales/solicitarescuelas-json/");
    getDatosUsuario("user/obtenerusuario-json/", data);
    //const socketConection = new WebSocket('ws://localhost:8000/ws/socketconnection/');
  },[])

  //Cambia el estado de userContext
  const cambiarUsuario=(clave, valor)=>{
    userContext.setUser(prevState=>{
      return {...prevState, [clave]:valor}
    })
  }
  
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

  //Trae la informacion del usuario
  const getDatosUsuario = async(direccion, data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error);
    })
    setUsuario(promise);
  }

  //Renderizado de HTML
  return(
    <div style={{display:'flex'}}>
      <SlideBar admin={userContext.user.admin}/>
      <div>
        {session ?
        <div style={{margin:'55px 40px'}}>
          {windows ==="home" && 
            <Inicio 
              local={local} 
              url={props.url}/>
          }
          {windows ==="profile" &&
            <UserProfile 
              escuelas={escuelas}
              usuario={usuario}
              url={props.url}/>
          }
          {windows ==="requestlocal" &&
            <SolicitarLocal 
              local={local}
              horarios={horarios} 
              url={props.url}/>
          }
          {windows ==="reviewrequest" &&
            <RevisarSolicitudes
              local={local}
              url={props.url}/>
          }
          {windows ==="local" &&
            <CatalogoLocales 
              local={local} 
              edificios={edificios}
              url={props.url}/>
          }
          {windows ==="report" &&
            <ReporteLocales
              local={local}
              url={props.url}
              />
          }
          {windows ==="sendemail" &&
            <SendEmail
              url={props.url}
              />
          }
          {(windows==="registercarrer" && userContext.user.admin ===true)&&
            <RegistrarCarrera 
              escuelas={escuelas}
              url={props.url}/>
          }
          {(windows ==="start" && userContext.user.admin ===true)&&
            <ComenzarCiclo
              url={props.url}
            />
          }
          {(windows ==="authorize" && userContext.user.admin===true)&&
            <CrearAdministrador 
              escuelas={escuelas}
              url={props.url} 
              direction="up"/>
          }
        </div>:
          <div>
            <Redirect to='/login'/>
          </div>
        }
        {/*<Footer/>*/}
      </div>
    </div>
  );
}

export default User;
