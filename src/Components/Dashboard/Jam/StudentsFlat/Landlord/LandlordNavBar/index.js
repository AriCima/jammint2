// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../../../services/Calculations';
import { setJamSection } from '../../../../../../redux/actions/jamSection';
import { setRoomId } from     "../../../../../../redux/actions/roomsId";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'


// CSS
import './index.css';

const LandlordNavBar = ({ setJamSection, setRoomId, jamName, jamType}) => {
    
    const [jamSections, setJamSections] = useState([])
   
    const onSelectJamSection = (section, activeScreen)=> {
        setJamSection(section)
        setRoomId('');
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType)
        setJamSections(sections)
    }, [jamType, setJamSections])

    const renderLandlordNavBar = () => {
        return jamSections.map((section, id) => {
            const fontIcon = Calculations.getHeaderIcon(section);
            return jamType === 'chat' ? 
            
            <div className="jamAdminNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
            </div>
            
            : 

            <div className="jamAdminNavBar-item" key={id} onClick={() => onSelectJamSection(`${section}`)}>
                {/* {fontIcon} */}
                {section}
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
                                {renderLandlordNavBar()}
                            </div>
                        </Fragment>
                    ) : (
                        <div className="jamAdminNavBar-chat">
                            {renderLandlordNavBar()}
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
        setJamSection: (section) => dispatch(setJamSection(section)),
        setRoomId: (roomId) => dispatch(setRoomId(roomId))
    }
};

const mapStateToProps = (state) => {
    return {
        jamSection: state.jamSection,
        jamId: state.jamId,
        user: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandlordNavBar);
