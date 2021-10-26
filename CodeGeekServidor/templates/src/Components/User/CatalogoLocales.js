import React, {useEffect, useState, useContext} from 'react';
import { 
  Typography,
  Autocomplete,
  TextField,
  Slide,
  Button
} from '@mui/material';
import axios from 'axios';
import WindowAlert from '../WindowAlert';
import CardLocal from './Locales/CardLocal';
import RegistrarLocal from './Locales/RegistrarLocal';

//Context
import UserContext from '../../Context/UserContext';

const CatalogoLocales =(props)=>{
  const userContext = useContext(UserContext);
  const [edificios, setEdificios]=useState();
  const [local, setLocales]=useState()
  const [edificioActual, setEdificio]=useState(null);
  const [error, setError]=useState(false)

  //Component di mount
  useEffect(async()=>{
    document.title="Catalogo de locales";
    var edi = await getDatosEdificios("locales/solicitaredificios-json/");
    var loc = await getDatosLocales("locales/solicitarlocales-json/");
    if(error===false){
      setEdificios(edi)
      setLocales(loc)
    }
  },[]);

  //Solicitar datos a servidor
  const getDatosEdificios = async(direccion) => {
    var promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((erro)=>{
      setError(true);
    });
    return promise;
  }

  const getDatosLocales =async(direccion)=>{
    var promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      setError(true);
    })
    return promise;
  }

  const openDialogClick = () => {
    userContext.setCrearLocal(true);
  };

  return(
    <Slide direction="up" in={true}>
      <div>
        <WindowAlert 
          state={error} 
          type={"warning"} 
          title="Pasó algo inesperado" 
          message="No se ha podido comunicar con el servidor de manera correcta, puede ser problema de conexion o de el servidor, espere mientras se arregla."/>
        {userContext.openLocal &&<RegistrarLocal url={props.url}/>}
        <Typography variant="h4">Catálogo de locales de la Facultad de Ingeniería y Arquietectura</Typography>
        <div style={{display:'flex', gap:'20px', margin:'1px auto'}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={edificios}
            sx={{marginTop:5, width: 300 }}
          renderInput={(params) => <TextField {...params} label="Escuelas diponibles" />}
          onChange={(_event, newLocal) => {
              setEdificio(newLocal);
            }}
          />
          {userContext.user.admin &&
          <Button 
            variant="outlined" 
            onClick={openDialogClick}
            sx={{marginTop:'40px'}}>Registrar nuevo Local</Button>
          }
        </div>
        <br/>
        {edificioActual!==null && <Typography variant="p">Se encuentra viendo {edificioActual.label}</Typography>}
        <div style={{display:'flex',marginTop:'30px'}}>
          {(local!== undefined && edificioActual===null) && local.map((item)=>{
            return(
              <CardLocal local={item}/>
            );
          })
          }
          {edificioActual !== null && local.map((item)=>{
            if(edificioActual.code ===item.cod_edificio_id){
              return(
                <CardLocal local={item}/>
              );
            }
          })}
        </div>
      </div>
    </Slide>
  );
}

export default CatalogoLocales;
