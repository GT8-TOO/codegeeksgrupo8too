import React, {useState, useContext} from 'react';

//Material UI
import { 
  styled, 
  useTheme,
  Box, 
  List,
  Divider,
  ListItem,
  ListItemText
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {Link} from 'react-router-dom';

//Icons
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

//Context
import userContext from '../../Context/UserContext';

//Style
import useStyle from '../../Styled/UsuarioCSS';

//Contenido SliderBar
import {SidebarData} from './DataBar/SidebarData';
import {SliderAdminData} from './DataBar/SliderAdminData';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavBar=(props)=> {
  const theme = useTheme();
  const [open, setOpen] = useState();
  const usercontext =useContext(userContext)
  //eslint-disable-next-line
  const classes = useStyle();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cerrarSesion =()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("dui");
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("admin");
    cambiarUsuario("dui",0)
    cambiarUsuario("admin",true)
    cambiarUsuario("logeado", undefined)
    cambiarUsuario("token", undefined)
  }

  //Cambia el estado de userContext
  const cambiarUsuario=(clave, valor)=>{
    usercontext.setUser(prevState=>{
      return {...prevState, [clave]:valor}
    })
  }
 
  return (
    <Box sx={{display: 'flex' }}>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader >
          {open ? <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>:<IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '16px',
              ...(open && { display: 'none' }),
            }}
          > <MenuIcon /> </IconButton>
          }
        </DrawerHeader>
        <Divider />
        <List>
          {SidebarData.map((item)=>{
            return(
              <Link to={`/user/${item.path}`} style={{ textDecoration: 'none' }}>
                <ListItem button  key={item.key}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>)})}
        </List>
        {props.admin===true &&<div>
          <Divider />
          {SliderAdminData.map((item)=>{
            return(
            <List>
            <Link to={`/user/${item.path}`} style={{ textDecoration: 'none' }}>
              <ListItem button  key={item.key}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          </List>)})}
        </div>}
        <Divider />
        <List>
           <Link to={``} style={{ textDecoration: 'none' }}>
            <ListItem button  onClick={cerrarSesion} key="logout">
              <ListItemIcon><LogoutIcon/></ListItemIcon>
              <ListItemText primary="Cerrar sesion" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}
export default NavBar;
