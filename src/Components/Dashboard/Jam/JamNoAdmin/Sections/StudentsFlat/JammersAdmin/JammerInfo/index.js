import React from 'react';
import { connect } from 'react-redux';

import ButtonPlain from '../../../../../../../UI/ButtonPlain';
// CSS
import './index.css';

const JammerInfo = (props) => {

    return(
        <div className="jammer-info-wrapper">
            <div className="jammer-personal-info">

            </div>
            <div className="jammer-jam-info">

            </div>
            <div className="jammer-contact-area">
                <ButtonPlain text="contact"/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log('state ene el jam = ', state)
    return { 
      jamInfo: state.jamInfo,
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection
    }
  };
  
  export default connect(mapStateToProps) (JammerInfo);
  
  