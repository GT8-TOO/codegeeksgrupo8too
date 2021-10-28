import React, {useEffect, useState, useContext} from 'react';
import { 
  Typography,
  Autocomplete,
  CircularProgress,
  TextField,
  Slide,
  Button
} from '@mui/material';
import WindowAlert from '../WindowAlert';
import CardLocal from './Locales/CardLocal';
import RegistrarLocal from './Locales/RegistrarLocal';

//Iconos
import AddIcon from '@mui/icons-material/Add';

//Context
import UserContext from '../../Context/UserContext';

const CatalogoLocales =(props)=>{
  const userContext = useContext(UserContext);
  const [edificioActual, setEdificio]=useState(null);

  //Component di mount
  useEffect(async()=>{
    document.title="Catalogo de locales";
    userContext.setCodigoLocal(undefined)
  },[]);

  const openDialogClick = () => {
    userContext.setCrearLocal(true);
  };

  return(
    <Slide direction="up" in={true}>
      <div>
        <WindowAlert 
          state={props.error} 
          type={"warning"} 
          title="Pasó algo inesperado" 
          message="No se ha podido comunicar con el servidor de manera correcta, puede ser problema de conexion o de el servidor, espere mientras se arregla."/>
        {userContext.openLocal &&<RegistrarLocal url={props.url}/>}
        <Typography variant="h4">Catálogo de locales de la Facultad de Ingeniería y Arquietectura</Typography>
        { props.edificios !== undefined && props.local !== undefined ?
          <div style={{width:'100%'}}>
            <div style={{display:'flex', gap:'20px', margin:'1px auto'}}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={props.edificios}
                sx={{marginTop:5, width: 300 }}
                renderInput={(params) => <TextField {...params} label="Edificios disponibles" />}
                onChange={(_event, newLocal) => {
                  setEdificio(newLocal);
                }}
              />
              {(userContext.user.admin && props.edificios !== undefined)&&
                <Button 
                  variant="contained" 
                  onClick={openDialogClick}
                  style={{backgroundColor:'#01818A'}}
                  startIcon={<AddIcon/>}
                  sx={{marginTop:'40px'}}>Registrar nuevo Local</Button>
              }
            </div>
            <br/>
            {edificioActual!==null && 
              <Typography variant="p">Se encuentra viendo {edificioActual.label}</Typography>}
            <div style={{display:'flex', gap:'30px', width:'100%',flexWrap:'wrap',marginTop:'30px'}}>
              { edificioActual === null &&props.local.map((item)=>{
                return(
                  <CardLocal local={item}/>
                );
                })
              }
              {/*eslint-disable-next-line*/}
              {edificioActual !== null && props.local.map((item)=>{
                if(edificioActual.code ===item.codEdificio){
                  return(
                    <CardLocal local={item}/>
                  );
                }
              })}
            </div>
          </div>:
          <div style={{width: '100%', height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress/>
          </div>
        } 
      </div>
    </Slide>
  );
}

export default CatalogoLocales;
