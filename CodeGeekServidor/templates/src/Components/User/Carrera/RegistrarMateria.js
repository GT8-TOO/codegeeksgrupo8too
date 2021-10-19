import React, { useState, forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid
}from '@mui/material';
import Slide from '@mui/material/Slide';

//Components
import Notificacion from '../../Notifiacion';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrarMateria =(props)=> {
  const [open, setOpen] = useState(props.state);

  const handleClose = () => {
    setOpen(false)
  };

  const confirmarGuardado = ()=>{
    setOpen(false);
  }

  return (
    <div>
      <Notificacion open={true} type={"success"} message="Materia guardada"/>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Registrar Materia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container rowSpacing={4} columnSpacing={1}>
              <Grid item xs={5}>
                <Typography variant="p">Codigo de la materia</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  label="Codigo materia" 
                  name="codigoMateria"
                  variant="outlined"/>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Nombre de la materia</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  label="Nombre materia" 
                  name="nombreMateria"
                  variant="outlined"/>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Unidades valorativas</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{width:'100%'}} 
                  type="number"
                  label="Unidades valorativas" 
                  name="nombreMateria"
                  variant="outlined"/>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="p">Obligatoria </Typography>
              </Grid>
              <Grid item xs={7}>
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      defaultValue="si"
                      name="radio-buttons-group">
                      <FormControlLabel value="si" control={<Radio />} label="Si" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Guardar Materia</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RegistrarMateria;
