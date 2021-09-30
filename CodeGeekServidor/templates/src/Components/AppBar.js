import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../Styles/AppbarCSS';
import Logo from '../Media/codet.png';

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
              <div style={{width:'70%', display:'inline-block'}}>
                <img 
                  className={classes.img}
                  src={Logo} 
                  alt="Logo del grupo de trabajo" 
                  height="100" 
                  width="100" />
                <h1 className={classes.text}>Code Geek App</h1>
              </div>}
          </Toolbar>
          {logeado ? 
            <div>
              <Button className={classes.button} color="inherit">Cerrar sesion</Button>
            </div>:
            <div className={classes.divInicio}>
              <Button 
                className={classes.button} 
                variant="outlined" 
                color="inherit">Iniciar Sesion</Button>
              <Button 
                className={classes.button} 
                variant="outlined" 
                color="inherit">Registrarse</Button>
            </div>}
        </AppBar>
      </Box>
    </div>
  );
}
export default Appbar;
