import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordJam from './StudentsFlat/Landlord/LandlordJam';
import StudentJam from './StudentsFlat/Student/StudentJam';


import './index.css';

const Jam = ({ jamId, jamInfo, auth } ) => {

  const isAdmin = jamInfo.adminId === auth.uid;
  
  console.log('auth.uid: ', auth.uid);
  
  console.log('jamInfo.adminId: ', jamInfo.adminId);

  return (
    <div className="jam-wrapper">
      { isAdmin ? 
          <LandlordJam jamId={jamId}/>
        :
          <StudentJam jamId={jamId}/>
      }
    </div>
   
  );
};


const mapStateToProps = state => {
  return { 
    jamInfo: state.jamInfo,
    auth: state.firebase.auth,
    jamActiveSection: state.jamSection
  }
};

export default connect(mapStateToProps) (Jam);






