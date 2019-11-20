import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import JamAdmin from './JamAdmin';
import JamNoAdmin from './JamNoAdmin';


import './index.css';

const Jam = ({ jamId, jamInfo, auth } ) => {

  const isAdmin = jamInfo.adminId === auth.uid;

  return (
    <div className="jam-wrapper">
      { isAdmin ? 
          <JamAdmin jamId={jamId}/>
        :
          <JamNoAdmin jamId={jamId}/>
      }
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






