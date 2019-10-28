import React, { useState } from 'react';

const AccommodationForm = () => {

    const [name, setName ] = useState('');
    const [surname, setSurname ] = useState('');
    const [email, setEmail ] = useState('');
    const [checkInDate, setCheckInDate ] = useState('');
    const [checkOutDate, setCheckOutDate ] = useState('');
    const [roomNr, setRoomNr ] = useState('');

    const submitForm = () => {

        const invitationInfo = {
            userName: name,
            userSurname: surname,
            email: email,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            roomNr: roomNr
        }
    }

    return (
        <form onSubmit={submitForm}>
            
            <div className="form-header">
                <div className="form-header-title">
                    <p>Invite a new Jammer</p>
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
                            id={`name`} 
                            placeholder={`Name`}
                            onChange={id => {
                                setName(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`surname`} 
                            placeholder={`Surname`}
                            onChange={id => {
                                setSurname(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`email`} 
                            placeholder={`email`}
                            onChange={id => {
                                setEmail(id.target.value);
                            }}
                        />
                    </div>
               </div>
                
                <div className="form-section rentInfo">

                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkIn-date`} 
                            placeholder={`Check-In Date`}
                            onChange={id => {
                                setCheckInDate(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkOut-date`} 
                            placeholder={`Check-Out Date`}
                            onChange={id => {
                                setCheckOutDate(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`roomNr`} 
                            placeholder={`Room Nr`}
                            onChange={id => {
                                setRoomNr(id.target.value);
                            }}
                        />
                    </div>
                   
                </div>
                
            </div>
        </form>
    )
}

export default AccommodationForm