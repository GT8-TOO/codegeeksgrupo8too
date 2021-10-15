import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../Styled/AppbarCSS';

const Appbar = (props) =>{
  const classes = useStyles()
  //CompoonentDiMount
  useEffect(()=>{
    setLogeado(props.logeado)
  },[])

  // eslint-disable-next-line
  const [logeado, setLogeado] = useState();
  return(
    <div>
      <Box>
        <AppBar style={{background: "#2A314b",height:'120px'}} position="static">
          <Toolbar>
            {logeado ? 
              <IconButton 
                size="large" 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                sx ={{mr:2}}><MenuIcon/></IconButton>:
                <h1 className={classes.text}>Sistema de Gestión de reservas de Laboratorios de Aprendizaje</h1>}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
export default Appbar;
