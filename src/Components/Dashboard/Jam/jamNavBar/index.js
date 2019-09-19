// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = (props) => {
    
    const { jamId, jamSection } = props

    useEffect((jamSection) => {
        setJamSection(jamSection)
    },[jamSection])


    return (

        <div className="jamNavBar">

            <div className="jamNavBar-item" onClick={()=>setJamSection('Board')}>
                <a>Board</a>
            </div>

            <div className="jamNavBar-item" onClick={()=>setJamSection('Jammers')}>
                <a>Jammers</a>
            </div>

            <div className="jamNavBar-item" onClick={()=>setJamSection('MyJam')}>
                <a>My Jam</a>
            </div>

            <div className="jamNavBar-item" onClick={()=>setJamSection('Settings')}>
                <a>Settings</a>
            </div>
            
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection())
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, { setJamSection })(JamNavBar);
