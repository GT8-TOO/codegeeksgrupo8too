//eslint-disable-next-line
import React, { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: (id) => {},
  button :{},
  setButton: (id)=>{},
  inputCarrerra: {},
  setCarrera:(data)=>{},
  openMateria:{},
  setOpenMateria :(id)=>{},
  openLocal:{},
  setCrearLocal:(id)=>{},
  openSolicitud:{},
  setOpenSolicitud:(id)=>{},
  respuesta:{},
  setRespuesta:(id)=>{},
  codigoLocal:{},
  setCodigoLocal:(id)=>{},
  solicitud:{},
  setSolicitud:(id)=>{},
});

export default UserContext;
