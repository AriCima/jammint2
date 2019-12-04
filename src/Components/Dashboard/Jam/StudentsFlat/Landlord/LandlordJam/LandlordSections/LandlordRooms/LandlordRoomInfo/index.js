import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/NewRoomForm'
import { connect } from 'react-redux';
import { selectRoom } from "../../../../../../../../../redux/actions/jamActive";

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { auth, jamId, roomId, roomInfo } = props;
  console.log('roomInfo: ', roomInfo);
//   const userId = auth.uid;

//   const [roomInfo, setRoomInfo] = useState(props.roomInfo)

//   useEffect(() => {
//     if(roomInfo !== {}){
//     setRoomInfo(roomInfo)
//     } 
//   }, [roomInfo])
//   const contactroom = () => {

//       const chatId = userId + roomId;
//       const reverseChatId = roomId + userId;

//       const roomName = roomInfo.name
  
//       if(userJams.includes(chatId)){
//         return selectJam(chatId)
//       };
      
//       if(userJams.includes(reverseChatId)){
//         return selectJam(reverseChatId)
//       }
  
//       const chatInfo = { 
//         createdAt: new Date(), 
//         adminId: userId, 
//         user2Id: roomId,
//         user2Name: roomName,
//         jamId: chatId, 
//         jamType: 'chat', 
//         messages: [] 
//       }
  
//       DataService.startChat(chatId, chatInfo)
//       .then(res => {
//         //console.log('res del startChat = ', res)
//       })
//       DataService.addJamToUser(userId, chatInfo);
//       DataService.addJamToUser(roomId, chatInfo);
//       props.setJamSection('chat')
//   }

console.log('roomInfo en roomInfo = ', roomInfo)
  return(
    <div className="room-info-wrapper">
        { roomId === 'newRoom' ? 
            <NewRoomForm jamId={jamId} />
        :
        <>
            {/* <NewBooking roomId={roomId}/> */}

            <div className="room-current-state-wrapper">

                <div className="room-current-tenant-info">
                    <div className="current-tentant-img">
                        <img src="/" alt="tenant-img"/>
                    </div>
                    <div className="current-tenant-name">
                        <p>{roomInfo.roomName}</p>
                    </div>
                </div>

                <div className="room-current-contract-info">
                    <div className="current-tenant-block">
                       {roomInfo.exterior ? <p>Exterior</p> : <p>Interior</p>}
                    </div>
                    <div className="current-tenant-block">
                        <p>Sperficie: {roomInfo.sqm}</p>
                    </div>
                    <div className="current-tenant-block">
                        <p>Rent:</p>
                    </div>
                    <div className="current-tenant-block">
                        <p>Deposit:</p>
                    </div>
                </div>

            </div>
            {/* <RoomInfo roomId={roomId}/> */}
        </>
        }
      
    </div>
  )
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      roomId: state.roomId,
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
