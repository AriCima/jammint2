import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

class Header extends Component {
   constructor(props){
    super(props);

    this.state = {
        user    : this.props.user,
        nav     : this.props.nav, 
        jam     : this.props.jam,
        chat    : this.props.chat,
    }

    this.signOut = this.signOut.bind(this);

   }

   componentDidUpdate(prevState){
       if(this.state.jam !== prevState.jam){
           this.setState({

           });
       }
   }
    signOut(){   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    }

    _renderMyJams(){
        return(
            <div className="myJams-header">

            <div className="header-left">
                <div className="title">
                    {this.props.user &&  <p>{this.props.user.email}</p>}
                </div>
            </div>

            <div className="header-mid">
                <div className="nav-block">

                    {!this.props.user ? <p>JAMMINT</p>
                        :<Link to={`/my_jams/${this.props.user.uid}`}>My Jams</Link>
                    } 
                </div>
            </div>

            <div className="header-right">

                <div className="nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> :
                        //<LongUserMenu />
                         <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>
                    }
                </div>

            </div>

        </div>
        )
    }

    _renderJam(){
        return(
            <div className="jam-header">

            <div className="header-left">
                <div className="title">
                    <Link to={`/my_jams/pirulo}`}> My Jams</Link>
                </div>
            </div>

            <div className="header-mid">
                <div className="nav-block">
                    <p>{this.state.jam[1]}</p>
                </div>
            </div>

            <div className="header-right">

                <div className="nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> :
                        //<LongUserMenu />
                         <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>
                    }
                </div>

            </div>

        </div>
        )
    }

    render() {
        console.log('el state.jam en el JAM', this.state.jam)
        let headerLeft = null;
        let headerMiddle = null;

        console.log('el jam en el state del header =', this.state.jam)

        if(this.state.jam.length === 0){
            headerMiddle = 'JAMMINT';
        }else{
            headerLeft    = <Link to={`/my_jams/pepito`}>My Jams</Link>;
            headerMiddle   = this.state.jam[1];
        };
        //console.log('props.user en el header', this.props.user)
        //console.log('el this.state.user en render del header: ', this.state.user)
        return (

            
            <div className="header">

            <div className="header-left">
                <div className="title">
                    <p>{headerLeft}</p>
                    {/* {this.props.user &&  <p>{this.props.user.email}</p>} */}
                </div>
            </div>

            <div className="header-mid">
                <div className="nav-block">

                     <p>{headerMiddle}</p>

                    {/* {!this.props.user ? <p>JAMMINT</p>
                        :<Link to={`/my_jams/${this.props.user.uid}`}>My Jams</Link>
                    }  */}
                </div>
            </div>

            <div className="header-right">

                <div className="nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> :
                        //<LongUserMenu />
                         <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>
                    }
                </div>

            </div>
                
            </div>
                            

        );
    }
}
export default Header;
