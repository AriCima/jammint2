import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../LandlordNavBar';
import LandlordBoard from './LandlordSections/LandlordBoard';
import LandlordRooms from './LandlordSections/LandlordRooms';


import './index.css';
import DataService from '../../../../../services/DataService';

const LandlordJam = ({ jamId, jamInfo, jammerId, jamActiveSection }) => {

  return (
    <div className="landlord-jam-wrapper">

      <div className="landlord-jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <LandlordNavBar 
            jamName={jamInfo.jamName}
            jamDesc={jamInfo.jamDesc}
            jamActiveSection={jamInfo.jamActiveSection}
            jamType={jamInfo.jamType}
          />
        }
      </div>

      <div className="landlord-jam-container">
  
        { jamActiveSection === 'Board' && 
          <LandlordBoard 
            jamId={jamId}
          />
        }
        { (jamActiveSection === 'Rooms') && 
          <LandlordRooms 
            jamId={jamId}
          />
        }
      </div>
      

    </div>
   
  );
};


const mapStateToProps = state => {
  return { 
    jamInfo: state.jamInfo,
    auth: state.firebase.auth,
    jamActiveSection: state.jamSection,
    jammerId: state.jammerId
  }
};

export default connect(mapStateToProps) (LandlordJam);






