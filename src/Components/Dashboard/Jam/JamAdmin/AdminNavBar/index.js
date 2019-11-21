// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../../services/Calculations';
import { setJamSection } from '../../../../../redux/actions/jamSection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'


// CSS
import './index.css';

const JamNavBar = ({ setJamSection, jamName, jamType}) => {
    
    const [jamSections, setJamSections] = useState([])
   
    const onSelectJamSection = (section)=> {
        console.log('section = ', section);
        setJamSection(section)
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType)
        setJamSections(sections)
    }, [jamType, setJamSections])

    const renderJamNavBar = () => {
        return jamSections.map((section, id) => {
            
            const fontIcon = Calculations.getHeaderIcon(section);

            return jamType === 'chat' ? 
            
            <div className="jamAdminNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                    <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
            </div>
            
            : 

            <div className="jamAdminNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                {fontIcon}
            </div>
            
        })
    };

    return ( 
        <div className="jamAdminNavBar">
            {jamSections === undefined ? <p>NO JAM SELECTED</p> : 
                <Fragment>
                {jamType !== 'chat' ? 
                    (
                        <Fragment>
                            <div className="jamAdminNavBar-left">
                                <div className="jamAdminNavBar-jamName">
                                    <p>{jamName}</p>
                                </div>
                            </div>
                            <div className="jamAdminNavBar-right">
                                {renderJamNavBar()}
                            </div>
                        </Fragment>
                    ) : (
                        <div className="jamAdminNavBar-chat">
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
