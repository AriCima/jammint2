import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from './Sections/StudentsFlat/Board';
import JammersAdmin from './Sections/StudentsFlat/JammersAdmin';
import MyJamAdmin from './Sections/StudentsFlat/MyJamAdmin';

import Settings from './Sections/StudentsFlat/Settings';
import Chat from './Sections/Chat';
import AdminNavBar from './AdminNavBar';

import './index.css';

const JamAdmin = ({ jamId, jamInfo, jamActiveSection } ) => {

  return (
    <div className="jam-wrapper">

      <div className="jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <AdminNavBar 
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
        { (jamActiveSection === 'myJam') && 
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

export default connect(mapStateToProps) (JamAdmin);






