// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import DataService from '../../../services/DataService';

import { connect } from 'react-redux';
import { setJamSection } from '../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = ({ setJamSection, jamName, jamSections, jamActiveSection, jamType}) => {
    
    console.log('jamSections NAVBAR: ', jamSections);
   
    const onSelectJamSection = (section)=> {
        setJamSection(section)
    };

    const renderJamNavBar = () => {
        return jamSections.map((section, id) => {

            return jamType !== 'chat' ? 
                 
            <div className="jamNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                <p>{section}</p>   
            </div>
            
            : 
            <Fragment key={id} >
                <p>{section}</p>   
            </Fragment>

        })
    };

    return ( 
        <div className="jamNavBar">
            {jamSections === undefined ? <p>NO JAM SELECTED</p> : 
                <Fragment>
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
                </Fragment>
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
