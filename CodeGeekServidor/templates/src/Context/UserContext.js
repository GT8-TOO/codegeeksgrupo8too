import React, { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: (id) => {},
  button :{},
  setButton: (id)=>{},
  inputCarrerra: {},
  setCarrera:(data)=>{},
});

export default UserContext;
