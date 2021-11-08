import React, { useEffect, useState } from 'react';
import{
  Slide,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button,
  CircularProgress,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';


//Iconos
import ListAltIcon from '@mui/icons-material/ListAlt';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

//Componentes
import WindowAlert from '../WindowAlert';



const ComenzarCiclo =(props)=>{
  const [materias, setMaterias]= useState();
  const [coordinador, setCoordinador]= useState();
  const [coordinadorElegido, setCoordinadorElegido]= useState(null);
  const [docentes, setDocentes]= useState();
  const [materiaElegida, setMateriaElegida]=useState(null);
  const [docenteElegido, setDocentesElegido]= useState(null);
  const [listaDocentes, setListaDocentes]=useState([]);
  const [validacion, setValidacion]=useState([]);
  const [calendarValueInicio, setCalendarValueInicio]=useState();
  const [calendarValueFin, setCalendarValueFin]=useState();
  const [ciclo, setCiclo]=useState("0");
  
  const [notificacion, setNotificacion]= useState({
    state:false,
    title:"",
    message:"",
    type:""
  })

  //Component di update
  useEffect(()=>{
    document.title="Comenzar ciclo"
    getDataDocentes("user/escuela/docentes/")
    getDataMaterias("materias/solicitarmaterias-json/")
    getDataCoordinador("user/escuela/docentes/")

  },[]);

  //Trae los datos del docente
  const getDataDocentes = async(direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error);
    })
    setDocentes(promise)
  }

  const getDataCoordinador = async(direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error);
    })
    setCoordinador(promise)
  }
  
  //Trae la informacion de la materia
  const getDataMaterias = async(direccion)=>{
    let promise = await axios.get(props.url+direccion).then((res)=>{
      return res.data
    }).catch((error)=>{
      console.log(error)
    })
    setMaterias(promise)
  }

  //Manda los datos a servidor
  const sendDataMateria = async(direccion, data)=>{
    let promise = await axios.post(props.url+direccion, data).then((res)=>{
      return res.data;
    }).catch((error)=>{
      console.log(error)
    })
    setNotificacion(promise)
  }
  
  //Agrega los datos del docente a la lista
  const agregarDocente =()=>{
    setDocentesElegido(null);
    setListaDocentes([...listaDocentes,docenteElegido])
  }

  //Guarda los datos del docente
  const guardarDatos =()=>{
    setNotificacion({
      title:"",
      state:false,
      message:"",
      type:""
    })

    if(calendarValueInicio instanceof Date && isFinite(calendarValueInicio) && calendarValueFin instanceof Date && isFinite(calendarValueFin)){
      let formData = new FormData();
      let fechaInicio = calendarValueInicio.getFullYear() + "/" + calendarValueInicio.getMonth()+"/"+calendarValueInicio.getDay();
      let fechaFin = calendarValueFin.getFullYear() + "/" + calendarValueFin.getMonth()+"/"+calendarValueFin.getDay();
      let year = calendarValueFin.getFullYear();
      formData.append("coordinador_dui", coordinadorElegido.code)
      formData.append("cantidad", listaDocentes.length)
      formData.append("cod_materia", materiaElegida.code)
      formData.append("ciclo_par", ciclo)
      formData.append("fecha_inicio",fechaInicio)
      formData.append("fecha_fin",fechaFin)
      formData.append("year",year)
      for(let i =0; i < listaDocentes.length; i++){
        formData.append("codDocente"+i,listaDocentes[i].code)
      }
      sendDataMateria("materias/catedra/", formData)
      setListaDocentes([])
      setValidacion([])
      setDocentesElegido(null)
      setMateriaElegida(null)
      setCalendarValueInicio(undefined)
      setCalendarValueFin(undefined)
      setCiclo("false")
    }else{
      setNotificacion({
        title:"Fecha no ingresada",
        state:true,
        message:"Falta ingresar una o dos fechas",
        type:"error"
      })
    }
  }

  //Calendario fecha inicio
  const handleChangeCalendarInicio = (newValue) => {
    setCalendarValueInicio(newValue);
  }

  //Calendario fin de ciclo
  const handleChangeCalendarFin = (newValue) => {
    setCalendarValueFin(newValue);
  }

  return (
    <Slide direction="up" in={true}>
      <div>
        {notificacion.state &&
          <WindowAlert
            state={notificacion.state}
            type={notificacion.type}
            title={notificacion.title}
            message={notificacion.message}
            />
        }
        <Typography variant="h4">Configurar ciclo</Typography>
        { (materias !== undefined && docentes !== undefined) ?
          <div style={{width:700, marginTop:'40px'}}>
           
           <Autocomplete
              disablePortal
              name="materias"
              value={materiaElegida}
              fullWidth
              options={materias}
              onChange={(_event, newMateria)=>{
                setMateriaElegida(newMateria)
                setDocentesElegido(null)
                setListaDocentes([])
              }}
              renderInput={(params) => <TextField {...params} label="Materias a configurar" />}/>    
            {materiaElegida !== null &&
            <div style={{width:700, marginTop:'20px'}}>
              <Stack spacin={3}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Fecha de inicio de ciclo"
                    inputFormat="yyyy/MM/dd"
                    value={calendarValueInicio}
                    name="calendar"
                    onChange={handleChangeCalendarInicio}
                    renderInput={(params) => <TextField{...params}/>} />
                </LocalizationProvider>
              </Stack>
              <Stack spacin={3} style={{marginTop:'15px'}}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Fecha de fin de ciclo"
                    inputFormat="yyyy/MM/dd"
                    value={calendarValueFin}
                    name="calendar"
                    onChange={handleChangeCalendarFin}
                    renderInput={(params) => <TextField{...params}/>} />
                </LocalizationProvider>
              </Stack>
              <FormControl component="fieldset">
                <FormLabel component="legend">Ciclo que pertecenera</FormLabel>
                <RadioGroup defaultValue={ciclo} onChange={(e)=>setCiclo(e.target.value)} name="row-radio-buttons-group">
                  <FormControlLabel value="0" control={<Radio />} label="Ciclo 1" />
                  <FormControlLabel value="1" control={<Radio />} label="Ciclo 2" />
                </RadioGroup>
              </FormControl>
              {coordinador !== undefined && 
              <Autocomplete
                disablePortal
                name="coordinador"
                style={{marginTop:'15px'}}
                fullWidth
                value ={coordinadorElegido !== null ?  coordinadorElegido : null}
                options={coordinador}
                
                onChange={(_event, newCoordinador)=>{
                  setCoordinadorElegido(newCoordinador)
                  console.log(newCoordinador)
                  console.log(coordinadorElegido)
                }}
                renderInput={(params) => <TextField {...params} label="Asignar Coordinador" />}/> 
                }

              <Autocomplete
                disablePortal
                name="docentes"
                style={{marginTop:'15px'}}
                fullWidth
                value ={docenteElegido !== null ? null: docenteElegido}
                options={docentes}
                onChange={(_event, newDocentes)=>{
                  if (!validacion.includes(newDocentes.code)){
                    setDocentesElegido(newDocentes)
                    setValidacion([...validacion,newDocentes.code])
                  }else{
                    setDocentesElegido(null)
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Asignar docente" />}/>    
              <Button 
                disabled={docenteElegido === null ? true: false}
                startIcon={<ListAltIcon/>}
                variant="outlined"
                style={{marginTop:'15px', width:250}}
                onClick={agregarDocente}>Añadir docente</Button>
               <Button 
                 disabled={listaDocentes.length > 0 && coordinadorElegido !== null ? false: true}
                startIcon={<SaveOutlinedIcon/>}
                variant="outlined"
                 style={{marginLeft:'10px',marginTop:'15px', width:250}}
                onClick={guardarDatos}>Guardar cambios</Button>
              {listaDocentes.length >0 &&
              <TableContainer sx={{marginTop:'50px'}} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Docentes asignados para la materia {materiaElegida.label}</TableCell>
                     </TableRow>
                    </TableHead>
                    <TableBody>
                    {listaDocentes.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.label}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
              }
            </div>
            }
          </div>:
            //En caso de no tener datos
          <div style={{width: 500, height: 80,display: 'flex', alignItems: 'center',justifyContent: 'center',}}>
            <CircularProgress/>
          </div>
        }
      </div>
    </Slide>
  );
}

export default ComenzarCiclo;
