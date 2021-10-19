import React, { forwardRef, useContext } from 'react';
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
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid
}from '@mui/material';
import Slide from '@mui/material/Slide';

//Components
import Notificacion from '../../Notifiacion';

//Context
import UserContext  from '../../../Context/UserContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrarMateria =(props)=> {
  const userContext = useContext(UserContext);

  const handleClose = () => {
    userContext.setCrearMateria(false)
  };

  return (
    <div>
      <Dialog
        open={userContext.openMateria}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Registrar Materia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid sx={{marginTop:'20px'}} container rowSpacing={4} columnSpacing={1}>
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
