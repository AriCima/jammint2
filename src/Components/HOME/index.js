import React from 'react';



// SERVICE API
import DataService from '../services/DataService';

// COMPONENTS
import MyJams from './MyJams';
import Jam from '../JAMS/Jam';

import './index.css'; 



export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId      : this.props.userID,
            userJams    : [],
            jamCode     : '',
        };
        this.onjoinJam             = this.onjoinJam.bind(this);
    }

    componentDidMount(){   // Obtengo todos los Jams del user paera agregarle el nuevo
        DataService.getUserInfo(this.state.userId)
        .then(res => {
            let jams = res.userJams;
            this.setState({
                userJams : jams,
            })
        })
    }

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

    return (

        <div className="home">

           <div className="home-left">
                <MyJams userID = {this.state.userId}/>
           </div>


           <div className="home-right">
            {this.state.jamId !== null ? <Jam jamID={this.state.jamId}/> : null }
           </div>
        </div>
    );
  }
}
