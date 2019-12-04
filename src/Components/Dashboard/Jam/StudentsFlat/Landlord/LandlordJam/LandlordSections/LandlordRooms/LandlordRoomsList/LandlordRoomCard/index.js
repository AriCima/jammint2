import React, { useState } from "react";

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';

// CSS
import "./index.css";
import {setRoomId} from "../../../../../../../../../../redux/actions/roomsActions"

const LandlordRoomCard = (props) => {

  const { rI  } = props
  console.log('rI = ', rI)

  const roomId = rI.id;

  const onShowRoomInfo = (roomId) => {
    console.log('el roomId antes del set = ', roomId)
    props.setRoomId(roomId)
  }

  return (

    <button className="landlord-room-card-container" onClick={()=> onShowRoomInfo(roomId)}>

      <div className="landlord-room-card-lin">
        <p>{rI.roomName}</p>
      </div>
      
      <div className="landlord-room-card-line">
        {rI.exterior ? <p>exterior</p> : <p>interior</p>}
      </div>

      <div className="landlord-room-card-line">
        <p>Superficie: {rI.sqm}</p>
      </div>


    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => 
      // dispatch(nombre del action creator(argumento))
      setRoomId: (roomId) => dispatch(setRoomId(roomId)),
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamActive: state.jamActive,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordRoomCard);
