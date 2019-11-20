
import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../services/DataService';
import JammersListAdmin from './JammersListAdmin';
import JammerInfo from './JammerInfo';

// CSS
import './index.css';

const JammersAdmin = (props) => {

    const {jamId, jamInfo} = props
    const userId = props.user.uid;
    const [jamAdmin, setJamAdmin] = useState('');
    const [jammers, setJammers] = useState([]);
    const [jammersMessages, setJammersMessages] = useState([])
    
    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            console.log('jammers = ', res)
            setJammers(res)
        })
        DataService.getJammersMessages(jamId)
        .then((res) => {
            console.log('jammers msgs = ', res)
            setJammersMessages(res)
        })
    }, [jamId])

    return (

        <div className="jam-jammers-admin">

            <div className="jam-jammers-admin-info">
                {jammers && <JammerInfo />}
            </div>
           
            <div className="jam-jammers-admin-list">
                {jammers ? 
                    <JammersListAdmin 
                        jamInfo={jamInfo} 
                        jammers={jammers} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps)(JammersAdmin);