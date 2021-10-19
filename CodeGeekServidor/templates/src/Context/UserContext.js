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
});

export default UserContext;
