import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import DataService from '../../services/DataService';

export default function MessagesForm(props) {

    const {jamId, section, buttonText, placeholder, userId, inputId } = props;
    const [message, setMessage] = useState('');
    
    // const renderRedirect = () => {
    //     return <Redirect to='/login' />
    // }

    const onSubmit = (message) => {
        const date = new Date()
        const messageInfo = {
            messageContent: message,
            userId: userId,
            jamId: jamId,
            section: section,
            createdAt: date,
            messageType: 'post'
        }
        DataService.saveMessage(jamId, section, messageInfo)
    }

    return (
        <form className="input-form" onSubmit={onSubmit}>

            <div className="message-input-area">
                <input 
                    type="text" 
                    id={`${inputId}`} 
                    placeholder={`${placeholder}`}
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
                    {buttonText}
                </button>
            </div>

        </form>
    );
};