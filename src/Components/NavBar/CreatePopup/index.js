import React, { useState } from "react";

// SERVICES
import DataService from "../../services/DataService";
import Calculations from "../../services/Calculations";

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// CSS
import './index.css';

const CreatePopup = (props) => {

  const { user } = props

  const [open, setOpen] = useState(false);
  const [jamName, setJamName] = useState('');
  const [jamDesc, setJamDesc] = useState('');
    
  const handleChange = (field) => event => {
    if (field === 'jamName'){
      setJamName(event.target.value);
    } else {
      setJamDesc(event.target.value);
    }
  };

  const onCreateNewJam = (e) => {
    e.preventDefault();
    
    const userId = user.uid;
    let createdAt = new Date();
    let jamCode = Calculations.generateCode();
    
    let newJam = {
      adminId: userId,
      jamCode: jamCode,
      jamName: jamName,
      jamDesc: jamDesc,
      jamType: 'studentsFlat',
      createdAt: createdAt,
      updatedAt: ''
    };


    DataService.createJam(newJam)
    .then(res => {
      newJam.jamId = res.id;
      const jamId = res.id;

      const userInfo = {userId: userId, email: user.email}
      DataService.addJamToUser(userId, newJam);
      DataService.updateJammersInJam(jamId, userInfo);

    })
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return ( 
    <div>
      <button className="create-button"  onClick={handleClickOpen}>
        <FontAwesomeIcon className="create-icon-style" icon={faPlus} />
      </button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create you own Jam</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="jamName"
            label="JamName"
            type="text"
            fullWidth
            onChange={handleChange('jamName')}
          />

          <TextField
            autoFocus
            margin="dense"
            id="jamDesc"
            label="JamDesc"
            type="text"
            fullWidth
            onChange={handleChange('jamDesc')}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onCreateNewJam} color="primary">
            Create
          </Button>

        </DialogActions>
      </Dialog>
    </div>
    
  );
};

export default CreatePopup;

