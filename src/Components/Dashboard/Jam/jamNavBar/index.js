// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = (props) => {
    
    const { jamId, jamSection } = props

    // useEffect((jamSection) => {
    //     setJamSection(jamSection)
    // },[jamSection])

    const onSelectJamSection = (section)=> {
        props.setJamSection(section)
    };

    return (

        <div className="jamNavBar">

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('Board')}>
                <p>Board</p>   
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('Jammers')}>
                <p>Jammers</p>
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('MyJam')}>
                <p>My Jam</p>
            </div>

            <div className="jamNavBar-item" onClick={() => onSelectJamSection('Settings')}>
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
    console.log('state en el jamNavBar', state)
    return {
        jamSection: state.jamSection,
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JamNavBar);
