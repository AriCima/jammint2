import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';
import BoardContent from './BoardContent';

// CSS
import './index.css';

const Board = (props) => {

    const {jamActive} = props
    const userId = props.user.uid;
    const [jamAdmin, setJamAdmin] = useState('');
    const [sectionInfo, setSectionInfo] = useState([])

    useEffect(() => {
        let isSubscribed = true
        DataService.getJamInfoById(jamActive)
        .then((res) => {
            console.log('res del getJamID = ', res)
            const jamAdmin = res.adminId;
            if (isSubscribed) {
                setJamAdmin(jamAdmin)
            }
        })
        return () => isSubscribed = false
    }, [jamActive])

    useEffect(() => {
        DataService.getJamSectionInfo(jamActive, 'board')
        .then((res) => {
            setSectionInfo(res)
        })
    }, [jamActive])

    const renderBoardContent = () => {
        console.log('sectionInfo = ', sectionInfo)
        return sectionInfo.map((bC, i) => {
            return (
                <React.Fragment key={i}>
                    <BoardContent boardContent={bC} />
                </React.Fragment>
            )
        })
    }
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
                    <p>THIS IS BOARD'S FORM</p>
                </div>
            }
        </div>

    );   
};



const mapStateToProps = (state) => {
    console.log('state en el jamNavBar = ', state)
    return {
        user: state.firebase.auth,
        jamActive: state.jamActive
    }
}
export default connect(mapStateToProps)(Board);
