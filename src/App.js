import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banks from './components/Banks'
import {Switch, Route} from 'react-router-dom';
import Branches from './components/Branches'
import Employees from './components/Employees';
import NavBar from './components/NavBar';
import addEmployee from './components/AddEmployee'

function App() {
  return (
    <div className="App ">
      <NavBar/>
      <div className="container container__app">
          <div className= "row info__app">
            <div className="col-3 banks__app">
              <Banks/>
            </div>
            <div className="details__app">
            <Switch>
              <Route exact path = '/branches/:id' component = {Branches}/>
              <Route exact path = '/employees/:id' component = {Employees}/>
              <Route exact path = '/addemployee/' component = {addEmployee}/>

            </Switch>
            </div>
          </div>
     </div>
    </div>
  );
}

export default App;
