import React, { useState } from "react";

// SERVICES
import DataService from "../services/DataService";
import Calculations from "../services/Calculations";

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreatePopup = (props) => {

  const { user } = props;
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
    
    let createdAt = new Date();
    let jamCode = Calculations.generateCode();
    
    let newJam = {
      adminId: user.id,
      jamCode: jamCode,
      jamName: jamName,
      jamDesc: jamDesc,
      jamType: 'flatmates',
      createdAt: createdAt,
      updatedAt: '',
      jammers: [user]
    };

    DataService.createJam(newJam)
    .then(res => {

      newJam.jamId = res.id;
      DataService.addJamToUser(user.id, newJam);
    })
    
    setOpen(false);
  };

  const handleClickOpen = () => {
    console.log('abrir popup')
    setOpen(true);
  }

  const handleClose = () => {
    console.log('cerrar popup')
    setOpen(false);
  }

  return ( 
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Jam
      </Button>
      
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

