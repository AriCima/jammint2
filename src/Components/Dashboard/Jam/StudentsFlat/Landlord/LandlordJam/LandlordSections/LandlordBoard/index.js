import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import LandlordBoardContent from './LandlordBoardContent';
import ButtonSubmit from '../../../../../../../UI/ButtonSubmit';
import CustomInputField from '../../../../../../../UI/CustomInputField'

// CSS
import './index.css';

const LandlordBoard = (props) => {

    const { jamId, jamActiveSection, jamInfo } = props;
    const userId = props.auth.uid;
    const jamAdmin = jamInfo.adminId;
    const [sectionInfo, setSectionInfo] = useState([]);
    const [messageText, setMessageText ] = useState([]);
   
    useEffect(() => {
        DataService.getJamSectionInfo(jamId, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamId])

    const renderLandlordBoardContent = () => {
        return sectionInfo.map((bC, i) => {
            return (
                <LandlordBoardContent 
                    key={i} 
                    boardContent={bC}
                />
            )
        })
    };

    const handleInputChange = (event) => {
        event.persist();
        // setaccInfo(boardMessage.text => ({...boardMessage, [event.target.id]: event.target.value}));
        setMessageText(event.target.value)
    
    }

    const onSubmit = (message) => {
        const date = new Date()
        const messageInfo = {
            messageText: message,
            userId: userId,
            jamId: jamId,
            section: 'board',
            createdAt: date,
            messageType: 'post'
        }
        DataService.saveMessage(jamId, 'board', messageInfo)
    }
    
    return (
        <div className="landlord-jam-board">

            <div className="landlord-jam-board-board">
                <p>Landlord Board</p>
                {renderLandlordBoardContent()}
            </div>
            
            <form className="landlord-jam-board-input-form" onSubmit={onSubmit}>
               
                <CustomInputField
                    width='500px'
                    label='input custom test'
                    placeholder='input info'
                    type="text"
                    value={messageText}
                    id='text' 
                    onChange = {handleInputChange}
                />
            

            <div className="landlord-board-button-area">
                <ButtonSubmit/>
            </div>

            </form>
        </div>

    );   
};



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        jamActive: state.jamActive,
        jamActiveSection: state.jamSection,
    }
}
export default connect(mapStateToProps)(LandlordBoard);
