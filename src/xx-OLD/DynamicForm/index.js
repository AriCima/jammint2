import React from "react"
import RoomInput from "./RoomInput"

import CustomInputField from '../../Components/UI/CustomInputField';
import CustomSelectInputField from '../../Components/UI/CustomSelectInputField';


// REFERENCE
// https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// https://gist.github.com/MostlyFocusedMike/e57f9f4b54d306da704f4857e85d2b1b

class DynamicApartmentForm extends React.Component {
  state = {
    accInfo: [{
        landlordTitle:"", 
        landlordName:"",
        landlordSurname: "",
        landlordIdNumber: "",
        landlordStreet: "",
        landlordHouseNr: "",
        landlordFloor: "",
        landlordDoor:"",
        landlordZipCode: "",
        landlordCountry: "",
        houseName: "",
        houseStreet:"",
        houseNr:"",
        houseFloor: "",
        door:"",
        city: "",
        country: "",
    }],
    roomsInfo: [{
        roomNr: "",
        roomSize: "",
        roomLocation: "",
        roomBalcony: "",
        privateBathroom: "",
        roomRent: "",
        roomDeposit: ""
    }]
  };

    handlenputChange = (e) => {

        const roomParameters = [
            "roomNr",
            "roomSize",
            "roomLocation",
            "roomBalcony",
            "privateBathroom",
            "roomRent",
            "roomDeposit"
        ];

        if (roomParameters.includes(e.target.className) ) {
        let accInfo = [...this.state.accInfo]
        accInfo[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
        this.setState({ accInfo }, () => //console.log(this.state.accInfo))
        } else {
        this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
    }
    addRoom = (e) => {
        this.setState((prevState) => ({
            accInfo: [...prevState.accInfo, {name:"", age:""}],
        }));
    }
    
    handleSubmit = (e) => { e.preventDefault() }

    render() {
        let { roomsInfo } = this.state
        return (
            <form className="new-apartment-form" onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <div className="form-header">
                    <div className="form-header-line">
                        <h3>New Accommodation Form</h3>
                    </div>
                    <div className="form-header-line">
                        <p>Apartment and Contract Information</p>
                    </div>
                </div>

                <div className="form-body">
                    <div className="form-row">
                        <div className="form-row-title">
                            <h3>Landlord Information</h3>
                        </div>



                        <CustomSelectInputField
                            width='120px'
                            placeholder='title'
                            id='accInfo.landlordTitle'
                            onChange = {handleInputChange}
                            value={accInfo.landlordTitle}
                            options={[ 
                                {value: 'Mrs.', text:'Mrs.'},
                                {value: 'Mr.', text:'MR.'}
                            ]}
                        /> 

                    <CustomInputField 
                        width='400px'
                        label="Name"
                        type="text" 
                        id={`landlordName`} 
                        placeholder={`Name`}
                        value={accInfo.landlordName}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='400px'
                        label="Surname"
                        type="text" 
                        id={`landlordSurname`} 
                        placeholder={`Surnames`}
                        value={accInfo.landlordName}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='400px'
                        label="IdNumber"
                        type="text" 
                        id={`landlordIdNumber`} 
                        placeholder={`ID number`}
                        value={accInfo.landlordIdNumber}
                        changeControl={handleInputChange} 
                    />
                    <div className="form-row-title">
                        <h3>Landlord legal residence</h3>
                    </div>

                    <CustomInputField 
                        width='400px'
                        label="street"
                        type="text" 
                        id={`LandlordStreet`} 
                        placeholder={`Street`}
                        value={accInfo.LandlordStreet}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='60px'
                        label="House Nr"
                        id={`LandlordHouseNr`} 
                        placeholder={`House Nr`}
                        value={accInfo.LandlordHouseNr}
                        changeControl={handleInputChange} 
                    />
                   
                    <CustomInputField 
                        width='60px'
                        label="Floor"
                        type="text" 
                        id={`LandlordFloor`} 
                        placeholder={`Floor`}
                        value={accInfo.LandlordFloor}
                        changeControl={handleInputChange} 
                    />
                </div>

                <div className="form-row">
                    <CustomInputField 
                        width='60px'
                        label="LandlordDoor"
                        type="text" 
                        id={`Landlorddoor`} 
                        placeholder={`Door`}
                        value={accInfo.LandlordDoor}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='80px'
                        label="LandlordZip-Code"
                        type="text" 
                        id={`LandlordZipCode`} 
                        placeholder={`Zip-code`}
                        value={accInfo.LandlordZipCode}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='400px'
                        label="LandlordCity"
                        type="text" 
                        id={`LandlordCity`} 
                        placeholder={`City`}
                        value={accInfo.LandlordCity}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='120px'
                        label="LandlordCountry"
                        type="text" 
                        id={`LandlordCountry`} 
                        placeholder={`Country`}
                        value={accInfo.LandlordCountry}
                        // changeControl={handleInputChange} 
                    />
                </div>

                </div>

                <div className="form-row">

                    <div className="form-row-title">
                        <h3>Apartment Information</h3>
                    </div>

                    <CustomInputField 
                        width='400px'
                        label="houseName"
                        type="text" 
                        id={`houseName`} 
                        placeholder={`House Name / ID`}
                        value={accInfo.houseName}
                        changeControl={handleInputChange} 
                    />
                    
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
                </div>

                <div className="form-row">

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
                        label="totalRooms"
                        type="text" 
                        id={`totalRooms`} 
                        placeholder={`Total rooms`}
                        value={accInfo.totalRooms}
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
                        label="toilets"
                        type="text" 
                        id={`toilets`} 
                        placeholder={`toilets`}
                        value={accInfo.toilets}
                        changeControl={handleInputChange} 
                    />


                </div>
                

               
                
                <button onClick={this.addRoom}>Add a room</button>
                
                <RoomInput rooms={roomsInfo} />
                

                <div className="button-area">
                    <ButtonPlain  
                        type="submit"
                        buttonText='Submit'
                        value="submit"
                    />
                </div>
            </form>
        )
    }
}
export default DynamicApartmentForm