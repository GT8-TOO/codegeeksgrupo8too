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
  openCrearLocal:{},
  setCrearLocal:(id)=>{},
  openLocal:{},
  setMostrarLocal:(id)=>{},
  openSolicitud:{},
  setOpenSolicitud:(id)=>{},
  respuesta:{},
  setRespuesta:(id)=>{},
  catalogoLocal:{},
  setCatalogo:(id)=>{},
  codigoLocal:{},
  setCodigoLocal:(id)=>{},
  solicitud:{},
  setSolicitud:(id)=>{},
});

export default UserContext;
