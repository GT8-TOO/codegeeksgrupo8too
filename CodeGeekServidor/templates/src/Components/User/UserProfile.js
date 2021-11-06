import React, { useEffect } from 'react';
import {
  Slide,
  Typography
} from '@mui/material';

const UserProfile =()=>{

  //Component Di mount
  useEffect(()=>{
    document.title="Perfil";
  }, [])
  return(
    <Slide direction="up" in={true}>
      <div>
        <Typography variant="h4">Perfil de usuario</Typography>
      </div>
    </Slide>
  );
}

export default UserProfile;
