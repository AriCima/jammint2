import React, { useState } from 'react';
import StandardInputField from '../../UI/StandardInputField';

// CSS
import './index.css'; 

const NewAccommodationForm = () => {

    const [inputValue, setInputValue] = useState({});
    
    const handleInputChange = (event) => {
        console.log('event = ', event)
        event.persist();
        console.log(`${event.target.id} = `,event.target.value)
        setInputValue(inputValue => ({...inputValue, [event.target.id]: event.target.value}));
        console.log('inputValue: ', inputValue);

    }

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        console.log('submitted')
    }

    const renderRoomsInputs = () => {
        return renderRoomsInputs.map
    }

    return (
        <form className="new-apartment-form" onSubmit={handleSubmit}>
            
            <div className="form-header">
                <div className="form-header-line">
                    <h3>New Accommodation Form</h3>
                </div>
                <div className="form-header-line">
                    <p>Apartment Info</p>
                </div>
            </div>

            <div className="form-body">
               
                <div className="form-section homeAddress">

                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`street`} 
                            placeholder={`Street`}
                            value={inputValue.street}
                            onChange={handleInputChange} 
                        />
                    </div>

                    <div className="input-block">
                       <StandardInputField
                        id={`street`} 
                        placeholder={`Street`}
                        value={inputValue.street}
                        onChange={handleInputChange} 
                       />
                    </div>
                    <div className="input-block">
                       <StandardInputField
                        id={`houseNr`} 
                        placeholder={`House Nr`}
                        value={inputValue.houseNr}
                        onChange={handleInputChange} 
                       />
                    </div>
                    {/* <div className="input-block">
                        <input 
                            type="text" 
                            id={`houseNr`} 
                            placeholder={`House Nr`}
                            value={inputValue.houserNr}
                            onChange={handleInputChange} 
                        />
                    </div> */}
                    {/* <div className="input-block">
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
                    </div> */}

                </div>
                {/* <div className="form-section roomsInfo">
                    <div className="input-block">
                        <input 
                            type="text" 
                            id={`numberOfRooms`} 
                            placeholder={`number of rooms`}
                            value={inputValue.numberOfRooms}
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>                 */}
            </div>
        </form>
    )
}

export default NewAccommodationForm