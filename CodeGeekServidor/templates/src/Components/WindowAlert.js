import React, { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from  '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import {Redirect} from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WindowAlert =(props)=> {
  const [open, setOpen] = useState(props.state);

  const handleClose = () => {
    setOpen(false)
  };

  const handleRedirect = ()=>{
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity={props.type}>{props.message}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.redirect ===undefined &&<Button onClick={handleClose}>Aceptar</Button>}
          {props.redirect !==undefined &&<div>
            <Button onClick={handleRedirect}>Aceptar</Button>
            {!open && <Redirect to ={props.redirect}/>}
          </div>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default WindowAlert; 
