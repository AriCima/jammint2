// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React from 'react';
// import { NavLink } from 'react-router-dom';


// COMPONENTS
import Board  from '../Board'
import Jammers  from '../Jammers'
import MyJam  from '../MyJam'
import Settings  from '../Settings'
// import { connect } from 'react-redux';

// CSS
import './index.css';

const jamNavBar = (props) => {
    
    // const [user, signOut] = props;

    return (

        <div className="jamNavBar">

            <div className="jamNavBar-item">
                <Board />
            </div>

            <div className="jamNavBar-item">
                <Jammers />
            </div>

            <div className="jamNavBar-item">
                <MyJam />
            </div>

            <div className="jamNavBar-item">
                <Settings />
            </div>
            
        </div>

    );   
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // signOut: () => dispatch(signOut())
//     }
// }

// const mapStateToProps = (state) => {
//     console.log('state en el jamNavBar = ', state)
//     return {
//         user: state.firebase.auth,
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(jamNavBar);
export default jamNavBar