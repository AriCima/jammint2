import React, {useState} from 'react';
import { Modal , Button, ButtonToolbar} from 'react-bootstrap';

import DataService from '../../services/DataService';

import CustomInputField from '../CustomInputField';
import CustomSelectInputField from '../CustomSelectInputField';
import ButtonPlain from '../ButtonPlain';

const NewRoomModal = (props) => {
  const { jamName, jamId } = props;
  
  const [roomInfo, setroomInfo] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setroomInfo(roomInfo => ({...roomInfo, [event.target.id]: event.target.value}));
  };

  const submitNewRoom = (event) => {
    console.log('form submitted')
    if (event) {
      event.preventDefault();
    }

    DataService.addNewRoom(jamId, roomInfo)
    .then(() => {
      props.onHide();
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          NEW ROOM
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4>Please fill the info below and submit</h4>
        <p>en el jamId = {jamId}</p>

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
                  placeholder={`Size`}
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
          </div>
          <button>submit</button>
        </form>

      </Modal.Body>
    </Modal>
  );
}

const ModalNewRoom = ({ jamId }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)}>
       New Room
      </Button>

      <NewRoomModal
        jamId={jamId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

export default ModalNewRoom;
// render(<ModalNewRoom />);