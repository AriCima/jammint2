import React from 'react';
import moment from 'moment';

// CSS
import './index.css';

const BoardContent = (props) => {

    const { boardContent } = props

    const dia = moment(boardContent.createdAt).format('DD/MM');

    return (

        <div className="board-content-item">

            <div className="board-message-info">
                
                <div className="board-message-time">
                    <p>{dia}</p>
                </div>
                
                <div className="board-message-sender">
                    <h6>Ariel</h6>
                </div>

            </div>

            <div className="board-message">
                <p>{boardContent.messageText}</p>
            </div>

        </div>

    );   
};
export default BoardContent;
