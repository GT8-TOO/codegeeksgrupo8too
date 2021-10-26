import React, { useState, useEffect } from 'react';
import {
  Slide,
  LinearProgress,
  Autocomplete,
  TextField,
  Typography
} from '@mui/material';

const SolicitarLocal = (props)=>{
  //eslint-disable-next-line
  const [dataSelect, setData]=useState([]);

  //Component di mount
  useEffect(()=>{
    document.title="Realizar reserva";
  },[])
  
  return (
    <Slide direction="up" in={true}>
      <div>
        <Typography variant="h4">Realizar reserva de local</Typography>
        { props.horarios !== undefined ?
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.horarios}
              fullWidth={true}
              sx={{marginTop:5 }}
              renderInput={(params) => <TextField {...params} label="Horarios para solicitar local" />}
              onChange={(_event, newLocal) => {
                if(newLocal !== null){
                  setData([{"cod_horario":newLocal.cod_horario}]);
                  console.log(dataSelect)
                }else{
                  setData([{"cod_horario":""}]);
                }
              }}
            /> 
          </div>:
          <div>
            <LinearProgress fullWidth={true} sx={{marginTop:5}}/>
          </div>
        }
      </div>
    </Slide>
  )
}

export default SolicitarLocal;

