// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect } from 'react';
import DataService from '../../../services/DataService';

import { connect } from 'react-redux';
import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = (props) => {

    const [jamSections, setJamSections] = useState([]);
    
    const onSelectJamSection = (section)=> {
        props.setJamSection(section)
    };

    useEffect(() => {
        DataService.getJamInfoById(props.jamActive)
        .then((res) => {
            const sectionsArray = res.sections;
            setJamSections(sectionsArray)
        })
    },[props.jamActive])

    const renderNavBar = () => {
        console.log('JAMNAVBAR RENDERRING')
        return jamSections.map((section, id) => {
            return(
                <div className="jamNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                    <p>{section}</p>   
                </div>
            )
        })
    };

    return (

        <div className="jamNavBar">
            {renderNavBar()}
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
        jamActive: state.jamActive,
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JamNavBar);
