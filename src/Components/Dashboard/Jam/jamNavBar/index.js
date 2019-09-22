// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = (props) => {
    
    const onSelectJamSection = (section)=> {
        props.setJamSection(section)
    };

    return (

        <div className="jamNavBar">

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('board')}>
                <p>Board</p>   
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('jammers')}>
                <p>Jammers</p>
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('myJam')}>
                <p>My Jam</p>
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('settings')}>
                <p>Settings</p>
            </div>
            
        </div>

    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: (section) => dispatch(setJamSection(section))
    }
}

const mapStateToProps = (state) => {
    return {
        jamSection: state.jamSection,
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JamNavBar);
