import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from '../Jam/Sections/Hostel/Board';
import Jammers from '../Jam/Sections/Hostel/Jammers'
import MyJam from '../Jam/Sections/Hostel/MyJam';
import Settings from '../Jam/Sections/Hostel/Settings';
import Chat from '../Jam/Sections/Chat';
import JamNavBar from '../Jam/JamNavBar';

import './index.css';

const Jam = ({ jamId, jamInfo, jamActiveSection } ) => {
  console.log('jamSection en JAM: ', jamActiveSection);



  return (
    <div className="jam-wrapper">

      <div className="jam-header">
        {jamInfo === [] ? <Fragment></Fragment>: 
          <JamNavBar 
            jamName={jamInfo.jamName}
            jamSections={jamInfo.sections}
            jamActiveSection={jamInfo.jamActiveSection}
            jamType={jamInfo.jamType}
          />
        }
      </div>

      <div className="jam-container">
  
        { jamActiveSection === 'board' && 
          <p>this is {jamId }board</p>
          // <Board jamId={jamId}/>
        }
        { jamActiveSection === 'chat' && 
           <p>this is {jamId } chat</p>
          // <Chat jamId={jamId}/>
        }

        { jamActiveSection === 'jammers' && 
          <p>this is {jamId } jammers</p>
          // <Jammers jamId={jamId}/>
        }

        { jamActiveSection === 'myJam' && 
          <p>this is {jamId } myJam</p>
          // <MyJam jamId={jamId}/>
        }

        { jamActiveSection === 'settings' && 
          <p>this is {jamId } settings</p>
          // <Settings jamId={jamId}/>
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






