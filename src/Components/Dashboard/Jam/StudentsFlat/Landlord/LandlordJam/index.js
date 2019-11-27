import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../LandlordNavBar';
import LandlordBoard from './LandlordSections/LandlordBoard';
import LandlordJammers from './LandlordSections/LandlordJammers';
import LandlordMyJam from './LandlordSections/LandlordMyJam';
import LandlordSettings from './LandlordSections/LandlordSettings';

import './index.css';
import DataService from '../../../../../services/DataService';

const LandlordJam = ({ jamId, jamInfo, jammerId, jamActiveSection } ) => {

  return (
    <div className="landlord-jam-wrapper">

      <div className="landlord-jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <LandlordNavBar 
            jamName={jamInfo.jamName}
            jamActiveSection={jamInfo.jamActiveSection}
            jamType={jamInfo.jamType}
          />
        }
      </div>

      <div className="landlord-jam-container">
  
        { jamActiveSection === 'board' && 
          <LandlordBoard 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }
        { (jamActiveSection === 'myJam') && 
          <LandlordMyJam 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }

        { (jamActiveSection === 'jammers') && 
          <LandlordJammers 
            jamId={jamId}
            jamInfo={jamInfo}
            jammerId={jammerId}
          />
        }

        { jamActiveSection === 'settings' && 
          <LandlordSettings 
            jamId={jamId}
            jamInfo={jamInfo}
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






