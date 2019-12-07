import React from "react";
import CustomInputField from '../../../Components/UI/CustomInputField'
const RoomInput = (props) => {

  return (
    props.cats.map((val, i)=> {
      let catId = `cat-${i}`, ageId = `age-${i}`
      
      return (
        <div key={i}>
          
          <input
            type="text"
            name={catId}
            data-id={i}
            id={catId}
            value={props.rooms[i].name} 
            className="name"
          />
            <div className="form-row">
                    
                <CustomInputField 
                    type="text" 
                    name={catId}
                    data-id={i}
                    id={`roomName`} 
                    value={props.roomsInfo[i].roomName}
                    className="roomName"
                    width='400px'
                    label="roomName"
                    placeholder={`room name or ID`}
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
                        buttonText='Submit'
                    />
                </div>

          <input
            type="text"
            name={ageId}
            data-id={i}
            id={ageId}
            value={props.rooms[i].age} 
            className="age"
          />
        </div>
      )
    })
  )
}
export default RoomInput