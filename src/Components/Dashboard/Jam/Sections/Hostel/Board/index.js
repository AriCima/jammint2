import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';
import BoardContent from './BoardContent';
import MessageForm from '../../../../../UI/MessageForm';
import CustomInputField from '../../../../../UI/CustomInputField'
// CSS
import './index.css';

const Board = (props) => {

    const { jamId, jamActiveSection, jamInfo } = props;
    const userId = props.auth.uid;
    const jamAdmin = jamInfo.adminId;
    const [sectionInfo, setSectionInfo] = useState([]);
    const [messageContent, setMessageContent ] = useSate([]);
   
    useEffect(() => {
        DataService.getJamSectionInfo(jamId, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamId])

    const renderBoardContent = () => {
        console.log('sectionInfo = ', sectionInfo)
        return sectionInfo.map((bC, i) => {
            console.log('bC = ', bC)
            return (
                <BoardContent 
                    key={i} 
                    boardContent={bC}
                />
            )
        })
    };

    const handleInputChange = (event) => {
        event.persist();
        setaccInfo(boardMessage.text => ({...boardMessage, [event.target.id]: event.target.value}));
        setMessageContent(event.target.value)
    
    }

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

    // const isAdmin = (jamAdmin === userId);
    
    return (
        <div className="jam-board">
            <div className="jam-board-board">
                {renderBoardContent()}
            </div>
            <form className="input-form" onSubmit={onSubmit}>

            <div className="message-input-area">
                <CustomInputField
                    width='5000px'
                    label='input custom test'
                    placeholder='input info'
                    type="text"
                    value={text}
                    id='text' 
                    onChange = {handleInputChange}
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
        </div>

    );   
};



const mapStateToProps = (state) => {
    console.log('state en el jamNavBar = ', state)
    return {
        auth: state.firebase.auth,
        jamActive: state.jamActive,
        jamActiveSection: state.jamSection,
    }
}
export default connect(mapStateToProps)(Board);
