
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../redux/actions/jamSection';

// CSS
import './index.css';

const Jammers = (props) => {

    const { setJamSection } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (
        <div className="my-jam">
           JAMMMMMMERSSSSS
        </div>
    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('Jammers'))
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Jammers);