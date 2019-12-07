import React, { useState } from 'react';
import DataService from '../../Components/services/DataService';
// import CountrySelect from '../../UI/CountrySelection';
import CustomInputField from '../../Components/UI/CustomInputField';
import CustomSelectInputField from '../../Components/UI/CustomSelectInputField';
import ButtonPlain from '../../Components/UI/ButtonPlain';
import { connect } from 'react-redux';
import { setRoomId } from '../../redux/actions/roomsActions';

// CSS
import './index.css'; 


const NewBookingForm = ( props ) => {
    const { jamId } = props;
    const [roomInfo, setroomInfo] = useState({});
    
    const handleInputChange = (event) => {
        event.persist();
        setroomInfo(roomInfo => ({...roomInfo, [event.target.id]: event.target.value}));
    }

    const submitNewRoom = (event) => {
        if (event) {
          event.preventDefault();
        }
        const jamField = 'accommodationInfo';
        DataService.updateJamInfo(jamId, jamField, roomInfo)
    }

    const cancelAction = (event) => {
        if (event) {
            event.preventDefault();
        }

        props.setRoomId(false)
    }
    
    return (
        <form className="new-apartment-form" onSubmit={submitNewRoom}>
            
            <div className="form-header">
                <div className="form-header-line">
                    <h3>New Room Form</h3>
                </div>
                <div className="form-header-line">
                    <p>Room Info</p>
                </div>
            </div>

            <div className="form-body">
               
                <div className="form-row">
                    
                    <CustomInputField 
                        width='400px'
                        label="roomName"
                        type="text" 
                        id={`roomName`} 
                        placeholder={`room name or ID`}
                        value={roomInfo.roomName}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='60px'
                        label="Room size"
                        type="text" 
                        id={`roomSize`} 
                        placeholder={`Room size`}
                        value={roomInfo.roomSize}
                        changeControl={handleInputChange} 
                    />

                    <CustomSelectInputField
                        width='120px'
                        placeholder='interior / exterior'
                        id='roomLocation'
                        onChange = {handleInputChange}
                        value={roomInfo.roomLocation}
                        options={[ 
                            {value: 'interior', text:'Interior'},
                            {value: 'exterior', text:'Exterior'}
                        ]}
                    /> 

                    <CustomSelectInputField
                        width='120px'
                        placeholder='room balcony'
                        id='roomBalcony'
                        value={roomInfo.roomBalcony}
                        onChange = {handleInputChange}
                        options={[ 
                            {value: 'yes', text:'Yes'},
                            {value: 'no', text:'No'}
                        ]}
                    /> 

                    <CustomSelectInputField
                        width='120px'
                        placeholder='priv bathroom'
                        id='privateBathroom'
                        value={roomInfo.privateBathroom}
                        onChange = {handleInputChange}
                        options={[ 
                            {value: 'yes', text:'Yes'},
                            {value: 'no', text:'No'}
                        ]}
                    />

                </div>
                <div className="form-row">

                    <CustomInputField 
                        width='60px'
                        label="Room rent"
                        type="text" 
                        id={`roomRent`} 
                        placeholder={`Rent in €`}
                        value={roomInfo.roomRent}
                        changeControl={handleInputChange} 
                    />

                    <CustomInputField 
                        width='60px'
                        label="roomDeposit"
                        type="text" 
                        id={`roomDeposit`} 
                        placeholder={`Deposit in €`}
                        value={roomInfo.roomDeposit}
                        changeControl={handleInputChange} 
                    />

                </div>
                <div className="button-area">
                    <ButtonPlain  
                        type="submit"
                        text='Submit'
                        clickHandle={submitNewRoom}
                    />
                     <ButtonPlain  
                        type="cancel"
                        text='cancel'
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
    }
  }
const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        roomId: state.roomId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoomForm);