// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React from 'react'
import { NavLink } from 'react-router-dom';

// COMPONENTS
import JoinPopup from '../JoinPopup';
import CreatePopup from '../CreatePopup';
import { signOut } from '../../redux/actions/authActions';

import { connect } from 'react-redux';

// CSS
import './index.css';

const NavBar = (props) => {
    const [user, signOut] = props;
    console.log(' props header ', props);

    return (
        <div className="header-HOME">

            <div className="header-HOME-left">

                <div className="header-HOME-nav-block">
                    <CreatePopup
                        user = { props.user }
                    />
                </div>

                <div className="header-HOME-nav-block">
                    <JoinPopup
                        user = { props.user }
                    />
                </div>

                { !user ? 
                    <div className="header-HOME-nav-block">
                        <NavLink to={`/login`}>Sign In</NavLink> 
                    </div> :
                    
                    <div className="header-HOME-nav-block" onClick={signOut}>
                        Log out
                    </div>
                }
                
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
