import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// SERVICE API
import DataService from '../services/DataService';

export default class CreateJam extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open        : false,
      adminId     : '',
      jamName     : '',
    };
    this.onNewJam             = this.onNewJam.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChangeState(field, value){
    let jamInfo = this.state;
    jamInfo[field] = value;
    this.setState(jamInfo)
  };

  onNewJam(e){
    this.state.adminId = this.props.userID;
    console.log('onCreate launched');
    e.preventDefault();    
    let newState = this.state;
    DataService.createJam(newState)
    .then((result)=>{
        console.log('el result es = ', result);
        // let userToRegister = {
        //   email   :this.state.email, 
        //   jams    :{[jam.id]: true}  // guardo los jams de cada user como objeto.
        // }

        // DataService.saveUserContactInfo(result.user.uid, userToRegister) //jams = array de todos las jams del usuario
        // this.props.history.push(`/jam/${jam.id}`)
        this.props.propsFn.push(`/jam/${result.id}`)
    },(error)=>{
        this.setState({registerError: error});
    });
};

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>New Jam</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Jam</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new Jam you just need to enter its Name. Once created you will be able to customize it in its Settings. 
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam Name"
              type="email"
              fullWidth
              value={this.state.jamName}
              onChange={(e)=>{this.onChangeState('jamName', e.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onNewJam} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
