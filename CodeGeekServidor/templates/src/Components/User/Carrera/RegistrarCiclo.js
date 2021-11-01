import React, {useEffect, useContext, useState} from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

//Icons
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import WarningIcon from '@mui/icons-material/Warning';

//Components
import RegistrarMateria from './RegistrarMateria';
import Notificacion from '../../Notifiacion';
import TablaMaterias from './TablaMaterias';
import WindowAlert from '../../WindowAlert';

//Context
import UserContext from '../../../Context/UserContext';

//Estilo
import useStyles from '../../../Styled/RegistrarCicloCSS';
import useStylesError from '../../../Styled/ErorCSS';

const RegistrarCiclo =(props)=>{
  const userContext = useContext(UserContext);
  const classes =useStyles();
  const errorClass= useStylesError();
  const [materias, setMaterias]=useState();
  const [materia, setMateria]=useState();
  const {register, formState:{errors}, handleSubmit} = useForm();
  const [materiaRequisito, setMateriaR]=useState();
  const [numeroCiclo, setNumero]=useState(1)
  const [listaMateria, setLista]=useState([]);
  const [requisitosP, setRequisitos] =useState("si");
  const mensaje ="La materia se ha guardado correctamente" 
  const [camposVacios, setCampos]= useState({
    type:"",
    state:false,
    statePensum:false,
    title:"",
    message:""
  });

  //Component di mount
  useEffect(async()=>{
    userContext.setButton({enabled:false})
    getMaterias();
    userContext.setRespuesta({
		type:"",
		message:"",
		materiaGuardada:false
    })
  },[]);

  //Component di update
  useEffect(()=>{
    if (userContext.respuesta.materiaGuardada=== true && userContext.respuesta.message === mensaje){
      setMaterias(undefined)
      getMaterias();
      userContext.setRespuesta({
        type:"",
        message:"",
        materiaGuardada:false
      })
    }
  });

  const getMaterias =async()=>{
    var data = await axios.get(props.url+"materias/solicitarmaterias-json/").then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log("ha ocurrido un error "+ error)
    })
    setMaterias(data)
  }

  const openCrearMateria = ()=>{
    userContext.setCrearMateria(true)
  }

  const agregarLista =()=>{
    setCampos({
      type:"",
      state:false,
      statePensum:false,
      title:"",
      message:""
    })
    if(materia!== undefined && materiaRequisito!==undefined && requisitosP==="si"){
      if(materia.label !== materiaRequisito.label){
        setLista([...listaMateria, {
          codigoMateriaRequisito:materiaRequisito.code,
          nombreMateriaR:materiaRequisito.label,
          codigoMateria:materia.code,
          nombreMateria:materia.label,
          ciclo: numeroCiclo,
        }])
      }else{
        setCampos({
          type:"warning",
          state:true,
          statePensum:false,
          title:"Datos duplicados",
          message:"Las materias no pueden tener una misma dependencia de requisito"
        })
      }
    }else if(requisitosP==="no"){
        setLista([...listaMateria, {
          codigoMateriaRequisito:"No hay",
          nombreMateriaR:"No hay",
          codigoMateria:materia.code,
          nombreMateria:materia.label,
          ciclo: numeroCiclo,
        }])
    }else{
      setCampos({
        type:"error",
        state:true,
        statePensum:false,
        title:"Error al ingresar datos",
        message:"No se pueden dejas los campos vacios, seleccione las materias"
      })
    }
  }

  const guardarPensum =(data)=>{
    if(listaMateria.length>0){
      userContext.setCarrera([
        userContext.inputCarrerra,{
          añoPensum:data.yearPensum,
          pensum:listaMateria}])
      userContext.setButton({enabled:true})
    }else{
      setCampos({
        type:"warning",
        state:false,
        statePensum:true,
        title:"Pensum vacio",
        message:"No se puede enviar un pensum vacío, tiene que cumplir con el mínimo de materias"
      })
    }
  }

  return(
    <div>
      <Typography variant="h5">Registrar Ciclo</Typography>
      {userContext.respuesta.materiaGuardada && 
        <Notificacion 
          state={userContext.respuesta.materiaGuardada}
          type={userContext.respuesta.type}
          message={userContext.respuesta.message}
        />}
      {camposVacios.state !== false && <WindowAlert
        type={camposVacios.type}
        title={camposVacios.title}
        message={camposVacios.message}
        state={camposVacios.state}
      />}
       {camposVacios.statePensum !== false && <WindowAlert
        type={camposVacios.type}
        title={camposVacios.title}
        message={camposVacios.message}
        state={camposVacios.statePensum}
      />}
      <form onSubmit={handleSubmit(guardarPensum)}>
        <Grid style={{marginTop:'10px'}} container rowSpacing={4} columnSpacing={1}>
          <Grid item xs={4}>
            <Typography variant="p">Año de creacion de pensum</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{width:'50%'}} 
              label="Pensum" 
              name="yearPensum"
              variant="outlined"
              {...register("yearPensum",{
                required:{
                  value:true,
                  message:"Campo obligatorio, ingrese el año de Pensum"
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="yearPensum"
              render={({message})=><p className={errorClass.errors}><WarningIcon/> {message}</p>}/>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="outlined">Validar informacion</Button>
          </Grid>
        </Grid>
        <br/>
        {materias !== undefined ?
          <div className={classes.div}>
            {userContext.openMateria && <RegistrarMateria state={userContext.openMateria} url={props.url}/>}
            <Grid style={{marginLeft:'20px', marginTop:'25px', width:'90%'}} container rowSpacing={4} columnSpacing={1}>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  name="materias"
                  options={materias}
                  onChange={(_event, newMateria)=>{
                    setMateria(newMateria);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Materias a poner en el pensum" />}/>
              </Grid>
              <Grid item xs={4}>
                <Button 
                  onClick={openCrearMateria}
                  variant="outlined"
                  startIcon={<CreateIcon/>}
                  style={{ width:'100%', marginLeft:'40px', marginTop:'5px'}}>Crear una materia</Button>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  name="materiaRequisito"
                  options={materias}
                  onChange={(_event, newMateria)=>{
                    setMateriaR(newMateria);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Materias de requisito" />}/>
              </Grid>
              <Grid item xs={4}>
                <Button 
                  variant="outlined"
                  onClick={agregarLista}
                  startIcon={<PlaylistAddIcon/>}
                  style={{ width:'100%',marginLeft:'40px', marginTop:'5px'}}>Agregar a la lista</Button>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Ciclo que se impartira"
                  type="number"
                  style={{width:'100%'}}
                  value={numeroCiclo}
                  onChange={(event)=>{
                    if(event.target.value>0 && event.target.value<11){
                        setNumero(event.target.value);
                      }
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl component="fieldset" style={{marginLeft:'30px'}}>
                  <FormLabel component="legend">¿Tiene requisitos previos?</FormLabel>
                  <RadioGroup
                    row
                    defaultValue="si"
                    onChange={(event)=>{
                        setRequisitos(event.target.value);
                    }}
                    name="radio-buttons-group">
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {camposVacios.state && 
              <p className={errorClass.errors}><WarningIcon /> Tiene un error al ingresar los datos, reviselo y vuelva a intentar
                  (datos duplicados o campos vacios)
                </p>}
            </Grid>
          <br/> 
          </div>:
          <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress/>
          </div>
        }
          <br/> 
          <br/> 
        <TablaMaterias rows={listaMateria}/>
      </form>
    </div>
  );
}

export default RegistrarCiclo;
