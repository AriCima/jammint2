import React from "react";

// COMPONENTS
import JamCover from './JamCover'

// REDUX
import { compose } from 'redux';
import { connect } from 'react-redux';

// REACT-REDUX-FIREBASE
import { firestoreConnect } from 'react-redux-firebase';

// CSS
import "./index.css";


const JamsList = (props) => {

  const { userJams } = props;

  const _renderJams = () => {
  
    return userJams.map((jam, j) => {
      return (
        <div className="jamCover-wrapper" key={j}>
          <JamCover 
            name={jam.jamName} 
            desc={jam.jamDescription}
            code={jam.jamCode}
            jamId={jam.jamId}
            />
        </div>
      )
    });
  };

  return (
    <div className="jams-list-wrapper">
      {!userJams ? <p>loading </p> : 
      _renderJams()
      }
    </div>
  )
  
}

export default JamsList;