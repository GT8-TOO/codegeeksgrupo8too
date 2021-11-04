import React, {useEffect, useContext, useState} from 'react';
import {
  Slide,
  TextField,
  Box,
  Button,
  Typography
} from '@mui/material';
import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from  'axios';

//Component
import WindowAlert from  '../WindowAlert';

//Estilo
import errorStyles from '../../Styled/ErorCSS';

//Iconos
import WarningIcon from '@mui/icons-material/Warning';
import SendIcon from '@mui/icons-material/Send';

//Context
import UserContext from '../../Context/UserContext';

const SendEmail =(props)=>{
  const classError = errorStyles();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const usercontext = useContext(UserContext);
  const [notificiacion, setNotificacion]= useState({
    state:false,
    type:"",
    message:"",
    title:""
  })

  //Component di mount
  useEffect(()=>{
    document.title="Enviar correos"

  },[])

  //Manda la informacion a servidor
  const sendDataCorreo = async(direccion,data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    setNotificacion(promise)
  }

  //Metodo para enviar correos
  const enviarCorreo = (data)=>{
    let formData = new FormData();
    formData.append("email", data.email)
    formData.append("dui", usercontext.user.dui)
    formData.append("asunto", data.asunto)
    formData.append("cuerpo", data.cuerpo)
    sendDataCorreo("user/enviarcorreos/",formData)
  }

  return(
    <Slide direction="up" in={true}>
      <div>
        {notificiacion.state &&<WindowAlert
          state={notificiacion.state}
          title={notificiacion.title}
          type={notificiacion.type}
          message={notificiacion.message}
        />}
        <Typography variant="h4">Contactar con administrador</Typography>
        <form onSubmit={handleSubmit(enviarCorreo)} style={{width:800,marginTop:'50px'}}>
          <TextField 
            autoFocus
            fullWidth
            name="destinatario"
            type="email"
            label="Para:"
            {...register("destinatario", {
              required:{
                value:true,
                message:"Tiene que ingresar el correo de la persona a quien quiere contactar"
              }
            })}
          />
          <ErrorMessage 
            errors={errors} 
            name="destinatario"
            render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          <TextField 
            fullWidth
            name="asunto"
            style={{marginTop:'20px'}}
            label="Asunto:"
            {...register("asunto", {
              required:{
                value:true,
                message:"Es necesario ingresar un asunto para poder enviar el correo"
              }
            })}
          />
          <ErrorMessage 
            errors={errors} 
            name="asunto"
            style={{marginTop:'20px'}}
            render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          <TextField 
            fullWidth
            multiline
            rows={9}
            style={{marginTop:'20px'}}
            name="cuerpo"
            {...register("cuerpo", {
              required:{
                value:true,
                message:"No puede enviar correos vacios, tiene que ingresar la razon por la que esta contactando al administrador"
              }
            })}
          />
          <ErrorMessage 
            errors={errors} 
            name="cuerpo"
            render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          <Box  component="span" m={1} style={{ justifyContent: "flex-end",display: "flex"}}>
            <Button
              variant="contained" 
              style={{
                marginTop:'30px', 
                width:200,
                backgroundColor:'#01818A'}}
              type="submit"
              endIcon={<SendIcon/>}
            >Enviar</Button>
          </Box>
        </form>
      </div>
    </Slide>
  );
}
export default SendEmail;
