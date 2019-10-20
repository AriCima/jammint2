import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from '../Jam/Sections/Hostel/Board';
import Jammers from '../Jam/Sections/Hostel/Jammers'
import MyJam from '../Jam/Sections/Hostel/MyJam';
import Settings from '../Jam/Sections/Hostel/Settings';
import Chat from '../Jam/Sections/Chat';
import JamNavBar from '../Jam/JamNavBar';

import DataService from '../../services/DataService';

import './index.css';

const Jam = ({ jamInfo} ) => {


  const [ jamActiveSection, setJamActiveSection ] = useState('')
  const [ jamSections, setJamSections ] = useState('')
  const [ jamName, setJamName ] = useState('')
  const [ jamType, setJamType ] = useState('')
  const [jamId, setJamId ] = useState(jamInfo.jamId)

  useEffect(() => {
    
    setJamName(jamInfo.jamName)
    setJamType(jamInfo.jamType)
    setJamSections(jamInfo.jamSections)
    setJamId(jamInfo.jamId)

  }, [jamInfo]);


  return (
    <div className="jam-wrapper">

      <div className="jam-header">
        {jamId === undefined ? <Fragment></Fragment>: 
          <JamNavBar 
            jamName={jamName}
            // jamSections={jamSections}
            jamActiveSection={jamActiveSection}
          />
        }
      </div>

      {jamId === undefined ? <h1>SELECT YOUR JAM</h1> : 
        <div className="jam-container">
          { jamActiveSection === 'board' && 
            <Board jamId={jamId}/>
          }
          { jamActiveSection === 'chat' && 
            <Chat jamId={jamId}/>
          }

          { jamActiveSection === 'jammers' && 
            <Jammers jamId={jamId}/>
          }

          { jamActiveSection === 'myJam' && 
            <MyJam jamId={jamId}/>
          }

          { jamActiveSection === 'settings' && 
            <Settings jamId={jamId}/>
          } 
        </div>
      }

    </div>
   
  );
};


const mapStateToProps = state => {
  console.log('stat ene el jam = ', state)
  return { 
    jamInfo: state.jamInfo,
    auth: state.firebase.auth,
  }
};

export default connect(mapStateToProps) (Jam);






