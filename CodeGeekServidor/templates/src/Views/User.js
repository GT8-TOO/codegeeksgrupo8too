import React, {useState, useEffect} from 'react';
import SlideBar from '../Components/User/SlideBar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';

const User =()=>{
  const [estado, setEstado] = useState("hola mundo");
  let { windows } =useParams();
  console.log(windows);
  const aumentar = ()=>{
    setEstado(1+estado);
  }

  useEffect(()=>{
    //socket
  })

  return(
    <div style={{display:'flex'}}>
      <SlideBar/>
      <div>
        {windows ==="home" &&<p>Aqui ira el inicio</p>}
        {windows ==="profile" &&<p>Aqui ira el perfil del usuario</p>}
        {windows ==="requestlocal" &&<p>Aqui podra solicitar local </p>}
        {windows ==="reviewrequest" &&<p>Aqui podra revisar solicitudes (todas)</p>}
        {windows ==="local" &&<p>Aqui mostrar los locales</p>}
        {windows ==="report" &&<p>Y aqui mostrar los reportes </p>}
        {windows ==="sendemail" &&<p>Aqui mandara emails</p>}
        <Footer/>
      </div>
    </div>
  );
}

export default User
