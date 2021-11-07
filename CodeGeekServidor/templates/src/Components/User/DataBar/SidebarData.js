import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EmailIcon from '@mui/icons-material/Email';
import ExploreIcon from '@mui/icons-material/Explore';

export const SidebarData = [
  {
    key:'home',
    title: 'Inicio',
    path: 'home',
    icon:<HomeIcon/>,
  },
  {
    key:'profile',
    title: 'Ver Perfil',
    path: 'profile',
    icon:<PersonIcon/>,
  },
  {
    key:'requestlocal',
    title: 'Solicitar local',
    path: 'requestlocal',
    icon:<MoreTimeIcon/>,
  },
  {
    key:'reviewrequest',
    title: 'Revisar solicitudes',
    path: 'reviewrequest',
    icon:<FactCheckIcon/>,
  },
  {
    key:'local',
    title: 'Mostrar los locales',
    path: 'local',
    icon:<ExploreIcon/>,
  },
  {
    key:'report',
    title:'Ver reportes',
    path:'report',
    icon:<AssessmentIcon/>
  },
  {
    key:'email',
    title: 'Contactar administradores',
    path: 'sendemail',
    icon:<EmailIcon/>,
  },
];
