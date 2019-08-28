// COOL STYLE https://codepen.io/egoens/pen/NxejgJ


import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// COMPONENTS
import JoinPopup from '../../JoinPopup';
import CreatePopup from '../../CreatePopup';

// CSS
import './index.css';

const HeaderHome = (props) => {

    const [user, setUser] = useState(props);

    const signOut = () => {   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    };
    
    useEffect(() => {
        if(props.user !== user) {
            setUser(props.user)
        }
    },[]);
       
    return (
        <div className="header-HOME">

        <div className="header-HOME-left">
            <div className="header-HOME-nav-block">
                <p>LOGGED MENU</p>
            </div>

            <div className="header-HOME-nav-block">
                <CreatePopup
                    user={user}
                />
            </div>

            <div className="header-HOME-nav-block">
                <JoinPopup
                    user={user}
                />
            </div>

        </div>

        

        <div className="header-HOME-right">

            <div className="header-HOME-nav-block">
                {!user.id ? <Link to={`/sign_in`}>Sign In</Link> : <span onClick={signOut}><Link to="/login">Sign-out</Link></span>}
            </div>

        </div>
            
        </div>
    );   
};

export default HeaderHome;
