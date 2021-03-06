import React, { useState, useEffect } from "react";

// SERVICES
import DataService from "../../services/DataService"

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// CSS
import './index.css';

const JoinPopup = (props) => {

  const { user } = props;
  const userId = user.uid;
 
  const [open, setOpen] = useState(false);
  const [jamCode, setjamCode] = useState('');
  const [jamIds, setJamIds] = useState([])

  const handleChange = jamCode => event => {
    setjamCode(event.target.value);
  };

  const handleClickOpen = () => {
    DataService.getUserJams(userId)
    .then(result =>{
     
      for (let i = 0; i<result.length; i++) {
        console.log(result[i].jamId)
        jamIds[i] = result[i].jamId;
      }
      
      setJamIds(jamIds)
      console.log('jamIds = ', jamIds)

    }).catch(function (error) {   
      console.log(error);
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onJoinJam = (e) => {
    e.preventDefault();

    DataService.getJamInfoByCode(jamCode)
    .then(result =>{
      
      let jam = result.data;
      let jamId = result.id;
      let joinedAt = new Date();
      let jamCode = jam.jamCode;

      const jamToJoin = {
        isAdmin : false,
        jamCode : jamCode,
        jamName : jam.jamName,
        jamId   : jamId,
        jamDescription : jam.jamDesc,
        joinedAt : joinedAt
      }

      if( jamIds.includes(jamId) ) {
        alert(`You are already jammer in ${jamToJoin.jamName}`)
        return
      }

      DataService.addJamToUser(userId, jamToJoin)
      .then(result =>{
        console.log('result del addJamToUser', result)
      }).catch(function (error) {   
        console.log(error);
      });

      const newJammer = {userId: userId}
      DataService.updateJammersInJam(jamId, newJammer)
      .then(result =>{
        console.log('result del updatJammers', result)
      }).catch(function (error) {   
        console.log(error);
      });
      
    }).catch(function (error) {   
      console.log(error);
    });

    setOpen(false);
  };

  return ( 
    <div>
      <button  className="join-button" onClick={handleClickOpen}>
        <FontAwesomeIcon className="join-icon-style" icon={faCheck} />
      </button>
      
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

