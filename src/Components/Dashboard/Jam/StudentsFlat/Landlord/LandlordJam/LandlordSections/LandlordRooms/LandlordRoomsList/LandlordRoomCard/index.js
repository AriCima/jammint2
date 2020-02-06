import React from "react";

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';
import { changeRoomId } from "../../../../../../../../../../redux/actions/roomsId"
// import {setActiveScreen} from "../../../../../../../../../../redux/actions/roomScreen"

// CSS
import "./index.css";

const LandlordRoomCard = ( { changeRoomId, rI}) => {

  const roomId = rI.id;

  const onShowRoomInfo = (roomId) => {
    // props.setActiveScreen('roomInfo');
    changeRoomId(roomId);
  }

  return (

    <button className="landlord-room-card-container" 
      onClick={()=> onShowRoomInfo(rI.roomId)}
    >
      <div className="landlord-room-card-roomNr">
        <p>{rI.roomName}</p>
      </div>
      <div className="landlord-room-card-info">
        <div className="landlord-room-card-upperline">
          {rI.bookings.currentBooking.jammerName ?
            <p>{rI.bookings.currentBooking.jammerName}</p>
            :
            <p>Vacant</p>
          }
        </div>
        <div className="landlord-room-card-lowerline">
          <p>,</p>
        </div>
      </div>
    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => 
      // dispatch(nombre del action creator(argumento))
      changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
      // setActiveScreen: (roomInfo) => dispatch(setActiveScreen(roomInfo))
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
