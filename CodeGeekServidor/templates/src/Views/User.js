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
        {windows ==="home" &&<div><button onClick={aumentar}> Aumentar
        </button>
          <p>{estado}</p>
        </div>
        }
        {windows ==="report" &&<p>Hola mundo 2 </p>}
        <Footer/>
      </div>
    </div>
  );
}

export default User
