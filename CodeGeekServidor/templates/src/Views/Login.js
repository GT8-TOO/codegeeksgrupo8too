import React, {useState,useEffect, useContext} from 'react';
import{
    TextField,
    FormControl,
    InputLabel,
    Avatar,
    IconButton,
    Input,
    InputAdornment,
    Typography,
    Button
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {Link, Redirect} from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
import LogoAvatar from '../Media/logo-avatar.jpg';
import WindowAlert from '../Components/WindowAlert';

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Style
import useStyles from '../Styled/LoginCSS';
import errorStyle from '../Styled/ErorCSS';

//Context
import UserContext  from '../Context/UserContext';

const Login =(props)=>{
  const classes =useStyles();
  const userContext = useContext(UserContext);
  const errorClass =errorStyle();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [errorsLogear, setError] =useState([]);
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const sendDatos =async(formData, direccion, event)=>{
    setError([])
    var data = await axios.post(props.url+ direccion, formData).then(res=>{
      return res.data;
    }).catch(error=>{
      setError(true);
    })
    if(data.logeado===true){
      cambiarUsuario("dui",data.dui)
      cambiarUsuario("admin", data.admin)
      cambiarUsuario("logeado", data.logeado)
    }else{
      cambiarUsuario("logeado", data.logeado)
      setError(data)
    }
  }
  
  //Cambia el estado de userContext
  const cambiarUsuario=(clave, valor)=>{
    userContext.setUser(prevState=>{
      return {...prevState, [clave]:valor}
    })
  }

  //Component di mount
  useEffect(()=>{
    document.title="Iniciar sesion";
  },[])

  const iniciarSesion=(data)=>{
    if(data.email!== undefined && data.password!==undefined){
      let formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      sendDatos(formData, "user/login/")
    }
  }
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {userContext.user.logeado && <Redirect to ='user/home'/>}
      {errorsLogear.logeado === false &&
        <WindowAlert 
          state={!errorsLogear.logeado} 
          type={errorsLogear.type} 
          title={errorsLogear.title}
          message={errorsLogear.message}/>
      }
        <form onSubmit={handleSubmit(iniciarSesion)}>
          <div className={classes.root}>
            <Avatar className={classes.avatar} sx={{height:120, width:90 }} src={LogoAvatar} />
            <Typography className={classes.mensaje} variant="h4">Bienvenido</Typography>
            <Typography className={classes.mensaje} variant="h7">Ingrese sus datos para poder acceder a su cuenta</Typography>
            <TextField 
                className={classes.text} 
                type="email"
                name="email"
                label="Correo electronico"  
                {...register("email",{
              required: {
                value:true,
                message:"Campo requerido, ingrese el correo electronico"
              },
          })}/>
            <ErrorMessage 
              errors={errors} 
              name="email"
              render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}/>
            <FormControl>
              <InputLabel >Contraseña</InputLabel>
                    <Input 
                        className={classes.textf}
                        name="password"
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>}
                        {...register("password",{
                            required:{
                                value:true,
                                message:"Campo obligatorio, no se puede dejar vacio"
                            },
                          minLength:{
                            value:8,
                            message:"Debe de tener una longuitud minima de 8 caracteres"
                          }
                        })}/>
             <ErrorMessage 
              errors={errors} 
              name="password"
              render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}/>
            </FormControl>
            <Link to="/register">
              <Typography variant="p">Crear una cuenta</Typography>
            </Link>
            <Button 
                type ='submit' 
                style={{backgroundColor:'#01818A'}}
                variant="contained" 
                onClick={iniciarSesion}>Ingresar</Button> 
            <Button 
                href ='/' 
                style={{backgroundColor:'#01818A'}}
                variant="contained" >Volver al inicio</Button> 
          </div>
        </form>
    </div>
  );
}

export default Login;
