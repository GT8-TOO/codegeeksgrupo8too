import React, {useState} from 'react';

//Material UI
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';

//Icons
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

//Style
import useStyle from '../../Styled/UsuarioCSS';

//Contenido SliderBar
import {SidebarData} from './SidebarData';

const drawerWidth = 290;

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

const NavBar=()=> {
  const theme = useTheme();
  const [open, setOpen] = useState();
  //eslint-disable-next-line
  const classes = useStyle();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <Divider />
        <List>
           <Link to={``} style={{ textDecoration: 'none' }}>
            <ListItem button  key="logout">
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
