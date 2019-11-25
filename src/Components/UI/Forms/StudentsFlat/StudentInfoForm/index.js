import React, { useState } from 'react';

const StudentInfoForm = (props) => {

    const [jammerInfo, setJammerInfo] = useState(props.jammerInfo);
    
    const handleInputChange = (event) => {
        event.persist();
        setJammerInfo(jammerInfo => ({...jammerInfo, [event.target.id]: event.target.value}));
    }

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }

    }
    console.log('jammerInfo = ', jammerInfo);
    return (
        <div className="student-info-wrapper">
            <form onSubmit={handleSubmit}>
                
                <div className="form-body">

                    <div className="form-section personalInfo">
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerName`} 
                                placeholder={`Name`}
                                value={jammerInfo.jammerName}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerSurname`} 
                                placeholder={`Surname`}
                                value={jammerInfo.jammerSurname}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerEmail`} 
                                placeholder={`email`}
                                value={jammerInfo.jammerEmail}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerHomeTel`} 
                                placeholder={`email`}
                                value={jammerInfo.jammerHomeTel}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerMogbile`} 
                                placeholder={`email`}
                                value={jammerInfo.jammerMobile}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerPassportNr`} 
                                placeholder={`Passport Nr`}
                                value={jammerInfo.jammerPassportNr}
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
                                value={jammerInfo.jammerHouserNr}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerFloor`} 
                                placeholder={`Floor`}
                                value={jammerInfo.jammerFloor}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerDoor`} 
                                placeholder={`Door`}
                                value={jammerInfo.jammerDoor}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerZipCode`} 
                                placeholder={`Zip-code`}
                                value={jammerInfo.jammerZipCode}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerCity`} 
                                placeholder={`City`}
                                value={jammerInfo.jammerCity}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerCountry`} 
                                placeholder={`Country`}
                                value={jammerInfo.jammerCountry}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                        <input 
                            type="text" 
                            id={`jammerStudy`} 
                            placeholder={`Study`}
                            value={jammerInfo.jammerStudy}
                            onChange={handleInputChange} 
                        />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`jammerSchool`} 
                                placeholder={`School`}
                                value={jammerInfo.jammerSchool}
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
                                value={jammerInfo.checkIn}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="date" 
                                id={`checkOut`} 
                                placeholder={`Check-Out Date`}
                                value={jammerInfo.checkOut}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`roomNr`} 
                                placeholder={`Room Nr`}
                                value={jammerInfo.roomNr}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`rent`} 
                                placeholder={`rent`}
                                value={jammerInfo.rent}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="input-block">
                            <input 
                                type="text" 
                                id={`deposit`} 
                                placeholder={`Room Nr`}
                                value={jammerInfo.deposit}
                                onChange={handleInputChange} 
                            />
                        </div>
                    
                    </div>
                    
                </div>

                <div className="student-info-form-button-area">

                </div>
            </form>
        </div>
    )
}

export default StudentInfoForm