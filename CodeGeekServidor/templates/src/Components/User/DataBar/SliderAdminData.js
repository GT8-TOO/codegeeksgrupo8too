import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const SliderAdminData = [
  {
    key:'registrarPensum',
    title: 'Registrar carrera',
    path: 'registercarrer',
    icon:<SchoolIcon/>,
  },
  { 
    key:'start',
    title: 'Configurar ciclo',
    path: 'start',
    icon:<EventIcon/>,
  },
  {
    key:'adminAs',
    title:'Conceder permisos a docente',
    path:'authorize',
    icon:<AdminPanelSettingsIcon/>
  },
];
