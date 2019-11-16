import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from '../Jam/Sections/Hostel/Board';
import JammersAdmin from '../JamAdmin/Sections/Hostel/JammersAdmin'
import MyJamAdmin from '../JamAdmin/Sections/Hostel/MyJamAdmin'

import Settings from '../Jam/Sections/Hostel/Settings';
import Chat from '../Jam/Sections/Chat';
import JamAdminNavBar from '../Jam/JamNavBar';
import CustomizeJamForm from '../../UI/CustomizeJamForm';

import './index.css';

const Jam = ({ jamId, jamInfo, jamActiveSection } ) => {

  return (
    <div className="jam-wrapper">

      {jamInfo.openJamCustomForm &&  <CustomizeJamForm /> }

      <div className="jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <JamAdminNavBar 
            jamName={jamInfo.jamName}
            jamActiveSection={jamInfo.jamActiveSection}
            jamType={jamInfo.jamType}
          />
        }
      </div>

      <div className="jam-container">
  
        { jamActiveSection === 'board' && 
          <Board 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }
        { jamActiveSection === 'chat' && 
          <Chat jamId={jamId}/>
        }
        { (jamActiveSection === 'myJam') && +ç
          <MyJamAdmin 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }

        { (jamActiveSection === 'jammers' || jamActiveSection === 'flatmates') && 
          <JammersAdmin 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }

        { jamActiveSection === 'settings' && 
          <Settings 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        } 
      </div>
      

    </div>
   
  );
};


const mapStateToProps = state => {
  console.log('state ene el jam = ', state)
  return { 
    jamInfo: state.jamInfo,
    auth: state.firebase.auth,
    jamActiveSection: state.jamSection
  }
};

export default connect(mapStateToProps) (Jam);






