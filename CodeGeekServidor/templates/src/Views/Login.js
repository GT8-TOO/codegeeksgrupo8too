import React, {useState} from 'react';
import{
    TextField,
    FormControl,
    InputLabel,
    IconButton,
    Input,
    InputAdornment,
    FormHelperText,
    Button
}from '@mui/material';
import { useForm } from 'react-hook-form';

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
    <div className={classes.root}>
        <form onSubmit={handleSubmit(iniciarSesion)}>
            <br/><br/><br/>
            <TextField 
                className={classes.text} 
                type="email"
                label="Correo electronico"  
                {...register("email",{required: true})}/>
            <br/>
            <br/><br/>
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
                            </InputAdornment>
                        }
                        {...register("password",{
                            required:{
                                value:true,
                                message:"Campo obligatorio, no se puede dejar vacio"
                            }
                        })}/>
            </FormControl>
            <Button 
                className={classes.button} 
                type ='submit' 
                color='primary' 
                variant="contained" 
                onClick={iniciarSesion}>Ingresar</Button> 
            <br/><br/><br/>
        </form>
    </div>
  );
}

export default Login;
