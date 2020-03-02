import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../LandlordNavBar';
import LandlordBoard from './LandlordSections/LandlordBoard';
import LandlordRooms from './LandlordSections/LandlordRooms';
import LandlordSettings from './LandlordSections/LandlordSettings';

import './index.css';

const LandlordJam = ({ jamId, jamInfo, jamActiveSection }) => {
    console.log('section recibido en LandlordJam : ', jamActiveSection);

    return (
        <div className="landlord-jam-wrapper">
            <div className="landlord-jam-header">
                {jamInfo === [] ? <></> : (
                    <LandlordNavBar
                        jamName={jamInfo.jamName}
                        jamDesc={jamInfo.jamDesc}
                        jamActiveSection={jamInfo.jamActiveSection}
                        jamType={jamInfo.jamType}
                    />
                )}
            </div>

            <div className="landlord-jam-container">
                { jamActiveSection === 'Board' && <LandlordBoard jamId={jamId} /> }
                { jamActiveSection === 'Rooms' && <LandlordRooms jamId={jamId} /> }
                { jamActiveSection === 'Settings' && <LandlordSettings jamId={jamId} /> }
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
        jamActiveSection: state.jamSection,
        jammerId: state.jammerId,
    };
};

export default connect(mapStateToProps)(LandlordJam);






