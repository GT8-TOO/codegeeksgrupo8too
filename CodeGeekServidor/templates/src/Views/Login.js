import React, {useState,useEffect} from 'react';
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
}from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import {Link} from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Style
import useStyles from '../Styled/LoginCSS';

const Login =(props)=>{
  const classes =useStyles();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [logeado, setLogeado]=useState(false);
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const sendDatos =async(data, direccion)=>{
    axios.post(props.url+ direccion, data).then(res=>{
      console.log(res.data);
      setLogeado(true);
      console.log(logeado);
    }).catch(error=>{
      console.log(error)
      console.log(logeado);
    })
  }

  //Component di mount
  useEffect(()=>{
    document.title="Iniciar sesion";
  },[])

  const iniciarSesion=(data)=>{
    let formData = new FormData();
    console.log(data);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("estado", "Activo");
    sendDatos(formData, "user/login/")
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
        <form onSubmit={handleSubmit(iniciarSesion)}>
          <div className={classes.root}>
            <Avatar className={classes.avatar} sx={{height:90, width:90 }} src="../Media/logo-avatar.jpg" />
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
              render={({message})=><p className={classes.errors}><WarningIcon/> {message}</p>}/>
            <FormControl>
                <InputLabel style={{marginLeft: '15px'}} >Contraseña</InputLabel>
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
              render={({message})=><p className={classes.errors}><WarningIcon/> {message}</p>}/>
            </FormControl>
            <Link href="/register">
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
                variant="contained" 
                onClick={iniciarSesion}>Volver al inicio</Button> 
          </div>
        </form>
    </div>
  );
}

export default Login;
