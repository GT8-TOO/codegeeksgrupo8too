import React, {useState,useEffect} from 'react';
import{
    TextField,
    FormControl,
    InputLabel,
    IconButton,
    Input,
    InputAdornment,
    Typography,
    Button
}from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import {Link} from 'react-router-dom';

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Style
import useStyles from '../Styled/LoginCSS';

const Login =()=>{
  const classes =useStyles();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  //Component di mount
  useEffect(()=>{
    document.title="Iniciar sesion";
  },[])

  const iniciarSesion=()=>{
    console.log("Funciono")
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
            <ErrorMessage className={classes.errors} errors={errors} name="email"/>
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
            <ErrorMessage className={classes.errors} errors={errors} name="password"/>
            </FormControl>
            <Link href="/register">
              <Typography variant="p">Crear una cuenta</Typography>
            </Link>
            <Button 
                className={classes.button} 
                type ='submit' 
                color='primary' 
                variant="contained" 
                onClick={iniciarSesion}>Ingresar</Button> 
          </div>
        </form>
    </div>
  );
}

export default Login;
