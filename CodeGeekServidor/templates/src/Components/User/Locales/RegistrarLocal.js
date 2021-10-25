import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  Rating,
  Typography,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from '@mui/material';


//Icons
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Muy desatisfecho',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Insastifecho',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Sastifecho',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Muy Satisfecho',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


const RegistrarLocal = (props)=>{
  const [califiacion,setCalificacion]=useState(2);

  //Component dimount
  useEffect(()=>{
    setCalificacion(2)
  },[])

  const handleClose = () => {
    props.setOpen(false);
  };

  return(
    <div>
      <Dialog open={props.open} maxWidth="xl" onClose={handleClose}>
        <DialogTitle>Registrar un nuevo local</DialogTitle>
        <form>
          <Grid  container spacing={1} >
            <DialogContent style={{marginLeft:'15px'}}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label="Codigo de carrera"
                  fullWidth/>
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <TextField
                  label="Nombre del local"
                  fullWidth/>
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <TextField
                  label="Nombre del edificio"
                  fullWidth/>
              </Grid>
              <Grid xs={12} columnSpacing={3} style={{display:'flex', marginTop:'15px'}}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nivel"/>
                </Grid>
                <Grid item xs={6} style={{marginLeft:'10px'}}>
                  <TextField
                    fullWidth
                    label="Altitud"/>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{marginTop:'15px'}}>
                <Typography variant="p">Calificacion del local:</Typography>
                <Rating
                  style={{marginLeft:'50px'}}
                  defaultValue={califiacion}
                  onChange={(event, data)=>{
                    if(data!== null){
                      setCalificacion(data);
                      console.log(data)
                    }
                  }}
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly/>
                {customIcons[califiacion].label !== null &&
                  <Typography 
                    variant="p" 
                    style={{
                      color:'#686767',
                      marginLeft:'20px',
                      fontSize:'15px'}}
                  >{customIcons[califiacion].label}</Typography>
                }
              </Grid>
              <Grid item xs={12} style={{marginTop:'20px'}}>
                <TextField
                  label="Descripcion"
                  multiline
                  fullWidth
                  rows={5}/>
              </Grid>
           </DialogContent>
            <Grid item xs={11.5}>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Guardar local</Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}
export default RegistrarLocal;
