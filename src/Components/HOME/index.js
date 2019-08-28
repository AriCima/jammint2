import React from 'react';



// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// COMPONENTS
import HeaderHome from '../HEADERS/HeaderHome';
import JamsList from './JamsList';
import Jam from './Jam';

// CSS
import './index.css'; 

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userJams    : [],
            jamId       : '',
            user        : {id: this.props.userId, userName: '', email: '' }
        };
        console.log('Home props = ', this.props)
        this.updateJamScreen    = this.updateJamScreen.bind(this);
    };

    componentDidMount(){
        
        DataService.getUserInfoById(this.props.userId)
        .then(result =>{
            // console.log('result con el snapshot =', result)
          const userJams = result.userJams;
          const userJamsSorted = Calculations.sortByDateDesc(userJams)
          const jamId = result.id;
          const userName = result.userName;
          const email = result.email;

          this.setState({
            userJams: userJamsSorted,
            jamId: jamId,
            user: {id: this.props.userId, name: userName, email: email }
          });
          console.log('userJams en el Home :', this.state.userJams)
        });
        DataService.getUserJams(this.state.user.id)
        .then(result =>{

           console.log('userJams received ', result)

        //   this.setState({
        //     userJams: userJams,
        //   });
        //   console.log('userJams en el Home :', this.state.userJams)
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

        <div className="home-logged">
            <div className="header-home">
                <HeaderHome 
                user= {this.state.user}
                />
            </div>
            
            <div className="home">
                <aside className="jams-list">
                    <JamsList 
                        user={this.state.user} 
                        updateJamScreenInHome={this.updateJamScreen} 
                        userJams={this.state.userJams}
                    />
                </aside>

                <div className="jam-screen">
                
                    <Jam 
                        jamCode={this.state.jamCode}
                        jamId= {this.state.jamId}
                        user={this.state.user}
                        updateJamIdInHome={this.updateJamScreen}
                        userJams={this.state.userJams}
                    /> 
                    
                </div>
            </div>
        </div>
        
       
    );
  }
}
