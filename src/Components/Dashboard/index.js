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

    // const [ jamActive, setJamActive ] = useState(jamId)
    // const [ jamActiveSection, setJamActiveSection ] = useState('')
    // const [ jamSections, setJamSections ] = useState('')
    // const [ jamName, setJamName ] = useState('')
    // const [ jamType, setJamType ] = useState('')

    
    useEffect(() => {
       getUserJams(auth.uid);

    },[getUserJams, auth.uid]);

    useEffect(() => {
         getJamInfo(jamId)
        //  setJamName(jamInfo.jamName)
        //  setJamType(jamInfo.jamType)
        //  setJamActive(jamId)
     },[getJamInfo, jamId]);

    // EJEMPLO DE USE EFFECT EN FLAIX-BAC
    // useEffect(() => {
    //     (async () => {
    //       const { ip = '' } = await checkIp();
    //       const localData = JSON.parse(localStorage.getItem(ip))
    //       setState({ ip, localData });
    //     })();
    //   }, []);
    
    return (
        <div className="dashboard">
            <aside className="jams-list">
            {!userJams ? <p>LOADING !</p> : 
                <JamsList userJams={userJams}/>
            }
            </aside>

            <div className="jam-screen">
                { jamId ?
                    <Jam 
                     jamId={jamId}
                     jamName={jamInfo.jamName}
                     jamType={jamInfo.jamType}
                     jamSections={jamInfo.jamSections}
                     jamActiveSection={jamInfo.jamActiveSection}
                    />
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
