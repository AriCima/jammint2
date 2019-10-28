
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../../redux/actions/jamSection';
import InviteForm from '../../../../../UI/NewJammerForms/InviteForm'
// CSS
import './index.css';

const Settings = (props) => {

    const { setJamSection, jamId } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    const invite = () => {
        console.log('need to send the invite')
    };

    return (

        <div className="jam-settings">
            SE TI NG S
            <h1>{jamId}</h1>
            <form className="invite" onSubmit={invite}>
                <div className="invite-form-header">

                </div>
            </form>
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
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);