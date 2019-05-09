import React from 'react';



// SERVICE API
import DataService from '../services/DataService';

// COMPONENTS
import JamsList from './JamsList';
import Jam from './Jam';

import './index.css'; 



export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId      : this.props.userID,
            userJams    : this.props.userJams,
            jamId       : this.props.jamID,
        };
        this.onjoinJam          = this.onjoinJam.bind(this);
        this.updateJamScreen    = this.updateJamScreen.bind(this);

        console.log('state del Home ', this.state)
    };

    componentDidMount(){   // Obtengo todos los Jams del user paera agregarle el nuevo
        DataService.getUserInfo(this.props.userID)
        .then(res => {
            let jams = res.userJams;

            this.setState({
                userJams : jams,
            })
        })
    };

    componentDidUpdate(prevProps, prevState){
        // console.log('CDU launched', this.props.userJams, ' / ', prevProps.userJams);
        if(this.props.userJams !== prevProps.userJams){
            this.setState({
                userJams: this.props.userJams
            })
            // console.log('state after CDU = ', this.state)
        }

    };

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

    updateJamScreen(x){
        this.setState({
            jamId: x
        })
    };
  
  render() {

    return (

      

           
                <div className="home">
                    <side className="jams-list">
                        <JamsList 
                            userID={this.state.userId} 
                            updateJamScreenHome={this.updateJamScreen} 
                            userJams={this.state.userJams}
                        />
                    </side>

                    <div className="jam-screen">
                        {this.state.jamId === '' ? <p>SELECT YOUR JAM</p> : 
                            <Jam jamID={this.state.jamId}/> 
                        }
                    }
                    </div>
                </div>
            
           
       
    );
  }
}
