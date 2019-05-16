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
            jamId       : this.props.jamID,
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
          });
          console.log('userJams en el Home :', this.state.userJams)
        });
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

          console.log('CDU new jamId en Home :', this.props.jamId)
            this.setState({
                // userJams: userJams,
                jamId: this.props.jamId,
            });
        };

    };

    onChangeState(field, value){
        let jamInfo = this.state;
        jamInfo[field] = value;
        this.setState(jamInfo)
    };

    updateJamScreen(jamId){
        console.log('update en el Home, jamId = ', jamId);
        this.setState({
            jamId: jamId,
        });
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
               
                <Jam 
                    jamCode={this.state.jamCode}
                    jamId= {this.state.jamId}
                    userId={this.state.userId}
                    updateJamIdInHome={this.updateJamScreen}
                    userJams={this.state.userJams}
                /> 
                
            </div>
        </div>
        
       
    );
  }
}
