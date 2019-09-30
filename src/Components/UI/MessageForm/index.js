import React, { useState } from 'react';

export default function MessagesForm(props) {

    const {inputId, buttonText, placeholder, onSubmit } = props;
    const [message, setMessage] = useState('');
    
    onSubmit(message)

    return (
        <form className="input-form" onSubmit={onSubmit}>

            <div className="message-input-area">
                <input 
                    type="text" 
                    id={`${inputId}`} 
                    placeholder={`${placeholder}`}
                    onChange={e => {
                        console.log('mensaje = ', e.target.value)
                       setMessage(e.target.value);
                    }}
                />
            </div>

            <div className="button-area">
                <button className="submit-button">{buttonText}</button>
            </div>

        </form>
    );
};