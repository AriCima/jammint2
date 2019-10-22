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
    console.log(' user en Create = ', user)
    e.preventDefault();
    
    const userId = user.uid;
    let createdAt = new Date();
    let jamCode = Calculations.generateCode();
    
    let newJam = {
      adminId: userId,
      jamCode: jamCode,
      jamName: jamName,
      jamDesc: jamDesc,
      jamType: 'standard',
      createdAt: createdAt,
      updatedAt: '',
    };

    let sections = Calculations.getJamSections(newJam.jamType)

    DataService.createJam(newJam)
    .then(res => {
      newJam.jamId = res.id;
      const jamId = res.id;

      const userInfo = {userId: userId, name: 'Ari', email: user.email}
      DataService.addJamToUser(userId, newJam);
      DataService.addUserToJammers(jamId, userInfo )
      
      for (let i=0; i<sections.length; i++){
        const content = {date: new Date(), content: `Hello ${sections[i]}`}
        DataService.createJamSections(jamId, sections[i], content)
      }
    })
    setOpen(false);
  };

  const handleClickOpen = () => {
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

