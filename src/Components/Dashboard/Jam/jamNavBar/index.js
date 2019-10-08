// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import DataService from '../../../services/DataService';

import { connect } from 'react-redux';
import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = (props) => {
   
    const onSelectJamSection = (section)=> {
        props.setJamSection(section)
    };

    const { jamName, JamActiveSection, jamSections } = props;

    const renderJamNavBar = () => {
        return jamSections.map((section, id) => {

            return section !== 'chat' ? 
                 
            <div className="jamNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                <p>{section}</p>   
            </div>
            
            : 
            <Fragment key={id} >
                <p>{section}</p>   
            </Fragment>

        })
    };

    console.log('jamSection before rendering = ', jamSections)
    return ( 
        <div className="jamNavBar">
        {jamSections[0] !== 'chat' ? 
            (
                <Fragment>
                    <div className="jamNavBar-left">
                        <div className="jamNavBar-jamName">
                            <p>{jamName}</p>
                        </div>
                    </div>
                    <div className="jamNavBar-right">
                        {renderJamNavBar()}
                    </div>
                </Fragment>
            ) : (
                <div className="jamNavBar-chat">
                    {renderJamNavBar()}
                </div>
            )
        }
        </div>
    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: (section) => dispatch(setJamSection(section))
    }
};

const mapStateToProps = (state) => {
    return {
        jamSection: state.jamSection,
        jamActive: state.jamActive,
        user: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JamNavBar);
