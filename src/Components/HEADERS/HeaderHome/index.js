// COOL STYLE https://codepen.io/egoens/pen/NxejgJ


import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// COMPONENTS
import PopUpButton from '../../ACCESSORIES/PopUpSample/PopUpButton';
import SubmitButton from '../../ACCESSORIES/SubmitButton';

import './index.css';

export default class HeaderHome extends Component {
   constructor(props){
        super(props);

        this.state = {
            user        : this.props.userID,
            name        : '',
            description : '',
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
       
        return (

            
            <div className="header-HOME">

            <div className="header-HOME-left">
                <div className="header-HOME-nav-block">
                    <p>MENU</p>
                </div>

                <div className="header-HOME-nav-block">
                    {/* <Link to={`/create-new-jam/${this.props.userID}`}>CREATE JAM</Link> */}
                    {/* <MyPopUp /> */}
                    <PopUpButton
                        buttonText={'Create a Jam'}
                        popupText={'Create a Jam is very simple, just give it a Name and Description'}
                        closeButtonText = {'Create'}
                        renderInside={
                            <form className="create-form">
                               <label className="label-short">
                                    <p>Name</p>
                                    <input
                                        className="input-short"
                                        type="text"
                                        name="Name"
                                        size="350"
                                        value={this.state.jamName}
                                        onChange={e => {
                                            this.onChangeState("jamName", e.target.value);
                                        }}
                                    />
                                </label>
                                <label className="label-textarea">
                                    <p>Description</p>
                                    <textarea
                                        className="textarea"
                                        type="text"
                                        name="Description"
                                        size="350"
                                        value={this.state.description}
                                        onChange={e => {
                                            this.onChangeState("description", e.target.value);
                                        }}
                                    />
                                </label>
                                <div className="nev-button-area">
                                    <SubmitButton text={"GUARDAR"} fn={this.onNewEvent}/>
                                </div>
                                
                            </form>
                        }
                    />
                </div>

                <div className="header-HOME-nav-block">
                    <Link to={`/join-jam/${this.props.userID}`}>JOIN JAM</Link>
                </div>
            </div>

            

            <div className="header-HOME-right">

                <div className="header-HOME-nav-block">
                    {!this.props.user ? <Link to={`/sign_in`}>Sign In</Link> : <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>}
                </div>

            </div>
                
            </div>
                            

        );
    }
};
