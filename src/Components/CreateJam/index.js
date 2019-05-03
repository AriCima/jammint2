import React from 'react';



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
       
      </div>
    );
  }
}
