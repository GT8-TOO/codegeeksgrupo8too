import React, { useEffect } from 'react';
import {
  Slide,
  Avatar,
  CircularProgress,
  Typography
} from '@mui/material';
import portada from '../../Media/Minerva-Universidad-de-El-Salvador-UES.jpg';

const UserProfile =(props)=>{

  //Component Di mount
  useEffect(()=>{
    document.title="Perfil";
  }, [])

  return(
    <Slide direction="up" in={true}>
      <div>
        <Typography variant="h4">Perfil de usuario</Typography>
        {props.usuario !== undefined ? 
          <div style={{marginTop:'20px'}}>
            { /*eslint-disable-next-line*/}
            <img 
            style={{
              width:'170%',
              margin:'10px auto',
              height:300,
              borderRadius: '30px',
              }}
            src={portada}/>
            <div style={{display:'flex', margin:'10px 50px'}}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 100, height: 100}}
              />
              <Typography 
                style={{margin:'10px 20px', fontSize:'30px'}} 
                variant="overline" 
                display="block" 
                gutterBottom>
              {props.usuario[0].nombre} {props.usuario[0].apellidos}</Typography>
            </div>
            <div style={{borderRadius: '20px', boxShadow:'0px 0px 8px 1px #e3e3e3', width:'170%'}}>
              <div style={{margin:'50px 50px'}}>
                <br/>
                { /*eslint-disable-next-line*/}
                { props.escuelas !== undefined && props.escuelas.map((item)=>{
                  if(item.code ===props.usuario[0].cod_escuela){
                    return(
                      <Typography variant="subtitle1" gutterBottom component="div">El docente pertenece a la escuela de {item.label}</Typography>
                    )
                  }
                })
                }
                {
                  props.usuario[0].cod_escuela === '' && 
                    <Typography>El docente no tiene asignada una escuela</Typography>
                }
                <Typography>Email: {props.usuario[0].email}</Typography>
                <br/>
                <Typography>DUI:   {props.usuario[0].dui}</Typography>
                <br/>
                <Typography>NIT:   {props.usuario[0].nit}</Typography>
                <br/>
                <Typography>{props.usuario[0].email}</Typography>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          :<div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress/>
          </div>
        }
      </div>
    </Slide>
  );
}

export default UserProfile;
