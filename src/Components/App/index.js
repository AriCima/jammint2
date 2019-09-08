import React from 'react';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// COMPONENTS
import NavBar from '../layout/NavBar'
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard';

// SERVICES
// import DataService from '../services/DataService';

// CSS
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar/> */}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;

// class App extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       user    : null,
//     }

//   }
// // Cómo cargar un usuario
// // https://github.com/reduxjs/redux/issues/291

//   componentDidMount(){
//     firebase.auth().onAuthStateChanged((user) => {
//       // console.log('user en el App : ', user);
//       if (user) {

//         const userInfo = () => async (dispatch) => {
//           const response = await DataService.getUserInfo(user.uid)
//         }
        
        
        
//         DataService.getUserInfo(user.uid)
//         .then(result =>{
//           console.log('result en el app = ', result)
//           let userJams = result.userJams;
          
//           this.setState({
//             user : result,
//           })
//           // console.log('USER en el APP state ', this.state)
//         })

//       } else {
//         this.setState({
//           user : null
//         });
//       }
//     });
//   };

//   render() {
//     // console.log('state del App en el render ', this.state)
//     return (
//       <div>

//         <Router>

//           <div className="app">

//            {/* * * * * * * HEADERS * * * * * * */}
//             <div className="app-header">  
              
//               <Switch>

//                 <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
//                 <Route path="/login"  exact render = {() => { return  <HeaderLogIn />}}/>
//                 {/* <Route path="/create-new-jam/:userId" exact render = {(props) => { return <HeaderHome userID={props.match.params.userId}/>}}/> */}

//                 {/* * * *  HOME * * * */}
//                 {/* <Route path="/home/:userId" exact render = {(props) => { return <HeaderHome userJams={this.state.userJams} propsFn={props.history} userId={props.match.params.userId} jamId={props.match.params.jamId}/>}}/> */}
                
//                 {/* * * *  JAM * * * */}
//                 <Route path="/jam/:jamId" exact render = {(props) => { return <HeaderJam propsFn={props.history} jamId={props.match.params.jamId} />}}/> 

//                 {/* * * *  CHAT * * * */}

//               </Switch>

//             </div>

//             <div className="appBody">
                
//               <Switch>    
//                 <Route path="/sign_in" render = {(props) => {return <Login propsFn={props.history}/>}}/>
//                 <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 
//                 <Route path="/home/:userId" render = {(props) => { return <Home userId={props.match.params.userId}/>}}/> 
//                 {/* <Route path="/home/:userId/jam/:jamId" render = {(props) => { return <Home userJams={this.state.userJams} jamID={props.match.params.jamId} userID={props.match.params.userId}/>}}/> */}

//               </Switch>

//             </div>
//           </div>

//         </Router>
        
//       </div>
//     );
//   }
// }

// export default App;
