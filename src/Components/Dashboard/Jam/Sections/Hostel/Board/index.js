import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';
import BoardContent from './BoardContent';
import MessageForm from '../../../../../UI/MessageForm';

// CSS
import './index.css';

const Board = (props) => {

    const { jamId, jamActiveSection, jamInfo } = props
    const userId = props.auth.uid;
    const jamAdmin = jamInfo.adminId;
    const [sectionInfo, setSectionInfo] = useState([])

    // useEffect(() => {
    //     let isSubscribed = true
    //     DataService.getJamInfoById(jamId)
    //     .then((res) => {
    //         console.log('res del getJamID = ', res)
    //         const jamAdmin = res.adminId;
    //         if (isSubscribed) {
    //             setJamAdmin(jamAdmin)
    //         }
    //     })
    //     return () => isSubscribed = false
    // }, [jamId])


    useEffect(() => {
        DataService.getJamSectionInfo(jamId, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamId])

    const renderBoardContent = () => {
        console.log('sectionInfo = ', sectionInfo)
        return sectionInfo.map((bC, i) => {
            return (
                <React.Fragment key={i}>
                    <BoardContent boardContent={bC} />
                </React.Fragment>
            )
        })
    };

    const isAdmin = (jamAdmin === userId);
    return (
        <div className="jam-board">
            {jamAdmin !== '' ? 
                <div className="jam-board-board">
                    {sectionInfo ? renderBoardContent() : <div>LOADING</div>}
                </div>
                :
                <div>LOADING</div>
            }
            { isAdmin && 
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
            }
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
