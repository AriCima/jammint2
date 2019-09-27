
import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';
import JammersList from './JammersList';
import JammersMessages from './JammersMessages';


// CSS
import './index.css';

const Jammers = (props) => {

    const {jamActive} = props
    const userId = props.user.uid;

    const [jamAdmin, setJamAdmin] = useState('');
    const [jammers, setJammers] = useState([])
    const [jammersMessages, setJammersMessages] = useState([])

    useEffect(() => {
        DataService.getJammers(jamActive)
        .then((res) => {
            console.log('jammers = ', res)
            setJammers(res)
        })
        DataService.getJammersMessages(jamActive)
        .then((res) => {
            console.log('jammers msgs = ', res)
            setJammersMessages(res)
        })
    }, [jamActive])

    const isAdmin = (jamAdmin === userId);
    return (

        <div className="jam-jammers">
            {jammers ? 
                <Fragment>

                    <div className="jam-jammers-chat">
                        <div className="jam-jammers-messages-area">
                            {jammersMessages ? <JammersMessages jm={jammersMessages}/> : <p>Loading</p>}
                        </div>
                        <div className="jam-jammers-form-area">
                            <p>FORM AREA</p>
                        </div>
                    </div>

                    <div className="jam-jammers-list">
                        {jammers ? <JammersList jammers={jammers} /> : <p>Loading</p>}
                    </div>

                </Fragment>
                :
                <Fragment>
                    <div className="jam-jammers-list">
                        LOADING LIST
                    </div>
                    <div className="jam-jammers-chat">
                        LOADING CHAT
                    </div>
                </Fragment>
            }
           
        </div>

    );   
};




const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamActive: state.jamActive
    }
}
export default connect(mapStateToProps)(Jammers);