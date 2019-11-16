
import React, { Fragment } from 'react';

// CSS
import './index.css';

const JammersMessages = (props) => {

    const { jm } = props

    const renderJammMessagesList = () => {
        return jm.map((item, i) => {
            return (
                <div className="jammers-message-container">
                    <div className="message-author">
                        <p>{item.userId}</p>
                    </div>
                    <div className="jammers-message-content">
                        <p>{item.messageContent}</p>
                    </div>
                </div>
            )
        })
    }

    return (

        <Fragment>
            {renderJammMessagesList()}
        </Fragment>

    );   
};

export default JammersMessages;