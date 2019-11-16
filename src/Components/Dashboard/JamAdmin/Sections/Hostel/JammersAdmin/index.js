
import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';
import JammersList from './JammersList';
import JammersMessages from './JammersMessages';


// CSS
import './index.css';

const Jammers = (props) => {

    const {jamId} = props
    const userId = props.user.uid;
    const [jamAdmin, setJamAdmin] = useState('');
    const [jammers, setJammers] = useState([])
    const [jammersMessages, setJammersMessages] = useState([])

    const [message, setMessage] = useState('');
    
    const onSubmit = (message) => {
        const date = new Date()
        const messageInfo = {
            messageContent: message,
            userId: userId,
            jamId: jamId,
            section: 'jammers',
            createdAt: date,
            messageType: 'message'
        }
        DataService.saveMessage(jamId, jammers, messageInfo)
    }

    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            console.log('jammers = ', res)
            setJammers(res)
        })
        DataService.getJammersMessages(jamId)
        .then((res) => {
            console.log('jammers msgs = ', res)
            setJammersMessages(res)
        })
    }, [jamId])

    

    const isAdmin = (jamAdmin === userId);
    return (

        <div className="jam-jammers">
            {jammers ? 
                <Fragment>

                    <div className="jam-jammers-chat">
                        <div className="jam-jammers-messages-area">
                            {jammersMessages ? <JammersMessages jm={jammersMessages} />
                            : 
                            <p>Loading</p>}
                        </div>
                        <div className="jam-jammers-form-area">
                            <form className="input-form" onSubmit={onSubmit}>
                                <div className="message-input-area">
                                    <input 
                                        type="text" 
                                        id="jammers-post" 
                                        placeholder={`type here`}
                                        onChange={id => {
                                            console.log('mensaje = ', id.target.value)
                                        setMessage(id.target.value);
                                        }}
                                    />
                                </div>

                                <div className="button-area">
                                    <button className="submit-button"
                                        onClick={() => onSubmit(message)}
                                    >
                                        Send Message
                                    </button>
                                </div>

                            </form>
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
        jamId: state.jamId
    }
}
export default connect(mapStateToProps)(Jammers);