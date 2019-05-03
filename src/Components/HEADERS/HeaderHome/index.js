// COOL STYLE https://codepen.io/egoens/pen/NxejgJ


import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

export default class HeaderHome extends Component {
   constructor(props){
        super(props);

        this.state = {
            user    : this.props.userID,
        }

        this.signOut = this.signOut.bind(this);

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
                    <p>CREATE JAM</p>
                </div>

                <div className="header-HOME-nav-block">
                    <p>JOIN JAM</p>
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
