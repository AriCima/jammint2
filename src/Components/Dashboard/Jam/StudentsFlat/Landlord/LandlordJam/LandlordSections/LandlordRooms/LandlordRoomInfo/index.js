import React, { useState, useEffect } from 'react';

import ButtonPlain from '../../../../../../../../UI/ButtonPlain'
import NewRoomForm from '../../../../../../../../UI/Forms/StudentsFlat/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/NewBookingForm'
import NewInvitationForm from '../../../../../../../../UI/Forms/StudentsFlat/NewInvitationForm'
import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import RoomInfo from './RoomInfo';

// REDUX
import { connect } from 'react-redux';

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { jamId, roomId, roomInfo, roomBookings, activeScreen } = props;

  const [screen, setScreen] = useState(props.activeScreen)

  const onNewRoom = (jamId) => {
    // setNewRoom(true)
    setScreen('newRoomForm')
  };
  const onNewBooking = (roomId) => {
    // setNewBooking(true)
    setScreen('newBookingForm')
  };
  const onNewInvitation = (roomId) => {
    // setNewInvitation(true)
    setScreen('newInvitationForm')
  };


  useEffect(() => {
    if (activeScreen === 'newRoomForm'){
        setScreen('newRoomForm');
    } else if (activeScreen === 'newInvitationForm'){
        setScreen('newInvitationForm');
    } else if (activeScreen === 'newBookingForm'){
        setScreen('newBookingForm');
    } else if (activeScreen === 'roomInfo') {
        setScreen('roomInfo')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen])

  return(
    <div className="room-info-wrapper">
        
        { screen === 'newRoomForm' &&  
           <div className="new-Room-wrapper">
               <NewRoomForm 
                    jamId={jamId} 
                    clickHandle={onNewRoom}
                />
           </div>
        }

        { screen === 'newBookingForm' && 
            <div className="new-booking-wrapper">
                <NewBookingForm 
                    roomId={roomId}
                    roomInfo={roomInfo}
                    clickHandle={onNewBooking}
                />
            </div>
        }

        { screen === 'newInvitationForm' && 
            <div className="new-booking-wrapper">
                <NewInvitationForm 
                    roomId={roomId}
                    roomInfo={roomInfo}
                    clickHandle={onNewInvitation}
                />
            </div>
        }

        { screen === 'roomInfo' && 
            <div className="rooms-sections-wrapper">

                <div className="room-buttons-area">

                    <ButtonPlain 
                        type='button'
                        text='New Booking'
                        clickHandle={onNewBooking}
                    />

                    <ButtonPlain 
                        type='button'
                        text='Invite'
                        clickHandle={onNewInvitation}
                    />
                </div>
       
                <div className="room-section-title">
                    <p>Current State</p>
                </div>

                {/* <div className="room-section-content">
                    <CurrentTenant roomBookings={roomBookings}/>
                </div>

                <div className="room-section-content">
                    <RoomBookings roomBookings={roomBookings} />
                </div>
    
                <div className="room-section-content">
                    <RoomInfo 
                        roomInfo={roomInfo}
                    />
                </div> */}

            </div>
        }     

    </div>
  )
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      roomId: state.roomId,
      bookings: state.bookings,
      activeScreen: state.activeScreen
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
