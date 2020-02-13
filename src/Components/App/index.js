import React, { useEffect } from 'react';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// COMPONENTS
import NavBar from '../NavBar/NavBar'
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard';
import InvitationForm from '../UI/Forms/StudentsFlat/InvitationForm'

// SERVICES
// import DataService from '../services/DataService';

// CSS
import './index.css';



function App() {


  return (
    <BrowserRouter>
      <div className="App">
          <div className="navBar">
            <NavBar/>
          </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/invite/:bookingId" exact render = {(props) => { return <InvitationForm propsFn={props.history} bookingID={props.match.params.bookingId}/> }}/> 
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;