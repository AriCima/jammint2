import React from 'react';

// CSS
import './index.css';

const JamMessagesCard = (props) => {

    const { msg } = props;
    
    return (

        <div className="message-container">
            <div className="message-author">
                <p>{msg.name}</p>
            </div>
            <div className="message-content">
                <p>{msg.msg}</p>
            </div>
        </div>
       
    
    );   
};



export default JamMessagesCard;
