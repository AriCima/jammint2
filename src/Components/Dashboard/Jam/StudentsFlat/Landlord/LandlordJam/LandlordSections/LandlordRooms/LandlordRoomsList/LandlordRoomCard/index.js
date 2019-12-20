import React, { useState } from "react";

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';
import {setRoomId} from "../../../../../../../../../../redux/actions/roomsId"
import {setActiveScreen} from "../../../../../../../../../../redux/actions/roomScreen"

// CSS
import "./index.css";

const LandlordRoomCard = (props) => {

  const { rI  } = props
  const roomId = rI.id;

  const onShowRoomInfo = (roomId) => {
    props.setActiveScreen('roomInfo');
    props.setRoomId(roomId);
  }

  return (

    <button className="landlord-room-card-container" onClick={()=> onShowRoomInfo(roomId)}>
      <div className="landlord-room-card-roomNr">
        <p>{rI.roomName}</p>
      </div>
      <div className="landlord-room-card-info">
        <div className="landlord-room-card-upperline">
          <p>Frederic Antoine</p>
        </div>
        <div className="landlord-room-card-lowerline">
          <p>Seatle, USA</p>
        </div>
      </div>
    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => 
      // dispatch(nombre del action creator(argumento))
      setRoomId: (roomId) => dispatch(setRoomId(roomId)),
      setActiveScreen: (roomInfo) => dispatch(setActiveScreen(roomInfo))
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamId: state.jamId,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordRoomCard);
