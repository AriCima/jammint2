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

  const { jamsList } = props;

  const _renderJams = () => {
  
    return jamsList.map((jam, j) => {
      return (
        <div className="jamCover-wrapper" key={j}>
          <p>JamsList</p>
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
      {!jamsList ? <p>loading </p> : 
      _renderJams()
      }
    </div>
  )
  
}


const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth
  }
}
//mapStateToProps = null
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const { uid } = props
    return [
    { collection: 'user', 
    doc: uid,
    subcollections: [
      {collection: 'userJams'}
    ],
    orderBy:['createdAt', 'desc'] }
    ]
  })
)(JamsList)
