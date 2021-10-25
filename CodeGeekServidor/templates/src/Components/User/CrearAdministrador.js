import React, { useEffect, useState} from 'react';
import {
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
  Slide
} from '@mui/material';
import axios from 'axios';
import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

//Component
import WindowAlert from '../WindowAlert';

//Fecha
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

//Estilo
import errorStyles from '../../Styled/ErorCSS';

//Iconos
import WarningIcon from '@mui/icons-material/Warning';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CrearAdministrador =(props)=>{
  const classError = errorStyles();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [escuelas, setEscuelas]=useState();
  const [escuelaElegida, setEscuelaElegida]=useState();
  const [calendarvalue, setCalendarValue] = useState(new Date(''));
  const [error, setError]=useState(false);
  const [escuelaVacia, setVacio]=useState(false);
  const [creado, setCreado]=useState();
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
  const [notificacion, setNoticacion]=useState({
    type:"",
    title:"",
    state:false,
    message:""
  })
 
  //Component Di mount
  useEffect(async()=>{
    document.title="Crear administrador";
    var prueba = await getDatos("locales/solicitarescuelas-json/");
    if(error===false){
      setEscuelas(prueba)
    }
  },[]);

  //Solicitar datos a servidor
  const getDatos = async(direccion) => {
    var promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((erro)=>{
      setError(true);
    });
    return promise;
  }

  //Madnar informacion del admin a servidor
  const senDataAdmin =async(direccion, data)=>{
    var promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    console.log(promise)
  }

  //Calendario
  const handleChangeCalendar = (newValue) => {
    setCalendarValue(newValue);
  }


  //Metodo que valida a administrador
  const registrarAdministrador =(data)=>{
    setCreado();
    setNoticacion({
      type:"",
      state:false,
      title:"",
      message:""
    })
    if(calendarvalue instanceof Date && isFinite(calendarvalue)){
      if(data.password === data.cpassword && data.email.includes("@ues.edu.sv") && escuelaElegida!== undefined){
        let fecha = calendarvalue.getDay() + "/" + calendarvalue.getMonth()+"/"+calendarvalue.getFullYear();
        var formData = new FormData();
        formData.append("nombre", data.nombreAdmin);
        formData.append("apellidos", data.apellidoAdmin);
        formData.append("dui",data.dui);
        formData.append("nit", data.nit);
        formData.append("fechaNacimiento", fecha)
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("codigoEscuela",escuelaElegida.code);
        senDataAdmin('user/admin/', formData)
      }else if(data.password !== data.cpassword){
        //Si contraseñas no son iguales
        setNoticacion({
          type:"warning",
          state:true,
          title:"Las contraseñas no coinciden",
          message:"Las contraseñas que ha brindado no son iguales, corrigalo y vuelva a intentarlo"
        })
      }else if(!data.email.includes("@ues.edu.sv")){
        //Si no es correo institucional
        setNoticacion({
          type:"warning",
          state:true,
          title:"Correo invalido",
          message:"El correo que ingrese tiene que ser un correo institucional"
        })
      }else if(escuelaElegida === undefined){
        //Escuelas vacia o sin escuela
        setVacio(true);
        setNoticacion({
          type:"warning",
          state:true,
          title:"Escuelas vacias",
          message:"Tiene que asociarlo a una escuela, sino no puede ser un administrador"
        })

      }
    }else{
      //Fecha invalida
      setNoticacion({
        type:"warning",
        state:true,
        title:"Fecha no valida",
        message:"Debe de elegir de naciemiento de la persona, con un formato valido "
      })
    }
  }

  //Contraseña
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


  //Renderizado de HTML
  return(
    <Slide direction={props.direction} in={true}>
      <form onSubmit={handleSubmit(registrarAdministrador)}>
        {notificacion.state && <WindowAlert
          state={notificacion.state}
          title={notificacion.title}
          message={notificacion.message}
          type={notificacion.type}
        />}
        {creado !==undefined &&
          <WindowAlert
            state={creado.Creado}
            type={creado.type}
            title={creado.title}
            message={creado.message}
          />
        }
        <Typography variant="h5">Crear administrador</Typography>
        <Grid container rowSpacing={2} style={{marginTop:'20px'}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="p">Nombre del adminsitrador</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              name="nombreAdmin"
              fullWidth
              {...register("nombreAdmin", {
                required:{
                  value:true,
                  message:"Debe de ingresar el nombre del administrador"
                }
              })}
            />
            <ErrorMessage 
              errors={errors} 
              name="nombreAdmin"
              render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p">Apellido del adminsitrador</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="apellidoAdmin"
              fullWidth
              {...register("apellidoAdmin", {
                required:{
                  value:true,
                  message:"Debe de ingresar el apellido del administrador"
                }
              })}
            />
           <ErrorMessage 
              errors={errors} 
              name="apellidoAdmin"
              render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p">Correo del adminsitrador</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              type="email"
              fullWidth
              {...register("email", {
                required:{
                  value:true,
                  message:"Debe de ingresar un correo para el administrador"
                }
              })}
            />
           <ErrorMessage 
              errors={errors} 
              name="email"
              render={({message})=><p className={classError.errors}><WarningIcon/>{message}</p>}/>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="dui"
              label="Dui"
              fullWidth
              {...register("dui",{
                required:{
                  value:true,
                  message:"Campo obligatorio, ingrese su DUI"
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Solo tienen que ser números"
                },
                maxLength: {
                  value: 9,
                  message: "Debe de tener 9 números"
                },
                minLength: {
                  value: 9,
                  message: "Debe de tener 9 números"
                }
              })}
             type="number"
            />
            <ErrorMessage
              errors={errors}
              name="dui"
              render={({message})=><p className={classError.errors2}><WarningIcon/> {message}</p>}/>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="nit"
              label="Nit"
              fullWidth
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
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nit"
              render={({message})=><p className={classError.errors2}><WarningIcon/> {message}</p>}/>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={escuelas}
              renderInput={(params) => <TextField {...params} fullWidth label="Escuelas diponibles" />}
              onChange={(_event, newLocal) => {
                setVacio(false)
                setEscuelaElegida(newLocal);
              }}
            />
            {escuelaVacia &&<p className={classError.errors2}><WarningIcon/> Seleccione una escuela</p>}
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormControl style={{width:'100%'}}>
              <InputLabel>Contraseña</InputLabel>
                  <Input 
                    name="password"
                    fullWidth={true}
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
          <Grid item xs={6}>
            <FormControl style={{width:'100%'}}>
              <InputLabel>Confirmar contraseña</InputLabel>
                <Input 
                  fullWidth={true}
                  name="cpassword"
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
        <Grid marginTop="40px" justifyContent="flex-end" alignItems="flex-start">
          <Button 
            type="submit"
            variant="contained" 
            style={{backgroundColor:'#01818A', width:'30%'}}
            fullWidth
            startIcon={<SaveIcon />}
          >Guardar adminsitrador</Button>
        </Grid>
      </form>
    </Slide>
  );
}

export default CrearAdministrador;
