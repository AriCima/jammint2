import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/NewRoomForm'
import { connect } from 'react-redux';
import { selectRoom } from "../../../../../../../../../redux/actions/jamActive";

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { auth, jamId, roomId, userJams } = props;
  const userId = auth.uid;

  const [roomInfo, setRoomInfo ] = useState({})

  useEffect(() => {
    if (roomId !== '' && roomId !== 'newRoom'){

        DataService.getRoomInfo(jamId, roomId)
        .then(result => {
          console.log('result =', result)
          setRoomInfo(result)
        })
    } 
  }, [jamId, roomId])


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
                        <p>Ariel Cima</p>
                    </div>
                </div>

                <div className="room-current-contract-info">
                    <div className="current-tenant-block">
                        <p>Check-In:</p>
                    </div>
                    <div className="current-tenant-block">
                        <p>Check-Out:</p>
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
      roomId: state.roomId
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
