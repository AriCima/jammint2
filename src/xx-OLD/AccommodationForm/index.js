import React from 'react';

const AccommodationForm = () => {

    const submitForm = () => {
        console.log('Acceptance Form submitted')
    }

    return (
        <form onSubmit={submitForm}>
            <div className="form-header">
                <div className="form-header-title">
                    <p>Form title</p>
                </div>
                <div className="form-header-text">
                    <p>Lorem ipsum, lorem ipsum Lorem ipsum, lorem ipsum Lorem ipsum, lorem ipsum </p>
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
                                setInputValue(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`surname`} 
                            placeholder={`Surname`}
                            onChange={id => {
                                setInputValue(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`passportNr`} 
                            placeholder={`Passport Nr`}
                            onChange={id => {
                                setInputValue(id.target.value);
                            }}
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
                
                <div className="form-section contractInfo">
                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkIn`} 
                            placeholder={`Check-in date`}
                            onChange={id => {
                                setInputValue(id.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block">
                        <input 
                            type="date" 
                            id={`checkOut`} 
                            placeholder={`Check-out date`}
                            onChange={id => {
                                setInputValue(id.target.value);
                            }}
                        />
                    </div>
                </div>

            </div>
        </form>
    )
}

export default AccommodationForm