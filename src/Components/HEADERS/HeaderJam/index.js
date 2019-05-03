import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

export default class HeaderJam extends Component {
   constructor(props){
    super(props);

    this.state = {
        user    : this.props.userID,
        nav     : this.props.nav, 
        jam     : this.props.jam,
        chat    : this.props.chat,
    }

    this.signOut = this.signOut.bind(this);

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

      
        return (

            
            <div className="header">

            <div className="header-left">
                <div className="title">
                    <p> JAM LEFT</p>

                </div>
            </div>

            <div className="header-mid">
                <div className="nav-block">

                     <p>JAM MID</p>

                </div>
            </div>

            <div className="header-right">

                <div className="nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> : <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>}
                </div>

            </div>
                
            </div>
                            

        );
    }
}

