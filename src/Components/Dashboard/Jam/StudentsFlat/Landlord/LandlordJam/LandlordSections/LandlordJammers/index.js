
import React, { useState, useEffect, Fragment } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import LandlordJammersList from './LandlordJammersList';
import LandlordJammerInfo from './LandlordJammerInfo';

// CSS
import './index.css';

const LandlordJammers = (props) => {

    const {jamId, jamInfo} = props
    const userId = props.user.uid;
    const [jamAdmin, setJamAdmin] = useState('');
    const [jammers, setJammers] = useState([]);
    const [jammersMessages, setJammersMessages] = useState([])
    
    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            setJammers(res)
        })
        DataService.getJammersMessages(jamId)
        .then((res) => {
            setJammersMessages(res)
        })
    }, [jamId])

    return (

        <div className="landlord-jam-jammers">

            <div className="landlord-jam-jammers-admin-info">
                {jammers && <LandlordJammerInfo />}
            </div>
           
            <div className="landlord-jam-jammers-admin-list">
                {jammers ? 
                    <LandlordJammersList
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
export default connect(mapStateToProps)(LandlordJammers);