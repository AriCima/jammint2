import React, { useState, useEffect, Fragment } from "react";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserJams } from '../../redux/actions/jamsActions';
import { getJamInfo } from '../../redux/actions/jamInfo';

import DataService from '../services/DataService';


// COMPONENTS
import JamsList from '../Dashboard/JamsList';
import Jam from '../Dashboard/Jam';

// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, jamId, getUserJams, getJamInfo, jamInfo }) => {



    
    useEffect(() => {
       getUserJams(auth.uid);

    },[getUserJams, auth.uid]);

    useEffect(() => {
        console.log('jamId = ', jamId);
        jamId && getJamInfo(jamId)

    }, [jamId, getJamInfo, jamInfo.jamName, jamInfo.jamType, jamInfo.jamSections]);

    
    return (
        <div className="dashboard">
            <aside className="jams-list">
            {!userJams ? <p>LOADING !</p> : 
                <JamsList userJams={userJams}/>
            }
            </aside>

            <div className="jam-screen">
                { jamId ?
                    <Jam />
                    :
                    <p>LOADING !</p> 
                }
              
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action creator(argumento))
        getUserJams: (userId) => dispatch(getUserJams(userId)),
        getJamInfo: (jamId) => dispatch(getJamInfo(jamId))
    }
}

const mapStateToProps = state => {
    console.log('state del dash =', state)
    return { 
        userJams: state.userJams,
        jamId: state.jamId,
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
