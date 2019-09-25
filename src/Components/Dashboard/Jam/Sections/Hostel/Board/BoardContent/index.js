import React from 'react';




// CSS
import './index.css';

const BoardContent = (props) => {

    const { boardContent } = props

    return (

        <div className="board-content-item">
        { boardContent.type === 'message' &&
            <div className="board-message">
                <p>{boardContent.title}</p>
            </div>
        }
        { boardContent.type === 'post' &&
            <div className="board-post">
               <div className="board-post-image">
                    <h4>{boardContent.title}</h4>
               </div>
               <div className="board-post-text">
                    <p>{boardContent.content}</p>
               </div>
            </div>
        }
    </div>

    );   
};



export default BoardContent;
