import React from 'react';

// SERVICE API
import DataService from '../services/DataService';

import './index.css'; 



export default class JoinJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userID      : this.props.userID,
            userJams    : [],
            jamCode     : '',
        };
        this.onjoinJam             = this.onjoinJam.bind(this);
    }

    // componentDidMount(){   // Obtengo todos los Jams del user paera agregarle el nuevo
    //     DataService.getUserInfo(this.state.userID)
    //     .then(res => {
    //         let jams = res.userJams;
    //         this.setState({
    //             userJams : jams,
    //         })
    //     })
    // }

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };



    onjoinJam(e){
        e.preventDefault();       
       
        DataService.getJamToJoin(this.state.jamCode)
        .then((result)=>{
           
            let joinJam = {
                jamId       : result.jamId,
                jamName     : result.jamName,
                admin       : false,
                moderator   : false,
                jammer      : true,
            }
            let transJam = this.state.userJams;
            let alreadyJammed = false;

            for (let i = 0; i < transJam.length; i++){
                if (transJam[i].jamId == joinJam.jamId){
                    alreadyJammed = true;
                }
            }
            
            if (alreadyJammed){
                alert(`you are already jammed in ${joinJam.jamName}`)
                return
            }else{
                transJam.push(joinJam);
                this.setState({
                    userJams : transJam,
                })
            
                DataService.addJamToUser(this.state.userID, this.state.userJams) 
                console.log('el result.jamId = ', result.jamId) 
                this.props.joinJam(result.jamId);
            }
          
        })
        .catch(function (error) {    
            console.log(error);
        })
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>JOIN A JAM</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onjoinJam}>
            
              <div id="input-area">

                <input 
                  onChange={(e)=>{this.onChangeState('jamCode', e.target.value)}}
                />     

              </div>

              <div className="button-area">
                  
                <button variant="contained" color="primary" className={classes.button} type="submit">
                  Join
                </button>
                  
              </div>

            </form>
        </div>
    );
  }
}
