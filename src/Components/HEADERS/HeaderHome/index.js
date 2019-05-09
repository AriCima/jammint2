// COOL STYLE https://codepen.io/egoens/pen/NxejgJ


import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// COMPONENTS
import PopUpButton from '../../ACCESSORIES/PopUpBody/PopUpButton';
import CreateJam from '../../CreateJam';

// SERVICES
import DataService from '../../services/DataService';

import './index.css';

export default class HeaderHome extends Component {
   constructor(props){
        super(props);

        this.state = {
            userId: this.props.userID,
            userJams: this.props.userJams,
            jamId   : this.props.jamID,
        }

        this.signOut = this.signOut.bind(this);
        // console.log('user en Header = ', this.state.userId)
    }

    signOut(){   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    }


    render() {

       
        return (

            
            <div className="header-HOME">

            <div className="header-HOME-left">
                <div className="header-HOME-nav-block">
                    <p>MENU</p>
                </div>

                <div className="header-HOME-nav-block">
                    <PopUpButton
                        userID={this.state.userId}
                        buttonText={'Create a Jam'}
                        popupText={'Create a Jam is very simple, just give it a Name and Description'}
                        renderInside={
                            <CreateJam 
                                propsFn={this.props.propsFn} 
                                userID={this.state.userId}
                                userJams={this.state.userJams}
                            />
                        }
                    />
                </div>

                <div className="header-HOME-nav-block">
                    <Link to={`/join-jam/${this.props.userID}`}>JOIN JAM</Link>
                </div>
            </div>

            

            <div className="header-HOME-right">

                <div className="header-HOME-nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> : <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>}
                </div>

            </div>
                
            </div>
                            

        );
    }
};
