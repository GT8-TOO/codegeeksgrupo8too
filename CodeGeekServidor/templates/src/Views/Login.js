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
import { ErrorMessage } from '@hookform/error-message';
import {Link} from 'react-router-dom';
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

const Login =(props)=>{
  const classes =useStyles();
  const errorClass =errorStyle();
  const {register, formState:{errors}, handleSubmit} = useForm();
  //eslint-disable-next-line
  const [logeado, setLogeado]=useState(false);
  const [errorsLogear, setError] =useState(false);
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const sendDatos =async(data, direccion)=>{
    axios.post(props.url+ direccion, data).then(res=>{
      setLogeado(res.data.logeado)
    }).catch(error=>{
      setError(true);
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
      formData.append("estado", "Activo");
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
        <form onSubmit={handleSubmit(iniciarSesion)}>
          <div className={classes.root}>
            <WindowAlert 
              state={errorsLogear} 
              type="error" 
              title="¡Algo salio mal!"
              message="Por favor vuelva a ingresar sus datos, y si en dado caso no tiene cuenta puede crear una"/>
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
