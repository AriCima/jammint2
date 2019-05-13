import React from 'react';



// SERVICE API
import DataService from '../services/DataService';

// COMPONENTS
import JamsList from './JamsList';
import Jam from './Jam';

// CSS
import './index.css'; 



export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId      : this.props.userID,
            userJams    : [],
            jamCode     : this.props.jamCode,
        };
        this.onJoinJam          = this.onJoinJam.bind(this);
        this.updateJamScreen    = this.updateJamScreen.bind(this);

        console.log('state del Home ', this.state)
    };

    unsibscribe = null;

    componentDidMount(){
        DataService.getUserInfoBis(this.state.userId)
        .then(result =>{
            console.log('result con el snapshot =', result)
          let userJams = result.userJams;
          this.setState({
            userJams: userJams
          })
        })
    };

    componentDidUpdate(prevProps, prevState){
        // console.log('CDU launched', this.props.userJams, ' / ', prevProps.userJams);
        if(this.props.userJams !== prevProps.userJams){
            this.setState({
                userJams: this.props.userJams
            })
        };

        if(this.props.jamCode !== prevProps.jamCode){
            this.setState({
                jamCode: this.props.jamCode
            })
        };

    };

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };
    onJoinJam(e){
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

    updateJamScreen(jamCode){
        console.log('update en el Home, jamCode = ', jamCode);
        this.setState({
            jamCode: jamCode,
        })
    };
  
  render() {

    return (

           
        <div className="home">
            <aside className="jams-list">
                <JamsList 
                    userID={this.state.userId} 
                    updateJamScreenInHome={this.updateJamScreen} 
                    userJams={this.state.userJams}
                />
            </aside>

            <div className="jam-screen">
                {this.state.jamCode === undefined ? <h1>SELECT YOUR JAM</h1> : 
                    <Jam 
                        jamCode={this.state.jamCode}
                        userID={this.state.userId}
                    /> 
                }
            </div>
        </div>
        
       
    );
  }
}
