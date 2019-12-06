import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/NewRoomForm'
import { connect } from 'react-redux';
import { selectRoom } from "../../../../../../../../../redux/actions/jamActive";
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { auth, jamId, roomId, roomInfo } = props;

  const [newBooking, setNewBooking] = useState(false);
  const [newRoom, setNewRoom] = useState(false);

  const onNewRoom = (jamId) => {
    setNewRoom(true)
  }

  const onNewBooking = (roomInfo) => {
    setNewBooking(true)
  }

  useEffect(() => {
      console.log('roomId en el effect ', roomId, typeof roomId)
    if (roomId === 'newRoom'){
        setNewRoom(true)
    } else {
        setNewRoom(false)
    }
  }, [roomId])

  console.log('props en el roomInfo = ', props)

  return(
    <div className="room-info-wrapper">
        { newRoom ? 
            <NewRoomForm 
                jamId={jamId} 
                clickHandle={onNewRoom}
            />
        :
        <>
            {/* <NewBooking roomId={roomId}/> */}

            <div className="room-current-state-wrapper">

                {newBooking ? 
                    <div className="new-booking-wrapper">
                        <NewBookingForm 
                            roomInfo={roomInfo}
                        />
                    </div>
                    :
                    <>
                        <div className="room-new-booking-area">
                            <ButtonPlain 
                                type='button'
                                text='new booking'
                                clickHandle={onNewBooking}
                            />
                        </div>
                        

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
                    </>
                }

            </div>
        </>
        }
      
    </div>
  )
}

const mapStateToProps = state => {
    console.log('state en el map = ', state)
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      roomId: state.roomId,
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
