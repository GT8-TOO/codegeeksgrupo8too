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
import { Link, Redirect } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

//Fecha
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

//ALerta
import WindowAlert from '../Components/WindowAlert';

//Style
import useStyles from '../Styled/RegisterCSS';
import errorStyles from '../Styled/ErorCSS';

//Icons
import WarningIcon from '@mui/icons-material/Warning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = (props) =>{
  const classes =useStyles();
  const classError = errorStyles();
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
  const [correoInstituciona, setCorreo]= useState(false);
  const [creado, setCreado] = useState(false);

  //Component di mount
  useEffect(()=>{
    document.title="Registrarse"
  },[])

  //Envia los datos a servidor
  const sendData=async(data, direccion)=>{
    axios.post(props.url+direccion, data).then((res)=>{
      setCreado(res.data);
    }).catch((error)=>{
    })
  }

  //Metodo que valida si la informacion ingresada es valida
  const registrarse =(data)=>{
    setFechaError(false)
    setPasswordI(true)
    setCorreo(false)
    var cadena = data.email;
    //if(calendarvalue instanceof Date && isFinite(calendarvalue)){
    if(calendarvalue instanceof Date && isFinite(calendarvalue)){
      if(data.password === data.cpassword && cadena.includes("@ues.edu.sv")){
        let fecha = calendarvalue.getDay() + "/" + calendarvalue.getMonth()+"/"+calendarvalue.getFullYear();
        //Mandar solicitud de metodos
        let formData= new FormData();
        formData.append("nombre", data.nombre);
        formData.append("apellidos", data.apellidos);
        formData.append("dui", data.dui);
        formData.append("nit", data.nit);
        formData.append("fechaNacimiento", fecha);
        formData.append("email", data.email)
        formData.append("password", data.password);
        sendData(formData, "user/register/")
      }else if(!cadena.includes("@ues.edu.sv")){
        setCorreo(true);
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

  //Contrase??a
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Confirmar contrase??a
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
        {creado.Creado ?<div> 
          <WindowAlert
            state={creado.Creado}
            type="success"
            title="Todo correcto"
            redirect="/login"
            message="El usuario ha sido creado correctamente"
          />
          {!creado.Creado && <Redirect to="/login"/>}
        </div>:
          <WindowAlert
            state={creado.Creado}
            type={creado.type}
            title={creado.title}
            message={creado.message}
          />
        }
        {fechaError &&<WindowAlert 
          state={fechaError}
          type="info"
          title="Falta la fecha"
          message="Debe de agregar la fecha de nacimiento, es un campo obligatorio"/>} 
        {!passwordIguales &&<WindowAlert
          state={!passwordIguales}
          type="warning"
          title="Verifique las contrase??as"
          message="Las contrase??as que ha proporcionado no coinciden. Vuelva a intentar."
        />}
        {correoInstituciona &&<WindowAlert
          state={correoInstituciona}
          type="warning"
          title="Datos erroneos"
          message="El correo que ha proporcionado no pertenece a la Universidad de El Salvador"
        />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
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
                  render={({message})=><p className={classError.errors}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="apellidos"
                  {...register("apellidos",{
                    required:{
                      value:true,
                      message:"Campo obligatorio, ingrese sus apellidos"
                    },
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="apellidos"
                  render={({message})=><p className={classError.errors}><WarningIcon/> {message}</p>}/>
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
                      message: "Solo tienen que ser n??meros"
                    },
                    maxLength: {
                      value: 9,
                      message: "Debe de tener 9 n??meros maximos"
                    },
                    minLength: {
                      value: 9,
                      message: "Debe de tener 9 n??meros m??nimos"
                    }
                  })}/>
                <ErrorMessage
                  errors={errors}
                  name="dui"
                  render={({message})=><p className={classError.errors2}><WarningIcon/> {message}</p>}/>
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
                      message: "Solo tienen que ser n??meros"
                    },
                    maxLength: {
                      value: 13,
                      message: "Debe de tener 13 n??meros"
                    },
                    minLength: {
                      value: 13,
                      message: "Debe de tener 13 n??meros"
                    }
                 })}/>
                <ErrorMessage
                  errors={errors}
                  name="nit"
                  render={({message})=><p className={classError.errors2}><WarningIcon/> {message}</p>}/>
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
                  render={({message})=><p className={classError.errors2}><WarningIcon/> {message}</p>}/>
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
                  render={({message})=><p className={classError.errors}><WarningIcon/> {message}</p>}/>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                <InputLabel>Contrase??a</InputLabel>
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
               render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel>Confirmar contrase??a</InputLabel>
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
              render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
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
              <Grid item>??Ya tenes una cuenta?  
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
