import React from 'react';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// COMPONENTS
import NavBar from '../NavBar/NavBar';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard';
import PreBookingForm from '../UI/Forms/StudentsFlat/PreBookingForm';
import StudentInfoForm from '../UI/Forms/StudentsFlat/StudentInfoForm';


// SERVICES
// import DataService from '../services/DataService';

// CSS
import './index.css';


function App() {
    return (
        // <>
        //     <ErrorAlert />
        <BrowserRouter>
            <div className="App">
                <div className="navBar">
                    <NavBar />
                </div>
                <div className="app-body">
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/invite/:bookingCode" exact render={(props) => <PreBookingForm propsFn={props.history} bookingCode={props.match.params.bookingCode} />} />
                        <Route path="/jam_reg/:bookingCode" exact render={(props) => <StudentInfoForm propsFn={props.history} bookingCode={props.match.params.bookingCode} />} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        // </>
    );
}


export default App;
