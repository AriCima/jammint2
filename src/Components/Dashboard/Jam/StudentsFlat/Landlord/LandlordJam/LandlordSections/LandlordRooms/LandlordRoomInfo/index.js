import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/StudentsFlat/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/NewBookingForm'
import RoomBookings from './RoomBookings';
import { connect } from 'react-redux';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { auth, jamId, roomId, roomInfo } = props;

  const [newBooking, setNewBooking] = useState(false);
  const [newRoom, setNewRoom] = useState(false);
  const [bookings, setBookings] = useState({})

  const onNewRoom = (jamId) => {
    setNewRoom(true)
  }

  const onNewBooking = (roomInfo) => {
    setNewBooking(true)
  }

  useEffect(() => {
    if (roomId === 'newRoom'){
        setNewRoom(true)
    } else {
        setNewRoom(false)
    }
  }, [roomId])

  useEffect(() => {
    if (bookings !== {}){
        setBookings(bookings)
    } else {
        setNewRoom({})
    }
  }, [bookings])

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
                        
                        <RoomBookings bookings={bookings}/>
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
      bookings: state.bookings
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
