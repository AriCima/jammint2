import React from "react";
import { connect } from 'react-redux';
import { selectJam } from '../../../../redux/actions/jamActive';
import { setJamSection } from '../../../../redux/actions/jamSection';


// CSS
import "./index.css";

 const JamCover = (props) => {

  const { name, desc, jamId } = props

  const onSelectJam = (jamId) => {
    props.selectJam(jamId);
    props.setJamSection('board');
  };

  return (

    <button className="jamsList-jam-container" onClick={()=> onSelectJam(jamId)}>

      <div className="jams-list-content">
        <h4>{name}</h4>
        <p>{jamId}</p>
      </div>

      <div className="jams-list-content">
        <p>{desc}</p>
      </div>

    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
    selectJam: (jamId) => dispatch(selectJam(jamId)),
    setJamSection: () => dispatch(setJamSection('board'))
  }
}

const mapStateToProps = (state) => {
  return {
      jamid: state.jams,
      auth: state.firebase.auth
  }
}
//mapStateToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(JamCover)
