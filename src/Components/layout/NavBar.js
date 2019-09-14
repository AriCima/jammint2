// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React from 'react'
import { NavLink } from 'react-router-dom';

// COMPONENTS
import JoinPopup from '../JoinPopup';
import CreatePopup from '../CreatePopup';
import jamNavBar from '../Dashboard/Jam/jamNavBar';
import { signOut } from '../../redux/actions/authActions';

import { connect } from 'react-redux';

// CSS
import './index.css';

const NavBar = ({user, signOut}) => {

    return (

        <div className="navBar">

            <div className="navBar-left">

                <div className="navBar-menu">
                    <div className="navBar-item">
                        menu
                    </div>
                </div>
               
                <div className="navBar-actions">
                    <div className="navBar-item">
                        <CreatePopup
                            user = { user }
                        />
                    </div>

                    <div className="navBar-item">
                        <JoinPopup
                            user = { user }
                        />
                    </div>

                    { !user ? 
                        <div className="navBar-item">
                            <NavLink to={`/login`}>Sign In</NavLink> 
                        </div> :
                        
                        <div className="navBar-item" onClick={signOut}>
                            Log out
                        </div>
                    }
                </div>
            
            </div>
            
            <div className="navBar-right">
                <jamNavBar/>
            </div>

        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    console.log('state en el navBar = ', state)
    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
