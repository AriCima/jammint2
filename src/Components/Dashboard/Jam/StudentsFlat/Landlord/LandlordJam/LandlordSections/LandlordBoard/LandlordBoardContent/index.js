import React from 'react';
import moment from 'moment';

// CSS
import './index.css';

const BoardContent = (props) => {

    const { boardContent } = props;

    const currentDate = moment(new Date()).format('DD/MM/YYYY');
    const messageDate =  moment(boardContent.createdAt.toDate()).format('DD/MM/YYYY');
    
    let messageTime = '';
    if( messageDate === currentDate ){
        messageTime = 'today at ' + moment(boardContent.createdAt.toDate()).format('h:mm');
    } else {
        messageTime = moment(boardContent.createdAt.toDate()).format('DD/MM');
    }
    
    console.log('messageTime', messageTime);

    return (

        <div className="board-content-item">

            <div className="board-message-info">
                
                <div className="board-message-sender">
                    <h6>Ariel</h6>
                </div>

                <div className="board-message-time">
                    <p>{messageTime}</p>
                </div>

            </div>

            <div className="board-message">
                <p>{boardContent.messageText}</p>
            </div>

        </div>

    );   
};
export default BoardContent;
