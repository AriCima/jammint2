import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import LongUserMenu from '../Accessories/LongMenu';

import './index.css';

class Header extends Component {
   constructor(props){
    super(props);

    this.state = {
        user : this.props.user,
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

    render() {
        //console.log('props.user en el header', this.props.user)
        //console.log('el this.state.user en render del header: ', this.state.user)
        return (

            <div className="header">

                <div className="header-left">
                    <div className="title">
                        {this.props.user &&   <p>{this.props.user.email}</p>}
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
                            

        );
    }
}
export default Header;
