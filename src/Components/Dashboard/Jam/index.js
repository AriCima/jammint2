import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from '../Jam/Sections/Hostel/Board';
import FlatMates from '../Jam/Sections/Hostel/Jammers'
import MyJam from '../Jam/Sections/Hostel/MyJam';
import Settings from '../Jam/Sections/Hostel/Settings';

// import DataService from '../../services/DataService';

import './index.css';

const Jam = ( props ) => {

  const { jamActive, jamSection } = props;
  
  console.log('props en JAM =', props)
  return (
    <div>

      {jamActive === undefined ? <h1>SELECT YOUR JAM</h1> : 
      
        <div className="jam-container">
          { jamSection === 'board' && 
            <Board jamId={jamActive}/>
          }

          { jamSection === 'jammers' && 
            <FlatMates jamId={jamActive}/>
          }

          { jamSection === 'myJam' && 
            <MyJam jamId={jamActive}/>
          }

          { jamSection === 'settings' && 
            <Settings jamId={jamActive}/>
          } 

        </div>
      }
    </div>
  );
};


const mapStateToProps = state => {
  console.log('stat ene el jam = ', state)
  return { 
      jamSection: state.jamSection,
      auth: state.firebase.auth,
   }
};

export default connect(mapStateToProps) (Jam);






