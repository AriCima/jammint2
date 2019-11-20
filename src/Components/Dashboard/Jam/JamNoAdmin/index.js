import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from './Sections/StudentsFlat/Board';
import Jammers from './Sections/StudentsFlat/JammersAdmin'
import MyJam from './Sections/StudentsFlat/MyJamAdmin';
import Settings from './Sections/StudentsFlat/Settings';
import Chat from './Sections/Chat';
import NoAdminNavBar from './NoAdminNavBar';


import './index.css';

const JamNoAdmin = ({ jamId, jamInfo, jamActiveSection } ) => {

  return (

    <Fragment>

      <div className="jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <NoAdminNavBar 
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

        { (jamActiveSection === 'jammers' || jamActiveSection === 'flatmates') && 
          <Jammers 
            jamId={jamId}
            jamInfo={jamInfo}
          />
        }

        { jamActiveSection === 'myJam' && 
          <MyJam 
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
      
    </Fragment>

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

export default connect(mapStateToProps) (JamNoAdmin);













