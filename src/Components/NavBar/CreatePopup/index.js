/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// SERVICES
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';

const CreatePopup = (props) => {
  // eslint-disable-next-line indent
  const { user } = props;

  const [open, setOpen] = useState(false);

  const [jamName, setJamName] = useState('');
  const [jamDesc, setJamDesc] = useState('');
  const [jamType, setJamType] = useState('');
  const [nrOfRooms, setNrOfRooms] = useState('');

  const handleChange = (field) => event => {
    if (field === 'jamName') {
      setJamName(event.target.value);
    } else if (field === 'jamDesc') {
      setJamDesc(event.target.value);
    } else if (field === 'jamType') {
      setJamType(event.target.value);
      console.log('jamType = ', event.target.value);
    } else {
      setNrOfRooms(event.target.value);
      console.log('roomsNr = ', nrOfRooms);
    }
  };


  const onCreatenewJam = (e) => {
    e.preventDefault();
    const userId = user.uid;
    const createdAt = new Date();
    const jamCode = Calculations.generateCode();
    const updatedAt = '';

    const newJam = {
      adminId: userId,
      jamCode,
      jamName,
      jamDesc,
      jamType,
      nrOfRooms,
      createdAt,
      updatedAt,
    };


    DataService.createJam(newJam)
    .then(res => {
      newJam.jamId = res.id;
      const jamId = res.id;
      const userInfo = { userId, email: user.email };
      DataService.addJamToUser(userId, newJam);
      DataService.updateJammersInJam(jamId, userInfo);

      if (newJam.jamType === 'rooms-rental') {
        const rooms = Number(newJam.nrOfRooms);
        for (let i = 0; i < rooms; i++) {
          const roomNr = i + 1;
          const roomInfo = {
            roomNr,
          };
          DataService.addNewRoom(jamId, roomInfo);
        }
      }
    });

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
          <button type="submit" className="create-button" onClick={handleClickOpen}>
              <FontAwesomeIcon className="create-icon-style" icon={faPlus} />
          </button>

          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth
          >
              <DialogTitle id="form-dialog-title">Create you own Jam</DialogTitle>
              <DialogContent>
                  <form>
                      <div className="input-group mb-3">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Jam Name"
                              label="jamName"
                              onChange={handleChange('jamName')}
                          />
                      </div>
                      <div className="input-group mb-3">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              label="jamDesc"
                              onChange={handleChange('jamDesc')}
                          />
                      </div>
                      <div className="input-group mb-3">
                          <div className="input-group-prepend">
                              <label className="input-group-text" htmlFor="inputGroupSelect01">Jam Type</label>
                          </div>
                          <select
                              className="custom-select"
                              id="inputGroupSelect01"
                              label="jamType"
                              onChange={handleChange('jamType')}
                          >
                              <option selected>Choose...</option>
                              <option value="jam">Just a jam</option>
                              <option value="apt-rental">Apartment rental</option>
                              <option value="rooms-rental">Rooms rental</option>
                          </select>
                      </div>
                      {jamType === 'rooms-rental'
                        && (
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Nr of Rooms</label>
                            </div>
                            <select
                                className="custom-select"
                                id="inputGroupSelect01"
                                label="nrOfRooms"
                                onChange={handleChange('nrOfRooms')}
                            >
                                <option selected>Choose...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        )}
                  </form>
              </DialogContent>

              <DialogActions>
                  <Button onClick={handleClose} color="primary">
              Cancel
                  </Button>
                  <Button onClick={onCreatenewJam} color="primary">
              Create
                  </Button>

              </DialogActions>
          </Dialog>
      </div>
  );
};

export default CreatePopup;
