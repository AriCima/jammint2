// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../../services/Calculations';
import { setJamSection } from '../../../../../redux/actions/jamSection';

// CSS
import './index.css';

const JamNavBar = ({ setJamSection, jamName, jamType}) => {
    
    const [jamSections, setJamSections] = useState([])
   
    const onSelectJamSection = (section)=> {
        setJamSection(section)
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType)
        setJamSections(sections)
    }, [jamType, setJamSections])

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
                {jamType !== 'chat' ? 
                    (
                        <Fragment>
                            <div className="jamNavBar-left">
                                <div className="jamNavBar-jamName">
                                    <p>No ADMIN {jamName}</p>
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
