import React from "react";

// import DataService from "../../../../../../../../../services/DataService";

import { connect } from 'react-redux';

// CSS
import "./index.css";
import {setRoomId} from "../../../../../../../../../../redux/actions/roomsActions"

const LandlordRoomCard = (props) => {

  const { rI  } = props

  console.log(rI)

  const roomId = 12312
  const onShowRoomInfo = (roomId) => {
    props.setRoomId(roomId)
  }

  return (

    <button className="landlord-room-card-container" onClick={()=> onShowRoomInfo(roomId)}>

      <div className="landlord-room-card-lin">
        <p>{rI.roomName} Ariel Cima</p>
      </div>
      
      <div className="landlord-room-card-line">
        <p>In: 14-Sep-2019 Out: 30-Jun-2020</p> 
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
