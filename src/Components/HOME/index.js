import React from 'react';



// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

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
            jamId       : null,
        };
        this.updateJamScreen    = this.updateJamScreen.bind(this);

    };

    componentDidMount(){
        
        DataService.getUserInfoById(this.state.userId)
        .then(result =>{
            // console.log('result con el snapshot =', result)
          let userJams = result.userJams;
          let userJamsSorted = Calculations.sortByDateDesc(userJams)
          let jamId = result.id;

          this.setState({
            userJams: userJamsSorted,
            jamId: jamId,
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
                jamCode: this.props.jamCode,
            })
        };

        if(this.props.jamId !== prevProps.jamId){
            console.log('new jamId en Home :', this.props.jamId)
           DataService.getJamInfoById(this.props.jamId)
            .then(result =>{
                // console.log('result con el snapshot =', result)
                // let userJams = result.userJams;
                let jamId = result.id;
                
                this.setState({
                    // userJams: userJams,
                    jamId: jamId,
                });
            });
        };

    };

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };

    updateJamScreen(jamCode, jamId){
        // console.log('update en el Home, jamCode / jamId = ', jamCode, ' / ', jamId);
        this.setState({
            jamCode: jamCode,
            jamId: jamId,
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
                {this.state.jamId === undefined ? <h1>SELECT YOUR JAM</h1> : 
                    <Jam 
                        jamCode={this.state.jamCode}
                        jamId= {this.state.jamId}
                        userID={this.state.userId}
                    /> 
                }
            </div>
        </div>
        
       
    );
  }
}
