import React from "react";

// COMPONENTS
import JamCover from './JamCover'

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
            jamType={jam.jamType}
            user2Name={jam.user2Name}
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