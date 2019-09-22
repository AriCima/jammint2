
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../redux/actions/jamSection';

// CSS
import './index.css';

const Settings = (props) => {

    const { setJamSection } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (

        <div className="jam-settings">
            SE TI NG S
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('settings'))
    }
}

const mapStateToProps = (state) => {
    console.log('state en el jamNavBar = ', state)
    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);