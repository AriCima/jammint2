import React, { useState } from 'react';
import DataService from '../../services/DataService';
// import CountrySelect from '../../UI/CountrySelection';
import CustomInputField from '../../UI/CustomInputField';
import ButtonPlain from '../../UI/ButtonPlain';
import { connect } from 'react-redux';

// CSS
import './index.css'; 

const NewAccommodationForm = ( props ) => {
    const { jamId } = props;
    const [accInfo, setaccInfo] = useState({});
    
    const handleInputChange = (event) => {
        event.persist();
        setaccInfo(accInfo => ({...accInfo, [event.target.id]: event.target.value}));

    }

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }

        const jamField = 'accommodationInfo';
        DataService.updateJamInfo(jamId, jamField, accInfo)
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
               
                <div className="form-row">
                    
                    <CustomInputField 
                        width='400px'
                        label="street"
                        type="text" 
                        id={`street`} 
                        placeholder={`Street`}
                        value={accInfo.street}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='60px'
                        label="House Nr"
                        id={`houseNr`} 
                        placeholder={`House Nr`}
                        value={accInfo.houseNr}
                        changeControl={handleInputChange} 
                    />
                   
                    <CustomInputField 
                        width='60px'
                        label="Floor"
                        type="text" 
                        id={`floor`} 
                        placeholder={`Floor`}
                        value={accInfo.floor}
                        changeControl={handleInputChange} 
                    />

                </div>
                <div className="form-row">

                    <CustomInputField 
                        width='60px'
                        label="Door"
                        type="text" 
                        id={`door`} 
                        placeholder={`Door`}
                        value={accInfo.door}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='80px'
                        label="Zip-Code"
                        type="text" 
                        id={`zipCode`} 
                        placeholder={`Zip-code`}
                        value={accInfo.zipCode}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='400px'
                        label="City"
                        type="text" 
                        id={`city`} 
                        placeholder={`City`}
                        value={accInfo.city}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='120px'
                        label="country"
                        type="text" 
                        id={`country`} 
                        placeholder={`Country`}
                        value={accInfo.country}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='120px'
                        label="bathrooms"
                        type="text" 
                        id={`bathrooms`} 
                        placeholder={`bathrooms`}
                        value={accInfo.bathrooms}
                        changeControl={handleInputChange} 
                    />
                    <CustomInputField 
                        width='120px'
                        label="sqm"
                        type="text" 
                        id={`sqm`} 
                        placeholder={`sqm`}
                        value={accInfo.sqm}
                        changeControl={handleInputChange} 
                    />
                    <CustomInputField 
                        width='120px'
                        label="toilets"
                        type="text" 
                        id={`toilets`} 
                        placeholder={`toilets`}
                        value={accInfo.toilets}
                        changeControl={handleInputChange} 
                    />
                    

                    {/* <CountrySelect 
                        width='120px'
                        label="country"
                        type="text" 
                        id={`country`} 
                        placeholder={`Country`}
                        value={accInfo.country}
                        changeControl={handleInputChange} 
                    /> */}

                </div>
                <div className="button-area">
                    <ButtonPlain  
                        type="submit"
                        buttonText='Submit'
                    />
                </div>

            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, null)(NewAccommodationForm);