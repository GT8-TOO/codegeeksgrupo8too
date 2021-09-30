import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Vistas 
import Index from './Views/Index';

// eslint-disable-next-line 
const baseURL = "";

const App=() =>{
 return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/"><Index/></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
