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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const JoinPopup = (props) => {

  const { user } = props;
  const [open, setOpen] = useState(false);
  const [jamCode, setjamCode] = useState('');

  const handleChange = jamCode => event => {
    console.log('guardar cambios')
    setjamCode(event.target.value);
  };

  const handleClickOpen = () => {
    console.log('abrir popup')
    setOpen(true);
  }

  const handleClose = () => {
    console.log('cerrar popup')
    setOpen(false);
  }

  const onJoinJam = (e) => {
    e.preventDefault();

    DataService.getJamInfoByCode(jamCode)
    .then(result =>{     
      let jam = result.data;
      let jamId = result.id;
      let joinedAt = new Date();

      let jamCode = jam.jamCode;

      const jamToJoin = {};
      jamToJoin.isAdmin = false;
      jamToJoin.jamCode = jamCode;
      jamToJoin.jamName = jam.jamName;
      jamToJoin.jamId = jamId;
      jamToJoin.jamDescription = jam.jamDescription;
      jamToJoin.joineddAt = joinedAt;

      DataService.addJamtoUser(user.id, jamToJoin);

      const newJammer = ({name: user.userName, userId: user.id})

      DataService.updateJammersInJam(jamId, newJammer);

      setOpen(false);

    }).catch(function (error) {   
      console.log(error);
    });
  };

  return ( 
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Join Jam
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input the JamCode.{props.userId}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="jamCode"
            label="JamCode"
            type="text"
            fullWidth
            onChange={handleChange('jamCode')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onJoinJam} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

export default JoinPopup;

