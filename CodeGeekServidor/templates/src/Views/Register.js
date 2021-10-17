import React, { useState, useEffect } from 'react';
import {
  Avatar,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  IconButton,
  Button,
  Stack,
  TextField,
  Grid, 
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Link } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

//ALerta
import WindowAlert from '../Components/WindowAlert';

//Style
import useStyles from '../Styled/RegisterCSS';

//Icons
import WarningIcon from '@mui/icons-material/Warning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = (props) =>{
  const classes =useStyles();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [cvalues, setCValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [calendarvalue, setCalendarValue] = useState(new Date(''));
  const [fechaError, setFechaError]= useState(false);
  const [passwordIguales, setPasswordI]= useState(true);

  useEffect(()=>{
    document.title="Registrarse"
  },[])

  const sendData=async(data, direccion)=>{
    axios.post(props.url+direccion, data).then(res=>{
      console.log("Funciono");
    }).catch(error=>{
      console.log("Algo salio mal")
    })
  }

  const registrarse =(data)=>{
    setFechaError(false)
    setPasswordI(true)
    //if(calendarvalue instanceof Date && isFinite(calendarvalue)){
    if(calendarvalue instanceof Date && isFinite(calendarvalue)){
      if(data.password === data.cpassword){
        //Mandar solicitud de metodos
        let formData= new FormData();
        formData.append("nombre", data.name);
        formData.append("dui", data.dui);
        formData.append("nit", data.nit);
        formData.append("fechaNacimiento", calendarvalue);
        formData.append("email", data.email)
        formData.append("password", data.password);
        sendData(formData, "user/register/")
      }else{
        setPasswordI(false)
      }
    }else{
      setFechaError(true)
    }
  }

  //Calendario
  const handleChangeCalendar = (newValue) => {
    setCalendarValue(newValue);
  }

  //Contraseñe
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Confirmar contraseña
  const handleChangeC = (prop) => (event) => {
    setCValues({ ...cvalues, [prop]: event.target.value });
  };

  const handleClickShowCPassword = () => {
    setCValues({ ...cvalues, showPassword: !cvalues.showPassword });
  };

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };

 return (
    <div>
      <form onSubmit={handleSubmit(registrarse)}>
        {fechaError &&<WindowAlert 
          state={fechaError}
          type="info"
          title="Falta la fecha"
          message="Debe de agregar la fecha de nacimiento, es un campo obligatorio"/>} 
        {!passwordIguales &&<WindowAlert
          state={!passwordIguales}
          type="warning"
          title="Verifique las contraseñas"
          message="Las contraseñas que ha proporcionado no coinciden. Vuelva a intentar."
        />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: '#154c79' }}><LockOutlinedIcon /></Avatar>
          <br/>
          <Typography component="h1" variant="h5"> Registrarse </Typography>
          <br/><br/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  {...register("nombre",{
                    required:{
                      value:true,
                      message:"Campo obligatorio, ingrese su nombre"
                    },
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="nombre"
                  render={({message})=><p className={classes.errors}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DUI"
                  name="dui"
                  {...register("dui",{
                    required:{
                      value:true,
                      message:"Campo obligatorio, ingrese su dui"
                    },
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Solo tienen que ser números"
                    },
                    maxLength: {
                      value: 13,
                      message: "Debe de tener 13 números"
                    },
                    minLength: {
                      value: 9,
                      message: "Debe de tener 9 números"
                    }
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="dui"
                  render={({message})=><p className={classes.errors2}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nit"
                  label="NIT"
                  {...register("nit",{
                    required:{
                      value:true,
                      message:"Campo obligatorio, ingrese su NIT"
                    },
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Solo tienen que ser números"
                    },
                    maxLength: {
                      value: 13,
                      message: "Debe de tener 13 números"
                    },
                    minLength: {
                      value: 13,
                      message: "Debe de tener 13 números"
                    }
                 })}/>
                <ErrorMessage
                  errors={errors}
                  name="nit"
                  render={({message})=><p className={classes.errors2}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12}>
                <Stack spacin={3}>
                 <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Fecha de nacimiento"
                    inputFormat="MM/dd/yyyy"
                    value={calendarvalue}
                    name="calendar"
                    {...register("calendar",{
                      require:{
                        value:true,
                        message:"Campo, requerido, ingrese su fecha de nacimiento"
                      }
                   })} 
                    onChange={handleChangeCalendar}
                    renderInput={(params) => <TextField{...params}/>} />
                 </LocalizationProvider>
                  </Stack>
                  <ErrorMessage
                  errors={errors}
                  name="calendar"
                  render={({message})=><p className={classes.errors2}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Institucional"
                  name="email"
                  type="email"
                  {...register("email",{
                    required:{
                      value:true,
                      message:"Campo obligatorio, proporcione su correo institucional"
                    },
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({message})=><p className={classes.errors}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                <InputLabel>Contraseña</InputLabel>
                    <Input 
                        className={classes.text}
                        name="password"
                        style={{width:'390px '}}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}>
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
                          },
                        })}/>
             <ErrorMessage 
              errors={errors} 
              name="password"
               render={({message})=><p className={classes.errors}><WarningIcon/>{message}</p>}/>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel>Confirmar contraseña</InputLabel>
                    <Input 
                        className={classes.text}
                        name="cpassword"
                        style={{width:'390px '}}
                        id="standard-adornment-password"
                        type={cvalues.showPassword ? 'text' : 'password'}
                        onChange={handleChangeC('password')}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCPassword}
                                onMouseDown={handleMouseDownCPassword}>
                                {cvalues.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>}
                        {...register("cpassword",{
                            required:{
                                value:true,
                                message:"Campo obligatorio, no se puede dejar vacio"
                            },
                          minLength:{
                            value:8,
                            message:"Debe de tener una longuitud minima de 8 caracteres"
                          },
                        })}/>
            <ErrorMessage 
              errors={errors} 
              name="cpassword"
              render={({message})=><p className={classes.errors}><WarningIcon/>{message}</p>}/>
            </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant="contained"
              style={{backgroundColor:'#01818A'}}
              sx={{ mt: 3, mb: 2 }}>Registrarse</Button>
            <Button
              href="/"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#01818A'}}
              sx={{ mt: 3, mb: 2 }}>Cancelar</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>¿Ya tenes una cuenta?  
                <Link to="/login"> Iniciar sesion</Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
      </form>
    </div>
  );
}
export default Register;
