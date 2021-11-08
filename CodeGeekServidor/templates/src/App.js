import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Vistas 
import Home from './Views/Home';
import User from './Views/User';
import Login from './Views/Login';
import Register from './Views/Register';

const baseURL = "http://18.204.209.131:8000/";

const App=() =>{
 return (
    <Router>
      <Switch>
        <Route exact path="/user/:windows"><User url ={baseURL}/></Route>
        <Route exact path ="/login"><Login url ={baseURL}/></Route>
        <Route exact path ="/register"><Register url ={baseURL}/></Route>
        <Route exact path="/"><Home/></Route>
      </Switch>
    </Router>

  );
}

export default App;
