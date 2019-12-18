import React, { useState } from 'react';
import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';


import ButtonPlain from '../../../ButtonPlain';
import ButtonCancel from '../../../ButtonCancel';

import { connect } from 'react-redux';
import { setRoomId } from '../../../../../redux/actions/roomsId';
import { setActiveScreen } from '../../../../../redux/actions/roomScreen';


const NewBookingForm = (props) => {

    const { roomName, jamId, roomId } = props;
    const [bookingInfo, setBookingInfo] = useState({});
    
    const handleInputChange = (event) => {
        event.persist();
        setBookingInfo(bookingInfo => ({...bookingInfo, [event.target.id]: event.target.value}));
    };
    
    const submitNewBooking = (event) => {
        if (event) {
          event.preventDefault();
        }
        const bCode = Calculations.generateCode()
        bookingInfo.bookingCode = bCode;
        DataService.addNewBooking(jamId, roomId, bookingInfo)
        .then(result => {

            const bookingId = result.id;
            bookingInfo.bookingId = bookingId;
            DataService.updateBookingSummary(jamId, roomId, bookingInfo)
            .then(
                props.setActiveScreen('overview')
            )
        })
    };

    const cancelAction = (event) => {
        if (event) {
            event.preventDefault();
        }
        props.setActiveScreen('overview')
    };

    return (
        <form onSubmit={submitNewBooking}>
            
            <div className="form-header">
                <div className="form-header-title">
                    <p>New Booking for room: {roomName}</p>
                </div>
                <div className="form-header-text">
                    <p>Please fill the following info and then send the invitation</p>
                </div>
            </div>

            <div className="form-body">

                <div className="form-section personalInfo">
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerName`} 
                            placeholder={`Name`}
                            value={bookingInfo.jammerName}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerSurname`} 
                            placeholder={`Surname`}
                            value={bookingInfo.jammerSurname}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerEmail`} 
                            placeholder={`email`}
                            value={bookingInfo.jammerEmail}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerHomeTel`} 
                                placeholder={`email`}
                                value={bookingInfo.jammerHomeTel}
                                onChange={handleInputChange} 
                            />
                        </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerMogbile`} 
                            placeholder={`email`}
                            value={bookingInfo.jammerMobile}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerPassportNr`} 
                            placeholder={`Passport Nr`}
                            value={bookingInfo.jammerPassportNr}
                            onChange={handleInputChange} 
                        />
                    </div>
               </div>

                <div className="form-section homeAddress">

                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerHouseNr`} 
                            placeholder={`House Nr`}
                            value={bookingInfo.jammerHouserNr}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerFloor`} 
                            placeholder={`Floor`}
                            value={bookingInfo.jammerFloor}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerDoor`} 
                            placeholder={`Door`}
                            value={bookingInfo.jammerDoor}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerZipCode`} 
                            placeholder={`Zip-code`}
                            value={bookingInfo.jammerZipCode}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerCity`} 
                            placeholder={`City`}
                            value={bookingInfo.jammerCity}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerCountry`} 
                            placeholder={`Country`}
                            value={bookingInfo.jammerCountry}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerStudy`} 
                            placeholder={`Study`}
                            value={bookingInfo.jammerStudy}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerSchool`} 
                            placeholder={`School`}
                            value={bookingInfo.jammerSchool}
                            onChange={handleInputChange} 
                        />
                    </div>

                </div>

                <div className="form-section rentInfo">

                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkIn`} 
                            placeholder={`Check-In Date`}
                            value={bookingInfo.checkIn}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkOut`} 
                            placeholder={`Check-Out Date`}
                            value={bookingInfo.checkOut}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`roomNr`} 
                            placeholder={`Room Nr`}
                            value={bookingInfo.roomNr}
                            onChange={handleInputChange} 
                        />
                    </div>
                   
                </div>
                
                <div className="new-booking-buttons-area">
                    <ButtonPlain  
                        type="submit"
                        text='Submit'
                        clickHandle={submitNewBooking}
                    />

                    <ButtonCancel 
                        clickHandle={cancelAction}
                    />
                </div>

            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action creator(argumento))
        setRoomId: (roomId) => dispatch(setRoomId(roomId)),
        setActiveScreen: (screen) => dispatch( setActiveScreen(screen)),
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        roomId: state.roomId,
        activeScreen: state.activeScreen
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewBookingForm)