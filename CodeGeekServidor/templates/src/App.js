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

// eslint-disable-next-line 
const baseURL = "http://localhost:8000";

const App=() =>{
 return (
    <Router>
      <Switch>
        <Route path ="/user/login"><Login/></Route>
        <Route path="/user/:windows"><User/></Route>
        <Route exact path="/"><Home/></Route>
      </Switch>
    </Router>

  );
}

export default App;
