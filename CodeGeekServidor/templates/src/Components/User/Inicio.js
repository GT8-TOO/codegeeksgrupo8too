import React from 'react';

const Inicio =()=>{
  return(
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {windows === "Inicio" && <Link to ="user/home">Usuario</Link>}
        {windows === "Prueba" && <Link to ="user/h">Prueba</Link>}
        {windows === "Cerrar sesion" && <Redirect to="/"/>}
        <Footer/>
      </Box>

    </div>
  );
}
export default Inicio;
