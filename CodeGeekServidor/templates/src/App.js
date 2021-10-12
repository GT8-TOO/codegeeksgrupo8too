import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Vistas 
import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';

// eslint-disable-next-line 
const baseURL = "";

const App=() =>{
 return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
