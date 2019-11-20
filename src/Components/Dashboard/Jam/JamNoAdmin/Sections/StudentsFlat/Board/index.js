import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../services/DataService';
import BoardContent from './BoardContent';
import MessageForm from '../../../../../../UI/MessageForm';

// CSS
import './index.css';

const Board = (props) => {

    const { jamId, jamActiveSection, jamInfo } = props
    const userId = props.auth.uid;
    const jamAdmin = jamInfo.adminId;
    const [sectionInfo, setSectionInfo] = useState([])

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

    // const isAdmin = (jamAdmin === userId);
    
    return (
        <div className="jam-board">
            <div className="jam-board-board">
                <p>{jamInfo.jamName}</p>
                {renderBoardContent()}
            </div>
            <div className="jam-board-form">
                <MessageForm 
                    userId={userId}
                    jamId={jamId}
                    inputId='boardMessage'
                    jamSection={jamActiveSection}
                    section='board'
                    buttonText='send'
                    placeholder='type here'
                />
            </div>
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
