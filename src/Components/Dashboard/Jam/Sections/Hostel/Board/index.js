
import React, { useState, useEffect } from 'react';
import moment from 'moment';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../services/DataService';

// CSS
import './index.css';

const Board = (props) => {
    console.log('props en el Board = ', props)

    const {jamActive} = props

    const [jamAdmin, setJamAdmin] = useState('');
    const userId = props.user.uid;
    const [sectionInfo, setSectionInfo] = useState({})

    useEffect(() => {
        DataService.getJamInfoById(jamActive)
        .then((res) => {
            console.log('res del getJamID = ', res)
            const jamAdmin = res.adminId;
            setJamAdmin(jamAdmin)
        })
        DataService.getJamSectionInfo(jamActive, 'board')
        .then((res) => {
            console.log('res del Board = ', res.data)
            setSectionInfo(res.data)
        })
    }, [jamActive])

    const showForm = (jamAdmin === userId);
    return (

        <div className="jam-board">
            {jamAdmin !== '' ? 
                <div className="jam-board-board">
                    <h3>{sectionInfo.content}</h3>
                    {/* <p>Time: {moment(sectionInfo.date.seconds.toDate()).fromNow()}</p> */}
                </div>
                :
                <div>LOADING</div>
            }
            { showForm && 
                <div>
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
