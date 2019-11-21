import React, {Fragment} from "react";
import { connect } from 'react-redux';
import { selectJam } from '../../../../redux/actions/jamActive';
import { getJamInfo } from '../../../../redux/actions/jamInfo';
import { setJamSection } from '../../../../redux/actions/jamSection';


// CSS
import "./index.css";

 const JamCover = (props) => {

  const { jamName, jamId, jamType, jamDesc, user2Name = '' } = props

  const onSelectJam = (jamId) => {
    props.selectJam(jamId);
  };

  return (

    <button className="jamsList-jam-container" onClick={()=> onSelectJam(jamId)}>


      <div className="jams-list-content">
        <div className="jams-list-content-line">
          { jamType === 'chat' ?
            <Fragment>
              <h4>{user2Name}</h4>
            </Fragment>
            :
            <Fragment>
              <h4>{jamName}</h4>
            </Fragment>

          }
        </div>
      </div>

      <div className="jams-list-content-line">
        <p>{jamDesc}</p>
      </div>

    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
    selectJam: (jamId) => dispatch(selectJam(jamId)),
    getJamInfo: (jamId) => dispatch(getJamInfo(jamId)),
    setJamSection: () => dispatch(setJamSection('board'))
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.firebase.auth
//   }
// }
//mapStateToProps = null
export default connect(null, mapDispatchToProps)(JamCover)
