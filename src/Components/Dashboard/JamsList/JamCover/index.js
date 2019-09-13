import React from "react";
import { connect } from 'react-redux';
import { selectJam } from '../../../../redux/actions/jamsActions';

// CSS
import "./index.css";

 const JamCover = (props) => {

  const { name, desc, code, jamId } = props

  const onSelectJam=(jamId)=>{
    this.props.selectJam(jamId);

  };

  return (

    <button className="jam-container" onClick={onSelectJam}>

      <div className="jams-list-content">
        <h4>{name}, {jamId} </h4>
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
      selectJam: (jamId) => dispatch(selectJam(jamId))
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth
  }
}
//mapStateToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(JamCover)