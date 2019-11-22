import React, { useState } from 'react';

const AccommodationInviteForm = () => {

    const [inputValue, setInputValue] = useState({});
    
    const handleInputChange = (event) => {
        event.persist();
        setInputValue(inputValue => ({...inputValue, [event.target.id]: event.target.value}));
    }

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        //console.log('submitted')
    }

    return (
        <form onSubmit={handleSubmit}>
            
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
                            value={inputValue.name}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`surname`} 
                            placeholder={`Surname`}
                            value={inputValue.surname}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`email`} 
                            placeholder={`email`}
                            value={inputValue.email}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`passportNr`} 
                            placeholder={`Passport Nr`}
                            value={inputValue.passportNr}
                            onChange={handleInputChange} 
                        />
                    </div>
               </div>

                <div className="form-section homeAddress">

                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`houseNr`} 
                            placeholder={`House Nr`}
                            value={inputValue.houserNr}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`floor`} 
                            placeholder={`Floor`}
                            value={inputValue.floor}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`door`} 
                            placeholder={`Door`}
                            value={inputValue.door}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`zipCode`} 
                            placeholder={`Zip-code`}
                            value={inputValue.zipCode}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`city`} 
                            placeholder={`City`}
                            value={inputValue.city}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                            <input 
                                type="text" 
                                id={`country`} 
                                placeholder={`Country`}
                                value={inputValue.country}
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
                            value={inputValue.checkIn}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkOut`} 
                            placeholder={`Check-Out Date`}
                            value={inputValue.checkOut}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`roomNr`} 
                            placeholder={`Room Nr`}
                            value={inputValue.roomNr}
                            onChange={handleInputChange} 
                        />
                    </div>
                   
                </div>
                
            </div>
        </form>
    )
}

export default AccommodationInviteForm